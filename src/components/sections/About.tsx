"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Framer Motion", "Three.js"] },
  { category: "Backend", items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"] },
  { category: "AI / ML", items: ["PyTorch", "Transformers", "LangChain", "OpenAI API", "CUDA"] },
  { category: "Tools", items: ["Git", "Docker", "Linux", "Figma", "Vercel"] },
];

const timeline = [
  {
    year: "2025",
    event: "Diving deep into VLMs & multimodal AI research",
    color: "#a855f7",
  },
  {
    year: "2024",
    event: "Built RAG pipelines and deployed AI tools to production",
    color: "#3b82f6",
  },
  {
    year: "2023",
    event: "Started exploring machine learning and deep learning",
    color: "#06b6d4",
  },
  {
    year: "2022",
    event: "Began university — Computer Science & Engineering",
    color: "#f59e0b",
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 md:px-16"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Bio */}
        <div>
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
                fontSize: "0.65rem",
                color: "#3b82f6",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              About Me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
              color: "white",
              marginBottom: "1.5rem",
              lineHeight: 1.05,
            }}
          >
            Three versions,<br />one story.
          </motion.h2>

          {[
            "I'm Nazmus Sakib — a CS student, developer, and aspiring AI researcher who grew up on anime, games, and the quiet magic of stories.",
            "By day I build things: web apps, AI pipelines, and open-source tools. By night I explore the frontiers of large language models, visual AI, and what it means for machines to understand the world.",
            "All three portraits you saw at the top? That's really me — the dreamer, the builder, and the researcher — all at once.",
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "1rem",
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
                    fontSize: "0.7rem",
                    color: item.color,
                    letterSpacing: "0.1em",
                    minWidth: "2.5rem",
                  }}
                >
                  {item.year}
                </span>
                <div
                  className="w-px h-6 rounded-full"
                  style={{ background: `${item.color}50` }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {item.event}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Skills */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + gi * 0.1, duration: 0.6 }}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + gi * 0.1 + ii * 0.04 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-default"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        transition: "all 0.2s",
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
