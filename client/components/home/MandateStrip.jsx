"use client";
import { motion } from "framer-motion";
import { Shield, TrendingUp, BookOpen } from "lucide-react";

const MANDATES = [
  {
    icon: Shield,
    label: "01",
    title: "Standards & Regulation",
    text: "Prescribe minimum standards and regulate Senior Secondary Education across all 36 states and the FCT.",
  },
  {
    icon: TrendingUp,
    label: "02",
    title: "Fund Management",
    text: "Administer the National Senior Secondary Education Fund for strategic infrastructure and capacity investments.",
  },
  {
    icon: BookOpen,
    label: "03",
    title: "Federal Advisory",
    text: "Advise the Federal Government on policy, governance, and the management of Senior Secondary Education.",
  },
];

export default function MandateStrip() {
  return (
    <section className="bg-[#082c2c] py-16 sm:py-20">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-2">Our Mandate</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Core Responsibilities</h2>
          </div>
          <p className="text-white/50 text-sm max-w-sm text-right hidden sm:block">
            The statutory obligations that guide every decision NSSEC makes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/10">
          {MANDATES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-[#082c2c] px-8 py-10 hover:bg-[#0e4a4a]/60 transition-colors duration-300 group relative"
              >
                <span className="absolute top-6 right-6 text-5xl font-black text-white/5 select-none">
                  {m.label}
                </span>
                <div className="w-12 h-12 bg-[#24c2c2]/15 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#24c2c2]/25 transition-colors">
                  <Icon className="w-6 h-6 text-[#24c2c2]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{m.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{m.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
