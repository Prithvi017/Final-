"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DashboardPreview from "./DashboardPreview";
import { Cpu, Globe, ShieldCheck, Zap } from "lucide-react";

const statuses = [
  { label: "System Status", value: "Operational", color: "#22c55e", icon: ShieldCheck },
  { label: "PQC Engine", value: "Active", color: "#06b6d4", icon: Cpu },
  { label: "Threat Level", value: "Elevated", color: "#f59e0b", icon: Zap },
  { label: "Data Centers", value: "12 Regions", color: "#a78bfa", icon: Globe },
];

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="dashboard" className="py-28 relative section-glow">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--accent)" }}>Live Platform</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] max-w-lg" style={{ color: "var(--text-primary)" }}>
              Security <span className="gradient-text">Command Center</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs md:text-right" style={{ color: "var(--text-muted)" }}>
              Full visibility across your infrastructure — every threat, session, and encryption handshake.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8">
          {statuses.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, scale: 0.88 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass"
              style={{ border: "1px solid var(--border)" }}>
              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <s.icon className="w-3 h-3" style={{ color: s.color, opacity: 0.8 }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}:</span>
              <span className="text-xs font-semibold" style={{ color: s.color }}>{s.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
