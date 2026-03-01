/**
 * Root App component. Wraps the entire site in Lenis for smooth scrolling and
 * shows a loading overlay until Three.js assets (e.g. Hero planet) are fully loaded.
 */
import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";

const App = () => {
  // useProgress() comes from React Three Fiber/Drei; tracks loading of 3D assets (used in Hero)
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  // Once all assets are loaded (progress === 100), reveal the main content with a fade
  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    // Lenis provides smooth, momentum-based scrolling; root makes it the scroll container
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {/* Full-screen loading overlay with progress bar until 3D scene is ready */}
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Main content: fades in after loading; section order defines page flow */}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
