"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Target,
  Users,
  BarChart3,
  Shield,
} from "lucide-react";
import AboutHero from "@/components/about/AboutHero";

/* ─── animation helpers ─────────────────────────────────────────────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-16px" },
  transition: { duration: 0.42, delay },
});

/* ─── initials fallback ─────────────────────────────────────────────── */
const InitialsAvatar = ({ name }) => {
  const initials = name
    .split(/[\s.()+]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#24c2c2] to-[#082c2c]">
      <span className="text-white font-black text-5xl select-none">{initials}</span>
    </div>
  );
};

/* ─── stats icon map ─────────────────────────────────────────────────── */
const STAT_ICONS = [Target, Users, BarChart3, Shield];

/* ═══════════════════════════════════════════════════════════════════════
   DepartmentDetail
═══════════════════════════════════════════════════════════════════════ */
const DepartmentDetail = ({ dept }) => (
  <main>

    {/* ── 1. Hero ── */}
    <AboutHero
      title={dept.short}
      subtitle={dept.tagline}
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Departments", path: "/departments" },
        { label: dept.short },
      ]}
    />

    {/* ── 2. Head profile + overview ── */}
    <section aria-labelledby="dept-overview-heading" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ── Left: photo card ── */}
          <motion.aside {...fade(0)} className="lg:col-span-2">

            {/* Photo / initials */}
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-200/80 relative aspect-[3/3] max-w-sm mx-auto">
              {dept.photo ? (
                <Image
                  src={dept.photo}
                  alt={`${dept.head} — ${dept.headTitle}, NSSEC`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 38vw"
                  priority
                />
              ) : (
                <InitialsAvatar name={dept.head ?? dept.code} />
              )}

              {/* Name / role overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#082c2c]/90 via-[#082c2c]/55 to-transparent px-6 py-6">
                <h2
                  id="dept-overview-heading"
                  className="text-xl font-extrabold text-white leading-tight"
                >
                  {dept.head}
                </h2>
                <p className="text-sm font-semibold mt-0.5 text-[#24c2c2]">
                  {dept.headTitle}
                </p>
                <a
                  href={`mailto:${dept.email}`}
                  className="inline-flex items-center gap-1.5 mt-2 text-xs text-white/65 hover:text-white transition-colors"
                  aria-label={`Email ${dept.head}`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  {dept.email}
                </a>
              </div>

              {/* Photo pending badge */}
              {!dept.photo && (
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] bg-[#082c2c]/70 text-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    Photo pending
                  </span>
                </div>
              )}
            </div>

            {/* Code badge card */}
            <motion.div
              {...fade(0.14)}
              className="mt-5 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xs text-center leading-tight shadow-sm shrink-0 bg-[#082c2c]">
                {dept.code}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Directorate
                </p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {dept.name}
                </p>
              </div>
            </motion.div>
          </motion.aside>

          {/* ── Right: overview content ── */}
          <motion.div {...fade(0.08)} className="lg:col-span-3 space-y-8">

            {/* Code pill */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-[#24c2c2]/10 text-[#24c2c2]">
                {dept.code}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {dept.name}
              </h2>

              {/* Description — split into 2 paragraphs if long */}
              {dept.description.length > 400 ? (() => {
                const mid = dept.description.indexOf(". ", Math.floor(dept.description.length / 2));
                const p1 = mid !== -1 ? dept.description.slice(0, mid + 1) : dept.description;
                const p2 = mid !== -1 ? dept.description.slice(mid + 1).trim() : null;
                return (
                  <>
                    <p className="text-gray-600 text-base leading-relaxed">{p1}</p>
                    {p2 && <p className="text-gray-600 text-base leading-relaxed mt-4">{p2}</p>}
                  </>
                );
              })() : (
                <p className="text-gray-600 text-base leading-relaxed">{dept.description}</p>
              )}
            </div>

            {/* Mandate box */}
            <div className="rounded-2xl p-6 border bg-[#24c2c2]/5 border-[#24c2c2]/20">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-[#24c2c2]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#24c2c2]">
                  Mandate
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{dept.mandate}</p>
            </div>

            {/* Contact card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Directorate Email</p>
                <a
                  href={`mailto:${dept.email}`}
                  className="text-sm font-semibold text-[#1a8080] hover:text-[#24c2c2] transition-colors hover:underline"
                >
                  {dept.email}
                </a>
              </div>
              <a
                href={`mailto:${dept.email}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2.5 rounded-xl bg-[#082c2c] hover:bg-[#0e4a4a] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 3. Stats strip ── */}
    {dept.stats?.length > 0 && (
      <section aria-label="Department statistics" className="bg-[#082c2c] py-10 sm:py-14">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4">
            {dept.stats.map(({ value, label }, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <Icon className="h-5 w-5 text-[#24c2c2]/60 mb-1" aria-hidden="true" />
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#24c2c2] leading-none">
                    {value}
                  </span>
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wide">
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    )}

    {/* ── 4. Core Functions ── */}
    <section aria-labelledby="functions-heading" className="py-16 sm:py-20 bg-gray-50/60">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">

        <motion.div {...fade(0)} className="mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 text-[#24c2c2]">
            Operations
          </span>
          <h2 id="functions-heading" className="text-3xl font-bold text-gray-900">
            Core Functions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dept.functions.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              {...slideUp(Math.min(i * 0.06, 0.4))}
              whileHover={{ y: -4, boxShadow: "0 14px 32px rgba(0,0,0,0.07)" }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 transition-all duration-300"
            >
              <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 bg-[#24c2c2]/10">
                <CheckCircle2 className="h-4 w-4 text-[#24c2c2]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 5. Programmes & Initiatives ── */}
    {dept.programs?.length > 0 && (
      <section aria-labelledby="programs-heading" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">

          <motion.div {...fade(0)} className="mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3 text-[#24c2c2]">
              Impact
            </span>
            <h2 id="programs-heading" className="text-3xl font-bold text-gray-900">
              Programmes &amp; Initiatives
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dept.programs.map(({ name, desc }, i) => (
              <motion.div
                key={name}
                {...slideUp(i * 0.07)}
                whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(36,194,194,0.08)" }}
                className="rounded-2xl p-6 border bg-[#24c2c2]/5 border-[#24c2c2]/15 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-[3px] w-8 rounded mb-4 bg-[#24c2c2]" />
                <h3 className="text-sm font-bold text-gray-900 mb-2">{name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* ── 6. CTA ── */}
    <section className="py-14 bg-gradient-to-br from-[#082c2c] via-[#0e4a4a] to-[#1a8080]">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          {...fade(0)}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        >
          <div>
            <div className="h-[3px] w-10 rounded mb-4 bg-[#24c2c2]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              For enquiries relating to {dept.short}, contact the department directly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${dept.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-[#082c2c] bg-[#24c2c2] hover:bg-[#1a8080] hover:text-white transition-all duration-200"
            >
              <Mail className="h-4 w-4" />
              {dept.email}
            </a>
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              All Departments
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

  </main>
);

export default DepartmentDetail;
