"use client";
import Image from "next/image";
import Link from "next/link";
import { Download, Share2, FileText, BookOpen, Calendar } from "lucide-react";
import SocialShare from "@/components/media/SocialShare";
import { useState } from "react";

const CATEGORY_LABELS = {
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
    title,
    slug,
    description,
    coverImageUrl,
    fileUrl,
    pdfUrl,
    category,
    publishedAt,
    createdAt,
    _createdAt,
    fileSize,
    pageCount,
  } = pub;

  const href = `/publications/${slug?.current || slug}`;
  const downloadUrl = fileUrl || pdfUrl;
  const date = publishedAt || createdAt || _createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleDownload = (e) => {
    e.preventDefault();
    if (!downloadUrl) return;
    if (onDownload) onDownload(pub._id);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = title ? `${title}.pdf` : "publication.pdf";
    a.target = "_blank";
    a.click();
  };

  return (
    <article className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-[#24c2c2]/30 hover:shadow-sm transition-all duration-200 bg-white">
      {/* Cover */}
      <Link href={href} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 flex items-center justify-center">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 h-full w-full bg-gradient-to-b from-gray-50 to-gray-100">
              <FileText className="w-12 h-12 mb-2" />
              <span className="text-xs text-gray-400">PDF Document</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#24c2c2]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {category && (
          <span className="inline-block px-2 py-0.5 bg-[#24c2c2]/10 text-[#1aabab] text-xs font-medium rounded-full w-fit">
            {CATEGORY_LABELS[category] || category}
          </span>
        )}

        <Link href={href}>
          <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-[#24c2c2] transition-colors">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 pt-1">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          )}
          {fileSize && <span>{fileSize}</span>}
          {pageCount && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {pageCount} pages
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 mt-auto">
          {downloadUrl && (
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#24c2c2] hover:bg-[#1aabab] text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowShare((s) => !s);
            }}
            className="p-2 border border-gray-200 rounded-lg hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
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