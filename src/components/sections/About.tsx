"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// ─── Tech stack with SVG logos ────────────────────────────────────────────────
const TECH_STACK = [
  // Frontend
  { name: "React",        category: "Frontend",  color: "#61DAFB", icon: "⚛️",  svg: "react" },
  { name: "Next.js",      category: "Frontend",  color: "#ffffff", icon: "▲",   svg: "nextjs" },
  { name: "TypeScript",   category: "Frontend",  color: "#3178C6", icon: "TS",  svg: "ts" },
  { name: "Tailwind",     category: "Frontend",  color: "#06B6D4", icon: "🌊",  svg: "tailwind" },
  { name: "Framer Motion",category: "Frontend",  color: "#BB4BFF", icon: "🎞️", svg: "framer" },
  // Backend
  { name: "Python",       category: "Backend",   color: "#3776AB", icon: "🐍",  svg: "python" },
  { name: "FastAPI",      category: "Backend",   color: "#009688", icon: "⚡",  svg: "fastapi" },
  { name: "Node.js",      category: "Backend",   color: "#339933", icon: "🟢",  svg: "node" },
  { name: "PostgreSQL",   category: "Backend",   color: "#336791", icon: "🐘",  svg: "pg" },
  { name: "Redis",        category: "Backend",   color: "#DC382D", icon: "🔴",  svg: "redis" },
  // AI / ML
  { name: "PyTorch",      category: "AI / ML",   color: "#EE4C2C", icon: "🔥",  svg: "pytorch" },
  { name: "Transformers", category: "AI / ML",   color: "#FFD21E", icon: "🤗",  svg: "hf" },
  { name: "LangChain",    category: "AI / ML",   color: "#1C3D5A", icon: "🔗",  svg: "lc" },
  { name: "OpenAI",       category: "AI / ML",   color: "#412991", icon: "🧠",  svg: "openai" },
  { name: "CUDA",         category: "AI / ML",   color: "#76B900", icon: "⚙️",  svg: "cuda" },
  { name: "Scikit-learn", category: "AI / ML",   color: "#F7931E", icon: "📊",  svg: "sklearn" },
  // Tools
  { name: "Git",          category: "Tools",     color: "#F05032", icon: "🌿",  svg: "git" },
  { name: "Docker",       category: "Tools",     color: "#2496ED", icon: "🐳",  svg: "docker" },
  { name: "Linux",        category: "Tools",     color: "#FCC624", icon: "🐧",  svg: "linux" },
  { name: "Figma",        category: "Tools",     color: "#F24E1E", icon: "🎨",  svg: "figma" },
  { name: "Vercel",       category: "Tools",     color: "#ffffff", icon: "▲",   svg: "vercel" },
  { name: "GitHub",       category: "Tools",     color: "#ffffff", icon: "🐙",  svg: "github" },
];

// Category color map
const CAT_COLOR: Record<string, string> = {
  "Frontend": "#61DAFB",
  "Backend":  "#22c55e",
  "AI / ML":  "#a855f7",
  "Tools":    "#f59e0b",
};

// Split into two columns for dual vertical scrollers
const COL_A = TECH_STACK.filter((_, i) => i % 2 === 0);
const COL_B = TECH_STACK.filter((_, i) => i % 2 !== 0);

// ─── Tech Card ────────────────────────────────────────────────────────────────
function TechCard({
  tech,
  isHovered,
  anyHovered,
  onEnter,
  onLeave,
}: {
  tech: typeof TECH_STACK[0];
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{
        scale: isHovered ? 1.06 : anyHovered ? 0.97 : 1,
        opacity: anyHovered && !isHovered ? 0.38 : 1,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-default select-none"
      style={{
        background: isHovered
          ? `${tech.color}14`
          : "rgba(255,255,255,0.04)",
        border: isHovered
          ? `1px solid ${tech.color}55`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isHovered
          ? `0 0 20px ${tech.color}25, 0 4px 20px rgba(0,0,0,0.4)`
          : "none",
        transition: "background 0.25s, border 0.25s, box-shadow 0.25s",
        minWidth: "170px",
      }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
        style={{
          background: isHovered ? `${tech.color}20` : "rgba(255,255,255,0.06)",
          border: isHovered ? `1px solid ${tech.color}40` : "1px solid rgba(255,255,255,0.08)",
          fontSize: tech.icon.length <= 2 ? "0.85rem" : "1.1rem",
          fontFamily: "'Space Mono', monospace",
          color: isHovered ? tech.color : "rgba(255,255,255,0.6)",
          fontWeight: 700,
          transition: "all 0.25s",
        }}
      >
        {tech.icon}
      </div>

      {/* Name + Category */}
      <div className="flex flex-col min-w-0">
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "0.88rem",
            color: isHovered ? "white" : "rgba(255,255,255,0.75)",
            letterSpacing: "-0.01em",
            transition: "color 0.25s",
            whiteSpace: "nowrap",
          }}
        >
          {tech.name}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.52rem",
            color: isHovered ? CAT_COLOR[tech.category] : "rgba(255,255,255,0.28)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            transition: "color 0.25s",
          }}
        >
          {tech.category}
        </span>
      </div>

      {/* Neon dot on hover */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
        />
      )}
    </motion.div>
  );
}

