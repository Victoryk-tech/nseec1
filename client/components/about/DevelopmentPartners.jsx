"use client";
import { motion } from "framer-motion";
import { Globe, BookOpen, Users2, Handshake, ArrowRight, Mail } from "lucide-react";
import AboutHero from "./AboutHero";

const PARTNERSHIP_AREAS = [
  {
    icon: BookOpen,
    title: "Curriculum Development",
    description:
      "Partnering with research institutions and international agencies to develop responsive, globally competitive curriculum for Nigerian senior secondary schools.",
  },
  {
    icon: Users2,
    title: "Teacher Capacity Building",
    description:
      "Collaborating with educational institutions and development partners on teacher professional development and pedagogical skills enhancement.",
  },
  {
    icon: Globe,
    title: "International Relations",
    description:
      "Fostering international partnerships to align Nigeria's senior secondary education with global best practices and competitive standards.",
  },
  {
    icon: Handshake,
    title: "Infrastructure Development",
    description:
      "Working with development partners to provide funding and expertise for the construction, rehabilitation, and equipping of school facilities.",
  },
];

/* ── Partner logo data (brand colours where known) ── */
const PARTNERS = [
  {
    category: "Multilateral Agencies",
    color: "#1CABE2",
    orgs: [
      { abbr: "UNICEF", full: "United Nations Children's Fund", color: "#1CABE2" },
      { abbr: "UNESCO", full: "United Nations Educational, Scientific and Cultural Organization", color: "#2D8DC3" },
      { abbr: "World Bank", full: "World Bank Group", color: "#009FDA" },
      { abbr: "UNDP", full: "United Nations Development Programme", color: "#0468B1" },
      { abbr: "UNFPA", full: "United Nations Population Fund", color: "#6D1F7E" },
    ],
  },
  {
    category: "Bilateral Partners",
    color: "#002F6C",
    orgs: [
      { abbr: "USAID", full: "U.S. Agency for International Development", color: "#002F6C" },
      { abbr: "FCDO", full: "Foreign, Commonwealth & Development Office (UK)", color: "#012169" },
      { abbr: "GIZ", full: "Deutsche Gesellschaft für Internationale Zusammenarbeit (Germany)", color: "#004A99" },
      { abbr: "JICA", full: "Japan International Cooperation Agency", color: "#0077C0" },
      { abbr: "EU", full: "European Union Delegation to Nigeria", color: "#003399" },
    ],
  },
  {
    category: "Civil Society & Foundations",
    color: "#E31E24",
    orgs: [
      { abbr: "ADF", full: "Aliko Dangote Foundation", color: "#006633" },
      { abbr: "MacArthur", full: "John D. & Catherine T. MacArthur Foundation", color: "#006CB7" },
      { abbr: "Save", full: "Save the Children International", color: "#E2231A" },
      { abbr: "ActionAid", full: "ActionAid Nigeria", color: "#D11B22" },
    ],
  },
  {
    category: "Research & Academic",
    color: "#0d9488",
    orgs: [
      { abbr: "NERDC", full: "Nigerian Educational Research and Development Council", color: "#0d9488" },
      { abbr: "NTI", full: "National Teachers' Institute", color: "#24c2c2" },
      { abbr: "NOUN", full: "National Open University of Nigeria", color: "#003366" },
      { abbr: "UBEC", full: "Universal Basic Education Commission", color: "#006633" },
      { abbr: "NBTE", full: "National Board for Technical Education", color: "#c2410c" },
    ],
  },
];

const LogoBadge = ({ abbr, full, color }) => (
  <motion.div
    whileHover={{ scale: 1.04, boxShadow: `0 8px 24px ${color}22` }}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-2 transition-all duration-200 cursor-default"
    title={full}
  >
    {/* Styled logo mark */}
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1 shadow-sm"
      style={{ background: `${color}14`, border: `1.5px solid ${color}25` }}
    >
      <span
        className="text-xs font-black leading-none text-center px-1"
        style={{ color, fontSize: abbr.length > 5 ? "9px" : abbr.length > 3 ? "11px" : "13px" }}
      >
        {abbr}
      </span>
    </div>
    <p className="text-[11px] text-gray-600 font-medium leading-snug line-clamp-2">{full}</p>
  </motion.div>
);

const DevelopmentPartners = () => (
  <main>
    <AboutHero
      title="Development Partners"
      subtitle="Collaborating with national and international organisations to advance quality senior secondary education across Nigeria."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Development Partners" },
      ]}
    />

    {/* Intro */}
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
              Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              Collaboration for Impact
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              NSSEC is mandated under the NSSEC Act 2023 to collaborate with donor agencies and Development Partners on matters relating to senior secondary education. These partnerships expand the Commission&apos;s capacity and reach.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Through strategic alliances with multilateral agencies, bilateral partners, civil society organisations, and research institutions, NSSEC co-creates solutions that improve learning outcomes for millions of Nigerian secondary school students.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Partner logos grid */}
    <section aria-labelledby="partner-logos" className="py-16 sm:py-20 bg-gray-50/60">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Our Partners
          </span>
          <h2 id="partner-logos" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Partner Organisations
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            NSSEC works with a diverse network of partners committed to education quality, access, and innovation.
          </p>
        </motion.div>

        <div className="space-y-12">
          {PARTNERS.map(({ category, color, orgs }, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: ci * 0.06 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[3px] w-6 rounded-full" style={{ background: color }} />
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{category}</h3>
                <span className="text-xs text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full">
                  {orgs.length} organisations
                </span>
              </div>
              {/* Logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {orgs.map((org) => (
                  <LogoBadge key={org.abbr} {...org} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Partnership areas */}
    <section aria-labelledby="partnership-areas" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Collaboration Areas
          </span>
          <h2 id="partnership-areas" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Areas of Partnership
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PARTNERSHIP_AREAS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.42, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 16px 34px rgba(0,0,0,0.07)" }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex gap-5 transition-shadow duration-300"
            >
              <div className="shrink-0 bg-[#24c2c2]/10 w-12 h-12 rounded-xl flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#24c2c2]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA banner */}
    <section className="py-16 bg-gradient-to-br from-[#24c2c2] to-[#168888]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Partner with NSSEC</h2>
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            Join us in transforming senior secondary education in Nigeria. Contact us to explore partnership opportunities that create lasting impact.
          </p>
          <a
            href="mailto:admin@nssec.gov.ng"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#24c2c2] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <Mail className="h-4 w-4" />
            admin@nssec.gov.ng
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  </main>
);

export default DevelopmentPartners;
