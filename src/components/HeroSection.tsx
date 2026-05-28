"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

type Identity = "anime" | "professional" | "ai" | null;

// ─── Identity config ───────────────────────────────────────────────────────
const identities = {
  anime: {
    id: "anime" as const,
    label: "Creative Self",
    number: "01",
    image: "/images/anime-self.jpg",
    color: "#f59e0b",
    colorSecondary: "#ef4444",
    glowColor: "rgba(245, 158, 11, 0.5)",
    borderColor: "rgba(245, 158, 11, 0.45)",
    tag: "games · anime · creativity",
    headline: "Dreamer & Creator",
    description: "Games, anime, movies,\ncreativity, imagination.",
    keywords: ["Games", "Anime", "Movies", "Art", "Storytelling", "Imagination"],
    // Default clip — left third: inset(top right bottom left)
    defaultClip: "inset(0% 66.67% 0% 0%)",
    fullClip: "inset(0% 0% 0% 0%)",
    zone: "left" as const,
    hoverText: "01 · Creative",
    bgGradient: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(239,68,68,0.06) 100%)",
  },
  professional: {
    id: "professional" as const,
    label: "Current Self",
    number: "02",
    image: "/images/professional.jpg",
    color: "#3b82f6",
    colorSecondary: "#8b5cf6",
    glowColor: "rgba(59, 130, 246, 0.5)",
    borderColor: "rgba(59, 130, 246, 0.45)",
    tag: "developer · student · builder",
    headline: "Engineer & Builder",
    description: "Building projects,\nlearning every day.",
    keywords: ["React", "Next.js", "TypeScript", "Python", "AI/ML", "Open Source"],
    // Default clip — middle third
    defaultClip: "inset(0% 33.33% 0% 33.33%)",
    fullClip: "inset(0% 0% 0% 0%)",
    zone: "center" as const,
    hoverText: "02 · Professional",
    bgGradient: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 100%)",
  },
  ai: {
    id: "ai" as const,
    label: "Future Self",
    number: "03",
    image: "/images/ai-engineer.jpg",
    color: "#a855f7",
    colorSecondary: "#06b6d4",
    glowColor: "rgba(168, 85, 247, 0.5)",
    borderColor: "rgba(168, 85, 247, 0.45)",
    tag: "llms · vision · research",
    headline: "AI Researcher",
    description: "LLMs, VLMs, Deep Learning,\nRAG, AI Research.",
    keywords: ["LLMs", "VLMs", "Deep Learning", "RAG", "Computer Vision", "AI Research"],
    // Default clip — right third
    defaultClip: "inset(0% 0% 0% 66.67%)",
    fullClip: "inset(0% 0% 0% 0%)",
    zone: "right" as const,
    hoverText: "03 · AI Engineer",
    bgGradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(6,182,212,0.06) 100%)",
  },
};

const identityOrder = ["anime", "professional", "ai"] as const;

