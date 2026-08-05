/**
 * HeroSVGLines — animated circuit/network line motif for the hero section.
 * Uses GSAP stroke-dashoffset animation to "draw" paths on load.
 * Styled at low opacity to sit behind the text as a textural backdrop.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroSVGLines = () => {
  const svgRef = useRef(null);

  useGSAP(() => {
    const paths = svgRef.current.querySelectorAll("path, line, polyline, circle");

    // Set initial state: fully hidden (dash offset = path length)
    paths.forEach((el) => {
      if (el.tagName === "circle") return; // circles animate differently
      const len = el.getTotalLength ? el.getTotalLength() : 100;
      gsap.set(el, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    });

    // Animate: draw each path from nothing to full
    gsap.to(svgRef.current.querySelectorAll("path, line, polyline"), {
      strokeDashoffset: 0,
      duration: 3.5,
      ease: "power2.inOut",
      stagger: {
        each: 0.15,
        from: "random",
      },
    });

    // Circles fade in separately
    gsap.from(svgRef.current.querySelectorAll("circle"), {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
      duration: 0.6,
      stagger: 0.1,
      delay: 1.2,
      ease: "back.out(2)",
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      {/* Stroke style — thin, accent-colored lines */}
      <g
        stroke="var(--accent)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ── Horizontal backbone lines ─────────────────────────── */}
        <line x1="0" y1="450" x2="1440" y2="450" />
        <line x1="0" y1="200" x2="900" y2="200" />
        <line x1="540" y1="700" x2="1440" y2="700" />

        {/* ── Vertical stems ────────────────────────────────────── */}
        <line x1="200" y1="0" x2="200" y2="450" />
        <line x1="600" y1="200" x2="600" y2="900" />
        <line x1="1000" y1="0" x2="1000" y2="700" />
        <line x1="1300" y1="450" x2="1300" y2="900" />

        {/* ── Circuit corners / L-bends ──────────────────────────── */}
        <polyline points="200,450 200,600 400,600 400,700 540,700" />
        <polyline points="600,200 740,200 740,320 900,320 900,450" />
        <polyline points="1000,450 1000,560 1150,560 1150,700 1300,700" />
        <polyline points="0,700 80,700 80,820 300,820 300,900" />
        <polyline points="1440,200 1360,200 1360,320 1200,320 1200,450" />
        <polyline points="600,900 600,820 780,820 780,700" />
        <polyline points="0,200 120,200 120,320 200,320 200,450" />
        <polyline points="1000,0 1000,100 1150,100 1150,200 1300,200 1300,320" />

        {/* ── Diagonal traces (45°) ──────────────────────────────── */}
        <line x1="400" y1="0" x2="600" y2="200" />
        <line x1="900" y1="450" x2="1000" y2="560" />
        <line x1="1300" y1="320" x2="1440" y2="450" />
        <line x1="0" y1="320" x2="120" y2="450" />
        <line x1="780" y1="700" x2="900" y2="820" />

        {/* ── Long diagonal sweep ────────────────────────────────── */}
        <path d="M 0 900 Q 300 450 720 350 T 1440 100" />
        <path d="M 1440 900 Q 1100 650 720 550 T 0 200" />

        {/* ── Accent arcs ───────────────────────────────────────── */}
        <path d="M 200 200 A 200 200 0 0 1 600 200" />
        <path d="M 1000 450 A 150 150 0 0 0 1300 450" />

        {/* ── Node dots (connection points) ─────────────────────── */}
        <circle cx="200" cy="450" r="4" fill="var(--accent)" stroke="none" />
        <circle cx="600" cy="200" r="4" fill="var(--accent)" stroke="none" />
        <circle cx="1000" cy="450" r="4" fill="var(--accent)" stroke="none" />
        <circle cx="1300" cy="700" r="4" fill="var(--accent)" stroke="none" />
        <circle cx="600" cy="700" r="3" fill="var(--accent)" stroke="none" />
        <circle cx="900" cy="320" r="3" fill="var(--accent)" stroke="none" />
        <circle cx="740" cy="200" r="3" fill="var(--accent)" stroke="none" />
        <circle cx="1150" cy="560" r="3" fill="var(--accent)" stroke="none" />
        <circle cx="400" cy="600" r="2.5" fill="var(--accent)" stroke="none" />
        <circle cx="1200" cy="320" r="2.5" fill="var(--accent)" stroke="none" />
        <circle cx="300" cy="820" r="2.5" fill="var(--accent)" stroke="none" />
        <circle cx="780" cy="820" r="2.5" fill="var(--accent)" stroke="none" />
      </g>

      {/* ── Subtle glow on the main accent paths ─────────────────── */}
      <defs>
        <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        filter="url(#heroGlow)"
        stroke="var(--accent)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      >
        <path d="M 0 900 Q 300 450 720 350 T 1440 100" />
        <path d="M 1440 900 Q 1100 650 720 550 T 0 200" />
      </g>
    </svg>
  );
};

export default HeroSVGLines;
