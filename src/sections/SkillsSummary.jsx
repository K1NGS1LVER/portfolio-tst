/**
 * Skills Summary: scrolling titles with smooth GSAP scrub movement.
 * Optimized spacing and offsets to prevent horizontal overflow and text collision.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const SkillsSummary = () => {
  useGSAP(() => {
    gsap.to("#title-skill-1", {
      xPercent: 10,
      scrollTrigger: { trigger: "#title-skill-1", scrub: 0.5 },
    });
    gsap.to("#title-skill-2", {
      xPercent: -15,
      scrollTrigger: { trigger: "#title-skill-2", scrub: 0.5 },
    });
    gsap.to("#title-skill-3", {
      xPercent: 15,
      scrollTrigger: { trigger: "#title-skill-3", scrub: 0.5 },
    });
    gsap.to("#title-skill-4", {
      xPercent: -10,
      scrollTrigger: { trigger: "#title-skill-4", scrub: 0.5 },
    });
  });

  return (
    <section className="py-20 overflow-hidden font-light leading-snug text-center contact-text-responsive">
      <div id="title-skill-1" className="py-2">
        <p>Full-Stack</p>
      </div>
      <div
        id="title-skill-2"
        className="flex items-center justify-center gap-4 py-2"
      >
        <p className="font-normal">AI / ML</p>
        <div className="w-8 h-1 md:w-20 bg-gold" />
        <p>Engineering</p>
      </div>
      <div
        id="title-skill-3"
        className="flex items-center justify-center gap-4 py-2"
      >
        <p>React</p>
        <div className="w-8 h-1 md:w-20 bg-gold" />
        <p className="italic">FastAPI</p>
        <div className="w-8 h-1 md:w-20 bg-gold" />
        <p>LangGraph</p>
      </div>
      <div id="title-skill-4" className="py-2">
        <p>Agentic Systems</p>
      </div>
    </section>
  );
};

export default SkillsSummary;
