"use client";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Target, TrendingUp, Users, CheckCircle2, Layers } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { RESKILLING_TEACHERS } from "@/lib/programs-data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ReskillingTeachers() {
  return (
    <div className="bg-white">
      <AboutHero
        title="Reskilling Teachers in Core Subjects"
        subtitle="Building 21st-century teacher capacity through structured professional development, digital pedagogy, and continuous subject-matter expertise renewal."
        breadcrumb={[
          { label: "Programs", path: "/programs" },
          { label: "Reskilling Teachers" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div {...fade()} className="lg:col-span-3">
              <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About the Program</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{RESKILLING_TEACHERS.description}</p>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <div className="bg-[#082c2c] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#24c2c2]/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <span className="font-bold text-lg">Program Highlights</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "4 core subject areas",
                    "5 training modalities",
                    "Residential, online & school-based delivery",
                    "NTI certification pathway",
                    "National master teacher network",
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

      {/* Core Subjects */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Core Subject Areas</h2>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {RESKILLING_TEACHERS.coreSubjects.map((subj, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-[#24c2c2]/30 transition-colors">
                  <div className="bg-[#24c2c2]/10 px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-[#0e4a4a]">{subj.subject}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2.5">
                      {subj.areas.map((area, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Modalities */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Training Modalities</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {RESKILLING_TEACHERS.trainingModalities.map((mod, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="border border-gray-100 rounded-2xl p-5 bg-white h-full text-center hover:border-[#24c2c2]/30 transition-colors">
                  <span className="w-10 h-10 rounded-full bg-[#24c2c2] text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">{i + 1}</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{mod}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Partners */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div {...fade()}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Expected Outcomes</h2>
              </div>
              <div className="space-y-3">
                {RESKILLING_TEACHERS.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                    <CheckCircle2 className="w-4 h-4 text-[#24c2c2] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{o}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Strategic Partners</h2>
              </div>
              <div className="space-y-3">
                {RESKILLING_TEACHERS.partners.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                    <span className="text-gray-700 text-sm">{p}</span>
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
