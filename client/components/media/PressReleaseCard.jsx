import Link from "next/link";
import { Calendar, Tag, ChevronRight } from "lucide-react";

export default function PressReleaseCard({ post }) {
  const { title, description, slug, publishedAt, _createdAt, tags = [], hashtags = [], subCategory } = post;

  const href = `/media/press-release/${slug?.current || slug}`;
  const date = publishedAt || _createdAt;
  const dateObj = date ? new Date(date) : null;
  const day = dateObj?.getDate();
  const month = dateObj?.toLocaleDateString("en-NG", { month: "short" });
  const year = dateObj?.getFullYear();

  return (
    <Link href={href} className="group block">
      <article className="flex gap-4 p-5 border border-gray-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200">
        {/* Date block */}
        {dateObj && (
          <div className="flex-shrink-0 w-14 text-center">
            <div className="bg-blue-700 text-white rounded-t-lg py-1 text-xs font-semibold uppercase">
              {month}
            </div>
            <div className="bg-blue-50 rounded-b-lg py-1.5 border border-t-0 border-blue-100">
              <span className="text-xl font-bold text-blue-800 leading-none">{day}</span>
              <span className="block text-xs text-blue-500">{year}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {subCategory && subCategory !== "uncategorized" && (
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded capitalize mb-2">
              {subCategory}
            </span>
          )}
          <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">{description}</p>
          )}
          <div className="flex items-center justify-between">
            {(tags?.length > 0 || hashtags?.length > 0) && (
              <div className="flex flex-wrap gap-1">
                {hashtags.slice(0, 3).map((h) => (
                  <span key={h} className="text-xs text-blue-500 font-medium">#{h}</span>
                ))}
              </div>
            )}
            <span className="text-xs text-blue-600 font-medium flex items-center gap-0.5 group-hover:gap-1.5 transition-all ml-auto">
              Read more <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
