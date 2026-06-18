import Link from "next/link";

const categoryColors = {
  "nssec-news": "bg-[#24c2c2]/10 text-[#24c2c2] border-[#24c2c2]/20",
  "photo-gallery": "bg-amber-50 text-amber-700 border-amber-200",
  "press-release": "bg-blue-50 text-blue-700 border-blue-200",
  publications: "bg-emerald-50 text-emerald-700 border-emerald-200",
  general: "bg-gray-100 text-gray-600 border-gray-200",
};

export function TagBadge({ tag, linked = true, size = "sm" }) {
  const title = tag?.title || tag;
  const slug = tag?.slug || (typeof tag === "string" ? tag.toLowerCase().replace(/\s+/g, "-") : "");
  const colorKey = tag?.category || "general";
  const colorClass = categoryColors[colorKey] || categoryColors.general;
  const sizeClass = size === "xs" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  if (linked && slug) {
    return (
      <Link
        href={`/media/tag/${slug}`}
        className={`inline-flex items-center rounded-full border font-medium transition-opacity hover:opacity-80 ${sizeClass} ${colorClass}`}
      >
        #{title}
      </Link>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${sizeClass} ${colorClass}`}>
      #{title}
    </span>
  );
}

export function HashtagList({ hashtags = [], linked = false }) {
  if (!hashtags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {hashtags.map((tag) => (
        <span
          key={tag}
          className="text-[#24c2c2] text-sm font-medium hover:text-[#1a9999] cursor-default"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
