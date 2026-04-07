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
import Team from "./Team";
const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "2021", label: "Year Established", icon: Calendar },
    { number: "36", label: "States & FCT Covered", icon: MapPin },
    { number: "60+", label: "Initial Staff", icon: Users },
    { number: "100%", label: "Commitment to Excellence", icon: Target },
  ];

  const departments = [
    {
      name: "Quality Assurance",
      icon: Shield,
      description: "Ensuring educational standards and excellence across all senior secondary schools nationwide."
    },
    {
      name: "Planning, Research & Statistics",
      icon: Target,
      description: "Data-driven planning and research for informed educational policy decisions."
    },
    {
      name: "Teacher Development & International Partnership",
      icon: GraduationCap,
      description: "Enhancing teacher capacity and fostering global educational collaborations."
    },
    {
      name: "Finance & Accounts",
      icon: Scale,
      description: "Financial management and accountability in educational resource allocation."
    },
    {
      name: "Human Resource Management",
      icon: Users,
      description: "Managing human capital for optimal organizational performance."
    },
  ];

 


  const boardFeatures = [
    {
      icon: Eye,
      title: "Policy Oversight",
      description: "Approving strategic plans, regulations, and guidelines for senior secondary education nationwide."
    },
    {
      icon: Scale,
      title: "Budget Approval",
      description: "Reviewing and endorsing the Commission's financial plans and ensuring resource accountability."
    },
    {
      icon: Target,
      title: "Monitoring Implementation",
      description: "Assessing progress in the rollout of national standards, programs, and reforms."
    },
    {
      icon: Users,
      title: "Stakeholder Engagement",
      description: "Strengthening relationships with federal and state governments, development partners, and communities."
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 mt-10 lg:mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="inline-flex items-center space-x-2 bg-[#24C2C2]/10 backdrop-blur-md border border-[#24C2C2]/20 rounded-full px-6 py-3 mb-8">
                <GraduationCap className="w-4 h-4 text-[#24C2C2]" />
                <span className="text-[#24C2C2] text-sm font-medium">
                  About NSSEC
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                <span className="block">National Senior Secondary</span>
                <span className="block bg-gradient-to-r from-[#24C2C2] to-[#24C2C2] bg-clip-text text-transparent">
                  Education Commission
                </span>
              </h1>

              <p className="text-gray-600 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                The leading regulatory body driving a globally competitive, inclusive, and innovative senior secondary education system in Nigeria.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#24C2C2]/5 border border-[#24C2C2]/10 rounded-2xl p-6 text-center hover:bg-[#24C2C2]/10 transition-all duration-300"
              >
                <stat.icon
                  className="w-8 h-8 text-[#24C2C2] mx-auto mb-3"
                />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Vision & Mission Section */}
          <div
            className={`bg-[#24C2C2]/5 border border-[#24C2C2]/10 rounded-3xl p-8 md:p-12 mb-20 transition-all duration-1000 delay-400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Vision & Mission
              </h2>
              <div className="w-24 h-1 bg-[#24C2C2] mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#24C2C2]/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#24C2C2] rounded-xl flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed italic">
                &quot;To be the leading regulatory body driving a globally competitive, inclusive, and innovative senior secondary education system in Nigeria.&quot;
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#24C2C2]/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#24C2C2] rounded-xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed italic">
                &quot;To regulate, coordinate, and support senior secondary education in Nigeria by setting and enforcing standards, facilitating quality teaching and learning, promoting data-driven decision-making, and strengthening partnerships for sustainable educational development.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div
            className={`mb-20 transition-all duration-1000 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our History
              </h2>
              <div className="w-24 h-1 bg-[#24C2C2] mx-auto"></div>
            </div>

            <div className="bg-gradient-to-r from-[#24C2C2]/5 to-[#24C2C2]/10 rounded-3xl p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    The Birth of NSSEC
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Education is universally recognized as a powerful tool for national development. In Nigeria, senior secondary education holds a critical position within the educational system, bridging basic and tertiary levels of learning.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Despite its pivotal role, senior secondary education remained the only sub-sector in Nigeria`s educational system without a dedicated regulatory body for many years. This gap created challenges in maintaining quality standards.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    In April 2021, Prof. Benjamin Abakpa was appointed as the pioneer Executive Secretary of NSSEC, beginning operations with an initial team of 60 staff members seconded from various MDAs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 text-center border border-[#24C2C2]/10 shadow-lg">
                    <div className="text-3xl font-bold text-[#24C2C2] mb-2">2004</div>
                    <div className="text-gray-700">NSEC Law Enacted</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center border border-[#24C2C2]/10 shadow-lg">
                    <div className="text-3xl font-bold text-[#24C2C2] mb-2">2021</div>
                    <div className="text-gray-700">NSSEC Established</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center border border-[#24C2C2]/10 shadow-lg">
                    <div className="text-3xl font-bold text-[#24C2C2] mb-2">2023</div>
                    <div className="text-gray-700">NSSEC Act Signed</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center border border-[#24C2C2]/10 shadow-lg">
                    <div className="text-3xl font-bold text-[#24C2C2] mb-2">60+</div>
                    <div className="text-gray-700">Initial Staff</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <div
            className={`mb-20 transition-all duration-1000 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Departments
              </h2>
              <div className="w-24 h-1 bg-[#24C2C2] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="group bg-[#24C2C2]/5 border border-[#24C2C2]/10 rounded-2xl p-6 hover:bg-[#24C2C2]/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-[#24C2C2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <dept.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-3">
                    {dept.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              ))}
            </div>
          </div>


           {/* Units Head Cards Section */}
           <Team/>
         

          {/* Governing Board Section */}
          <div
            className={`mb-20 transition-all duration-1000 delay-1200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Governing Board Functions
              </h2>
              <div className="w-24 h-1 bg-[#24C2C2] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {boardFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#24C2C2] rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#24C2C2]/25 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div
            className={`text-center transition-all duration-1000 delay-1400 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-[#24C2C2]/5 border border-[#24C2C2]/10 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Partner With NSSEC
              </h2>
              <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Join us in transforming senior secondary education in Nigeria. Together, we can build a globally competitive and inclusive education system.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/programs" className="group bg-[#24C2C2] text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-[#24C2C2]/25 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Our Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link href="/contact" className="group bg-white border-2 border-[#24C2C2] text-[#24C2C2] font-bold text-lg px-8 py-4 rounded-full hover:bg-[#24C2C2]/10 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>Contact Us</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-4 animate-bounce">
        <div className="w-3 h-3 bg-[#24C2C2] rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/3 right-8 animate-bounce" style={{animationDelay: '1000ms'}}>
        <div className="w-2 h-2 bg-[#24C2C2]/70 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce" style={{animationDelay: '2000ms'}}>
        <div className="w-4 h-4 bg-[#24C2C2]/50 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default AboutUs;