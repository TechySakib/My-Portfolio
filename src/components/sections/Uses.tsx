"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const workstationItems = [
  { name: "MacBook Pro M1 Pro", spec: "Apple M1 Pro · 16GB RAM", desc: "My primary development machine. High performance, silent, and handles all local web deployments, scripting, and research prototyping.", icon: "💻" },
  { name: "PC Power Gaming Monitor", spec: "27\" · QHD · IPS 144Hz", desc: "The central monitor. High refresh rate and crisp resolution provide comfortable real estate for terminal panes and gaming sessions.", icon: "🖥️" },
  { name: "Royal Kludge RK71", spec: "70% Layout · Brown Switches", desc: "A tactile mechanical keyboard that is quiet, reliable, and compact enough to keep my desk clean.", icon: "⌨️" },
  { name: "Corsair M75 Air", spec: "Ultra-Lightweight · 26K DPI · Wireless", desc: "Ultra-lightweight gaming mouse designed for seamless navigation and precision tracking.", icon: "🖱️" }
];

const accessories = [
  { name: "AirPods Pro 2", spec: "In-Ear · Active Noise Cancellation", desc: "Perfect noise isolation when studying or writing code in noisy environments.", icon: "🎧" },
  { name: "Office Lamp", spec: "Warm-light screen bar", desc: "Reduces eye strain during late-night code audits with soft, glare-free monitor illumination.", icon: "💡" },
  { name: "Hoco W35 Max", spec: "Over-Ear · Bluetooth 5.3", desc: "Incredibly long battery life headphones for casual audiobooks and deep relaxation.", icon: "🎧" }
];

const deskItems = [
  { name: "Kuromi Plushie", desc: "My desk mascot that adds color and whimsical contrast to the hardware stack.", color: "rgba(168, 85, 247, 0.15)", icon: "😈" },
  { name: "Roronoa Zoro", desc: "The legendary One Piece swordsman representing persistence and focus.", color: "rgba(16, 185, 129, 0.15)", icon: "⚔️" },
  { name: "Portgas D. Ace", desc: "Ace's burning passion represents active creativity and drive.", color: "rgba(249, 115, 22, 0.15)", icon: "🔥" }
];

const applications: Array<{ name: string; purpose: string; desc: string; opinion: string; icon: string; color: string }> = [];

const subscriptions = [
  { name: "ChatGPT Plus", desc: "Provides access to GPT-4o for system architecture planning, debugging assistance, and brainstorming.", opinion: "Worth every penny for documentation drafting and debugging.", color: "#10b981" }
];

export default function UsesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="uses"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 overflow-hidden"
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

      <div className="max-w-5xl mx-auto w-full relative z-10 px-4 sm:px-6">
        
        {/* Centered Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div
              className="w-2 h-2 rounded-full bg-purple-500"
              style={{ boxShadow: "0 0 8px #a855f7" }}
            />
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.65rem",
                color: "#a855f7",
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
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-bold tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Uses
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-400 max-w-2xl text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The hardware, software, and tools I use every day for AI research, development, learning, and creativity.
          </motion.p>
        </div>

        {/* Categories Stack */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-24"
        >
            {/* 1. Workstation */}
            {workstationItems.length > 0 && (
              <div className="text-center">
                <h3 
                  className="text-xs font-mono font-bold text-purple-400 tracking-[0.2em] uppercase mb-8 text-center"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Workstation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workstationItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#0f0f1c]/50 hover:border-purple-500/20 hover:-translate-y-1"
                      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                    >
                      <span className="text-2xl mb-3 shrink-0">{item.icon}</span>
                      <div className="flex flex-col items-center">
                        <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {item.name}
                        </h4>
                        <p className="text-[0.62rem] font-mono text-purple-300 mb-2" style={{ fontFamily: "var(--font-space-mono)" }}>
                          {item.spec}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Accessories */}
            {accessories.length > 0 && (
              <div className="text-center">
                <h3 
                  className="text-xs font-mono font-bold text-purple-400 tracking-[0.2em] uppercase mb-8 text-center"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Accessories
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accessories.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#0f0f1c]/50 hover:border-purple-500/20 hover:-translate-y-1"
                      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                    >
                      <span className="text-2xl mb-3 shrink-0">{item.icon}</span>
                      <div className="flex flex-col items-center">
                        <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {item.name}
                        </h4>
                        <p className="text-[0.62rem] font-mono text-purple-300 mb-2" style={{ fontFamily: "var(--font-space-mono)" }}>
                          {item.spec}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Figures & Desk Items */}
            {deskItems.length > 0 && (
              <div className="text-center">
                <h3 
                  className="text-xs font-mono font-bold text-purple-400 tracking-[0.2em] uppercase mb-8 text-center"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Figures & Desk Items
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {deskItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center text-center justify-between transition-all duration-300 hover:bg-[#0f0f1c]/40 hover:-translate-y-1 group relative overflow-hidden"
                      style={{
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        borderTop: `2px solid ${item.color.replace('0.15', '0.4')}`
                      }}
                    >
                      <div className="flex flex-col items-center mb-4">
                        <span className="text-xl mb-3">{item.icon}</span>
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <h4 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-xs">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Applications */}
            {applications.length > 0 && (
              <div className="text-center">
                <h3 
                  className="text-xs font-mono font-bold text-purple-400 tracking-[0.2em] uppercase mb-8 text-center"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Applications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applications.map((app, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#0f0f1c]/50 hover:border-purple-500/20 hover:-translate-y-1"
                      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                    >
                      <span className="text-3xl mb-3 shrink-0">{app.icon}</span>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center gap-2 mb-2">
                          <h4 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                            {app.name}
                          </h4>
                          <span className="text-[0.58rem] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 uppercase tracking-wider">
                            {app.purpose}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3 font-sans max-w-md">
                          {app.desc}
                        </p>
                        <p className="text-[0.68rem] text-purple-300/90 font-mono italic" style={{ fontFamily: "var(--font-space-mono)" }}>
                          &ldquo;{app.opinion}&rdquo;
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Subscriptions */}
            {subscriptions.length > 0 && (
              <div className="text-center">
                <h3 
                  className="text-xs font-mono font-bold text-purple-400 tracking-[0.2em] uppercase mb-8 text-center"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  Subscriptions
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {subscriptions.map((sub, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-6 rounded-2xl bg-[#0b0b14]/50 border border-white/5 flex flex-col items-center text-center justify-between transition-all duration-300 hover:bg-[#0f0f1c]/50 hover:border-purple-500/20 hover:-translate-y-1"
                      style={{
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        borderTop: `2px solid ${sub.color}60`
                      }}
                    >
                      <div className="flex flex-col items-center w-full">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <h4 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                            {sub.name}
                          </h4>
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: sub.color, boxShadow: `0 0 8px ${sub.color}` }} />
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 font-sans max-w-md">
                          {sub.desc}
                        </p>
                      </div>
                      <p className="text-[0.68rem] text-purple-300/90 font-mono italic" style={{ fontFamily: "var(--font-space-mono)" }}>
                        &ldquo;{sub.opinion}&rdquo;
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

      </div>
    </section>
  );
}
