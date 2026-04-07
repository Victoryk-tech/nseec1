import React from "react";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Camera,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import log2 from "../../public/nssec.jpeg";
import { useFormContext } from "./contexts/FormContext";
import Link from "next/link";

const contactInfo = [
  {
    icon: <MapPin />,
    label: "Address",
    value: "Plot 14 Yobe Close, Maitama, Abuja",
  },
  {
    icon: <Mail />,
    label: "Email",
    value: "info@nssec.gov.ng",
    href: "mailto:info@nssec.gov.ng",
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: "+234 905 555 7119",
    href: "tel:+2349055557119",
  },
];

const Footer = () => {
  const {
    loading,
    handleSubscribe,
    message,
    isSuccess,
    email,
    setEmail,
    setAgreed,
    agreed,
  } = useFormContext();

  const links = [
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
    { href: "/statistics", label: "Education Data" },
    { href: "/core-departments", label: "Core Departments" },
  ];
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - About */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative h-16 w-16 md:h-24 md:w-24 rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={log2}
                  alt="NSSEC Logo"
                  fill
                  sizes="(max-width: 768px) 64px, 96px"
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">NSSEC</h2>
                <p className="text-sm text-gray-600">By Coderina</p>
              </div>
            </div>

            {/* Social Icons */}
            {/* Social Icons */}
<div className="flex space-x-4">
  <a
    href="https://twitter.com/nssec_ng"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#24c2c2] hover:text-white transition-colors duration-200"
  >
    <Twitter size={20} />
  </a>
  <a
    href="https://facebook.com/nssecng"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#24c2c2] hover:text-white transition-colors duration-200"
  >
    <Facebook size={20} />
  </a>
  <a
    href="https://instagram.com/nssec_ng"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#24c2c2] hover:text-white transition-colors duration-200"
  >
    <Instagram size={20} />
  </a>
  <a
    href="https://linkedin.com/company/nssec-ng"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#24c2c2] hover:text-white transition-colors duration-200"
  >
    <Linkedin size={20} />
  </a>
</div>


            {/* Mission Statement */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Welcome to NSSEC, The NSSEC remains committed to enhancing the
                quality of senior secondary education nationwide. In last three
                years, we focused on curriculum development, teacher training,
                infrastructure improvement, and policy implementation to ensure
                that our education system remains competitive and inclusive.
              </p>
              <p className="text-gray-700 leading-relaxed">
                To regulate, coordinate, and support senior secondary education
                in Nigeria by setting and enforcing standards, facilitating
                quality teaching and learning, promoting data-driven
                decision-making, and strengthening partnerships for sustainable
                educational development.
              </p>
            </div>
          </div>

          {/* Popular Programs */}
          {/* Quick Links */}
          <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Links</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-600 hover:text-[#24c2c2] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>

          {/* Information & Newsletter */}
          <div className="space-y-8">
            {/* Information Links */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact
              </h3>

              <div className="space-y-3 text-xl">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="text-gray-600 flex items-start space-x-2 sm:space-x-3"
                  >
                    <div className="w-4 h-4 mt-0.5 sm:mt-1 flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-sm text-gray-600 hover:text-[#321414] transition-colors 
                                   duration-200 leading-relaxed break-words block"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-600 leading-relaxed break-words">
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col xs:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-[#321414] focus:border-transparent
                 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap flex-shrink-0
          ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white border-2 border-[#242c2c] text-[#242c2c] hover:bg-[#242c2c] hover:text-white transition-colors duration-200"
          }`}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>

                {/* Agreement checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 text-[#24c2c2] border-gray-300 rounded focus:ring-[#24c2c2]"
                  />
                  <label htmlFor="agree" className="text-xs text-gray-600">
                    I agree to receive updates from NSSEC
                  </label>
                </div>

                {/* Feedback message */}
                {message && (
                  <p
                    className={`text-sm mt-1 ${
                      isSuccess ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              National Senior Secondary Education Commission (NSSEC) © 2023. All Rights Reserved. Website Designed by Coderina EdTech Foundation
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
