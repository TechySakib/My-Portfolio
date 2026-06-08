"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
}

function StatItem({ value, suffix = "", label }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
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
    }
  }, [inView, value]);

  return (
    <div 
      ref={ref} 
      className="p-5 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-md hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all duration-300"
    >
      <span 
        className="text-2xl sm:text-3xl font-extrabold tracking-tight text-cyan-400"
        style={{ fontFamily: "var(--font-space-mono)" }}
      >
        {count}{suffix}
      </span>
      <span 
        className="text-[0.68rem] font-bold text-gray-500 uppercase tracking-wider mt-1.5"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </span>
    </div>
  );
}

const aiLabTools = [
  { name: "ChatGPT Plus", reason: "Advanced reasoning for system architecture, debugging complex algorithms, and rapid brainstorming.", frequency: "Daily", purpose: "AI Copilot & Reasoning", color: "#10b981" },
  { name: "Cursor Pro", reason: "My primary AI code editor. Agentic chat and inline codebase indexes make writing code 3x faster.", frequency: "Daily", purpose: "Code Generation & Editing", color: "#a855f7" },
  { name: "PyTorch", reason: "The foundation of my deep learning models. Invaluable for writing layers and tensor math.", frequency: "Frequent", purpose: "Neural Model Prototyping", color: "#ee4c2c" },
  { name: "Hugging Face", reason: "Accessing pre-trained weights, tokenizers, VLMs, dataset pipelines, and model deployment.", frequency: "Frequent", purpose: "Open Source Model Hub", color: "#f59e0b" },
  { name: "Transformers", reason: "Standard library for running attention-based networks, language models, and vision tokenizers.", frequency: "Frequent", purpose: "Inference & Fine-Tuning", color: "#3b82f6" },
  { name: "Jupyter", reason: "Exploratory data analysis, interactive debugging, graph plotting, and scratchpad testing.", frequency: "Weekly", purpose: "Data & ML Experimentation", color: "#f37626" },
  { name: "Colab", reason: "Quick access to free or cloud-rented GPUs to run training scripts and evaluate research models.", frequency: "Weekly", purpose: "GPU Accelerations", color: "#f9ab00" },
  { name: "Computer Vision", reason: "OpenCV operations, YOLOv8 object segmentation, and custom vision models.", frequency: "Frequent", purpose: "Visual Parsing", color: "#06b6d4" },
  { name: "Deep Learning", reason: "General deep neural network architectures, CNN layers, and backpropagation optimization.", frequency: "Daily", purpose: "Core Logic", color: "#a855f7" },
  { name: "LLMs", reason: "Integration of modern open-source weights (Llama-3) and proprietary APIs (Gemini/GPT) in applications.", frequency: "Frequent", purpose: "Language Intelligence", color: "#06b6d4" },
  { name: "RAG Systems", reason: "Constructing hybrid search pipelines utilizing FAISS vector nodes and BM25 lexicons.", frequency: "Frequent", purpose: "Semantic Information Retrieval", color: "#10b981" },
  { name: "VLM Pipelines", reason: "Visual-Language Model scene evaluation, multimodal dataset processing, and benchmarking.", frequency: "Frequent", purpose: "Multimodal AI Engineering", color: "#3b82f6" }
];

