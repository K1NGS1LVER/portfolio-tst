import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useMagnetic — React hook to apply a premium magnetic pull effect to an element.
 * Pulls the element towards the cursor when hovered, and springs back on leave.
 * Returns a ref to be bound to the element.
 */
export const useMagnetic = (multiplier = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * multiplier,
        y: y * multiplier,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [multiplier]);

  return ref;
};

/**
 * initMagneticElements — Global class-based dynamic utility to bind magnetic effects
 * to any element with the '.magnetic' class. Safely handles re-renders and late mounting.
 */
export const initMagneticElements = (multiplier = 0.25) => {
  if (window.innerWidth < 768) return () => {};

  const elements = document.querySelectorAll(".magnetic");
  const boundElements = [];

  elements.forEach((el) => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = "true";

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * multiplier,
        y: y * multiplier,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    boundElements.push({ el, handleMouseMove, handleMouseLeave });
  });

  // Return a cleanup function
  return () => {
    boundElements.forEach(({ el, handleMouseMove, handleMouseLeave }) => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      delete el.dataset.magneticBound;
    });
  };
};

