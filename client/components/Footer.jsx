"use client";
import React from "react";
import {
  Twitter, Facebook, Instagram, Linkedin, Youtube,
  MapPin, Mail, Phone, Clock, ArrowRight, Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "./contexts/FormContext";

const SOCIAL = [
  { icon: Twitter, href: "https://twitter.com/nssec_ng", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/nssecng", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/nssec_ng", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/nssec-ng", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@nssec", label: "YouTube" },
];

const QUICK_LINKS = [
  { href: "/about/nssec-in-brief", label: "About NSSEC" },
  { href: "/about/mission-vision", label: "Mission & Vision" },
  { href: "/about/governing-board", label: "Governing Board" },
  { href: "/about/executive-secretary", label: "Executive Secretary" },
  { href: "/about/organogram", label: "Organogram" },
  { href: "/about/zonal-offices", label: "Zonal Offices" },
];

const PROGRAMME_LINKS = [
  { href: "/programs/safe-school", label: "Safe School Initiative" },
  { href: "/programs/tvet", label: "TVET Programme" },
  { href: "/programs/robotics-ai", label: "Robotics & AI" },
  { href: "/programs/reskilling-teachers", label: "Reskilling Teachers" },
  { href: "/programs/monitoring-learning", label: "Monitoring Learning" },
  { href: "/programs/advocacy-sensitization", label: "Advocacy & Sensitization" },
];

const RESOURCE_LINKS = [
  { href: "/publications", label: "Publications" },
  { href: "/statistics", label: "Education Data" },
  { href: "/publications/establishment-act", label: "Establishment Act" },
  { href: "/departments", label: "Departments" },
  { href: "/projects/constituency-projects", label: "Constituency Projects" },
  { href: "/media", label: "Media & News" },
];

const CONTACT_INFO = [
  { icon: MapPin, value: "Plot 14 Yobe Close, Maitama, Abuja, FCT" },
  { icon: Mail, value: "admin@nssec.gov.ng", href: "mailto:admin@nssec.gov.ng" },
  { icon: Phone, value: "+234 905 555 7119", href: "tel:+2349055557119" },
  { icon: Clock, value: "Mon – Fri: 8:00am – 5:00pm" },
];

function FooterLink({ href, label }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-[#24c2c2] text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group"
      >
        <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#24c2c2] transition-colors" />
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const {
    loading,
    handleSubscribe,
    message,
    isSuccess,
    email,
    setEmail,
    agreed,
    setAgreed,
    subscriberName,
    setSubscriberName,
  } = useFormContext();

  return (
    <footer className="bg-[#040e0e]">
      {/* ── Newsletter Banner ── */}
      <div className="bg-[#082c2c] border-b border-white/8">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 py-12 sm:py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <div className="h-0.5 w-10 bg-[#24c2c2] rounded mb-4" />
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Stay Informed with NSSEC
              </h3>
              <p className="text-white/55 text-base leading-relaxed max-w-md">
                Get the latest education news, policy updates, programme launches and
                official reports delivered directly to your inbox.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={subscriberName || ""}
                  onChange={(e) => setSubscriberName?.(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white text-sm placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent transition"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white text-sm placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="flex items-center gap-2.5 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    id="footer-agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 text-[#24c2c2] focus:ring-[#24c2c2] bg-white accent-[#24c2c2] focus:ring-2 focus:ring-offset-0"
                  />
                  <span className="text-xs text-white/45">
                    I agree to receive updates and newsletters from NSSEC
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                    loading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-[#24c2c2] text-white hover:bg-[#1da8a8] shadow-lg shadow-[#24c2c2]/20"
                  }`}
                >
                  {loading ? "Subscribing…" : <><Send className="w-3.5 h-3.5" /> Subscribe</>}
                </button>
              </div>

              {message && (
                <p className={`text-[11px] font-medium ${isSuccess ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-14">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-7">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/15">
                <Image src="/nssec.jpeg" alt="NSSEC Logo" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="text-white font-extrabold text-xl leading-none">NSSEC</p>
                <p className="text-[#24c2c2] text-xs font-medium mt-0.5">nssec.gov.ng</p>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The National Senior Secondary Education Commission — Nigeria&apos;s federal
              regulatory body established to standardize, fund, and advise on senior
              secondary education across all 36 states and the FCT.
            </p>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Our mission: to produce graduates equipped with life skills and academic
              qualifications that meet international standards.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#24c2c2] hover:text-white hover:border-[#24c2c2] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              About NSSEC
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Programmes
            </h4>
            <ul className="space-y-3">
              {PROGRAMME_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </ul>
          </div>

          {/* Resources + Contact */}
          <div className="space-y-10">
            {/* Resources */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Resources
              </h4>
              <ul className="space-y-3">
                {RESOURCE_LINKS.map((l) => (
                  <FooterLink key={l.href} {...l} />
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Contact
              </h4>
              <ul className="space-y-4">
                {CONTACT_INFO.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-[#24c2c2]/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[#24c2c2]" />
                      </div>
                      {c.href ? (
                        <a href={c.href} className="text-gray-400 text-xs leading-relaxed hover:text-[#24c2c2] transition-colors break-words">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-gray-400 text-xs leading-relaxed">{c.value}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/8" />

      {/* ── Bottom bar ── */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} National Senior Secondary Education Commission (NSSEC).
            All rights reserved.
          </p>
          <p>
            Website designed by{" "}
            <a href="https://coderina.org" target="_blank" rel="noopener noreferrer" className="text-[#24c2c2] hover:underline font-medium">
              Coderina EdTech Foundation
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-[#24c2c2] transition-colors">Contact</Link>
            <Link href="/publications" className="hover:text-[#24c2c2] transition-colors">Publications</Link>
            <Link href="/media" className="hover:text-[#24c2c2] transition-colors">Media</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
