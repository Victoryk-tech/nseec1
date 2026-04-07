"use client";
import React, { useState } from "react";
import {
  MapPin,
  Search,
  Filter,
  Download,
  Eye,
  Phone,
  Mail,
} from "lucide-react";
import { useBlogContext } from "./contexts/BlogContext";

const Schools = () => {
  const {
    schools,
    filteredSchools,
    selectedState,
    setSelectedState,
    schoolSearchTerm,
    setSchoolSearchTerm,
    loading,
    error,
    states,
    currentSchools,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = useBlogContext();


  // Export handler
  const handleExport = () => {
    const headers = ["Name", "State", "LGA", "Type", "Ownership", "Status"];
    const rows = filteredSchools.map(s =>
      [s.name, s.state, s.lga, s.type, s.ownership, s.status].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schools.csv";
    a.click();
    URL.revokeObjectURL(url);
  };


  const getOwnershipColor = (ownership) => {
    switch (ownership) {
      case "Federal":
        return "bg-blue-100 text-blue-800";
      case "State":
        return "bg-green-100 text-green-800";
      case "Private":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Mixed":
        return "bg-teal-100 text-teal-800";
      case "Boys":
        return "bg-blue-100 text-blue-800";
      case "Girls":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div>
      {/* Search and Filter Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schools by name, state, or LGA..."
              value={schoolSearchTerm}
              onChange={(e) => setSchoolSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select 
               value={selectedState}
               onChange={(e) => setSelectedState(e.target.value)} className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent appearance-none bg-white">
                {states.map((state, idx) => (
                  <option key={idx} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <button  onClick={handleExport} className="flex items-center px-6 py-3 bg-[#24c2c2] text-white rounded-lg hover:bg-[#20b0b0] transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  S/N
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  School Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  State
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  LGA
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Ownership
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4">
                        <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                : currentSchools.map((school, index) => (
                    <tr
                      key={school._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {(currentPage - 1) * 5 + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {school.name}
                      </td>
                      <td className="px-6 py-4 flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {school.state}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {school.lga}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(school.type)}`}
                        >
                          {school.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getOwnershipColor(school.ownership)}`}
                        >
                          {school.ownership}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {school.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <a
                            href={`tel:${school.phone || ""}`}
                            className="p-2 text-gray-400 hover:text-[#24c2c2] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a
                            href={`mailto:${school.email || ""}`}
                            className="p-2 text-gray-400 hover:text-[#24c2c2] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {schools.length > 5 && (
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * 5 + 1} to{" "}
            {Math.min(currentPage * 5, schools.length)} of {schools.length}{" "}
            schools
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  currentPage === idx + 1
                    ? "bg-[#24c2c2] text-white hover:bg-[#20b0b0]"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schools;
