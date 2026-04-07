"use client";
import React, { useState } from 'react';
import { 
  School, 
  Users, 
  GraduationCap, 
  MapPin, 
  BarChart3, 
  Building2, 
  BookOpen, 
  UserCheck,
  TrendingUp,
  Database,
  Search,
  Filter,
  Download,
  Eye,
  Phone,
  Mail
} from 'lucide-react';
import Schools from './Schools';

const EducationDataLanding = () => {
  const [activeTab, setActiveTab] = useState('demographics');

  const DemographicsContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Senior Secondary School Demographics in Nigeria
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Understanding the demographic profile of Nigeria`s senior secondary school system is crucial for effective planning, policy implementation, resource allocation, and performance monitoring. The National Senior Secondary Education Commission (NSSEC) maintains a Senior Secondary Education Data Bank.
        </p>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <School className="w-8 h-8 text-[#24c2c2]" />
            <span className="text-sm font-medium text-gray-500">SCHOOLS</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">46,027</div>
          <div className="text-sm text-gray-600">Total SSS Schools</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#24c2c2]" />
            <span className="text-sm font-medium text-gray-500">STUDENTS</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">5,546,382</div>
          <div className="text-sm text-gray-600">Total Enrollment</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <GraduationCap className="w-8 h-8 text-[#24c2c2]" />
            <span className="text-sm font-medium text-gray-500">TEACHERS</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">251,271</div>
          <div className="text-sm text-gray-600">SSS Teachers (Public schools only)</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-[#24c2c2]" />
            <span className="text-sm font-medium text-gray-500">RATIO</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">35:1</div>
          <div className="text-sm text-gray-600">Student-Teacher</div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* School Distribution */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">School Distribution</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Ownership Structure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Public Schools:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>Private Schools:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Urban vs. Rural Spread</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Urban Schools:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>Rural Schools:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">State Distribution</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Highest:</span>
                  <span className="font-medium">Lagos, Kano, Rivers</span>
                </div>
                <div className="flex justify-between">
                  <span>Lowest:</span>
                  <span className="font-medium">Bayelsa, Gombe, Zamfara</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Enrollment */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Student Enrollment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">By Class Level</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>SS1:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>SS2:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>SS3:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Gender Distribution</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Male:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>Female:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>Gender Parity Index:</span>
                  <span className="font-medium">[Insert value]</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Special Demographics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Students with disabilities:</span>
                  <span className="font-medium">[XX]</span>
                </div>
                <div className="flex justify-between">
                  <span>Displaced Students:</span>
                  <span className="font-medium">[XX]</span>
                </div>
                <div className="flex justify-between">
                  <span>OVC:</span>
                  <span className="font-medium">[XX]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teachers and Staff */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <UserCheck className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Teachers and Staff</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Qualification Levels</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>B.Ed holders:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>PGDE or equivalent:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>Others:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Gender Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Male Teachers:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
                <div className="flex justify-between">
                  <span>Female Teachers:</span>
                  <span className="font-medium">[XX%]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities and Infrastructure */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Facilities & Infrastructure</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Functional science labs:</span>
              <span className="font-medium">[XX%]</span>
            </div>
            <div className="flex justify-between">
              <span>ICT/computer labs:</span>
              <span className="font-medium">[XX%]</span>
            </div>
            <div className="flex justify-between">
              <span>Libraries:</span>
              <span className="font-medium">[XX%]</span>
            </div>
            <div className="flex justify-between">
              <span>Perimeter fencing:</span>
              <span className="font-medium">[XX%]</span>
            </div>
            <div className="flex justify-between">
              <span>Potable water & WASH:</span>
              <span className="font-medium">[XX%]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Trends */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-[#24c2c2] mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Enrollment Trends and Challenges</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#24c2c2] mb-2">+4%</div>
            <div className="text-sm text-gray-600">Annual Growth Rate (5 years)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#24c2c2] mb-2">[XX%]</div>
            <div className="text-sm text-gray-600">Dropout Rates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#24c2c2] mb-2">68%</div>
            <div className="text-sm text-gray-600">JSS3 to SS1 Transition</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#24c2c2] mb-2">[Figure]</div>
            <div className="text-sm text-gray-600">Out-of-School Youths</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Main Dropout Reasons:</h4>
          <div className="text-sm text-gray-600">Economic constraints, Distance to school, Early marriage, Insecurity</div>
        </div>
      </div>

      {/* Data Collection & Use */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Database className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Data Collection Mechanism</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Annual School Census</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Education Management Information System (EMIS)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>State Education Boards and Zonal Offices</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Field verification and inspections</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <BookOpen className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Use of Demographic Data</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Planning and budgeting at federal and state levels</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Targeted interventions in underperforming areas</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Monitoring equity and inclusiveness</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Forecasting future education demands</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SchoolsListContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Comprehensive List of Senior Secondary Schools in Nigeria
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Complete database of Senior Secondary Schools across Nigeria with detailed information including location, ownership, and operational status.
        </p>
      </div>

     

      <Schools/>

      {/* Key Components Info */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-6">
          <Database className="w-6 h-6 text-[#24c2c2] mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Key Components of the Full List</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>School Name</strong> – As officially registered</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>Location</strong> – State, LGA, town/community</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>Type</strong> – Boys, Girls, or Co-educational</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>Ownership</strong> – Federal, State, or Private</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>Status</strong> – Operational, Closed, Under Renovation</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>EMIS Code</strong> – For data tracking</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>Contact Info</strong> – Principal, phone/email</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-[#24c2c2] rounded-full"></div>
            <span className="text-sm"><strong>Affiliation</strong> – WAEC/NECO examination center</span>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <BookOpen className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Data Sources</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>NSSEC Senior Secondary Education Data Bank</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>State Ministries of Education</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Universal Basic Education Commission (UBEC)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>Federal Ministry of Education (FME) annual statistics</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
              <span>WAEC & NECO examination centers list</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Download className="w-6 h-6 text-[#24c2c2] mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Accessing the Full List</h3>
          </div>
          <div className="space-y-4 text-sm">
            <p className="text-gray-600 mb-4">
              If you`re seeking the complete digital dataset for planning, monitoring, or development purposes, NSSEC can provide:
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
                <span><strong>Excel or CSV files</strong> upon official request</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
                <span><strong>Interactive dashboards</strong> (if available) via NSSEC`s EMIS portal</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#24c2c2] rounded-full mr-3"></div>
                <span><strong>Regional/state-level PDFs</strong> for administrative or research use</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
     
      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('demographics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'demographics'
                  ? 'border-[#24c2c2] text-[#24c2c2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Senior Secondary School Demographics
              </div>
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'schools'
                  ? 'border-[#24c2c2] text-[#24c2c2]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <School className="w-5 h-5 mr-2" />
                Comprehensive List of SSS In Nigeria
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
        {activeTab === 'demographics' ? <DemographicsContent /> : <SchoolsListContent />}
      </main>

      
    </div>
  );
};

export default EducationDataLanding;