// ─── Divider lines (visible in default state) ─────────────────────────────
function DividerLines({ hovered }: { hovered: Identity }) {
  return (
    <>
      {[33.33, 66.67].map((pct) => (
        <motion.div
          key={pct}
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ left: `${pct}%`, zIndex: 20 }}
          animate={{ opacity: hovered ? 0 : 0.18 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent 100%)",
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

// ─── Zone markers (default state pill labels) ──────────────────────────────
function ZoneMarkers({ hovered }: { hovered: Identity }) {
  const markers = [
    { id: "anime", left: "16.67%", label: identities.anime.tag, color: identities.anime.color, border: identities.anime.borderColor },
    { id: "professional", left: "50%", label: identities.professional.tag, color: identities.professional.color, border: identities.professional.borderColor },
    { id: "ai", left: "83.33%", label: identities.ai.tag, color: identities.ai.color, border: identities.ai.borderColor },
  ];

  return (
    <>
      {markers.map((m) => (
        <motion.div
          key={m.id}
          className="absolute bottom-36 flex justify-center pointer-events-none"
          style={{ left: m.left, transform: "translateX(-50%)", zIndex: 20 }}
          animate={{ opacity: hovered ? 0 : 0.75, y: hovered ? 6 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "rgba(0,0,0,0.55)",
              border: `1px solid ${m.border}`,
              color: m.color,
              backdropFilter: "blur(10px)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontSize: "0.6rem",
            }}
          >
            {m.label}
          </span>
        </motion.div>
      ))}
    </>
  );
}

// ─── Identity card (shows on hover) ──────────────────────────────────────
function IdentityCard({ identity, visible }: {
  identity: (typeof identities)[keyof typeof identities];
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={identity.id}
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 px-8 pb-12 md:px-20"
          style={{ zIndex: 30 }}
        >
          <div
            className="rounded-2xl p-6 md:p-8 max-w-lg mx-auto"
            style={{
              background: "rgba(4, 4, 12, 0.72)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: `1px solid ${identity.borderColor}`,
              boxShadow: `0 0 60px ${identity.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Top row */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="flex items-center gap-3 mb-4"
            >
              <motion.div
                className="h-0.5 w-8 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${identity.color}, ${identity.colorSecondary})`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.6rem",
                  color: identity.color,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                {identity.number} · {identity.label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                lineHeight: 1.15,
                color: "white",
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              {identity.headline}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.7,
                marginBottom: "1.1rem",
                whiteSpace: "pre-line",
              }}
            >
              {identity.description}
            </motion.p>

            {/* Keywords */}
            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.4 }}
            >
              {identity.keywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.26 + i * 0.04, duration: 0.3 }}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: `${identity.color}18`,
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
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [hovered, setHovered] = useState<Identity>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Mouse reactive glow position (relative to hero)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const glowX = useSpring(rawX, { stiffness: 80, damping: 25 });
  const glowY = useSpring(rawY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  // Build clip-path and opacity for each layer
  const getLayerStyle = (id: keyof typeof identities) => {
    const cfg = identities[id];
    if (!hovered) {
      // Default: each shows its designated slice
      return { clip: cfg.defaultClip, opacity: 1, scale: 1, brightness: 1 };
    }
    if (hovered === id) {
      // Hovered: expand to full
      return { clip: cfg.fullClip, opacity: 1, scale: 1.025, brightness: 1 };
    }
    // Not hovered: fade out (clip stays at default, but opacity 0)
    return { clip: cfg.defaultClip, opacity: 0, scale: 0.99, brightness: 0.4 };
  };

  const transition = {
    clipPath: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    opacity:  { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    scale:    { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "620px" }}
      onMouseLeave={() => setHovered(null)}
    >
      {/* ── Atmospheric bg gradient ─────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #0d0d20 0%, #030305 70%)", zIndex: 0 }}
      />

      {/* ── Mouse-reactive hero glow ─────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: hovered
            ? `radial-gradient(circle, ${identities[hovered].glowColor.replace("0.5", "0.12")} 0%, transparent 70%)`
            : "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "screen",
          transition: "background 0.6s ease",
        }}
      />

      {/* ── Name watermark ───────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.8 }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(5rem, 18vw, 18rem)",
            letterSpacing: "-0.06em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.035)",
            userSelect: "none",
            lineHeight: 0.88,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          NAZMUS
          <br />
          SAKIB
        </div>
      </motion.div>

      {/* ── Stacked portrait layers ──────────────────────────────────── */}
      {/*  All images sit at identical absolute positions.
           Each is revealed only through its clip-path.
           On hover, the relevant layer expands to full width.          */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        {identityOrder.map((id) => {
          const cfg = identities[id];
          const s = getLayerStyle(id);

          return (
            <motion.div
              key={id}
              className="absolute inset-0"
              animate={{
                clipPath: s.clip,
                opacity: s.opacity,
                scale: s.scale,
              }}
              transition={transition}
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src={cfg.image}
                alt={cfg.label}
                fill
                priority={id === "professional"}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center 8%" }}
              />

              {/* Per-layer color grade */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    id === "anime"
                      ? "linear-gradient(180deg, rgba(245,158,11,0.0) 40%, rgba(245,158,11,0.18) 100%)"
                      : id === "professional"
                      ? "linear-gradient(180deg, rgba(59,130,246,0.0) 40%, rgba(59,130,246,0.18) 100%)"
                      : "linear-gradient(180deg, rgba(168,85,247,0.0) 30%, rgba(168,85,247,0.22) 100%)",
                }}
              />

              {/* Bottom vignette per layer */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(3,3,5,0.85) 0%, rgba(3,3,5,0.4) 30%, transparent 60%)",
                }}
              />

              {/* Top fade */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(3,3,5,0.5) 0%, transparent 25%)",
                }}
              />
            </motion.div>
          );
        })}

        {/* ── Divider lines (default state) ──────────────────────── */}
        <DividerLines hovered={hovered} />

        {/* ── Zone pill labels (default state) ───────────────────── */}
        <ZoneMarkers hovered={hovered} />
      </div>

      {/* ── Invisible hover zones ────────────────────────────────────── */}
      {/* These capture mouse enter/leave for each third */}
      <div className="absolute inset-0 flex" style={{ zIndex: 15 }}>
        {(["anime", "professional", "ai"] as const).map((id) => (
          <div
            key={id}
            id={`hero-zone-${id}`}
            className="relative flex-1 h-full cursor-crosshair"
            onMouseEnter={() => setHovered(id)}
          />
        ))}
      </div>

      {/* ── Top hero copy ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 left-0 right-0 flex flex-col items-center text-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        {/* Portfolio label */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="flex items-center gap-3 mb-3"
        >
          <div
            className="h-px w-10"
            style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6))" }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              color: "rgba(168,85,247,0.85)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
          <div
            className="h-px w-10"
            style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.6), transparent)" }}
          />
        </motion.div>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            letterSpacing: "-0.04em",
            color: "white",
            lineHeight: 1.05,
            textShadow: "0 2px 40px rgba(0,0,0,0.9)",
          }}
        >
          Nazmus Sakib
        </h1>

        <motion.p
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            color: "rgba(255,255,255,0.42)",
            marginTop: "0.5rem",
            letterSpacing: "0.04em",
          }}
        >
          Developer · AI Engineer · Creative
        </motion.p>

        {/* Active identity label while hovering */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              key={hovered}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: identities[hovered].color,
                marginTop: "0.5rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {identities[hovered].hoverText}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Identity info card (bottom, on hover) ────────────────────── */}
      {identityOrder.map((id) => (
        <IdentityCard key={id} identity={identities[id]} visible={hovered === id} />
      ))}

      {/* ── Hover glow bottom accent ─────────────────────────────────── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={`glow-${hovered}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
            style={{
              zIndex: 25,
              background: `linear-gradient(90deg, transparent 0%, ${identities[hovered].color} 35%, ${identities[hovered].colorSecondary} 65%, transparent 100%)`,
              boxShadow: `0 0 30px ${identities[hovered].glowColor}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Bottom info bar ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-8 md:px-16 pointer-events-none"
        style={{ zIndex: 22 }}
      >
        <motion.div animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.4 }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "0.2rem",
            }}
          >
            Three versions of one person
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.42)" }}>
            existing inside one identity.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            className="w-px h-7 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="w-full rounded-full"
              style={{ height: "40%", background: "rgba(168,85,247,0.85)" }}
            />
          </div>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="text-right"
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "0.2rem",
            }}
          >
            Hover to reveal
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.42)" }}>
            3 identities
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
