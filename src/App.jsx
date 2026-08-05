/**
 * Root App component. Wraps the entire site in Lenis for smooth scrolling.
 * Instantiates the Custom Mouse Cursor and binds magnetic interactions.
 */
import React, { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import SkillsSummary from "./sections/SkillsSummary";
import Skills from "./sections/Skills";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import CustomCursor from "./components/CustomCursor";
import { initMagneticElements } from "./hooks/useMagnetic";

const App = () => {
  useEffect(() => {
    // Initial binding of magnetic items
    let cleanup = initMagneticElements();

    // Re-bind when DOM mutations happen to catch dynamically loaded buttons
    const observer = new MutationObserver(() => {
      cleanup();
      cleanup = initMagneticElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);

  return (
    <ReactLenis root>
      {/* Premium custom mouse follower */}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SkillsSummary />
        <Skills />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </main>
    </ReactLenis>
  );
};

export default App;
