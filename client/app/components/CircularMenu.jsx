"use client";
import React, { useState } from "react";
import {
  BookOpen,
  BarChart3,
  Hash,
  Home,
  School,
  FolderOpen,
  Layers3,
  FileText,
} from "lucide-react";

const CircularMenuItem = ({ icon: Icon, title, subtitle, href = "#" }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped(!flipped);

  return (
    <div
      className="perspective-1000 w-full h-full"
      onClick={toggleFlip} // toggle on click/tap
      onMouseEnter={() => setFlipped(true)} // flip on hover (desktop)
      onMouseLeave={() => setFlipped(false)} // reset on hover out
    >
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div className="flip-card-front">
          <Icon className="w-10 h-10 mb-2" />
          <div className="text-center">
            <div className="text-sm sm:text-base font-bold">{title}</div>
           
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back">
        <div className="text-center">
           
          </div>
          <a href={href} target="_self" rel="noopener noreferrer">
            Visit Page
          </a>
        </div>
      </div>
    </div>
  );
};

const CircularMenu = () => {
  const menuItems = [
    { icon: BookOpen, title: "JOURNALS", href: "/publications/journals" },
    { icon: BarChart3, title: "REPORTS", href: "publications/reports" },
    { icon: Hash, title: "GRANTS", subtitle: "GRANT", href: "/consistuency-projects" },
    { icon: Home, title: "RESOURCE", subtitle: "RESOURCE", href: "/publications/report" },
    { icon: School, title: "DEPARTMENTS", subtitle: "DIRECTORY", href: "/core-departments" },
    { icon: FolderOpen, title: "PROJECTS", href: "/consistuency-projects" },
    { icon: Layers3, title: "RESEARCH", subtitle: "SCHOOLS", href: "/demographics" },
    { icon: FileText, title: "ESTABLISHMENT ACT", subtitle: "ESTABLISHMENT ACT", href: "/publications/establishment-act" },
  ];

  return (
    <div className="w-full n p-6 md:p-12 " style={{ backgroundColor: "#24c2c2" }}>
      <div className="lg:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="aspect-square w-full max-w-[200px] mx-auto">
              <CircularMenuItem
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularMenu;
