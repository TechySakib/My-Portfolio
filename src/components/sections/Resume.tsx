"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000;
      const incrementTime = Math.max(Math.floor(duration / end), 15);
      const timer = setInterval(() => {
        start += Math.ceil(end / 60);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div 
      ref={ref}
      className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.03]"
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span 
        className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {count}
        {suffix}
      </span>
      <span className="text-[0.68rem] font-bold text-gray-500 uppercase tracking-widest mt-2 font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>
        {label}
      </span>
    </div>
  );
}

const educationData = [
  {
    institution: "North South University",
    degree: "B.S. in Computer Science & Engineering",
    period: "2022 - Present",
    grade: "GPA: 3.75 / 4.00",
    desc: "Specialize in Artificial Intelligence and Machine Learning. Active in research and programming societies.",
    color: "#3b82f6",
  },
  {
    institution: "Notre Dame College, Dhaka",
    degree: "Higher Secondary Certificate (Science)",
    period: "2019 - 2021",
    grade: "GPA: 5.00 / 5.00",
    desc: "Rigorous science curriculum with standard focus on mathematics, physics, and algorithm basics.",
    color: "#f59e0b",
  },
];

const experienceData = [
  {
    role: "Undergraduate ML Researcher",
    org: "North South University AI Lab",
    period: "2024 - Present",
    desc: "Benchmarked VLMs for scene understanding, optimized model parameters, and refactored attention memory arrays to reduce GPU latency by 14%.",
    color: "#a855f7",
  },
  {
    role: "Full Stack AI Builder",
    org: "Open Source Projects",
    period: "2023 - Present",
    desc: "Designed and deployed neural creative tools, recommendation engines serving substantial scales, and production-ready RAG assistants.",
    color: "#06b6d4",
  },
];

const skillsCategories = [
  {
    title: "AI/ML & Core Engineering",
    skills: ["AI/ML", "Deep Learning", "Computer Vision", "NLP", "Python", "PyTorch", "Transformers", "CUDA"],
    color: "#a855f7",
  },
  {
    title: "Full Stack Development",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "FastAPI", "Node.js", "PostgreSQL", "Tailwind CSS"],
    color: "#3b82f6",
  },
];

