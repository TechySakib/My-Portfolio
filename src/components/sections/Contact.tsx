"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@nazmussakib",
    href: "https://github.com",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter / X",
    handle: "@nazmussakib",
    href: "https://x.com",
    color: "#1da1f2",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Nazmus Sakib",
    href: "https://linkedin.com",
    color: "#0a66c2",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    handle: "nazmus@example.com",
    href: "mailto:nazmus@example.com",
    color: "#a855f7",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate premium API call
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setIsSent(true);

    // Reset form after display
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setIsSent(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-44 md:py-52 px-6 md:px-16"
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
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-4" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-28 items-center">
          
          {/* ══ LEFT COLUMN: Description & Copy Email & Socials ══ */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center space-y-12">
            <div>
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
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

            {/* Email Copy CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <motion.button
                id="contact-email-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopyEmail}
                className="px-8 py-4.5 rounded-2xl font-semibold text-base relative overflow-hidden flex items-center justify-center cursor-pointer"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                  color: "white",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(168, 85, 247, 0.2)",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      ✓ Email Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="email"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      📋 Copy Email
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.a
                id="contact-linkedin-btn"
                href={socials[2].href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4.5 rounded-2xl font-semibold text-base no-underline border flex items-center justify-center transition-all duration-300"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                LinkedIn →
              </motion.a>
            </motion.div>

            {/* Socials Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 flex-wrap pt-4"
            >
              {socials.map((social, i) => (
                <motion.a
                  key={social.id}
                  id={`contact-social-${social.id}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl no-underline group"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${social.color}50`;
                    (e.currentTarget as HTMLElement).style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <span style={{ color: "inherit" }}>{social.icon}</span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                    }}
                  >
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN: Glassmorphic Message Form Box ══ */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="rounded-3xl p-10 relative overflow-hidden text-left"
              style={{
                background: "rgba(255, 255, 255, 0.022)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)",
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
                className="text-xl font-bold mb-8 text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="form-name"
                    className="text-[0.68rem] font-bold text-gray-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.06em" }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="px-5 py-4.5 rounded-xl text-white outline-none w-full transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                      e.target.style.borderColor = "#a855f7";
                      e.target.style.boxShadow = "0 0 10px rgba(168, 85, 247, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.03)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="form-email"
                    className="text-[0.68rem] font-bold text-gray-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.06em" }}
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
                    className="px-5 py-4.5 rounded-xl text-white outline-none w-full transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.03)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="form-message"
                    className="text-[0.68rem] font-bold text-gray-400"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.06em" }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="px-5 py-4.5 rounded-xl text-white outline-none w-full transition-all duration-300 resize-none"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.05)";
                      e.target.style.borderColor = "#a855f7";
                      e.target.style.boxShadow = "0 0 10px rgba(168, 85, 247, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.03)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="w-full py-4.5 rounded-xl font-bold text-white relative overflow-hidden transition-all duration-300 flex items-center justify-center cursor-pointer mt-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: isSent
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #a855f7, #3b82f6)",
                    boxShadow: isSent
                      ? "0 4px 20px rgba(16, 185, 129, 0.3)"
                      : "0 4px 20px rgba(168, 85, 247, 0.25)",
                    border: "none",
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
                        className="flex items-center gap-1.5"
                      >
                        ✈ Send Message
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
            marginTop: "6rem",
            letterSpacing: "0.1em",
          }}
        >
          © 2025 TechySakib · Built with Next.js, Framer Motion & Three.js
        </motion.p>
      </div>
    </section>
  );
}
