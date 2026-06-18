export const PROGRAMS_NAV_ITEMS = [
  { label: "All Programs", path: "/programs" },
  { label: "Safe School Initiative", path: "/programs/safe-school" },
  { label: "TVET", path: "/programs/tvet" },
  { label: "Monitoring Learning Achievement", path: "/programs/monitoring-learning" },
  { label: "School Management Committee", path: "/programs/school-management" },
  { label: "Reskilling Teachers", path: "/programs/reskilling-teachers" },
  { label: "Robotics & AI", path: "/programs/robotics-ai" },
  { label: "Advocacy & Sensitization", path: "/programs/advocacy-sensitization" },
];

export const SAFE_SCHOOL = {
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
        "Partnering with FME and security agencies for compliance monitoring",
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
};

export const TVET = {
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
    "Collaboration with FME, NBTE, and relevant stakeholders for quality assurance",
  ],
};

export const MONITORING_LEARNING = {
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
};

export const SCHOOL_MANAGEMENT = {
  description:
    "School Based Management Committees (SBMCs) are integral to the governance and community engagement framework of senior secondary schools under the National Senior Secondary Education Commission (NSSEC). They represent a decentralized approach to school administration that empowers communities, parents, and stakeholders to take ownership of their schools.",
  functions: [
    "Approval and review of school improvement plans and annual budgets",
    "Oversight of school infrastructure maintenance and development projects",
    "Mobilization of community resources for school support",
    "Resolution of conflicts between school management and community stakeholders",
    "Advocacy for improved school conditions and adequate provision of learning materials",
    "Monitoring teacher and student attendance, performance, and welfare",
  ],
  structure: [
    { role: "Chairperson", description: "A respected community leader elected by parents and stakeholders" },
    { role: "Secretary", description: "Usually the Vice-Principal (Administration) of the school" },
    { role: "Parent Representatives", description: "At least three elected parents from the Parent-Teacher Association" },
    { role: "Teacher Representative", description: "A teacher elected by the staff of the school" },
    { role: "Student Representative", description: "Head boy or head girl of the school" },
    { role: "Community Members", description: "Representatives from local government, civil society, or faith bodies" },
  ],
  benefits: [
    "Greater community ownership and accountability for school outcomes",
    "Increased transparency in school budget management and resource allocation",
    "Faster identification and resolution of school-level challenges",
    "Enhanced parent-teacher collaboration for student welfare",
    "Stronger linkage between school programs and community development goals",
  ],
  nssecRole: [
    "Development of national guidelines and frameworks for SBMC establishment and operations",
    "Capacity building training for SBMC members on governance and financial management",
    "Coordination with state education authorities to ensure consistent SBMC implementation",
    "Monitoring and evaluation of SBMC performance across all geopolitical zones",
  ],
};

export const RESKILLING_TEACHERS = {
  description:
    "The National Senior Secondary Education Commission recognizes the critical importance of continuously upgrading teacher competencies to meet evolving educational standards and student needs. The Reskilling Teachers in Core Subjects program provides structured professional development to ensure every teacher is equipped with current knowledge, modern pedagogy, and digital tools.",
  coreSubjects: [
    { subject: "Mathematics", areas: ["Problem-based learning", "Technology-assisted instruction", "Examination technique coaching"] },
    { subject: "English Language", areas: ["Communicative teaching methods", "Reading comprehension strategies", "Writing process instruction"] },
    { subject: "Sciences (Physics, Chemistry, Biology)", areas: ["Practical/laboratory skills", "STEM integration", "Inquiry-based learning"] },
    { subject: "Social Studies & Civic Education", areas: ["Critical thinking facilitation", "Project-based learning", "Digital research literacy"] },
  ],
  trainingModalities: [
    "Residential workshops and boot camps at zonal training centers",
    "School-based in-service training led by master teachers",
    "Online and blended learning through the NSSEC digital platform",
    "Peer coaching and collaborative learning communities",
    "University-NSSEC partnership programs for subject specialization",
  ],
  outcomes: [
    "Improved student achievement in WAEC and NECO examinations",
    "Stronger teacher confidence and motivation in classroom delivery",
    "Wider adoption of student-centred and technology-aided teaching methods",
    "Reduced teacher absenteeism and higher professional engagement",
    "Creation of a national network of master teachers to sustain CPD",
  ],
  partners: [
    "Federal Ministry of Education – Policy alignment and funding",
    "National Teachers' Institute (NTI) – Training delivery and certification",
    "State Education Ministries – Implementation and logistics",
    "University Education Faculties – Subject mastery and research",
    "EdTech Partners – Digital tools and online course development",
  ],
};

export const ROBOTICS_AI = {
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
        "Nasarawa State alone has 130 teachers currently undergoing this training",
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
};

export const ADVOCACY_SENSITIZATION = {
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
    "Cross River State – Sensitization on minimum standards and SSSEB establishment",
    "Kano State – Advocacy for TVET curriculum adoption and school safety compliance",
  ],
};
