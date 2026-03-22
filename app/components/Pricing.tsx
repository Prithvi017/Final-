"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Server, Globe, FileCheck, ShieldCheck, Clock, Cpu, Lock, Users, Headphones, Building2, Key, Infinity as InfinityIcon, BadgeCheck, UserCheck } from "lucide-react";

const plans = [
  {
    name: "Starter", monthlyPrice: "$299", annualPrice: "$239", period: "/mo",
    desc: "For startups and small teams getting started with quantum-safe security.",
    features: [
      { icon: Globe, text: "Up to 10 API endpoints" },
      { icon: Lock, text: "CRYSTALS-Kyber encryption" },
      { icon: ShieldCheck, text: "Basic threat detection" },
      { icon: FileCheck, text: "7-day audit log retention" },
      { icon: Headphones, text: "Email support" },
    ],
    cta: "Start Free Trial", highlight: false,
  },
  {
    name: "Pro", monthlyPrice: "$899", annualPrice: "$719", period: "/mo",
    desc: "For growing companies that need full-stack quantum security at scale.",
    features: [
      { icon: InfinityIcon, text: "Unlimited API endpoints" },
      { icon: Cpu, text: "Full PQC suite (Kyber + Dilithium)" },
      { icon: ShieldCheck, text: "ML-powered threat detection" },
      { icon: FileCheck, text: "90-day audit log retention" },
      { icon: Server, text: "Secure API Gateway" },
      { icon: BadgeCheck, text: "SOC 2 compliance reports" },
      { icon: Clock, text: "Priority support (4h SLA)" },
    ],
    cta: "Get Started", highlight: true,
  },
  {
    name: "Enterprise", monthlyPrice: "Custom", annualPrice: "Custom", period: "",
    desc: "For large organizations with advanced compliance and scale requirements.",
    features: [
      { icon: Zap, text: "Everything in Pro" },
      { icon: Building2, text: "Dedicated infrastructure" },
      { icon: Key, text: "Custom key management (HSM)" },
      { icon: InfinityIcon, text: "Unlimited log retention" },
      { icon: BadgeCheck, text: "HIPAA / GDPR / FedRAMP" },
      { icon: UserCheck, text: "White-glove onboarding" },
      { icon: Users, text: "24/7 dedicated support" },
    ],
    cta: "Contact Sales", highlight: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28 relative section-glow">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--accent)" }}>Pricing</span>
            <div className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] mb-4" style={{ color: "var(--text-primary)" }}>
            Simple, transparent pricing
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
            No hidden fees. No lock-in. Scale up or down as your security needs evolve.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 px-1.5 py-1.5 rounded-full border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={!annual ? { backgroundColor: "var(--accent)", color: "#fff" } : { color: "var(--text-muted)" }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2"
              style={annual ? { backgroundColor: "var(--accent)", color: "#fff" } : { color: "var(--text-muted)" }}
            >
              Annual
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                style={annual ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" } : { backgroundColor: "var(--accent-bg)", color: "var(--accent)" }}>
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl p-7 flex flex-col gap-6 h-full"
              style={p.highlight
                ? { background: "var(--accent-bg)", border: "1px solid var(--accent-border)", boxShadow: "0 0 0 1px var(--accent-border), 0 0 40px rgba(99,102,241,0.15)" }
                : { background: "var(--glass-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }
              }
            >
              {/* Animated gradient top border for Pro */}
              {p.highlight && (
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: "linear-gradient(90deg, transparent, var(--accent), #06b6d4, transparent)" }}
                  />
                </div>
              )}

              {p.highlight && (
                <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.45 }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1 rounded-full text-white text-[10px] font-bold tracking-wider"
                  style={{ backgroundColor: "var(--accent)" }}>
                  <Zap className="w-2.5 h-2.5" /> Most Popular
                </motion.div>
              )}

              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block mb-3"
                  style={p.highlight
                    ? { background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }
                    : { background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border)" }
                  }>
                  {p.name}
                </span>
                <div className="flex items-end gap-1.5 mb-2">
                  <motion.span
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[2.6rem] font-black leading-none tracking-tight"
                    style={{ color: p.highlight ? "var(--accent)" : "var(--text-primary)" }}
                  >
                    {annual ? p.annualPrice : p.monthlyPrice}
                  </motion.span>
                  {p.period && <span className="text-sm mb-1.5" style={{ color: "var(--text-muted)" }}>{p.period}</span>}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
              </div>

              <div className="h-px" style={{ backgroundColor: "var(--border-subtle)" }} />

              <ul className="flex flex-col gap-3 flex-1">
                {p.features.map(({ icon: Icon, text }, fi) => (
                  <motion.li key={text} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.08 + fi * 0.04 }} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: p.highlight ? "var(--accent-bg)" : "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                      <Icon className="w-3 h-3" style={{ color: p.highlight ? "var(--accent)" : "var(--text-muted)" }} />
                    </div>
                    <span className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>{text}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={p.highlight ? { scale: 1.03, boxShadow: "0 0 28px rgba(99,102,241,0.4)" } : {}}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-full font-semibold text-sm"
                style={p.highlight
                  ? { background: "var(--accent)", color: "#fff" }
                  : { border: "1px solid var(--border)", color: "var(--text-secondary)", background: "transparent" }
                }
                onMouseEnter={(e) => { if (!p.highlight) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--bg-secondary)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; } }}
                onMouseLeave={(e) => { if (!p.highlight) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; } }}
              >
                {p.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
          className="text-center text-xs mt-8" style={{ color: "var(--text-faint)" }}>
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
