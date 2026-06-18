"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/lib/imageUrl";
import { useBlogContext } from "./contexts/BlogContext";

const EventsSection = () => {
  const { blogs, loading, error } = useBlogContext();
  const [activeTab, setActiveTab] = useState("events");
  const [visibleItems, setVisibleItems] = useState(6);
  console.log("bloger:", blogs);
  const events = blogs.filter((post) => post.category?.includes("events"));
  console.log("events:", events);
  
  const announcements = blogs.filter((post) =>
    post.category?.includes("announcements")
  );
  console.log("announcements:", announcements);
  

  const currentData = activeTab === "events" ? events : announcements;
  const displayedItems = currentData.slice(0, visibleItems);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views?.toString() || "0";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "bg-blue-50 text-blue-700 border border-blue-200",
      Technology: "bg-purple-50 text-purple-700 border border-purple-200",
      Awards: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      Industry: "bg-green-50 text-green-700 border border-green-200",
      Research: "bg-indigo-50 text-indigo-700 border border-indigo-200",
      Cultural: "bg-pink-50 text-pink-700 border border-pink-200",
      Career: "bg-orange-50 text-orange-700 border border-orange-200",
      Alumni: "bg-teal-50 text-teal-700 border border-teal-200",
      Environment: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      Sports: "bg-red-50 text-red-700 border border-red-200",
      Facility: "bg-gray-50 text-gray-700 border border-gray-200",
      Financial: "bg-cyan-50 text-cyan-700 border border-cyan-200",
      events: "bg-[#24c2c2]/10 text-[#24c2c2] border border-[#24c2c2]/20",
      announcements: "bg-amber-50 text-amber-700 border border-amber-200",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border border-gray-200";
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      High: "bg-red-100 text-red-800 border border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Low: "bg-green-100 text-green-800 border border-green-200",
    };
    return styles[priority] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-3 w-20"></div>
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="h-10 bg-gray-200 rounded-xl"></div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No {activeTab} Found
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        There are currently no {activeTab} available. Check back later for updates.
      </p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-4">
        {error || "Failed to load content. Please try again later."}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="inline-flex items-center px-6 py-3 bg-[#24c2c2] text-white font-medium rounded-xl hover:bg-[#24c2c2]/90 transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <ErrorState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-[#24c2c2]/10 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-[#24c2c2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            NSSEC <span className="text-[#24c2c2]">Updates</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Stay connected with the latest events, announcements, and activities happening at NSSEC
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-gray-100 inline-flex">
            {[
              { key: "events", label: "Events", count: events.length },
              { key: "announcements", label: "Announcements", count: announcements.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setVisibleItems(6);
                }}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.key
                    ? "bg-[#24c2c2] text-white shadow-lg shadow-[#24c2c2]/25"
                    : "text-gray-600 hover:text-[#24c2c2] hover:bg-white/60"
                }`}
              >
                <span className="text-sm sm:text-base">{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.key 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <LoadingSkeleton />
        ) : displayedItems.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Events Grid */}
            {activeTab === "events" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayedItems.map((event, index) => (
                  <Link 
                    key={event._id || index} 
                    href={`/blog/${event.slug?.current || ''}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300  hover:-translate-y-1 hover:border-[#24c2c2]/20 h-98">
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={event.image ? urlFor(event.image).url() : "/placeholder-image.jpg"}
                          alt={event.title || "Event image"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Overlay Elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(event.subcategory || "events")}`}>
                            {event.subcategory || "Event"}
                          </span>
                        </div>

                        {/* Views Badge */}
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-white text-xs font-medium">
                            {formatViews(event.views || 0)}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6">
                        {/* Date */}
                        <div className="flex items-center gap-2 mb-3 text-[#24c2c2] text-sm font-medium">
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>{formatDate(event._createdAt)}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-[#24c2c2] transition-colors duration-300 min-h-[3.5rem]">
                          {event.title}
                        </h3>

                        {/* Description */}
                        {/* <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[4rem]">
                          {event.description}
                        </p> */}

                        {/* Action Area */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[#24c2c2] font-semibold text-sm group-hover:text-[#24c2c2]/80 transition-colors duration-200">
                            Read More
                          </span>
                          <svg className="w-5 h-5 text-[#24c2c2] transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Announcements Grid */}
            {activeTab === "announcements" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {displayedItems.map((announcement, index) => (
                  <Link 
                    key={announcement._id || index} 
                    href={`/blog/${announcement.slug?.current || ''}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 transition-all duration-300  hover:-translate-y-1 hover:border-[#24c2c2]/20 h-full">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.subcategory || "announcements")}`}>
                          {announcement.subcategory || "Announcement"}
                        </span>
                        {announcement.priority && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(announcement.priority)}`}>
                            {announcement.priority}
                          </span>
                        )}
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-[#24c2c2] text-sm font-medium mb-4">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{formatDate(announcement._createdAt)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900 group-hover:text-[#24c2c2] transition-colors duration-300 min-h-[3.5rem] line-clamp-2">
                        {announcement.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5rem]">
                        {announcement.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>{formatViews(announcement.views || 0)} views</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#24c2c2] font-semibold text-sm group-hover:text-[#24c2c2]/80 transition-colors duration-200">
                          <span>View Details</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {currentData.length > visibleItems && (
              <div className="text-center mt-12 sm:mt-16">
                <button 
                  onClick={() => setVisibleItems(prev => prev + 6)}
                  className="inline-flex items-center gap-3 bg-white border-2 border-[#24c2c2] text-[#24c2c2] px-8 py-4 rounded-2xl font-semibold hover:bg-[#24c2c2] hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#24c2c2]/20 shadow-sm"
                >
                  <span>Load More {activeTab === "events" ? "Events" : "Announcements"}</span>
                  <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                
                <p className="text-gray-500 text-sm mt-4">
                  Showing {Math.min(visibleItems, currentData.length)} of {currentData.length} {activeTab}
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default EventsSection;