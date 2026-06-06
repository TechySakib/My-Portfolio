"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.03]"
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
      <span className="text-[0.62rem] font-bold text-gray-500 uppercase tracking-widest mt-2 font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>
        {label}
      </span>
    </div>
  );
}

const timelineData = [
  {
    title: "B.Sc. In Computer Science & Engineering",
    date: "2021 — 2025",
    subtitle: "North South University · Dhaka, Bangladesh · CGPA 3.10",
    desc: "Focused on AI/ML, algorithms, software engineering, and systems. Completed three production-grade capstone projects spanning computer vision, RAG systems, and web platforms.",
    badges: ["Algorithms", "AI & ML", "Software Engineering", "Databases"],
    color: "#a855f7",
  },
  {
    title: "AinSathi — AI Legal Assistant (Production)",
    date: "2024",
    subtitle: "Capstone Project · RAG · NLP · 3D UI",
    desc: "Built a bilingual (Bengali/English) legal assistant for Bangladesh law using a hybrid FAISS + BM25 RAG pipeline. Shipped with an immersive Three.js 3D UI, Supabase backend, JWT auth, and encrypted session privacy mode.",
    badges: ["RAG", "FAISS", "BM25", "Next.js", "FastAPI", "Three.js"],
    color: "#a855f7",
  },
  {
    title: "Ratatouille AI — Recipe Discovery Platform",
    date: "2023",
    subtitle: "Full-Stack Project · Computer Vision · PWA",
    desc: "Deployed YOLOv8 object detection in production to identify ingredients from images and suggest recipe matches. Built as an installable PWA with React 18, Vite, TypeScript, and FastAPI — production-ready with error handling and security.",
    badges: ["YOLOv8", "React 18", "TypeScript", "FastAPI", "PWA"],
    color: "#a855f7",
  },
  {
    title: "EasyRide — Bus Ticket Management System",
    date: "2023",
    subtitle: "Web Platform · PHP · MySQL · QR & OTP",
    desc: "Designed an end-to-end digital ticketing platform replacing manual processes. Features QR-based verification, OTP booking confirmation, admin dashboards, route management, and chatbot support.",
    badges: ["PHP", "MySQL", "QR Code", "OTP Auth"],
    color: "#a855f7",
  },
  {
    title: "HSC — Science",
    date: "2020",
    subtitle: "Higher Secondary Certificate · Bangladesh",
    desc: "Completed higher secondary studies with a focus on Physics, Chemistry, and Mathematics — laying the analytical foundation for engineering studies.",
    badges: [],
    color: "#a855f7",
  },
];

const skillsCategories = [
  {
    title: "AI · ML · DATA",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "RAG", "YOLOv8", "FAISS · BM25", "Python"],
    color: "#a855f7",
  },
  {
    title: "FRONTEND",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Three.js", "Vite", "HTML · CSS"],
    color: "#06b6d4",
  },
  {
    title: "BACKEND · DATABASES",
    skills: ["FastAPI", "PHP", "Java", "PostgreSQL", "MySQL", "Supabase"],
    color: "#3b82f6",
  },
  {
    title: "TOOLS · INFRA",
    skills: ["Git · GitHub", "Docker", "JWT Auth", "PWA", "REST APIs", "Linux"],
    color: "#f59e0b",
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
        <div className="flex flex-col items-start mb-14 text-left">
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
              My Resume
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
              marginBottom: "1.2rem",
            }}
          >
            Experience & Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm text-gray-400 font-mono tracking-wider max-w-2xl"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            A glimpse into my journey building intelligent systems, full-stack platforms, and AI-powered products.
          </motion.p>
        </div>

        {/* Two-Column Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 text-left">
          {/* Left summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-6 text-gray-300 text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p>
              Final-year <span className="text-white font-semibold">CSE student at North South University</span> passionate about building production-grade AI systems. Experienced in <span className="text-purple-300 font-semibold">Machine Learning, Deep Learning, RAG pipelines</span>, and <span className="text-purple-300 font-semibold">Computer Vision</span> with real-world deployments. Full-stack proficiency spanning <span className="text-blue-300 font-semibold">React, Next.js, FastAPI</span>, and cloud infrastructure — with a strong focus on elegant UX, clean architecture, and practical problem-solving.
            </p>
          </motion.div>

          {/* Right download button container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <motion.div
              style={{
                padding: "1px",
                background: "transparent",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45), 0 0 40px rgba(168, 85, 247, 0.05)",
                transition: "box-shadow 0.4s ease",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.55), 0 0 40px rgba(168, 85, 247, 0.18), 0 0 20px rgba(59, 130, 246, 0.18)",
              }}
              className="rounded-2xl w-full max-w-[260px] relative overflow-hidden group"
            >
              {/* Border animation shifting glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
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
                className="relative z-10 w-full px-6 py-4 rounded-[calc(1rem-1px)] bg-[#070710]/95 hover:bg-[#070710]/90 text-white flex items-center justify-center gap-3 transition-colors cursor-pointer border-none"
              >
                {/* PDF Icon */}
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs font-bold font-sans tracking-wide">Download CV</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat Counters Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24">
          <StatCounter value={12} suffix="+" label="Projects Completed" />
          <StatCounter value={3} label="Research Works" />
          <StatCounter value={18} suffix="+" label="Technologies Used" />
          <StatCounter value={340} suffix="+" label="GitHub Contributions" />
        </div>

        {/* Timeline Grid */}
        <div className="text-left mb-24">
          <h3 
            className="text-[0.68rem] font-bold text-purple-400 tracking-[0.25em] uppercase mb-10 font-mono"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Timeline
          </h3>

          <div className="relative border-l border-purple-500/20 pl-8 ml-4 space-y-8">
            
            {/* Timeline items */}
            {timelineData.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Dot */}
                <div 
                  className="absolute -left-[40px] top-2.5 w-4 h-4 rounded-full border-2 border-purple-500 bg-[#030308] flex items-center justify-center transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                </div>

                {/* Card */}
                <div 
                  className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 transition-all duration-300 hover:bg-[#0f0f1c]/60 hover:border-purple-500/30 hover:-translate-y-1"
                  style={{
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 
                      className="text-md font-bold text-white font-sans"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    <span 
                      className="px-2.5 py-0.5 rounded text-[0.62rem] font-mono tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0 w-fit"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <span className="text-[0.68rem] text-purple-400 block mb-3 font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>{item.subtitle}</span>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 font-sans">{item.desc}</p>
                  
                  {item.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.badges.map((b) => (
                        <span 
                          key={b}
                          className="text-[0.58rem] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10 font-mono"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Skills & Technologies Grid */}
        <div className="text-left">
          <h3 
            className="text-[0.68rem] font-bold text-purple-400 tracking-[0.25em] uppercase mb-10 font-mono"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Skills & Technologies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 space-y-4 backdrop-blur-md"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h4 
                  className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[0.68rem] font-mono px-3 py-1.5 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: `${cat.color}0a`,
                        borderColor: `${cat.color}20`,
                        color: cat.color,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = `${cat.color}18`;
                        el.style.borderColor = cat.color;
                        el.style.boxShadow = `0 0 10px ${cat.color}35`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = `${cat.color}0a`;
                        el.style.borderColor = `${cat.color}20`;
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
