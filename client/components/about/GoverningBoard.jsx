"use client";
import { motion } from "framer-motion";
import {
  Users2, BookOpen, Shield, BarChart3, Scale, Globe,
} from "lucide-react";
import AboutHero from "./AboutHero";

const BOARD_FUNCTIONS = [
  {
    icon: Shield,
    title: "Policy Oversight",
    description:
      "The Board provides strategic oversight on all policies formulated by the Commission for senior secondary education in Nigeria.",
  },
  {
    icon: BarChart3,
    title: "Performance Review",
    description:
      "Regular review of the Commission's performance against its strategic objectives and mandate delivery.",
  },
  {
    icon: BookOpen,
    title: "Programme Approval",
    description:
      "Approval of major programmes, interventions, and publications, including progress reports to the President.",
  },
  {
    icon: Scale,
    title: "Accountability & Governance",
    description:
      "Ensuring the Commission operates within its legal mandate and in compliance with applicable financial and administrative regulations.",
  },
  {
    icon: Globe,
    title: "Stakeholder Relations",
    description:
      "Facilitating high-level engagement with Federal and State Governments, development partners, and education sector stakeholders.",
  },
  {
    icon: Users2,
    title: "Leadership Guidance",
    description:
      "Providing direction to the Executive Secretary in the effective delivery of the Commission's mandate and strategic goals.",
  },
];

const FunctionCard = ({ icon: Icon, title, description, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.42, delay: index * 0.08 }}
    whileHover={{ y: -4, boxShadow: "0 14px 34px rgba(0,0,0,0.08)" }}
    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4 transition-shadow duration-300"
  >
    <div className="bg-[#24c2c2]/10 w-11 h-11 rounded-xl flex items-center justify-center">
      <Icon className="h-5 w-5 text-[#24c2c2]" />
    </div>
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  </motion.article>
);

const GoverningBoard = () => (
  <main>
    <AboutHero
      title="Governing Board Members"
      subtitle="The Board provides strategic oversight and policy direction for the Commission's mandate and operations."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Governing Board Members" },
      ]}
    />

    {/* Board overview */}
    <section aria-labelledby="board-overview" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
              The Governing Board
            </span>
            <h2
              id="board-overview"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight"
            >
              Leadership & Governance Structure
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              The National Senior Secondary Education Commission is governed by a Board established under the{" "}
              <strong>NSSEC Act 2023</strong>. The Board is responsible for the overall policy direction, strategic oversight, and accountability of the Commission.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Board members are appointed to represent the diverse interests of Nigeria&apos;s six geopolitical zones and relevant sectors, ensuring that the Commission&apos;s activities reflect national priorities in senior secondary education development.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Board functions */}
    <section aria-labelledby="board-functions" className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Responsibilities
          </span>
          <h2 id="board-functions" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Board Functions
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            The Governing Board of NSSEC performs the following key functions in line with the Commission&apos;s enabling Act.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOARD_FUNCTIONS.map((f, i) => (
            <FunctionCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Notice panel */}
    <section className="py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-[#24c2c2]/5 border border-[#24c2c2]/20 rounded-3xl p-8"
        >
          <div className="mx-auto mb-4 w-12 h-12 bg-[#24c2c2]/15 rounded-2xl flex items-center justify-center">
            <Users2 className="h-6 w-6 text-[#24c2c2]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Board Enquiries</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            For enquiries relating to the Governing Board, please contact the Office of the Executive Secretary at{" "}
            <a
              href="mailto:es@nssec.gov.ng"
              className="text-[#24c2c2] hover:underline font-medium"
            >
              es@nssec.gov.ng
            </a>{" "}
            or the General Administration inbox at{" "}
            <a
              href="mailto:admin@nssec.gov.ng"
              className="text-[#24c2c2] hover:underline font-medium"
            >
              admin@nssec.gov.ng
            </a>.
          </p>
        </motion.div>
      </div>
    </section>
  </main>
);

export default GoverningBoard;
