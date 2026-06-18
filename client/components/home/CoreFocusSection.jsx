"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FileCode2, TrendingUp, GraduationCap, Award, Users, Lightbulb, ArrowRight,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const AREAS = [
  {
    icon: FileCode2,
    title: "Policy Development",
    desc: "Establishing guidelines and policies to standardize and enhance senior secondary education across the nation.",
  },
  {
    icon: TrendingUp,
    title: "Funding Management",
    desc: "Administering the National Senior Secondary Education Fund to provide financial interventions for infrastructure and capacity development.",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    desc: "Equipping educators and administrators with the tools and training needed to deliver world-class education.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    desc: "Monitoring and assessing school performance to ensure compliance with national minimum standards for education delivery.",
  },
  {
    icon: Users,
    title: "Stakeholder Engagement",
    desc: "Collaborating with state governments, private sector partners, and international organisations to drive innovative solutions.",
  },
  {
    icon: Lightbulb,
    title: "Advisory Role",
    desc: "Providing strategic advice to the Federal Government on policy, resource allocation, and management of secondary education.",
  },
];

export default function CoreFocusSection() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Header */}
        <motion.div {...fade()} className="text-center mb-14">
          <p className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-3">Focus Areas</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Our Core Focus</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            A comprehensive and strategic approach to transforming secondary education across every dimension.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {AREAS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                {...fade(i * 0.07)}
                className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-[#24c2c2]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#24c2c2]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#24c2c2]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-3">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom feature row */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/classroom.jpeg"
              alt="Classroom innovation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#082c2c]/50 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="h-0.5 w-10 bg-[#24c2c2] rounded" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Transforming Education Through Innovation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our comprehensive approach combines policy development, strategic funding, and
              capacity building to create a robust educational ecosystem that prepares students
              for the opportunities and challenges of tomorrow&apos;s world.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-[#24c2c2] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#1da8a8] transition-all duration-300 shadow-md shadow-[#24c2c2]/20"
            >
              Explore Our Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
