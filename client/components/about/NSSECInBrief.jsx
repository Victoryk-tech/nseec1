"use client";
import { motion } from "framer-motion";
import {
  CheckCircle2, BookOpen, BarChart3, Users2,
  Monitor, Lightbulb, Globe2, Database,
  Target, GraduationCap, Shield,
} from "lucide-react";
import AboutHero from "./AboutHero";

const MANDATES = [
  "Prescribe and maintain minimum standards for Senior Secondary Education in Nigeria.",
  "Coordinate the development of Senior Secondary Education across the Federation.",
  "Monitor and evaluate the implementation of policies and programmes relating to Senior Secondary Education.",
  "Ensure quality assurance in teaching, learning, infrastructure, and school management.",
  "Facilitate capacity building and professional development of teachers and educational administrators.",
  "Promote the integration of Information and Communication Technology (ICT) into teaching and learning processes.",
  "Support entrepreneurial, vocational, technical, and skills acquisition programmes in Senior Secondary Schools.",
  "Strengthen educational planning through effective data collection, management, and utilization.",
  "Collaborate with relevant stakeholders, development partners, and educational institutions to improve learning outcomes.",
  "Advise the Federal Government on matters relating to Senior Secondary Education.",
];

const CORE_FUNCTIONS = [
  { icon: Shield, text: "Development and enforcement of standards for Senior Secondary Education." },
  { icon: BarChart3, text: "Monitoring and evaluation of educational programmes and projects." },
  { icon: GraduationCap, text: "Teacher development and capacity enhancement." },
  { icon: BookOpen, text: "Educational research, planning, and policy formulation." },
  { icon: Lightbulb, text: "Promotion of science, technology, technical and vocational education." },
  { icon: Database, text: "Management of educational data through EMIS and related information systems." },
  { icon: Users2, text: "Facilitation of access to quality education for all learners." },
  { icon: Target, text: "Coordination of interventions aimed at improving learning outcomes and school effectiveness." },
];

const STRATEGIC_PRIORITIES = [
  { icon: Monitor, label: "EMIS & TMIS", desc: "Strengthening Educational and Teacher Management Information Systems." },
  { icon: Shield, label: "Quality Assurance", desc: "Improving quality assurance mechanisms in Senior Secondary Schools." },
  { icon: Lightbulb, label: "Vocational Education", desc: "Enhancing entrepreneurial and vocational education for self-reliance." },
  { icon: Globe2, label: "Digital Learning", desc: "Promoting digital learning and innovation across schools." },
  { icon: Users2, label: "Access & Equity", desc: "Expanding access, equity, and inclusion in education nationwide." },
  { icon: GraduationCap, label: "SDGs & Edu 2030", desc: "Supporting implementation of Education 2030 Agenda and SDGs." },
  { icon: BarChart3, label: "Partnerships", desc: "Building strong partnerships with government agencies, development partners, and the private sector." },
];

const Tag = ({ children }) => (
  <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
    {children}
  </span>
);

