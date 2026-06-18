"use client";
import { motion } from "framer-motion";
import { Shield, Target, Settings, Users, TrendingUp, CheckCircle2, AlertTriangle, HeartHandshake } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { SAFE_SCHOOL } from "@/lib/programs-data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function SafeSchool() {
  return (
    <div className="bg-white">
      <AboutHero
        title="Safe School Initiative"
        subtitle="Creating secure, inclusive, and violence-free learning environments that protect students, teachers, and educational facilities across Nigeria."
        breadcrumb={[
          { label: "Programs", path: "/programs" },
          { label: "Safe School Initiative" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Text */}
            <motion.div {...fade()} className="lg:col-span-3">
              <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About the Program</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{SAFE_SCHOOL.description}</p>
            </motion.div>

            {/* Stats Panel */}
            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <div className="bg-[#082c2c] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#24c2c2]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <span className="font-bold text-lg">Program Highlights</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Aligned with the Safe Schools Declaration",
                    "Covering all 36 states + FCT",
                    "5 core intervention areas",
                    "Supports WAEC/NECO outcomes",
                    "Community-centred approach",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#24c2c2] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Program Objectives</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SAFE_SCHOOL.objectives.map((obj, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                  <span className="w-8 h-8 rounded-lg bg-[#24c2c2] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{obj}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Key Components</h2>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SAFE_SCHOOL.keyComponents.map((comp, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="border border-gray-100 rounded-2xl p-6 h-full bg-white hover:border-[#24c2c2]/30 transition-colors">
                  <div className="w-8 h-1 bg-[#24c2c2] rounded-full mb-4" />
                  <h3 className="font-bold text-gray-900 mb-4">{comp.title}</h3>
                  <ul className="space-y-3">
                    {comp.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships + Outcomes */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Partnerships */}
            <motion.div {...fade()}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Partnerships</h2>
              </div>
              <div className="space-y-3">
                {SAFE_SCHOOL.partnerships.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                    <span className="w-2 h-2 rounded-full bg-[#24c2c2] shrink-0" />
                    <span className="text-gray-700 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Outcomes */}
            <motion.div {...fade(0.1)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Expected Outcomes</h2>
              </div>
              <div className="space-y-3">
                {SAFE_SCHOOL.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                    <CheckCircle2 className="w-4 h-4 text-[#24c2c2] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{o}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
