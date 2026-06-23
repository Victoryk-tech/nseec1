"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import AboutHero from "./AboutHero";

/* ── Data from official staff record ── */
const EXECUTIVE = {
  name: "Dr. Iyela Ajayi, FNIM, FMIC",
  title: "Executive Secretary",
  department: "National Senior Secondary Education Commission (NSSEC)",
  email: "es@nssec.gov.ng",
  photo: "/about/Iyela-Ajayi.png",
};

const DEPARTMENT_HEADS = [
  {
    name: "Rabia Umar Muhammad",
    title: "Head, Quality Assurance Department",
    department: "Directorate of Education Quality Assurance (DEQA)",
    email: "deqa@nssec.gov.ng",
    photo: "/about/rabia.jpg",
    code: "DEQA",
  },
  {
    name: "Mr. Saleh Bature",
    title: "Head, Human Resource Management",
    department: "Human Resource Management Department",
    email: "hrm@nssec.gov.ng",
    photo: "/about/bature.jpg",
    code: "HRM",
  },
  {
    name: "Salihu Bukar Malgwi",
    title: "Head, Finance & Accounts",
    department: "Directorate of Finance & Accounts (DFA)",
    email: "dfa@nssec.gov.ng",
    photo: "/about/salihu-bukar.jpeg",
    code: "DFA",
  },
  {
    name: "Usman Abubakar Bokani",
    title: "Head, Planning, Research & Statistics",
    department: "Directorate of Planning, Research & Statistics (DPRS)",
    email: "dprs@nssec.gov.ng",
    photo: "/about/usman.jpg",
    code: "DPRS",
  },
  {
    name: "Mohammed Salihu",
    title: "Head, Teacher Development & Int'l Partnership",
    department: "Teacher Development & International Partnership (TD&IP)",
    email: "tdip@nssec.gov.ng",
    photo: "/about/salihu.jpg",
    code: "TD&IP",
  },
  // {
  //   name: "Arc. Maimuna Umar, FNIA",
  //   title: "Head, Physical Planning Department",
  //   department: "Physical Planning Department (PPD)",
  //   email: "ppd@nssec.gov.ng",
  //   photo: "/about/arc-maimuna-umar.jpg",
  //   code: "PPD",
  // },
];

const UNIT_HEADS = [
  {
    name: "Okwori Mary Favour",
    title: "Head, Reform Coordination (SERVICOM & ACTU)",
    department: "Reform Development & SERVICOM Unit",
    email: "reform_dev@nssec.gov.ng",
    photo: "/about/mary.jpg",
    code: "REFORM",
  },
  {
    name: "Barr. (Mrs) Maryam Sidi Ali",
    title: "Head, Legal Unit",
    department: "Legal Unit",
    email: "legal@nssec.gov.ng",
    photo: "/about/Maryam-Sidi-Ali.jpeg",
    code: "LEGAL",
  },
  {
    name: "Fatima Bappare",
    title: "Head, Press, Publication & Protocol",
    department: "Press & Protocol Unit",
    email: "press@nssec.gov.ng",
    photo: "/about/fati.jpg",
    code: "PRESS",
  },
  {
    name: "Aduku Alexander Ojonim",
    title: "Head, Internal Audit Unit",
    department: "Internal Audit Unit",
    email: "Internal_audit@nssec.gov.ng",
    photo: "/about/aduku.jpg",
    code: "AUDIT",
  },
  {
    name: "Arc. Maimuna Umar, FNIA",
    title: "Head, Physical Planning Unit",
    department: "Physical Planning Unit",
    email: "ppd@nssec.gov.ng",
    photo: "/about/arc-maimuna-umar.jpg",
    code: "PPD",
  },
  {
    name: "Abdulazeez Abdulkadeer Maikanti",
    title: "Head, Procurement Unit",
    department: "Procurement Unit",
    email: "procurement@nssec.gov.ng",
    photo: "/about/josiah.jpg",
    code: "PROC",
  },
];

