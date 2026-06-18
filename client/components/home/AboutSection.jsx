"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const HIGHLIGHTS = [
  "Quality Assurance & Standards",
  "Global Educational Benchmarks",
  "Innovative Learning Solutions",
  "Capacity Building Programmes",
  "Policy Formulation",
  "Stakeholder Collaboration",
];

const IMAGES = [
  { src: "/kas1.jpg", alt: "NSSEC school inspection" },
  { src: "/senlawani.jpg", alt: "NSSEC stakeholder engagement" },
  { src: "/gather.jpg", alt: "NSSEC community gathering" },
];

export default function AboutSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Top: two-column text + image */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-20">
          {/* Left — text */}
          <div>
            <motion.p {...fade()} className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-3">
              Who We Are
            </motion.p>
            <motion.h2 {...fade(0.08)} className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
              Nigeria&apos;s Apex Body for
              <span className="text-[#24c2c2]"> Senior Secondary</span> Education
            </motion.h2>
            <motion.p {...fade(0.16)} className="text-lg text-gray-600 leading-relaxed mb-5">
              The National Senior Secondary Education Commission (NSSEC) is the federal regulatory
              body established to oversee and elevate the quality of senior secondary education
              in Nigeria. Our mandate bridges the critical gap between basic and tertiary education,
              preparing every student for global competitiveness.
            </motion.p>
            <motion.p {...fade(0.22)} className="text-base text-gray-500 leading-relaxed mb-8">
              Founded with the mandate to standardize, fund, and advise on all critical aspects of
              senior secondary education, NSSEC drives policy formulation, strategic funding,
              capacity building, quality assurance, and partnerships with state governments,
              development partners, and the private sector.
            </motion.p>

            {/* Highlights grid */}
            <motion.div {...fade(0.3)} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {HIGHLIGHTS.map((h) => (
                <div key={h} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#24c2c2] shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{h}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fade(0.38)}>
              <Link
                href="/about/nssec-in-brief"
                className="inline-flex items-center gap-2 text-[#24c2c2] font-semibold group"
              >
                Read the Full Story
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right — stacked images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative h-[440px] w-full rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/secondary.jpeg"
                alt="Senior secondary students"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082c2c]/50 to-transparent" />
            </div>

            {/* Vision card overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-8 -left-6 sm:-left-10 bg-[#082c2c] text-white rounded-2xl p-6 w-64 shadow-2xl"
            >
              <div className="h-0.5 w-8 bg-[#24c2c2] rounded mb-4" />
              <p className="text-sm font-bold mb-2">Our Vision</p>
              <p className="text-xs text-white/65 leading-relaxed">
                To position Nigeria&apos;s senior secondary education as a model for sustainable
                growth aligned with global trends in science and technology.
              </p>
            </motion.div>

            {/* Decoration */}
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#24c2c2]/8 rounded-3xl -z-10" />
          </motion.div>
        </div>

        {/* Bottom: 3-image row */}
        <div className="grid md:grid-cols-3 gap-6">
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative h-60 w-full rounded-2xl overflow-hidden shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#082c2c]/20 hover:bg-[#082c2c]/0 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
