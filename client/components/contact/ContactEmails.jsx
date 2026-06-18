"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Briefcase, UserCheck, Star,
  Banknote, BarChart2, GraduationCap, Landmark,
  Users, BookOpen, RefreshCw, Newspaper,
  Monitor, Package, Scale, ClipboardCheck,
  Calculator, Mail, Copy, Check, Search, ChevronDown, MessageSquare,
} from "lucide-react";

/* ─────────────────── NSSEC colour tokens ─────────────────── */
// All three groups stay in the NSSEC teal / cyan family.
// Primary  : #24c2c2  (brand teal)
// Secondary: #0891b2  (cyan-600  – blue-leaning teal)
// Tertiary : #0d9488  (teal-600  – green-leaning teal)

const departments = [
  {
    group: "Leadership & Management",
    gradientFrom: "#24c2c2",
    gradientTo: "#1ea8a8",
    lightBg: "bg-[#24c2c2]/8",
    iconCls: "text-[#24c2c2]",
    badgeCls: "bg-[#24c2c2]/10 text-[#1a9898]",
    items: [
      { code: "NSSEC",   name: "NSSEC General",               designation: "General Enquiries",                        email: "admin@nssec.gov.ng",        icon: Building2   },
      { code: "ES",      name: "Executive Secretary",          designation: "Office of the Executive Secretary",        email: "es@nssec.gov.ng",           icon: Briefcase   },
      { code: "PA-ES",   name: "PA to Executive Secretary",    designation: "Personal Assistant to the ES",             email: "pa_es@nssec.gov.ng",        icon: UserCheck   },
      { code: "MIN-DEL", name: "Ministerial Deliverables",     designation: "Ministerial Deliverables Unit",            email: "min_deliverables@nssec.gov.ng", icon: Star   },
    ],
  },
  {
    group: "Directorates",
    gradientFrom: "#0891b2",
    gradientTo: "#0e7490",
    lightBg: "bg-cyan-50",
    iconCls: "text-cyan-600",
    badgeCls: "bg-cyan-100 text-cyan-700",
    items: [
      { code: "DFA",    name: "Finance & Accounts",              designation: "Directorate of Finance & Accounts",              email: "dfa@nssec.gov.ng",    icon: Banknote      },
      { code: "DPRS",   name: "Planning, Research & Statistics", designation: "Directorate of Planning, Research & Statistics",  email: "dprs@nssec.gov.ng",   icon: BarChart2     },
      { code: "DEQA",   name: "Education Quality Assurance",     designation: "Directorate of Education Quality Assurance",     email: "deqa@nssec.gov.ng",   icon: GraduationCap },
      { code: "PPD",    name: "Physical Planning",               designation: "Physical Planning Department",                   email: "ppd@nssec.gov.ng",    icon: Landmark      },
      { code: "BUDGET", name: "Budget",                          designation: "Deputy Director — Budget",                       email: "budget@nssec.gov.ng", icon: Calculator    },
    ],
  },
  {
    group: "Units & Departments",
    gradientFrom: "#0d9488",
    gradientTo: "#0f766e",
    lightBg: "bg-teal-50",
    iconCls: "text-teal-600",
    badgeCls: "bg-teal-100 text-teal-700",
    items: [
      { code: "HRM",    name: "Human Resource Management",          designation: "Human Resource Management Unit",                    email: "hrm@nssec.gov.ng",          icon: Users          },
      { code: "TD&IP",  name: "Teacher Dev & Int'l Partnership",    designation: "Teacher Development & International Partnership",   email: "tdip@nssec.gov.ng",         icon: BookOpen       },
      { code: "REFORM", name: "Reform Dev & SERVICOM",              designation: "Reform Development & SERVICOM Unit",               email: "reform_dev@nssec.gov.ng",   icon: RefreshCw      },
      { code: "PRESS",  name: "Press & Protocol",                   designation: "Press & Protocol Unit",                            email: "press@nssec.gov.ng",        icon: Newspaper      },
      { code: "ICT",    name: "ICT Unit",                           designation: "Information & Communication Technology Unit",      email: "ict_unit@nssec.gov.ng",     icon: Monitor        },
      { code: "PROC",   name: "Procurement",                        designation: "Procurement Unit",                                 email: "procurement@nssec.gov.ng",  icon: Package        },
      { code: "LEGAL",  name: "Legal Unit",                         designation: "Legal Unit",                                       email: "legal@nssec.gov.ng",        icon: Scale          },
      { code: "AUDIT",  name: "Internal Audit",                     designation: "Internal Audit Unit",                              email: "Internal_audit@nssec.gov.ng", icon: ClipboardCheck },
    ],
  },
];

