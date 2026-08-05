/**
 * Works section — original template layout restored exactly.
 * White bg, black text, clip-path overlay on hover, cursor-follow preview image.
 * Content: Daniel's 3 AI/ML projects.
 * id="work" is the react-scroll target.
 */
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const text = `Featured AI and full-stack projects —\n    engineered with precision, shipped to\n    production.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: { trigger: "#project" },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.5,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      duration: 0.5,
      ease: "power2.in",
    });
    setCurrentIndex(null);
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (moveX.current) moveX.current(mouse.current.x);
    if (moveY.current) moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Selected Work · 2024 – 2026"}
        title={"Work"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="relative px-10 pb-20" onMouseMove={handleMouseMove}>
        {/* Floating cursor-follow preview — original positioning */}
        <div
          ref={previewRef}
          className="hidden md:block absolute pointer-events-none z-10 w-64 h-48 rounded-xl overflow-hidden -translate-x-1/2 -translate-y-1/2"
          style={{ top: 0, left: 0 }}
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex]?.image}
              alt={projects[currentIndex]?.title}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {projects.map((project, index) => (
          <div
            id="project"
            key={index}
            className="relative border-t-2 border-black/10"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
              {/* Left: number + title */}
              <div className="flex items-start gap-6 md:items-center">
                <span className="text-xs tracking-widest uppercase pt-1 md:pt-0 min-w-[2rem] text-black/30 font-mono">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-black">
                    {project.title}
                  </h3>
                  <p className="text-sm mt-1 tracking-wider text-black/50">
                    {project.description}
                  </p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.split(" · ").map((tech, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] tracking-wider bg-black/[0.04] text-black/60 px-2.5 py-1 rounded border border-black/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 shrink-0 border-2 border-black/20 text-black/50 hover:border-black hover:text-black w-fit ml-14 md:ml-0 magnetic font-mono"
              >
                <Icon icon="mdi:github" className="text-base" />
                View
              </a>
            </div>

            {/* Mobile inline image */}
            <div className="block md:hidden overflow-hidden rounded-xl mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-48 rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Hover overlay — original clip-path mechanic */}
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="hidden md:block absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
              style={{
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                backgroundColor: "rgba(201, 168, 76, 0.08)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
              }}
            />
          </div>
        ))}

        <div className="w-full h-px bg-black/10" />
      </div>
    </section>
  );
};

export default Works;
