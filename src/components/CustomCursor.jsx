/**
 * CustomCursor — rendering a sleek mouse trail following the user's cursor.
 * Uses GSAP quickTo for ultra-smooth rendering.
 * Automatically adds a hovered state to scale up the ring when cursor
 * is hovering over interactive elements (anchors, buttons, inputs, etc.)
 */
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  // Check if we are on desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    // quickTo helper for x and y translations
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3" });
    
    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.25, ease: "power2.out" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.25, ease: "power2.out" });

    const handleMouseMove = (e) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ── Hover states detection ──────────────────────────────────────
    const onMouseEnter = () => {
      ringRef.current?.classList.add("hovered");
    };
    const onMouseLeave = () => {
      ringRef.current?.classList.remove("hovered");
    };

    const attachHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], .cursor-pointer, .magnetic, input, textarea');
      targets.forEach((target) => {
        target.addEventListener("mouseenter", onMouseEnter);
        target.addEventListener("mouseleave", onMouseLeave);
      });
    };

    // Attach listeners initially
    attachHoverListeners();

    // Re-attach listeners periodically (since sections/items animate in or mount late)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll('a, button, [role="button"], .cursor-pointer, .magnetic, input, textarea');
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnter);
        target.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
};

export default CustomCursor;
