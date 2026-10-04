/**
 * Navbar: full-screen overlay navigation — original template styling restored.
 * bg-black panel, white text, gold social links on hover.
 * Daniel's content: email, socials, section IDs updated to include "skills".
 */
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Full-screen nav panel — original black bg */}
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        {/* Section links — updated to include "skills" */}
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {[
            { label: "home", target: "home" },
            { label: "skills", target: "skills" },
            { label: "about", target: "about" },
            { label: "work", target: "work" },
            { label: "contact", target: "contact" },
          ].map((section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className="transition-all duration-300 cursor-pointer hover:text-white magnetic inline-block"
                to={section.target}
                smooth
                offset={0}
                duration={2000}
                onClick={toggleMenu}
              >
                {section.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50 font-mono text-xs">E-mail</p>
            <a
              href="mailto:danielpaul150604@gmail.com"
              className="text-xl tracking-widest lowercase text-pretty hover:text-white transition-colors duration-300 font-mono magnetic inline-block"
            >
              danielpaul150604@gmail.com
            </a>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50 font-mono text-xs">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300 font-mono magnetic"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Burger button — original black circle */}
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 magnetic"
        onClick={toggleMenu}
        role="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
      </div>
      {/* Fixed bottom-left contact pill — always visible on every section */}
      <a
        href="mailto:danielpaul150604@gmail.com"
        aria-label="Send me an email"
        className="fixed z-40 bottom-8 left-8 flex items-center gap-3 px-7 py-4 rounded-full text-sm tracking-widest uppercase font-mono border-2 border-black text-black bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-black hover:text-white magnetic"
        style={{
          opacity: showBurger ? 1 : 0,
          pointerEvents: showBurger ? "auto" : "none",
          transition: "opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Icon icon="mdi:email-fast-outline" className="text-base shrink-0" />
        Let's talk
      </a>
    </>
  );
};

export default Navbar;
