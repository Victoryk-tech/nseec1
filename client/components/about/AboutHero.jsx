"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const AboutHero = ({ title, subtitle, breadcrumb = [] }) => (
  <section
    aria-label="Page hero"
    className="relative overflow-hidden bg-gradient-to-r from-[#082c2c] via-[#0e4a4a] to-[#1a8080] py-20 sm:py-28"
  >
    {/* Diagonal stripe texture */}
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-55deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)",
      }}
    />

    {/* Right glow */}
    <div
      aria-hidden="true"
      className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#24c2c2]/15 to-transparent pointer-events-none"
    />

    {/* Top-right circle accent */}
    <div
      aria-hidden="true"
      className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full border border-[#24c2c2]/10 pointer-events-none"
    />
    <div
      aria-hidden="true"
      className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full border border-[#24c2c2]/8 pointer-events-none"
    />

    {/* Bottom fade */}
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24c2c2]/35 to-transparent"
    />

    <div className="relative max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-white/50 text-xs mb-8"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 shrink-0" />
                {i === breadcrumb.length - 1 ? (
                  <span className="text-white/75 font-medium">{crumb.label}</span>
                ) : (
                  <Link href={crumb.path} className="hover:text-white/80 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Teal accent bar */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="h-[3px] w-14 bg-[#24c2c2] rounded-full mb-6"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-5 tracking-tight"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.2 }}
            className="text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  </section>
);

export default AboutHero;
