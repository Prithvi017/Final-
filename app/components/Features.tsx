"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Radar, Globe, FileText, ArrowRight } from "lucide-react";

const features = [
  { icon: Lock, title: "Post-Quantum Encryption", desc: "Powered by CRYSTALS-Kyber & Dilithium — the algorithms that even future quantum supercomputers can't crack. NIST standardized, production-ready, and built for threats that haven't arrived yet.", tag: "FIPS 140-3", color: "#6366f1" },
  { icon: Radar, title: "Threat Detection", desc: "ML-powered behavioral analysis that never sleeps. Catches zero-day exploits, lateral movement, and anomalies across your entire attack surface in real time — before they even warm up.", tag: "< 50ms latency", color: "#a78bfa" },
  { icon: Globe, title: "Secure API Gateway", desc: "VIP treatment for every endpoint — quantum-safe TLS, smart rate limiting & mutual auth baked in. Drops cleanly into existing infrastructure. Bad actors stay out; your services stay blazing fast.", tag: "99.99% uptime", color: "#06b6d4" },
  { icon: FileText, title: "Audit & Compliance", desc: "Tamper-proof, immutable audit trails with auto-reporting built for SOC 2, ISO 27001, HIPAA & GDPR. Because \"trust us, we're compliant\" is never a strategy — but having receipts always is.", tag: "Auto-reporting", color: "#f59e0b" },
];

function Card({ f, i }: { f: (typeof features)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-default overflow-hidden h-full"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 20%, ${f.color}12 0%, transparent 60%)`, transition: "opacity 0.4s ease" }} />
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
          <f.icon className="w-5 h-5" style={{ color: f.color }} />
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${f.color}12`, color: f.color, border: `1px solid ${f.color}25` }}>
          {f.tag}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-[15px] mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
      </div>
      <div className="mt-auto pt-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100"
          style={{ color: f.color, transition: "opacity 0.3s ease" }}>
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });
  return (
    <section id="features" className="py-28 relative section-glow">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={headRef} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--accent)" }}>Platform Capabilities</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] max-w-lg" style={{ color: "var(--text-primary)" }}>
              Everything you need to <span className="gradient-text">stay ahead</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs md:text-right" style={{ color: "var(--text-muted)" }}>
              Every layer of your stack protected with cryptographic primitives that withstand Shor's algorithm.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {features.map((f, i) => <Card key={f.title} f={f} i={i} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 glass-card rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Ready to see it in action?</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Deploy in under 10 minutes. No credit card required.</p>
          </div>
          <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.35)" }} whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 px-6 py-2.5 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: "var(--accent)" }}>
            Start Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
