/**
 * About section — clean layout without scale glitches.
 * White background, black text, clip-path image reveal on scroll.
 * Content: Daniel's bio, experience timeline, scaled photo, Download CV.
 */
import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const About = () => {
  const text = `Full-stack developer & AI/ML engineer\n    who shipped production RAG systems, fine-tuned classifiers,\n    and agentic AI platforms at Adobe Consulting Services.`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      imgRef.current,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <AnimatedHeaderSection
        subTitle={"Adobe Consulting Services · Christ University"}
        title={"About"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="grid grid-cols-1 gap-12 px-6 md:px-10 mt-12 md:grid-cols-2 md:gap-12 items-start">
        {/* Profile image with clip-path reveal and optimized scaling */}
        <div
          ref={imgRef}
          className="relative overflow-hidden rounded-2xl aspect-[4/5] max-h-[550px] bg-black/5 shadow-lg"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        >
          <img
            src="/images/daniel.jpg"
            alt="Daniel Paul — Full-Stack & AI/ML Engineer"
            className="object-cover object-top w-full h-full transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Bio + education + achievements + experience + Download CV */}
        <div className="flex flex-col justify-center gap-6 text-black/80 font-light">
          {/* Main Bio Paragraphs */}
          <div className="flex flex-col gap-3 text-base md:text-lg leading-relaxed text-black/70">
            <p>
              Engineered <strong className="font-normal text-black">FinPath</strong> — an enterprise AI financial platform — at Adobe Consulting Services using LangGraph agentic workflows & FastAPI, cutting planning latency by 60% and achieving 100% type-safe LLM tool execution across 14 API routes.
            </p>
            <p>
              Deep expertise in LangGraph, vector search (pgvector/FAISS), BERT fine-tuning, and FastAPI orchestration with eval-driven development.
            </p>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-2 pt-4 border-t border-black/10">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-black/40">
              <Icon icon="mdi:school-outline" className="text-base text-gold" />
              <span>Education</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-black/80 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span>MCA · Christ (Deemed to be University), Bengaluru</span>
                <span className="text-xs text-gold font-medium">Expected May 2027</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="text-black/60">B.Sc. Computer Science & Electronics · Kristu Jayanti University</span>
                <span className="text-xs text-black/40">July 2025</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-col gap-2 pt-4 border-t border-black/10">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-black/40">
              <Icon icon="mdi:trophy-outline" className="text-base text-gold" />
              <span>Achievements</span>
            </div>
            <div className="flex flex-col gap-2 text-sm font-mono text-black/80">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:medal" className="text-gold shrink-0 text-base" />
                <span><strong className="font-medium text-black">1st Place</strong> — Coding & Debugging Contest (SHELLS 26)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:medal" className="text-gold shrink-0 text-base" />
                <span><strong className="font-medium text-black">1st Place</strong> — Lecture Fest (PRISMATRIX 23)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:medal-outline" className="text-black/40 shrink-0 text-base" />
                <span><strong className="font-medium text-black">2nd Place</strong> — Department Hackathon, 120 participants (REVELATIONS 26)</span>
              </div>
            </div>
          </div>

          {/* Experience quick-cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 w-fit border-2 border-black text-black hover:bg-black hover:text-white magnetic font-mono mt-2"
          >
            <Icon icon="mdi:download" className="text-base" />
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
