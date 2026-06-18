"use client";
import { motion } from "framer-motion";
import { Users, Settings, TrendingUp, CheckCircle2, Award, Building2 } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { SCHOOL_MANAGEMENT } from "@/lib/programs-data";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function SchoolManagement() {
  return (
    <div className="bg-white">
      <AboutHero
        title="School Based Management Committee"
        subtitle="Strengthening school governance by empowering communities, parents, and local stakeholders to take ownership and drive improvement in their schools."
        breadcrumb={[
          { label: "Programs", path: "/programs" },
          { label: "School Management Committee" },
        ]}
      />

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div {...fade()} className="lg:col-span-3">
              <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About the Program</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{SCHOOL_MANAGEMENT.description}</p>
            </motion.div>
            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <div className="bg-[#082c2c] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#24c2c2]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <span className="font-bold text-lg">SBMC at a Glance</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Community-led school governance",
                    "Decentralized administration model",
                    "8–12 committee members per school",
                    "Covers all 36 states + FCT",
                    "Aligned with national education policy",
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

      {/* Functions */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">SBMC Functions</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SCHOOL_MANAGEMENT.functions.map((fn, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                  <span className="w-8 h-8 rounded-lg bg-[#24c2c2] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed">{fn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Committee Structure</h2>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {SCHOOL_MANAGEMENT.structure.map((member, i) => (
              <motion.div key={i} {...fade(i * 0.08)}>
                <div className="border border-gray-100 rounded-2xl p-6 bg-white hover:border-[#24c2c2]/30 transition-colors">
                  <div className="w-8 h-1 bg-[#24c2c2] rounded-full mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{member.role}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + NSSEC Role */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div {...fade()}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
              </div>
              <div className="space-y-3">
                {SCHOOL_MANAGEMENT.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                    <CheckCircle2 className="w-4 h-4 text-[#24c2c2] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#24c2c2]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">NSSEC's Role</h2>
              </div>
              <div className="space-y-3">
                {SCHOOL_MANAGEMENT.nssecRole.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] mt-2 shrink-0" />
                    <span className="text-gray-700 text-sm">{r}</span>
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
