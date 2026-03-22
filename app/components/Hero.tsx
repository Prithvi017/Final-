"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import type { Transition } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import { useEffect, useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } as Transition,
});

const logos = ["Cloudflare", "HashiCorp", "Datadog", "Stripe", "Vercel", "Twilio"];

const stats = [
  { from: 0, to: 2.4, suffix: "B+", label: "Threats Blocked", decimals: 1 },
  { from: 99, to: 99.99, suffix: "%", label: "Platform Uptime", decimals: 2 },
  { from: 0, to: 12, prefix: "<", suffix: "ms", label: "Avg. Response Time", decimals: 0 },
  { from: 0, to: 180, suffix: "+", label: "Countries Protected", decimals: 0 },
];

function CountUp({ from, to, suffix, prefix = "", decimals, inView }: { from: number; to: number; suffix: string; prefix?: string; decimals: number; inView: boolean }) {
  const val = useMotionValue(from);
  const rounded = useTransform(val, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(val, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, val, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--grid-opacity)",
          backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.5) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, delay: 3 }}
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-secondary)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="flex flex-col">
            {/* Badge */}
            <motion.div {...fadeUp(0.05)} className="mb-7 w-fit">
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border"
                style={{ borderColor: "var(--accent-border)", backgroundColor: "var(--accent-bg)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--accent)" }} />
                </span>
                <span className="text-xs font-medium tracking-wide" style={{ color: "var(--accent)" }}>NIST PQC Compliant · v3.2.1</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[3.25rem] lg:text-[4rem] xl:text-[4.5rem] font-black leading-[1.02] tracking-[-0.03em] mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Security Built
              <br />for the{" "}
              <span className="gradient-text">Quantum</span>
              <br />Age
            </motion.h1>

            <motion.p {...fadeUp(0.25)} className="text-[1.05rem] leading-relaxed mb-9 max-w-[440px]" style={{ color: "var(--text-secondary)" }}>
              QUTRIUM delivers post-quantum cryptography, real-time threat intelligence, and zero-trust
              architecture protecting enterprises before quantum computers break today's encryption.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.35)} className="flex flex-wrap items-center gap-3 mb-12">
              <motion.a
                href="#dashboard"
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium"
                style={{ borderColor: "var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-card)" }}
                whileHover={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--border)" }}>
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" style={{ color: "var(--text-primary)" }} />
                </div>
                Watch Demo
              </motion.a>
            </motion.div>

            {/* Logos */}
            <motion.div {...fadeUp(0.45)}>
              <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: "var(--text-faint)" }}>Trusted by security teams at</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {logos.map((l, i) => (
                  <motion.span key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.07 }}
                    className="text-sm font-semibold cursor-default" style={{ color: "var(--text-faint)" }}>
                    {l}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-6 rounded-3xl blur-2xl" style={{ background: "var(--glow-primary)" }} />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative">
              <DashboardPreview compact />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="px-6 py-5 flex flex-col gap-1"
              style={{
                backgroundColor: "var(--bg-card)",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <span className="text-2xl font-black" style={{ color: "var(--accent)" }}>
                <CountUp {...s} inView={statsInView} />
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
