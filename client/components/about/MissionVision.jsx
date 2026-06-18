"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye, Target, Trophy, ShieldCheck, Lightbulb, HeartHandshake, Network, Briefcase,
} from "lucide-react";
import AboutHero from "./AboutHero";

const CORE_VALUES = [
  {
    icon: Trophy,
    title: "Excellence",
    description:
      "Pursuing the highest standards in everything we do — from policy formulation to programme delivery.",
    color: "#f59e0b",
    bg: "from-amber-50 to-amber-50/20",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Operating with transparency, honesty, and accountability in the stewardship of public trust.",
    color: "#24c2c2",
    bg: "from-[#24c2c2]/8 to-[#24c2c2]/4",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Embracing creative approaches and modern solutions to improve senior secondary education outcomes.",
    color: "#8b5cf6",
    bg: "from-violet-50 to-violet-50/20",
  },
  {
    icon: HeartHandshake,
    title: "Inclusivity",
    description:
      "Ensuring equitable access to quality education for every Nigerian student, regardless of location or background.",
    color: "#ec4899",
    bg: "from-pink-50 to-pink-50/20",
  },
  {
    icon: Network,
    title: "Collaboration",
    description:
      "Fostering partnerships with states, development partners, and stakeholders to amplify our impact.",
    color: "#0891b2",
    bg: "from-cyan-50 to-cyan-50/20",
  },
  {
    icon: Briefcase,
    title: "Professionalism",
    description:
      "Maintaining the highest conduct and expertise in all Commission operations and representations.",
    color: "#0d9488",
    bg: "from-teal-50 to-teal-50/20",
  },
];

const ValueCard = ({ icon: Icon, title, description, color, bg, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.44, delay: index * 0.08 }}
    whileHover={{ y: -6, boxShadow: "0 20px 44px rgba(0,0,0,0.09)" }}
    className={`bg-gradient-to-br ${bg} rounded-2xl p-6 border border-gray-100/80 shadow-sm flex flex-col gap-4 transition-all duration-300 group`}
  >
    {/* Icon */}
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
      style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
    >
      <Icon className="h-5 w-5" style={{ color }} strokeWidth={1.8} />
    </div>

    {/* Accent bar */}
    <div className="h-[2px] w-8 rounded-full" style={{ background: `${color}60` }} />

    <div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  </motion.article>
);

const MissionVision = () => (
  <main>
    <AboutHero
      title="Mission, Vision & Core Values"
      subtitle="The guiding principles and aspirations that drive every initiative at the National Senior Secondary Education Commission."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Mission, Vision & Core Values" },
      ]}
    />

    {/* Mission + Vision */}
    <section aria-labelledby="mv-heading" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80 aspect-[4/3]"
          >
            <Image
              src="/about/mission-vision.jpg"
              alt="NSSEC Mission and Vision — empowering Nigeria's senior secondary education for global competitiveness"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#168888]/30 to-transparent" />
          </motion.div>

          {/* Mission & Vision cards */}
          <div id="mv-heading" className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#24c2c2]/5 border border-[#24c2c2]/20 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#24c2c2]/15 p-2.5 rounded-xl">
                  <Target className="h-5 w-5 text-[#24c2c2]" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#24c2c2]">
                  Our Mission
                </span>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed">
                &ldquo;To Produce Senior Secondary graduates with life skills and relevant academic qualifications for further studies.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/10 p-2.5 rounded-xl">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-white/70">
                  Our Vision
                </span>
              </div>
              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                &ldquo;To be a regulatory and intervention agency geared towards repositioning Senior Secondary Education in Nigeria for global competitiveness.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section aria-labelledby="values-heading" className="py-16 sm:py-20 bg-gray-50/60">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Our Principles
          </span>
          <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Core Values
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            The values that guide every policy, programme, and partnership at the National Senior Secondary Education Commission.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_VALUES.map((v, i) => (
            <ValueCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default MissionVision;
