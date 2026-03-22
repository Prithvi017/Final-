"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

const cols = {
  Product: ["Features", "Dashboard", "Pricing", "Changelog", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Partners"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance", "Cookie Policy"],
};

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Github, label: "GitHub" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <footer className="pt-16 pb-8 border-t" ref={ref}
      style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }} className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/logo.png" alt="QUTRIUM" className="h-10 w-auto" />
              <span className="font-bold text-[18px] tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>QUTRIUM</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[260px] mb-6" style={{ color: "var(--text-muted)" }}>
              Post-quantum security infrastructure for the enterprises of tomorrow. NIST PQC compliant.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@company.com"
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none min-w-0 border"
                style={{ backgroundColor: "var(--bg-input)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-lg text-white text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: "var(--accent)" }}>
                Subscribe
              </motion.button>
            </div>
            <p className="text-[11px] mt-2" style={{ color: "var(--text-faint)" }}>Security advisories & product updates.</p>
          </motion.div>

          {/* Link cols */}
          {Object.entries(cols).map(([section, items], si) => (
            <motion.div key={section} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 + si * 0.08 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: "var(--text-primary)" }}>{section}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a href="#" whileHover={{ x: 3 }} transition={{ duration: 0.12 }}
                      className="text-sm inline-block" style={{ color: "var(--text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>© 2025 QUTRIUM Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <motion.a key={label} href="#" whileHover={{ scale: 1.15, y: -2 }} title={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent-border)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--accent-bg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--bg-card)";
                  }}>
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>All systems operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
