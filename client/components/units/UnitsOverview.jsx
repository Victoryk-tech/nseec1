"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Layers, Globe, ShieldCheck, Users } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { UNITS } from "./data";

/* ─── animation helper ─────────────────────────────────────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.44, delay },
});

/* ─── Initials fallback avatar ──────────────────────────────── */
const InitialsAvatar = ({ name }) => {
  const initials = (name || "")
    .split(/[\s.()+,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <div
      className="h-full w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #24c2c2cc, #24c2c255)",
      }}
    >
      <span className="text-white font-black text-3xl select-none">
        {initials || "?"}
      </span>
    </div>
  );
};

/* ─── Unit card ─────────────────────────────────────────────── */
const UnitCard = ({ unit, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-16px" }}
    transition={{ duration: 0.44, delay: Math.min(index * 0.07, 0.42) }}
    whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(8,44,44,0.12)" }}
    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col transition-shadow duration-300"
    itemScope
    itemType="https://schema.org/GovernmentOrganization"
  >
    {/* Top accent bar */}
    <div className="h-1.5 w-full shrink-0 bg-[#24c2c2]" />

    {/* Head photo */}
    <div className="relative h-52 bg-gray-50 shrink-0">
      {unit.photo ? (
        <Image
          src={unit.photo}
          alt={`${unit.head ?? unit.code} — ${unit.headTitle}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          priority={index < 3}
        />
      ) : (
        <InitialsAvatar name={unit.head ?? unit.code} />
      )}

      {/* Code badge */}
      <span
        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-[#082c2c]/90 backdrop-blur-sm"
        aria-label={`Unit code: ${unit.code}`}
      >
        {unit.code}
      </span>

      {!unit.photo && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] bg-black/25 text-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap">
          Photo pending
        </span>
      )}
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <h2
        className="text-sm font-bold text-gray-900 leading-snug mb-1"
        itemProp="name"
      >
        {unit.name}
      </h2>

      <p
        className="text-xs font-semibold mb-0.5 text-[#24c2c2]"
        itemProp="employee"
      >
        {unit.head ?? "Head of Unit"}
      </p>
      <p className="text-[11px] text-gray-400 mb-3 leading-snug">
        {unit.headTitle}
      </p>

      <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-4">
        {unit.tagline}
      </p>

      <div className="space-y-2 mt-auto">
        <a
          href={`mailto:${unit.email}`}
          className="flex items-center gap-1.5 text-xs font-medium text-[#24c2c2] hover:underline transition-colors"
          itemProp="email"
          aria-label={`Email ${unit.name}`}
        >
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{unit.email}</span>
        </a>

        <Link
          href={unit.path}
          className="flex items-center justify-between gap-1.5 text-xs font-semibold text-white w-full px-3.5 py-2.5 rounded-xl bg-[#082c2c] hover:bg-[#0e4a4a] active:scale-95 transition-all"
          aria-label={`View ${unit.name}`}
        >
          <span>View Unit</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </Link>
      </div>
    </div>
  </motion.article>
);

/* ─── Stats data ─────────────────────────────────────────────── */
const STATS = [
  { icon: Layers, value: "6", label: "Specialist Units" },
  { icon: Globe, value: "Cross-cutting", label: "Services Delivered" },
  { icon: ShieldCheck, value: "100%", label: "Compliance Focused" },
  { icon: Users, value: "400+", label: "Staff Supported" },
];

/* ─── Page component ─────────────────────────────────────────── */
const UnitsOverview = () => (
  <main itemScope itemType="https://schema.org/Organization">
    <meta
      itemProp="name"
      content="National Senior Secondary Education Commission"
    />

    <AboutHero
      title="Our Units"
      subtitle="NSSEC's specialist units provide cross-cutting services — legal advisory, communications, procurement, internal audit, ICT, and reform coordination — supporting the Commission's operations and ensuring institutional excellence."
      breadcrumb={[
        { label: "Departments", path: "/departments" },
        { label: "Units" },
      ]}
    />

    {/* ── Stats bar ─────────────────────────────────────────── */}
    <section
      aria-label="Units statistics"
      className="bg-[#082c2c] border-b border-[#24c2c2]/20"
    >
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              {...fade(i * 0.08)}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#24c2c2]/15 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-[#24c2c2]" aria-hidden="true" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white leading-none">
                {value}
              </p>
              <p className="text-xs text-white/55 leading-snug">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Body ──────────────────────────────────────────────── */}
    <div className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Intro text */}
        <motion.div {...fade(0)} className="max-w-3xl mb-14">
          <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Specialist Units
          </h2>
          <p className="text-gray-600 leading-relaxed">
            In addition to its core departments, NSSEC operates through six
            specialist units that provide essential support services across the
            Commission. These units ensure legal compliance, financial integrity,
            transparent procurement, effective communication, digital
            infrastructure, and a culture of accountability and service
            excellence forming the backbone of institutional effectiveness.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {UNITS.map((unit, i) => (
            <UnitCard key={unit.slug} unit={unit} index={i} />
          ))}
        </div>
      </div>
    </div>

    {/* ── CTA section ───────────────────────────────────────── */}
    <section
      aria-label="Contact call to action"
      className="bg-gradient-to-r from-[#082c2c] via-[#0e4a4a] to-[#1a8080] py-16 sm:py-20"
    >
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Work With Our Units
          </h2>
          <p className="text-white/65 leading-relaxed mb-8">
            Each NSSEC unit is available to support stakeholders, partners and
            the public. Reach out to the relevant unit directly or contact our
            central office for assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#24c2c2] text-[#082c2c] font-semibold text-sm hover:bg-[#1a8080] hover:text-white transition-colors"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              View Departments
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default UnitsOverview;
