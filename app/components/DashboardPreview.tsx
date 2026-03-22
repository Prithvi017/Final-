"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, Activity, Shield, Cpu } from "lucide-react";

const initialLogs = [
  { time: "14:32:01", event: "Blocked SQL injection attempt", ip: "185.220.101.47", status: "blocked" },
  { time: "14:31:44", event: "Unauthorized API access denied", ip: "103.21.244.0", status: "blocked" },
  { time: "14:30:58", event: "PQC handshake established", ip: "10.0.0.14", status: "ok" },
  { time: "14:29:12", event: "Rate limit triggered — brute force", ip: "91.108.4.0", status: "blocked" },
  { time: "14:28:33", event: "Secure tunnel initialized", ip: "10.0.0.22", status: "ok" },
];

const newLogPool = [
  { event: "DDoS mitigation activated", ip: "198.51.100.0", status: "blocked" },
  { event: "Zero-trust policy enforced", ip: "10.0.1.5", status: "ok" },
  { event: "Anomalous payload detected", ip: "203.0.113.42", status: "blocked" },
  { event: "Kyber key exchange complete", ip: "10.0.0.31", status: "ok" },
  { event: "Geo-block triggered — CN", ip: "114.114.114.0", status: "blocked" },
  { event: "Certificate rotation complete", ip: "10.0.0.8", status: "ok" },
];

const alerts = [
  { level: "critical", msg: "Suspicious login — 14 failed attempts", time: "2 min ago" },
  { level: "warning", msg: "Anomalous traffic spike on /api/auth", time: "8 min ago" },
  { level: "info", msg: "New device enrolled — MFA verified", time: "15 min ago" },
];

const encryptionModules = [
  { name: "CRYSTALS-Kyber", status: "Active", pct: 100 },
  { name: "CRYSTALS-Dilithium", status: "Active", pct: 100 },
  { name: "SPHINCS+", status: "Standby", pct: 38 },
];

const chartData = [28, 52, 38, 68, 44, 78, 58, 88, 48, 72, 62, 82, 52, 68, 46, 90, 58, 76, 52, 86, 60, 72, 48, 66];

function Bar({ pct, active, delay = 0 }: { pct: number; active: boolean; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-subtle)" }}>
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: active ? "var(--accent)" : "var(--border)" }}
      />
    </div>
  );
}

function getTime() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

export default function DashboardPreview({ compact = false }: { compact?: boolean }) {
  const [logs, setLogs] = useState(initialLogs);
  const [count, setCount] = useState(1284);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const id = setInterval(() => {
      const next = newLogPool[Math.floor(Math.random() * newLogPool.length)];
      setLogs((p) => [{ ...next, time: getTime() }, ...p.slice(0, 4)]);
      if (next.status === "blocked") setCount((c) => c + 1);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-2xl overflow-hidden shadow-2xl ${compact ? "text-xs" : "text-sm"}`}
      style={{
        backgroundColor: "var(--bg)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[10px] font-mono" style={{ color: "var(--text-faint)" }}>qutrium.io/dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-[9px] font-mono" style={{ color: "var(--accent)" }}>LIVE</span>
          </motion.div>
          <span
            className="text-[9px] px-2 py-0.5 rounded-full border"
            style={{ color: "var(--text-faint)", borderColor: "var(--border)" }}
          >
            Simulated Data
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Threats Blocked", value: count.toLocaleString(), sub: "↑ 12 today", icon: Shield },
            { label: "Active Sessions", value: "347", sub: "● Live", icon: Cpu },
            { label: "Uptime", value: "99.98%", sub: "30-day avg", icon: Activity },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl p-3 dash-card"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{s.label}</p>
                <s.icon className="w-3 h-3" style={{ color: "var(--accent)", opacity: 0.6 }} />
              </div>
              <motion.p key={s.value} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-base leading-none" style={{ color: "var(--accent)" }}>
                {s.value}
              </motion.p>
              <p className="text-[9px] mt-1" style={{ color: "var(--text-faint)" }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="rounded-xl p-3 dash-card"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-medium flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
              <Activity className="w-3 h-3" style={{ color: "var(--accent)" }} /> Network Traffic
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[9px]" style={{ color: "var(--text-faint)" }}>
                <span className="w-2 h-1.5 rounded-sm inline-block" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }} />Normal
              </span>
              <span className="flex items-center gap-1 text-[9px]" style={{ color: "var(--text-faint)" }}>
                <span className="w-2 h-1.5 rounded-sm inline-block bg-red-500/60" />Spike
              </span>
            </div>
          </div>
          <div className="flex items-end gap-[2px] h-10">
            {chartData.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-[2px]"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.018, duration: 0.35, ease: "easeOut" }}
                style={{
                  height: `${h}%`,
                  transformOrigin: "bottom",
                  background: h > 75 ? "rgba(239,68,68,0.65)" : "color-mix(in srgb, var(--accent) 40%, transparent)",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["00:00", "06:00", "12:00", "18:00", "23:59"].map((t) => (
              <span key={t} className="text-[8px]" style={{ color: "var(--text-faint)" }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Alerts + Encryption */}
        <div className="grid grid-cols-2 gap-2.5">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-3 dash-card"
          >
            <p className="text-[9px] uppercase tracking-wider mb-2.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <AlertTriangle className="w-2.5 h-2.5 text-yellow-400" /> Threat Alerts
            </p>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <motion.div
                    animate={a.level === "critical" ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      a.level === "critical" ? "bg-red-500" : a.level === "warning" ? "bg-yellow-400" : "bg-blue-400"
                    }`}
                  />
                  <div>
                    <p className="text-[9px] leading-tight" style={{ color: "var(--text-secondary)" }}>{a.msg}</p>
                    <p className="text-[8px] mt-0.5" style={{ color: "var(--text-faint)" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-3 dash-card"
          >
            <p className="text-[9px] uppercase tracking-wider mb-2.5 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <CheckCircle className="w-2.5 h-2.5" style={{ color: "var(--accent)" }} /> PQC Status
            </p>
            <div className="space-y-2.5">
              {encryptionModules.map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px]" style={{ color: "var(--text-secondary)" }}>{m.name}</span>
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
                      style={
                        m.status === "Active"
                          ? { background: "var(--accent-bg)", color: "var(--accent)" }
                          : { background: "var(--bg-card)", color: "var(--text-faint)" }
                      }
                    >
                      {m.status}
                    </span>
                  </div>
                  <Bar pct={m.pct} active={m.status === "Active"} delay={0.6 + i * 0.12} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Live log */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-3 dash-card"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] uppercase tracking-wider flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              Activity Log
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </p>
            <span className="text-[8px] font-mono" style={{ color: "var(--text-faint)" }}>{count} events</span>
          </div>
          <div className="overflow-hidden">
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.div
                  key={`${l.time}-${l.event}`}
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 py-1.5 border-b last:border-0"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  {l.status === "blocked"
                    ? <XCircle className="w-2.5 h-2.5 text-red-400 flex-shrink-0" />
                    : <CheckCircle className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  }
                  <span className="font-mono text-[8px] w-12 flex-shrink-0" style={{ color: "var(--text-faint)" }}>{l.time}</span>
                  <span className="text-[9px] flex-1 truncate" style={{ color: "var(--text-secondary)" }}>{l.event}</span>
                  <span className="font-mono text-[8px] hidden sm:block flex-shrink-0" style={{ color: "var(--text-faint)" }}>{l.ip}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
