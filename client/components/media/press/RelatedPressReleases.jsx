import Link from "next/link";
import NextImage from "next/image";
import { Eye, ChevronRight, FileText } from "lucide-react";
import { formatDate, formatViews, getFavicon, getSourceName, getSourceDomain } from "./utils";

export function RelatedSideCard({ post }) {
  const category = post.categories?.[0];
  return (
    <Link
      href={`/media/press-release/${post.slug?.current}`}
      className="group flex gap-3 p-4 hover:bg-[#24c2c2]/5 transition-colors border-b border-gray-50 last:border-b-0"
    >
      <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        {post.urlMetadata?.image && (
          <NextImage
            src={post.urlMetadata?.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        {category && (
          <span className="text-[10px] font-bold text-[#24c2c2] uppercase tracking-wide">
            {category.title}
          </span>
        )}
        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#24c2c2] transition-colors mt-0.5">
          {post.title}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">{formatDate(post.publishedAt || post._createdAt)}</p>
      </div>
    </Link>
  );
}

export function RelatedBottomCard({ post }) {
  const category = post.categories?.[0];
  const sourceName = getSourceName(post);
  const sourceDomain = getSourceDomain(post);
  return (
    <Link
      href={`/media/press-release/${post.slug?.current}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#24c2c2]/40 hover:shadow-md transition-all duration-200"
    >
      <div className="relative w-full h-40 overflow-hidden bg-gray-100">
        {post.urlMetadata?.image ? (
          <NextImage
            src={post.urlMetadata?.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#24c2c2]/10 to-[#0e4f6b]/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-[#24c2c2]/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {category && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 bg-[#24c2c2] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              {category.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-playfair text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#24c2c2] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{post.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            {(post.urlMetadata?.favicon || sourceDomain) && (
              <img
                src={post.urlMetadata?.favicon || getFavicon(sourceDomain)}
                alt=""
                className="w-3 h-3 rounded-sm"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
            {sourceName}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {formatViews(post.views)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function RelatedPressReleases({ related, variant = "sidebar" }) {
  if (!related?.length) return null;

  if (variant === "sidebar") {
    return (
      <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
          <p className="text-white text-xs font-bold uppercase tracking-widest">Related Releases</p>
        </div>
        <div>
          {related.slice(0, 4).map((p) => (
            <RelatedSideCard key={p._id} post={p} />
          ))}
        </div>
        <div className="p-4 border-t border-gray-50">
          <Link
            href="/media/press-release"
            className="flex items-center justify-center gap-1 text-xs font-semibold text-[#24c2c2] hover:text-[#1a9999] transition-colors"
          >
            All press releases <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="border-t border-gray-100 bg-gray-50/50 px-4 sm:px-6 lg:px-12 py-14">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-[#24c2c2] uppercase tracking-widest mb-1">Keep Reading</p>
            <h2 className="font-playfair text-3xl font-bold text-[#0e4f6b]">Related Press Releases</h2>
          </div>
          <Link
            href="/media/press-release"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#24c2c2] hover:text-[#1a9999] transition-colors"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <RelatedBottomCard key={p._id} post={p} />
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/media/press-release"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#24c2c2]"
          >
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
