/**
 * Hero section: full-viewport intro with particle constellation backdrop.
 * Replaces the Three.js planet. id="home" is the react-scroll target.
 * Layout and styling matches original template exactly.
 */
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import ParticleConstellation from "../components/ParticleConstellation";

const Hero = () => {
  const text = `Full-stack developer & AI/ML engineer.\nI build agentic AI systems, RAG pipelines,\nand production-grade web applications.`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Bengaluru, India · Open to opportunities"}
        title={"Daniel Paul"}
        text={text}
        textColor={"text-black"}
      />
      {/* Particle constellation sits behind content, fills the full viewport */}
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ParticleConstellation />
      </figure>
    </section>
  );
};

export default Hero;
