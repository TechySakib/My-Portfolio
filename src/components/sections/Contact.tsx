"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const socials = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "@TechySakib",
    href: "https://linkedin.com",
    color: "#0a66c2",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@TechySakib",
    href: "https://instagram.com",
    color: "#e1306c",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@TechySakib",
    href: "https://threads.net",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Nazmus Sakib",
    href: "https://facebook.com",
    color: "#1877f2",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    handle: "@TechySakib",
    href: "https://x.com",
    color: "#1da1f2",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    handle: "@TechySakib",
    href: "https://github.com/TechySakib",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // State for email copying
  const [copied, setCopied] = useState(false);

  // States for the new contact message form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nazmussakibkpc7578@gmail.com"); // Updated to actual user email!
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !subject || !message) return;

    setIsSubmitting(true);
    // Simulate premium API call
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setIsSent(true);

    // Reset form after display
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSent(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-24 px-12 sm:px-24 md:px-36 lg:px-48 xl:px-60 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(59,130,246,0.4), transparent)",
        }}
      />

      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute"
          style={{
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-8" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 xl:gap-32 items-center">
          
          {/* ══ LEFT COLUMN: Description & Copy Email & Socials Grid ══ */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center space-y-12 lg:pr-4">
            <div>
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
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
                  Get in Touch
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.3rem, 4.5vw, 4rem)",
                  letterSpacing: "-0.04em",
                  color: "white",
                  lineHeight: 1.1,
                  marginBottom: "2.2rem",
                }}
              >
                Let&apos;s build
                <br />
                something.
              </motion.h2>

              {/* Subheading text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Whether you have an upcoming project in mind, want to collaborate on AI/ML systems research, or just want to say hello — feel free to drop a message or reach out globally!
              </motion.p>
            </div>

            {/* Email Copier & Underlined Display block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="py-2 relative flex flex-col items-start gap-3 select-all"
            >
              <a
                href="mailto:nazmussakibkpc7578@gmail.com"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight relative pb-1 transition-all duration-300 hover:text-purple-400 group inline-block"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                nazmussakibkpc7578@gmail.com
                {/* Underline */}
                <span
                  className="absolute bottom-0 left-0 w-full h-[2.5px] rounded-full origin-left transform scale-x-100 group-hover:scale-x-105 transition-transform duration-300"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #3b82f6)",
                    boxShadow: "0 1px 8px rgba(168, 85, 247, 0.4)",
                  }}
                />
              </a>

              <motion.button
                id="contact-email-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl text-[0.7rem] font-bold tracking-wider text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-1.5 text-emerald-400"
                    >
                      ✓ EMAIL COPIED
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-1.5"
                    >
                      📋 COPY TO CLIPBOARD
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Socials Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              {socials.map((social, i) => (
                <motion.a
                  key={social.id}
                  id={`contact-social-${social.id}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex items-center p-4 rounded-2xl no-underline group relative overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(255, 255, 255, 0.015)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(5px)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${social.color}25`;
                    el.style.background = `rgba(255, 255, 255, 0.035)`;
                    el.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px ${social.color}0a`;
                    const label = el.querySelector(".social-label") as HTMLElement;
                    if (label) label.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    el.style.background = "rgba(255, 255, 255, 0.015)";
                    el.style.boxShadow = "none";
                    const label = el.querySelector(".social-label") as HTMLElement;
                    if (label) label.style.color = "var(--text-secondary)";
                  }}
                >
                  {/* Subtle hover background radial gradient based on color */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 20px 20px, ${social.color}08 0%, transparent 60%)`,
                    }}
                  />

                  {/* Icon Block Container */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 mr-4 shrink-0"
                    style={{
                      background: "rgba(255, 255, 255, 0.025)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <span 
                      className="transition-colors duration-300"
                      style={{ color: social.color }}
                    >
                      {social.icon}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className="social-label text-[0.88rem] font-bold transition-colors duration-300"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {social.label}
                    </span>
                    <span
                      className="text-[0.75rem] truncate"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "var(--text-muted)",
                      }}
                    >
                      {social.handle}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN: Glassmorphic Message Form Box ══ */}
          <div className="lg:col-span-7 w-full lg:pt-8 p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="rounded-[2.5rem] p-8 relative overflow-hidden text-left max-w-[600px] lg:mx-auto"
              style={{
                background: "linear-gradient(rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0.012)) padding-box, linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.25)) border-box",
                border: "1px solid transparent",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 50px -10px rgba(168, 85, 247, 0.12)",
              }}
            >
              {/* Form border glowing line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(59,130,246,0.3), transparent)",
                }}
              />

              <h3
                className="text-2xl font-bold mb-10 text-white pt-4 lg:pt-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Send me a message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Row 1: First Name & Last Name (Side by Side) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="flex flex-col gap-6 mt-4">
                    <label
                      htmlFor="form-first-name"
                      className="text-[0.65rem] font-bold tracking-widest text-purple-300/70"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      id="form-first-name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="px-6 h-[56px] rounded-2xl text-white outline-none w-full transition-all duration-300 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] focus:bg-white/[0.06] focus:border-purple-500/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-6 mt-4">
                    <label
                      htmlFor="form-last-name"
                      className="text-[0.65rem] font-bold tracking-widest text-purple-300/70"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      id="form-last-name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="px-6 h-[56px] rounded-2xl text-white outline-none w-full transition-all duration-300 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] focus:bg-white/[0.06] focus:border-purple-500/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Subject (Side by Side) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-6 mt-4">
                    <label
                      htmlFor="form-email"
                      className="text-[0.65rem] font-bold tracking-widest text-blue-300/70"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="px-6 h-[56px] rounded-2xl text-white outline-none w-full transition-all duration-300 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] focus:bg-white/[0.06] focus:border-blue-500/80 focus:shadow-[0_0_15px_rgba(59,130,246,0.12)]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-6 mt-4">
                    <label
                      htmlFor="form-subject"
                      className="text-[0.65rem] font-bold tracking-widest text-purple-300/70"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What's this about?"
                      className="px-6 h-[56px] rounded-2xl text-white outline-none w-full transition-all duration-300 bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] focus:bg-white/[0.06] focus:border-purple-500/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-6 mt-4">
                  <label
                    htmlFor="form-message"
                    className="text-[0.65rem] font-bold tracking-widest text-purple-300/70"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me more..."
                    className="px-6 py-4.5 min-h-[200px] rounded-2xl text-white outline-none w-full transition-all duration-300 resize-none bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] focus:bg-white/[0.06] focus:border-purple-500/80 focus:shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  whileHover={{ scale: 1.012 }}
                  whileTap={{ scale: 0.988 }}
                  className="w-full py-5 rounded-2xl font-bold text-white relative overflow-hidden flex items-center justify-center cursor-pointer mt-6 border-none transition-all duration-500 shadow-[0_8px_30px_rgba(168,85,247,0.2)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.35)] hover:bg-[position:right_center]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: isSent
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #a855f7 100%)",
                    backgroundSize: "200% auto",
                    transition: "background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="submitting"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-2"
                      >
                        {/* Loading Spinner SVG */}
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </motion.span>
                    ) : isSent ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-1.5"
                      >
                        ✓ Message Sent Successfully!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                      >
                        Send Message <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            color: "var(--text-muted)",
            marginTop: "2.5rem",
            letterSpacing: "0.1em",
          }}
        >
          © 2025 TechySakib · Built with Next.js, Framer Motion & Three.js
        </motion.p>
      </div>
    </section>
  );
}
