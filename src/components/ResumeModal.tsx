"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { id: "journey", label: "Career Journey" },
  { id: "summary", label: "Profile Summary" },
  { id: "education", label: "Education" },
  { id: "skills-ai", label: "AI/ML Skills" },
  { id: "skills-fs", label: "Full Stack Skills" },
  { id: "experience", label: "Research Experience" },
  { id: "projects", label: "Featured Projects" },
  { id: "certs", label: "Certifications" },
  { id: "awards", label: "Achievements" },
  { id: "contact-info", label: "Contact" },
];

const roadmapNodes = [
  { step: "Student", year: "2022", desc: "CSE at North South University", color: "#f59e0b" },
  { step: "Developer", year: "2023", desc: "Full Stack Apps (React/Node)", color: "#06b6d4" },
  { step: "AI Engineer", year: "2024", desc: "Production RAG & AI Agents", color: "#3b82f6" },
  { step: "ML Researcher", year: "2025", desc: "VLMs & Multimodal AI models", color: "#a855f7" },
  { step: "Builder", year: "Present", desc: "Interactive Intelligent Software", color: "#10b981" },
];

const educationData = [
  {
    institution: "North South University",
    degree: "B.S. in Computer Science & Engineering",
    period: "2022 - Present",
    grade: "GPA: 3.75 / 4.00",
    desc: "Focus on Artificial Intelligence, Machine Learning, and Computer Vision. Active member of competitive programming and research societies.",
    color: "#3b82f6",
  },
  {
    institution: "Notre Dame College, Dhaka",
    degree: "Higher Secondary Certificate (Science)",
    period: "2019 - 2021",
    grade: "GPA: 5.00 / 5.00",
    desc: "Rigorous science curriculum with focus on mathematics, physics, and programming basics.",
    color: "#f59e0b",
  },
];

const aiSkills = [
  { name: "PyTorch", level: 90 },
  { name: "Transformers (Hugging Face)", level: 86 },
  { name: "LLM APIs (OpenAI/Anthropic/Gemini)", level: 92 },
  { name: "Vector Databases (Chroma/Pinecone)", level: 88 },
  { name: "LangChain & AI Agents", level: 90 },
  { name: "CUDA & GPU Optimization", level: 72 },
];

