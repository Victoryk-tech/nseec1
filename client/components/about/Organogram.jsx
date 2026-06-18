"use client";
import { motion } from "framer-motion";
import AboutHero from "./AboutHero";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

const DIRECT_REPORTS = [
  { code: "IA", label: "Internal Audit Unit", email: "Internal_audit@nssec.gov.ng" },
  { code: "PROC", label: "Procurement Unit", email: "procurement@nssec.gov.ng" },
  { code: "LGL", label: "Legal Unit", email: "legal@nssec.gov.ng" },
  { code: "PPD", label: "Physical Planning Dept", email: "ppd@nssec.gov.ng" },
];

const DEPARTMENTS = [
  { code: "DEQA", label: "Education Quality Assurance", email: "deqa@nssec.gov.ng", color: "#24c2c2" },
  { code: "DPRS", label: "Planning, Research & Statistics", email: "dprs@nssec.gov.ng", color: "#0891b2" },
  { code: "TD&IP", label: "Teacher Dev & Int'l Partnership", email: "tdip@nssec.gov.ng", color: "#0d9488" },
  { code: "DFA", label: "Finance & Accounts", email: "dfa@nssec.gov.ng", color: "#7c3aed" },
  { code: "HRM", label: "Human Resource Management", email: "hrm@nssec.gov.ng", color: "#b45309" },
];

const UNITS = [
  { code: "RC", label: "Reform Coordination (SERVICOM & ACTU)", email: "reform_dev@nssec.gov.ng" },
  { code: "PRP", label: "Public Relations & Protocol", email: "press@nssec.gov.ng" },
  { code: "ICT", label: "ICT Unit", email: "ict_unit@nssec.gov.ng" },
  { code: "BUDGET", label: "Budget Unit", email: "budget@nssec.gov.ng" },
  { code: "MIN", label: "Ministerial Deliverables", email: "min_deliverables@nssec.gov.ng" },
  { code: "PA", label: "PA to Executive Secretary", email: "pa_es@nssec.gov.ng" },
];

const NodeCard = ({ code, label, email, color = "#24c2c2" }) => (
  <motion.a
    href={`mailto:${email}`}
    whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.09)" }}
    whileTap={{ scale: 0.97 }}
    className="block bg-white rounded-xl border text-center px-3 py-3.5 transition-all duration-200 cursor-pointer"
    style={{ borderColor: `${color}40` }}
    title={`Contact: ${email}`}
  >
    <span className="block text-xs font-black mb-0.5" style={{ color }}>
      {code}
    </span>
    <span className="block text-[11px] text-gray-700 font-medium leading-snug">{label}</span>
  </motion.a>
);

const ColumnHeader = ({ label, color, count }) => (
  <div className="flex flex-col items-center mb-4">
    <div className="w-px h-8" style={{ background: `${color}50` }} />
    <span
      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
      style={{ color, background: `${color}15` }}
    >
      {label}&nbsp;&nbsp;{count}
    </span>
  </div>
);

