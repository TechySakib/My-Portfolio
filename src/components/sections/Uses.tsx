"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    icon: "💻",
    title: "Development",
    items: [
      { name: "Editor", value: "VS Code / Cursor" },
      { name: "Terminal", value: "Warp + zsh" },
      { name: "Version Control", value: "Git + GitHub" },
      { name: "API Client", value: "Hoppscotch" },
    ],
    color: "#3b82f6",
  },
  {
    icon: "🤖",
    title: "AI & Research",
    items: [
      { name: "Frameworks", value: "PyTorch, HuggingFace" },
      { name: "LLM APIs", value: "OpenAI, Anthropic, Gemini" },
      { name: "Notebooks", value: "Jupyter, Colab" },
      { name: "Vector DB", value: "ChromaDB, Pinecone" },
    ],
    color: "#a855f7",
  },
  {
    icon: "🎨",
    title: "Design & Creative",
    items: [
      { name: "Design", value: "Figma" },
      { name: "Animation", value: "Framer Motion, GSAP" },
      { name: "3D", value: "Three.js, Blender" },
      { name: "UI Library", value: "shadcn/ui" },
    ],
    color: "#f59e0b",
  },
  {
    icon: "☁️",
    title: "Infrastructure",
    items: [
      { name: "Hosting", value: "Vercel, Railway" },
      { name: "Containers", value: "Docker" },
      { name: "OS", value: "macOS + Ubuntu" },
      { name: "CI/CD", value: "GitHub Actions" },
    ],
    color: "#06b6d4",
  },
];

export default function UsesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="uses"
      ref={ref}
      className="relative py-32 px-8 sm:px-16 lg:px-24 xl:px-32"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-4"
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "#06b6d4", boxShadow: "0 0 8px #06b6d4" }}
        />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#06b6d4",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          My Setup
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem, 5vw, 4rem)",
          letterSpacing: "-0.04em",
          color: "white",
          marginBottom: "1rem",
          lineHeight: 1.05,
        }}
      >
        Uses
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "var(--text-secondary)",
          marginBottom: "3rem",
          maxWidth: "480px",
        }}
      >
        The tools, software, and services I use day-to-day to build, research, and create.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            id={`uses-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + ci * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Hover glow corner */}
            <div
              className="absolute top-0 left-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${cat.color}20 0%, transparent 70%)`,
                transform: "translate(-30%, -30%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)`,
              }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "white",
                }}
              >
                {cat.title}
              </h3>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {cat.items.map((item, ii) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + ci * 0.1 + ii * 0.05 }}
                  className="flex items-center justify-between"
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: `${cat.color}12`,
                      color: cat.color,
                      border: `1px solid ${cat.color}30`,
                    }}
                  >
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
