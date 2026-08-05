/**
 * Skills Summary: large scrolling titles with parallax-style GSAP scrub movement.
 * Restored to original ServiceSummary layout/styling — gold accent bars, same classes.
 * Content updated to Daniel's stack keywords.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const SkillsSummary = () => {
  useGSAP(() => {
    gsap.to("#title-skill-1", {
      xPercent: 20,
      scrollTrigger: { target: "#title-skill-1", scrub: true },
    });
    gsap.to("#title-skill-2", {
      xPercent: -30,
      scrollTrigger: { target: "#title-skill-2", scrub: true },
    });
    gsap.to("#title-skill-3", {
      xPercent: 100,
      scrollTrigger: { target: "#title-skill-3", scrub: true },
    });
    gsap.to("#title-skill-4", {
      xPercent: -100,
      scrollTrigger: { target: "#title-skill-4", scrub: true },
    });
  });

  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
      <div id="title-skill-1">
        <p>Full-Stack</p>
      </div>
      <div
        id="title-skill-2"
        className="flex items-center justify-center gap-3 translate-x-16"
      >
        <p className="font-normal">AI / ML</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>Engineering</p>
      </div>
      <div
        id="title-skill-3"
        className="flex items-center justify-center gap-3 -translate-x-48"
      >
        <p>React</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p className="italic">FastAPI</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>LangGraph</p>
      </div>
      <div id="title-skill-4" className="translate-x-48">
        <p>Agentic Systems</p>
      </div>
    </section>
  );
};

export default SkillsSummary;
