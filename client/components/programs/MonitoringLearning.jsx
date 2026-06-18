"use client";
import { motion } from "framer-motion";
import { BarChart3, Target, Settings, TrendingUp, CheckCircle2, Eye, BookOpen, ShieldCheck } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { MONITORING_LEARNING } from "@/lib/programs-data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const PILLAR_ICONS = [Eye, BookOpen, ShieldCheck];
const PILLAR_COLORS = ["bg-[#24c2c2]", "bg-[#0e4a4a]", "bg-gray-700"];

export default function MonitoringLearning() {
  return (
    <div className="bg-white">
      <AboutHero
        title="Monitoring Learning Achievement"
        subtitle="A results-driven Monitoring, Learning, and Accountability (MLA) framework ensuring every NSSEC program is tracked, measured, and improved through evidence."
        breadcrumb={[
          { label: "Programs", path: "/programs" },
          { label: "Monitoring Learning Achievement" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div {...fade()} className="lg:col-span-3">
              <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About the Framework</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{MONITORING_LEARNING.description}</p>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <div className="bg-[#082c2c] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#24c2c2]/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <span className="font-bold text-lg">Three MLA Pillars</span>
                </div>
                <ul className="space-y-4">
                  {MONITORING_LEARNING.components.map((c) => (
                    <li key={c.title} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#24c2c2] mt-0.5 shrink-0" />
                      <span><strong className="text-white">{c.title}</strong> — {c.description?.split(":")[0]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MLA Pillars */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">The Three MLA Components</h2>
            </div>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {MONITORING_LEARNING.components.map((comp, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <motion.div key={i} {...fade(i * 0.1)}>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full">
                    <div className={`${PILLAR_COLORS[i]} p-6`}>
                      <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{comp.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{comp.description}</p>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {comp.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles + Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div {...fade()}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Core MLA Principles</h2>
              </div>
              <div className="space-y-3">
                {MONITORING_LEARNING.principles.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-5 py-4 bg-gray-50">
                    <span className="w-7 h-7 rounded-full bg-[#24c2c2] text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Tools & Mechanisms</h2>
              </div>
              <div className="space-y-3">
                {MONITORING_LEARNING.tools.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl px-5 py-4 bg-gray-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                    <span className="text-gray-700 text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Expected Benefits</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {MONITORING_LEARNING.benefits.map((benefit, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-4 h-4 text-[#24c2c2]" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
