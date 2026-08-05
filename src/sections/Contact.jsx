/**
 * Contact section — original template layout restored exactly.
 * Black background like original, white text, gold hover states.
 * Content: Daniel's real email, phone, GitHub, LinkedIn, location.
 * id="contact" is the react-scroll target.
 */
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const Contact = () => {
  const text = `Got a question, a project idea,\n    or an opportunity? I'd love\n    to hear from you.`;

  const items = [
    "available for hire",
    "available for hire",
    "available for hire",
    "available for hire",
    "available for hire",
  ];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: { trigger: ".social-link" },
    });
  }, []);

  return (
    <section id="contact" className="min-h-screen bg-black">
      <AnimatedHeaderSection
        subTitle={"Bengaluru, India · Open to remote & on-site"}
        title={"Contact"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {/* Contact details */}
      <div className="flex flex-col gap-8 px-10 py-16 md:flex-row md:justify-between md:items-start">
        {/* Email */}
        <div className="social-link flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase text-white/50 font-mono">
            Email
          </p>
          <a
            href="mailto:danielpaul150604@gmail.com"
            className="text-xl md:text-2xl tracking-wide lowercase text-white/80 transition-colors duration-300 hover:text-white font-mono magnetic inline-block"
          >
            danielpaul150604@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div className="social-link flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase text-white/50 font-mono">
            Phone
          </p>
          <a
            href="tel:+919845999547"
            className="text-xl md:text-2xl tracking-wide text-white/80 transition-colors duration-300 hover:text-white font-mono magnetic inline-block"
          >
            +91 98459 99547
          </a>
        </div>

        {/* Socials */}
        <div className="social-link flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase text-white/50 font-mono">
            Socials
          </p>
          <div className="flex flex-col gap-3">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg tracking-widest uppercase text-white/60 transition-colors duration-300 hover:text-white font-mono magnetic"
              >
                <Icon icon={social.icon} className="text-2xl" />
                {"{ "}
                {social.name}
                {" }"}
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="social-link flex flex-col gap-2">
          <p className="text-xs tracking-widest uppercase text-white/50 font-mono">
            Based in
          </p>
          <p className="text-xl md:text-2xl text-white/80">Bengaluru, India</p>
          <p className="text-sm text-white/40 font-mono">
            MCA · Christ (Deemed To Be University)
          </p>
          <p className="text-sm text-white/40 font-mono">Expected graduation: May 2027</p>
        </div>
      </div>

      {/* Bottom marquee */}
      <Marquee
        items={items}
        className="text-white bg-black border-t-2 border-white/20 font-mono text-xs"
        icon="mdi:star-four-points"
        iconClassName="text-gold"
      />

      {/* Footer */}
      <div className="flex items-center justify-between px-10 py-6 text-xs tracking-widest uppercase border-t border-white/10 text-white/30 font-mono">
        <span>© 2026 Daniel Paul</span>
        <span className="text-gold magnetic">K1NGS1LVER</span>
      </div>
    </section>
  );
};

export default Contact;
