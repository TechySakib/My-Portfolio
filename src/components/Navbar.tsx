"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#uses", label: "Uses" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setScrolled(y > 40);
    });
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "uses", "contact"];
      const scrollPos = window.scrollY + 100;
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease",
          background: scrolled
            ? "rgba(7, 7, 16, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 group no-underline"
          id="nav-logo"
        >
          <div 
            className="relative cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLightboxOpen(true);
            }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 relative group-hover:border-purple-500 transition-all duration-300 flex items-center justify-center">
              <Image
                src="/images/sakib-portrait.jpg"
                alt="Nazmus Sakib"
                width={36}
                height={36}
                className="object-cover w-full h-full scale-105"
              />
            </div>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                filter: "blur(6px)",
                zIndex: -1,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-satisfy), 'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "1.2rem", // cursive fonts run smaller, so we upscale slightly
              color: "var(--text-primary)",
              letterSpacing: "0.01em",
            }}
          >
            Nazmus Sakib
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:flex items-center gap-4"
        >
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
            >
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 no-underline flex items-center"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: activeSection === link.href.slice(1)
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  background:
                    activeSection === link.href.slice(1)
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href.slice(1)) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href.slice(1)) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </a>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.a
            href="#contact"
            id="nav-cta"
            whileHover={{
              scale: 1.05,
              y: -1,
              boxShadow: "0 6px 20px rgba(168, 85, 247, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold no-underline transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, #a855f7, #3b82f6)",
              color: "white",
              boxShadow: "0 4px 15px rgba(168, 85, 247, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              letterSpacing: "0.02em",
            }}
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>

        {/* Mobile menu button */}
        <button
          id="nav-mobile-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 rounded-full"
            style={{ background: "var(--text-primary)", transition: "background 0.3s" }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block w-5 h-0.5 rounded-full"
            style={{ background: "var(--text-primary)" }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 rounded-full"
            style={{ background: "var(--text-primary)" }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 md:hidden flex flex-col items-center justify-center gap-6"
            style={{
              background: "rgba(7, 7, 16, 0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold no-underline"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(168, 85, 247, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMenuOpen(false)}
              className="mt-6 px-8 py-3 rounded-full text-lg font-bold no-underline transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                color: "white",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 4px 15px rgba(168, 85, 247, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                letterSpacing: "0.02em",
              }}
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Avatar Photo */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md cursor-zoom-out p-6"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-6 right-6 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border border-white/10"
              onClick={() => setLightboxOpen(false)}
              style={{ fontFamily: "sans-serif" }}
            >
              ✕
            </motion.button>

            {/* Modal Image Card */}
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-950/40 backdrop-blur-md cursor-default flex flex-col items-center"
            >
              <div className="relative aspect-[3/4] w-[320px] sm:w-[400px] max-w-full max-h-[65vh]">
                <Image
                  src="/images/sakib-portrait.jpg"
                  alt="Nazmus Sakib Full Portrait"
                  fill
                  sizes="(max-w-sm) 320px, 400px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Title / Info card at bottom of image */}
              <div 
                className="w-full p-5 text-center"
                style={{
                  background: "linear-gradient(180deg, transparent, rgba(7,7,16,0.95))",
                }}
              >
                <h4 
                  className="text-lg font-bold text-white mb-0.5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Nazmus Sakib
                </h4>
                <p 
                  className="text-xs text-purple-300 font-mono tracking-wider uppercase"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  Developer · AI Researcher
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