/* ─────────────────── DeptCard ─────────────────── */

const DeptCard = ({ item, iconCls, lightBg, badgeCls, index }) => {
  const [copied, setCopied] = useState(false);
  const { icon: Icon, code, name, designation, email } = item;

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.38, delay: index * 0.055 }}
      whileHover={{ y: -4, boxShadow: "0 14px 36px rgba(0,0,0,0.08)" }}
      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 transition-shadow duration-300"
    >
      {/* Top row: icon + code badge */}
      <div className="flex items-start justify-between gap-2">
        <div className={`shrink-0 ${lightBg} p-2.5 rounded-xl`}>
          <Icon className={`h-5 w-5 ${iconCls}`} />
        </div>
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full whitespace-nowrap ${badgeCls}`}>
          {code}
        </span>
      </div>

      {/* Name + designation */}
      <div className="flex-1 min-h-[2.5rem]">
        <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5 leading-snug line-clamp-2">{designation}</p>
      </div>

      {/* Email row */}
      <div className="flex items-center gap-2 pt-1.5 border-t border-gray-100">
        <a
          href={`mailto:${email}`}
          className={`flex-1 min-w-0 flex items-center gap-1.5 text-xs font-medium ${iconCls} hover:underline`}
          title={`Email ${name}`}
        >
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{email}</span>
        </a>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.85 }}
          title="Copy email"
          className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.16 }}>
                <Check className="h-3.5 w-3.5 text-green-500" />
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.16 }}>
                <Copy className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ─────────────────── GroupSection ─────────────────── */

const GroupSection = ({ group, gradientFrom, gradientTo, lightBg, iconCls, badgeCls, items, filter }) => {
  const [collapsed, setCollapsed] = useState(false);

  const filtered = filter
    ? items.filter(
        (d) =>
          d.name.toLowerCase().includes(filter) ||
          d.designation.toLowerCase().includes(filter) ||
          d.email.toLowerCase().includes(filter) ||
          d.code.toLowerCase().includes(filter)
      )
    : items;

  if (filtered.length === 0) return null;

  return (
    <div className="mb-10">
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between mb-5 group text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-1 w-7 rounded-full"
            style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
          />
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
            {group}
          </h3>
          <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {filtered.length}
          </span>
        </div>
        <motion.div animate={{ rotate: collapsed ? -90 : 0 }} transition={{ duration: 0.22 }} className="text-gray-400">
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <DeptCard
                  key={item.email}
                  item={item}
                  iconCls={iconCls}
                  lightBg={lightBg}
                  badgeCls={badgeCls}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────── main export ─────────────────── */

const ContactEmails = ({ onSwitchToForm }) => {
  const [query, setQuery] = useState("");
  const filter = query.trim().toLowerCase();
  const total = departments.reduce((a, g) => a + g.items.length, 0);

  const isEmpty =
    !!filter &&
    departments.every((g) =>
      g.items.every(
        (d) =>
          !d.name.toLowerCase().includes(filter) &&
          !d.designation.toLowerCase().includes(filter) &&
          !d.email.toLowerCase().includes(filter) &&
          !d.code.toLowerCase().includes(filter)
      )
    );

  return (
    <section className="py-16 bg-gray-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-[#24c2c2] uppercase tracking-widest mb-3">
            Direct Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Contact a Department
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Browse all{" "}
            <span className="font-semibold text-gray-700">{total} departments & units</span>.
            Click any email to open your mail client, or copy it to your clipboard.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mt-7">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search departments, units or emails…"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2] text-sm bg-white placeholder-gray-400 transition-all duration-200 shadow-sm"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 text-base leading-none"
                >
                  ✕
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Department groups ── */}
        {!isEmpty &&
          departments.map((g) => (
            <GroupSection key={g.group} {...g} filter={filter} />
          ))}

        {/* Empty state */}
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-400"
          >
            <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No departments matched &ldquo;{query}&rdquo;</p>
            <button
              onClick={() => setQuery("")}
              className="mt-3 text-xs text-[#24c2c2] hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* ── Back-to-form CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl px-7 py-6 border border-gray-100 shadow-sm"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Prefer a guided form instead?
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Use our contact form to send a message to the general admin inbox.
            </p>
          </div>
          <motion.button
            onClick={onSwitchToForm}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#24c2c2] to-[#1ea8a8] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#24c2c2]/25 hover:shadow-lg hover:shadow-[#24c2c2]/35 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:ring-offset-2"
          >
            <MessageSquare className="h-4 w-4" />
            Send a Message
          </motion.button>
        </motion.div>

        {/* Tip */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Click any email address to open your mail client — or use the copy icon.
        </p>
      </div>
    </section>
  );
};

export default ContactEmails;
