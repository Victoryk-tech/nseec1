import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, ChevronRight, FileText } from "lucide-react";
import { formatDate, formatViews, getFavicon, getSourceName, getSourceDomain } from "./utils";
import CategoryBadge from "./CategoryBadge";

export default function PressReleaseCard({ post, featured = false }) {
  const sourceName = getSourceName(post);
  const sourceDomain = getSourceDomain(post);
  const ogImage = post.urlMetadata?.image || null;
  const favicon = post.urlMetadata?.favicon || (sourceDomain ? getFavicon(sourceDomain) : null);

  return (
    <Link
      href={`/media/press-release/${post.slug?.current}`}
      className={`group flex flex-col sm:flex-row gap-0 bg-white border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-[#24c2c2]/40 ${
        featured ? "border-[#24c2c2]/30 shadow-sm" : "border-gray-100"
      }`}
    >
      {/* Thumbnail — OG image if available, else placeholder */}
      <div className="relative sm:w-52 sm:flex-shrink-0 h-44 sm:h-auto overflow-hidden bg-[#0e4f6b]/10">
        {ogImage ? (
          <Image
            src={ogImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#24c2c2]/10 to-[#0e4f6b]/10">
            <FileText className="w-10 h-10 text-[#24c2c2]/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:bg-gradient-to-r" />
        {post.breaking && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded">
            Breaking
          </span>
        )}
        {featured && !post.breaking && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#24c2c2] text-white text-[10px] font-bold uppercase tracking-widest rounded">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {post.categories?.slice(0, 2).map((c) => (
            <CategoryBadge key={c._id} title={c.title} variant="card" />
          ))}
        </div>

        <h2 className="font-playfair text-base sm:text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#24c2c2] transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{post.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {sourceName && (
              <span className="flex items-center gap-1">
                {favicon && (
                  <img
                    src={favicon}
                    alt={sourceName}
                    className="w-3.5 h-3.5 rounded-sm"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <span className="font-medium text-[#0e4f6b]">{sourceName}</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt || post._createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(post.views)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-[#24c2c2] font-semibold">
            Read more <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
