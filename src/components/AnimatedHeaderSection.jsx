/**
 * Reusable section header: subtitle, large title (split by spaces into lines), and body text.
 * Clean, smooth entry animations without 50vh jumps or layout collisions.
 */
import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top 85%",
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, []);

  return (
    <div ref={contextRef} className="w-full">
      <div className="overflow-hidden">
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 pt-16 sm:gap-8"
        >
          <p
            className={`text-xs sm:text-sm font-light tracking-[0.4rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-wrap items-baseline gap-x-6 gap-y-2 uppercase banner-text-responsive ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index} className="inline-block">{part}</span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 mt-8 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2 opacity-20" />
        <div className="py-8 sm:py-12 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
