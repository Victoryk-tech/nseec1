"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Wrench,
  BarChart3,
  Users,
  GraduationCap,
  Bot,
  Target,
  MapPin,
  Megaphone,
  BookOpen,
  Settings,
  TrendingUp,
  UserCheck,
  Brain,
  Award,
  Navigation,
  Mic,
  Menu,
  X,
  ChevronUp,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockPrograms = [
  {
    id: "safe-school",
    title: "Safe School Initiative",
    icon: Shield,
    color: "#24c2c2",
    content: {
      description:
        "The National Senior Secondary Education Commission (NSSEC) is committed to ensuring that all senior secondary schools in Nigeria provide a safe, inclusive, and conducive environment for teaching and learning. Through the Safe School Program, NSSEC aligns with the objectives of the National Policy on Safety, Security, and Violence-Free Schools and the Safe Schools Declaration, to protect students, teachers, and educational facilities from threats and hazards.",
      objectives: [
        "To strengthen safety and security infrastructure in senior secondary schools",
        "To build resilience and emergency preparedness among school communities",
        "To prevent and respond to all forms of violence, abuse, and natural or man-made disasters",
        "To promote psychosocial support and mental health awareness for students and teachers",
      ],
      keyComponents: [
        {
          title: "Security Infrastructure",
          details: [
            "Installation of perimeter fencing, CCTV, and controlled access systems",
            "Collaboration with local security agencies for rapid response",
          ],
        },
        {
          title: "Emergency Preparedness",
          details: [
            "Development and dissemination of School Safety Plans",
            "Training on First Aid, Fire Drills, and Emergency Evacuation Procedures",
            "Simulation exercises with community participation",
          ],
        },
        {
          title: "Violence Prevention & Protection",
          details: [
            "Anti-bullying and anti-sexual harassment policies",
            "Awareness campaigns on students' rights and protection",
            "Reporting systems for abuse and misconduct",
          ],
        },
        {
          title: "Mental Health & Psychosocial Support",
          details: [
            "Counseling services and referral systems",
            "Peer support programs",
            "Integration of emotional well-being in the curriculum",
          ],
        },
        {
          title: "Safe School Training Programs",
          details: [
            "Capacity building for school leadership, teachers, and safety committees",
            "Integration of safe school principles in teacher training curricula",
            "Partnering with the Federal Ministry of Education and security agencies for compliance monitoring",
          ],
        },
      ],
      partnerships: [
        "The Federal Ministry of Education",
        "State Education Ministries",
        "Security Agencies",
        "Donor Agencies and NGOs",
        "The Safe Schools Initiative (SSI)",
      ],
      outcomes: [
        "Reduced incidents of violence and insecurity in schools",
        "Increased student enrollment and retention, especially for girls",
        "Strengthened school-community trust",
        "Enhanced emergency response and disaster risk reduction capacity",
      ],
    },
  },
  {
    id: "tvet",
    title: "TVET",
    icon: Wrench,
    color: "#24c2c2",
    content: {
      description:
        "As part of its commitment to aligning senior secondary education with 21st-century skills and workforce readiness, the National Senior Secondary Education Commission (NSSEC) organizes and supports TVET Exhibitions across the country. These exhibitions showcase the creativity, innovation, and practical competencies of students and educators in technical and vocational fields.",
      purpose: [
        "To promote skills-based education and encourage interest in technical and vocational careers",
        "To demonstrate the outcomes of TVET curriculum implementation in senior secondary schools",
        "To foster innovation and entrepreneurship among students",
        "To connect students with industry experts, mentors, and potential employers",
        "To encourage state-level investment in TVET infrastructure and capacity building",
      ],
      keyFeatures: [
        {
          title: "Student Project Displays",
          details: [
            "Hands-on prototypes and innovations in fields such as: Electrical and electronics, Automotive technology, Fashion and garment design, Agriculture and aquaculture, Woodwork and metal fabrication, ICT, coding, and robotics",
          ],
        },
        {
          title: "Skills Demonstrations",
          details: [
            "Live technical demonstrations by students, instructors, and partner institutions",
            "Team-based competitions to showcase collaborative problem-solving and technical expertise",
          ],
        },
        {
          title: "Industry Engagement Booths",
          details: [
            "Exhibits by vocational institutions, polytechnics, and industries",
            "Information on apprenticeship programs, internships, and job opportunities",
          ],
        },
        {
          title: "Workshops and Career Talks",
          details: [
            "Seminars on entrepreneurship, emerging technologies, and green skills",
            "Talks from successful artisans, TVET graduates, and professionals",
          ],
        },
        {
          title: "Innovation Challenges",
          details: [
            "Competitive events encouraging students to solve real-world problems through technical solutions",
            "Awards for creativity, functionality, and societal relevance",
          ],
        },
      ],
      participants: [
        "Senior secondary school students and teachers",
        "Technical colleges and vocational institutions",
        "TVET professionals and trainers",
        "Employers and industry representatives",
        "Government officials, development partners, and community leaders",
      ],
      outcomes: [
        "Enhanced visibility and prestige of technical education",
        "Greater enrollment in TVET subjects and career pathways",
        "Strengthened public-private partnerships in skill development",
        "Identification of talented students for further mentorship or sponsorship",
        "Increased motivation among students and teachers to pursue hands-on learning",
      ],
      nssecRole: [
        "Coordination and funding support for state and zonal exhibitions",
        "Monitoring of project relevance to curriculum standards",
        "Collaboration with the Federal Ministry of Education, NBTE, and relevant stakeholders for quality assurance",
      ],
    },
  },
  {
    id: "monitoring-learning",
    title: "Monitoring Learning Achievement",
    icon: BarChart3,
    color: "#24c2c2",
    content: {
      description:
        "The Monitoring, Learning, and Accountability (MLA) framework of the National Senior Secondary Education Commission (NSSEC) is a strategic tool designed to foster a results-driven and transparent education system. It supports the Commission's efforts to implement policies, track progress, promote adaptive learning, and ensure accountability to stakeholders.",
      components: [
        {
          title: "Monitoring",
          description:
            "Continuous and systematic tracking of NSSEC activities, programs, and interventions at federal and state levels:",
          details: [
            "Routine school-level assessments and compliance checks",
            "Real-time monitoring using the Senior Secondary Education Data Bank",
            "Progress dashboards for teacher training, curriculum delivery, and infrastructure projects",
          ],
        },
        {
          title: "Learning",
          description:
            "Capturing insights and lessons from implementation to improve planning and policy refinement:",
          details: [
            "Periodic Learning Reviews and stakeholder consultations",
            "Documentation of best practices and innovation (e.g., AI teacher training rollout)",
            "Adaptive strategies to respond to challenges and improve impact",
          ],
        },
        {
          title: "Accountability",
          description:
            "Ensuring that NSSEC and its partners are answerable to the public, funders, and the communities served:",
          details: [
            "Transparent reporting through quarterly and annual reports",
            "Community feedback loops and grievance redress systems",
            "Performance audits and impact assessments",
          ],
        },
      ],
      principles: [
        "Evidence-based decision-making",
        "Stakeholder participation and inclusivity",
        "Transparency and open data",
        "Continuous improvement and adaptability",
      ],
      tools: [
        "NSSEC MLA Dashboard (planned)",
        "Mobile data collection apps for field officers",
        "Independent reviews and third-party evaluations",
        "State-level MLA taskforces for localized oversight",
      ],
      benefits: [
        "Better alignment of programs with student and teacher needs",
        "Improved trust and responsiveness in public education",
        "Stronger partnerships with state governments and donors",
        "Increased visibility and impact of NSSEC's interventions",
      ],
    },
  },
  {
    id: "school-management",
    title: "School Based Management Committee",
    icon: Users,
    color: "#24c2c2",
    content: {
      description:
        "School Based Management Committees are integral to the governance and community engagement framework of senior secondary schools under the National Senior Secondary Education Commission (NSSEC).",
      placeholder:
        "Content for School Based Management Committee will be added here. This section will include detailed information about committee structures, roles, responsibilities, and implementation guidelines.",
    },
  },
  {
    id: "reskilling-teachers",
    title: "Reskilling Teachers in Core Subjects",
    icon: GraduationCap,
    color: "#24c2c2",
    content: {
      description:
        "The National Senior Secondary Education Commission recognizes the critical importance of continuously upgrading teacher competencies to meet evolving educational standards and student needs.",
      placeholder:
        "Content for Reskilling Teachers in Core Subjects will be added here. This section will include comprehensive details about teacher training programs, curriculum updates, and professional development initiatives.",
    },
  },
  {
    id: "robotics-ai",
    title: "Robotics and Artificial Intelligence Initiatives",
    icon: Bot,
    color: "#24c2c2",
    content: {
      description:
        "In alignment with global trends and Nigeria's digital transformation agenda, the National Senior Secondary Education Commission (NSSEC) has launched pioneering initiatives in Robotics and Artificial Intelligence (AI). These initiatives are designed to equip senior secondary school students and teachers with future-ready skills that foster innovation, problem-solving, and competitiveness in a technology-driven world.",
      objectives: [
        "To introduce students to emerging technologies such as AI, robotics, and machine learning",
        "To build the capacity of teachers to integrate AI tools into classroom teaching",
        "To promote computational thinking, coding, and digital innovation in senior secondary schools",
        "To position Nigerian students to compete globally in science and technology fields",
      ],
      keyComponents: [
        {
          title: "AI Teacher Training Program",
          description:
            "In partnership with Google, NSSEC is training 6,000 teachers nationwide in the fundamentals of Artificial Intelligence, with a focus on:",
          details: [
            "AI concepts and ethical considerations",
            "Classroom applications of AI tools",
            "Promoting STEM through technology-integrated teaching",
            "Nasarawa State alone has 130 teachers currently undergoing this training.",
          ],
        },
        {
          title: "School-Based Robotics Clubs",
          details: [
            "Establishment of robotics clubs to encourage hands-on learning",
            "Provision of kits and resources for building basic robots",
            "Mentorship from engineers and university partners",
          ],
        },
        {
          title: "AI and Robotics Curriculum Integration",
          details: [
            "Development of digital literacy modules with AI and robotics elements",
            "Collaboration with curriculum agencies for future inclusion in the national syllabus",
          ],
        },
        {
          title: "National Robotics & AI Challenge",
          details: [
            "Inter-school competitions where students showcase robotic projects and AI applications",
            "Awards and exposure to industry leaders and innovation hubs",
          ],
        },
        {
          title: "Innovation Labs and Tech Corners",
          details: [
            "Plans to pilot technology labs in select senior secondary schools",
            "Equipped with coding tools, robotics kits, and internet access to support digital learning",
          ],
        },
      ],
      outcomes: [
        "Increased student interest and proficiency in STEM subjects",
        "Enhanced teacher capacity in digital education delivery",
        "Identification of young tech talents for national and international mentorship",
        "Support for Nigeria's economic diversification through tech-driven education",
      ],
      partners: [
        "Google – Technical and training support",
        "Federal Ministry of Education – Policy alignment",
        "Private Tech Firms & EdTech Startups – Mentorship and sponsorship",
        "State Education Boards – Implementation and scale-up support",
      ],
    },
  },
  {
    id: "key-projects",
    title: "Key Projects and Performance Indicators",
    icon: Target,
    color: "#24c2c2",
    content: {
      description:
        "The National Senior Secondary Education Commission (NSSEC) implements a series of transformative projects aimed at improving the quality, inclusivity, and competitiveness of senior secondary education in Nigeria. To ensure accountability and impact, each project is guided by clear Performance Indicators (PIs) aligned with national development goals and global education standards.",
      projects: [
        {
          title: "National Minimum Standards Implementation",
          objective:
            "Establish a unified, benchmarked curriculum and school standards across all states.",
          activities: [
            "Distribution of the National Minimum Standards document",
            "Sensitization workshops for states and schools",
            "Monitoring compliance through inspection tools",
          ],
          indicators: [
            "% of states adopting the standards",
            "% of schools meeting minimum infrastructure and teaching quality benchmarks",
            "Number of monitoring visits and reports generated",
          ],
        },
        {
          title: "AI & Digital Literacy Training (Google Partnership)",
          objective:
            "Build digital competencies among teachers to support 21st-century learning.",
          activities: [
            "Training of 6,000 teachers in AI fundamentals",
            "Provision of digital learning toolkits",
            "Monitoring of classroom integration practices",
          ],
          indicators: [
            "Number of teachers trained per state",
            "Teacher competency scores pre- and post-training",
            "% of trained teachers actively using digital tools in classrooms",
          ],
        },
        {
          title: "Safe School Program",
          objective:
            "Improve school security, child protection, and emergency preparedness.",
          activities: [
            "Development of Safe School protocols",
            "Installation of security infrastructure",
            "Training of teachers and school safety committees",
          ],
          indicators: [
            "% of schools with approved safety plans",
            "Number of reported incidents and response times",
            "Number of trained safety personnel per state",
          ],
        },
        {
          title: "School Farming Initiative",
          objective:
            "Reintroduce agriculture as a practical, skills-based subject in schools.",
          activities: [
            "Identification of pilot schools",
            "Setup of school farms and agricultural clubs",
            "Technical training in agribusiness and sustainability",
          ],
          indicators: [
            "Number of functional school farms",
            "% of students participating in agricultural activities",
            "Yields recorded per school/project",
          ],
        },
        {
          title:
            "Establishment of State Senior Secondary Education Boards (SSSEBs)",
          objective:
            "Decentralize implementation and improve coordination at the state level.",
          activities: [
            "Advocacy and sensitization visits",
            "Technical support for board formation",
            "Alignment of state education plans with NSSEC strategy",
          ],
          indicators: [
            "Number of states with established SSSEBs",
            "Functionality score (based on structure, staffing, and reporting)",
            "Number of states accessing NSSEC grants or interventions",
          ],
        },
        {
          title: "Senior Secondary Education Data Bank",
          objective:
            "Support data-driven planning, decision-making, and reporting.",
          activities: [
            "Setup of centralized data systems",
            "Training of state-level data officers",
            "Annual school census and performance tracking",
          ],
          indicators: [
            "% of schools with updated profiles in the database",
            "Frequency and accuracy of submitted data",
            "Utilization rate of data for planning and budgeting",
          ],
        },
        {
          title: "TVET and Innovation Exhibitions",
          objective:
            "Promote technical and vocational skills among senior secondary students.",
          activities: [
            "Organization of state and national exhibitions",
            "Student innovation competitions",
            "Engagement with private sector and skills hubs",
          ],
          indicators: [
            "Number of exhibitions held",
            "Student participation rate",
            "Number of projects commercialized or adopted for mentorship",
          ],
        },
      ],
    },
  },
  {
    id: "constituency-projects",
    title: "Constituency Projects",
    icon: MapPin,
    color: "#24c2c2",
    content: {
      description:
        "The National Senior Secondary Education Commission (NSSEC) collaborates with members of the National Assembly to implement Constituency Projects that directly impact the development of senior secondary education at the grassroots level. These projects are aimed at addressing local educational needs through targeted infrastructure, training, and resource support initiatives.",
      objectives: [
        "To ensure equitable distribution of educational resources across constituencies",
        "To strengthen the presence and impact of NSSEC programs in underserved communities",
        "To promote legislative support for the advancement of senior secondary education",
        "To complement national policies with localized interventions tailored to community needs",
      ],
      projectTypes: [
        {
          title: "School Construction and Renovation",
          details: [
            "Classrooms, science labs, libraries, and administrative blocks",
            "Boreholes, perimeter fencing, and solar-powered lighting systems",
          ],
        },
        {
          title: "Furniture and Equipment Supply",
          details: [
            "Provision of desks, chairs, whiteboards, computers, and laboratory equipment",
          ],
        },
        {
          title: "Digital Learning Infrastructure",
          details: [
            "ICT centers, e-learning labs, and internet-enabled classrooms",
          ],
        },
        {
          title: "Teacher Training and Capacity Building",
          details: [
            "In-service training workshops, curriculum orientation, and digital literacy sessions",
          ],
        },
        {
          title: "School Farming and Agricultural Empowerment Projects",
          details: [
            "Tools and inputs for school farms",
            "Capacity building in agro-entrepreneurship",
          ],
        },
        {
          title: "Safe School Support",
          details: [
            "Security equipment and emergency response kits",
            "Establishment of safe space corners and student counselling units",
          ],
        },
      ],
      process: [
        "Constituency needs are identified through consultation with local education stakeholders",
        "NSSEC provides technical specifications and quality assurance guidelines",
        "Projects are implemented through accredited contractors and monitored for compliance",
        "NSSEC ensures alignment with national education standards and long-term school development goals",
      ],
      roles: [
        {
          title: "Legislators",
          responsibilities:
            "Nominate projects, mobilize community support, and ensure oversight",
        },
        {
          title: "NSSEC",
          responsibilities:
            "Provide technical guidance, monitor implementation, and evaluate impact",
        },
        {
          title: "State Ministries of Education",
          responsibilities:
            "Assist with validation, supervision, and sustainability",
        },
        {
          title: "Communities and Schools",
          responsibilities:
            "Support usage, maintenance, and ownership of completed projects",
        },
      ],
      outcomes: [
        "Improved learning environments and access to quality education",
        "Enhanced visibility of NSSEC's role at the constituency level",
        "Strengthened collaboration between government, legislators, and communities",
        "Sustainable education interventions tailored to the needs of local students and schools",
      ],
    },
  },
  {
    id: "advocacy-sensitization",
    title: "Advocacy and Sensitization Visits",
    icon: Megaphone,
    color: "#24c2c2",
    content: {
      description:
        "The National Senior Secondary Education Commission (NSSEC) actively engages in advocacy and sensitisation visits to mobilize support, foster collaboration, and enhance stakeholder understanding of its mandate and strategic goals. These visits are integral to promoting ownership, policy alignment, and effective implementation of senior secondary education reforms at the state and community levels.",
      purpose: [
        "To educate stakeholders on the NSSEC Act and its implications for state-level education governance",
        "To encourage the establishment of State Senior Secondary Education Boards (SSSEBs)",
        "To sensitise stakeholders on key policies and programs (e.g., Minimum Standards, Safe School Program, AI Teacher Training)",
        "To mobilize commitment and resources from state governments, development partners, and private sector actors",
      ],
      stakeholders: [
        "State Governors and Commissioners of Education",
        "State Houses of Assembly Committees on Education",
        "Education Boards and School Principals",
        "Traditional and Community Leaders",
        "Development Partners and Civil Society Organizations",
        "Media Outlets for public awareness and accountability",
      ],
      coreMessages: [
        "The need for standardized and globally competitive senior secondary education",
        "The importance of establishing SSSEBs for sustainable educational reform",
        "Benefits of NSSEC's programs for teachers, students, and communities",
        "The critical role of safety, data, and innovation in transforming education outcomes",
      ],
      outcomes: [
        "Increased adoption of NSSEC policy frameworks at the state level",
        "Enhanced stakeholder awareness and engagement in program implementation",
        "Greater alignment between federal and state education strategies",
        "Strengthened state participation in teacher training, digital literacy, and agriculture promotion initiatives",
      ],
      recentVisits: [
        "Nasarawa State – Commitment to align with NSSEC laws and train 130 teachers in AI",
      ],
    },
  },
];
const Projects = ({ programs = mockPrograms }) => {
  const [activeSection, setActiveSection] = useState("safe-school");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 400);
  
      const sections = programs.map((p) => p.id);
      const currentSection = sections.find((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // check if section is around the middle of the viewport
          return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
        }
        return false;
      });
  
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, programs]);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationItems = [
    { id: 'safe-school', label: 'Safe School Initiative', icon: <Shield className="w-4 h-4" /> },
    { id: 'tvet', label: 'TVET', icon: <Wrench className="w-4 h-4" /> },
    { id: 'monitoring-learning', label: 'Monitoring Learning', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'school-management', label: 'School Management', icon: <Users className="w-4 h-4" /> },
    { id: 'reskilling-teachers', label: 'Reskilling Teachers', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'robotics-ai', label: 'Robotics & AI', icon: <Bot className="w-4 h-4" /> },
    { id: 'key-projects', label: 'Key Projects', icon: <Target className="w-4 h-4" /> },
    { id: 'constituency-projects', label: 'Constituency Projects', icon: <MapPin className="w-4 h-4" /> },
    { id: 'advocacy-sensitization', label: 'Advocacy Visits', icon: <Megaphone className="w-4 h-4" /> }
  ];
  return (
    <div>

        {/* Programs Navigation */}
<div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
  {/* Desktop Navigation */}
  <div className="hidden lg:flex overflow-x-auto gap-2 scrollbar-hide">
    {navigationItems.map((item) => (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 text-sm font-medium ${
          activeSection === item.id
            ? "bg-[#242c2c] text-white shadow-lg scale-105"
            : "text-gray-600 hover:bg-gray-100 hover:text-[#242c2c]"
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    ))}
  </div>

  {/* Mobile Menu Button */}
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
  >
    {mobileMenuOpen ? (
      <X className="w-6 h-6" />
    ) : (
      <Menu className="w-6 h-6" />
    )}
  </button>
</div>

{/* Mobile Navigation */}
{mobileMenuOpen && (
  <div className="lg:hidden bg-white shadow-md border-t border-gray-200">
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-300 text-sm font-medium ${
            activeSection === item.id
              ? "bg-[#242c2c] text-white"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  </div>
)}

      {programs.map((program) => {
        const IconComponent = program.icon;
        return (
        <div
        key={program.id} id={program.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16 border border-gray-100"
        >
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-6">
              <div
                className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: program.color }}
              >
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h2>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-8 flex items-center justify-center border border-gray-200 shadow-inner">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-md">
                  <Camera className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-500 text-xl font-medium">
                  Image for {program.title}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Visual representation of this program
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-10">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg sm:text-xl">
                  {program.content.description}
                </p>
              </div>

              {/* Safe School Initiative Content */}
              {program.id === "safe-school" && (
                <>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Objectives
                    </h3>
                    <div className="grid gap-4">
                      {program.content.objectives.map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gray-50 rounded-xl"
                        >
                          <div
                            className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                            style={{ backgroundColor: program.color }}
                          ></div>
                          <span className="text-gray-700 text-lg">
                            {objective}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <Settings
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Key Components
                    </h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {program.content.keyComponents.map((component, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                        >
                          <h4 className="text-xl font-bold text-gray-900 mb-6">
                            {component.title}
                          </h4>
                          <ul className="space-y-3">
                            {component.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600 text-sm leading-relaxed">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Partnerships
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <p className="text-gray-700 mb-6 font-medium">
                          NSSEC works closely with:
                        </p>
                        <ul className="space-y-3">
                          {program.content.partnerships.map(
                            (partner, index) => (
                              <li
                                key={index}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">{partner}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <TrendingUp
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Expected Outcomes
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.outcomes.map((outcome, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TVET Content */}
              {program.id === "tvet" && (
                <>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Purpose
                    </h3>
                    <div className="grid gap-4">
                      {program.content.purpose.map((purpose, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gray-50 rounded-xl"
                        >
                          <div
                            className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                            style={{ backgroundColor: program.color }}
                          ></div>
                          <span className="text-gray-700 text-lg">
                            {purpose}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <Settings
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Key Features
                    </h3>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {program.content.keyFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                        >
                          <h4 className="text-xl font-bold text-gray-900 mb-6">
                            {feature.title}
                          </h4>
                          <ul className="space-y-3">
                            {feature.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600 text-sm leading-relaxed">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Participants
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.participants.map(
                            (participant, index) => (
                              <li
                                key={index}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">
                                  {participant}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <TrendingUp
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Expected Outcomes
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.outcomes.map((outcome, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Award
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        NSSEC Role
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.nssecRole.map((role, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Monitoring Learning Achievement Content */}
              {program.id === "monitoring-learning" && (
                <>
                  <div className="space-y-8">
                    {program.content.components.map((component, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                          <BarChart3
                            className="w-7 h-7 mr-4"
                            style={{ color: program.color }}
                          />
                          {component.title}
                        </h3>
                        <p className="text-gray-700 text-lg mb-6">
                          {component.description}
                        </p>
                        <div className="grid gap-4">
                          {component.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-start p-4 bg-white rounded-xl border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Target
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Core MLA Principles
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.principles.map(
                            (principle, index) => (
                              <li
                                key={index}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">
                                  {principle}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Settings
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Tools & Mechanisms
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.tools.map((tool, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Expected Benefits
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <ul className="space-y-3">
                        {program.content.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                              style={{ backgroundColor: program.color }}
                            ></div>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* School Management and Reskilling Teachers placeholder content */}
              {(program.id === "school-management" ||
                program.id === "reskilling-teachers") && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200">
                  <IconComponent
                    className="w-20 h-20 mx-auto mb-6"
                    style={{ color: program.color }}
                  />
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {program.content.placeholder}
                  </p>
                </div>
              )}

              {/* Robotics and AI Content */}
              {program.id === "robotics-ai" && (
                <>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Objectives
                    </h3>
                    <div className="grid gap-4">
                      {program.content.objectives.map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gray-50 rounded-xl"
                        >
                          <div
                            className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                            style={{ backgroundColor: program.color }}
                          ></div>
                          <span className="text-gray-700 text-lg">
                            {objective}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <Brain
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Key Components
                    </h3>
                    <div className="space-y-6">
                      {program.content.keyComponents.map((component, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                        >
                          <h4 className="text-xl font-bold text-gray-900 mb-4">
                            {component.title}
                          </h4>
                          {component.description && (
                            <p className="text-gray-700 mb-6">
                              {component.description}
                            </p>
                          )}
                          <ul className="space-y-3">
                            {component.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <TrendingUp
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Expected Outcomes
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.outcomes.map((outcome, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Strategic Partners
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.partners.map((partner, index) => (
                            <li
                              key={index}
                              className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                            >
                              <div
                                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                style={{ backgroundColor: program.color }}
                              ></div>
                              <span className="text-gray-600">{partner}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Key Projects Content */}
              {program.id === "key-projects" && (
                <div className="space-y-8">
                  {program.content.projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
                    >
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                        {project.title}
                      </h3>
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Target
                              className="w-5 h-5 mr-3"
                              style={{ color: program.color }}
                            />
                            Objective
                          </h4>
                          <p className="text-gray-700 mb-6 bg-white p-4 rounded-xl border border-gray-100">
                            {project.objective}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Settings
                              className="w-5 h-5 mr-3"
                              style={{ color: program.color }}
                            />
                            Key Activities
                          </h4>
                          <ul className="space-y-2">
                            {project.activities.map(
                              (activity, activityIndex) => (
                                <li
                                  key={activityIndex}
                                  className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                                >
                                  <div
                                    className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                                    style={{ backgroundColor: program.color }}
                                  ></div>
                                  <span className="text-gray-600 text-sm">
                                    {activity}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <BarChart3
                              className="w-5 h-5 mr-3"
                              style={{ color: program.color }}
                            />
                            Performance Indicators
                          </h4>
                          <ul className="space-y-2">
                            {project.indicators.map(
                              (indicator, indicatorIndex) => (
                                <li
                                  key={indicatorIndex}
                                  className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                                >
                                  <div
                                    className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                                    style={{ backgroundColor: program.color }}
                                  ></div>
                                  <span className="text-gray-600 text-sm">
                                    {indicator}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Constituency Projects Content */}
              {program.id === "constituency-projects" && (
                <>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Objectives
                    </h3>
                    <div className="grid gap-4">
                      {program.content.objectives.map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gray-50 rounded-xl"
                        >
                          <div
                            className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                            style={{ backgroundColor: program.color }}
                          ></div>
                          <span className="text-gray-700 text-lg">
                            {objective}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <Settings
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Types of Constituency Projects Supported by NSSEC
                    </h3>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {program.content.projectTypes.map((type, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                        >
                          <h4 className="text-xl font-bold text-gray-900 mb-6">
                            {type.title}
                          </h4>
                          <ul className="space-y-3">
                            {type.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <Navigation
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Process of Implementation
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                      <ol className="space-y-6">
                        {program.content.process.map((step, index) => (
                          <li
                            key={index}
                            className="flex items-start p-4 bg-white rounded-xl border border-gray-100"
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center mr-6 flex-shrink-0 text-white font-bold text-lg shadow-md"
                              style={{ backgroundColor: program.color }}
                            >
                              {index + 1}
                            </div>
                            <span className="text-gray-700 text-lg">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <UserCheck
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Roles and Responsibilities
                    </h3>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {program.content.roles.map((role, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                        >
                          <h4 className="text-xl font-bold text-gray-900 mb-4">
                            {role.title}
                          </h4>
                          <p className="text-gray-700 bg-white p-4 rounded-xl border border-gray-100">
                            {role.responsibilities}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Expected Outcomes
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <ul className="space-y-3">
                        {program.content.outcomes.map((outcome, index) => (
                          <li
                            key={index}
                            className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                              style={{ backgroundColor: program.color }}
                            ></div>
                            <span className="text-gray-600">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* Advocacy and Sensitization Content */}
              {program.id === "advocacy-sensitization" && (
                <>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <Target
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Purpose of the Visits
                    </h3>
                    <div className="grid gap-4">
                      {program.content.purpose.map((purpose, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gray-50 rounded-xl"
                        >
                          <div
                            className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                            style={{ backgroundColor: program.color }}
                          ></div>
                          <span className="text-gray-700 text-lg">
                            {purpose}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Users
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Key Stakeholders Engaged
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.stakeholders.map(
                            (stakeholder, index) => (
                              <li
                                key={index}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">
                                  {stakeholder}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Mic
                          className="w-7 h-7 mr-4"
                          style={{ color: program.color }}
                        />
                        Core Messages Delivered
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                        <ul className="space-y-3">
                          {program.content.coreMessages.map(
                            (message, index) => (
                              <li
                                key={index}
                                className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                              >
                                <div
                                  className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                  style={{ backgroundColor: program.color }}
                                ></div>
                                <span className="text-gray-600">{message}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp
                        className="w-7 h-7 mr-4"
                        style={{ color: program.color }}
                      />
                      Outcomes of Advocacy Visits
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                      <ul className="space-y-3">
                        {program.content.outcomes.map((outcome, index) => (
                          <li
                            key={index}
                            className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                              style={{ backgroundColor: program.color }}
                            ></div>
                            <span className="text-gray-600">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )
       })}
    </div>
  );
};

export default Projects;
