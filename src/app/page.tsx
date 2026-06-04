"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/sections/Projects";
import AboutSection from "@/components/sections/About";
import UsesSection from "@/components/sections/Uses";
import ContactSection from "@/components/sections/Contact";
import MouseTracker from "@/components/MouseTracker";

// Load Three.js canvas only on client — avoids SSR WebGL issues
const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  ssr: false,
});

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after brief delay
    const t = setTimeout(() => setIsLoaded(true), 100);

    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <main
      style={{
        background: "var(--bg-deep)",
        minHeight: "100vh",
        position: "relative",
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.6s ease",
        cursor: "none",
      }}
    >
      {/* Three.js particle background */}
      <ParticleCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Custom cursor + ambient glow */}
      <MouseTracker />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* About (with tech stack) — directly after hero */}
      <AboutSection />

      {/* Projects */}
      <ProjectsSection />

      {/* Uses & Contact */}
      <UsesSection />
      <ContactSection />
    </main>
  );
}
