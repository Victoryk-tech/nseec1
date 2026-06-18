import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, Clock } from "lucide-react";

function calcReadTime(content) {
  if (!content || !Array.isArray(content)) return 1;
  const words = content
    .filter((b) => b._type === "block")
    .flatMap((b) => b.children?.map((c) => c.text || "") || [])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const subcategoryColors = {
  conference: "bg-purple-100 text-purple-700",
  events: "bg-orange-100 text-orange-700",
  announcement: "bg-blue-100 text-blue-700",
  education: "bg-teal-100 text-teal-700",
  policy: "bg-indigo-100 text-indigo-700",
  uncategorized: "bg-gray-100 text-gray-600",
};

export default function NewsCard({ post, category = "nssec-news", size = "default" }) {
  const {
    title,
    description,
    slug,
    imageUrl,
    image,
    mainCategory,
    subCategory,
    views = 0,
    publishedAt,
    _createdAt,
    content,
    author,
  } = post;

  const href = `/media/${mainCategory || category}/${slug?.current || slug}`;
  const imgSrc = imageUrl || image?.asset?.url || "/nssec.jpeg";
  const readTime = calcReadTime(content);
  const date = publishedAt || _createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
    : "";
  const subColor = subcategoryColors[subCategory] || subcategoryColors.uncategorized;
  const isLarge = size === "large";

  return (
    <Link href={href} className="group block h-full">
      <article className={`h-full flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 bg-white`}>
        <div className={`relative overflow-hidden flex-shrink-0 ${isLarge ? "aspect-[16/7]" : "aspect-[16/10]"}`}>
          <Image
            src={imgSrc}
            alt={title || "News article"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 bg-[#24c2c2] text-white text-xs font-semibold rounded-full uppercase tracking-wide">
              NSSEC News
            </span>
            {subCategory && subCategory !== "uncategorized" && (
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${subColor}`}>
                {subCategory}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 gap-2">
          <h3
            className={`font-playfair font-bold text-gray-900 leading-snug group-hover:text-[#24c2c2] transition-colors line-clamp-2 ${
              isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"
            }`}
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
              {description}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2 mt-auto border-t border-gray-50 text-xs text-gray-400">
            {formattedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
