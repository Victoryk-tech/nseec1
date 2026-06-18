"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, Wrench, BarChart3, Users, GraduationCap, Bot, Megaphone, ArrowRight, CheckCircle2,
} from "lucide-react";
import AboutHero from "@/components/about/AboutHero";

const PROGRAMS = [
  {
    id: "safe-school",
    path: "/programs/safe-school",
    icon: Shield,
    title: "Safe School Initiative",
    description:
      "Creating secure, inclusive, and violence-free learning environments that protect students, teachers, and educational facilities across Nigeria.",
    highlights: ["Security infrastructure", "Emergency preparedness", "Mental health support"],
  },
  {
    id: "tvet",
    path: "/programs/tvet",
    icon: Wrench,
    title: "TVET",
    description:
      "Technical and Vocational Education Training exhibitions that connect students with industry, showcase innovation, and promote skills-based career pathways.",
    highlights: ["Student project displays", "Industry engagement", "Innovation challenges"],
  },
  {
    id: "monitoring-learning",
    path: "/programs/monitoring-learning",
    icon: BarChart3,
    title: "Monitoring Learning Achievement",
    description:
      "A results-driven Monitoring, Learning, and Accountability framework that ensures transparent, evidence-based tracking of all NSSEC programs and outcomes.",
    highlights: ["Real-time data tracking", "Stakeholder accountability", "Adaptive learning"],
  },
  {
    id: "school-management",
    path: "/programs/school-management",
    icon: Users,
    title: "School Management Committee",
    description:
      "Empowering communities, parents, and stakeholders through School Based Management Committees that strengthen school governance and resource mobilization.",
    highlights: ["Community governance", "Budget oversight", "Parent engagement"],
  },
  {
    id: "reskilling-teachers",
    path: "/programs/reskilling-teachers",
    icon: GraduationCap,
    title: "Reskilling Teachers",
    description:
      "Structured professional development programs ensuring every teacher is equipped with modern pedagogy, current subject knowledge, and digital instructional tools.",
    highlights: ["Core subject mastery", "Digital pedagogy", "CPD certification"],
  },
  {
    id: "robotics-ai",
    path: "/programs/robotics-ai",
    icon: Bot,
    title: "Robotics & AI",
    description:
      "Pioneering robotics and artificial intelligence initiatives, including a 6,000-teacher AI training program in partnership with Google, to future-proof Nigerian education.",
    highlights: ["AI teacher training", "Robotics clubs", "National AI challenge"],
  },
  {
    id: "advocacy-sensitization",
    path: "/programs/advocacy-sensitization",
    icon: Megaphone,
    title: "Advocacy & Sensitization",
    description:
      "Strategic advocacy visits to state governments, traditional rulers, and education stakeholders to align policies and mobilize support for NSSEC's mandate.",
    highlights: ["Stakeholder engagement", "SSSEB establishment", "Policy alignment"],
  },
];

const stats = [
  { label: "Active Programs", value: "7" },
  { label: "States Reached", value: "36+" },
  { label: "Teachers Trained", value: "6,000+" },
  { label: "Schools Impacted", value: "10,000+" },
];

export default function ProgramsOverview() {
  return (
    <div className="bg-white">
      <AboutHero
        title="NSSEC Programs"
        subtitle="Comprehensive initiatives designed to transform senior secondary education — from classroom safety and teacher development to digital innovation and community governance."
        breadcrumb={[{ label: "Programs" }]}
      />

      {/* Stats Bar */}
      <div className="bg-[#082c2c] text-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="py-8 px-6 text-center"
              >
                <p className="text-3xl font-extrabold text-[#24c2c2]">{stat.value}</p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ scaleX: 0, originX: 0.5 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-[3px] w-14 bg-[#24c2c2] rounded-full mx-auto mb-5"
            />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Our Programs & Initiatives
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Each program addresses a specific dimension of senior secondary education reform — explore to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {PROGRAMS.map((program, i) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <Link href={program.path} className="group block h-full">
                    <div className="h-full border border-gray-100 rounded-2xl p-8 bg-white hover:border-[#24c2c2]/40 hover:bg-[#24c2c2]/[0.02] transition-all duration-300">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-[#24c2c2]/10 flex items-center justify-center mb-6 group-hover:bg-[#24c2c2]/20 transition-colors">
                        <Icon className="w-7 h-7 text-[#24c2c2]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#24c2c2] transition-colors">
                        {program.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {program.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6">
                        {program.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#24c2c2] shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#24c2c2]">
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            Partner with NSSEC
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            We collaborate with governments, development partners, private sector organisations, and civil society to scale our programs across Nigeria.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#24c2c2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1da8a8] transition-colors"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
