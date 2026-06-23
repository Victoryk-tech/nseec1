"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ClipboardList, FileText, Shield, CheckCircle } from "lucide-react";

const STATS = [
  { icon: ClipboardList, label: "9 Sections",        desc: "Comprehensive coverage" },
  { icon: FileText,      label: "PDF Option",         desc: "Offline completion available" },
  { icon: Shield,        label: "Secure Submission",  desc: "Handled by NSSEC DEQA" },
  { icon: CheckCircle,   label: "Official 2025",      desc: "Latest M&E instrument" },
];

const BREADCRUMB = [
  { label: "Departments",       path: "/departments" },
  { label: "Quality Assurance", path: "/departments/quality-assurance" },
  { label: "M&E Form" },
];

export default function EvaluationHero() {
  return (
    <section
      aria-label="M&E Hero"
      className="relative overflow-hidden bg-gradient-to-r from-[#082c2c] via-[#0e4a4a] to-[#1a8080] py-20 sm:py-28"
    >
      {/* Diagonal stripe texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(-55deg,#fff 0px,#fff 1px,transparent 1px,transparent 14px)" }}
      />

      {/* Right glow */}
      <div aria-hidden="true" className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#24c2c2]/15 to-transparent pointer-events-none" />

      {/* Circle accents */}
      <div aria-hidden="true" className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full border border-[#24c2c2]/10 pointer-events-none" />
      <div aria-hidden="true" className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full border border-[#24c2c2]/8 pointer-events-none" />

      {/* Bottom fade */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24c2c2]/35 to-transparent" />

      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-white/50 text-xs mb-8"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            {BREADCRUMB.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 shrink-0" />
                {i === BREADCRUMB.length - 1 ? (
                  <span className="text-white/75 font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.path} className="hover:text-white/80 transition-colors">{crumb.label}</Link>
                )}
              </span>
            ))}
          </motion.nav>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="flex flex-wrap items-center gap-2 mb-5"
          >
            <span className="px-3 py-1 bg-[#24c2c2] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Educational Quality Assurance
            </span>
            <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
              Official Instrument
            </span>
          </motion.div>

          {/* Accent bar */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="h-[3px] w-14 bg-[#24c2c2] rounded-full mb-6"
          />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-5 tracking-tight"
          >
            Monitoring &amp; Evaluation
            <br />
            <span className="text-[#24c2c2]">of Schools</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.2 }}
            className="text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl mb-10"
          >
            Submit your school&apos;s monitoring and evaluation data to the NSSEC Directorate of Education Quality Assurance.
            Fill the form online or download, complete offline, and upload as PDF.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-x-8 gap-y-4"
          >
            {STATS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#24c2c2]" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">{label}</p>
                  <p className="text-white/40 text-[10px]">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
