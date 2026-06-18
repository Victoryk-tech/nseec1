"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, BookOpen, ArrowLeft, Building2 } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";

/* ─── Animation helpers ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20px" },
  transition: { duration: 0.48, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

/* ─── Initials fallback avatar ───────────────────────────────── */
const InitialsAvatar = ({ name }) => {
  const initials = (name || "")
    .split(/[\s.()+]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#24c2c2] to-[#082c2c]">
      <span className="text-white font-black text-6xl select-none tracking-tight">
        {initials || "?"}
      </span>
    </div>
  );
};

/* ─── Stats strip ────────────────────────────────────────────── */
const StatsStrip = ({ stats }) => {
  if (!stats?.length) return null;
  return (
    <section aria-label="Unit statistics" className="bg-[#082c2c] py-12">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#0e4a4a]/60 rounded-2xl overflow-hidden">
          {stats.map(({ label, value }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.08)}
              className="bg-[#082c2c] px-6 py-8 flex flex-col items-center text-center"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#24c2c2] mb-1 tabular-nums">
                {value}
              </span>
              <span className="text-xs text-white/55 font-medium leading-snug max-w-[120px]">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Main component ─────────────────────────────────────────── */
const UnitDetail = ({ unit }) => {
  const hasPhoto = !!unit.photo;
  const hasHead = !!unit.head;

  return (
    <main>
      {/* 1. Hero */}
      <AboutHero
        title={unit.short}
        subtitle={unit.tagline}
        breadcrumb={[
          { label: "About", path: "/about" },
          { label: "Units", path: "/unit" },
          { label: unit.short },
        ]}
      />

      {/* 2. Head profile + overview */}
      <section
        aria-labelledby="unit-overview-heading"
        className="py-16 sm:py-24 bg-white"
      >
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16 items-start">

            {/* Left — photo + code badge */}
            <motion.aside {...fadeUp(0)} className="lg:col-span-2">
              {/* Photo card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#082c2c]/15 aspect-[3/3] max-w-sm mx-auto  bg-[#0e4a4a]">
                {hasPhoto ? (
                  <Image
                    src={unit.photo}
                    alt={`${unit.head ?? unit.short} — ${unit.headTitle}, NSSEC`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 80vw, 38vw"
                    priority
                  />
                ) : (
                  <InitialsAvatar name={unit.head ?? unit.code} />
                )}

                {/* "Photo pending" badge */}
                {!hasPhoto && (
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] bg-black/35 text-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
                      Photo pending
                    </span>
                  </div>
                )}

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#082c2c]/92 via-[#082c2c]/60 to-transparent px-6 py-7">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#24c2c2]/80 mb-1">
                    {unit.headTitle}
                  </p>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight" id="unit-overview-heading">
                    {hasHead ? unit.head : "Head of Unit"}
                  </h2>
                  <a
                    href={`mailto:${unit.email}`}
                    className="inline-flex items-center gap-1.5 mt-2 text-xs text-white/55 hover:text-white transition-colors"
                    aria-label={`Email ${unit.short}`}
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{unit.email}</span>
                  </a>
                </div>
              </div>

              {/* Code badge card */}
              <motion.div
                {...fadeUp(0.15)}
                className="mt-5 bg-[#082c2c] rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-[#082c2c]/20"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#24c2c2]/15 border border-[#24c2c2]/25 flex items-center justify-center">
                  <span className="text-[#24c2c2] font-black text-sm tracking-wide">
                    {unit.code}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-white/35 uppercase tracking-widest mb-0.5">
                    Full Name
                  </p>
                  <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                    {unit.name}
                  </p>
                </div>
              </motion.div>
            </motion.aside>

            {/* Right — content */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-3 space-y-8">

              {/* Code pill + unit name + description */}
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full bg-[#24c2c2]/10 text-[#24c2c2]">
                  {unit.code}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {unit.name}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {unit.description}
                </p>
              </div>

              {/* Mandate box */}
              <div className="rounded-2xl p-6 border border-[#24c2c2]/20 bg-[#24c2c2]/5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-[#24c2c2] shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#24c2c2]">
                    Mandate
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{unit.mandate}</p>
              </div>

              {/* Contact card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Unit Email
                  </p>
                  <a
                    href={`mailto:${unit.email}`}
                    className="text-sm font-semibold text-[#1a8080] hover:text-[#24c2c2] transition-colors"
                  >
                    {unit.email}
                  </a>
                </div>
                <a
                  href={`mailto:${unit.email}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#082c2c] px-5 py-2.5 rounded-xl hover:bg-[#0e4a4a] transition-colors shrink-0"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Send Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Stats strip */}
      <StatsStrip stats={unit.stats} />

      {/* 4. Key Responsibilities */}
      {unit.functions?.length > 0 && (
        <section
          aria-labelledby="responsibilities-heading"
          className="py-16 sm:py-20 bg-gray-50/60"
        >
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div {...fadeUp(0)} className="mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#24c2c2] mb-3">
                Operations
              </span>
              <h2
                id="responsibilities-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900"
              >
                Key Responsibilities
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {unit.functions.map((fn, i) => {
                /* Support both string[] and {title,desc}[] shapes */
                const isStr = typeof fn === "string";
                const title = isStr ? null : fn.title;
                const desc = isStr ? fn : fn.desc ?? fn.description ?? "";

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-16px" }}
                    transition={{ duration: 0.42, delay: Math.min(i * 0.06, 0.42) }}
                    whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(8,44,44,0.09)" }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 transition-shadow duration-300 cursor-default"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-[#24c2c2]/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-[#24c2c2]" />
                    </div>
                    <div className="min-w-0">
                      {title && (
                        <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                          {title}
                        </h3>
                      )}
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Programs / Initiatives */}
      {unit.programs?.length > 0 && (
        <section
          aria-labelledby="programs-heading"
          className="py-16 sm:py-20 bg-white"
        >
          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
            <motion.div {...fadeUp(0)} className="mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#24c2c2] mb-3">
                Impact
              </span>
              <h2
                id="programs-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900"
              >
                Programmes &amp; Initiatives
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {unit.programs.map((prog, i) => {
                const name = prog.name ?? prog.title ?? "";
                const desc = prog.desc ?? prog.description ?? "";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-16px" }}
                    transition={{ duration: 0.42, delay: Math.min(i * 0.07, 0.42) }}
                    whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(8,44,44,0.09)" }}
                    className="rounded-2xl p-6 border border-[#24c2c2]/20 bg-[#24c2c2]/5 transition-shadow duration-300 cursor-default"
                  >
                    {/* Accent bar */}
                    <div className="h-[3px] w-9 rounded-full bg-[#24c2c2] mb-5" />
                    <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
                      {name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA */}
      <section className="py-16 bg-gradient-to-br from-[#082c2c] to-[#1a8080]">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          >
            {/* Text */}
            <div className="max-w-lg">
              <div className="h-[3px] w-10 rounded-full bg-[#24c2c2] mb-5" />
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Get in Touch with {unit.short}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                For enquiries, collaborations or information relating to the{" "}
                {unit.name}, contact the unit directly via email.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 shrink-0">
              <motion.a
                href={`mailto:${unit.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#24c2c2] px-6 py-3 rounded-xl hover:bg-[#1a8080] transition-colors shadow-lg shadow-[#24c2c2]/20"
              >
                <Mail className="h-4 w-4" />
                {unit.email}
              </motion.a>

              <Link
                href="/unit"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 border border-white/20 px-5 py-3 rounded-xl hover:border-white/50 hover:text-white transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                All Units
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default UnitDetail;
