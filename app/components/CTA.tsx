"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 section-glow" />
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)" }} />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-8"
          style={{ borderColor: "var(--accent-border)", backgroundColor: "var(--accent-bg)" }}>
          <Shield className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>Quantum-safe from day one</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6" style={{ color: "var(--text-primary)" }}>
          Start protecting your<br />
          <span className="gradient-text">infrastructure today</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Join 2,400+ security teams who trust QUTRIUM to defend against both today's threats and tomorrow's quantum attacks.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4">
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.45)" }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-sm"
            style={{ backgroundColor: "var(--accent)" }}>
            Get Started Free <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border text-sm font-medium"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-card)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-card)")}>
            Talk to Sales
          </motion.button>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          className="text-xs mt-6" style={{ color: "var(--text-faint)" }}>
          14-day free trial · No credit card · SOC 2 certified
        </motion.p>
      </div>
    </section>
  );
}
