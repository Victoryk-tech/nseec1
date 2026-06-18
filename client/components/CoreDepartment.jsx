import React, { useState } from "react";
import {
  User,
  Target,
  Users,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react";
import Image from "next/image";
const CoreDepartment = () => {
  const [activeTab, setActiveTab] = useState("Human Resource Management");

  const departments = [
    {
      id: "Human Resource Management",
      name: "Human Resource Management",
      icon: <Users className="w-5 h-5" />,
      head: "Mr. Saleh Bature",
      image: "/bature.jpg",

      email: "bature@nssec.gov.ng",

      content: {
        mission:
          "To serve as the nerve-centre for the effective administration, strategic management, and deployment of the Commission's human capital and resources towards achieving its goals and objectives.",
        mandate: [
          "Strategic management of the Commission's human capital through Talent Management, recruitment, compensation, benefits, and employee welfare.",
          "Learning and skills development for staff.",
          "Ensuring the optimal deployment of administrative and general services.",
        ],
        structure: [
          {
            title: "Appointment, Promotion, and Discipline Division",
            points: [
              "Documentation and posting of newly recruited staff.",
              "Regularizing and gazetting staff appointments.",
              "Handling staff transfers and preparation of promotion briefs.",
              "Addressing appeals and petitions from staff.",
            ],
          },
          {
            title: "Establishment and Records Division",
            points: [
              "Maintaining a Nominal Roll and other staff records.",
              "Handling the Registry functions.",
            ],
          },
          {
            title: "Training and Staff Welfare Division",
            points: [
              "Providing staff training and professional development.",
              "Managing compensation, benefits, and rewards for staff.",
              "Fostering employee welfare and overseeing learning and skills development.",
            ],
          },
          {
            title: "General Service/Store Division",
            points: [
              "Managing the payment of bills (water, electricity, etc.) for the Commission.",
              "Overseeing fuel imprest for project vehicles.",
              "Providing mail services and ensuring the protection of staff and property.",
              "Maintaining office premises, including supervision of cleaning services.",
              "Processing staff requests for office accommodation, furniture, and equipment.",
              "Compiling departmental reports and handling general administration tasks.",
            ],
          },
        ],
        programs: [
          "Recruitment of new staff.",
          "Establishment of zonal offices.",
          "Ongoing training of NSSEC staff.",
        ],
      },
    },
    {
      id: "Planning",
      name: "Planning, Research & Statistics",
      icon: <TrendingUp className="w-5 h-5" />,
      head: "USMAN ABUBAKAR BOKANI ",
      image: "/usman.jpg",
      email: "bokani@nssec.gov.ng",
      content: {
        introduction:
          "The Planning, Research, and Statistics (PRS) department is the backbone of the Commission, providing strategic plans and technical support to ensure effective delivery of the Commission's mandate. It serves as the custodian of senior secondary education data, developing and maintaining databases for schools across the country. The department also oversees the smooth operation of the Commission's Information, Communication, and Technology (ICT) processes.",
        vision:
          "To provide a solid National Senior Secondary Education Policy, deliver real-time data on Nigerian Senior Secondary institutions, and promote a sound reading culture while ensuring accurate documentation and record-keeping.",
        mission:
          "The PRS Department seeks to implement and maintain standards outlined in the Senior Secondary Education policy, ensuring they are scrupulously followed to enhance the sector's effectiveness and global competitiveness.",
        mandate: [
          "Planning and developing educational policies and research aligned with national goals for global competitiveness.",
          "Designing, collecting, collating, and analyzing real-time educational data for informed decision-making.",
          "Managing the Commission's website and providing technical support for the development of Educational Management Information Systems (EMIS) at national, state, and school levels.",
          "Establishing and monitoring library services across the country.",
        ],
        structure: [
          {
            title: "Policy Development and Implementation Branch",
            points: [
              "Policy adherence and compliance unit.",
              "Private sector, NGOs, and international institutions units.",
            ],
          },
          {
            title: "Research and Planning Branch",
            points: [
              "Research and development unit.",
              "Statistics unit.",
              "Publication unit.",
              "Knowledge exchange unit.",
            ],
          },
          {
            title: "ICT Branch",
            points: [
              "Data/information management unit.",
              "Networking, IT support, and helpdesk unit.",
            ],
          },
          {
            title: "Library Services Branch",
            points: [],
          },
        ],
        functions: [
          "Policy Development and Research: Develop and monitor educational policies in line with national goals.",
          "Data Collection and Analysis: Design and manage data collection systems to provide accurate statistical data for planning.",
          "Promote Reading Culture: Advocate for reading clubs in secondary schools and increase library awareness.",
          "ICT and EMIS Management: Oversee the development and management of ICT systems for data management and analysis.",
          "Capacity Building: Provide training for relevant staff to ensure effective policy implementation.",
          "Project Management: Collaborate with donor agencies for support in secondary education initiatives.",
          "Monitoring and Evaluation: Ensure the successful implementation of government policies on admissions, examinations, and student discipline.",
        ],
        activities: [
          "Designing Data Collection Instruments: Creation of tools for data gathering at the secondary school level.",
          "Pilot Testing: Conducted tests in the six geopolitical zones and the Federal Capital Territory (FCT) to ensure the reliability of the instruments.",
          "Data Management: Ensuring accurate data capture, processing, and dissemination to guide the educational policies.",
        ],
      },
    },
    {
      id: "Quality Assurance",
      name: "Quality Assurance",
      icon: <Target className="w-5 h-5" />,
      head: "RABIA UMAR MUHAMMAD ",
      image: "/rabia.jpg",
      email: "rabia@nssec.gov.ng",
      content: {
        vision:
          "To establish a dynamic quality assurance service that ensures effective and efficient education delivery at the Senior Secondary level.",
        mission:
          "To prescribe and monitor the implementation of Minimum Standards of Education that guarantee quality curriculum delivery, fostering effective teaching and learning in Senior Secondary Schools across Nigeria, enabling them to compete globally.",
        mandate: [
          "Ensuring quality inputs, processes, and outputs in education.",
          "Conducting schools evaluation and accreditation.",
          "Fostering the professional development of quality assurance staff.",
          "Overseeing the teaching and learning of core subjects.",
          "Carrying out advocacy and sanctions for erring schools.",
          "Monitoring external examinations (WAEC, NECO, NABTEB).",
          "Prescribing minimum standards for Senior Secondary schools in Nigeria.",
          "Collaborating with NERDC in curriculum development and pedagogy.",
          "Conducting needs assessments on school structures, facilities, and equipment.",
        ],
        units: [
          "Evaluation and Accreditation",
          "Professional Development",
          "Curriculum and Pedagogy",
          "Advocacy and Sanctions",
        ],
        functions: [
          {
            title: "School Evaluation",
            points: [
              "Validating self-evaluations by schools.",
              "Ensuring the availability of educational facilities for trade subjects.",
            ],
          },
          {
            title: "Professional Development",
            points: [
              "Training education officers to acquire skills on quality assurance processes.",
              "Inducting education officers to become certified Quality Assurance agents.",
            ],
          },
          {
            title: "Curriculum and Pedagogy",
            points: [
              "Ensuring adequate application of core subjects in the curriculum.",
              "Developing and administering questionnaires on the implications of core subjects.",
              "Ensuring the availability of relevant teachers and equipment for trade subjects.",
            ],
          },
          {
            title: "Advocacy and Sanctions",
            points: [
              "Promoting sensitization and awareness on the standards expected from schools.",
              "Enforcing sanctions on erring schools.",
            ],
          },
        ],
        activities: [
          "Conducting Needs Assessments on personnel, infrastructure, and equipment in Senior Secondary Schools.",
          "Carrying out Quality Assurance Evaluation and Accreditation of Senior Secondary Schools and monitoring learning achievements nationwide.",
          "Organizing Stakeholders' forums for the development of Minimum Standards for Senior Secondary Education.",
          "Monitoring State Education Boards, including both public and private schools.",
        ],
      },
    },
    {
      id: "Finance",
      name: "Finance and Accounts",
      icon: <FileText className="w-5 h-5" />,
      head: "Salihu Bukar Malgwi ",
      image: "/nssec.jpeg",
      email: "mairiga@nssec.gov.ng",
      content: {
        structure: [
          "Capital Expenditure Division",
          "Recurrent Expenditure Division",
          "Budget Division",
          "Payment and Reporting Division",
          "General Purpose Financial Statements are generated to reflect the financial activities and transactions within the fiscal year.",
        ],
        mandate: [
          "Advising the Executive Secretary and departmental heads on financial matters and legislative/regulatory requirements.",
          "Managing the disbursement of funds from the National Senior Secondary Education Commission to SSEBs (State Senior Secondary Education Boards) and other beneficiaries as directed by the Executive Secretary.",
          "Establishing and maintaining an accounting system with in-built controls approved by the Accountant General of the Federation.",
          "Managing all funds and public monies due and receivable by the Commission.",
          "Advising on audit matters and responding to queries from the Public Accounts Committees.",
          "Budget preparation, monitoring, and performance reporting for the Commission.",
          "Performing any other financial duties as assigned by the Executive Secretary.",
        ],
      },
    },
    {
      id: "Teacher Development",
      name: "Teacher Development & International Partnership",
      icon: <User className="w-5 h-5" />,
      head: "MOHAMMED SALIHU",
      image: "/salihu.jpg",
      email: "salihu@nssec.gov.ng",
      content: {
        note: "Content for this department will be added soon.",
      },
    },
    {
      id: "Internal Audit",
      name: "Internal Audit Unit",
      icon: <Shield className="w-5 h-5" />,
      head: "Aduku Alexander Ojonim",
      image: "/salihu.jpg",

      email: "alexander@nssec.gov.ng",
      content: {
        introduction:
          "The Internal Audit Unit ensures effective managerial control within NSSEC by evaluating and strengthening the internal control system.",
        mandate: [
          "Pre-payment Audit – Conducting 100% audits of all payment vouchers before disbursement.",
          "Post Audit & Reports – Reviewing account books and financial records from the Finance & Accounts Department.",
          "Assets Verification – Keeping records of all NSSEC assets.",
          "Audit Check in Stores – Ensuring all store items are properly documented.",
          "Audit Guide Production & Implementation – Developing an Audit Guide to streamline financial and non-financial transactions.",
          "Management Audit – Auditing programs across NSSEC departments and units.",
        ],
        programs: [
          "Continuous auditing of payment vouchers.",
          "Training auditors on applying IFRS/IPSAS for digital accounts preparation in public sector financial reporting.",
          "Developing an Audit Action Plan for annual operations.",
          "Producing the NSSEC Audit Manual (in progress).",
          "Ongoing audits of NSSEC's financial transactions, stores, plants, and equipment.",
        ],
        conclusion:
          "The Internal Audit Unit plays a crucial role in financial oversight, ensuring transparency, accountability, and compliance with government financial regulations.",
      },
    },
  ];

  const currentDept = departments.find((dept) => dept.id === activeTab);

  const renderContent = (content) => {
    const sections = [];

    if (content.introduction) {
      sections.push(
        <div key="introduction" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {content.introduction}
          </p>
        </div>,
      );
    }

    if (content.vision) {
      sections.push(
        <div key="vision" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Vision</h3>
          <p className="text-gray-700 leading-relaxed">{content.vision}</p>
        </div>,
      );
    }

    if (content.mission) {
      sections.push(
        <div key="mission" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mission</h3>
          <p className="text-gray-700 leading-relaxed">{content.mission}</p>
        </div>,
      );
    }

    if (content.mandate) {
      sections.push(
        <div key="mandate" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mandate</h3>
          <ul className="space-y-3">
            {content.mandate.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>,
      );
    }

    if (
      content.structure &&
      Array.isArray(content.structure) &&
      typeof content.structure[0] === "string"
    ) {
      sections.push(
        <div key="structure-simple" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Structure of the Department
          </h3>
          <ul className="space-y-3">
            {content.structure.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>,
      );
    }

    if (
      content.structure &&
      Array.isArray(content.structure) &&
      typeof content.structure[0] === "object"
    ) {
      sections.push(
        <div key="structure-complex" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Structure and Functions
          </h3>
          {content.structure.map((division, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                {division.title}
              </h4>
              <ul className="space-y-2">
                {division.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>,
      );
    }

    if (content.units) {
      sections.push(
        <div key="units" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Units under the Department
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.units.map((unit, index) => (
              <div
                key={index}
                className="p-3 bg-teal-50 rounded-lg border border-teal-100"
              >
                <span className="text-gray-800 font-medium">{unit}</span>
              </div>
            ))}
          </div>
        </div>,
      );
    }

    if (
      content.functions &&
      Array.isArray(content.functions) &&
      typeof content.functions[0] === "string"
    ) {
      sections.push(
        <div key="functions-simple" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Functions of the Department
          </h3>
          <ul className="space-y-3">
            {content.functions.map((func, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">{func}</span>
              </li>
            ))}
          </ul>
        </div>,
      );
    }

    if (
      content.functions &&
      Array.isArray(content.functions) &&
      typeof content.functions[0] === "object"
    ) {
      sections.push(
        <div key="functions-complex" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Functions of the Department
          </h3>
          {content.functions.map((func, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                {func.title}
              </h4>
              <ul className="space-y-2">
                {func.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>,
      );
    }

    if (content.programs) {
      sections.push(
        <div key="programs" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Programs & Activities
          </h3>
          <ul className="space-y-3">
            {content.programs.map((program, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">{program}</span>
              </li>
            ))}
          </ul>
        </div>,
      );
    }

    if (content.activities) {
      sections.push(
        <div key="activities" className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Activities Carried Out
          </h3>
          <ul className="space-y-3">
            {content.activities.map((activity, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">
                  {activity}
                </span>
              </li>
            ))}
          </ul>
        </div>,
      );
    }

    if (content.conclusion) {
      sections.push(
        <div key="conclusion" className="mb-8">
          <p className="text-gray-700 leading-relaxed font-medium bg-teal-50 p-4 rounded-lg border-l-4 border-teal-400">
            {content.conclusion}
          </p>
        </div>,
      );
    }

    if (content.note) {
      sections.push(
        <div key="note" className="mb-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{content.note}</p>
          </div>
        </div>,
      );
    }

    return sections;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl 2xl:max-w-[85rem] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex overflow-x-auto py-4">
            <div className="flex space-x-1 min-w-max">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === dept.id
                      ? "bg-teal-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  {dept.icon}
                  <span className="text-sm lg:text-base">{dept.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl 2xl:max-w-[85rem] mx-auto px-2 sm:px-4 lg:px-6 py-8">
        {currentDept && (
          <div className="space-y-8">
            {/* Department Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-teal-100 rounded-full">
                  {React.cloneElement(currentDept.icon, {
                    className: "w-8 h-8 text-teal-600",
                  })}
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {currentDept.name}
              </h1>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Head of Unit Section */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Head of Unit
                  </h3>
                  <div className="text-center">
                    {/* Image*/}

                    <div className="relative w-24 h-24 mb-4 rounded-full flex items-center justify-center mx-auto overflow-hidden border-3 border-[#24C2C2]/20 shadow-md group-hover:border-[#24C2C2]/50 transition-all duration-300">
                      <Image
                        src={currentDept.image}
                        alt={currentDept.head}
                        fill
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
                    <p className="font-medium text-gray-900">
                      {currentDept.head || "To be announced"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Department Head
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  {renderContent(currentDept.content)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoreDepartment;
