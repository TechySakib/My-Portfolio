"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const projects = [
  {
    id: "proj-1",
    title: "Neural Canvas",
    description:
      "AI-powered creative tool using diffusion models to generate artwork from text descriptions. Real-time inference with a custom React canvas.",
    tech: ["Python", "React", "FastAPI", "Stable Diffusion"],
    color: "#a855f7",
    year: "2024",
    status: "Live",
  },
  {
    id: "proj-2",
    title: "RAG Research Assistant",
    description:
      "Retrieval-Augmented Generation pipeline for academic research. Processes PDFs and answers complex questions with cited sources.",
    tech: ["LangChain", "ChromaDB", "Next.js", "OpenAI"],
    color: "#3b82f6",
    year: "2024",
    status: "Open Source",
  },
  {
    id: "proj-3",
    title: "Anime Recommender",
    description:
      "Personalized anime recommendation engine using collaborative filtering and NLP-based synopsis embeddings. 50K+ users.",
    tech: ["PyTorch", "FastAPI", "PostgreSQL", "React"],
    color: "#f59e0b",
    year: "2023",
    status: "Live",
  },
  {
    id: "proj-4",
    title: "VLM Vision Pipeline",
    description:
      "End-to-end Visual Language Model pipeline for scene understanding and captioning. Benchmarked on COCO and VQA datasets.",
    tech: ["PyTorch", "Transformers", "CUDA", "Python"],
    color: "#06b6d4",
    year: "2025",
    status: "Research",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center pt-24 pb-16 px-12 sm:px-24 md:px-36 lg:px-48 xl:px-60 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Section border top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(59,130,246,0.3), transparent)",
        }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-4"
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "#a855f7", boxShadow: "0 0 8px #a855f7" }}
        />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            color: "#a855f7",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Selected Work
        </span>
      </motion.div>

      {/* Heading */}
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
        Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          maxWidth: "480px",
        }}
      >
        Things I&apos;ve built — from AI research tools to creative web experiences.
      </motion.p>

      {/* Projects grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            id={project.id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl p-6 cursor-pointer overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at top left, ${project.color}15 0%, transparent 60%)`,
                boxShadow: `inset 0 0 40px ${project.color}10`,
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className="text-xs font-mono"
                  style={{
                    color: project.color,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.1em",
                    opacity: 0.8,
                  }}
                >
                  {project.year}
                </span>
                <h3
                  className="mt-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h3>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ml-3"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: `${project.color}18`,
                  color: project.color,
                  border: `1px solid ${project.color}40`,
                }}
              >
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
              }}
            >
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-xs"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <motion.div
              className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ transform: "translate(0, 0)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ color: project.color }}
              >
                <path
                  d="M3 13L13 3M13 3H7M13 3V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
