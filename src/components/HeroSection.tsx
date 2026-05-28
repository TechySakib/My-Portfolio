"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

// ─── Types ──────────────────────────────────────────────────────────────────
type Zone = "anime" | "pro" | "ai" | null;

// ─── Identity data ───────────────────────────────────────────────────────────
const IDENTITIES = {
  anime: {
    id: "anime" as const,
    image: "/images/p-anime.jpg",
    label: "Creative",
    sublabel: "01 — The Dreamer",
    description: "Games • Anime • Movies • Creativity",
    detail: "Where imagination lives. Storytelling, art, and the worlds I escape into.",
    keywords: ["Games", "Anime", "Movies", "Art", "Creativity", "Imagination"],
    color: "#f97316",
    colorB: "#eab308",
    glow: "rgba(249,115,22,0.55)",
    glowSoft: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.4)",
    // Warm amber-orange cinematic grade
    colorGrade: "linear-gradient(180deg, rgba(249,115,22,0.08) 0%, rgba(234,88,12,0.22) 100%)",
    topGrade: "rgba(40,18,4,0.35)",
  },
  pro: {
    id: "pro" as const,
    image: "/images/p-pro.jpg",
    label: "Developer",
    sublabel: "02 — The Builder",
    description: "Student • Builder • Full Stack • Projects",
    detail: "CSE student from Bangladesh. Building products, writing code, shipping things.",
    keywords: ["React", "Next.js", "Python", "TypeScript", "AI/ML", "Open Source"],
    color: "#3b82f6",
    colorB: "#8b5cf6",
    glow: "rgba(59,130,246,0.55)",
    glowSoft: "rgba(59,130,246,0.10)",
    border: "rgba(59,130,246,0.4)",
    colorGrade: "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.15) 100%)",
    topGrade: "rgba(4,8,28,0.20)",
  },
  ai: {
    id: "ai" as const,
    image: "/images/p-ai.jpg",
    label: "AI Engineer",
    sublabel: "03 — The Researcher",
    description: "LLMs • VLMs • Research • Deep Learning",
    detail: "Exploring language models, vision AI, and the frontier of intelligence.",
    keywords: ["LLMs", "VLMs", "Transformers", "Deep Learning", "RAG", "Computer Vision"],
    color: "#a855f7",
    colorB: "#06b6d4",
    glow: "rgba(168,85,247,0.55)",
    glowSoft: "rgba(168,85,247,0.10)",
    border: "rgba(168,85,247,0.4)",
    colorGrade: "linear-gradient(180deg, rgba(168,85,247,0.08) 0%, rgba(6,182,212,0.2) 100%)",
    topGrade: "rgba(8,2,28,0.30)",
  },
} as const;

const ZONES: Zone[] = ["anime", "pro", "ai"];

