"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield, Cpu, Users2, BookOpenCheck, TrendingUp, Megaphone, ArrowRight,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const PROGRAMS = [
  {
    icon: Shield,
    title: "Safe School Initiative",
    excerpt: "Securing every learning environment — physical safety, crisis response, and child protection standards in all schools.",
    href: "/programs/safe-school",
    tag: "Safety",
  },
  {
    icon: BookOpenCheck,
    title: "TVET Programme",
    excerpt: "Technical and Vocational Education bridging academic learning with industry-ready skills for tomorrow's workforce.",
    href: "/programs/tvet",
    tag: "Skills",
  },
  {
    icon: Cpu,
    title: "Robotics & AI",
    excerpt: "Embedding 21st-century digital competencies through hands-on robotics, coding and artificial intelligence curricula.",
    href: "/programs/robotics-ai",
    tag: "Technology",
  },
  {
    icon: Users2,
    title: "Reskilling Teachers",
    excerpt: "Equipping educators with modern pedagogical skills, subject mastery, and digital tools to lead quality classrooms.",
    href: "/programs/reskilling-teachers",
    tag: "Capacity",
  },
  {
    icon: TrendingUp,
    title: "Monitoring Learning",
    excerpt: "Data-driven assessment frameworks that track learning outcomes and guide evidence-based education policy.",
    href: "/programs/monitoring-learning",
    tag: "Assessment",
  },
  {
    icon: Megaphone,
    title: "Advocacy & Sensitization",
    excerpt: "Mobilizing communities, parents, and state governments around the importance of quality secondary education.",
    href: "/programs/advocacy-sensitization",
    tag: "Outreach",
  },
];

export default function ProgramsPreview() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div {...fade()}>
            <p className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-3">Our Programmes</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Transforming Education
              <span className="text-[#24c2c2]"> Through Action</span>
            </h2>
          </motion.div>
          <motion.div {...fade(0.1)}>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-[#24c2c2] font-semibold text-sm border border-[#24c2c2]/30 px-5 py-2.5 rounded-xl hover:bg-[#24c2c2] hover:text-white hover:border-[#24c2c2] transition-all duration-300 whitespace-nowrap"
            >
              All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                {...fade(i * 0.07)}
              >
                <Link href={p.href} className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#24c2c2]/30 transition-all duration-300">
                  {/* Accent top bar */}
                  <div className="h-1.5 bg-[#24c2c2] w-full group-hover:w-full transition-all duration-500 origin-left" />

                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center group-hover:bg-[#24c2c2] transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#24c2c2] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-xs font-semibold text-[#24c2c2] bg-[#24c2c2]/8 px-3 py-1 rounded-full">
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#24c2c2] transition-colors">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-grow">{p.excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-5 text-sm text-[#24c2c2] font-semibold">
                      Learn More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
