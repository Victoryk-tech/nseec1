"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2, HardHat, CheckCircle2, Wrench, BookOpen, Wifi,
  DoorOpen, Shield, LayoutGrid, FlaskConical, Users, TrendingUp,
} from "lucide-react";
import AboutHero from "@/components/about/AboutHero";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const INTERVENTIONS = [
  {
    school: "Government Secondary School, Koton-Karfi",
    state: "Kogi State",
    zone: "North Central",
    status: "Ongoing",
    summary:
      "A comprehensive multi-scope intervention encompassing administrative infrastructure, modern science facilities, and expanded classroom capacity at Koton-Karfi.",
    works: [
      { icon: Building2, label: "Admin Block", detail: "Full construction of an administrative block providing dedicated offices for school management and staff" },
      { icon: FlaskConical, label: "Laboratory / ICT Block", detail: "New-build combined laboratory and ICT block equipped for science practicals and digital learning" },
      { icon: LayoutGrid, label: "6NR Classroom Block", detail: "Construction of a six-classroom block to relieve overcrowding and improve the learning environment" },
      { icon: Wrench, label: "Laboratory Interior Works", detail: "Interior fit-out of the laboratory including benching, drainage, safety fixtures, and ventilation" },
    ],
    gallery: [
      {
        label: "Admin Block",
        images: [
          { src: "/projects/koton-karfi-ADMIN-BLOCK.png", alt: "Admin block construction, Koton-Karfi" },
        ],
      },
      {
        label: "Laboratory / ICT Block",
        images: [
          { src: "/projects/koton-karfi-LABORATORY-ICT%20BLOCK.png", alt: "Laboratory and ICT block, Koton-Karfi" },
          { src: "/projects/koton-karfi-INTERIOR-OF-LABORATORY.png", alt: "Interior of laboratory, Koton-Karfi" },
        ],
      },
      {
        label: "6NR Classroom Block",
        images: [
          { src: "/projects/koton-karfi-6-NR-CLASSROOM-BLOCK.png", alt: "6NR classroom block, Koton-Karfi" },
          { src: "/projects/koton-karfi-SIDE-VIEW-OF-CLASSROOM-BLOCK%20png.png", alt: "Side view of classroom block, Koton-Karfi" },
          { src: "/projects/koton-karfi-classroom-interior-view.png", alt: "Classroom interior view, Koton-Karfi" },
        ],
      },
    ],
  },
  {
    school: "Our Lady of Lourdes Girls Grammar School",
    state: "Uromi, Edo State",
    zone: "South South",
    status: "Ongoing",
    summary:
      "An extensive rehabilitation and new-build programme covering classrooms, science facilities, ICT infrastructure, security perimeter, and school entrance at Uromi.",
    works: [
      { icon: Wrench, label: "Classroom Renovation", detail: "Multi-phase renovation of existing classrooms — re-roofing, plastering, flooring, windows, and painting" },
      { icon: FlaskConical, label: "4NR Laboratory Block", detail: "Construction of a four-laboratory block to support Physics, Chemistry, Biology, and integrated science" },
      { icon: Wifi, label: "ICT / E-Library Block", detail: "New ICT and E-Library facility with broadband-ready infrastructure to support digital learning and research" },
      { icon: DoorOpen, label: "School Gate", detail: "Construction of a secure, architecturally designed main entrance gate for the school compound" },
      { icon: Shield, label: "Perimeter Fence", detail: "Full perimeter fencing to secure the school grounds and protect students and facilities" },
    ],
    gallery: [
      {
        label: "Classroom Renovation",
        images: [
          { src: "/projects/our-lady-Renovation-of-Classroom.png", alt: "Classroom renovation, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Renovation-of-Classroom1.png", alt: "Classroom renovation progress, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Renovation-of-Classroom2.png", alt: "Classroom renovation — interior works, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Renovation-of-Classroom3.png", alt: "Classroom renovation completed view, Our Lady of Lourdes" },
        ],
      },
      {
        label: "4NR Laboratory Block",
        images: [
          { src: "/projects/our-lady-Construction-of-4NR-Laboratory-Block.png", alt: "Construction of 4NR laboratory block, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Construction-of-4NR-Laboratory-Block2.png", alt: "4NR laboratory block — structural progress, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Construction-of-4NR-Laboratory-Block3.png", alt: "4NR laboratory block — exterior view, Our Lady of Lourdes" },
        ],
      },
      {
        label: "ICT / E-Library Block",
        images: [
          { src: "/projects/our-lady-Construction-of-ICT-E-Library.png", alt: "ICT and E-Library block construction, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Construction-of-ICT-E-Library2.png", alt: "ICT and E-Library block — roofing works, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Construction-of-ICT-E-Library3.png", alt: "ICT and E-Library block — interior, Our Lady of Lourdes" },
          { src: "/projects/our-lady-Construction-of-ICT-E-Library4.png", alt: "ICT and E-Library block — completed view, Our Lady of Lourdes" },
        ],
      },
      {
        label: "School Gate & Perimeter Fence",
        images: [
          { src: "/projects/our-lady-School-Gate.png", alt: "School gate construction, Our Lady of Lourdes" },
          { src: "/projects/our-lady-School-Fence.png", alt: "Perimeter fence construction, Our Lady of Lourdes" },
          { src: "/projects/our-lady-School-Fence1.png", alt: "Perimeter fence — completed section, Our Lady of Lourdes" },
        ],
      },
    ],
  },
  {
    school: "Oyemekun Grammar School / Aquinas College",
    state: "Akure, Ondo State",
    zone: "South West",
    status: "Ongoing",
    summary:
      "Infrastructure and facility upgrade at one of Ondo State's most historic senior secondary schools — delivering new classroom capacity, a multipurpose hall, E-Library renovation, and improved site access.",
    works: [
      { icon: LayoutGrid, label: "12NR Classroom Block", detail: "Construction of a twelve-classroom block to expand learning capacity and decongest existing facilities" },
      { icon: Building2, label: "500-Capacity Multipurpose Hall", detail: "New-build 500-seat multipurpose hall for assemblies, examinations, and community events" },
      { icon: BookOpen, label: "E-Library Renovation", detail: "Full renovation of the E-Library including electrical rewiring, furniture, and digital infrastructure" },
      { icon: TrendingUp, label: "Road Grading & Levelling", detail: "Grading and levelling of access roads and internal school pathways to improve site movement" },
    ],
    gallery: [
      {
        label: "12NR Classroom Block",
        images: [
          { src: "/projects/onyemekun-Construction-of-12-NR-Classroom-Block.png", alt: "Construction of 12NR classroom block, Oyemekun Grammar School" },
          { src: "/projects/onyemekun-Construction-of-12-NR-Classroom-Block2.png", alt: "12NR classroom block — structural progress, Oyemekun Grammar School" },
        ],
      },
      {
        label: "500-Capacity Multipurpose Hall",
        images: [
          { src: "/projects/onyemekun-Construction-of-500-Capacity-Multipurpose-Hall.png", alt: "500-capacity multipurpose hall construction, Oyemekun Grammar School" },
          { src: "/projects/onyemekun-Construction-of-500-Capacity-Multipurpose-Hall2.png", alt: "Multipurpose hall — roofing works, Oyemekun Grammar School" },
          { src: "/projects/onyemekun-Construction-of-500-Capacity-Multipurpose-Hall3.png", alt: "Multipurpose hall — interior works, Oyemekun Grammar School" },
          { src: "/projects/onyemekun-Construction-of-500-Capacity-Multipurpose-Hall4.png", alt: "Multipurpose hall — near completion, Oyemekun Grammar School" },
        ],
      },
      {
        label: "E-Library Renovation",
        images: [
          { src: "/projects/oyemekun-renovation-of-e-library.png", alt: "E-Library renovation, Oyemekun Grammar School" },
          { src: "/projects/oyemekun-renovation-of-e-library2.png", alt: "E-Library renovation — interior progress, Oyemekun Grammar School" },
          { src: "/projects/oyemekun-renovation-of-e-library3.png", alt: "E-Library renovation — completed view, Oyemekun Grammar School" },
        ],
      },
      {
        label: "Road Grading & Levelling",
        images: [
          { src: "/projects/oyemekun-Road-grading-and-leveling.png", alt: "Road grading and levelling, Oyemekun Grammar School" },
          { src: "/projects/oyemekun-Road-grading-and-leveling1.png", alt: "Road grading — completed section, Oyemekun Grammar School" },
        ],
      },
    ],
  },
];