const Organogram = () => (
  <main>
    <AboutHero
      title="Organogram"
      subtitle="The organisational structure of the National Senior Secondary Education Commission, showing reporting lines and departments."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Organogram" },
      ]}
    />

    <section aria-labelledby="org-chart" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div {...fade(0)} className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Structure
          </span>
          <h2 id="org-chart" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Organisational Chart
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Click any node to send an email to that department or unit directly.
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-6">
          <div className="min-w-[700px]">

            {/* Executive Secretary */}
            <motion.div {...fade(0)} className="flex justify-center">
              <a
                href="mailto:es@nssec.gov.ng"
                className="block w-72 bg-gradient-to-br from-[#24c2c2] to-[#168888] rounded-2xl p-6 text-white text-center shadow-xl shadow-[#24c2c2]/30 hover:shadow-2xl hover:shadow-[#24c2c2]/40 transition-shadow duration-300"
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-1 text-white/75">
                  Executive Secretary
                </p>
                <p className="text-lg font-extrabold">Dr. Iyela Ajayi</p>
                <p className="mt-1.5 text-xs text-white/70">es@nssec.gov.ng</p>
              </a>
            </motion.div>

            {/* Vertical connector */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-[#24c2c2]/30" />
            </div>

            {/* 3-column grid */}
            <div className="relative">
              <div
                className="absolute top-0 left-[16.66%] right-[16.66%] h-px bg-[#24c2c2]/25"
                aria-hidden="true"
              />
              <div className="grid grid-cols-3 gap-6">

                {/* Direct Reports */}
                <motion.div {...fade(0.05)}>
                  <ColumnHeader label="Direct Reports" color="#24c2c2" count={4} />
                  <div className="space-y-3">
                    {DIRECT_REPORTS.map((d) => (
                      <NodeCard key={d.code} {...d} color="#24c2c2" />
                    ))}
                  </div>
                </motion.div>

                {/* Departments */}
                <motion.div {...fade(0.1)}>
                  <ColumnHeader label="Departments" color="#0891b2" count={5} />
                  <div className="space-y-3">
                    {DEPARTMENTS.map((d) => (
                      <NodeCard key={d.code} {...d} color={d.color} />
                    ))}
                  </div>
                </motion.div>

                {/* Units */}
                <motion.div {...fade(0.15)}>
                  <ColumnHeader label="Units" color="#0d9488" count={6} />
                  <div className="space-y-3">
                    {UNITS.map((u) => (
                      <NodeCard key={u.code} {...u} color="#0d9488" />
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Legend */}
            <motion.div
              {...fade(0.2)}
              className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-500"
            >
              {[
                { color: "#24c2c2", label: "Executive Secretary & Direct Reports" },
                { color: "#0891b2", label: "Departments (5)" },
                { color: "#0d9488", label: "Units (6)" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: color }} />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Department detail cards */}
    <section aria-labelledby="dept-detail" className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div {...fade(0)} className="mb-10">
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Department Details
          </span>
          <h2 id="dept-detail" className="text-3xl font-bold text-gray-900">
            Key Departments &amp; Functions
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              code: "DEQA",
              title: "Education Quality Assurance",
              color: "#24c2c2",
              email: "deqa@nssec.gov.ng",
              functions: [
                "Standards development and enforcement",
                "School monitoring and evaluation",
                "Quality assurance inspections",
                "Accreditation and certification",
              ],
            },
            {
              code: "DPRS",
              title: "Planning, Research & Statistics",
              color: "#0891b2",
              email: "dprs@nssec.gov.ng",
              functions: [
                "Educational planning and policy",
                "EMIS and data management",
                "Research and statistics",
                "Reporting and documentation",
              ],
            },
            {
              code: "TD&IP",
              title: "Teacher Dev & Int'l Partnership",
              color: "#0d9488",
              email: "tdip@nssec.gov.ng",
              functions: [
                "Teacher professional development",
                "Capacity building programmes",
                "International partnerships",
                "TVET and STEAM promotion",
              ],
            },
            {
              code: "DFA",
              title: "Finance & Accounts",
              color: "#7c3aed",
              email: "dfa@nssec.gov.ng",
              functions: [
                "Financial management and reporting",
                "Budget planning and execution",
                "Accounts and auditing support",
                "Procurement financial oversight",
              ],
            },
            {
              code: "HRM",
              title: "Human Resource Management",
              color: "#b45309",
              email: "hrm@nssec.gov.ng",
              functions: [
                "Staff recruitment and deployment",
                "Staff training and development",
                "Performance management",
                "Administrative coordination",
              ],
            },
            {
              code: "PPD",
              title: "Physical Planning Department",
              color: "#166534",
              email: "ppd@nssec.gov.ng",
              functions: [
                "Infrastructure development planning",
                "School construction oversight",
                "Facilities rehabilitation",
                "Estate and asset management",
              ],
            },
          ].map(({ code, title, color, email, functions }, i) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-16px" }}
              transition={{ duration: 0.42, delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: "0 14px 32px rgba(0,0,0,0.07)" }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all duration-300"
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: `${color}15`, color }}
              >
                {code}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-4">{title}</h3>
              <ul className="space-y-2">
                {functions.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={`mailto:${email}`} className="mt-5 block text-xs font-medium hover:underline" style={{ color }}>
                {email}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Summary */}
    <section aria-labelledby="org-summary" className="py-14 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div {...fade(0)} className="text-center mb-8">
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Summary
          </span>
          <h2 id="org-summary" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Commission Composition
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            {
              heading: "Executive Secretary",
              body: "Dr. Iyela Ajayi provides strategic leadership. Four units report directly to the ES: Internal Audit, Procurement, Legal, and Physical Planning.",
              color: "#24c2c2",
            },
            {
              heading: "5 Departments",
              body: "Quality Assurance; Planning, Research & Statistics; Teacher Development & International Partnership; Finance & Accounts; Human Resource Management.",
              color: "#0891b2",
            },
            {
              heading: "6 Units",
              body: "Reform Coordination (SERVICOM & ACTU); Legal; Public Relations & Protocol; ICT; Budget; Ministerial Deliverables.",
              color: "#0d9488",
            },
          ].map(({ heading, body, color }) => (
            <motion.div
              key={heading}
              {...fade(0.06)}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="h-[3px] w-8 rounded-full mb-4" style={{ background: color }} />
              <h3 className="text-sm font-bold text-gray-900 mb-2">{heading}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Organogram;
