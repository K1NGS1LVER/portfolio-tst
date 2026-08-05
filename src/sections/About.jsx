/**
 * About section — original template layout restored exactly.
 * White background, black text, clip-path image reveal on scroll.
 * Content: Daniel's bio, experience timeline, photo, Download CV.
 */
import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Full-stack developer & AI/ML engineer\n    with a background in Computer Science & Electronics.\n    Currently pursuing MCA at Christ University, Bengaluru.`;

  const aboutText = `Engineered FinPath — an agentic AI financial platform — during my tenure at Adobe Consulting Services using React, TypeScript, FastAPI, and LangGraph. Presented deliverables to 200+ ACS mentors and senior managers.
Specialized in REST APIs, RAG pipelines, vector search, and production frontend architecture. I don't just ship features — I build systems that reason.
🏆 1st — Coding & Debugging Contest, SHELLS 26
🏆 1st — Interdepartmental Lecture Fest, PRISMATRIX 23
🥈 2nd — Department Hackathon, REVELATIONS 26 (120 participants)`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    gsap.fromTo(
      imgRef.current,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Adobe Consulting Services · Christ University"}
        title={"About"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="grid grid-cols-1 gap-12 px-10 pb-20 md:grid-cols-2 md:gap-8">
        {/* Profile image with clip-path reveal */}
        <div
          ref={imgRef}
          className="relative overflow-hidden rounded-2xl aspect-[3/4] max-h-[600px]"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        >
          <img
            src="/images/daniel.jpg"
            alt="Daniel Paul — Full-Stack & AI/ML Engineer"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Bio + experience + Download CV */}
        <div className="flex flex-col justify-center gap-8">
          <AnimatedTextLines
            text={aboutText}
            className="font-light value-text-responsive text-black/70"
          />

          {/* Experience quick-cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { org: "Adobe ACS", role: "Technical Consultant Intern", year: "2026" },
              { org: "The SocialBytes", role: "Software Tester Intern", year: "2024" },
              { org: "next24 tech", role: "Web Developer Intern", year: "2024" },
            ].map((exp, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-black/10 bg-black/[0.02]"
              >
                <p className="text-xs tracking-widest uppercase mb-1 text-gold font-mono font-normal">
                  {exp.year}
                </p>
                <p className="text-sm font-normal text-black font-mono">{exp.org}</p>
                <p className="text-xs mt-1 text-black/50">{exp.role}</p>
              </div>
            ))}
          </div>

          {/* Download CV */}
          <a
            href="/resume.pdf"
            download="Daniel_Paul_Resume.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 w-fit border-2 border-black text-black hover:bg-black hover:text-white magnetic"
          >
            ↓ Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
