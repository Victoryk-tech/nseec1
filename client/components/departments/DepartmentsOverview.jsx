"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Building2,
  MapPin,
  Users,
  Award,
} from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { DEPARTMENTS } from "./data";

// ─── Initials Avatar ──────────────────────────────────────────────────────────
const InitialsAvatar = ({ name }) => {
  const initials = (name || "")
    .split(/[\s.()+,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "??";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #082c2c 0%, #0e4a4a 55%, #1a8080 100%)",
      }}
    >
      <span
        className="text-5xl font-extrabold tracking-widest select-none"
        style={{ color: "#24c2c2", opacity: 0.85 }}
      >
        {initials}
      </span>
    </div>
  );
};

// ─── Department Card ──────────────────────────────────────────────────────────
const DepartmentCard = ({ dept, index }) => {
  const hasPhoto = Boolean(dept.photo);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(8,44,44,0.18)" }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-md transition-shadow duration-300"
      itemScope
      itemType="https://schema.org/GovernmentOrganization"
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-[#24c2c2] shrink-0" />

      {/* Head photo */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#082c2c]">
        {hasPhoto ? (
          <Image
            src={dept.photo}
            alt={`${dept.head} — ${dept.headTitle}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover object-top"
            priority={index < 3}
          />
        ) : (
          <InitialsAvatar name={dept.head} />
        )}

        {/* Code badge */}
        <span
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-xs font-bold tracking-widest text-[#24c2c2] uppercase"
          style={{ background: "rgba(8,44,44,0.93)" }}
          aria-label={`Department code: ${dept.code}`}
        >
          {dept.code}
        </span>

        {/* Photo-pending badge */}
        {!hasPhoto && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] bg-black/25 text-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap">
            Photo pending
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Name */}
        <h3
          className="text-base font-bold text-[#082c2c] leading-snug line-clamp-2"
          itemProp="name"
        >
          {dept.name}
        </h3>

        {/* Head info */}
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-[#0e4a4a]" itemProp="employee">
            {dept.head}
          </p>
          <p className="text-xs text-[#1a8080]">{dept.headTitle}</p>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
          {dept.tagline}
        </p>

        {/* Email */}
        <a
          href={`mailto:${dept.email}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#24c2c2] hover:text-[#1a8080] transition-colors truncate"
          itemProp="email"
          aria-label={`Email ${dept.name}`}
        >
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {dept.email}
        </a>

        {/* CTA */}
        <Link
          href={dept.path}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-[#082c2c] hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24c2c2] focus-visible:ring-offset-2"
          aria-label={`View ${dept.name}`}
        >
          View Department
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
};

// ─── Stats data ───────────────────────────────────────────────────────────────
const STATS = [
  { icon: Building2, value: "6", label: "Departments" },
  { icon: MapPin, value: "36+", label: "States Covered" },
  { icon: Users, value: "500+", label: "Staff Members" },
  { icon: Award, value: "2021", label: "Established" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const DepartmentsOverview = () => (
  <main itemScope itemType="https://schema.org/Organization">
    <meta itemProp="name" content="National Senior Secondary Education Commission" />

    {/* 1. Hero */}
    <AboutHero
      title="Our Departments"
      subtitle="NSSEC's departments work in concert to set standards, develop capacity, manage resources, and drive evidence-based policies that elevate senior secondary education across Nigeria."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Departments" },
      ]}
    />

    {/* 2. Stats bar */}
    <section aria-label="Quick statistics" className="bg-white border-b border-gray-100">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: "rgba(36,194,194,0.1)" }}
                >
                  <Icon className="h-5 w-5 text-[#24c2c2]" aria-hidden="true" />
                </span>
                <p className="text-3xl font-extrabold text-[#082c2c]">{stat.value}</p>
                <p className="text-xs font-medium text-[#1a8080] uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* 3. Intro text */}
    <section aria-label="Introduction" className="bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <motion.div
            initial={{ scaleX: 0, originX: 0.5 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-[3px] w-12 bg-[#24c2c2] rounded-full"
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-2xl sm:text-3xl font-extrabold text-[#082c2c]"
          >
            Coordinated Expertise, National Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.16 }}
            className="text-gray-600 leading-relaxed text-base sm:text-lg"
          >
            Each department within the National Senior Secondary Education Commission is
            purpose-built to address a distinct dimension of secondary education — from
            quality assurance and infrastructure planning to human resource management and
            international partnerships. Together, they form an integrated system that
            advances NSSEC&apos;s statutory mandate of regulating, coordinating, and
            improving senior secondary education across all 36 states and the FCT.
          </motion.p>
        </div>
      </div>
    </section>

    {/* 4. Department cards grid */}
    <section aria-label="Departments" className="bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48 }}
          className="mb-12 sm:mb-16"
        >
          <div className="h-[3px] w-10 bg-[#24c2c2] rounded-full mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082c2c]">
            All Departments
          </h2>
          <p className="mt-2 text-[#1a8080] text-sm sm:text-base max-w-xl">
            Browse every department and learn more about their leadership, mandate, and
            programmes.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {DEPARTMENTS.map((dept, index) => (
            <DepartmentCard key={dept.slug} dept={dept} index={index} />
          ))}
        </div>
      </div>
    </section>

    {/* 5. CTA section */}
    <section
      aria-label="Call to action"
      className="relative overflow-hidden bg-gradient-to-br from-[#082c2c] via-[#0e4a4a] to-[#1a8080]"
    >
      {/* Diagonal stripe texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)",
        }}
      />
      {/* Glow accent */}
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#24c2c2]/10 pointer-events-none"
      />
      {/* Top highlight line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24c2c2]/35 to-transparent"
      />

      <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-20 sm:py-28 text-center">
        <motion.div
          initial={{ scaleX: 0, originX: 0.5 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto h-[3px] w-10 bg-[#24c2c2] rounded-full mb-6"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight"
        >
          Explore Our Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.16 }}
          className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto mb-10"
        >
          Discover how NSSEC&apos;s departments collaborate to raise the quality and
          reach of senior secondary education across every state in Nigeria.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-[#082c2c] bg-[#24c2c2] hover:bg-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            Our Programmes
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            About NSSEC
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default DepartmentsOverview;
