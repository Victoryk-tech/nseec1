"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const STATS = [
  { value: "10,000+", label: "Schools Nationwide" },
  { value: "36", label: "States & FCT" },
  { value: "1M+", label: "Students Reached" },
  { value: "6,000+", label: "Teachers Trained" },
];

const BADGES = [
  "Standards & Regulation",
  "Infrastructure Funding",
  "Capacity Building",
];

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#24c2c2]/5 rounded-full translate-x-1/2 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#082c2c]/4 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#24c2c2]/3 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 py-14 sm:py-16 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#24c2c2]/10 text-[#24c2c2] text-sm font-semibold px-4 py-2 rounded-full mb-7"
            >
              <span className="w-2 h-2 bg-[#24c2c2] rounded-full animate-pulse" />
              Federal Commission · Established 2022
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6"
            >
              Elevating
              <span className="text-[#24c2c2] block">Secondary</span>
              Education
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg mb-8"
            >
              The National Senior Secondary Education Commission sets national standards,
              manages the education fund, and drives transformation across every
              senior secondary school in Nigeria.
            </motion.p>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {BADGES.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#24c2c2]" />
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link
                href="/about/nssec-in-brief"
                className="inline-flex items-center gap-2 bg-[#24c2c2] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#1da8a8] transition-all duration-300 shadow-lg shadow-[#24c2c2]/25 hover:shadow-[#24c2c2]/40 hover:-translate-y-0.5"
              >
                Discover NSSEC <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-xl font-semibold text-base hover:border-[#24c2c2] hover:text-[#24c2c2] transition-all duration-300"
              >
                Our Programs
              </Link>
            </motion.div>

            
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[460px] xl:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/students.jpg"
                alt="Nigerian students in a senior secondary school"
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082c2c]/70 via-[#082c2c]/10 to-transparent" />

              {/* Floating accreditation card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/96 backdrop-blur-md rounded-2xl p-5 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#24c2c2] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Federal Government Accredited</p>
                    <p className="text-xs text-gray-500">National Senior Secondary Education Commission</p>
                  </div>
                  <div className="ml-auto w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative frames */}
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-[#24c2c2]/8 rounded-3xl -z-10" />
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#082c2c]/8 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
