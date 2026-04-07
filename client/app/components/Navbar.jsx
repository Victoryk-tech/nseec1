"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import { TbMenu3, TbX } from "react-icons/tb";
import { 
  Phone, 
  Mail, 
  Database, 
  Users, 
  ExternalLink,
  MapPin,
  GraduationCap 
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogContext } from "./contexts/BlogContext";

import log2 from "../../public/nssec.jpeg";

const Navbar = () => {
  const pathname = usePathname();
  const { blogs, loading, error, publications } = useBlogContext();
 
  const dropdownRef = useRef(null);
  const id = pathname.startsWith("/Media/")
    ? pathname.split("/Media/")[1]
    : null;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [display, setDisplay] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

  // Student statistics data for different regions
  const studentStats = [
    { region: "North-Central", students: "2,456,789", schools: "7,619" },
    { region: "North-East", students: "1,987,654", schools: "3,138" },
    { region: "North-West", students: "3,234,567", schools: "5,766" },
    { region: "South-East", students: "2,123,890", schools: "4,985" },
    { region: "South-South", students: "1,876,543", schools: "5,258" },
    { region: "South-West", students: "2,789,012", schools: "19,145" },
  ];

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMobileDropdown = (dropdown) => {
    setMobileActiveDropdown(
      mobileActiveDropdown === dropdown ? null : dropdown
    );
  };

  const handleStaffMailClick = () => {
    window.open('https://mail.nssec.gov.ng/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.nssec.gov.ng%2fowa', '_blank');
  };
  // Get unique main categories from blogs
  const mainCategories = Array.from(
    new Set(
      blogs
        .map((b) => b.mainCategory)  
        .filter(Boolean)            
    )
  );
  const publicationsCategories = Array.from(
    new Set(
      publications
        .map((b) => b.category)  
        .filter(Boolean)            
    )
  );
  
  

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com" },
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
    { icon: <FaInstagram />, url: "https://instagram.com/vwebagency" },
  ];

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    {
      label: "Departments",
      dropdown: "departments",
      items: [
        {
          label: "Office of the Executive Secretary",
          path: "/office-of-the-secretary",
        },
        { label: "Core Departments", path: "/core-departments" },
      ],
    },

    {
      label: "Projects",
      dropdown: "projects",
      items: [
        {
          label: "NSSEC Intervention",
          path: "/nssec-intervention",
        },
        { label: "Consistuency Projects", path: "/constituency-projects" },
      ],
    },
    
    { label: "Programs", path: "/programs" },
    {
      label: "Publications",
      dropdown: "publications",
      items: publicationsCategories.map(cat => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        path: `/publications/${cat}`,           
      })),
    },
    {
      label: "Media",
      dropdown: "media",
      items: mainCategories.map(cat => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        path: `/category/${cat}`,           
      })),
    },
    {
      label: "Education Data",
      dropdown: "data",
      items: [
        {
          label: "Senior Secondary School Demographics",
          path: "/demographics",
        },
        {
          label: "Digest of Statistics",
          path: "/statistics",
        },
      ],
    },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && window.scrollY > lastScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const validPaths = [
      "/",
      "/media",
      "/about",
      "/contact",
      "/posts",
      "/demographics",
      "/statistics",
      "/category",
      "/programs",
      "/projects",
      "/constituency-projects",
      "/core-departments",
      "/office-of-the-secretary",
      "/not-found",
    ];
    const isMediaPath = id && pathname === `/Media/${id}`;
    const isPostSlugPath =
      (pathname.startsWith("/publications/") ||
        pathname.startsWith("/media/") ||pathname.startsWith("/category/") ) &&
      pathname.split("/").length === 3;
    const archiveRegex = /^\/\d{4}\/\d{2}$/;
    const isArchivePath = archiveRegex.test(pathname);

    setDisplay(
      validPaths.includes(pathname) ||
        isMediaPath ||
        isPostSlugPath ||
        isArchivePath
    );
  }, [pathname, id]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
    setMobileActiveDropdown(null);
  }, [pathname]);

  const isActiveLink = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const hasActiveDropdownItem = (items) => {
    return items?.some((item) => isActiveLink(item.path));
  };

  if (!display) return null;

  return (
    <>
      {/* Animated Statistics Slider */}
      <div className="bg-gray-900 text-white py-2 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
        <h2 className="text-sm font-bold">Senior Scecondary School Education Statistics from 2023/2024 : -  NSSEC Schools:</h2>
          {[...studentStats, ...studentStats].map((stat, index) => (
            <div key={index} className="flex items-center mx-8 text-sm font-medium">
              
              <MapPin className="w-4 h-4 mr-2 text-[#24c2c2]" />
              <span className="mr-2">{stat.region}:</span>
              <GraduationCap className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="mr-4">{stat.schools} Schools</span>
              <span className="text-gray-300">|</span>
            </div>
          ))}
        </div>
        
      </div>

      {/* Advert Header - Not Fixed */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-[#24c2c2] text-white py-3 px-4 md:px-6 lg:px-12 gap-2">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline">+2349038022457 | +2347016390000</span>
            <span className="md:hidden">+234 903 802 2457</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            <span>info@nssec.gov.ng</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition-colors">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Digital Resource Center</span>
            <span className="sm:hidden">Resources</span>
          </button>
          
          <button 
            onClick={handleStaffMailClick}
            className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition-colors group"
          >
            <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="font-bold">Staff Mail</span>
         
          </button>
        </div>
      </div>

      {/* Main Header - Fixed/Sticky */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full text-color z-50 sticky top-0 transition-all duration-300 ${
          isScrolled ? "shadow-sm bg-white/95 backdrop-blur-sm" : "shadow-sm bg-white"
        }`}
      >
        <div className="flex items-center justify-between py-2 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <Image
                src={log2}
                alt="NSSEC Logo"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            {/* <div className="hidden sm:block">
             
              <p className="text-xs md:text-sm opacity-90 leading-tight max-w-48">
                National Senior Secondary Education Commission
              </p>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={`${item.label}-${item.path || item.dropdown}`} className="relative">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropdown(item.dropdown);
                        }}
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          hasActiveDropdownItem(item.items)
                            ? "text-[#24C2C2] bg-[#24C2C2]/10"
                            : "hover:text-[#24C2C2] hover:bg-[#24C2C2]/5"
                        }`}
                      >
                        {item.label}
                        <FaChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            activeDropdown === item.dropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.dropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 bg-white shadow-xl rounded-md py-2 min-w-48 z-50 border border-gray-200"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={`${subItem.label}-${subItem.path}`}
                                href={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                                className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                                  isActiveLink(subItem.path)
                                    ? "text-[#24C2C2] bg-[#24C2C2]/10"
                                    : "text-gray-600 hover:text-[#24C2C2] hover:bg-gray-100"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isActiveLink(item.path)
                          ? "text-[#24C2C2] bg-[#24C2C2]/10"
                          : "hover:text-[#24C2C2] hover:bg-[#24C2C2]/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>


          <Link href="/" className="hidden lg:block">
            <div className=" relative h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/arm.jpeg"
                alt="Nigerian coat of arm Logo"
                fill
                className="rounded-lg object-cover"
              />
            </div>
           
          </Link>


          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4 lg:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <TbMenu3 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-[90]"
                onClick={() => setIsDrawerOpen(false)}
              />

              {/* Sidebar */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed top-0 left-0 w-80 max-w-[85vw] h-screen bg-white text-[#000000] shadow-xl z-[100] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      <Image
                        src={log2}
                        alt="NSSEC Logo"
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">NSSEC</h2>
                      <p className="text-xs opacity-90">Menu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <TbX className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => handleMobileDropdown(item.dropdown)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-md transition-colors ${
                              hasActiveDropdownItem(item.items)
                                ? "text-[#24C2C2] bg-[#24C2C2]/10"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <span className="font-medium">{item.label}</span>
                            <FaChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileActiveDropdown === item.dropdown
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileActiveDropdown === item.dropdown && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-4 mt-2 space-y-1 overflow-hidden"
                              >
                                {item.items.map((subItem) => (
                                  <Link
                                    key={`${subItem.label}-${subItem.path}`}
                                    href={subItem.path}
                                    onClick={() => setIsDrawerOpen(false)}
                                    className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                                      isActiveLink(subItem.path)
                                        ? "text-[#24C2C2] bg-[#24C2C2]/10"
                                        : "text-gray-600 hover:text-[#24C2C2] hover:bg-gray-100"
                                    }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`block px-4 py-3 rounded-md font-medium transition-colors ${
                            isActiveLink(item.path)
                              ? "text-[#24C2C2] bg-[#24C2C2]/10"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Contact Info */}
                <div className="mt-4 p-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-[#24c2c2]" />
                    <span>+2349038022457</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-[#24c2c2]" />
                    <span>info@nssec.gov.ng</span>
                  </div>
                  <button 
                    onClick={handleStaffMailClick}
                    className="flex items-center gap-3 text-sm text-[#24c2c2] hover:text-[#1a9999] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Staff Mail Access</span>
                  </button>
                </div>

                {/* Social Links */}
                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium mb-4 opacity-75">
                    Connect With Us
                  </h3>
                  <div className="flex items-center gap-4">
                    {socialLinks.map(({ icon, url }, idx) => (
                      <Link
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-lg hover:text-[#24C2C2] hover:bg-gray-100 transition-colors"
                      >
                        {icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Navbar;