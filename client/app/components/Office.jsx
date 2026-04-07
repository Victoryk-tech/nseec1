import React, { useState } from 'react';
import { ChevronRight, Users, Scale, ShoppingCart, Building, Shield } from 'lucide-react';
import Image from "next/image";

const Office = () => {
  const [activeSection, setActiveSection] = useState('legal');
  const units = [
    {
      name: "Head, Reform Cordination (SERVICOM & ACTU) Unit",
      head: "OKWORI MARY FAVOUR",
      image: "/mary.jpg",
     
      email: "mary@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Legal Unit",
      head: "Barr. (Mrs) Maryam sidi Ali",
      image: "/nssec.jpeg",
     
      email: "maryam@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Press Publication and Protocol",
      head: "Fatima Bappare",
      image: "/fati.jpg",
     
      email: "fatimar@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Internal Audit Unit",
      head: "ADUKU ALEXANDER OJONIM",
      image: "/aduku.jpg",
     
      email: "aduku@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "Head, Physical planning unit",
      head: "Arc. Maimuna Lami",
      image: "/nssec.jpeg",
      
      email: "lami@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
    {
      name: "HEAD PROCUREMENT UNIT",
      head: "OGUNDANA OLABODE JOSIAH ",
      image: "/josiah.jpg",
     
      email: "josiah@nssec.gov.ng",
      phone: "+234 000 000 0000",
    },
  ];

  const sections = [
    { id: 'legal', name: 'Legal Units', icon: Scale },
    { id: 'protocol', name: 'Public Relations and Protocol Unit', icon: Users },
    { id: 'procurement', name: 'Procurement Unit', icon: ShoppingCart },
    { id: 'physical', name: 'Physical and Planning Unit', icon: Building },
    { id: 'actu', name: 'ACTU & SERVICOM Unit', icon: Shield }
  ];

  const sectionData = {
    legal: {
      title: 'Legal Unit – National Senior Secondary Education Commission (NSSEC)',
      head: "Barr. (Mrs) Maryam sidi Ali",
      vision: 'To establish a dynamic and efficient legal unit staffed with dedicated professionals committed to delivering high-quality legal services that support the Commission\'s mission. The unit is also focused on law reform initiatives aimed at improving senior secondary education in Nigeria and addressing the issue of out-of-school children.',
      mission: 'To ensure strict adherence to legal and regulatory frameworks by providing expert legal guidance, upholding due process, and supporting the Commission in fostering a robust and sustainable senior secondary education system.',
      content: {
        'Mandate and Core Functions': 'The Legal Unit is responsible for providing legal advisory services, handling litigation, drafting legal documents, and ensuring compliance with regulatory requirements.',
        'Legal Advisory & Representation': [
          'Providing legal counsel on all matters concerning the Commission',
          'Prosecuting cases on behalf of NSSEC and liaising with external solicitors',
          'Representing NSSEC in collective bargaining and industrial relations negotiations',
          'Reviewing judicial decisions relevant to secondary education'
        ],
        'Contract & Property Management': [
          'Drafting and vetting contractual agreements, leases, and tenancy agreements',
          'Overseeing insurance claims and ensuring adequate coverage for staff and properties',
          'Securing title deeds for all NSSEC properties and negotiating acquisitions for zonal offices'
        ],
        'Legislation & Policy Development': [
          'Reviewing and preparing amendments to laws governing senior secondary education',
          'Drafting legal instruments such as deeds of guarantees and powers of attorney',
          'Engaging in legislative drafting and participating in National Assembly public hearings',
          'Ensuring alignment of State Secondary Education Board (SSEB) laws with NSSEC regulations'
        ],
        'Dispute Resolution & Compliance': [
          'Handling legal proceedings and engaging in Alternative Dispute Resolution (ADR) as required',
          'Ensuring compliance with the Procurement Act 2007 in all procurement processes',
          'Conducting legal verification of contracting companies through the Corporate Affairs Commission (CAC) and other regulatory bodies'
        ],
        'Advocacy, Awareness, and Sensitization': [
          'Organizing workshops on regulatory frameworks for NSSEC and SSEBs',
          'Conducting sensitization campaigns on legal issues such as exam malpractice, school violence, and the implementation of Safe School Initiatives',
          'Providing a focal desk for the Freedom of Information Act (FOIA) to enhance transparency'
        ],
        'Key Projects and Initiatives': [
          'Drafting and advocating for the NSSEC Amendment Bill',
          'Presentation of policy memoranda at the Joint Consultative Committee on Education (JCCE)',
          'Engagement with educational stakeholders to enhance understanding and support for the NSSEC Bill'
        ]
      }
    },
    protocol: {
      title: 'Protocol, Press, and Public Relations Unit – National Senior Secondary Education Commission (NSSEC)',
      head: "Fatima Bappare",
      vision: 'To establish a result-oriented and media-friendly Public Relations Unit that fosters positive engagement with stakeholders while enhancing the Commission\'s public image in line with its objectives.',
      mission: 'To cultivate sustainable and mutually beneficial relationships between NSSEC, the media, and the general public through effective service delivery and strategic communication.',
      content: {
        'Core Mandate': 'The unit focuses on three key areas: Publicity, Publications, and New Media.',
        'Publicity': [
          'Collates, processes, and disseminates information on NSSEC\'s activities to the public',
          'Manages advertising for NSSEC programs beyond direct media relations',
          'Oversees corporate image management and public perception of the Commission',
          'Maintains strong media relations to ensure balanced coverage'
        ],
        'Publications': [
          'Plans and executes nationwide circulation of internal publications',
          'Maintains a mini-library and archives for internal and external reference materials',
          'Acts as the editorial hub for NSSEC\'s publications',
          'Coordinates and oversees publications from NSSEC\'s state offices'
        ],
        'New Media': [
          'Manages NSSEC\'s digital presence on social media platforms (Facebook, Twitter, Instagram, WhatsApp, Email, etc.)',
          'Utilizes computer-generated tools for communication with stakeholders'
        ],
        'Press and Public Relations Functions': [
          'Ensures positive projection of the Executive Secretary and the Commission to the public and media',
          'Monitors media reports, radio/TV broadcasts, and public opinions about NSSEC\'s policies and programs',
          'Compiles daily press clippings on NSSEC\'s coverage in newspapers',
          'Publicizes NSSEC\'s programs through feature articles, documentaries, in-house journals, posters, and brochures',
          'Conducts press briefings, press conferences, and media relations activities',
          'Manages advertising placements, announcements, and jingles across media platforms',
          'Organizes familiarization tours to major media houses',
          'Handles video coverage, photography, and album production for NSSEC events'
        ],
        'Protocol Services': [
          'Plans and coordinates all official and local travels for NSSEC executives, directors, and staff',
          'Handles air ticket reservations for both domestic and international travel',
          'Facilitates Note Verbale processing with the Ministry of Foreign Affairs',
          'Manages the issuance of official passports for NSSEC personnel',
          'Arranges transportation and accommodation for Board Members',
          'Organizes official receptions and catering services',
          'Oversees visa processing, health documentation, and currency exchange for international travel'
        ]
      }
    },
    procurement: {
      title: 'Project & Procurement – NSSEC',
      head: "OGUNDANA OLABODE JOSIAH ",
      vision: 'To deliver impactful projects and ensure seamless procurement processes that align with global standards and best practices, integrating innovation, efficiency, and sustainability.',
      mission: 'To support NSSEC\'s mission of driving excellence in education, technology, and infrastructure development through strategic project management and transparent procurement processes.',
      content: {
        'Projects Overview': 'NSSEC leads and manages various strategic initiatives aimed at fostering national development across multiple sectors.',
        'Education & Capacity Building': [
          'Implementing cutting-edge educational programs',
          'Skill development workshops',
          'Technology-driven learning solutions'
        ],
        'Technology & Innovation': [
          'Establishing digital learning hubs',
          'Robotics labs development',
          'AI-driven solutions for enhanced educational experiences'
        ],
        'Infrastructure Development': [
          'Constructing modern educational facilities',
          'Equipping research facilities',
          'Supporting innovation and knowledge transfer'
        ],
        'Public-Private Partnerships': [
          'Collaborating with government agencies',
          'Working with international organizations',
          'Partnering with private enterprises for sustainable growth'
        ],
        'Procurement Approach': [
          'Needs Assessment – Identifying project requirements and defining specifications',
          'Supplier Selection – Engaging credible vendors through open and competitive bidding',
          'Contracting & Negotiation – Ensuring fair terms and compliance with regulatory standards',
          'Implementation & Delivery – Monitoring supplier performance and quality assurance',
          'Evaluation & Reporting – Assessing procurement efficiency and impact for continuous improvement'
        ]
      }
    },
    physical: {
      title: 'Physical and Planning Unit – NSSEC',
      head: "Arc. Maimuna Lami",
      vision: 'To create and maintain world-class physical infrastructure and strategic planning frameworks that support NSSEC\'s educational mission and ensure optimal resource utilization.',
      mission: 'To provide comprehensive physical planning, infrastructure development, and facility management services that enhance the Commission\'s operational efficiency and educational delivery.',
      content: {
        'Core Functions': 'The Physical and Planning Unit is responsible for infrastructure development, facility management, and strategic physical planning across all NSSEC operations.',
        'Infrastructure Development': [
          'Planning and overseeing construction of new educational facilities',
          'Modernizing existing infrastructure to meet contemporary standards',
          'Ensuring compliance with building codes and safety regulations',
          'Coordinating with contractors and consultants for major projects'
        ],
        'Facility Management': [
          'Maintaining NSSEC headquarters and zonal offices',
          'Managing utilities and essential services',
          'Overseeing security systems and access control',
          'Coordinating cleaning and maintenance services'
        ],
        'Strategic Planning': [
          'Developing long-term infrastructure master plans',
          'Conducting feasibility studies for new projects',
          'Space planning and optimization for educational activities',
          'Asset management and inventory control'
        ],
        'Environmental and Safety Management': [
          'Implementing environmental sustainability practices',
          'Ensuring workplace safety and health standards',
          'Managing waste disposal and environmental compliance',
          'Conducting regular safety audits and assessments'
        ],
        'Technology Integration': [
          'Planning ICT infrastructure for digital learning environments',
          'Coordinating installation of educational technology systems',
          'Managing network infrastructure and connectivity',
          'Supporting smart building initiatives'
        ]
      }
    },
    actu: {
      title: 'ACTU & SERVICOM Unit – NSSEC',
      head: "OKWORI MARY FAVOUR",
      vision: 'To establish efficient service delivery mechanisms and maintain high standards of public service through effective anti-corruption measures and service improvement initiatives.',
      mission: 'To ensure transparency, accountability, and excellence in service delivery while combating corruption and promoting ethical conduct within NSSEC operations.',
      content: {
        'ACTU (Anti-Corruption and Transparency Unit)': 'Dedicated to promoting transparency, accountability, and ethical conduct in all NSSEC operations.',
        'Anti-Corruption Activities': [
          'Implementing anti-corruption policies and procedures',
          'Conducting integrity assessments and risk evaluations',
          'Managing whistleblowing and complaint mechanisms',
          'Coordinating with anti-corruption agencies'
        ],
        'Transparency Initiatives': [
          'Ensuring compliance with Freedom of Information Act requirements',
          'Publishing procurement and financial information',
          'Maintaining public access to Commission records',
          'Promoting open governance practices'
        ],
        'SERVICOM (Service Compact with Nigerians)': 'Committed to improving service delivery and customer satisfaction across all NSSEC services.',
        'Service Improvement': [
          'Developing and implementing service charters',
          'Monitoring service delivery standards',
          'Conducting customer satisfaction surveys',
          'Implementing feedback mechanisms'
        ],
        'Quality Assurance': [
          'Establishing service delivery benchmarks',
          'Training staff on customer service excellence',
          'Monitoring compliance with service standards',
          'Implementing continuous improvement processes'
        ],
        'Public Engagement': [
          'Managing public feedback and complaints',
          'Conducting stakeholder consultations',
          'Organizing public awareness campaigns',
          'Facilitating citizen engagement initiatives'
        ]
      }
    }
  };

  const currentData = sectionData[activeSection];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeSection === section.id
                      ? 'border-[#24c2c2] text-[#24c2c2]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#24c2c2]/10 to-[#24c2c2]/5 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {currentData.title}
          </h1>
          
          {/* Head of Unit */}
          <div className="bg-white rounded-md p-4 mb-4 shadow-sm border-l-4 border-[#24c2c2]">
            <h3 className="font-semibold text-gray-900 mb-2">Head of Unit</h3>
            <p className="text-lg text-[#24c2c2] font-medium">{currentData.head}</p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-2"></div>
                Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">{currentData.vision}</p>
            </div>
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-2"></div>
                Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">{currentData.mission}</p>
            </div>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="space-y-8">
          {Object.entries(currentData.content).map(([key, value], index) => (
            <div key={key} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#24c2c2] to-[#20b5b5] px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <ChevronRight className="mr-2" size={20} />
                  {key}
                </h2>
              </div>
              <div className="p-6">
                {Array.isArray(value) ? (
                  <ul className="space-y-3">
                    {value.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#24c2c2] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#24c2c2] to-[#20b5b5] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {activeSection === 'legal' && 'Upholding Legal Excellence'}
            {activeSection === 'protocol' && 'Building Stronger Public Relations'}
            {activeSection === 'procurement' && 'Driving Innovation Through Strategic Procurement'}
            {activeSection === 'physical' && 'Building the Future of Education Infrastructure'}
            {activeSection === 'actu' && 'Promoting Transparency and Service Excellence'}
          </h3>
          <p className="text-[#24c2c2]/90 text-lg mb-6 max-w-2xl mx-auto">
            {activeSection === 'legal' && 'The Legal Unit remains committed to upholding the integrity of the Commission\'s operations by ensuring legal compliance, protecting institutional interests, and fostering a regulatory environment that enhances the quality of senior secondary education in Nigeria.'}
            {activeSection === 'protocol' && 'The Protocol, Press, and Public Relations Unit is integral to NSSEC\'s operations, ensuring transparent communication, efficient media relations, and seamless protocol management.'}
            {activeSection === 'procurement' && 'We welcome reputable vendors, contractors, and partners to participate in our procurement processes. Opportunities are announced through official channels, ensuring fairness and inclusivity.'}
            {activeSection === 'physical' && 'Creating sustainable and innovative physical infrastructure that supports educational excellence and operational efficiency across all NSSEC facilities.'}
            {activeSection === 'actu' && 'Committed to maintaining the highest standards of transparency, accountability, and service delivery in all NSSEC operations.'}
          </p>
          <button className="bg-white text-[#24c2c2] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-md">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Office;