export default function ResumeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const downloadPDF = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section
      id="resume"
      ref={ref}
      className="relative w-full py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(59,130,246,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Label & Title */}
        <div className="flex flex-col items-start mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div
              className="w-2 h-2 rounded-full bg-purple-500"
              style={{ boxShadow: "0 0 8px #a855f7" }}
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
              Resume
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              letterSpacing: "-0.04em",
              color: "white",
              lineHeight: 1.05,
              marginBottom: "1rem",
            }}
          >
            Experience & Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm text-gray-400 font-mono tracking-wider"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Interactive timeline and credentials portfolio
          </motion.p>
        </div>

        {/* Two-Column Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 text-left">
          {/* Left summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-gray-300 text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>
              I am an AI Engineer and Full Stack Developer focused on building high-performance systems at the intersection of machine intelligence and user applications. My toolkit includes training, optimizing, and evaluating large language models (LLMs) and vision-language architectures (VLMs), as well as architecting clean, secure web backends and responsive user interfaces.
            </p>
            <p>
              Leveraging rigorous training in computer science and active research collaborations, I design solutions that bridge theory and practice—empowering users through vector search pipelines, neural canvases, and automated agent frameworks.
            </p>
          </motion.div>

          {/* Right download button container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              style={{
                padding: "1px",
                background: "transparent",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(168, 85, 247, 0.05)",
                transition: "box-shadow 0.4s ease",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.15), 0 0 20px rgba(59, 130, 246, 0.15)",
              }}
              className="rounded-[2rem] w-full max-w-[340px] relative overflow-hidden group"
            >
              {/* Border animation shifting glow */}
              <motion.div
                className="absolute inset-0 rounded-[2rem]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  zIndex: 0,
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(59, 130, 246, 0.35), rgba(6, 182, 212, 0.35), rgba(168, 85, 247, 0.35))",
                  backgroundSize: "200% 200%",
                }}
              />

              <button
                onClick={downloadPDF}
                className="relative z-10 w-full px-8 py-8 rounded-[calc(2rem-1px)] bg-[#070710]/95 hover:bg-[#070710]/90 text-white flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer border-none"
              >
                {/* PDF Icon container */}
                <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold tracking-wide font-sans">Download Resume</span>
                  <span className="block text-[0.65rem] text-gray-500 font-mono mt-1" style={{ fontFamily: "'Space Mono', monospace" }}>
                    PDF FORMAT · PORTABLE DOCUMENT
                  </span>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat Counters Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          <StatCounter value={15} suffix="+" label="Projects Completed" />
          <StatCounter value={2} label="Research Works" />
          <StatCounter value={20} suffix="+" label="Technologies Used" />
          <StatCounter value={500} suffix="+" label="GitHub Contributions" />
        </div>

        {/* Timeline & Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Vertical Timeline Left Column */}
          <div className="lg:col-span-7 text-left">
            <h3 
              className="text-lg font-bold text-white mb-10 flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="w-1.5 h-3 rounded-full bg-purple-500" />
              Career & Education Timeline
            </h3>

            <div className="relative border-l border-white/5 pl-8 ml-4 space-y-12">
              
              {/* Experience items */}
              {experienceData.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div 
                    className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: exp.color,
                      background: "#030308",
                      boxShadow: `0 0 10px ${exp.color}35`,
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: exp.color }} />
                  </div>

                  <div 
                    className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 transition-all duration-300 hover:bg-white/[0.025] hover:border-white/10 hover:-translate-y-1"
                    style={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white font-sans">{exp.role}</h4>
                      <span 
                        className="px-2 py-0.5 rounded text-[0.62rem] font-mono tracking-wider shrink-0 w-fit"
                        style={{
                          background: `${exp.color}14`,
                          color: exp.color,
                          border: `1px solid ${exp.color}25`,
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 block mb-3 font-mono">{exp.org}</span>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Education items */}
              {educationData.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx + experienceData.length) * 0.1 }}
                  className="relative group"
                >
                  <div 
                    className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: edu.color,
                      background: "#030308",
                      boxShadow: `0 0 10px ${edu.color}35`,
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: edu.color }} />
                  </div>

                  <div 
                    className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 transition-all duration-300 hover:bg-white/[0.025] hover:border-white/10 hover:-translate-y-1"
                    style={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white font-sans">{edu.degree}</h4>
                      <span 
                        className="px-2 py-0.5 rounded text-[0.62rem] font-mono tracking-wider shrink-0 w-fit"
                        style={{
                          background: `${edu.color}14`,
                          color: edu.color,
                          border: `1px solid ${edu.color}25`,
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {edu.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-400 font-mono">{edu.institution}</span>
                      <span className="text-[0.68rem] text-gray-500 font-mono">({edu.grade})</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{edu.desc}</p>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>

          {/* Categorized Skills Right Column */}
          <div className="lg:col-span-5 text-left space-y-10">
            <h3 
              className="text-lg font-bold text-white mb-10 flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="w-1.5 h-3 rounded-full bg-blue-500" />
              Core Competencies
            </h3>

            {skillsCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 space-y-4"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">{cat.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[0.68rem] font-medium font-sans px-3.5 py-1.5 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                      style={{
                        background: `${cat.color}10`,
                        borderColor: `${cat.color}25`,
                        color: cat.color,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = `${cat.color}22`;
                        el.style.borderColor = cat.color;
                        el.style.boxShadow = `0 0 10px ${cat.color}35`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = `${cat.color}10`;
                        el.style.borderColor = `${cat.color}25`;
                        el.style.boxShadow = "none";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