/* ── Placeholder avatar with initials ── */
const InitialsAvatar = ({ name, color = "#24c2c2", size = "full" }) => {
  const initials = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`${size === "full" ? "h-full w-full" : "h-full w-full"} flex items-center justify-center`}
      style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)` }}
      aria-hidden="true"
    >
      <span
        className="text-white font-black select-none"
        style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}
      >
        {initials}
      </span>
    </div>
  );
};

/* ── Team member card (portrait layout) ── */
const MemberCard = ({ member, color = "#24c2c2", index }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-16px" }}
    transition={{ duration: 0.44, delay: Math.min(index * 0.06, 0.42) }}
    whileHover={{ y: -6, boxShadow: "0 22px 48px rgba(0,0,0,0.10)" }}
    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 flex flex-col"
    itemScope
    itemType="https://schema.org/Person"
  >
    {/* Photo */}
    <div className="relative aspect-[3/3.5]">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name} — ${member.title}, NSSEC`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 22vw"
        />
      ) : (
        <InitialsAvatar name={member.name} color={color} />
      )}
      {!member.photo && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <span className="text-[10px] bg-black/30 text-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
            Photo pending
          </span>
        </div>
      )}
      {/* Code badge */}
      <span
        className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white backdrop-blur-sm"
        style={{ background: `${color}cc` }}
      >
        {member.code}
      </span>
    </div>

    {/* Info */}
    <div className="p-5 flex flex-col flex-1">
      <h3
        className="text-sm font-bold text-gray-900 leading-snug mb-1"
        itemProp="name"
      >
        {member.name}
      </h3>
      <p
        className="text-xs font-semibold mb-1"
        style={{ color }}
        itemProp="jobTitle"
      >
        {member.title}
      </p>
      <p
        className="text-[11px] text-gray-400 mb-4 flex-1 leading-snug"
        itemProp="memberOf"
      >
        {member.department}
      </p>
      <a
        href={`mailto:${member.email}`}
        className="flex items-center gap-1.5 text-xs font-medium hover:underline transition-colors mt-auto"
        style={{ color }}
        aria-label={`Email ${member.name}`}
        itemProp="email"
      >
        <Mail className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{member.email}</span>
      </a>
    </div>
  </motion.article>
);

/* ── Section header ── */
const SectionHead = ({ id, color, title, count }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.42 }}
    className="flex items-center gap-4 mb-8"
  >
    <div className="h-[3px] w-8 rounded-full" style={{ background: color }} />
    <h2 id={id} className="text-2xl font-bold text-gray-900">
      {title}
    </h2>
    {/* <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
      {count} member{count !== 1 ? "s" : ""}
    </span> */}
  </motion.div>
);

/* ── Page component ── */
const ManagingTeam = () => (
  <main itemScope itemType="https://schema.org/Organization">
    <meta
      itemProp="name"
      content="National Senior Secondary Education Commission"
    />

    <AboutHero
      title="Managing Team"
      subtitle="Meet the dedicated professionals driving NSSEC's mission — from the Executive Secretary to department directors and unit heads."
      breadcrumb={[
        { label: "About", path: "/about" },
        { label: "Managing Team" },
      ]}
    />

    <div className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
        {/* ── Executive Secretary ── */}
        <section aria-labelledby="es-section">
          <SectionHead
            id="es-section"
            color="#24c2c2"
            title="Executive Leadership"
            count={1}
          />

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-gradient-to-br from-[#082c2c] via-[#0e4a4a] to-[#1a8080] rounded-3xl overflow-hidden shadow-2xl"
            itemScope
            itemType="https://schema.org/Person"
          >
            {/* Photo */}
            <div className="lg:col-span-2 relative min-h-[340px] lg:min-h-[480px]">
              <Image
                src={EXECUTIVE.photo}
                alt={`${EXECUTIVE.name} — Executive Secretary, National Senior Secondary Education Commission`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#082c2c]/80 lg:block hidden" />
            </div>

            {/* Info */}
            <div className="lg:col-span-3 flex flex-col justify-center p-8 lg:p-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#24c2c2] mb-3">
                Executive Secretary
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-white mb-2 leading-tight"
                itemProp="name"
              >
                {EXECUTIVE.name}
              </h2>
              <p className="text-white/60 text-sm mb-6" itemProp="memberOf">
                {EXECUTIVE.department}
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
                The Executive Secretary provides strategic leadership and policy
                direction for the Commission, coordinating all departments and
                units to deliver NSSEC&apos;s mandate of advancing senior
                secondary education across Nigeria.
              </p>
              <a
                href={`mailto:${EXECUTIVE.email}`}
                className="inline-flex items-center gap-2 w-fit text-sm font-semibold text-white border border-[#24c2c2]/50 hover:border-[#24c2c2] hover:bg-[#24c2c2]/10 rounded-xl px-5 py-2.5 transition-all duration-200"
                itemProp="email"
              >
                <Mail className="h-4 w-4 text-[#24c2c2]" />
                {EXECUTIVE.email}
              </a>
            </div>
          </motion.article>
        </section>

        {/* ── Department Heads ── */}
        <section aria-labelledby="dept-heads-section">
          <SectionHead
            id="dept-heads-section"
            color="#0891b2"
            title="Department Heads"
            count={DEPARTMENT_HEADS.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
            {DEPARTMENT_HEADS.map((m, i) => (
              <MemberCard
                key={m.email + i}
                member={m}
                color="#0891b2"
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ── Unit Heads ── */}
        <section aria-labelledby="unit-heads-section">
          <SectionHead
            id="unit-heads-section"
            color="#0d9488"
            title="Unit Heads"
            count={UNIT_HEADS.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
            {UNIT_HEADS.map((m, i) => (
              <MemberCard
                key={m.email + m.code + i}
                member={m}
                color="#0d9488"
                index={i}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  </main>
);

export default ManagingTeam;
