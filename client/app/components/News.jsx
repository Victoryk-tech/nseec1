"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp, Newspaper , Eye} from "lucide-react";
import { urlFor } from "../lib/imageUrl";
import { useBlogContext } from "./contexts/BlogContext";

const News = () => {
  const { blogs, loading, error, formatTime } = useBlogContext();

  const recentNews = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    return blogs
      .filter((b) => b.mainCategory !== "gallery")
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 4)
      .map((b) => ({
        id: b._id,
        title: b.title,
        description: b.description,
        slug: b.slug.current,
        image: b.image ? urlFor(b.image).url() : "/nssec.jpeg",
        category: b.mainCategory,
        views: b.views,
        subCategory: b.subCategory,
        date: b._createdAt,
      }));
  }, [blogs]);

  // Loading State with Skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[100rem] mx-auto px-2 sm:px-4  lg:px-8 2xl:px-10">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-100 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load News</h3>
            <p className="text-gray-600 mb-6">We&apos;re having trouble fetching the latest updates. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-[#24c2c2] text-white font-medium rounded-lg hover:bg-[#1da8a8] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (recentNews.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#24c2c2]/10 to-[#24c2c2]/5 rounded-full mb-6">
              <Newspaper className="w-10 h-10 text-[#24c2c2]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No News Available</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Check back soon for the latest updates and announcements.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Main Content State
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Latest News & Updates
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with our most recent stories and announcements
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {recentNews.map((item, index) => (
            <Link key={item.id} href={`/media/${item.slug}`}>
              <article 
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                 {/* Category Badge - Only for news-headlines */}
{item.subCategory && (
  <div className="absolute top-2 left-4">
    <span className="inline-flex items-center px-3 py-1 bg-white/95 backdrop-blur-sm text-[#24c2c2] text-xs font-semibold rounded-full shadow-lg">
      {item.subCategory}
    </span>
  </div>
)}

                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                <p className="px-3 py-1">
                    <i className="inline-flex items-center text-[#000000] text-xs">
                      {item.category}
                    </i>
                  </p>
                  {/* Title */}
                  <h3 className=" px-2 sm:px-3 font-bold text-gray-900 text-base sm:text-lg mb-1 line-clamp-3 leading-snug group-hover:text-[#24c2c2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="px-2 sm:px-3 text-gray-900 text-base sm:text-sm mb-3 line-clamp-3 group-hover:text-[#24c2c2] transition-colors">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto p-2 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#24c2c2]" />
                      <span>{formatTime(item.date)}</span>
                    </div>
                    {item.views && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3.5 h-3.5 text-[#24c2c2]" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default News;