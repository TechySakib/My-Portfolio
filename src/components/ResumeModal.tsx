"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1500;
    const incrementTime = Math.max(Math.floor(duration / end), 15);
    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div 
      ref={ref}
      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.03]"
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span 
        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-400"
        style={{ fontFamily: "var(--font-space-mono)" }}
      >
        {count}
        {suffix}
      </span>
      <span 
        className="text-[0.75rem] sm:text-xs font-semibold text-gray-400 mt-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
    </div>
  );
}

const timelineData = [
  {
    title: "B.Sc. In Computer Science & Engineering",
    date: "2021 — 2025",
    subtitle: "North South University - Dhaka, Bangladesh - CGPA 3.10",
    desc: "Focused on AI/ML, algorithms, software engineering, and systems. Completed three production-grade capstone projects spanning computer vision, RAG systems, and web platforms.",
    badges: ["Algorithms", "AI & ML", "Software Engineering", "Databases"],
    color: "#a855f7",
  },
  {
    title: "AinSathi — AI Legal Assistant (Production)",
    date: "2024",
    subtitle: "Capstone Project - RAG - NLP - 3D UI",
    desc: "Built a bilingual (Bengali/English) legal assistant for Bangladeshi law using a hybrid FAISS + BM25 RAG pipeline. Shipped with an immersive Three.js 3D UI, Supabase backend, JWT auth, and encrypted session privacy mode.",
    badges: ["RAG", "FAISS", "BM25", "Next.js", "FastAPI", "Three.js"],
    color: "#a855f7",
  },
  {
    title: "Ratatouille AI — Recipe Discovery Platform",
    date: "PWA",
    subtitle: "Full-Stack Project - Computer Vision - PWA",
    desc: "Deployed YOLOv8 object detection in production to identify ingredients from images and suggest recipe matches. Built as an installable PWA with React 18, Vite, TypeScript, and FastAPI — production-ready with error handling and security.",
    badges: ["YOLOv8", "React 18", "TypeScript", "FastAPI", "PWA"],
    color: "#a855f7",
  },
  {
    title: "EasyRide — Bus Ticket Management System",
    date: "2023",
    subtitle: "Web Platform - PHP - MySQL - QR & OTP",
    desc: "Designed an end-to-end digital ticketing platform replacing manual processes. Features QR-based verification, OTP booking confirmation, admin dashboards, route management, and chatbot support.",
    badges: ["PHP", "MySQL", "QR Code", "OTP Auth"],
    color: "#a855f7",
  },
  {
    title: "HSC — Science",
    date: "2020",
    subtitle: "Higher Secondary Certificate - Bangladesh",
    desc: "Completed higher secondary studies with a focus on Physics, Chemistry, and Mathematics — laying the analytical foundation for engineering studies.",
    badges: [],
    color: "#a855f7",
  },
];

