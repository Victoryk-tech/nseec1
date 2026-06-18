'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building2, CheckCircle2, Clock } from 'lucide-react';

const ConstituencyProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const schools = [
    // NORTH CENTRAL
    { zone: 'North Central', state: 'Benue', name: 'Government Comprehensive Secondary school Udei Guma LGA', status: 'Ongoing' },
    { zone: 'North Central', state: 'Kogi', name: 'Government Secondary school Koton-Karfi', status: 'Ongoing' },
    { zone: 'North Central', state: 'Kwara', name: 'Government Secondary school Shonga Edu LGA', status: 'Ongoing' },
    { zone: 'North Central', state: 'Nasarawa', name: 'Government College Nasarawa', status: 'Ongoing' },
    { zone: 'North Central', state: 'Niger', name: 'Government Secondary School Goffanti Borgu', status: 'Ongoing' },
    { zone: 'North Central', state: 'Plateau', name: 'Government Secondary school Mangun, Mangu LGA', status: 'Ongoing' },
    
    // NORTH EAST
    { zone: 'North East', state: 'Adamawa', name: 'GMMC Jimeta Adamawa State', status: 'Ongoing' },
    { zone: 'North East', state: 'Adamawa', name: 'Federal Science and Technical College Bassa Michika Adamawa State', status: 'Ongoing' },
    { zone: 'North East', state: 'Bauchi', name: 'Government Girls Day Secondary School Itas Gadau Bauchi State', status: 'Ongoing' },
    { zone: 'North East', state: 'Borno', name: 'Government Secondary School Damasak Borno State', status: 'Ongoing' },
    { zone: 'North East', state: 'Gombe', name: 'Government Day Secondary School Akkoyall, Kumo Gombe State', status: 'Ongoing' },
    { zone: 'North East', state: 'Taraba', name: 'Government Day Secondary School Sunkani Taraba State', status: 'Ongoing' },
    { zone: 'North East', state: 'Yobe', name: 'Government Science and Technical College Geidam Yobe State', status: 'Ongoing' },
    
    // NORTH WEST
    { zone: 'North West', state: 'Jigawa', name: 'Government Senior Secondary School Kiyawa Jigawa State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kaduna', name: 'Government Commercial College Makarfi Kaduna State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kaduna', name: 'Government Secondary School Maimuna Gwarzo Kaduna State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kano', name: 'Dawakin Tofa College Kano State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kano', name: 'Government Day Science College Kano State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kano', name: 'Government Science Secondary School Gaya Kano State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kano', name: 'Government Secondary School Bichi Kano State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kano', name: 'Garko Girls Science College Kano State', status: 'Ongoing' },
    { zone: 'North West', state: 'Katsina', name: 'Government Science Secondary School Musawa', status: 'Ongoing' },
    { zone: 'North West', state: 'Kebbi', name: 'Government Girls Secondary School Ribah Danko Wasagu Kebbi State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kebbi', name: 'Emir Haruna Rasheed Secondary School Kebbi State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kebbi', name: 'Government Science College Wara Kebbi State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kebbi', name: 'Government Secondary School Karaye Kebbi State', status: 'Ongoing' },
    { zone: 'North West', state: 'Kebbi', name: 'Nagari College Birnin Kebbi Kebbi State', status: 'Ongoing' },
    { zone: 'North West', state: 'Sokoto', name: 'Government Secondary School Kware Sokoto State', status: 'Ongoing' },
    { zone: 'North West', state: 'Zamfara', name: 'Government Science Secondary School Shinkafi Zamfara State', status: 'Ongoing' },
    
    // SOUTH EAST
    { zone: 'South East', state: 'Abia', name: 'Uturu Secondary School, Isuikwuto LGA Omuaku Secondary School Abia State', status: 'Ongoing' },
    { zone: 'South East', state: 'Anambra', name: 'Abbot Boys Secondary School Anambra State', status: 'Ongoing' },
    { zone: 'South East', state: 'Ebonyi', name: 'Unity Secondary School Item Amagu Ikwo Ebonyi State', status: 'Ongoing' },
    { zone: 'South East', state: 'Enugu', name: 'Ozalla High School Nkanu West c Enugu State', status: 'Ongoing' },
    { zone: 'South East', state: 'Imo', name: 'Eziachi Secondary School Orlu Imo State', status: 'Ongoing' },
    
    // SOUTH SOUTH
    { zone: 'South South', state: 'Akwa Ibom', name: 'Comprehensive High School Edamaya Ikot Abasi Akwa Ibom State', status: 'Ongoing' },
    { zone: 'South South', state: 'Bayelsa', name: 'Epetiama Comprehensive High School Tombia Bayelsa State', status: 'Ongoing' },
    { zone: 'South South', state: 'Cross River', name: 'Secondary Grammar School Wanokom North, Ukelle, Yala LGA Cross River State', status: 'Ongoing' },
    { zone: 'South South', state: 'Delta', name: 'Owa Model Secondary school Owa Ika Delta State', status: 'Ongoing' },
    { zone: 'South South', state: 'Edo', name: 'Our Lady of Lourdes Girls Grammar School Uromi Edo, Edo State', status: 'Ongoing' },
    { zone: 'South South', state: 'Rivers', name: 'Community Secondary School Kokomo Oyigbo Rivers State', status: 'Ongoing' },
    
    // SOUTH WEST
    { zone: 'South West', state: 'Ekiti', name: 'CAC Grammar School, Efon Alaaye Ekiti State', status: 'Ongoing' },
    { zone: 'South West', state: 'Lagos', name: 'Satellite Senior and Junior Secondary School, Amuwo Odofin Lagos State', status: 'Ongoing' },
    { zone: 'South West', state: 'Lagos', name: 'Oriwu Collge Ikorodu Lagos State', status: 'Ongoing' },
    { zone: 'South West', state: 'Ogun', name: 'Comprehensive High School, Ayetoro Ogun State', status: 'Ongoing' },
    { zone: 'South West', state: 'Ogun', name: 'Abeokuta Grammar School, Idi-Aba, Abeokuta Ogun State', status: 'Ongoing' },
    { zone: 'South West', state: 'Ogun', name: 'Iganmode Grammar school, Ota Ogun State', status: 'Ongoing' },
    { zone: 'South West', state: 'Ogun', name: 'Area Community High School, Owede Yewa Ogun State', status: 'Ongoing' },
    { zone: 'South West', state: 'Ondo', name: 'Omeyekun Grammar School/Aquinas, Akure Ondo State', status: 'Ongoing' },
    { zone: 'South West', state: 'Osun', name: 'Laro Grammar School Osogbo Osun State', status: 'Ongoing' },
    { zone: 'South West', state: 'Oyo', name: 'Oranyan Grammar School, Soro Hill Oyo State', status: 'Ongoing' },
  ];

  const zones = ['All Zones', 'North Central', 'North East', 'North West', 'South East', 'South South', 'South West'];
  const statuses = ['All Status', 'Ongoing', 'Completed'];

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          school.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = selectedZone === 'All Zones' || school.zone === selectedZone;
      const matchesStatus = selectedStatus === 'All Status' || school.status === selectedStatus;
      return matchesSearch && matchesZone && matchesStatus;
    });
  }, [searchTerm, selectedZone, selectedStatus]);

  const stats = useMemo(() => {
    const total = schools.length;
    const ongoing = schools.filter(s => s.status === 'Ongoing').length;
    const completed = schools.filter(s => s.status === 'Completed').length;
    return { total, ongoing, completed };
  }, []);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#24c2c2' }} />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              NSSEC Construction Projects 2025/2026
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Tracking infrastructure development across 50 schools in Nigeria
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 text-sm font-medium mb-1">Ongoing</p>
                <p className="text-3xl font-bold text-amber-600">{stats.ongoing}</p>
              </div>
              <Clock className="w-12 h-12 text-amber-400" />
            </div>
          </div>
          
          <div className="rounded-xl p-6 border-2" style={{ 
            background: 'linear-gradient(to bottom right, #e6f9f9, #ccf3f3)',
            borderColor: '#24c2c2'
          }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#1a9999' }}>Completed</p>
                <p className="text-3xl font-bold" style={{ color: '#24c2c2' }}>{stats.completed}</p>
              </div>
              <CheckCircle2 className="w-12 h-12" style={{ color: '#24c2c2' }} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Schools
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by school or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none text-sm"
                  style={{ focusRingColor: '#24c2c2' }}
                />
              </div>
            </div>

            {/* Zone Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Zone
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none text-sm bg-white"
                style={{ focusRingColor: '#24c2c2' }}
              >
                {zones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none text-sm bg-white"
                style={{ focusRingColor: '#24c2c2' }}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredSchools.length}</span> of <span className="font-semibold text-gray-900">{schools.length}</span> projects
        </div>

        {/* Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#24c2c2' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    School Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSchools.map((school, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#24c2c2' }} />
                        <span className="text-sm text-gray-700">{school.zone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {school.state}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {school.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        school.status === 'Ongoing' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {school.status === 'Ongoing' ? (
                          <Clock className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards - Mobile/Tablet */}
        <div className="lg:hidden space-y-4">
          {filteredSchools.map((school, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold" style={{ backgroundColor: '#24c2c2' }}>
                    {index + 1}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    school.status === 'Ongoing' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {school.status === 'Ongoing' ? (
                      <Clock className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    {school.status}
                  </span>
                </div>
              </div>
              
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                {school.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#24c2c2' }} />
                  <span className="text-sm text-gray-600">{school.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: '#24c2c2' }} />
                  <span className="text-sm font-medium text-gray-900">{school.state} State</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstituencyProject;