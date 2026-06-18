"use client";
import Image from "next/image";
import Link from "next/link";
import { Download, Share2, Eye, FileText, BookOpen, Calendar } from "lucide-react";
import SocialShare from "@/components/media/SocialShare";
import { useState } from "react";

const categoryLabels = {
  reports: "Reports",
  digest: "Digest",
  "research-journals": "Research / Journals",
  "nssec-establishment-act": "Establishment Act",
  "national-policy-sse": "National Policy on SSE",
  "minimum-standards": "Minimum Standards",
  "implementation-guidelines": "Implementation Guidelines",
};

export default function PublicationCard({ pub, onDownload }) {
  const [showShare, setShowShare] = useState(false);
  const {
    title, slug, description, coverImageUrl, pdfUrl, category,
    author, publishedAt, _createdAt, fileSize, pageCount,
    views = 0, downloadCount = 0, tags = [],
  } = pub;

  const href = `/publications/${slug?.current || slug}`;
  const date = publishedAt || _createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
    : "";

  const handleDownload = (e) => {
    e.preventDefault();
    if (!pdfUrl) return;
    if (onDownload) onDownload(slug?.current || slug);
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = title ? `${title}.pdf` : "publication.pdf";
    a.target = "_blank";
    a.click();
  };

  return (
    <article className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-emerald-100 transition-all duration-200 bg-white">
      {/* Cover */}
      <Link href={href} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center">
          {coverImageUrl ? (
            <Image src={coverImageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 h-full w-full bg-gradient-to-b from-gray-50 to-gray-100">
              <FileText className="w-12 h-12 mb-2" />
              <span className="text-xs text-gray-400">PDF Document</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {category && (
          <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full w-fit">
            {categoryLabels[category] || category}
          </span>
        )}

        <Link href={href}>
          <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">{description}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 pt-1">
          {formattedDate && (
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formattedDate}</span>
          )}
          {fileSize && <span>{fileSize}</span>}
          {pageCount && <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{pageCount} pages</span>}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{views >= 1000 ? `${(views/1000).toFixed(1)}k` : views}</span>
          <span className="flex items-center gap-1"><Download className="w-3 h-3" />{downloadCount} downloads</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 mt-auto">
          {pdfUrl && (
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          )}
          <button
            onClick={(e) => { e.preventDefault(); setShowShare((s) => !s); }}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>

        {showShare && (
          <div className="pt-2">
            <SocialShare url={href} title={title} compact />
          </div>
        )}
      </div>
    </article>
  );
}
