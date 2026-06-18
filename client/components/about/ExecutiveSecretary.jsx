"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Building2, BookOpen } from "lucide-react";
import AboutHero from "./AboutHero";

const DIRECT_REPORTS = [
  { label: "Internal Audit Unit", email: "Internal_audit@nssec.gov.ng" },
  { label: "Procurement Unit", email: "procurement@nssec.gov.ng" },
  { label: "Legal Unit", email: "legal@nssec.gov.ng" },
  { label: "Physical Planning Department", email: "ppd@nssec.gov.ng" },
];

const RESPONSIBILITIES = [
  "Providing strategic direction for the implementation of NSSEC intervention programmes in States and the FCT.",
  "Sponsoring and facilitating national and international conferences relevant to the advancement of senior secondary education.",
  "Fostering and maintaining partnerships with educational institutions, development partners, research organisations, and other stakeholders.",
  "Promoting teacher professional development and capacity-building programmes through collaboration with relevant institutions.",
  "Facilitating the dissemination of information on educational policies, research findings, innovations, and best practices.",
  "Strengthening institutional frameworks for effective planning, monitoring, evaluation, and reporting on Commission activities.",
  "Providing overall administrative and financial oversight for the efficient functioning of the Commission.",
];

const ACHIEVEMENTS = [
  "Strategic leadership in NSSEC intervention projects across beneficiary States and the FCT.",
  "Strengthened collaboration with State Ministries of Education and development partners.",
  "Data-driven planning through improved education management information systems.",
  "Facilitation of teacher capacity-building initiatives improving instructional quality.",
  "Oversight of construction, rehabilitation, and equipping of educational infrastructure.",
  "Enhancement of transparency, accountability, and compliance in Commission operations.",
  "Coordination of policy dialogues, workshops, and advocacy programmes on access and quality.",
  "Support for innovative initiatives promoting STEAM, TVET, and digital skills acquisition.",
];

const ExecutiveSecretary = () => (
  <main>
    <AboutHero
      title="Office of the Executive Secretary"
      subtitle="Strategic leadership, policy direction, and coordination at the heart of the Commission's mandate."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Office of the Executive Secretary" },
      ]}
    />

    {/* Profile */}
    <section aria-labelledby="es-name" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left: Photo card */}
          <motion.aside
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/80 relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none">
              <Image
                src="/about/Iyela-Ajayi.png"
                alt="Dr. Iyela Ajayi — Executive Secretary, National Senior Secondary Education Commission"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 80vw, 35vw"
                priority
              />
              {/* Overlay card */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#082c2c]/90 via-[#082c2c]/60 to-transparent px-7 py-6">
                <h2 id="es-name" className="text-2xl font-extrabold text-white">
                  Dr. Iyela Ajayi
                </h2>
                <p className="text-[#24c2c2] font-semibold text-sm mt-1">
                  Executive Secretary, NSSEC
                </p>
                <a
                  href="mailto:es@nssec.gov.ng"
                  className="inline-flex items-center gap-2 mt-3 text-xs text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  es@nssec.gov.ng
                </a>
              </div>
            </div>

            {/* Direct reports */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: 0.22 }}
              className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-100"
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#24c2c2]" />
                Direct Reports to the ES
              </h3>
              <ul className="space-y-3">
                {DIRECT_REPORTS.map(({ label, email }) => (
                  <li key={email} className="flex items-start justify-between gap-3 flex-wrap">
                    <span className="text-xs text-gray-700 font-medium">{label}</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs text-[#24c2c2] hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-3 space-y-10"
          >
            {/* About the office */}
            <div>
              <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
                The Office
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-tight">
                Executive Secretary&apos;s Office (ESO)
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                The Executive Secretary&apos;s Office (ESO) is the administrative seat of the National Senior Secondary Education Commission. It provides strategic leadership, policy direction, coordination, and oversight for the effective implementation of the Commission&apos;s mandate in advancing quality senior secondary education in Nigeria.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                The Executive Secretary statutorily coordinates the implementation of the Commission&apos;s mandates as provided in the NSSEC Act, and is responsible for the planning, execution, monitoring, and evaluation of all programmes and interventions aimed at improving the quality and accessibility of senior secondary education across the country.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Responsibilities */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#24c2c2]" />
                Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {RESPONSIBILITIES.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-8px" }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#24c2c2] shrink-0 mt-0.5" />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Achievements strip */}
    <section aria-labelledby="achievements-heading" className="py-16 sm:py-20 bg-gray-50/60">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Impact
          </span>
          <h2 id="achievements-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Strategic Activities & Achievements
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm sm:text-base">
            The Office has driven transformational progress in the Commission&apos;s intervention mandate.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-16px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4) }}
              whileHover={{ y: -4, boxShadow: "0 14px 32px rgba(0,0,0,0.07)" }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-3 transition-shadow duration-300"
            >
              <div className="shrink-0 w-7 h-7 bg-[#24c2c2]/15 rounded-lg flex items-center justify-center mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-[#24c2c2]" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default ExecutiveSecretary;
