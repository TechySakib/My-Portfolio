"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{
          paddingTop: scrolled ? "12px" : "20px",
          paddingBottom: scrolled ? "12px" : "20px",
          transition: "padding 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease",
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
          <div className="relative">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                fontFamily: "'Space Grotesk', sans-serif",
                color: "white",
                letterSpacing: "-0.05em",
              }}
            >
              NS
            </div>
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                filter: "blur(8px)",
                zIndex: -1,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            Nazmus Sakib
          </span>
        </motion.a>

        {/* Desktop nav + CTA — all grouped on the RIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:flex items-center"
        >
          {/* Navigation Links Group */}
          <div className="flex items-center gap-2">
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
          </div>

          {/* Divider */}
          <div
            className="mx-4 h-4 w-px rounded-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />

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
    </>
  );
}
