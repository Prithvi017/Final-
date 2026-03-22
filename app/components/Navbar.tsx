"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Platform", sub: ["Threat Detection", "PQC Encryption", "API Gateway", "Audit Logs"] },
  { label: "Solutions", sub: ["Enterprise", "Financial Services", "Healthcare", "Government"] },
  { label: "Pricing", sub: [] },
  { label: "Docs", sub: [] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled ? "var(--bg-nav)" : "transparent",
        borderBottomColor: scrolled ? "var(--border-nav)" : "transparent",
        boxShadow: scrolled ? "var(--shadow-nav)" : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
          <img src="/logo.png" alt="QUTRIUM" className="h-10 w-auto" />
          <span className="font-bold text-[18px] tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>QUTRIUM</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.sub.length && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.a
                href={`#${link.label.toLowerCase()}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2 }}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm transition-all duration-150"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.label}
                {link.sub.length > 0 && <ChevronDown className="w-3 h-3 opacity-50" />}
              </motion.a>

              <AnimatePresence>
                {activeDropdown === link.label && link.sub.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-48 glass-dark rounded-xl overflow-hidden shadow-xl"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    {link.sub.map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="block px-4 py-2.5 text-sm transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--text-primary)";
                          e.currentTarget.style.backgroundColor = "var(--bg-card-hover)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--text-secondary)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {s}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop CTA + Theme toggle */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="hidden lg:flex items-center gap-2"
        >
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent-border)";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--accent-bg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <button
            className="px-4 py-2 text-sm rounded-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.backgroundColor = "var(--bg-card)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 24px color-mix(in srgb, var(--accent) 40%, transparent)" }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-full text-white text-sm font-semibold"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Get Started Free
          </motion.button>
        </motion.div>

        {/* Mobile: theme + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "var(--text-muted)" }}
            onClick={() => setOpen(!open)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden border-t"
            style={{
              borderColor: "var(--border-nav)",
              backgroundColor: "var(--bg-nav)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={`#${l.label.toLowerCase()}`}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="px-3 py-2.5 text-sm rounded-lg transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="pt-3 mt-2 border-t flex flex-col gap-2" style={{ borderColor: "var(--border)" }}>
                <button className="px-4 py-2.5 text-sm text-left" style={{ color: "var(--text-secondary)" }}>
                  Sign In
                </button>
                <button className="px-5 py-2.5 rounded-full text-white text-sm font-semibold w-fit"
                  style={{ backgroundColor: "var(--accent)" }}>
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