const fsSkills = [
  { name: "Python", level: 94 },
  { name: "Next.js / React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "FastAPI / Node.js", level: 86 },
  { name: "PostgreSQL & SQL", level: 82 },
  { name: "Docker & Containerization", level: 80 },
];

const researchData = [
  {
    role: "Undergraduate ML Researcher",
    org: "North South University AI Lab",
    period: "2024 - Present",
    points: [
      "Benchmarking Visual Language Models (VLMs) on specialized scene understanding datasets.",
      "Optimizing model parameters and inference speeds using PyTorch-based hardware adaptations.",
      "Achieved a 14% reduction in GPU decoding latency by refactoring attention-mask memory arrays.",
    ],
  },
];

const resumeProjects = [
  {
    title: "Neural Canvas",
    desc: "AI-powered creative tool using diffusion models to generate artwork from text descriptions.",
    tech: ["Python", "FastAPI", "Stable Diffusion", "React"],
    color: "#a855f7",
  },
  {
    title: "RAG Research Assistant",
    desc: "Retrieval-Augmented Generation pipeline processing scientific PDFs with source citations.",
    tech: ["LangChain", "ChromaDB", "Next.js", "OpenAI"],
    color: "#3b82f6",
  },
  {
    title: "VLM Vision Pipeline",
    desc: "End-to-end Visual Language Model pipeline for advanced image scene understanding.",
    tech: ["PyTorch", "Transformers", "CUDA", "Python"],
    color: "#06b6d4",
  },
  {
    title: "Anime Recommender",
    desc: "Personalized recommendation engine with collaborative filtering serving 50K+ users.",
    tech: ["PyTorch", "FastAPI", "PostgreSQL", "React"],
    color: "#f59e0b",
  },
];

const certifications = [
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI (Coursera)", date: "2024" },
  { name: "Google Cloud Machine Learning Engineer Certification", issuer: "Google Cloud", date: "2024" },
  { name: "Scientific Computing with Python", issuer: "freeCodeCamp", date: "2023" },
];

const achievements = [
  { title: "National AI Hackathon 2024 Finalist", desc: "Placed in the top 10 with a custom multimodal RAG system." },
  { title: "Dean's List Honoree", desc: "Recognized consecutively at NSU for maintaining high academic standing." },
  { title: "50K+ Web App Users", desc: "Architected and deployed Anime Recommender reaching substantial scale globally." },
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState("journey");
  const contentRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

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

  // Scroll spy effect to update sidebar active section on scroll
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl || !isOpen) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const scrollPos = contentEl.scrollTop + 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i].id;
        const secEl = contentEl.querySelector(`#res-sec-${secId}`) as HTMLElement;
        if (secEl && secEl.offsetTop <= scrollPos) {
          setActiveTab(secId);
          break;
        }
      }
    };

    contentEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => contentEl.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleTabClick = (id: string) => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const secEl = contentEl.querySelector(`#res-sec-${id}`) as HTMLElement;
    if (secEl) {
      isScrollingRef.current = true;
      setActiveTab(id);
      contentEl.scrollTo({
        top: secEl.offsetTop - 30,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 700);
    }
  };

  const downloadPDF = () => {
    // Simulated print or direct PDF path
    window.open("https://github.com/TechySakib", "_blank");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl p-4 sm:p-6"
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
          className="relative w-full max-w-5xl h-[88vh] rounded-[2.5rem] overflow-hidden flex flex-col text-left"
          style={{
            background: "linear-gradient(rgba(7, 7, 16, 0.92), rgba(7, 7, 16, 0.96)) padding-box, linear-gradient(135deg, rgba(168, 85, 247, 0.22), rgba(59, 130, 246, 0.22)) border-box",
            border: "1px solid transparent",
            boxShadow: "0 25px 80px -15px rgba(0, 0, 0, 0.7), 0 0 50px -5px rgba(168, 85, 247, 0.15)",
          }}
        >
          {/* Modal Header */}
          <div className="relative px-8 py-6 flex items-center justify-between border-b border-white/5 shrink-0" style={{ zIndex: 10 }}>
            <div>
              <h2 
                id="resume-modal-title"
                className="text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Nazmus Sakib
              </h2>
              <p 
                className="text-xs text-purple-300 font-mono tracking-wider uppercase mt-0.5"
                style={{ fontFamily: "'Space Mono', monospace" }}
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

          {/* Modal Content Columns */}
          <div className="flex-1 flex min-h-0 relative">
            
            {/* LEFT SIDEBAR: Navigation sticky on desktop, hidden on mobile */}
            <div className="hidden md:flex flex-col w-56 border-r border-white/5 p-6 shrink-0 bg-black/25">
              <span 
                className="text-[0.6rem] font-bold text-gray-500 tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Sections
              </span>
              <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleTabClick(sec.id)}
                    className="px-4 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-between group border-none"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: activeTab === sec.id ? "white" : "rgba(255,255,255,0.45)",
                      background: activeTab === sec.id ? "rgba(255,255,255,0.06)" : "transparent",
                    }}
                  >
                    <span>{sec.label}</span>
                    {activeTab === sec.id && (
                      <motion.div 
                        layoutId="active-nav-dot"
                        className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        style={{ boxShadow: "0 0 6px #a855f7" }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* RIGHT SIDEBAR: Scrollable content container */}
            <div 
              ref={contentRef}
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-12 scroll-smooth"
            >
              
              {/* 1. CAREER JOURNEY ROADMAP */}
              <section id="res-sec-journey" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-purple-500" />
                  Career Journey
                </h3>
                
                <div className="relative p-6 rounded-2xl bg-white/[0.015] border border-white/5 overflow-hidden">
                  {/* Ticker animated line path for desktop */}
                  <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-white/5 -translate-y-1/2 hidden md:block" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                    className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-amber-500 via-cyan-500 via-blue-500 via-purple-500 to-emerald-500 -translate-y-1/2 origin-left hidden md:block"
                  />

                  {/* Nodes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                    {roadmapNodes.map((node, idx) => (
                      <div key={idx} className="flex md:flex-col items-center gap-4 md:text-center">
                        {/* Node bubble */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.2, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.15 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 cursor-pointer transition-all duration-300 relative group"
                          style={{
                            borderColor: node.color,
                            background: "rgba(7, 7, 16, 0.95)",
                            boxShadow: `0 0 16px ${node.color}35`,
                          }}
                        >
                          <span className="text-[0.62rem] font-bold text-white font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>
                            {node.year}
                          </span>

                          {/* Hover tooltip for quick details */}
                          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-44 p-3 rounded-xl bg-zinc-950 border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 text-center shadow-xl z-30">
                            <p className="text-xs font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{node.step}</p>
                            <p className="text-[0.65rem] text-gray-400 mt-1 font-sans">{node.desc}</p>
                          </div>
                        </motion.div>

                        {/* Node Label Text */}
                        <div className="flex flex-col md:items-center">
                          <span 
                            className="text-sm font-bold text-white"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {node.step}
                          </span>
                          <span 
                            className="text-[0.68rem] text-gray-400 mt-0.5 max-w-[140px] md:max-w-none"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {node.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 2. PROFILE SUMMARY */}
              <section id="res-sec-summary" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-blue-500" />
                  Profile Summary
                </h3>
                <div 
                  className="rounded-2xl p-6 relative overflow-hidden bg-white/[0.015] border border-white/5 text-gray-300 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <p>
                    I am an aspiring AI Engineer, Deep Learning Developer, and Computer Science undergraduate student at North South University. Specialized in developing production-ready AI pipelines, multimodal evaluation models (VLMs), Retrieval-Augmented Generation (RAG) assistant frameworks, and interactive web services. Passionate about researching large language models, evaluation science, and building custom developer-facing interfaces at the intersection of AI/ML systems.
                  </p>
                </div>
              </section>

              {/* 3. EDUCATION TIMELINE */}
              <section id="res-sec-education" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-amber-500" />
                  Education
                </h3>
                
                <div className="relative border-l border-white/5 pl-8 ml-4 space-y-10">
                  {educationData.map((edu, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div 
                        className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: edu.color,
                          background: "var(--bg-deep)",
                          boxShadow: `0 0 10px ${edu.color}35`,
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: edu.color }} />
                      </div>

                      {/* Content Card */}
                      <div 
                        className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 transition-all duration-300 hover:bg-white/[0.025] hover:border-white/10"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h4 
                            className="text-md font-bold text-white"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {edu.degree}
                          </h4>
                          <span 
                            className="px-2.5 py-0.5 rounded-md text-[0.68rem] font-mono shrink-0 w-fit"
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              background: `${edu.color}14`,
                              color: edu.color,
                              border: `1px solid ${edu.color}25`,
                            }}
                          >
                            {edu.period}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-gray-300">{edu.institution}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          <span className="text-xs font-mono text-gray-400">{edu.grade}</span>
                        </div>

                        <p 
                          className="text-xs text-gray-400 leading-relaxed font-sans"
                        >
                          {edu.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. TECHNICAL SKILLS: AI/ML */}
              <section id="res-sec-skills-ai" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-purple-500" />
                  AI/ML & Deep Learning Skills
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiSkills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>
                          {skill.name}
                        </span>
                        <span className="text-[0.68rem] font-bold text-purple-300">{skill.level}%</span>
                      </div>

                      {/* Progress Track */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. TECHNICAL SKILLS: FULL STACK */}
              <section id="res-sec-skills-fs" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-blue-500" />
                  Full Stack Development Skills
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fsSkills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono" style={{ fontFamily: "'Space Mono', monospace" }}>
                          {skill.name}
                        </span>
                        <span className="text-[0.68rem] font-bold text-blue-300">{skill.level}%</span>
                      </div>

                      {/* Progress Track */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. RESEARCH EXPERIENCE */}
              <section id="res-sec-experience" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-cyan-500" />
                  Research Experience
                </h3>

                <div className="relative border-l border-white/5 pl-8 ml-4">
                  {researchData.map((exp, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div 
                        className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-var(--bg-deep)"
                        style={{ boxShadow: "0 0 10px rgba(6,182,212,0.35)" }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      </div>

                      {/* Content Card */}
                      <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h4 
                            className="text-md font-bold text-white"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {exp.role}
                          </h4>
                          <span 
                            className="px-2.5 py-0.5 rounded-md text-[0.68rem] font-mono shrink-0 w-fit bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {exp.period}
                          </span>
                        </div>

                        <span className="text-xs font-semibold text-gray-300 mb-4 block">{exp.org}</span>

                        <ul className="space-y-2.5 text-xs text-gray-400 leading-relaxed list-disc list-outside pl-4 font-sans">
                          {exp.points.map((pt, pi) => (
                            <li key={pi}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. FEATURED PROJECTS */}
              <section id="res-sec-projects" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-emerald-500" />
                  Featured Projects
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resumeProjects.map((proj, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 relative overflow-hidden transition-all duration-300 hover:bg-white/[0.025]"
                    >
                      {/* Left glow line */}
                      <div className="absolute top-0 bottom-0 left-0 w-[3px]" style={{ background: proj.color }} />

                      <h4 
                        className="text-sm font-bold text-white mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {proj.title}
                      </h4>
                      <p className="text-[0.7rem] text-gray-400 leading-relaxed mb-4 font-sans">
                        {proj.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t) => (
                          <span 
                            key={t}
                            className="text-[0.58rem] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 8. CERTIFICATIONS */}
              <section id="res-sec-certs" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-amber-500" />
                  Certifications
                </h3>

                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex items-center justify-between gap-4"
                    >
                      <div className="flex flex-col">
                        <span 
                          className="text-xs font-bold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {cert.name}
                        </span>
                        <span className="text-[0.68rem] text-gray-400 mt-1 font-mono">{cert.issuer}</span>
                      </div>
                      <span 
                        className="text-[0.62rem] font-bold text-gray-500 font-mono tracking-wider border border-white/5 bg-white/5 px-2 py-0.5 rounded"
                      >
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 9. ACHIEVEMENTS */}
              <section id="res-sec-awards" className="scroll-mt-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-purple-500" />
                  Achievements
                </h3>

                <div className="space-y-4">
                  {achievements.map((ach, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col gap-1.5"
                    >
                      <span 
                        className="text-xs font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        🏆 {ach.title}
                      </span>
                      <span className="text-[0.7rem] text-gray-400 leading-relaxed font-sans">{ach.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 10. CONTACT INFORMATION */}
              <section id="res-sec-contact-info" className="scroll-mt-6 pb-6">
                <h3 
                  className="text-lg font-bold text-white mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className="w-1.5 h-3 rounded-full bg-blue-500" />
                  Contact Information
                </h3>

                <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.62rem] font-mono text-gray-500 uppercase tracking-wider">Email</span>
                    <a href="mailto:nazmussakibkpc7578@gmail.com" className="text-xs font-bold text-purple-300 hover:text-purple-400 no-underline font-mono">
                      nazmussakibkpc7578@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.62rem] font-mono text-gray-500 uppercase tracking-wider">GitHub</span>
                    <a href="https://github.com/TechySakib" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-purple-300 hover:text-purple-400 no-underline font-mono">
                      github.com/TechySakib
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.62rem] font-mono text-gray-500 uppercase tracking-wider">LinkedIn</span>
                    <a href="https://linkedin.com/in/nazmussakib" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-purple-300 hover:text-purple-400 no-underline font-mono">
                      linkedin.com/in/nazmussakib
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.62rem] font-mono text-gray-500 uppercase tracking-wider">Location</span>
                    <span className="text-xs font-bold text-white font-sans">
                      Dhaka, Bangladesh
                    </span>
                  </div>
                </div>
              </section>

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
              >
                LinkedIn
              </a>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <a 
                href="https://github.com/TechySakib" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-400 hover:text-white no-underline transition-all font-mono"
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
                  // Trigger smooth scroll to contact section
                  const contactEl = document.getElementById("contact");
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-center no-underline cursor-pointer"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Contact Me
              </a>
              <button
                onClick={downloadPDF}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:brightness-110 shadow-[0_4px_15px_rgba(168,85,247,0.25)] transition-all cursor-pointer border-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
