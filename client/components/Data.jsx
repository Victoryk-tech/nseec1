"use client";
import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { School, Users, BookOpen, MapPin, TrendingUp, Award, Shield, Target, Building, UserCheck } from 'lucide-react';

// Data from the NSSEC document
const data = {
  overview: {
    totalSchools: 46027,
    totalLearners: 5546382,
    maleLearners: 2809133,
    femaleLearners: 2737249,
    totalTeachers: 251271,
    certifiedTeachers: 138454,
    dropouts: 49421,
    learnersWithDisabilities: 14679,
    specialNeedsTeachers: 1286,
    nonTeachingStaff: 62308
  },
  
  schoolTypes: [
    { name: 'Public', value: 11418, percentage: 24.81, color: '#24c2c2' },
    { name: 'Private', value: 34085, percentage: 74.05, color: '#1a9999' },
    { name: 'Technical & Vocational', value: 426, percentage: 0.93, color: '#127070' },
    { name: 'Special Needs', value: 98, percentage: 0.21, color: '#0d5050' }
  ],

  geoPoliticalZones: [
    { zone: 'North-West', schools: 5766, learners: 1276582 },
    { zone: 'North-East', schools: 3138, learners: 614038 },
    { zone: 'North-Central', schools: 7621, learners: 1247108 },
    { zone: 'South-West', schools: 19145, learners: 1562486 },
    { zone: 'South-East', schools: 4985, learners: 611390 },
    { zone: 'South-South', schools: 5258, learners: 566778 }
  ],

  topStatesBySchools: [
    { state: 'Oyo', schools: 7903, learners: 273981 },
    { state: 'Lagos', schools: 5445, learners: 276286 },
    { state: 'Ogun', schools: 2983, learners: 464194 },
    { state: 'Kano', schools: 2571, learners: 426473 },
    { state: 'Plateau', schools: 1995, learners: 53700 }
  ],

  ageDistribution: [
    { age: 'Below 15', learners: 560350, percentage: 12.05 },
    { age: '15 years', learners: 1192105, percentage: 25.64 },
    { age: '16 years', learners: 1260563, percentage: 27.11 },
    { age: '17 years', learners: 900359, percentage: 19.37 },
    { age: 'Above 17', learners: 735823, percentage: 15.83 }
  ],

  infrastructure: {
    classrooms: { available: 112895, needRepair: 40845, notAvailable: 26497 },
    libraries: { available: 8488, needRepair: 3735, notAvailable: 2451 },
    physicsLabs: { available: 4363, needRepair: 2846, notAvailable: 2198 },
    chemistryLabs: { available: 6069, needRepair: 3170, notAvailable: 2373 },
    biologyLabs: { available: 4554, needRepair: 2517, notAvailable: 4007 },
    ictLabs: { available: 5336, needRepair: 1716, notAvailable: 3221 },
    workshops: { available: 2770, needRepair: 744, notAvailable: 2144 }
  },

  teacherSubjects: [
    { subject: 'English', male: 11910, female: 12447, total: 24357 },
    { subject: 'Mathematics', male: 12362, female: 8916, total: 21278 },
    { subject: 'Biology', male: 8652, female: 10580, total: 19232 },
    { subject: 'Civic Education', male: 10046, female: 9111, total: 19157 },
    { subject: 'Agriculture', male: 10096, female: 7090, total: 17186 }
  ],

  safetyMetrics: {
    fencedSchools: 4513,
    unfencedSchools: 6558,
    cctvSchools: 176,
    securityPersonnel: 6228
  },

  enrollment20222025: [
    { year: '2022/2023', enrollment: 4500000 },
    { year: '2023/2024', enrollment: 4929960 },
    { year: '2024/2025', enrollment: 5546382 }
  ]
};

const COLORS = ['#24c2c2', '#1a9999', '#127070', '#0d5050', '#66d9d9'];