const NSSECInBrief = () => (
  <main>
    <AboutHero
      title="NSSEC In Brief"
      subtitle="The apex regulatory and coordinating body for Senior Secondary Education in Nigeria, committed to quality, access, and excellence."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "NSSEC In Brief" },
      ]}
    />

    {/* Background */}
    <section aria-labelledby="bg-heading" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Tag>Background</Tag>
            <h2 id="bg-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              About the Commission
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              The National Senior Secondary Education Commission (NSSEC) is a Federal Government agency established by the{" "}
              <strong className="text-gray-800">National Senior Secondary Education Commission (Establishment) Act, 2021</strong>. The Commission was created to regulate, coordinate, and enhance the quality of Senior Secondary Education in Nigeria.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              NSSEC ensures the effective delivery of education at the post-basic level in line with national development goals and global best practices. The Commission serves as the apex regulatory body bridging the gap that had left senior secondary education without oversight.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              The NSSEC Act 2023, signed into law on{" "}
              <strong className="text-gray-800">11th May 2023</strong>, further strengthened the Commission's mandate to regulate and intervene comprehensively in senior secondary education across all 36 States and the FCT.
            </p>
          </motion.div>

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { value: "2021", label: "Year Established", sub: "NSSEC Act 2021" },
              { value: "2023", label: "Act Signed", sub: "11th May 2023" },
              { value: "36", label: "States + FCT", sub: "Full national coverage" },
              { value: "12", label: "Coordinating Centres", sub: "Nationwide" },
            ].map(({ value, label, sub }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, boxShadow: "0 14px 32px rgba(0,0,0,0.08)" }}
                className="bg-gradient-to-br from-[#24c2c2]/5 to-[#24c2c2]/10 border border-[#24c2c2]/20 rounded-2xl p-6 transition-shadow duration-300"
              >
                <p className="text-4xl font-extrabold text-[#24c2c2] mb-1">{value}</p>
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section aria-labelledby="vm-heading" className="py-16 sm:py-20 bg-gray-950">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-[#24c2c2]/10 border border-[#24c2c2]/25 rounded-3xl p-8 overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#24c2c2]/10 pointer-events-none" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#24c2c2] mb-4">Vision</p>
            <p className="text-xl sm:text-2xl font-bold text-white leading-snug" id="vm-heading">
              &ldquo;To be a regulatory and intervention agency geared towards repositioning Senior Secondary Education in Nigeria for global competitiveness.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Mission</p>
            <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
              &ldquo;To Produce Senior Secondary graduates with life skills and relevant academic qualifications for further studies.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mandate */}
    <section aria-labelledby="mandate-heading" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <Tag>Legal Framework</Tag>
          <h2 id="mandate-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mandate of the Commission
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm sm:text-base">
            Under the <strong>NSSEC Act</strong>, the Commission is charged with the following statutory mandates:
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {MANDATES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-16px" }}
              transition={{ duration: 0.38, delay: Math.min(i * 0.04, 0.4) }}
              className="bg-gray-50 rounded-2xl p-5 flex items-start gap-4 border border-gray-100"
            >
              <div className="shrink-0 w-7 h-7 rounded-lg bg-[#24c2c2]/15 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-[#24c2c2]" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{m}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Functions */}
    <section aria-labelledby="functions-heading" className="py-16 sm:py-20 bg-gray-50/60">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <Tag>Operations</Tag>
          <h2 id="functions-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Core Functions
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm sm:text-base">
            The key operational responsibilities that define the Commission's day-to-day work.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_FUNCTIONS.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
              whileHover={{ y: -5, boxShadow: "0 16px 36px rgba(0,0,0,0.08)" }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4 transition-shadow duration-300"
            >
              <div className="bg-[#24c2c2]/10 w-11 h-11 rounded-xl flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#24c2c2]" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Strategic Priorities */}
    <section aria-labelledby="priorities-heading" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <Tag>Focus Areas</Tag>
          <h2 id="priorities-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Strategic Priorities
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {STRATEGIC_PRIORITIES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.42, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group relative bg-gradient-to-br from-[#24c2c2]/5 to-[#24c2c2]/10 border border-[#24c2c2]/15 rounded-2xl p-6 transition-all duration-300 hover:border-[#24c2c2]/30"
            >
              <div className="bg-[#24c2c2]/15 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-[#24c2c2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">{label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Conclusion */}
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#082c2c] via-[#0e4a4a] to-[#1a8080]">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="h-[3px] w-10 bg-[#24c2c2] rounded mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Our Commitment</h2>
          <p className="text-white/70 text-base leading-relaxed">
            The National Senior Secondary Education Commission serves as the apex regulatory and coordinating body for Senior Secondary Education in Nigeria. Through strategic policy implementation, quality assurance, capacity development, and stakeholder collaboration, the Commission is committed to transforming Senior Secondary Education into a catalyst for national growth, innovation, and sustainable development.
          </p>
        </motion.div>
      </div>
    </section>
  </main>
);

export default NSSECInBrief;