// clip-path for each identity when in DEFAULT (no hover) state
// Each image is revealed through only its 1/3 vertical slice
const DEFAULT_CLIP = {
  anime: "inset(0% 66.67% 0% 0%)",
  pro:   "inset(0% 33.34% 0% 33.33%)",
  ai:    "inset(0% 0% 0% 66.67%)",
};
// When this identity is HOVERED → expand to full frame
const FULL_CLIP = "inset(0% 0% 0% 0%)";

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles({ active }: { active: Zone }) {
  const color = active ? IDENTITIES[active].color : "#a855f7";
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 4 === 0 ? color : "rgba(255,255,255,0.18)",
            boxShadow: i % 4 === 0 ? `0 0 6px ${color}` : "none",
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Identity card shown below the portrait on hover ─────────────────────────
function IdentityCard({ zone }: { zone: Zone }) {
  return (
    <AnimatePresence mode="wait">
      {zone && (
        <motion.div
          key={zone}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto mt-5 px-2"
          style={{ zIndex: 30 }}
        >
          <div
            className="rounded-2xl px-6 py-5"
            style={{
              background: "rgba(4,4,14,0.78)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${IDENTITIES[zone].border}`,
              boxShadow: `0 0 40px ${IDENTITIES[zone].glow}, 0 8px 40px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Header row */}
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.08, duration: 0.35 }}
                className="h-px w-8 rounded-full origin-left"
                style={{
                  background: `linear-gradient(90deg, ${IDENTITIES[zone].color}, ${IDENTITIES[zone].colorB})`,
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.58rem",
                  color: IDENTITIES[zone].color,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                {IDENTITIES[zone].sublabel}
              </span>
            </div>

            {/* Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                letterSpacing: "-0.03em",
                color: "white",
                lineHeight: 1.1,
                marginBottom: "0.35rem",
              }}
            >
              {IDENTITIES[zone].label}
            </motion.h3>

            {/* Description line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "0.6rem",
                lineHeight: 1.5,
              }}
            >
              {IDENTITIES[zone].description}
            </motion.p>

            {/* Keywords */}
            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {IDENTITIES[zone].keywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.22 + i * 0.04 }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    padding: "3px 10px",
                    borderRadius: "99px",
                    background: `${IDENTITIES[zone].color}16`,
                    border: `1px solid ${IDENTITIES[zone].border}`,
                    color: IDENTITIES[zone].color,
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

// ─── Default zone hint labels (shown when no hover) ───────────────────────────
function ZoneHints({ visible }: { visible: boolean }) {
  const hints = [
    { zone: "anime", left: "16.5%", label: "Creative", color: IDENTITIES.anime.color },
    { zone: "pro",   left: "50%",   label: "Developer", color: IDENTITIES.pro.color },
    { zone: "ai",    left: "83.5%", label: "AI Eng.",   color: IDENTITIES.ai.color },
  ];
  return (
    <>
      {hints.map((h) => (
        <motion.div
          key={h.zone}
          className="absolute bottom-5 flex justify-center pointer-events-none"
          style={{ left: h.left, transform: "translateX(-50%)", zIndex: 18 }}
          animate={{ opacity: visible ? 0.75 : 0, y: visible ? 0 : 5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.55rem",
              color: h.color,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "99px",
              background: "rgba(0,0,0,0.55)",
              border: `1px solid ${h.color}50`,
              backdropFilter: "blur(8px)",
            }}
          >
            {h.label}
          </span>
        </motion.div>
      ))}
    </>
  );
}

// ─── The merged portrait frame ────────────────────────────────────────────────
function MergedPortrait({
  hovered,
  onHover,
  onLeave,
}: {
  hovered: Zone;
  onHover: (z: Zone) => void;
  onLeave: () => void;
}) {
  const isAny = hovered !== null;

  const getClip = (id: Zone) => {
    if (!isAny) return DEFAULT_CLIP[id!];
    return hovered === id ? FULL_CLIP : DEFAULT_CLIP[id!];
  };

  const getOpacity = (id: Zone) => {
    if (!isAny) return 1;
    return hovered === id ? 1 : 0;
  };

  const spring = { duration: 0.72, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ isolation: "isolate" }}
      onMouseLeave={onLeave}
    >
      {/* ── Portrait image layers (all stacked, same position) ── */}
      {(["anime", "pro", "ai"] as const).map((id) => (
        <motion.div
          key={id}
          className="absolute inset-0"
          animate={{
            clipPath: getClip(id),
            opacity: getOpacity(id),
            scale: hovered === id ? 1.03 : 1,
          }}
          transition={{
            clipPath: spring,
            opacity: { duration: 0.5, ease: "easeInOut" },
            scale: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={IDENTITIES[id].image}
            alt={IDENTITIES[id].label}
            fill
            priority={id === "pro"}
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 55vw, 520px"
            className="object-cover"
            // 40% = slight offset from top so face occupies the upper portion
            style={{ objectPosition: "center 12%" }}
          />

          {/* Color grade overlay per identity */}
          <div
            className="absolute inset-0"
            style={{ background: IDENTITIES[id].colorGrade, mixBlendMode: "multiply" }}
          />

          {/* Top fade for cinematic bleed */}
          <div
            className="absolute top-0 left-0 right-0 h-24"
            style={{
              background: `linear-gradient(to bottom, ${IDENTITIES[id].topGrade}, transparent)`,
            }}
          />

          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "50%",
              background: "linear-gradient(to top, rgba(3,3,10,0.92) 0%, rgba(3,3,10,0.4) 55%, transparent 100%)",
            }}
          />
        </motion.div>
      ))}

      {/* ── Seam gradient blends (left and right of center third) ── */}
      {/* These soften the hard clip edge in default state */}
      {!isAny && (
        <>
          {[33.33, 66.67].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: `calc(${pct}% - 18px)`,
                width: "36px",
                zIndex: 14,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(3,3,10,0.55) 40%, rgba(3,3,10,0.55) 60%, transparent 100%)",
              }}
            />
          ))}

          {/* Vertical divider hairlines */}
          {[33.33, 66.67].map((pct) => (
            <motion.div
              key={`line-${pct}`}
              className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{
                left: `${pct}%`,
                zIndex: 15,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.14) 20%, rgba(255,255,255,0.14) 80%, transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          ))}
        </>
      )}

      {/* ── Hover glow rim on portrait edge ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={`rim-${hovered}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              zIndex: 16,
              boxShadow: `inset 0 0 0 1px ${IDENTITIES[hovered].border}, 0 0 60px ${IDENTITIES[hovered].glow}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Bottom accent line ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={`accent-${hovered}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-center pointer-events-none"
            style={{
              zIndex: 17,
              background: `linear-gradient(90deg, transparent, ${IDENTITIES[hovered].color}, ${IDENTITIES[hovered].colorB}, transparent)`,
              boxShadow: `0 0 16px ${IDENTITIES[hovered].glow}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Zone hint labels (no hover state) ── */}
      <ZoneHints visible={!isAny} />

      {/* ── Invisible hover zones (3 equal thirds) ── */}
      <div className="absolute inset-0 flex" style={{ zIndex: 20 }}>
        {ZONES.map((z) => (
          <div
            key={z}
            id={`portrait-zone-${z}`}
            className="flex-1 h-full cursor-crosshair"
            onMouseEnter={() => onHover(z)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export default function HeroSection() {
  const [hovered, setHovered] = useState<Zone>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Mouse-reactive ambient glow (relative position 0–1)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const gx = useSpring(mx, { stiffness: 65, damping: 22 });
  const gy = useSpring(my, { stiffness: 65, damping: 22 });

  // Convert 0-1 to pixel-based left/top via useTransform
  const [heroSize, setHeroSize] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setHeroSize({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const glowPx = useTransform(gx, [0, 1], [0, heroSize.w]);
  const glowPy = useTransform(gy, [0, 1], [0, heroSize.h]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    },
    [mx, my]
  );

  const activeId = hovered ? IDENTITIES[hovered] : null;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh", background: "#030308" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
    >
      {/* ── Full-screen deep bg ───────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #0c0c1e 0%, #030308 70%)",
          zIndex: 0,
        }}
      />

      {/* ── Mouse-reactive ambient glow ───────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          x: glowPx,
          y: glowPy,
          translateX: "-50%",
          translateY: "-50%",
          background: activeId
            ? `radial-gradient(circle, ${activeId.glowSoft} 0%, transparent 65%)`
            : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)",
          mixBlendMode: "screen",
          transition: "background 0.6s ease",
        }}
      />

      {/* ── Floating particles ────────────────────────────────────────── */}
      <Particles active={hovered} />

      {/* ── "NAZMUS SAKIB" large watermark behind portrait ────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 2.2, ease: "easeOut" }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(4.5rem, 16vw, 16rem)",
            letterSpacing: "-0.06em",
            lineHeight: 0.88,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.032)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          NAZMUS
          <br />
          SAKIB
        </div>
      </motion.div>

      {/* ── MAIN CONTENT column ───────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center w-full px-4"
        style={{ zIndex: 10 }}
      >
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-px w-10"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.7))",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              color: "rgba(168,85,247,0.85)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="h-px w-10"
            style={{
              background: "linear-gradient(90deg, rgba(168,85,247,0.7), transparent)",
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.9rem, 4.5vw, 3.6rem)",
            letterSpacing: "-0.04em",
            color: "white",
            lineHeight: 1.05,
            textAlign: "center",
            marginBottom: "0.4rem",
            textShadow: "0 0 60px rgba(0,0,0,1)",
          }}
        >
          Nazmus Sakib
        </motion.h1>

        {/* Dynamic subtitle — changes on hover */}
        <div className="h-6 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.p
                key={hovered}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  color: IDENTITIES[hovered].color,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {IDENTITIES[hovered].description}
              </motion.p>
            ) : (
              <motion.p
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.04em",
                }}
              >
                Developer · AI Engineer · Creative
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ═══ MERGED PORTRAIT ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
          style={{
            // Centered portrait — responsive width, fixed aspect ratio
            maxWidth: "clamp(280px, 46vw, 500px)",
            aspectRatio: "3 / 4",
            margin: "0 auto",
            // Outer glow ring
            filter: activeId
              ? `drop-shadow(0 0 40px ${activeId.glow})`
              : "drop-shadow(0 0 24px rgba(139,92,246,0.18))",
            transition: "filter 0.6s ease",
          }}
        >
          {/* Ambient glow blob behind portrait */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-15%",
              borderRadius: "50%",
              background: activeId
                ? `radial-gradient(circle, ${activeId.glowSoft} 0%, transparent 65%)`
                : "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)",
              transition: "background 0.6s ease",
              zIndex: 0,
            }}
          />

          <MergedPortrait
            hovered={hovered}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
          />
        </motion.div>

        {/* Identity card below portrait */}
        <IdentityCard zone={hovered} />

        {/* "Hover to explore" hint (default state only) */}
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, y: hovered ? 4 : 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 flex items-center gap-2"
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Hover to explore · 3 identities
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col items-center gap-2 mt-8"
          style={{ pointerEvents: "none" }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.5rem",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            className="overflow-hidden rounded-full"
            style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.07)" }}
          >
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              style={{
                width: "100%",
                height: "40%",
                background: "rgba(168,85,247,0.8)",
                borderRadius: "99px",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
