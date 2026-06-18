"use client";
import { useEffect, useState } from "react";
import { useBlogContext } from "./contexts/BlogContext";
import { urlFor } from "@/app/lib/imageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Footer from "./Footer";
import { FaRegCalendarAlt, FaRegClock, FaEye, FaArrowLeft } from "react-icons/fa";

const PostsPage = ({ slug }) => {
  const { post, loading, blogId, formatTime, updatedPost, error } = useBlogContext();
  console.log("post:", post)
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const displayedPost = updatedPost || post;
  const title = post?.title || "";
  const read = post?.readTime || "";
  const content = post?.content || [];
  const imageUrl = post?.image ? urlFor(post.image).url() : "";
  const view = displayedPost?.views ?? 0;

  // Loading State
  if (loading ) {
    return (
      <>
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="flex justify-center items-center space-x-6">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            
            {/* Image skeleton */}
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-2xl mb-8"></div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      </>
    );
  }

  // Error State
  if (!loading && (error || !post)) {
    return (
      <>
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(36, 194, 194, 0.1)' }}>
              <svg className="w-8 h-8" style={{ color: '#24c2c2' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-6">
              The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#24c2c2' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1da8a8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#24c2c2'}
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
      </>
    );
  }

  
  // Main Content
  return (
    <>
      <main className="min-h-screen bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Header Section */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 leading-tight">
              {title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt style={{ color: '#24c2c2' }} />
                <span>{formatTime(post?._createdAt)}</span>
              </div>
             
              <div className="flex items-center gap-2">
                <FaEye style={{ color: '#24c2c2' }} />
                <span>{view.toLocaleString()} views</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] mb-8 lg:mb-12 rounded-2xl overflow-hidden shadow-2xl">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <svg className="w-8 h-8 animate-spin" style={{ color: '#24c2c2' }} fill="none" viewBox="0 0 24 24">
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              
              {!imageError && (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 896px"
                  className={`object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoadingComplete={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                  unoptimized
                  priority
                />
              )}
              
              {imageError && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-sm text-gray-500">Image unavailable</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <PortableText
              value={content}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-3xl lg:text-4xl font-bold text-black mt-12 mb-6 leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl lg:text-3xl font-semibold text-black mt-10 mb-4 leading-tight">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl lg:text-2xl font-semibold text-black mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="text-black leading-relaxed mb-6 text-base lg:text-lg">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 pl-6 py-2 my-8 bg-gray-50 rounded-r-lg" style={{ borderColor: '#24c2c2' }}>
                      <div className="text-black italic">
                        {children}
                      </div>
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-black">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-black">
                      {children}
                    </em>
                  ),
                  underline: ({ children }) => (
                    <u className="underline underline-offset-2" style={{ textDecorationColor: '#24c2c2' }}>
                      {children}
                    </u>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" style={{ color: '#24c2c2' }}>
                      {children}
                    </code>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-black">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-6 space-y-2 text-black">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                },
              }}
            />
          </article>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PostsPage;