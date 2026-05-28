"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Identity = "anime" | "professional" | "ai" | null;

const identities = {
  anime: {
    id: "anime" as const,
    label: "Creative Self",
    number: "01",
    image: "/images/anime-self.jpg",
    color: "#f59e0b",
    colorSecondary: "#ef4444",
    gradient: "linear-gradient(180deg, rgba(245,158,11,0.0) 0%, rgba(245,158,11,0.15) 60%, rgba(239,68,68,0.3) 100%)",
    glowColor: "rgba(245, 158, 11, 0.4)",
    borderColor: "rgba(245, 158, 11, 0.5)",
    tag: "games · anime · creativity",
    headline: "Dreamer & Creator",
    description: "Games, anime, movies,\ncreativity, imagination.",
    keywords: ["Games", "Anime", "Movies", "Art", "Storytelling", "Imagination"],
    position: "left",
  },
  professional: {
    id: "professional" as const,
    label: "Current Self",
    number: "02",
    image: "/images/professional.jpg",
    color: "#3b82f6",
    colorSecondary: "#8b5cf6",
    gradient: "linear-gradient(180deg, rgba(59,130,246,0.0) 0%, rgba(59,130,246,0.15) 60%, rgba(139,92,246,0.3) 100%)",
    glowColor: "rgba(59, 130, 246, 0.4)",
    borderColor: "rgba(59, 130, 246, 0.5)",
    tag: "developer · student · builder",
    headline: "Engineer & Builder",
    description: "Building projects,\nlearning every day.",
    keywords: ["React", "Next.js", "TypeScript", "Python", "AI/ML", "Open Source"],
    position: "center",
  },
  ai: {
    id: "ai" as const,
    label: "Future Self",
    number: "03",
    image: "/images/ai-engineer.jpg",
    color: "#a855f7",
    colorSecondary: "#06b6d4",
    gradient: "linear-gradient(180deg, rgba(168,85,247,0.0) 0%, rgba(168,85,247,0.15) 60%, rgba(6,182,212,0.3) 100%)",
    glowColor: "rgba(168, 85, 247, 0.4)",
    borderColor: "rgba(168, 85, 247, 0.5)",
    tag: "llms · vision · research",
    headline: "AI Researcher",
    description: "LLMs, VLMs, Deep Learning,\nRAG, AI Research.",
    keywords: ["LLMs", "VLMs", "Deep Learning", "RAG", "Computer Vision", "AI Research"],
    position: "right",
  },
};

const identityOrder: (keyof typeof identities)[] = ["anime", "professional", "ai"];

interface IdentityPanelProps {
  identity: (typeof identities)[keyof typeof identities];
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: (id: Identity) => void;
  onLeave: () => void;
  index: number;
}

function IdentityPanel({
  identity,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
  index,
}: IdentityPanelProps) {
  const dimmed = isAnyHovered && !isHovered;

  return (
    <motion.div
      layout
      id={`hero-panel-${identity.id}`}
      className="relative h-full cursor-pointer overflow-hidden"
      style={{
        flex: isHovered ? "2.2 2.2 0" : isAnyHovered ? "0.6 0.6 0" : "1 1 0",
        transition: "flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        borderRight:
          index < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      onMouseEnter={() => onHover(identity.id)}
      onMouseLeave={onLeave}
    >
      {/* Portrait image */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: dimmed ? "brightness(0.25) saturate(0.3)" : "brightness(1) saturate(1)",
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={identity.image}
          alt={identity.label}
          fill
          className="object-cover"
          style={{
            objectPosition: "top center",
          }}
          priority={identity.id === "professional"}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>

      {/* Color gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: identity.gradient }}
        animate={{ opacity: isHovered ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
      />

      {/* Top glow on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${identity.glowColor} 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Vertical text label (default state) */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnyHovered ? 0 : 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-none"
          >
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(0,0,0,0.5)",
                border: `1px solid ${identity.borderColor}`,
                color: identity.color,
                backdropFilter: "blur(8px)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {identity.tag}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Number indicator */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex justify-center"
        animate={{ opacity: isHovered ? 0 : isAnyHovered ? 0.2 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: identity.color,
            letterSpacing: "0.2em",
          }}
        >
          {identity.number}
        </span>
      </motion.div>

      {/* Hover content overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 p-8 pb-12"
          >
            {/* Glass card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${identity.borderColor}`,
                boxShadow: `0 0 40px ${identity.glowColor}`,
              }}
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-2 mb-3"
              >
                <div
                  className="w-5 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${identity.color}, ${identity.colorSecondary})` }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    color: identity.color,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {identity.number} — {identity.label}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  lineHeight: 1.2,
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                {identity.headline}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  whiteSpace: "pre-line",
                }}
              >
                {identity.description}
              </motion.p>

              {/* Keywords */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="flex flex-wrap gap-1.5"
              >
                {identity.keywords.map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.28 + i * 0.04, duration: 0.3 }}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: `rgba(${
                        identity.id === "anime"
                          ? "245, 158, 11"
                          : identity.id === "professional"
                          ? "59, 130, 246"
                          : "168, 85, 247"
                      }, 0.15)`,
                      border: `1px solid ${identity.borderColor}`,
                      color: identity.color,
                    }}
                  >
                    {kw}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom border glow on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${identity.color}, ${identity.colorSecondary}, transparent)`,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const [hoveredIdentity, setHoveredIdentity] = useState<Identity>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((id: Identity) => {
    setHoveredIdentity(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredIdentity(null);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full"
      style={{ height: "100svh", minHeight: "600px" }}
      ref={containerRef}
    >
      {/* Background name watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 3 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 2, ease: "easeOut" }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(4rem, 15vw, 14rem)",
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            userSelect: "none",
            lineHeight: 0.9,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          NAZMUS
          <br />
          SAKIB
        </motion.div>
      </div>

      {/* Three panels */}
      <div
        className="relative flex h-full"
        style={{ zIndex: 4 }}
        onMouseLeave={handleLeave}
      >
        {identityOrder.map((key, index) => (
          <IdentityPanel
            key={key}
            identity={identities[key]}
            isHovered={hoveredIdentity === key}
            isAnyHovered={hoveredIdentity !== null}
            onHover={handleHover}
            onLeave={handleLeave}
            index={index}
          />
        ))}
      </div>

      {/* Bottom hero info bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-8 md:px-16 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {/* Left: tagline */}
        <div>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Three versions of one person
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            existing together
          </p>
        </div>

        {/* Center: scroll hint */}
        <div className="flex flex-col items-center gap-2">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-6 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="w-full h-1/2 rounded-full"
              style={{ background: "rgba(168, 85, 247, 0.8)" }}
            />
          </motion.div>
        </div>

        {/* Right: identity count */}
        <div className="text-right">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Hover to explore
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            3 identities
          </p>
        </div>
      </motion.div>

      {/* Top hero title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 left-0 right-0 flex flex-col items-center text-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center gap-2 mb-3"
        >
          <div
            className="w-8 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6))" }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(168,85,247,0.8)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
          <div
            className="w-8 h-px"
            style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.6), transparent)" }}
          />
        </motion.div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            letterSpacing: "-0.03em",
            color: "white",
            lineHeight: 1.1,
            textShadow: "0 0 40px rgba(0,0,0,0.8)",
          }}
        >
          Nazmus Sakib
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            color: "rgba(255,255,255,0.45)",
            marginTop: "0.5rem",
            letterSpacing: "0.02em",
          }}
        >
          Developer · AI Engineer · Creative
        </p>
      </motion.div>
    </section>
  );
}
