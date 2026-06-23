"use client";
import { motion } from "framer-motion";
import { BookOpen, Download, ChevronRight } from "lucide-react";

const MODES = [
  {
    key:       "web",
    icon:      BookOpen,
    badge:     "Recommended",
    badgeCls:  "bg-[#24c2c2]",
    title:     "Fill Online",
    subtitle:  "Complete in your browser",
    desc:      "Work through the 8-section form step-by-step. Progress is tracked as you go and submission is confirmed by email.",
    perks:     ["8-step guided form", "Section progress saved", "Email confirmation"],
    cta:       "Start Online Form",
    accent:    "#24c2c2",
    hoverBorder: "hover:border-[#24c2c2]/50",
    ring:      "focus-visible:ring-[#24c2c2]/30",
  },
  {
    key:       "pdf",
    icon:      Download,
    badge:     "Offline",
    badgeCls:  "bg-[#0e4f6b]",
    title:     "Download & Upload PDF",
    subtitle:  "Fill offline, upload when ready",
    desc:      "Download the official NSSEC M&E instrument, complete it at your own pace, then return here to upload the filled PDF.",
    perks:     ["Download DOCX form", "Fill at your own pace", "Upload when complete"],
    cta:       "Upload Completed PDF",
    accent:    "#0e4f6b",
    hoverBorder: "hover:border-[#0e4f6b]/40",
    ring:      "focus-visible:ring-[#0e4f6b]/20",
  },
];

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const card = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ModeSelector({ onSelect }) {
  return (
    <motion.div
      key="mode-selector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-10"
    >
      <div className="text-center mb-10">
        <p className="text-[10px] font-bold text-[#24c2c2] uppercase tracking-widest mb-2">Get Started</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0e4f6b] mb-3">How would you like to submit?</h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          Choose your preferred method. Both are official and accepted by NSSEC&nbsp;DEQA.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
      >
        {MODES.map(({ key, icon: Icon, badge, badgeCls, title, subtitle, desc, perks, cta, accent, hoverBorder, ring }) => (
          <motion.button
            key={key}
            variants={card}
            type="button"
            onClick={() => onSelect(key)}
            whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className={[
              "text-left p-6 bg-white border-2 border-gray-100 rounded-2xl",
              "transition-colors duration-200 group relative overflow-hidden outline-none",
              hoverBorder, ring,
            ].join(" ")}
          >
            {/* Badge */}
            <span className={`absolute top-4 right-4 px-2.5 py-0.5 ${badgeCls} text-white text-[9px] font-bold uppercase tracking-widest rounded-full`}>
              {badge}
            </span>

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border"
              style={{ background: accent + "18", borderColor: accent + "30" }}
            >
              <Icon className="w-6 h-6" style={{ color: accent }} />
            </div>

            <h3 className="font-extrabold text-[#0e4f6b] text-lg leading-tight mb-0.5">{title}</h3>
            <p className="text-[11px] text-gray-400 font-medium mb-3">{subtitle}</p>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">{desc}</p>

            <ul className="space-y-2 mb-6">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs text-gray-500">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: accent + "18" }}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5 3.5-4" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: accent }}>
              {cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
