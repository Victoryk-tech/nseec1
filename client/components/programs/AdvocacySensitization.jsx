"use client";
import { motion } from "framer-motion";
import { Megaphone, Target, Users, Mic, TrendingUp, Camera, CheckCircle2, MapPin } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { ADVOCACY_SENSITIZATION } from "@/lib/programs-data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function AdvocacySensitization() {
  return (
    <div className="bg-white">
      <AboutHero
        title="Advocacy & Sensitization Visits"
        subtitle="Mobilizing state governments, traditional rulers, development partners, and education stakeholders to champion the NSSEC mandate for a transformed senior secondary education system."
        breadcrumb={[
          { label: "Programs", path: "/programs" },
          { label: "Advocacy & Sensitization" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div {...fade()} className="lg:col-span-3">
              <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About the Program</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{ADVOCACY_SENSITIZATION.description}</p>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <div className="bg-[#082c2c] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#24c2c2]/20 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <span className="font-bold text-lg">Program Highlights</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Visits to all 36 states + FCT",
                    "Engagement with state governors",
                    "SSSEB establishment advocacy",
                    "Media awareness campaigns",
                    "Alignment with federal education policy",
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
              <h2 className="text-2xl font-bold text-gray-900">Purpose of the Visits</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {ADVOCACY_SENSITIZATION.purpose.map((p, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                  <span className="w-8 h-8 rounded-lg bg-[#24c2c2] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed">{p}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders + Core Messages */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div {...fade()}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Key Stakeholders Engaged</h2>
              </div>
              <div className="space-y-3">
                {ADVOCACY_SENSITIZATION.stakeholders.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl px-5 py-4 bg-gray-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] shrink-0" />
                    <span className="text-gray-700 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Core Messages Delivered</h2>
              </div>
              <div className="space-y-3">
                {ADVOCACY_SENSITIZATION.coreMessages.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl px-5 py-4 bg-gray-50">
                    <span className="w-7 h-7 rounded-full bg-[#24c2c2] text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-gray-700 text-sm">{m}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Outcomes of Advocacy Visits</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {ADVOCACY_SENSITIZATION.outcomes.map((o, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-4 h-4 text-[#24c2c2]" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{o}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Visits */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Camera className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Visit Highlights</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVOCACY_SENSITIZATION.recentVisits.map((visit, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="border-l-4 border-[#24c2c2] bg-gray-50 rounded-r-xl px-5 py-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#24c2c2] mt-0.5 shrink-0" />
                    <p className="text-gray-700 text-sm leading-relaxed">{visit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
