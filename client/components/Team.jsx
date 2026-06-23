"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Target,
  BookOpen,
  Award,
  Globe,
  ArrowRight,
  Shield,
  Scale,
  GraduationCap,
  Building,
  Eye,
  Heart,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const units = [
    {
      name: "Head, Reform Cordination (SERVICOM & ACTU) Unit",
      head: "OKWORI MARY FAVOUR",
      image: "/mary.jpg",
      description:
        "Coordinating educational reforms and service delivery improvements.",
      email: "mary@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Legal Unit",
      head: "Barr. (Mrs) Maryam sidi Ali",
      image: "/about/Maryam-Sidi-Ali.jpeg",
      description:
        "Legal advisory services and regulatory compliance management.",
      email: "maryam@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Press Publication and Protocol",
      head: "Fatima Bappare",
      image: "/fati.jpg",
      description: "Managing public communications and stakeholder relations.",
      email: "fatimar@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Internal Audit Unit",
      head: "ADUKU ALEXANDER OJONIM",
      image: "/aduku.jpg",
      description:
        "Internal auditing and financial oversight for transparency.",
      email: "aduku@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Physical planning unit",
      head: "Arc. Maimuna Lami",
      image: "/nssec.jpeg",
      description:
        "Managing procurement processes and contract administration.",
      email: "lami@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "HEAD PROCUREMENT UNIT",
      head: "Abdulazeez Abdulkadeer Maikanti ",
      image: "/josiah.jpg",
      description:
        "Managing procurement processes and contract administration.",
      email: "josiah@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
  ];

  const head = [
    {
      name: "Executive Secretary",
      pam: "NATIONAL SENIOR SECONDARY EDUCATION COMMISSION (NSSEC)",
      head: "Dr. Iyela Ajayi, FNIM, FMIC",
      image: "/iya.png",
      description:
        "Coordinating educational reforms and service delivery improvements.",
      email: "ajayi@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Quality Assurance Department",
      head: "RABIA UMAR MUHAMMAD ",
      image: "/rabia.jpg",
      description:
        "Legal advisory services and regulatory compliance management.",
      email: "rabia@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Human Resource Management Department",
      head: "Mr. Saleh Bature",
      image: "/bature.jpg",
      description: "Managing public communications and stakeholder relations.",
      email: "bature@nssec.gov.ng",
      phone: "++234 000 000 0000",
    },
    {
      name: "Head, Finance and Account Department",
      head: "Salihu Bukar Malgwi ",
      image: "/about/salihu-bukar.jpeg",
      description:
        "Internal auditing and financial oversight for transparency.",
      email: "mairiga@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Planning, Research and Statistics Department",
      head: "USMAN ABUBAKAR BOKANI ",
      image: "/usman.jpg",
      description:
        "Managing procurement processes and contract administration.",
      email: "bokani@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "HEAD, TEACHER DEVELOPMENT AND INTERNATIONAL PARTNERSHIP DEPARTMENT",
      head: "MOHAMMED SALIHU",
      image: "/salihu.jpg",
      description:
        "Infrastructure planning and facility development oversight.",
      email: "salihu@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
  ];
  return (
    <div className="py-12">
      {/* Executive Secretary - Featured Section */}
      <div
        className={`mb-16 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Leadership
          </h2>
          <div className="w-24 h-1 bg-[#24C2C2] mx-auto"></div>
        </div>

        {/* Executive Secretary Card - Premium Design */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#24C2C2]/10 via-white to-[#24C2C2]/5 rounded-3xl shadow-2xl overflow-hidden border-2 border-[#24C2C2]/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#24C2C2]/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#24C2C2]/5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-3 border-[#24C2C2]/20 shadow-md group-hover:border-[#24C2C2]/50 transition-all duration-300">
                    <Image
                      src={head[0].image}
                      alt={head[0].head}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                            <rect width="150" height="150" fill="#f3f4f6"/>
                            <circle cx="75" cy="60" r="20" fill="#9ca3af"/>
                            <path d="M35 120 Q35 100 55 100 h40 Q115 100 115 120 v30 h-80 v-30" fill="#9ca3af"/>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>

                  <div className="absolute -bottom-2 -right-2 bg-[#24C2C2] text-white p-3 rounded-full shadow-lg">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {head[0].head}
                  </h3>
                  <p className="text-[#24C2C2] font-semibold text-lg mb-1">
                    {head[0].name}
                  </p>
                  <p className="text-gray-600 font-medium text-sm mb-4">
                    {head[0].pam}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <div className="flex items-center justify-center md:justify-start gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg">
                      <Mail className="w-4 h-4 text-[#24C2C2]" />
                      <span className="text-sm text-gray-700">
                        {head[0].email}
                      </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg">
                      <Phone className="w-4 h-4 text-[#24C2C2]" />
                      <span className="text-sm text-gray-700">
                        {head[0].phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Heads Section */}
      <div
        className={`mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Department Heads
          </h2>
          <div className="w-20 h-1 bg-[#24C2C2] mx-auto"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {head.slice(1).map((unit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#24C2C2]/10"
            >
              <div className="relative h-2 bg-gradient-to-r from-[#24C2C2] to-[#24C2C2]/60"></div>

              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-3 border-[#24C2C2]/20 shadow-md group-hover:border-[#24C2C2]/50 transition-all duration-300">
                    <Image
                      src={unit.image}
                      alt={unit.head}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                            <rect width="150" height="150" fill="#f3f4f6"/>
                            <circle cx="75" cy="60" r="20" fill="#9ca3af"/>
                            <path d="M35 120 Q35 100 55 100 h40 Q115 100 115 120 v30 h-80 v-30" fill="#9ca3af"/>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                    {unit.head}
                  </h3>
                  <p className="text-[#24C2C2] font-semibold text-xs uppercase tracking-wide mb-4 leading-relaxed">
                    {unit.name}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-[#24C2C2] flex-shrink-0" />
                    <span className="text-xs truncate">{unit.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-[#24C2C2] flex-shrink-0" />
                    <span className="text-xs">{unit.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Heads Section */}
      <div
        className={`transition-all duration-1000 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unit Heads
          </h2>
          <div className="w-20 h-1 bg-[#24C2C2] mx-auto"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#24C2C2]/10"
            >
              <div className="relative h-2 bg-gradient-to-r from-[#24C2C2]/60 to-[#24C2C2]/30"></div>

              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-3 border-[#24C2C2]/20 shadow-md group-hover:border-[#24C2C2]/50 transition-all duration-300">
                    <Image
                      src={unit.image}
                      alt={unit.head}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                            <rect width="150" height="150" fill="#f3f4f6"/>
                            <circle cx="75" cy="60" r="20" fill="#9ca3af"/>
                            <path d="M35 120 Q35 100 55 100 h40 Q115 100 115 120 v30 h-80 v-30" fill="#9ca3af"/>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2 uppercase">
                    {unit.head}
                  </h3>
                  <p className="text-[#24C2C2] font-semibold text-xs uppercase tracking-wide mb-4 leading-relaxed">
                    {unit.name}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-[#24C2C2] flex-shrink-0" />
                    <span className="text-xs truncate">{unit.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Phone className="w-4 h-4 text-[#24C2C2] flex-shrink-0" />
                    <span className="text-xs">{unit.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