const devArsenal = [
  { name: "Cursor", role: "Primary Editor", level: 96, desc: "AI-first editor with codebase embeddings and agentic terminal commands.", color: "#a855f7" },
  { name: "VS Code", role: "Secondary Editor", level: 85, desc: "Fallback IDE for custom integrations and large data files.", color: "#3b82f6" },
  { name: "GitHub", role: "Version Control", level: 90, desc: "Managing remote source code, team coordination, and GitHub Actions CI/CD.", color: "#f0f0f8" },
  { name: "PostgreSQL", role: "Primary Database", level: 80, desc: "Advanced relational storage, indexing query operations, and schema builds.", color: "#336791" },
  { name: "Next.js", role: "Frontend Engine", level: 92, desc: "Building highly interactive frontend architectures, routing, and server components.", color: "#0052cc" },
  { name: "React", role: "UI Library", level: 94, desc: "Declarative component styling, state lifting, hook patterns, and virtual DOM renders.", color: "#00d8ff" },
  { name: "FastAPI", role: "Python Backend", level: 88, desc: "High-performance REST API services, Pydantic type checks, and asyncio endpoints.", color: "#009688" },
  { name: "Docker", role: "Container Engine", level: 82, desc: "Encapsulating dependencies, staging isolated databases, and local infrastructure replication.", color: "#2496ed" },
  { name: "Linux", role: "Server OS", level: 86, desc: "Bash automation, environment configurations, and self-hosted system monitoring.", color: "#f89820" },
  { name: "Railway", role: "Backend Deploy", level: 80, desc: "Cloud container hosting for FastAPI instances, Cron tasks, and databases.", color: "#c084fc" },
  { name: "Vercel", role: "Frontend Deploy", level: 95, desc: "Deploying production Next.js apps with seamless edge networking and speed.", color: "#06b6d4" }
];

const dailyApps = [
  { name: "Arc Browser", logo: "🌐", desc: "Spaces and clean split layouts simplify switching developer/student profiles.", alt: "Chrome/Safari" },
  { name: "Cursor", logo: "🤖", desc: "Codebase context embeddings save hours of boilerplate API integrations.", alt: "VS Code" },
  { name: "iTerm2", logo: "🐚", desc: "Custom themes, key-bindings, and split panes speed up shell commands.", alt: "Terminal.app" },
  { name: "Raycast", logo: "⚡", desc: "Vastly superior Spotlight replacement with built-in calculator, conversions, and macros.", alt: "Spotlight Search" }
];

const infraSteps = [
  { name: "Raspberry Pi 5", role: "Home Lab Controller", details: "DNS sinks, small daemon routines, and Home Assistant controller." },
  { name: "Home Server", role: "Docker Host Machine", details: "24/7 Intel machine hosting databases, file servers, and automation stacks." },
  { name: "Docker Stack", role: "Container Isolation", details: "Isolates networking, configs, and storage volumes for all services." },
  { name: "Self-Hosted Media", role: "Entertainment Library", details: "Plex, Jellyfin, and torrent clients running behind secure reverse proxies." },
  { name: "Automation Systems", role: "Node-Red & Scripts", details: "Connecting IoT sensors, local APIs, and daily backup crons." }
];

const flowchartSteps = [
  { name: "Research", step: "01", desc: "Papers & PyTorch" },
  { name: "Development", step: "02", desc: "Cursor & FastAPI" },
  { name: "Testing", step: "03", desc: "Docker Containers" },
  { name: "Deployment", step: "04", desc: "Railway & Vercel" },
  { name: "Self Hosting", step: "05", desc: "Home Server & Pi 5" }
];

const accessories = [
  { name: "AirPods Pro 2", desc: "Active Noise Cancellation for focused deep work in noisy rooms.", icon: "🎧" },
  { name: "Kaloc Monitor Arm", desc: "Flexible desk arm to clear cable clutter and adjust monitor angles.", icon: "🦾" },
  { name: "Office Lamp", desc: "Warm-light screen bar reducing optical fatigue during late night runs.", icon: "💡" },
  { name: "Transcend 1TB Storage", desc: "Encrypted offline solid-state drives for backups of ML data.", icon: "💾" },
  { name: "Hoco W35 Max", desc: "Over-ear headphones with exceptional battery lifespan for casual listening.", icon: "🎧" }
];

const personalCorner = [
  { name: "Kuromi Plushie", desc: "A cozy plush mascot that adds color and whimsical contrast to the hardware stack.", color: "#e879f9" },
  { name: "Roronoa Zoro Figure", desc: "The legendary swordsman representing relentless discipline and singular focus.", color: "#10b981" },
  { name: "Portgas D. Ace Figure", desc: "The fiery commander representing burning passion and creative spark.", color: "#f97316" }
];

