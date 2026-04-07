"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Users,
  BookOpen,
  Shield,
  Target,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Building,
  Lightbulb,
  TrendingUp,
  Camera,
} from "lucide-react";
import Image from "next/image";
import CircularMenu from "./CircularMenu";
import GallerySection from "./GallerySection";
import Link from "next/link";
import News from "./News";

const NSSECLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const objectives = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Setting Standards",
      description:
        "Establishing and maintaining minimum standards for senior secondary education in Nigeria to ensure quality education for all students.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Regulatory Oversight",
      description:
        "Providing regulatory oversight to ensure all senior secondary institutions operate within the established framework.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Quality Education Access",
      description:
        "Ensuring all students have access to quality education, regardless of their background or location.",
    },
  ];

  const coreAreas = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Policy Development",
      description:
        "Establishing guidelines and policies to standardize and enhance senior secondary education across the nation.",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Funding Management",
      description:
        "Administering the National Senior Secondary Education Fund to provide financial interventions for infrastructure and capacity development.",
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Capacity Building",
      description:
        "Equipping educators and administrators with the tools and training needed to deliver world-class education.",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Quality Assurance",
      description:
        "Providing strategic advice to the Federal Government on matters related to senior secondary education.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Stakeholder Engagement",
      description:
        "Collaborating with state governments, private sector partners, and international organizations to drive innovative solutions.",
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Advisory Role",
      description:
        "Providing strategic advice to the Federal Government on matters related to senior secondary education.",
    },
  ];

  const mandates = [
    "Prescribe the minimum standards and regulate the Senior Secondary Education in Nigeria",
    "Manage National Senior Secondary Education Funds",
    "Advise the Federal Government on the management of Senior Secondary Education",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="w-20 h-1 bg-[#24c2c2]"></div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Elevating
                  <span className="text-[#24c2c2] block">
                    Secondary Education
                  </span>
                  in Nigeria
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  The National Senior Secondary Education Commission is
                  transforming Nigeria`s educational landscape through
                  standardization, innovation, and excellence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-[#24c2c2] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1ea8a8] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Learn More About Us
                </Link>
                <Link
                  href="/programs"
                  className="border-2 border-[#24c2c2] text-[#24c2c2] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#24c2c2] hover:text-white transition-all duration-300"
                >
                  Our Programs
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#24c2c2]">500+</div>
                  <div className="text-sm text-gray-600">Schools Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#24c2c2]">36</div>
                  <div className="text-sm text-gray-600">States Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#24c2c2]">1M+</div>
                  <div className="text-sm text-gray-600">Students Impacted</div>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-full  w-full">
              <Image
                className="object-cover rounded-lg"
                fill
                src="/students.jpg"
                alt="Hero Image"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#24c2c2] rounded-2xl opacity-10"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#24c2c2] rounded-xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10">
          <div className="text-center mb-20">
            <div className="w-20 h-1 bg-[#24c2c2] mx-auto mb-6"></div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between basic and tertiary education while
              preparing students for global competitiveness
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                The National Senior Secondary Education Commission (NSSEC) is a
                regulatory body established to oversee and elevate the quality
                of senior secondary education in Nigeria. Founded with the
                mandate to standardize, fund, and advise on critical areas of
                this pivotal educational level, NSSEC bridges the gap between
                basic and tertiary education while preparing students for global
                competitiveness.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are a forward-thinking organization driven by a mission to
                produce graduates equipped with life skills and academic
                qualifications that meet international standards. Our work
                focuses on policy formulation, funding interventions, capacity
                building, quality assurance, and collaboration with key
                stakeholders.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#24c2c2] flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Quality Assurance
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#24c2c2] flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Global Standards
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#24c2c2] flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Innovative Solutions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#24c2c2] flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Capacity Building
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative h-96 w-full">
                <Image
                  className="object-cover rounded-xl"
                  fill
                  src="/secondary.jpeg"
                  alt="Hero Image"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="bg-[#24c2c2] rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Building className="w-16 h-16 mx-auto mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg leading-relaxed opacity-95">
                    To position Nigeria`s senior secondary education system as a
                    model for sustainable growth and development, aligned with
                    global trends in entrepreneurship, science, and technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-64 w-full">
              <Image
                className="object-cover rounded-xl"
                fill
                src="/kas1.jpg"
                alt="Hero Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 w-full">
              <Image
                className="object-cover rounded-xl"
                fill
                src="/senlawani.jpg"
                alt="Hero Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 w-full">
              <Image
                className="object-cover rounded-xl"
                fill
                src="/gather.jpg"
                alt="Hero Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CircularMenu />

      {/* Key Objectives */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10">
          <div className="text-center mb-20">
            <div className="w-20 h-1 bg-[#24c2c2] mx-auto mb-6"></div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Key Objectives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NSSEC is working towards creating an environment that fosters the
              development of essential skills, knowledge, and character among
              students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-[#24c2c2] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {objective.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {objective.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10">
          <div className="text-center mb-20">
            <div className="w-20 h-1 bg-[#24c2c2] mx-auto mb-6"></div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our Core Focus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive approach to transforming secondary education through
              strategic initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group hover:border-[#24c2c2]"
              >
                <div className="text-[#24c2c2] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Image Section */}
          <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 w-full">
              <Image
                className="object-cover rounded-xl"
                fill
                src="/classroom.jpeg"
                alt="Hero Image"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Transforming Education Through Innovation
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our comprehensive approach combines policy development,
                strategic funding, and capacity building to create a robust
                educational ecosystem that prepares students for the challenges
                of tomorrow.
              </p>
              <Link href="/programs">
                <button className="bg-[#24c2c2] text-white px-6 py-3 mt-4 rounded-xl font-semibold hover:bg-[#1ea8a8] transition-all duration-300">
                  Explore Our Programs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Mandate */}
      <section className="py-24 bg-[#24c2c2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#24c2c2] to-[#1ea8a8]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10 relative">
          <div className="text-center mb-16">
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <h2 className="text-5xl font-bold mb-6">
              Mandate of the Commission
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our core responsibilities and duties in shaping Nigeria`s
              educational future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {mandates.map((mandate, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <Star className="w-8 h-8 mt-1 flex-shrink-0" />
                  <p className="text-lg leading-relaxed font-medium">
                    {mandate}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="relative h-64 sm:h-96 max-w-2xl mx-auto w-full">
              <Image
                className="object-cover rounded-xl"
                fill
                src="/student2.jpg"
                alt="Hero Image"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          </div>
        </div>
      </section>

      
      <News />
      <GallerySection />

      {/* Call to Action */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="w-20 h-1 bg-[#24c2c2]"></div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Ready to Transform
                  <span className="text-[#24c2c2]"> Education?</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join us in our mission to elevate Nigeria`s secondary
                  education system. Whether you`re an educator, policymaker, or
                  stakeholder, there`s a place for you in our vision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-[#24c2c2] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1ea8a8] transition-all duration-300 transform hover:scale-105"
                >
                  Get Involved
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-[#24c2c2] text-[#24c2c2] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#24c2c2] hover:text-white transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative h-96 w-full">
              <Image
                className="object-cover rounded-xl"
                fill
                src="/children2.jpeg"
                alt="Hero Image"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NSSECLandingPage;
