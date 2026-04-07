"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import { urlFor } from "../lib/imageUrl";
import { FaRegCalendarAlt, FaRegClock, FaEye, FaImages } from "react-icons/fa";
import { useBlogContext } from "./contexts/BlogContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const MediaPost = ({ slug }) => {
  const { blogs, loading, updatedPost, formatTime } = useBlogContext();

  const categorySlug = typeof slug === "string" ? slug.toLowerCase() : "";

  const categoryDisplayName = slug
    ? slug
        .split("-")
        .map((word) =>
          typeof word === "string" && word.length > 0
            ? word[0].toUpperCase() + word.slice(1)
            : "",
        )
        .join(" ")
    : "";

  const filteredPosts = Array.isArray(blogs)
    ? blogs.filter((post) => {
        const categories = Array.isArray(post.mainCategory)
          ? post.mainCategory
          : [post.mainCategory];

        return categories.some(
          (cat) =>
            typeof cat === "string" && cat.toLowerCase() === categorySlug,
        );
      })
    : [];
  const isGallery = categorySlug === "gallery";

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Skeleton */}
        <div className="relative h-[400px] bg-gradient-to-br from-[#24c2c2]/20 to-[#24c2c2]/5 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-12 w-64 bg-gray-300 rounded-lg mx-auto"></div>
              <div className="h-6 w-96 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                  <div className="flex gap-3 pt-2">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-20"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gradient-to-br from-[#24c2c2] via-[#24c2c2]/90 to-[#1ea5a5] overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <FaImages className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {categoryDisplayName}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
                National Senior Secondary Education Commission
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Empty State Content */}
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-8">
            <FaImages className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No Content Available
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            There are currently no posts in the &quot;{categoryDisplayName}
            &quot; category. Please check back later for updates.
          </p>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#24c2c2] text-white font-semibold rounded-full hover:bg-[#1ea5a5] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore All Media
          </Link>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg shadow-[#24c2c2]/10 mb-4">
              <FaImages className="w-10 h-10 text-[#24c2c2]" />
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
                Explore timely press releases, official announcements,
                insightful reports, and scholarly journals.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <FaImages className="w-4 h-4 text-[#24c2c2]" />
                <span className="text-sm font-medium text-gray-700">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "Post" : "Posts"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Grid of posts */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const imageUrl = post.image ? urlFor(post.image).url() : null;
            const postSlug = post.slug?.current || post._id;

            // Gallery items (no link, just display)
            if (isGallery) {
              return (
                <div
                  key={post._id}
                  className="group rounded-xl overflow-hidden border border-gray-200  hover:shadow-sm transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-50">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaImages className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Title overlay */}
                  {/* <div className="p-2 bg-white">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-[#24c2c2] transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                   
                  </div> */}
                </div>
              );
            }

            // Regular linked posts
            return (
              <Link
                key={post._id}
                href={`/media/${postSlug}`}
                className="group block rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-50">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaImages className="w-16 h-16 text-gray-300" />
                    </div>
                  )}

                  {/* Subcategory badge */}
                  {post.mainCategory === "news-headlines" &&
                    post.subCategory && (
                      <span className="absolute top-4 left-4 bg-[#24c2c2] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                        {typeof post.subCategory === "string"
                          ? post.subCategory.replace(/-/g, " ")
                          : ""}
                      </span>
                    )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Text */}
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#24c2c2] transition-colors duration-300 line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  {/* Description */}
                  {post.description && (
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 ">
                      {post.description}
                    </p>
                  )}

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    {post.publishedAt && (
                      <span className="flex items-center gap-1.5">
                        <FaRegCalendarAlt className="text-yellow-400" />
                        {formatTime(post?._createdAt)}
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">
                      <FaEye className="text-yellow-400" />
                      {post.views || 0}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MediaPost;
