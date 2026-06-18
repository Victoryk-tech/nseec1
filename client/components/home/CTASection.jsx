"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Main CTA card */}
        <div className="relative bg-[#082c2c] rounded-3xl overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0">
            <Image
              src="/children2.jpeg"
              alt="Students"
              fill
              className="object-cover opacity-15"
              sizes="100vw"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#24c2c2]/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#24c2c2]/8 rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-10 sm:p-14 lg:p-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-0.5 w-10 bg-[#24c2c2] rounded mb-6" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                Ready to Transform
                <span className="text-[#24c2c2]"> Education</span> in Nigeria?
              </h2>
              <p className="text-white/65 text-lg leading-relaxed max-w-lg mb-8">
                Join NSSEC in its mission to elevate Nigeria&apos;s senior secondary education system.
                Whether you&apos;re an educator, policymaker, development partner, or stakeholder —
                there&apos;s a role for you in our vision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#24c2c2] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1da8a8] transition-all duration-300 shadow-lg shadow-[#24c2c2]/30 hover:-translate-y-0.5"
                >
                  Get Involved <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-8 py-4 rounded-xl font-semibold hover:border-[#24c2c2] hover:text-[#24c2c2] transition-all duration-300"
                >
                  <Mail className="w-4 h-4" /> Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Right — feature list */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {[
                { label: "Partner with Us", desc: "Collaborate on programmes and joint funding initiatives" },
                { label: "Report to NSSEC", desc: "Submit school data, compliance reports and assessments" },
                { label: "Access Publications", desc: "Download official documents, reports and policy papers" },
                { label: "Stay Informed", desc: "Subscribe to NSSEC updates, news and announcements" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/8 border border-white/12 rounded-2xl p-5 hover:bg-white/15 transition-colors duration-300"
                >
                  <p className="font-bold text-white text-sm mb-1.5">{item.label}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
