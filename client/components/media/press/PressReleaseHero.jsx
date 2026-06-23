import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, ChevronRight, AlertCircle, TrendingUp } from "lucide-react";
import { formatDate, formatViews, getFavicon, getSourceName, getSourceDomain } from "./utils";
import CategoryBadge from "./CategoryBadge";

export default function PressReleaseHero({ post, views, ogImage }) {
  const sourceName = getSourceName(post);
  const sourceDomain = getSourceDomain(post);
  const heroImage = ogImage || post?.urlMetadata?.image || null;
  const favicon =
    post?.urlMetadata?.favicon ||
    (sourceDomain ? getFavicon(sourceDomain) : null);

  return (
    <div className="relative w-full h-[50vh] min-h-[360px] max-h-[580px] overflow-hidden bg-[#0a2e40]">
      {heroImage && (
        <Image
          src={heroImage}
          alt={post.title}
          fill
          className="object-cover opacity-50"
          unoptimized
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e40] via-[#0a2e40]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#24c2c2] via-[#1a9999] to-[#24c2c2]" />

      <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-12 pb-10 max-w-[100rem] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs text-white/40 mb-4">
          <Link href="/" className="hover:text-[#24c2c2] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media" className="hover:text-[#24c2c2] transition-colors">Media</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media/press-release" className="hover:text-[#24c2c2] transition-colors">Press Releases</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/30 truncate max-w-[160px]">{post.title}</span>
        </nav>

        {/* Labels */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#24c2c2] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            Official Press Release
          </span>
          {post.breaking && (
            <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Breaking
            </span>
          )}
          {post.trending && (
            <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Trending
            </span>
          )}
          {post.categories?.map((c) => (
            <CategoryBadge key={c._id} title={c.title} variant="hero" />
          ))}
        </div>

        {/* Title */}
        <h1 className="font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          {sourceName && (
            <span className="flex items-center gap-1.5">
              {favicon && (
                <img
                  src={favicon}
                  alt={sourceName}
                  className="w-4 h-4 rounded-sm"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <span className="font-semibold text-white/80">{sourceName}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt || post._createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {formatViews(views)} views
          </span>
        </div>
      </div>
    </div>
  );
}
