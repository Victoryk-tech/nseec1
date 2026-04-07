"use client";

import { useBlogContext } from "./contexts/BlogContext";
import { useEffect } from "react";
import Link from "next/link";
import Footer from "./Footer";
import { Download, FileText, Calendar, Loader2, FolderOpen, BookOpen, Files } from "lucide-react";

const Publications = ({ slug }) => {
  const { publications, loading, formatTime } = useBlogContext();

  // Normalize slug
  const categorySlug = slug?.toLowerCase();

  // Create display name for heading
  const categoryDisplayName = slug
    ?.split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // Filter publications by category
  const filteredPosts = publications.filter((publish) => {
    const categories = Array.isArray(publish.category)
      ? publish.category
      : [publish.category];

    return categories.some((cat) => cat?.toLowerCase() === categorySlug);
  });

 

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
    
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg shadow-[#24c2c2]/10 mb-4">
              <BookOpen className="w-10 h-10 text-[#24c2c2]" />
            </div>
            <div className="space-y-4">
              <div className="inline-block">
                <p className="text-sm font-semibold text-[#24c2c2] uppercase tracking-wider mb-2">
                  National Senior Secondary Education Commission
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                {categoryDisplayName}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Access our comprehensive collection of research papers, official documents, and educational publications
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Files className="w-4 h-4 text-[#24c2c2]" />
                <span className="text-sm font-medium text-gray-700">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Document' : 'Documents'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {filteredPosts.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 sm:py-32">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <FolderOpen className="w-16 h-16 text-gray-300" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#24c2c2]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Publications Available
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-8">
              There are currently no publications in this category. Check back soon for new content.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>New publications are added regularly</span>
            </div>
          </div>
        ): loading? (
          <div>loading</div>
        ) : (
          // Publications List
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Available Documents</h2>
              <div className="text-sm text-gray-500">
                Total: <span className="font-semibold text-[#24c2c2]">{filteredPosts.length}</span>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredPosts.map((pub, index) => (
                <div
                  key={pub._id}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-[#24c2c2]/30 transition-all duration-300"
                >
                  {/* Top Border Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#24c2c2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left Section - Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#24c2c2] to-[#1fa8a8] flex items-center justify-center shadow-lg shadow-[#24c2c2]/20">
                        <span className="text-xl font-bold text-white">{index + 1}</span>
                      </div>
                    </div>

                    {/* Middle Section - Content */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-[#24c2c2] transition-colors leading-tight">
                        {pub.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatTime
                              ? formatTime(pub._createdAt)
                              : new Date(pub._createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full text-gray-600">
                          <FileText className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">PDF Document</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Download Button */}
                    <div className="flex-shrink-0">
                      {pub.pdfUrl ? (
                        <a
                          href={pub.pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#24c2c2] hover:bg-[#1fa8a8] shadow-lg shadow-[#24c2c2]/30 hover:shadow-xl hover:shadow-[#24c2c2]/40 transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-not-allowed">
                          <FileText className="w-4 h-4" />
                          <span>Unavailable</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


      <Footer/>
    </div>
  );
};

export default Publications;