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
  User,
} from "lucide-react";


const mockPrograms = [
    {
      id: "safe-school",
      title: "Safe School Initiative",
      icon: Shield,
      color: "#24c2c2",
      head: "Dr. Sarah Adebayo",
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
      head: "Engr. Michael Okonkwo",
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
      head: "Prof. Amina Hassan",
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
      head: "Mr. Ibrahim Yusuf",
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
      head: "Dr. Fatima Abdullahi",
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
      head: "Dr. Chinedu Eze",
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
      id: "advocacy-sensitization",
      title: "Advocacy and Sensitization Visits",
      icon: Megaphone,
      color: "#24c2c2",
      head: "Dr. Kemi Ogundipe",
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
    {
      id: "safe-school",
      label: "Safe School Initiative",
      icon: <Shield className="w-4 h-4" />,
    },
    { id: "tvet", label: "TVET", icon: <Wrench className="w-4 h-4" /> },
    {
      id: "monitoring-learning",
      label: "Monitoring Learning",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "school-management",
      label: "School Management",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "reskilling-teachers",
      label: "Reskilling Teachers",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: "robotics-ai",
      label: "Robotics & AI",
      icon: <Bot className="w-4 h-4" />,
    },
  
   
    {
      id: "advocacy-sensitization",
      label: "Advocacy Visits",
      icon: <Megaphone className="w-4 h-4" />,
    },
  ];

  const currentProgram = programs.find((program) => program.id === activeSection);

  const renderContent = (content, programId, programColor) => {
    const sections = [];

    if (content.description) {
      sections.push(
        <div key="description" className="mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            {content.description}
          </p>
        </div>
      );
    }

    if (content.placeholder) {
      sections.push(
        <div
          key="placeholder"
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200"
        >
          <p className="text-gray-600 text-lg leading-relaxed">
            {content.placeholder}
          </p>
        </div>
      );
    }

    // Safe School Initiative Content
    if (programId === "safe-school") {
      if (content.objectives) {
        sections.push(
          <div key="objectives" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Objectives
            </h3>
            <div className="grid gap-4">
              {content.objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                    style={{ backgroundColor: programColor }}
                  ></div>
                  <span className="text-gray-700">{objective}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (content.keyComponents) {
        sections.push(
          <div key="keyComponents" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Key Components
            </h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {content.keyComponents.map((component, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {component.title}
                  </h4>
                  <ul className="space-y-3">
                    {component.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: programColor }}
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
        );
      }

      if (content.partnerships && content.outcomes) {
        sections.push(
          <div key="partnerships-outcomes" className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Partnerships
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.partnerships.map((partner, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{partner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Expected Outcomes
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }
    }

    // TVET Content
    if (programId === "tvet") {
      if (content.purpose) {
        sections.push(
          <div key="purpose" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Purpose
            </h3>
            <div className="grid gap-4">
              {content.purpose.map((purpose, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                    style={{ backgroundColor: programColor }}
                  ></div>
                  <span className="text-gray-700">{purpose}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (content.keyFeatures) {
        sections.push(
          <div key="keyFeatures" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Key Features
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {content.keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h4>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: programColor }}
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
        );
      }

      if (content.participants && content.outcomes && content.nssecRole) {
        sections.push(
          <div key="tvet-additional" className="grid lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Participants
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.participants.map((participant, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{participant}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Expected Outcomes
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-3" style={{ color: programColor }} />
                NSSEC Role
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.nssecRole.map((role, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }
    }

    // Monitoring Learning Achievement Content
    if (programId === "monitoring-learning") {
      if (content.components) {
        sections.push(
          <div key="components" className="space-y-8 mb-8">
            {content.components.map((component, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3" style={{ color: programColor }} />
                  {component.title}
                </h3>
                <p className="text-gray-700 mb-6">{component.description}</p>
                <div className="grid gap-4">
                  {component.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-start p-4 bg-white rounded-xl border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (content.principles && content.tools) {
        sections.push(
          <div key="principles-tools" className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Core MLA Principles
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.principles.map((principle, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Tools & Mechanisms
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.tools.map((tool, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }

      if (content.benefits) {
        sections.push(
          <div key="benefits" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Expected Benefits
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <ul className="space-y-3">
                {content.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: programColor }}
                    ></div>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
    }

    // Robotics and AI Content
    if (programId === "robotics-ai") {
      if (content.objectives) {
        sections.push(
          <div key="objectives" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Objectives
            </h3>
            <div className="grid gap-4">
              {content.objectives.map((objective, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                    style={{ backgroundColor: programColor }}
                  ></div>
                  <span className="text-gray-700">{objective}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (content.keyComponents) {
        sections.push(
          <div key="keyComponents" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Key Components
            </h3>
            <div className="space-y-6">
              {content.keyComponents.map((component, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {component.title}
                  </h4>
                  {component.description && (
                    <p className="text-gray-700 mb-6">{component.description}</p>
                  )}
                  <ul className="space-y-3">
                    {component.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start p-3 bg-white rounded-lg border border-gray-100">
                        <div
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: programColor }}
                        ></div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (content.outcomes && content.partners) {
        sections.push(
          <div key="outcomes-partners" className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Expected Outcomes
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Strategic Partners
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.partners.map((partner, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{partner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }
    }

  

    // Advocacy and Sensitization Content
    if (programId === "advocacy-sensitization") {
      if (content.purpose) {
        sections.push(
          <div key="purpose" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Purpose of the Visits
            </h3>
            <div className="grid gap-4">
              {content.purpose.map((purpose, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <div
                    className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0"
                    style={{ backgroundColor: programColor }}
                  ></div>
                  <span className="text-gray-700">{purpose}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (content.stakeholders && content.coreMessages) {
        sections.push(
          <div key="stakeholders-messages" className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Key Stakeholders Engaged
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.stakeholders.map((stakeholder, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{stakeholder}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Mic className="w-6 h-6 mr-3" style={{ color: programColor }} />
                Core Messages Delivered
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <ul className="space-y-3">
                  {content.coreMessages.map((message, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: programColor }}
                      ></div>
                      <span className="text-gray-600">{message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }

      if (content.outcomes) {
        sections.push(
          <div key="outcomes" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Outcomes of Advocacy Visits
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <ul className="space-y-3">
                {content.outcomes.map((outcome, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: programColor }}
                    ></div>
                    <span className="text-gray-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      if (content.recentVisits) {
        sections.push(
          <div key="recentVisits" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="w-6 h-6 mr-3" style={{ color: programColor }} />
              Recent Visits Highlights
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <ul className="space-y-3">
                {content.recentVisits.map((visit, index) => (
                  <li
                    key={index}
                    className="flex items-start p-3 bg-white rounded-lg border border-gray-100"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: programColor }}
                    ></div>
                    <span className="text-gray-600">{visit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
    }

    return sections;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl 2xl:max-w-[85rem] mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex overflow-x-auto py-4">
            <div className="flex space-x-1 min-w-max">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeSection === item.id
                      ? "bg-[#24c2c2] text-white shadow-md"
                      : "text-gray-700 hover:text-[#24c2c2] hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden px-4 pb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg"
          >
            <Menu className="w-4 h-4" />
            <span className="text-sm">Menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-[#24c2c2] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl 2xl:max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {programs.map((program) => (
          <section
            key={program.id}
            id={program.id}
            className="mb-16 scroll-mt-20"
          >
            {/* Program Header */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
                  style={{ backgroundColor: program.color }}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Program Content */}
            <div className="prose max-w-none">
              {renderContent(program.content, program.id, program.color)}
            </div>
          </section>
        ))}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#24c2c2] text-white rounded-full shadow-lg hover:bg-[#1fb1b1] transition-colors duration-200 z-50 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Projects;