const skillsCategories = [
  {
    title: "AI · ML · DATA",
    skills: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "RAG", "YOLOv8", "FAISS - BM25", "Python"],
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
    color: "#10b981",
  },
  {
    title: "TOOLS · INFRA",
    skills: ["Git - GitHub", "Docker", "JWT Auth", "PWA", "REST APIs", "Linux"],
    color: "#f59e0b",
  },
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle scroll lock on body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const downloadPDF = () => {
    window.open("/resume.pdf", "_blank");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-xl p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl h-[88vh] rounded-[2rem] overflow-hidden flex flex-col text-left"
          style={{
            background: "linear-gradient(rgba(7, 7, 16, 0.94), rgba(7, 7, 16, 0.97)) padding-box, linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.25)) border-box",
            border: "1px solid transparent",
            boxShadow: "0 25px 80px -15px rgba(0, 0, 0, 0.8), 0 0 50px -5px rgba(168, 85, 247, 0.2)",
          }}
        >
          {/* Modal Header */}
          <div className="relative px-8 py-6 flex items-center justify-between border-b border-white/5 shrink-0 bg-[#070710]/40 backdrop-blur-md" style={{ zIndex: 10 }}>
            <div>
              <h2 
                id="resume-modal-title"
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Nazmus Sakib
              </h2>
              <p 
                className="text-xs text-purple-300 font-mono tracking-wider uppercase mt-0.5"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Interactive Curriculum Vitae · AI Engineer & ML Builder
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border border-white/5"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div 
            ref={contentRef}
            className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-thin scroll-smooth"
          >
            {/* Two-Column Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 text-left">
              {/* Left summary */}
              <div 
                className="lg:col-span-8 space-y-6 text-gray-300 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <p>
                  Final-year <span className="text-purple-400 font-semibold">CSE student at North South University</span> passionate about building production-grade AI systems. Experienced in <span className="text-purple-400 font-semibold">Machine Learning, Deep Learning, RAG pipelines</span>, and <span className="text-purple-400 font-semibold">Computer Vision</span> with real-world deployments. Full-stack proficiency spanning <span className="text-purple-400 font-semibold">React, Next.js, FastAPI</span>, and cloud infrastructure — with a strong focus on elegant UX, clean architecture, and practical problem-solving.
                </p>
              </div>

              {/* Right download button container */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <motion.button
                  onClick={downloadPDF}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(168, 85, 247, 0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full max-w-[240px] px-6 py-4 rounded-xl border border-purple-500/30 hover:border-purple-500/70 bg-purple-500/5 hover:bg-purple-500/10 text-white flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  <svg 
                    className="w-5 h-5 text-purple-400 transition-transform duration-300 group-hover:scale-110" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  <span className="text-xs font-bold tracking-wide">Download CV</span>
                </motion.button>
              </div>
            </div>

            {/* Stat Counters Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
              <StatCounter value={12} suffix="+" label="Projects Completed" />
              <StatCounter value={3} label="Research Works" />
              <StatCounter value={18} suffix="+" label="Technologies Used" />
              <StatCounter value={340} suffix="+" label="GitHub Contributions" />
            </div>

            {/* Timeline Area */}
            <div className="text-left mb-20">
              <h3 
                className="text-[0.68rem] font-bold text-purple-400 tracking-[0.25em] uppercase mb-8"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Timeline
              </h3>

              <div className="relative border-l border-purple-500/20 pl-8 ml-4 space-y-8">
                {timelineData.map((item, idx) => (
                  <div key={idx} className="relative group">
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
                          className="text-md font-bold text-white"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {item.title}
                        </h4>
                        <span 
                          className="px-2.5 py-0.5 rounded text-[0.62rem] tracking-wider bg-transparent text-purple-300 border border-purple-500/30 shrink-0 w-fit"
                          style={{
                            fontFamily: "var(--font-space-mono)",
                          }}
                        >
                          {item.date}
                        </span>
                      </div>
                      <span className="text-[0.68rem] text-purple-400 block mb-3" style={{ fontFamily: "var(--font-space-mono)" }}>{item.subtitle}</span>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 font-sans">{item.desc}</p>
                      
                      {item.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.badges.map((b) => (
                            <span 
                              key={b}
                              className="text-[0.58rem] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10"
                              style={{ fontFamily: "var(--font-space-mono)" }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Area */}
            <div className="text-left">
              <h3 
                className="text-[0.68rem] font-bold text-purple-400 tracking-[0.25em] uppercase mb-8"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                Skills & Technologies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsCategories.map((cat, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 space-y-4 backdrop-blur-md"
                    style={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <h4 
                      className="text-xs font-mono font-bold uppercase tracking-widest"
                      style={{ 
                        fontFamily: "var(--font-space-mono)",
                        color: cat.color
                      }}
                    >
                      {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[0.68rem] px-3.5 py-1.5 rounded-full border transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                          style={{
                            fontFamily: "var(--font-space-mono)",
                            background: "rgba(7, 7, 16, 0.4)",
                            borderColor: `${cat.color}30`,
                            color: cat.color,
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.background = `${cat.color}15`;
                            el.style.borderColor = cat.color;
                            el.style.boxShadow = `0 0 12px ${cat.color}45`;
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.background = "rgba(7, 7, 16, 0.4)";
                            el.style.borderColor = `${cat.color}30`;
                            el.style.boxShadow = "none";
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="px-8 py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950/80 shrink-0 relative" style={{ zIndex: 10 }}>
            {/* Social Links on left */}
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com/in/nazmussakib" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-400 hover:text-white no-underline transition-all font-mono"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                LinkedIn
              </a>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <a 
                href="https://github.com/TechySakib" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-400 hover:text-white no-underline transition-all font-mono"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                GitHub
              </a>
            </div>

            {/* Buttons on right */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  // Smooth scroll to contact
                  const contactEl = document.getElementById("contact");
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-center no-underline cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Contact Me
              </a>
              <button
                onClick={downloadPDF}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:brightness-110 shadow-[0_4px_15px_rgba(168,85,247,0.25)] transition-all cursor-pointer border-none"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Download Resume PDF
              </button>
            </div>
          </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
