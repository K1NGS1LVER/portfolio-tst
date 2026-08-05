/**
 * ParticleConstellation — canvas-based interactive particle network.
 *
 * Visual: floating nodes (dots) connected by lines when within distance.
 * AI/ML theme additions:
 * 1. Labeled nodes representing Daniel's tech stack.
 * 2. Visual "Vector Space Clustering": nodes of the same domain (Frontend, Backend, AI/ML)
 *    gently cluster together using Hooke's Law spring physics.
 * 3. Self-stabilizing spacing: nodes maintain a comfortable target separation (150px)
 *    to prevent collapsing/bunching into dense clumps.
 * 4. Performance optimization: IntersectionObserver pauses calculation loop
 *    when the hero section is scrolled out of view.
 */
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PARTICLE_COUNT = 75;
const CONNECTION_DISTANCE = 150;
const PARTICLE_SPEED = 0.35;
const MOUSE_REPEL_RADIUS = 130;
const MOUSE_REPEL_STRENGTH = 2.0;
const IDEAL_NODE_SPACING = 150; // Hooke's Law target distance

const LABELS = [
  { text: "FastAPI", group: 2 },
  { text: "LangGraph", group: 3 },
  { text: "pgvector", group: 3 },
  { text: "React 19", group: 1 },
  { text: "TypeScript", group: 1 },
  { text: "Docker", group: 2 },
  { text: "FAISS", group: 3 },
  { text: "RAG", group: 3 },
  { text: "Zustand", group: 1 },
  { text: "Supabase", group: 2 },
  { text: "SQL", group: 2 },
  { text: "Go", group: 2 },
  { text: "Python", group: 2 },
  { text: "LLMs", group: 3 },
  { text: "Embeddings", group: 3 },
  { text: "SSE Streaming", group: 2 },
  { text: "Tailwind 4", group: 1 },
  { text: "Node.js", group: 2 },
  { text: "Pydantic", group: 3 },
  { text: "Ollama", group: 3 },
  { text: "Agentic AI", group: 3 },
  { text: "Vite 6", group: 1 },
  { text: "REST APIs", group: 2 }
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const ParticleConstellation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useGSAP(() => {
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let isLooping = true;

    const resize = () => {
      if (!containerRef.current) return;
      width = canvas.width = containerRef.current.offsetWidth;
      height = canvas.height = containerRef.current.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);

    // ── Init particles ───────────────────────────────────────────────
    const tempParticles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const p = {
        x: random(0, width || 800),
        y: random(0, height || 600),
        vx: random(-PARTICLE_SPEED, PARTICLE_SPEED),
        vy: random(-PARTICLE_SPEED, PARTICLE_SPEED),
        radius: random(1.5, 3),
        label: null,
        group: 0
      };

      if (index < LABELS.length) {
        p.label = LABELS[index].text;
        p.group = LABELS[index].group;
        p.radius = 3.5;
      }

      return p;
    });
    particlesRef.current = tempParticles;

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ── Draw loop ────────────────────────────────────────────────────
    const draw = () => {
      if (!isLooping) return;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // 1. Update positions & forces
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // ── Hooke's Law Spring Physics (Vector spacing) ──────────────
        // Particles in the same group balance out (attract if far, repel if close)
        if (p.group > 0) {
          for (let j = 0; j < particles.length; j++) {
            if (i === j) continue;
            const target = particles[j];
            if (target.group === p.group) {
              const dx = target.x - p.x;
              const dy = target.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist > 0 && dist < 350) {
                const diff = dist - IDEAL_NODE_SPACING;
                const k = 0.00018; // Spring constant
                const force = diff * k;
                
                // Accelerate according to displacement from target spacing
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
              }
            }
          }
        }

        // ── Mouse repulsion ──────────────────────────────────────────
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
          const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
          p.vx += (dx / dist) * force * MOUSE_REPEL_STRENGTH * 0.05;
          p.vy += (dy / dist) * force * MOUSE_REPEL_STRENGTH * 0.05;
        }

        // Dampen velocity to prevent runaway speeds
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Speed floor: maintain low kinetic energy so nodes keep drifting
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.15) {
          const angle = Math.random() * Math.PI * 2;
          p.vx += Math.cos(angle) * 0.08;
          p.vy += Math.sin(angle) * 0.08;
        }

        // Clamp maximum speed
        const maxSpeed = p.group > 0 ? PARTICLE_SPEED * 1.5 : PARTICLE_SPEED * 2;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off borders
        if (p.x < 0 || p.x > width) { p.vx *= -1; p.x = Math.max(0, Math.min(width, p.x)); }
        if (p.y < 0 || p.y > height) { p.vy *= -1; p.y = Math.max(0, Math.min(height, p.y)); }
      }

      // 2. Draw connections (lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const isClusterLink = p1.group > 0 && p1.group === p2.group;
            ctx.strokeStyle = isClusterLink
              ? `rgba(201, 168, 76, ${opacity * 1.6})`
              : `rgba(0, 0, 0, ${opacity * 0.7})`;
            ctx.lineWidth = isClusterLink ? 1.0 : 0.45;
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes & Inspect overlays
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const inspectRadius = 160;
        const inspectFactor = dist < inspectRadius ? (inspectRadius - dist) / inspectRadius : 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.group > 0) {
          ctx.fillStyle = p.group === 3 
            ? "#c9a84c"
            : `rgba(0, 0, 0, ${0.6 + inspectFactor * 0.4})`;
          ctx.fill();

          if (inspectFactor > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + inspectFactor * 14, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(201, 168, 76, ${inspectFactor * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }

          if (p.label) {
            const ambientOpacity = 0.12;
            const textOpacity = ambientOpacity + inspectFactor * (1 - ambientOpacity);
            
            ctx.save();
            ctx.font = `${inspectFactor > 0.5 ? "bold" : ""} 10px "JetBrains Mono", monospace`;
            ctx.fillStyle = inspectFactor > 0.4 
              ? `rgba(201, 168, 76, ${textOpacity})` 
              : `rgba(0, 0, 0, ${textOpacity})`;
            
            ctx.fillText(p.label, p.x + 8, p.y + 3);
            ctx.restore();
          }
        } else {
          ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
          ctx.fill();
        }
      }

      // 4. Draw mouse glow (halo indicator)
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_REPEL_RADIUS * 1.2
        );
        gradient.addColorStop(0, "rgba(201, 168, 76, 0.05)");
        gradient.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_REPEL_RADIUS * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    // ── Intersection Observer to pause rendering when out of view ─────
    const observerCallback = (entries) => {
      const [entry] = entries;
      isLooping = entry.isIntersecting;
      if (isLooping) {
        cancelAnimationFrame(animFrameRef.current);
        draw();
      } else {
        cancelAnimationFrame(animFrameRef.current);
      }
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.05 });
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      isLooping = false;
      cancelAnimationFrame(animFrameRef.current);
      if (containerRef.current) observer.unobserve(containerRef.current);
      observer.disconnect();
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default ParticleConstellation;
