"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type Zone = "anime" | "pro" | "ai" | null;

// ─── Config ───────────────────────────────────────────────────────────────────
const IDENTITIES = {
  anime: {
    id: "anime" as const,
    image: "/images/p-anime.jpg",
    label: "Creative",
    number: "01",
    sublabel: "The Dreamer",
    tagline: "Where imagination lives.",
    description:
      "Gaming, anime, movies and the worlds I escape into. Storytelling and creativity are how I breathe.",
    keywords: ["Games", "Anime", "Movies", "Art", "Creativity", "Storytelling"],
    color: "#f97316",
    colorB: "#eab308",
    glow: "rgba(249,115,22,0.55)",
    glowSoft: "rgba(249,115,22,0.09)",
    border: "rgba(249,115,22,0.32)",
    grade:
      "linear-gradient(180deg, rgba(249,115,22,0.06) 0%, rgba(234,88,12,0.22) 100%)",
    topTint: "rgba(40,18,4,0.32)",
    panelSide: "left" as const,
    slideX: 160,
  },
  pro: {
    id: "pro" as const,
    image: "/images/p-pro.jpg",
    label: "Developer",
    number: "02",
    sublabel: "The Builder",
    tagline: "Building one project at a time.",
    description:
      "CSE student at North South University. Full-stack developer focused on AI/ML systems and open-source.",
    keywords: ["React", "Next.js", "Python", "TypeScript", "AI/ML", "Open Source"],
    color: "#3b82f6",
    colorB: "#8b5cf6",
    glow: "rgba(59,130,246,0.55)",
    glowSoft: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.32)",
    grade:
      "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(139,92,246,0.16) 100%)",
    topTint: "rgba(4,8,28,0.20)",
    panelSide: "center" as const,
    slideX: 0,
  },
  ai: {
    id: "ai" as const,
    image: "/images/p-ai.jpg",
    label: "AI Engineer",
    number: "03",
    sublabel: "The Researcher",
    tagline: "Exploring the frontier of intelligence.",
    description:
      "Deep in the world of large language models, vision AI, retrieval systems, and what machines can learn to understand.",
    keywords: ["LLMs", "VLMs", "Transformers", "Deep Learning", "RAG", "Computer Vision"],
    color: "#a855f7",
    colorB: "#06b6d4",
    glow: "rgba(168,85,247,0.55)",
    glowSoft: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.32)",
    grade:
      "linear-gradient(180deg, rgba(168,85,247,0.07) 0%, rgba(6,182,212,0.2) 100%)",
    topTint: "rgba(8,2,28,0.28)",
    panelSide: "right" as const,
    slideX: -160,
  },
} as const;

// Default clip-path — each image shows only its 1/3 vertical slice
const D_CLIP = {
  anime: "inset(0% 66.67% 0% 0%)",
  pro: "inset(0% 33.34% 0% 33.33%)",
  ai: "inset(0% 0% 0% 66.67%)",
};
const FULL = "inset(0% 0% 0% 0%)";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Particles ────────────────────────────────────────────────────────────────
type ParticleDef = {
  w: number; h: number; left: string; top: string;
  bg: string; shadow: string; opacity: number;
  dy: number[]; dx: number[]; dur: number; delay: number;
};

