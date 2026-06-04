"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseTracker() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Large ambient glow that follows mouse */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 2,
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.04) 0%, rgba(59,130,246,0.02) 40%, transparent 70%)",
          borderRadius: "50%",
          mixBlendMode: "screen",
        }}
      />

      {/* Small sharp cursor glow */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 2,
          width: "8px",
          height: "8px",
          background: "rgba(168,85,247,0.6)",
          borderRadius: "50%",
          boxShadow: "0 0 16px rgba(168,85,247,0.4), 0 0 4px rgba(168,85,247,0.8)",
        }}
      />
    </>
  );
}
