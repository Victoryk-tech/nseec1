"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, Building2 } from "lucide-react";
import AboutHero from "./AboutHero";

const ZONES = [
  {
    zone: "North-Central",
    shortCode: "NC",
    states: ["Benue", "FCT — Abuja", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau"],
    schools: "7,619",
    students: "2,456,789",
  },
  {
    zone: "North-East",
    shortCode: "NE",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
    schools: "3,138",
    students: "1,987,654",
  },
  {
    zone: "North-West",
    shortCode: "NW",
    states: ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
    schools: "5,766",
    students: "3,234,567",
  },
  {
    zone: "South-East",
    shortCode: "SE",
    states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
    schools: "4,985",
    students: "2,123,890",
  },
  {
    zone: "South-South",
    shortCode: "SS",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
    schools: "5,258",
    students: "1,876,543",
  },
  {
    zone: "South-West",
    shortCode: "SW",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
    schools: "19,145",
    students: "2,789,012",
  },
];

const ZoneCard = ({ zone, shortCode, states, schools, students, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    whileHover={{ y: -5, boxShadow: "0 18px 40px rgba(0,0,0,0.08)" }}
    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-shadow duration-300"
  >
    {/* Header */}
    <div className="bg-gradient-to-br from-[#24c2c2] to-[#168888] px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">
            Geopolitical Zone
          </p>
          <h3 className="text-lg font-extrabold text-white">{zone}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
          <span className="text-sm font-black text-white">{shortCode}</span>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
      <div className="px-5 py-3 text-center">
        <p className="text-xl font-extrabold text-gray-900">{schools}</p>
        <p className="text-[11px] text-gray-400 font-medium">Schools</p>
      </div>
      <div className="px-5 py-3 text-center">
        <p className="text-xl font-extrabold text-gray-900">
          {Number(students.replace(/,/g, "")).toLocaleString()}
        </p>
        <p className="text-[11px] text-gray-400 font-medium">Students</p>
      </div>
    </div>

    {/* States */}
    <div className="p-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        States / FCT ({states.length})
      </p>
      <div className="flex flex-wrap gap-1.5">
        {states.map((s) => (
          <span
            key={s}
            className="text-xs bg-[#24c2c2]/8 text-[#1a9898] font-medium px-2.5 py-1 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

const ZonalOffices = () => (
  <main>
    <AboutHero
      title="Zonal & State Offices"
      subtitle="NSSEC maintains an active presence in all 36 States and the Federal Capital Territory to coordinate senior secondary education nationwide."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Zonal/State Offices" },
      ]}
    />

    {/* Stats strip */}
    <section className="py-14 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { label: "Geopolitical Zones", value: "6", icon: MapPin },
            { label: "State Offices", value: "36 + FCT", icon: Building2 },
            { label: "Coordinating Centres", value: "12", icon: Building2 },
          ].map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.08 }}
              className="bg-[#24c2c2]/5 border border-[#24c2c2]/15 rounded-2xl p-6 text-center"
            >
              <div className="mx-auto mb-3 w-10 h-10 bg-[#24c2c2]/15 rounded-xl flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#24c2c2]" />
              </div>
              <p className="text-3xl font-extrabold text-[#24c2c2] mb-1">{value}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Zone cards */}
    <section aria-labelledby="zones-section" className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            National Coverage
          </span>
          <h2 id="zones-section" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Six Geopolitical Zones
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            NSSEC operates offices across Nigeria&apos;s six geopolitical zones, each coordinating state-level activities to ensure equitable distribution of resources and interventions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ZONES.map((z, i) => (
            <ZoneCard key={z.zone} {...z} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Headquarters */}
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-gradient-to-br from-[#24c2c2] to-[#168888] rounded-3xl p-8 sm:p-10 text-white"
        >
          <MapPin className="h-8 w-8 mx-auto mb-4 text-white/80" />
          <h2 className="text-2xl font-bold mb-3">NSSEC Headquarters</h2>
          <p className="text-white/80 text-base mb-2">Plot 14 Yobe Close, Maitama, Abuja, FCT</p>
          <p className="text-white/70 text-sm mb-7">
            Also operational at Utako, Abuja and 12 Coordinating Centres Nationwide
          </p>
          <a
            href="mailto:admin@nssec.gov.ng"
            className="inline-flex items-center gap-2 bg-white text-[#24c2c2] font-semibold px-6 py-2.5 rounded-xl text-sm hover:shadow-lg transition-shadow"
          >
            <Mail className="h-4 w-4" />
            admin@nssec.gov.ng
          </a>
        </motion.div>
      </div>
    </section>
  </main>
);

export default ZonalOffices;
