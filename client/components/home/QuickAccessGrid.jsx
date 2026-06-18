"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen, BarChart3, Building2, GraduationCap,
  FolderOpen, FileText, FlaskConical, Globe, ArrowRight,
} from "lucide-react";

const ITEMS = [
  {
    icon: BookOpen,
    title: "Publications",
    desc: "Journals, reports, policy documents and official publications",
    href: "/publications",
  },
  {
    icon: BarChart3,
    title: "Education Data",
    desc: "National statistics, enrolment figures and school demographics",
    href: "/statistics",
  },
  {
    icon: FolderOpen,
    title: "Projects",
    desc: "Constituency and NSSEC-funded construction projects nationwide",
    href: "/projects/constituency-projects",
  },
  {
    icon: Building2,
    title: "Departments",
    desc: "Divisions and departments driving our institutional mandate",
    href: "/departments",
  },
  {
    icon: GraduationCap,
    title: "Programs",
    desc: "National programmes supporting teachers, schools and students",
    href: "/programs",
  },
  {
    icon: FlaskConical,
    title: "Research",
    desc: "Educational research, learning assessments and demographics data",
    href: "/demographics",
  },
  {
    icon: FileText,
    title: "Establishment Act",
    desc: "The legal framework establishing NSSEC and its powers",
    href: "/publications/establishment-act",
  },
  {
    icon: Globe,
    title: "Media & News",
    desc: "Press releases, news headlines and photo gallery",
    href: "/media",
  },
];

export default function QuickAccessGrid() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-3">Quick Access</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Explore NSSEC
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Navigate directly to key areas of the Commission&apos;s work and resources.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Link href={item.href} className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#24c2c2]/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-11 h-11 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#24c2c2] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#24c2c2] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#24c2c2] transition-colors">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-grow">{item.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs text-[#24c2c2] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-3 h-3" />
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
