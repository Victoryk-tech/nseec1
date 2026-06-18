"use client";
import { motion } from "framer-motion";
import { Wrench, Target, Settings, Users, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { TVET } from "@/lib/programs-data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function TVETPage() {
  return (
    <div className="bg-white">
      <AboutHero
        title="Technical & Vocational Education Training"
        subtitle="Connecting education to industry — empowering the next generation of Nigerian students with practical, marketable skills through nationwide TVET Exhibitions."
        breadcrumb={[
          { label: "Programs", path: "/programs" },
          { label: "TVET" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div {...fade()} className="lg:col-span-3">
              <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About the Program</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{TVET.description}</p>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <div className="bg-[#082c2c] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#24c2c2]/20 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <span className="font-bold text-lg">Program Highlights</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "State and zonal exhibitions nationwide",
                    "Industry engagement and job linkages",
                    "Innovation challenge competitions",
                    "Collaboration with NBTE and polytechnics",
                    "Showcasing 10+ technical disciplines",
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

      {/* Purpose */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Purpose of TVET Exhibitions</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {TVET.purpose.map((item, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                  <span className="w-8 h-8 rounded-lg bg-[#24c2c2] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {TVET.keyFeatures.map((feature, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="border border-gray-100 rounded-2xl p-6 bg-white hover:border-[#24c2c2]/30 transition-colors">
                  <div className="w-8 h-1 bg-[#24c2c2] rounded-full mb-4" />
                  <h3 className="font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <ul className="space-y-3">
                    {feature.details.map((d, j) => (
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

      {/* Participants / Outcomes / NSSEC Role */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: "Participants", Icon: Users, items: TVET.participants },
              { title: "Expected Outcomes", Icon: TrendingUp, items: TVET.outcomes },
              { title: "NSSEC Role", Icon: Award, items: TVET.nssecRole },
            ].map(({ title, Icon, items }, gi) => (
              <motion.div key={title} {...fade(gi * 0.1)}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                </div>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