// ─── Vertical scrolling column ────────────────────────────────────────────────
function ScrollColumn({
  items,
  speed,
  reverse,
  pausedKey,
  hoveredTech,
  onEnter,
  onLeave,
}: {
  items: typeof TECH_STACK;
  speed: number;
  reverse: boolean;
  pausedKey: string | null;
  hoveredTech: string | null;
  onEnter: (name: string) => void;
  onLeave: () => void;
}) {
  const isPaused = pausedKey !== null;
  // Duplicate list for seamless loop
  const doubled = [...items, ...items];
  const totalHeight = items.length * 68; // ~68px per card

  return (
    <div className="relative overflow-hidden" style={{ height: "420px" }}>
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "60px",
          background: "linear-gradient(to bottom, var(--bg-surface), transparent)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "60px",
          background: "linear-gradient(to top, var(--bg-surface), transparent)",
        }}
      />

      <motion.div
        animate={{
          y: reverse
            ? [0, -totalHeight]
            : [-totalHeight, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
        // Pause via css when hovered
        className={isPaused ? "[animation-play-state:paused]" : ""}
      >
        <motion.div
          animate={{ y: isPaused ? 0 : 0 }}
          transition={{ duration: 0 }}
          style={{
            // Framer Motion respects paused state via transition stall
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          <div className="flex flex-col gap-2.5 pr-2">
            {doubled.map((tech, i) => (
              <TechCard
                key={`${tech.name}-${i}`}
                tech={tech}
                isHovered={hoveredTech === tech.name}
                anyHovered={hoveredTech !== null}
                onEnter={() => onEnter(tech.name)}
                onLeave={onLeave}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Better vertical ticker using CSS animation for pause support ─────────────
function TickerColumn({
  items,
  duration,
  direction,
  hoveredTech,
  onEnter,
  onLeave,
  isPaused,
}: {
  items: typeof TECH_STACK;
  duration: number;
  direction: "up" | "down";
  hoveredTech: string | null;
  onEnter: (name: string) => void;
  onLeave: () => void;
  isPaused: boolean;
}) {
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden" style={{ height: "440px", flex: 1 }}>
      {/* Top gradient mask */}
      <div
        className="absolute top-0 inset-x-0 z-10 pointer-events-none"
        style={{
          height: "72px",
          background: "linear-gradient(to bottom, var(--bg-surface) 0%, transparent 100%)",
        }}
      />
      {/* Bottom gradient mask */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 pointer-events-none"
        style={{
          height: "72px",
          background: "linear-gradient(to top, var(--bg-surface) 0%, transparent 100%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          animation: `ticker-${direction} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {doubled.map((tech, i) => (
          <TechCard
            key={`${tech.name}-${i}`}
            tech={tech}
            isHovered={hoveredTech === tech.name}
            anyHovered={hoveredTech !== null}
            onEnter={() => onEnter(tech.name)}
            onLeave={onLeave}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const timeline = [
  { year: "2025", event: "Diving deep into VLMs & multimodal AI research", color: "#a855f7" },
  { year: "2024", event: "Built RAG pipelines and deployed AI tools to production", color: "#3b82f6" },
  { year: "2023", event: "Started exploring machine learning and deep learning", color: "#06b6d4" },
  { year: "2022", event: "Began university — Computer Science & Engineering", color: "#f59e0b" },
];

// ─── About Section ────────────────────────────────────────────────────────────
export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isPaused = hoveredTech !== null;

  return (
    <>
      {/* CSS keyframes for ticker animation */}
      <style>{`
        @keyframes ticker-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(calc(-100% / 3)); }
        }
        @keyframes ticker-down {
          0%   { transform: translateY(calc(-100% / 3)); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <section
        id="about"
        ref={ref}
        className="relative pt-10 md:pt-14 pb-24 md:pb-32 px-12 sm:px-24 md:px-36 lg:px-48 xl:px-60"
        style={{ background: "var(--bg-surface)" }}
      >
        {/* Top border accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.35), rgba(168,85,247,0.35), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto">

          {/* ── Section label ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#3b82f6", boxShadow: "0 0 8px #3b82f6" }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                color: "#3b82f6",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              About Me
            </span>
          </motion.div>

          {/* ── Heading ────────────────────────────────────────────────── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              letterSpacing: "-0.04em",
              color: "white",
              marginBottom: "3.5rem",
              lineHeight: 1.05,
            }}
          >
            Three versions,
            <br />
            one story.
          </motion.h2>

          {/* ── Main grid: Bio + Tech Stack ───────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* LEFT — Bio & Timeline */}
            <div>
              {[
                "I'm Nazmus Sakib — a CSE student from Bangladesh, developer, and aspiring AI researcher who grew up on anime, games, and the quiet magic of stories.",
                "By day I build things: web apps, AI pipelines, and open-source tools. By night I explore the frontiers of large language models, visual AI, and what it means for machines to truly understand the world.",
                "All three portraits you saw at the top? That's really me — the dreamer, the builder, and the researcher — existing all at once.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.18 + i * 0.1 }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.85,
                    marginBottom: "1.1rem",
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="mt-10 space-y-4"
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.58rem",
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Journey
                </p>
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.68rem",
                        color: item.color,
                        letterSpacing: "0.08em",
                        minWidth: "2.5rem",
                      }}
                    >
                      {item.year}
                    </span>
                    <div
                      className="w-px h-6 rounded-full"
                      style={{ background: `${item.color}45` }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.52)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.event}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Tech Stack vertical ticker */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.58rem",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Tech Stack
                  </p>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      letterSpacing: "-0.03em",
                      color: "white",
                    }}
                  >
                    Tools I work with
                  </p>
                </div>

                {/* Hover instruction */}
                <AnimatePresence mode="wait">
                  {isPaused ? (
                    <motion.div
                      key="paused"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{
                        background: hoveredTech
                          ? `${TECH_STACK.find(t => t.name === hoveredTech)?.color}18`
                          : "rgba(255,255,255,0.06)",
                        border: hoveredTech
                          ? `1px solid ${TECH_STACK.find(t => t.name === hoveredTech)?.color}40`
                          : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: hoveredTech
                            ? TECH_STACK.find(t => t.name === hoveredTech)?.color
                            : "white",
                          boxShadow: hoveredTech
                            ? `0 0 6px ${TECH_STACK.find(t => t.name === hoveredTech)?.color}`
                            : "none",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.52rem",
                          color: hoveredTech
                            ? TECH_STACK.find(t => t.name === hoveredTech)?.color
                            : "rgba(255,255,255,0.5)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Paused
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.5rem",
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Hover to pause
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Two-column ticker */}
              {mounted && (
                <div className="flex gap-3">
                  <TickerColumn
                    items={COL_A}
                    duration={22}
                    direction="up"
                    hoveredTech={hoveredTech}
                    onEnter={(name) => setHoveredTech(name)}
                    onLeave={() => setHoveredTech(null)}
                    isPaused={isPaused}
                  />
                  <TickerColumn
                    items={COL_B}
                    duration={28}
                    direction="down"
                    hoveredTech={hoveredTech}
                    onEnter={(name) => setHoveredTech(name)}
                    onLeave={() => setHoveredTech(null)}
                    isPaused={isPaused}
                  />
                </div>
              )}

              {/* Category legend */}
              <div className="flex flex-wrap gap-3 mt-5">
                {Object.entries(CAT_COLOR).map(([cat, color]) => (
                  <div key={cat} className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.5rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.25), rgba(59,130,246,0.25), transparent)",
          }}
        />
      </section>
    </>
  );
}