const Data = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target, slug: 'overview' },
    { id: 'schools', name: 'School Distribution', icon: School, slug: 'school-distribution' },
    { id: 'enrollment', name: 'Student Enrollment', icon: Users, slug: 'student-enrollment' },
    { id: 'teachers', name: 'Teaching Staff', icon: UserCheck, slug: 'teaching-staff' },
    { id: 'infrastructure', name: 'Infrastructure', icon: Building, slug: 'infrastructure' },
    { id: 'safety', name: 'Safety & Security', icon: Shield, slug: 'safety-security' },
    { id: 'trends', name: 'Trends & Analysis', icon: TrendingUp, slug: 'trends-analysis' }
  ];

  const StatCard = ({ title, value, subtitle, color = '#24c2c2', trend = null }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">{title}</h3>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold" style={{ color }}>{value?.toLocaleString?.() || value}</p>
        {trend && <span className="text-xs text-green-600 mb-1">↗ {trend}</span>}
      </div>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  const SectionHeader = ({ title, description }) => (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-2" style={{ color: '#24c2c2' }}>{title}</h2>
      {description && <p className="text-gray-600 text-lg">{description}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      {/* Navigation */}
      <nav className="bg-white border-b-2 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-3">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-3 ${
                    activeSection === section.id
                      ? 'border-current text-white rounded-full'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={activeSection === section.id ? 
                    { backgroundColor: '#24c2c2', borderColor: '#1a9999' } : {}
                  }
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-12">
            <SectionHeader 
              title="National Education Overview" 
              description="Comprehensive statistics of Nigeria's senior secondary education system"
            />
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Schools" 
                value={data.overview.totalSchools}
                subtitle="Across 36 States + FCT"
                trend="+14%"
              />
              <StatCard 
                title="Total Students" 
                value={data.overview.totalLearners}
                subtitle="All categories included"
                trend="+12.5%"
              />
              <StatCard 
                title="Teaching Staff" 
                value={data.overview.totalTeachers}
                subtitle="Public schools only"
              />
              <StatCard 
                title="TRCN Certified" 
                value={data.overview.certifiedTeachers}
                subtitle="55% of all teachers"
                color="#10b981"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gender Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Student Gender Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Male', value: data.overview.maleLearners },
                        { name: 'Female', value: data.overview.femaleLearners }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      dataKey="value"
                    >
                      <Cell fill="#24c2c2" />
                      <Cell fill="#66d9d9" />
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Key Indicators */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Critical Indicators</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-900">Students with Disabilities</span>
                    <span className="font-bold text-blue-700">
                      {data.overview.learnersWithDisabilities.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <span className="font-medium text-orange-900">Dropout Rate</span>
                    <span className="font-bold text-orange-700">0.89%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Teacher Certification Rate</span>
                    <span className="font-bold text-green-700">80%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-purple-900">Gender Parity Index</span>
                    <span className="font-bold text-purple-700">0.97</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* School Distribution Section */}
        {activeSection === 'schools' && (
          <div className="space-y-12">
            <SectionHeader 
              title="School Distribution Analysis" 
              description="Distribution of schools by type, location, and geographic zones"
            />

            {/* School Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Schools by Type</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.schoolTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      dataKey="value"
                    >
                      {data.schoolTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">School Type Statistics</h3>
                <div className="space-y-4">
                  {data.schoolTypes.map((type, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: type.color }}
                        />
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold block" style={{ color: type.color }}>
                          {type.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">{type.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geo-Political Zones */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Geographic Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.geoPoliticalZones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="schools" fill="#24c2c2" name="Number of Schools" />
                  <Bar dataKey="learners" fill="#66d9d9" name="Number of Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top States Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-xl font-semibold">Top 5 States by School Count</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.topStatesBySchools.map((state, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{idx + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{state.state}</td>
                        <td className="px-6 py-4 text-sm" style={{ color: '#24c2c2', fontWeight: 'bold' }}>
                          {state.schools.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{state.learners.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Student Enrollment Section */}
        {activeSection === 'enrollment' && (
          <div className="space-y-12">
            <SectionHeader 
              title="Student Enrollment Analysis" 
              description="Comprehensive view of student demographics and enrollment patterns"
            />

            {/* Enrollment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard 
                title="Total Enrollment" 
                value={data.overview.totalLearners}
                subtitle="All levels combined"
              />
              <StatCard 
                title="Male Students" 
                value={data.overview.maleLearners}
                subtitle="50.65% of total"
              />
              <StatCard 
                title="Female Students" 
                value={data.overview.femaleLearners}
                subtitle="49.35% of total"
              />
            </div>

            {/* Age Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Age Distribution of Students</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="learners" fill="#24c2c2" name="Number of Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Enrollment Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Enrollment Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Gender Parity</h4>
                    <p className="text-sm text-blue-700">Near perfect gender balance with male enrollment at 50.65% and female at 49.35%.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Age Appropriateness</h4>
                    <p className="text-sm text-green-700">72% of students are in the appropriate age range of 15-17 years.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Special Needs</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium text-purple-900">Students with Disabilities</span>
                    <span className="font-bold text-purple-700">
                      {data.overview.learnersWithDisabilities.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-900">Total Dropouts</span>
                    <span className="font-bold text-red-700">
                      {data.overview.dropouts.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teaching Staff Section */}
        {activeSection === 'teachers' && (
          <div className="space-y-12">
            <SectionHeader 
              title="Teaching Staff Analysis" 
              description="Comprehensive overview of teaching personnel across Nigeria"
            />

            {/* Teacher Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Teachers" 
                value={data.overview.totalTeachers}
                subtitle="Public schools only"
              />
              <StatCard 
                title="TRCN Certified" 
                value={data.overview.certifiedTeachers}
                subtitle="80% of all teachers"
                color="#10b981"
              />
              <StatCard 
                title="Special Needs Teachers" 
                value={data.overview.specialNeedsTeachers}
                subtitle="Nationwide deployment"
              />
              <StatCard 
                title="Non-Teaching Staff" 
                value={data.overview.nonTeachingStaff}
                subtitle="Support personnel"
              />
            </div>

            {/* Subject Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Teacher Distribution by Top Subjects</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.teacherSubjects}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" stackId="a" fill="#24c2c2" name="Male" />
                  <Bar dataKey="female" stackId="a" fill="#66d9d9" name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Teacher Quality Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Certification Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'TRCN Certified', value: data.overview.certifiedTeachers },
                        { name: 'Not Certified', value: data.overview.totalTeachers - data.overview.certifiedTeachers }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Key Teaching Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">High Certification Rate</h4>
                    <p className="text-sm text-green-700">80% of teachers are TRCN certified, indicating strong professional standards.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Special Needs Gap</h4>
                    <p className="text-sm text-orange-700">Only 1,286 special needs teachers for 14,679 students with disabilities.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Subject Balance</h4>
                    <p className="text-sm text-blue-700">English and Mathematics have the highest teacher numbers, showing priority focus.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Infrastructure Section */}
        {activeSection === 'infrastructure' && (
          <div className="space-y-12">
            <SectionHeader 
              title="Educational Infrastructure" 
              description="Status of physical facilities and learning resources"
            />

            {/* Infrastructure Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard 
                title="Available Classrooms" 
                value={data.infrastructure.classrooms.available}
                subtitle="Ready for use"
                color="#10b981"
              />
              <StatCard 
                title="Need Repair" 
                value={data.infrastructure.classrooms.needRepair}
                subtitle="Classrooms requiring maintenance"
                color="#f59e0b"
              />
              <StatCard 
                title="Not Available" 
                value={data.infrastructure.classrooms.notAvailable}
                subtitle="Classrooms needed"
                color="#ef4444"
              />
            </div>

            {/* Detailed Infrastructure */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Infrastructure Status by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(data.infrastructure).map(([key, values]) => (
                  <div key={key} className="space-y-4">
                    <h4 className="font-semibold capitalize text-lg" style={{ color: '#24c2c2' }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-900">Available</span>
                        <span className="font-bold text-green-700">{values.available?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-orange-900">Need Repair</span>
                        <span className="font-bold text-orange-700">{values.needRepair?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-red-900">Not Available</span>
                        <span className="font-bold text-red-700">{values.notAvailable?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Safety & Security Section */}
        {activeSection === 'safety' && (
          <div className="space-y-12">
            <SectionHeader 
              title="Safety & Security Status" 
              description="Implementation of Safe School Initiative across Nigeria"
            />

            {/* Safety Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Fenced Schools" 
                value={data.safetyMetrics.fencedSchools}
                subtitle="Secured perimeter"
                color="#10b981"
              />
              <StatCard 
                title="Unfenced Schools" 
                value={data.safetyMetrics.unfencedSchools}
                subtitle="Require fencing"
                color="#ef4444"
              />
              <StatCard 
                title="CCTV Installed" 
                value={data.safetyMetrics.cctvSchools}
                subtitle="Modern surveillance"
                color="#24c2c2"
              />
              <StatCard 
                title="Security Personnel" 
                value={data.safetyMetrics.securityPersonnel}
                subtitle="Active deployment"
                color="#8b5cf6"
              />
            </div>

            {/* Safety Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">School Fencing Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Fenced', value: data.safetyMetrics.fencedSchools },
                        { name: 'Unfenced', value: data.safetyMetrics.unfencedSchools }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-6">Security Challenges</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Perimeter Security</h4>
                    <p className="text-sm text-red-700">59% of schools lack proper fencing, compromising security.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Technology Gap</h4>
                    <p className="text-sm text-orange-700">Only 176 schools have CCTV systems out of 11,418 public schools.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Personnel Coverage</h4>
                    <p className="text-sm text-blue-700">Security personnel deployment varies significantly across states.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Priority Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: '#24c2c2' }} />
                  <h4 className="font-semibold mb-2">Perimeter Security</h4>
                  <p className="text-sm text-gray-600">Priority fencing program for 6,558 unfenced schools</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#24c2c2' }} />
                  <h4 className="font-semibold mb-2">Technology Integration</h4>
                  <p className="text-sm text-gray-600">Expand CCTV coverage to high-risk areas</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#24c2c2' }} />
                  <h4 className="font-semibold mb-2">Personnel Training</h4>
                  <p className="text-sm text-gray-600">Standardize security protocols nationwide</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends & Analysis Section */}
        {activeSection === 'trends' && (
          <div className="space-y-12">
            <SectionHeader 
              title="Trends & Future Analysis" 
              description="Educational growth patterns and strategic insights"
            />

            {/* Growth Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Enrollment Growth Trajectory</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.enrollment20222025}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="enrollment" 
                    stroke="#24c2c2" 
                    strokeWidth={3}
                    name="Total Enrollment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Key Trends */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-4">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2" style={{ color: '#10b981' }} />
                  <h3 className="text-lg font-semibold text-green-700">Positive Growth</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">School Growth</span>
                    <span className="font-bold text-green-600">+14%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Enrollment Growth</span>
                    <span className="font-bold text-green-600">+12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Private School Share</span>
                    <span className="font-bold text-green-600">74%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-4">
                  <Target className="w-12 h-12 mx-auto mb-2" style={{ color: '#f59e0b' }} />
                  <h3 className="text-lg font-semibold text-orange-700">Areas for Improvement</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Dropout Rate</span>
                    <span className="font-bold text-orange-600">0.89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Unfenced Schools</span>
                    <span className="font-bold text-orange-600">59%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CCTV Coverage</span>
                    <span className="font-bold text-orange-600">1.5%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center mb-4">
                  <Award className="w-12 h-12 mx-auto mb-2" style={{ color: '#24c2c2' }} />
                  <h3 className="text-lg font-semibold" style={{ color: '#24c2c2' }}>Excellence Indicators</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Teacher Certification</span>
                    <span className="font-bold" style={{ color: '#24c2c2' }}>80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Gender Parity</span>
                    <span className="font-bold" style={{ color: '#24c2c2' }}>97%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Age Appropriateness</span>
                    <span className="font-bold" style={{ color: '#24c2c2' }}>72%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-6">Strategic Recommendations</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-green-700">Strengths to Build Upon</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-sm">Strong enrollment growth indicates increasing access to education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-sm">High teacher certification rate demonstrates quality focus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-sm">Near-perfect gender parity in enrollment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span className="text-sm">Private sector participation driving expansion</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-red-700">Priority Areas for Action</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-sm">Massive infrastructure gaps require urgent investment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-sm">School security needs comprehensive upgrading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-sm">Special needs education severely under-resourced</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span className="text-sm">Technology integration in education is minimal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      
    </div>
  );
};

export default Data;