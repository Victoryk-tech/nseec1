"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Eye, Calendar, BookOpen, FileText, User, ChevronRight } from "lucide-react";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import SocialShare from "@/components/media/SocialShare";
import { TagBadge } from "@/components/media/TagBadge";
import PublicationCard from "./PublicationCard";

const categoryLabels = {
  reports: "Reports",
  digest: "Digest",
  "research-journals": "Research / Journals",
  "nssec-establishment-act": "Establishment Act",
  "national-policy-sse": "National Policy on SSE",
  "minimum-standards": "Minimum Standards",
  "implementation-guidelines": "Implementation Guidelines",
};

const QUERY = groq`*[_type == "publications" && slug.current == $slug][0]{
  _id, title, slug, description,
  "coverImageUrl": coalesce(cloudinaryUrl, coverImage.asset->url),
  "pdfUrl": download.asset->url,
  "pdfFilename": download.asset->originalFilename,
  category, author, publishedAt, _createdAt,
  fileSize, pageCount, views, downloadCount, featured,
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const RELATED_QUERY = groq`*[_type == "publications" && category == $cat && slug.current != $slug] | order(publishedAt desc)[0...4]{
  _id, title, slug, description,
  "coverImageUrl": coalesce(cloudinaryUrl, coverImage.asset->url),
  "pdfUrl": download.asset->url,
  category, publishedAt, _createdAt, views, downloadCount, fileSize, pageCount,
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

export default function PublicationDetailPage({ slug }) {
  const [pub, setPub] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [pdfError, setPdfError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    sanityClient.fetch(QUERY, { slug }).then((data) => {
      setPub(data);
      setViews(data?.views || 0);
      setDownloadCount(data?.downloadCount || 0);
      setLoading(false);
      if (data?.category) {
        sanityClient.fetch(RELATED_QUERY, { cat: data.category, slug }).then(setRelated);
      }
    });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/views/${slug}?type=publication`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => { const v = d?.results?.[0]?.document?.views; if (v !== undefined) setViews(v); })
      .catch(() => {});
  }, [slug]);

  const handleDownload = async () => {
    if (!pub?.pdfUrl) return;
    try {
      const res = await fetch(`/api/downloads/${slug}`, { method: "POST" });
      const d = await res.json();
      const dc = d?.results?.[0]?.document?.downloadCount;
      if (dc !== undefined) setDownloadCount(dc);
    } catch {}
    const a = document.createElement("a");
    a.href = pub.pdfUrl;
    a.download = pub.pdfFilename || `${pub.title || "publication"}.pdf`;
    a.target = "_blank";
    a.click();
  };

  const date = pub?.publishedAt || pub?._createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const pageUrl = `/publications/${slug}`;
  const catLabel = categoryLabels[pub?.category] || pub?.category;

  if (loading) {
    return (
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!pub) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <FileText className="w-12 h-12 text-gray-200 mb-4" />
        <h2 className="font-playfair text-2xl font-bold text-gray-600 mb-2">Publication not found</h2>
        <Link href="/publications" className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          Back to Publications
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/publications" className="hover:text-emerald-600">Publications</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 truncate max-w-[200px]">{pub.title}</span>
      </nav>

      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8 mb-12">
        {/* Cover image */}
        <div className="flex-shrink-0">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
            {pub.coverImageUrl ? (
              <Image src={pub.coverImageUrl} alt={pub.title} fill className="object-cover" unoptimized priority />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-300">
                <FileText className="w-16 h-16 mb-2" />
                <span className="text-xs text-gray-400">PDF Document</span>
              </div>
            )}
          </div>
          {pub.pdfUrl && (
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          )}
          <div className="mt-3">
            <SocialShare url={pageUrl} title={pub.title} compact />
          </div>
        </div>

        {/* Details */}
        <div>
          {catLabel && (
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-4">
              {catLabel}
            </span>
          )}
          <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {pub.title}
          </h1>
          {pub.description && (
            <p className="text-base text-gray-600 leading-relaxed mb-6">{pub.description}</p>
          )}

          {/* Metadata grid */}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl text-sm">
            {pub.author && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">Author / Publisher</dt>
                <dd className="font-medium text-gray-700 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gray-400" />{pub.author}</dd>
              </div>
            )}
            {formattedDate && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">Published</dt>
                <dd className="font-medium text-gray-700 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400" />{formattedDate}</dd>
              </div>
            )}
            {pub.fileSize && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">File Size</dt>
                <dd className="font-medium text-gray-700">{pub.fileSize}</dd>
              </div>
            )}
            {pub.pageCount && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">Pages</dt>
                <dd className="font-medium text-gray-700 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-gray-400" />{pub.pageCount}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs text-gray-400 font-medium mb-0.5">Views</dt>
              <dd className="font-medium text-gray-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400 font-medium mb-0.5">Downloads</dt>
              <dd className="font-medium text-gray-700 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-gray-400" />{downloadCount}
              </dd>
            </div>
          </dl>

          {pub.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {pub.tags.map((tag) => <TagBadge key={tag._id} tag={tag} />)}
            </div>
          )}

          <SocialShare url={pageUrl} title={pub.title} />
        </div>
      </div>

      {/* PDF Preview */}
      {pub.pdfUrl && !pdfError && (
        <div className="mb-12">
          <h2 className="font-playfair text-xl font-bold text-gray-800 mb-4">Document Preview</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50" style={{ height: "700px" }}>
            <iframe
              src={`${pub.pdfUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full"
              title={pub.title}
              onError={() => setPdfError(true)}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            If the preview does not load,{" "}
            <button onClick={handleDownload} className="text-emerald-600 hover:underline">download the PDF</button>.
          </p>
        </div>
      )}

      {/* Related publications */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">Related Publications</h2>
            <Link href="/publications" className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((r) => <PublicationCard key={r._id} pub={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