function Particles({ active }: { active: Zone }) {
  const [particles, setParticles] = useState<ParticleDef[]>([]);
  const color = active ? IDENTITIES[active].color : "#8b5cf6";

  // Generate on client only — avoids SSR/client Math.random() mismatch
  useEffect(() => {
    const list: ParticleDef[] = Array.from({ length: 32 }).map((_, i) => {
      const isAccent = i % 5 === 0;
      const c = isAccent ? color : "rgba(255,255,255,0.15)";
      return {
        w: Math.random() * 2.5 + 0.8,
        h: Math.random() * 2.5 + 0.8,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        bg: c,
        shadow: isAccent ? `0 0 8px ${color}` : "none",
        opacity: Math.random() * 0.5 + 0.08,
        dy: [0, -(28 + Math.random() * 36), 0],
        dx: [0, (Math.random() - 0.5) * 18, 0],
        dur: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      };
    });
    setParticles(list);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w, height: p.h,
            left: p.left, top: p.top,
            background: p.bg,
            boxShadow: p.shadow,
            opacity: p.opacity,
          }}
          animate={{ y: p.dy, x: p.dx, opacity: [0.08, 0.45, 0.08] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}


// ─── Side Panel (Desktop left/right) ─────────────────────────────────────────
function SidePanel({
  zone,
  side,
}: {
  zone: keyof typeof IDENTITIES;
  side: "left" | "right";
}) {
  const id = IDENTITIES[zone];
  return (
    <motion.div
      key={`panel-${zone}`}
      layout
      initial={{ opacity: 0, x: side === "left" ? -48 : 48, filter: "blur(10px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: side === "left" ? -28 : 28, filter: "blur(6px)" }}
      transition={{ duration: 0.62, ease: EASE }}
      className="shrink-0 hidden lg:block"
      style={{ width: "clamp(240px, 22vw, 320px)" }}
    >
      <div
        className="rounded-2xl p-7 h-full"
        style={{
          background: "rgba(4,4,16,0.82)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${id.border}`,
          boxShadow: `0 0 60px ${id.glow}, 0 8px 56px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: side === "left" ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
          className="flex items-center gap-2.5 mb-5"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.18, duration: 0.4 }}
            className="h-px w-7 rounded-full origin-left"
            style={{ background: `linear-gradient(90deg, ${id.color}, ${id.colorB})` }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.56rem",
              color: id.color,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {id.number} · {id.sublabel}
          </span>
        </motion.div>

        {/* Label */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45, ease: EASE }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
            letterSpacing: "-0.04em",
            color: "white",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          {id.label}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.76rem",
            color: id.color,
            fontStyle: "italic",
            opacity: 0.85,
            marginBottom: "1.1rem",
          }}
        >
          {id.tagline}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="h-px w-full rounded-full mb-4 origin-left"
          style={{ background: `linear-gradient(90deg, ${id.border}, transparent)` }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.58)",
            lineHeight: 1.75,
            marginBottom: "1rem",
          }}
        >
          {id.description}
        </motion.p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5">
          {id.keywords.map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.26 + i * 0.05, duration: 0.3 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.64rem",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "99px",
                background: `${id.color}14`,
                border: `1px solid ${id.border}`,
                color: id.color,
              }}
            >
              {kw}
            </motion.span>
          ))}
        </div>

        {/* Neon edge line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
          className="absolute top-4 bottom-4 w-0.5 rounded-full origin-top"
          style={{
            [side === "left" ? "right" : "left"]: "-1px",
            background: `linear-gradient(to bottom, transparent, ${id.color}, transparent)`,
            boxShadow: `0 0 12px ${id.glow}`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Bottom card (center panel + mobile fallback) ─────────────────────────────
function BottomCard({ zone }: { zone: Zone }) {
  if (!zone) return null;
  const id = IDENTITIES[zone];

  return (
    <AnimatePresence mode="wait">
      {zone && (
        <motion.div
          key={zone}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full max-w-sm mx-auto px-3 mt-4"
          // On desktop only show for center (pro); always show on mobile
          style={{ zIndex: 30 }}
        >
          <div
            className="rounded-2xl px-6 py-5"
            style={{
              background: "rgba(4,4,16,0.82)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${id.border}`,
              boxShadow: `0 0 48px ${id.glow}, 0 8px 40px rgba(0,0,0,0.65)`,
            }}
          >
            {/* Eyebrow row */}
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="h-px w-6 rounded-full"
                style={{ background: `linear-gradient(90deg, ${id.color}, ${id.colorB})` }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.54rem",
                  color: id.color,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {id.number} · {id.sublabel}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                letterSpacing: "-0.03em",
                color: "white",
                marginBottom: "0.5rem",
              }}
            >
              {id.label}
            </h3>

            {/* Divider */}
            <div
              className="h-px w-full rounded-full mb-4"
              style={{ background: `linear-gradient(90deg, ${id.border}, transparent)` }}
            />

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.52)",
                lineHeight: 1.75,
                marginBottom: "1.1rem",
              }}
            >
              {id.description}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2">
              {id.keywords.map((kw, i) => (
                <motion.span
                  key={kw}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.18 + i * 0.04 }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.64rem",
                    fontWeight: 500,
                    padding: "4px 12px",
                    borderRadius: "99px",
                    background: `${id.color}14`,
                    border: `1px solid ${id.border}`,
                    color: id.color,
                  }}
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── The merged portrait with stacked clip-path layers ────────────────────────
function MergedPortrait({
  hovered,
  onHover,
}: {
  hovered: Zone;
  onHover: (z: Zone) => void;
}) {
  const isAny = hovered !== null;

  const getClip = (id: Zone) => {
    if (!isAny) return D_CLIP[id!];
    return hovered === id ? FULL : D_CLIP[id!];
  };

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ isolation: "isolate" }}>
      {/* Stacked portrait layers */}
      {(["anime", "pro", "ai"] as const).map((id) => (
        <motion.div
          key={id}
          className="absolute inset-0"
          animate={{
            clipPath: getClip(id),
            opacity: !isAny ? 1 : hovered === id ? 1 : 0,
            scale: hovered === id ? 1.035 : 1,
          }}
          transition={{
            clipPath: { duration: 0.72, ease: EASE },
            opacity: { duration: 0.48, ease: "easeInOut" },
            scale: { duration: 0.72, ease: EASE },
          }}
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={IDENTITIES[id].image}
            alt={IDENTITIES[id].label}
            fill
            priority={id === "pro"}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 460px"
            className="object-cover"
            style={{ objectPosition: "center 10%" }}
          />
          {/* Color grade */}
          <div
            className="absolute inset-0"
            style={{ background: IDENTITIES[id].grade, mixBlendMode: "multiply" }}
          />
          {/* Top tint */}
          <div
            className="absolute top-0 left-0 right-0 h-28"
            style={{
              background: `linear-gradient(to bottom, ${IDENTITIES[id].topTint}, transparent)`,
            }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "52%",
              background:
                "linear-gradient(to top, rgba(3,3,10,0.94) 0%, rgba(3,3,10,0.45) 55%, transparent 100%)",
            }}
          />
        </motion.div>
      ))}

      {/* Seam blend in default state */}
      {!isAny && (
        <>
          {[33.33, 66.67].map((pct) => (
            <div
              key={pct}
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: `calc(${pct}% - 20px)`,
                width: "40px",
                zIndex: 12,
                background:
                  "linear-gradient(90deg, transparent, rgba(3,3,10,0.5) 40%, rgba(3,3,10,0.5) 60%, transparent)",
              }}
            />
          ))}
          {/* Hairline dividers */}
          {[33.33, 66.67].map((pct) => (
            <motion.div
              key={`divider-${pct}`}
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: `${pct}%`,
                width: "1px",
                zIndex: 13,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.13) 20%, rgba(255,255,255,0.13) 80%, transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          ))}
        </>
      )}

      {/* Zone hover rim */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={`rim-${hovered}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              zIndex: 14,
              boxShadow: `inset 0 0 0 1px ${IDENTITIES[hovered].border}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Bottom accent line on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={`accent-${hovered}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-center pointer-events-none"
            style={{
              zIndex: 15,
              background: `linear-gradient(90deg, transparent, ${IDENTITIES[hovered].color}, ${IDENTITIES[hovered].colorB}, transparent)`,
              boxShadow: `0 0 18px ${IDENTITIES[hovered].glow}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Zone labels (default state only) */}
      {!isAny && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 16 }}
        >
          {(["anime", "pro", "ai"] as const).map((id, i) => (
            <div
              key={id}
              className="absolute bottom-5 flex justify-center"
              style={{ left: `${i * 33.33 + 16.66}%`, transform: "translateX(-50%)" }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.5rem",
                  color: IDENTITIES[id].color,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "99px",
                  background: "rgba(0,0,0,0.55)",
                  border: `1px solid ${IDENTITIES[id].border}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {IDENTITIES[id].label}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Invisible hover zones */}
      <div className="absolute inset-0 flex" style={{ zIndex: 20 }}>
        {(["anime", "pro", "ai"] as const).map((id) => (
          <div
            key={id}
            id={`zone-${id}`}
            className="flex-1 h-full cursor-crosshair"
            onMouseEnter={() => onHover(id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection() {
  const [hovered, setHovered] = useState<Zone>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Mouse glow
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });
  const [hw, setHw] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHw({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    setHw({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);
  const glowX = useTransform(gx, [0, 1], [0, hw.w]);
  const glowY = useTransform(gy, [0, 1], [0, hw.h]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my]
  );

  const activeId = hovered ? IDENTITIES[hovered] : null;

  // Portrait x-slide: left→shift right, right→shift left, center→stay
  const portraitSlideX =
    hovered === "anime" ? 130 : hovered === "ai" ? -130 : 0;

  // Show bottom card: always on mobile, also for "pro" on desktop
  // (left/right get side panels on desktop; pro gets bottom card)
  const showBottomCard = hovered !== null;

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100svh", minHeight: "100svh", background: "#030308" }}
    >
      {/* ── Deep bg radial ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 45%, #0c0c22 0%, #030308 68%)",
          zIndex: 0,
        }}
      />

      {/* ── Mouse reactive ambient glow ──────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          zIndex: 1,
          width: "58vw",
          height: "58vw",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: activeId
            ? `radial-gradient(circle, ${activeId.glowSoft} 0%, transparent 65%)`
            : "radial-gradient(circle, rgba(139,92,246,0.055) 0%, transparent 65%)",
          mixBlendMode: "screen",
          transition: "background 0.6s ease",
        }}
      />

      {/* ── Floating particles ────────────────────────────────────────────── */}
      <Particles active={hovered} />

      {/* ── "NAZMUS SAKIB" Watermark ──────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 2.2 }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(5rem, 18vw, 18rem)",
            letterSpacing: "-0.07em",
            lineHeight: 0.86,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.028)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          NAZMUS
          <br />
          SAKIB
        </div>
      </motion.div>

      {/* ── CONTENT COLUMN ─────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center w-full h-full"
        style={{ zIndex: 10 }}
      >

        {/* Top name + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="flex flex-col items-center text-center pt-[clamp(72px,10vh,96px)] pb-6 md:pb-8 px-4"
        >
          {/* Eyebrow */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="flex items-center gap-3 mb-3"
          >
            <div
              className="h-px w-10"
              style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.7))" }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.55rem",
                color: "rgba(168,85,247,0.85)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </span>
            <div
              className="h-px w-10"
              style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.7), transparent)" }}
            />
          </motion.div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              letterSpacing: "-0.04em",
              color: "white",
              lineHeight: 1.05,
              textShadow: "0 0 50px rgba(0,0,0,0.9)",
            }}
          >
            Nazmus Sakib
          </h1>

          {/* Subtitle — dynamic */}
          <div className="mt-1.5 h-5 flex items-center">
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.p
                  key={hovered}
                  initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.62rem",
                    color: IDENTITIES[hovered].color,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {IDENTITIES[hovered].label} · {IDENTITIES[hovered].sublabel}
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
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.36)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Developer · AI Engineer · Creative
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ══ PORTRAIT + SIDE PANELS ROW ══ */}
        <LayoutGroup>
          <div className="flex items-center justify-center gap-8 lg:gap-14 flex-1 w-full px-4 md:px-10 min-h-0">

            {/* LEFT SIDE PANEL — desktop only, anime hover */}
            <AnimatePresence>
              {hovered === "anime" && (
                <SidePanel key="left-panel" zone="anime" side="left" />
              )}
            </AnimatePresence>

            {/* PORTRAIT */}
            <motion.div
              layout
              key="portrait"
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                x: portraitSlideX,
              }}
              transition={{
                opacity: { delay: 0.6, duration: 0.9, ease: EASE },
                y: { delay: 0.6, duration: 0.9, ease: EASE },
                x: { duration: 0.72, ease: EASE },
                layout: { duration: 0.72, ease: EASE },
              }}
              className="relative shrink-0"
              style={{
                // Responsive portrait size
                width: "clamp(200px, min(38vw, 68vh * 0.75), 460px)",
                aspectRatio: "3 / 4",
                // Outer ambient glow
                filter: activeId
                  ? `drop-shadow(0 0 36px ${activeId.glow})`
                  : "drop-shadow(0 0 20px rgba(139,92,246,0.16))",
                transition: "filter 0.6s ease",
              }}
            >
              {/* Glow blob behind portrait */}
              <div
                className="absolute -inset-6 rounded-full pointer-events-none"
                style={{
                  background: activeId
                    ? `radial-gradient(circle, ${activeId.glowSoft} 0%, transparent 70%)`
                    : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
                  transition: "background 0.6s ease",
                  zIndex: 0,
                }}
              />
              <MergedPortrait hovered={hovered} onHover={setHovered} />
            </motion.div>

            {/* RIGHT SIDE PANEL — desktop only, ai hover */}
            <AnimatePresence>
              {hovered === "ai" && (
                <SidePanel key="right-panel" zone="ai" side="right" />
              )}
            </AnimatePresence>

          </div>
        </LayoutGroup>

        {/* ══ BOTTOM CARD ══ */}
        {/* On desktop: shows for center (pro) hover */}
        {/* On mobile: shows for all hover states */}
        <div className="w-full pb-2 mt-4">
          {/* Desktop: only pro */}
          <div className="hidden lg:block">
            {hovered === "pro" && <BottomCard zone="pro" />}
          </div>
          {/* Mobile: all hover states */}
          <div className="lg:hidden">
            <BottomCard zone={hovered} />
          </div>
        </div>

        {/* Scroll + hint bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex items-center justify-between w-full px-8 md:px-16 pb-5"
          style={{ pointerEvents: "none" }}
        >
          {/* Left hint */}
          <motion.p
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.52rem",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Three versions of one person
          </motion.p>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-1.5">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.48rem",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <div
              className="overflow-hidden rounded-full"
              style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.07)" }}
            >
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                style={{
                  width: "100%",
                  height: "40%",
                  background: "rgba(168,85,247,0.8)",
                  borderRadius: "99px",
                }}
              />
            </div>
          </div>

          {/* Right hint */}
          <motion.p
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.52rem",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Hover to explore
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