const STATS = [
  { value: "50+", label: "Schools Receiving Interventions" },
  { value: "6", label: "Geopolitical Zones Covered" },
  { value: "36", label: "States + FCT Reached" },
  { value: "3", label: "Documented Model Projects" },
];

export default function NSSECIntervention() {
  return (
    <div className="bg-white">
      <AboutHero
        title="NSSEC Intervention Projects"
        subtitle="Transforming learning environments across Nigeria — NSSEC's direct infrastructure interventions deliver modern classrooms, laboratories, ICT facilities, and safe school environments to senior secondary schools in every geopolitical zone."
        breadcrumb={[
          { label: "Projects", path: "/projects/constituency-projects" },
          { label: "NSSEC Intervention" },
        ]}
      />

      {/* Stats Bar */}
      <div className="bg-[#082c2c] text-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="py-8 px-6 text-center"
              >
                <p className="text-3xl font-extrabold text-[#24c2c2]">{s.value}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="max-w-3xl">
            <div className="h-[3px] w-12 bg-[#24c2c2] rounded-full mb-5" />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5">About NSSEC Interventions</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              The National Senior Secondary Education Commission (NSSEC) implements targeted infrastructure
              interventions in senior secondary schools across Nigeria. These projects — ranging from classroom
              rehabilitation and laboratory construction to ICT facility upgrades and security infrastructure —
              are designed to raise schools to national minimum standards, expand access to quality education,
              and create safe, stimulating learning environments for millions of Nigerian students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NSSEC Annex Building */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">NSSEC Annex Building</h2>
            </div>
            <p className="text-gray-500 max-w-2xl">
              The NSSEC Annex Building represents the Commission's investment in its own institutional
              infrastructure — a modern administrative facility to support the delivery of its expanding mandate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fade(0)} className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/projects/nssec-annex-building.jpg"
                  alt="NSSEC Annex Building — exterior view"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 bg-white">
                <p className="text-sm font-semibold text-gray-900 mb-1">Exterior View</p>
                <p className="text-xs text-gray-500">
                  The completed annex building with secured parking facilities and modern facade.
                </p>
              </div>
            </motion.div>

            <motion.div {...fade(0.1)} className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/projects/nssec-annex-building2.jpg"
                  alt="NSSEC Annex Building — site inspection team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5 bg-white">
                <p className="text-sm font-semibold text-gray-900 mb-1">Site Inspection</p>
                <p className="text-xs text-gray-500">
                  NSSEC leadership and technical team conducting a quality assurance inspection of the annex facility.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Annex description */}
          <motion.div {...fade(0.2)} className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Building2, title: "Modern Office Spaces", desc: "Purpose-built administrative offices supporting the Commission's day-to-day operations" },
              { icon: HardHat, title: "Quality Construction", desc: "Built to Federal Government standards with durable materials and professional site management" },
              { icon: Users, title: "Staff Welfare", desc: "Designed to provide a conducive, safe, and productive environment for NSSEC professional staff" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured School Interventions */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div {...fade()} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-[#24c2c2]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Featured School Interventions</h2>
            </div>
            <p className="text-gray-500 max-w-2xl">
              These documented projects illustrate the breadth and quality of NSSEC's infrastructure delivery — from new laboratory blocks and ICT facilities to classroom renovation and perimeter security.
            </p>
          </motion.div>

          <div className="space-y-12">
            {INTERVENTIONS.map((project, pi) => (
              <motion.div key={pi} {...fade(pi * 0.1)}>
                <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
                  {/* Project Header */}
                  <div className="bg-[#082c2c] px-6 sm:px-8 py-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <span className="inline-block text-xs font-semibold text-[#24c2c2] bg-[#24c2c2]/15 px-3 py-1 rounded-full mb-3">
                          {project.zone}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{project.school}</h3>
                        <p className="text-white/60 text-sm">{project.state}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {project.status}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mt-4 leading-relaxed max-w-2xl">{project.summary}</p>
                  </div>

                  {/* Works Grid */}
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
                      Scope of Works
                    </p>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      {project.works.map((work, wi) => {
                        const Icon = work.icon;
                        return (
                          <div key={wi} className="border border-gray-100 rounded-xl p-5 hover:border-[#24c2c2]/30 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center mb-3">
                              <Icon className="w-4 h-4 text-[#24c2c2]" />
                            </div>
                            <p className="font-semibold text-gray-900 text-sm mb-2">{work.label}</p>
                            <p className="text-xs text-gray-500 leading-relaxed">{work.detail}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="px-6 sm:px-8 pb-8">
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
                          Project Gallery
                        </p>
                        <div className="space-y-8">
                          {project.gallery.map((group, gi) => (
                            <div key={gi}>
                              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#24c2c2] shrink-0" />
                                {group.label}
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                                {group.images.map((img, ii) => (
                                  <div key={ii} className="rounded-xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition-shadow">
                                    <div className="relative aspect-[4/3] w-full">
                                      <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                      />
                                    </div>
                                    <div className="px-3 py-2">
                                      <p className="text-xs text-gray-500 leading-snug">{img.alt}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
            Constituency Projects Across Nigeria
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Explore the full list of 50 NSSEC construction projects covering all six geopolitical zones and 36 states.
          </p>
          <a
            href="/projects/constituency-projects"
            className="inline-flex items-center gap-2 bg-[#24c2c2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1da8a8] transition-colors"
          >
            View All Constituency Projects
          </a>
        </div>
      </section>
    </div>
  );
}