export default function UsesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [hoveredTool, setHoveredTool] = useState<typeof aiLabTools[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"workspace" | "ai" | "dev" | "infra">("workspace");

  return (
    <section
      id="uses"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center py-32 overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-start mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div
              className="w-2 h-2 rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 8px #06b6d4" }}
            />
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.65rem",
                color: "#06b6d4",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              My Workspace
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            <div className="lg:col-span-7">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                  letterSpacing: "-0.04em",
                  color: "white",
                  lineHeight: 1.05,
                  marginBottom: "1.2rem",
                }}
              >
                My Command Center
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-gray-400 max-w-2xl text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                The hardware, software, tools, and systems powering my AI research, development workflow, and daily creativity. Welcome to my custom deployment setup.
              </motion.p>
            </div>

            {/* Workstation Vector Illustration Container */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-[340px] aspect-[1.5/1] rounded-2xl border border-white/5 bg-[#0b0b14]/50 p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-md"
              >
                {/* Glowing Background Radial */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-cyan-500/10 blur-[40px] pointer-events-none" />
                
                {/* Workstation SVG */}
                <svg className="w-full h-full text-zinc-700" viewBox="0 0 300 200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Desk Line */}
                  <line x1="20" y1="160" x2="280" y2="160" strokeWidth="2" stroke="rgba(255,255,255,0.08)" />
                  {/* Desk Legs */}
                  <line x1="45" y1="160" x2="45" y2="190" strokeWidth="2" stroke="rgba(255,255,255,0.05)" />
                  <line x1="255" y1="160" x2="255" y2="190" strokeWidth="2" stroke="rgba(255,255,255,0.05)" />
                  
                  {/* QHD Monitor Display */}
                  <rect x="75" y="45" width="150" height="85" rx="4" fill="rgba(7, 7, 16, 0.9)" stroke="rgba(255,255,255,0.12)" />
                  {/* Screen Content - Code lines */}
                  <line x1="85" y1="60" x2="165" y2="60" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.8" />
                  <line x1="85" y1="72" x2="200" y2="72" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.8" />
                  <line x1="85" y1="84" x2="135" y2="84" stroke="rgba(255,255,255,0.4)" />
                  <line x1="85" y1="96" x2="180" y2="96" stroke="#10b981" strokeWidth="2" strokeOpacity="0.8" />
                  <line x1="85" y1="108" x2="150" y2="108" stroke="rgba(255,255,255,0.4)" />
                  
                  {/* Monitor Stand */}
                  <path d="M140 130 H160 L165 160 H135 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" />
                  
                  {/* Keyboard */}
                  <rect x="110" y="145" width="80" height="8" rx="2" fill="rgba(7, 7, 16, 0.9)" stroke="rgba(255,255,255,0.15)" />
                  {/* Mouse */}
                  <rect x="200" y="146" width="10" height="6" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" />
                  
                  {/* MacBook Air on the side (closed) */}
                  <rect x="30" y="105" width="30" height="40" rx="3" fill="rgba(7, 7, 16, 0.9)" stroke="rgba(255,255,255,0.15)" transform="rotate(-10 30 105)" />
                  <line x1="28" y1="140" x2="58" y2="135" stroke="rgba(255,255,255,0.3)" />

                  {/* Speaker Left */}
                  <rect x="58" y="90" width="12" height="30" rx="2" fill="rgba(7, 7, 16, 0.8)" stroke="rgba(255,255,255,0.08)" />
                  <circle cx="64" cy="98" r="2" fill="rgba(255,255,255,0.3)" />
                  <circle cx="64" cy="110" r="4" fill="rgba(255,255,255,0.2)" />
                  
                  {/* Speaker Right */}
                  <rect x="230" y="90" width="12" height="30" rx="2" fill="rgba(7, 7, 16, 0.8)" stroke="rgba(255,255,255,0.08)" />
                  <circle cx="236" cy="98" r="2" fill="rgba(255,255,255,0.3)" />
                  <circle cx="236" cy="110" r="4" fill="rgba(255,255,255,0.2)" />
                </svg>

                {/* Floating particle animations */}
                <motion.div 
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/80"
                  animate={{ y: [0, -35, 0], x: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ top: "45%", left: "30%" }}
                />
                <motion.div 
                  className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/80"
                  animate={{ y: [0, -45, 0], x: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ top: "35%", right: "30%" }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tab Controls to segment sections */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/5 pb-4">
          {[
            { id: "workspace", label: "Workstation & Hardware" },
            { id: "ai", label: "AI Research Lab" },
            { id: "dev", label: "Development Arsenal" },
            { id: "infra", label: "Infrastructure & Self-Hosting" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 border cursor-pointer relative"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.45)",
                borderColor: activeTab === tab.id ? "rgba(168, 85, 247, 0.4)" : "rgba(255,255,255,0.05)",
                background: activeTab === tab.id ? "rgba(168, 85, 247, 0.08)" : "rgba(7, 7, 16, 0.3)"
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="uses-active-tab-glow"
                  className="absolute inset-0 rounded-xl border border-cyan-400/30 pointer-events-none"
                  style={{ boxShadow: "0 0 10px rgba(6, 182, 212, 0.15)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Category Panels */}
        <div className="mb-20 min-h-[480px]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: WORKSPACE & HARDWARE */}
            {activeTab === "workspace" && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch text-left"
              >
                {/* Macbook Air */}
                <div 
                  className="md:col-span-5 p-8 rounded-3xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between relative overflow-hidden backdrop-blur-md hover:border-purple-500/20 transition-all duration-300"
                  style={{ boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500/5 blur-[30px] pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl">💻</span>
                      <span className="px-3 py-1 rounded-full text-[0.62rem] font-mono uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">Dev Rig</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      MacBook Air 13&quot; M1
                    </h3>
                    <p className="text-xs text-purple-300 font-semibold mb-4" style={{ fontFamily: "var(--font-space-mono)" }}>
                      Apple M1 · 8-Core CPU · 8GB RAM
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      My primary machine and compiler. Serves as the central hub for model deployments, compiling web services, prototyping codebases, and handling all daily production pipelines. Light, completely silent, and exceptionally efficient.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[0.68rem] text-gray-500 font-mono">
                    <span>STATUS: ACTIVE</span>
                    <span>DEPLOYED: 2022</span>
                  </div>
                </div>

                {/* Desk Setup Items */}
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Xiaomi Redmi A27Q Monitor", spec: "27\" · QHD (2560x1440) · IPS 75Hz", desc: "Crisp visual canvas providing vast grid space for side-by-side terminal terminals and IDE editors.", icon: "🖥️", color: "#3b82f6" },
                    { title: "RK71 Mechanical Keyboard", spec: "70% Layout · Brown Switches · Hot-Swap", desc: "Tactile mechanical keyboard customized for speed, clean feedback, and compact desk space.", icon: "⌨️", color: "#10b981" },
                    { title: "Logitech Pebble Mouse", spec: "Silent Clicking · Dual Wireless · Slim", desc: "Low-profile silent mouse designed for seamless workspace switching and zero wrist strain.", icon: "🖱️", color: "#06b6d4" },
                    { title: "Fenda F&D F580X Speaker", spec: "2.1 Channel · Bluetooth 5.0 · Subwoofer", desc: "Full-range acoustics and deep soundscapes powering focused research tracks and workspace media.", icon: "🔊", color: "#a855f7" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl">{item.icon}</span>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {item.title}
                        </h4>
                        <p className="text-[0.62rem] font-mono mb-2" style={{ color: item.color, fontFamily: "var(--font-space-mono)" }}>
                          {item.spec}
                        </p>
                        <p className="text-[0.7rem] text-gray-400 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 2: AI RESEARCH LAB */}
            {activeTab === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative text-left"
              >
                {/* SVG Neural connections background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] hidden md:block">
                  <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" stroke="#a855f7" strokeWidth="1">
                    <path d="M 100 80 Q 250 150 450 80 T 800 120" />
                    <path d="M 200 280 C 400 180 500 350 850 220" />
                    <line x1="300" y1="50" x2="300" y2="350" strokeDasharray="4 4" />
                    <line x1="650" y1="50" x2="650" y2="350" strokeDasharray="4 4" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative z-10">
                  {aiLabTools.map((tool) => (
                    <div
                      key={tool.name}
                      onMouseEnter={() => setHoveredTool(tool)}
                      onMouseLeave={() => setHoveredTool(null)}
                      className="p-5 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between items-start cursor-help transition-all duration-300 hover:bg-[#0f0f1c]/70 hover:border-purple-500/30"
                      style={{
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <span className="text-[0.75rem] font-bold text-white font-mono" style={{ fontFamily: "var(--font-space-mono)" }}>
                          {tool.name}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: tool.color, boxShadow: `0 0 8px ${tool.color}` }} />
                      </div>
                      <span className="text-[0.58rem] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 uppercase tracking-wider">
                        {tool.purpose}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Info Tooltip Overlay */}
                <div className="mt-8 h-20 relative">
                  <AnimatePresence mode="wait">
                    {hoveredTool ? (
                      <motion.div
                        key={hoveredTool.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-md max-w-3xl mx-auto text-center"
                      >
                        <h4 className="text-xs font-bold text-purple-300 font-mono mb-1" style={{ fontFamily: "var(--font-space-mono)" }}>
                          {hoveredTool.name} · {hoveredTool.frequency} Usage
                        </h4>
                        <p className="text-[0.72rem] text-gray-400 leading-relaxed font-sans">
                          {hoveredTool.reason}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-tooltip"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="text-center text-xs text-gray-500 font-mono py-4"
                        style={{ fontFamily: "var(--font-space-mono)" }}
                      >
                        [ Hover over any model or framework above to inspect system usage details ]
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* TAB 3: DEVELOPMENT ARSENAL */}
            {activeTab === "dev" && (
              <motion.div
                key="dev"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left"
              >
                {devArsenal.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-5 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {tool.name}
                        </h4>
                        <span className="text-[0.62rem] font-mono uppercase tracking-wider text-gray-500">
                          {tool.role}
                        </span>
                      </div>
                      <p className="text-[0.7rem] text-gray-400 leading-relaxed mb-4 font-sans">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[0.62rem] font-mono" style={{ fontFamily: "var(--font-space-mono)" }}>
                        <span className="text-gray-500">Proficiency</span>
                        <span style={{ color: tool.color }}>{tool.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${tool.level}%`,
                            background: tool.color,
                            boxShadow: `0 0 8px ${tool.color}50`
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: INFRASTRUCTURE & SELF-HOSTING */}
            {activeTab === "infra" && (
              <motion.div
                key="infra"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-12 text-left"
              >
                {/* Visual Flow Pipeline */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0b14]/30 border border-white/5 backdrop-blur-md">
                  <h4 className="text-[0.62rem] font-mono text-gray-500 uppercase tracking-widest mb-8 text-center" style={{ fontFamily: "var(--font-space-mono)" }}>
                    System Delivery Pipeline
                  </h4>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative max-w-5xl mx-auto">
                    {flowchartSteps.map((step, idx) => (
                      <div key={step.name} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                        {/* Node Card */}
                        <div className="p-4 rounded-2xl bg-[#0b0b14]/80 border border-white/5 flex items-center gap-3 w-full sm:w-48 md:w-44 text-left shadow-lg">
                          <span className="text-xs font-mono font-bold text-cyan-400" style={{ fontFamily: "var(--font-space-mono)" }}>
                            {step.step}
                          </span>
                          <div>
                            <h5 className="text-[0.75rem] font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                              {step.name}
                            </h5>
                            <p className="text-[0.58rem] text-gray-500 mt-0.5 font-sans">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                        
                        {/* Connecting Line */}
                        {idx < flowchartSteps.length - 1 && (
                          <>
                            {/* Horizontal Line for Desktop */}
                            <div className="hidden md:block w-10 lg:w-16 h-0.5 bg-zinc-800 relative overflow-hidden shrink-0">
                              <motion.div 
                                className="absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                animate={{ left: ["-100%", "200%"] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: idx * 0.4 }}
                              />
                            </div>
                            {/* Vertical Line for Mobile */}
                            <div className="md:hidden w-0.5 h-6 bg-zinc-800 relative overflow-hidden my-1">
                              <motion.div 
                                className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                                animate={{ top: ["-100%", "200%"] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: idx * 0.4 }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Server Stack Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {infraSteps.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 text-lg">
                          <span>⚙️</span>
                          <span className="text-[0.58rem] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">Node</span>
                        </div>
                        <h4 className="text-[0.8rem] font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {item.name}
                        </h4>
                        <p className="text-[0.62rem] text-gray-500 mb-3 font-mono" style={{ fontFamily: "var(--font-space-mono)" }}>
                          {item.role}
                        </p>
                        <p className="text-[0.68rem] text-gray-400 leading-relaxed font-sans">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Daily Applications Grid */}
        <div className="text-left mb-24">
          <h3 
            className="text-[0.68rem] font-bold text-purple-400 tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Daily Applications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {dailyApps.map((app) => (
              <div
                key={app.name}
                className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-cyan-500/[0.02] blur-[20px] pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{app.logo}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {app.name}
                    </h4>
                    <span className="text-[0.58rem] text-gray-500 font-mono block mt-0.5" style={{ fontFamily: "var(--font-space-mono)" }}>
                      Prefers over {app.alt}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Accessories Grid */}
        <div className="text-left mb-24">
          <h3 
            className="text-[0.68rem] font-bold text-purple-400 tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "var(--font-space-mono)" }}
          >
            Setup Accessories
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {accessories.map((item, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div>
                  <span className="text-xl block mb-3">{item.icon}</span>
                  <h4 className="text-xs font-bold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {item.name}
                  </h4>
                  <p className="text-[0.68rem] text-gray-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Personal Corner & Figures */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left mb-24">
          <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-3xl bg-[#0b0b14]/50 border border-white/5 relative overflow-hidden backdrop-blur-md">
            <div>
              <span className="text-[0.62rem] font-mono text-purple-400 uppercase tracking-widest mb-4 block" style={{ fontFamily: "var(--font-space-mono)" }}>
                Personal Corner
              </span>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Things That Make The Setup Mine
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                A software workstation is more than just compilation rates and core frequencies. It is an expression of what inspires us. Beside my monitors stand figures and icons representing long stories, persistence, and creative playfulness.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 text-[0.62rem] font-mono text-gray-500">
              CORE THEME: ANIME & COZY MONOCHROME
            </div>
          </div>

          {/* Figures showcase */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {personalCorner.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col justify-between relative overflow-hidden group hover:bg-[#0f0f1c]/40 transition-all duration-300"
                style={{
                  borderLeft: `2px solid ${item.color}50`
                }}
              >
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)`,
                    transform: "translate(20%, -20%)"
                  }}
                />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl">🎨</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {item.name}
                  </h4>
                  <p className="text-[0.7rem] text-gray-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Philosophy Quote */}
        <div className="w-full mb-24">
          <div 
            className="p-8 sm:p-12 rounded-3xl relative overflow-hidden text-center flex flex-col items-center justify-center border border-white/5 backdrop-blur-md"
            style={{
              background: "linear-gradient(rgba(11, 11, 20, 0.93), rgba(11, 11, 20, 0.95)) padding-box, linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15)) border-box"
            }}
          >
            {/* Shifting radial mesh background */}
            <motion.div 
              className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 blur-[50px] pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
                x: [-30, 30, -30],
                y: [-20, 20, -20]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <span className="text-2xl text-purple-400 mb-4">“</span>
            <p 
              className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed max-w-3xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.01em" }}
            >
              I prefer owning my tools, self-hosting my services, and building systems that give me freedom, control, and the ability to create without limitations.
            </p>
            <span className="text-2xl text-cyan-400">”</span>
          </div>
        </div>

        {/* Command Center Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          <StatItem value={12} suffix="+" label="Projects Built" />
          <StatItem value={6} suffix="+" label="Research Experiments" />
          <StatItem value={25} suffix="+" label="Technologies Used" />
          <StatItem value={5} label="Years Coding" />
          <StatItem value={340} suffix="+" label="GitHub Contributions" />
        </div>

      </div>
    </section>
  );
}
