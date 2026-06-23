// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Download, Eye, Calendar, BookOpen, FileText, User, ChevronRight } from "lucide-react";
// import { usePublicationStore } from "@/store/publicationStore";
// import SocialShare from "@/components/media/SocialShare";
// import PublicationCard from "./PublicationCard";

// const CATEGORY_LABELS = {
//   reports: "Reports",
//   digest: "Digest",
//   "research-journals": "Research / Journals",
//   "nssec-establishment-act": "Establishment Act",
//   "national-policy-sse": "National Policy on SSE",
//   "minimum-standards": "Minimum Standards",
//   "implementation-guidelines": "Implementation Guidelines",
// };

// export default function PublicationDetailPage({ slug }) {
//   const { fetchPublication, fetchRelated, trackView, trackDownload, related } = usePublicationStore();
//   const [pub, setPub] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [views, setViews] = useState(0);
//   const [downloadCount, setDownloadCount] = useState(0);
//   const [pdfError, setPdfError] = useState(false);

//   useEffect(() => {
//     if (!slug) return;
//     setLoading(true);
//     fetchPublication(slug).then((data) => {
//       if (data) {
//         setPub(data);
//         setViews(data.views || 0);
//         setDownloadCount(data.downloadCount || 0);
//         fetchRelated(data.category, slug);
//         trackView(data._id).then((v) => { if (v !== undefined) setViews(v); });
//       }
//       setLoading(false);
//     });
//   }, [slug]);

//   const downloadUrl = pub?.fileUrl || pub?.pdfUrl;

//   const handleDownload = async () => {
//     if (!downloadUrl || !pub) return;
//     const count = await trackDownload(pub._id);
//     if (count !== undefined) setDownloadCount(count);
//     const a = document.createElement("a");
//     a.href = downloadUrl;
//     a.download = `${pub.title || "publication"}.${pub.fileFormat || "pdf"}`;
//     a.target = "_blank";
//     a.click();
//   };

//   const date = pub?.publishedAt || pub?.createdAt;
//   const formattedDate = date
//     ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
//     : "";
//   const pageUrl = `/publications/${slug}`;
//   const catLabel = CATEGORY_LABELS[pub?.category] || pub?.category;

//   if (loading) {
//     return (
//       <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
//         <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
//         <div className="grid md:grid-cols-[280px_1fr] gap-8">
//           <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
//           <div className="space-y-3">
//             <div className="h-6 bg-gray-200 rounded w-1/3" />
//             <div className="h-8 bg-gray-200 rounded w-2/3" />
//             <div className="h-4 bg-gray-100 rounded w-full" />
//             <div className="h-4 bg-gray-100 rounded w-5/6" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!pub) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
//         <FileText className="w-12 h-12 text-gray-200 mb-4" />
//         <h2 className="font-playfair text-2xl font-bold text-gray-600 mb-2">Publication not found</h2>
//         <Link
//           href="/publications"
//           className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
//         >
//           Back to Publications
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
//       <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-400 mb-8">
//         <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
//         <ChevronRight className="w-3 h-3" />
//         <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
//         <ChevronRight className="w-3 h-3" />
//         <Link href="/publications" className="hover:text-emerald-600">Publications</Link>
//         <ChevronRight className="w-3 h-3" />
//         <span className="text-gray-600 truncate max-w-[200px]">{pub.title}</span>
//       </nav>

//       <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8 mb-12">
//         {/* Cover image */}
//         <div className="flex-shrink-0">
//           <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
//             {pub.coverImageUrl ? (
//               <Image src={pub.coverImageUrl} alt={pub.title} fill className="object-cover" unoptimized priority />
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full text-gray-300">
//                 <FileText className="w-16 h-16 mb-2" />
//                 <span className="text-xs text-gray-400">PDF Document</span>
//               </div>
//             )}
//           </div>
//           {downloadUrl && (
//             <button
//               onClick={handleDownload}
//               className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               Download PDF
//             </button>
//           )}
//           <div className="mt-3">
//             <SocialShare url={pageUrl} title={pub.title} compact />
//           </div>
//         </div>

//         {/* Details */}
//         <div>
//           {catLabel && (
//             <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-4">
//               {catLabel}
//             </span>
//           )}
//           <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
//             {pub.title}
//           </h1>
//           {pub.description && (
//             <p className="text-base text-gray-600 leading-relaxed mb-6">{pub.description}</p>
//           )}

//           <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl text-sm">
//             {pub.author && (
//               <div>
//                 <dt className="text-xs text-gray-400 font-medium mb-0.5">Author / Publisher</dt>
//                 <dd className="font-medium text-gray-700 flex items-center gap-1.5">
//                   <User className="w-3.5 h-3.5 text-gray-400" />{pub.author}
//                 </dd>
//               </div>
//             )}
//             {formattedDate && (
//               <div>
//                 <dt className="text-xs text-gray-400 font-medium mb-0.5">Published</dt>
//                 <dd className="font-medium text-gray-700 flex items-center gap-1.5">
//                   <Calendar className="w-3.5 h-3.5 text-gray-400" />{formattedDate}
//                 </dd>
//               </div>
//             )}
//             {pub.yearOfPublication && (
//               <div>
//                 <dt className="text-xs text-gray-400 font-medium mb-0.5">Year</dt>
//                 <dd className="font-medium text-gray-700">{pub.yearOfPublication}</dd>
//               </div>
//             )}
//             {pub.fileSize && (
//               <div>
//                 <dt className="text-xs text-gray-400 font-medium mb-0.5">File Size</dt>
//                 <dd className="font-medium text-gray-700">{pub.fileSize}</dd>
//               </div>
//             )}
//             {pub.pageCount && (
//               <div>
//                 <dt className="text-xs text-gray-400 font-medium mb-0.5">Pages</dt>
//                 <dd className="font-medium text-gray-700 flex items-center gap-1.5">
//                   <BookOpen className="w-3.5 h-3.5 text-gray-400" />{pub.pageCount}
//                 </dd>
//               </div>
//             )}
//             <div>
//               <dt className="text-xs text-gray-400 font-medium mb-0.5">Views</dt>
//               <dd className="font-medium text-gray-700 flex items-center gap-1.5">
//                 <Eye className="w-3.5 h-3.5 text-gray-400" />
//                 {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-xs text-gray-400 font-medium mb-0.5">Downloads</dt>
//               <dd className="font-medium text-gray-700 flex items-center gap-1.5">
//                 <Download className="w-3.5 h-3.5 text-gray-400" />{downloadCount}
//               </dd>
//             </div>
//           </dl>

//           {pub.tags?.length > 0 && (
//             <div className="flex flex-wrap gap-1.5 mb-6">
//               {pub.tags.map((tag, i) => (
//                 <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
//               ))}
//             </div>
//           )}

//           <SocialShare url={pageUrl} title={pub.title} />
//         </div>
//       </div>

//       {/* PDF Preview */}
//       {downloadUrl && !pdfError && (
//         <div className="mb-12">
//           <h2 className="font-playfair text-xl font-bold text-gray-800 mb-4">Document Preview</h2>
//           <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50" style={{ height: "700px" }}>
//             <iframe
//               src={`${downloadUrl}#toolbar=0&navpanes=0`}
//               className="w-full h-full"
//               title={pub.title}
//               onError={() => setPdfError(true)}
//             />
//           </div>
//           <p className="text-xs text-gray-400 mt-2 text-center">
//             If the preview does not load,{" "}
//             <button onClick={handleDownload} className="text-emerald-600 hover:underline">
//               download the PDF
//             </button>.
//           </p>
//         </div>
//       )}

//       {/* Related publications */}
//       {related.length > 0 && (
//         <section className="border-t border-gray-100 pt-10">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="font-playfair text-2xl font-bold text-gray-900">Related Publications</h2>
//             <Link href="/publications" className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
//               View all <ChevronRight className="w-4 h-4" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//             {related.map((r) => <PublicationCard key={r._id} pub={r} />)}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Eye, Calendar, BookOpen, FileText, User, ChevronRight, AlertCircle } from "lucide-react";
import { usePublicationStore } from "@/store/publicationStore";
import SocialShare from "@/components/media/SocialShare";
import PublicationCard from "./PublicationCard";

const CATEGORY_LABELS = {
  reports: "Reports",
  digest: "Digest",
  "research-journals": "Research / Journals",
  "nssec-establishment-act": "Establishment Act",
  "national-policy-sse": "National Policy on SSE",
  "minimum-standards": "Minimum Standards",
  "implementation-guidelines": "Implementation Guidelines",
};

function PDFPreview({ url, title, onDownload }) {
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  // Build a Google Docs viewer fallback URL
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  // Try native iframe first; if it errors, fall back to Google Docs viewer
  const [useViewer, setUseViewer] = useState(false);

  useEffect(() => {
    setStatus("loading");
    setUseViewer(false);
  }, [url]);

  const handleNativeError = () => {
    // Native PDF load failed — try Google Docs viewer
    setUseViewer(true);
    setStatus("loading");
  };

  const handleViewerError = () => {
    setStatus("error");
  };

  const handleLoad = () => {
    setStatus("ready");
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-playfair text-xl font-bold text-gray-900">
          Document Preview
        </h2>
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 text-xs text-[#24c2c2] hover:text-[#1aabab] border border-[#24c2c2]/30 hover:border-[#24c2c2] px-3 py-1.5 rounded-lg transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </button>
      </div>

      <div
        className="relative border border-gray-100 rounded-xl overflow-hidden bg-gray-50"
        style={{ height: "740px" }}
      >
        {/* Loading indicator */}
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-50">
            <div className="w-8 h-8 rounded-full border-2 border-[#24c2c2] border-t-transparent animate-spin mb-3" />
            <p className="text-sm text-gray-400">Loading preview…</p>
          </div>
        )}

        {/* Error state */}
        {status === "error" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-center px-6">
            <AlertCircle className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-500 mb-1">
              Preview unavailable
            </p>
            <p className="text-xs text-gray-400 mb-4">
              The document could not be displayed inline.
            </p>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#24c2c2] hover:bg-[#1aabab] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF instead
            </button>
          </div>
        ) : !useViewer ? (
          // Native browser PDF renderer
          <iframe
            key="native"
            src={`${url}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full border-0"
            title={title}
            onLoad={handleLoad}
            onError={handleNativeError}
          />
        ) : (
          // Google Docs viewer fallback
          <iframe
            key="viewer"
            src={googleViewerUrl}
            className="w-full h-full border-0"
            title={title}
            onLoad={handleLoad}
            onError={handleViewerError}
            allow="autoplay"
          />
        )}
      </div>

      {status === "ready" && (
        <p className="text-xs text-gray-400 mt-2 text-center">
          Having trouble viewing?{" "}
          <button
            onClick={onDownload}
            className="text-[#24c2c2] hover:underline"
          >
            Download the PDF
          </button>
          .
        </p>
      )}
    </div>
  );
}

export default function PublicationDetailPage({ slug }) {
  const { fetchPublication, fetchRelated, trackView, trackDownload, related } =
    usePublicationStore();
  const [pub, setPub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchPublication(slug).then((data) => {
      if (data) {
        setPub(data);
        setViews(data.views || 0);
        setDownloadCount(data.downloadCount || 0);
        fetchRelated(data.category, slug);
        trackView(data._id).then((v) => {
          if (v !== undefined) setViews(v);
        });
      }
      setLoading(false);
    });
  }, [slug]);

  const downloadUrl = pub?.fileUrl || pub?.pdfUrl;

  const handleDownload = async () => {
    if (!downloadUrl || !pub) return;
    const count = await trackDownload(pub._id);
    if (count !== undefined) setDownloadCount(count);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${pub.title || "publication"}.${pub.fileFormat || "pdf"}`;
    a.target = "_blank";
    a.click();
  };

  const date = pub?.publishedAt || pub?.createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const pageUrl = `/publications/${slug}`;
  const catLabel = CATEGORY_LABELS[pub?.category] || pub?.category;

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-4/6" />
            <div className="mt-4 h-32 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!pub) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <FileText className="w-12 h-12 text-gray-200 mb-4" />
        <h2 className="font-playfair text-2xl font-bold text-gray-600 mb-2">
          Publication not found
        </h2>
        <Link
          href="/publications"
          className="mt-2 px-6 py-2.5 bg-[#24c2c2] hover:bg-[#1aabab] text-white rounded-lg text-sm font-medium transition-colors"
        >
          Back to Publications
        </Link>
      </div>
    );
  }

  // ── Detail page ───────────────────────────────────────────────────────────
  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-[#24c2c2] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2] transition-colors">
          Media
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href="/publications"
          className="hover:text-[#24c2c2] transition-colors"
        >
          Publications
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 truncate max-w-[200px]">{pub.title}</span>
      </nav>

      {/* Main layout */}
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8 mb-12">
        {/* Left — Cover + actions */}
        <div className="flex-shrink-0">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
            {pub.coverImageUrl ? (
              <Image
                src={pub.coverImageUrl}
                alt={pub.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-300">
                <FileText className="w-16 h-16 mb-2" />
                <span className="text-xs text-gray-400">PDF Document</span>
              </div>
            )}
          </div>

          {downloadUrl && (
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-3 bg-[#24c2c2] hover:bg-[#1aabab] text-white font-medium rounded-xl transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          )}

          <div className="mt-3">
            <SocialShare url={pageUrl} title={pub.title} compact />
          </div>
        </div>

        {/* Right — Metadata */}
        <div>
          {catLabel && (
            <span className="inline-block px-3 py-1 bg-[#24c2c2]/10 text-[#1aabab] text-xs font-semibold rounded-full mb-4">
              {catLabel}
            </span>
          )}

          <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {pub.title}
          </h1>

          {pub.description && (
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              {pub.description}
            </p>
          )}

          {/* Stats strip */}
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 border-y border-gray-100 py-3">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#24c2c2]" />
              {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views} views
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#24c2c2]" />
              {downloadCount} downloads
            </span>
          </div>

          {/* Meta grid */}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl text-sm border border-gray-100">
            {pub.author && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">
                  Author / Publisher
                </dt>
                <dd className="font-medium text-gray-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#24c2c2]" />
                  {pub.author}
                </dd>
              </div>
            )}
            {formattedDate && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">
                  Published
                </dt>
                <dd className="font-medium text-gray-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#24c2c2]" />
                  {formattedDate}
                </dd>
              </div>
            )}
            {pub.yearOfPublication && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">
                  Year
                </dt>
                <dd className="font-medium text-gray-700">
                  {pub.yearOfPublication}
                </dd>
              </div>
            )}
            {pub.fileSize && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">
                  File Size
                </dt>
                <dd className="font-medium text-gray-700">{pub.fileSize}</dd>
              </div>
            )}
            {pub.pageCount && (
              <div>
                <dt className="text-xs text-gray-400 font-medium mb-0.5">
                  Pages
                </dt>
                <dd className="font-medium text-gray-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#24c2c2]" />
                  {pub.pageCount}
                </dd>
              </div>
            )}
          </dl>

          {/* Tags */}
          {pub.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {pub.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-[#24c2c2]/10 hover:text-[#1aabab] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <SocialShare url={pageUrl} title={pub.title} />
        </div>
      </div>

      {/* PDF Preview */}
      {downloadUrl && (
        <PDFPreview
          url={downloadUrl}
          title={pub.title}
          onDownload={handleDownload}
        />
      )}

      {/* Related publications */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-[#24c2c2] rounded-full" />
              <h2 className="font-playfair text-2xl font-bold text-gray-900">
                Related Publications
              </h2>
            </div>
            <Link
              href="/publications"
              className="text-sm text-[#24c2c2] hover:text-[#1aabab] hover:underline flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((r) => (
              <PublicationCard key={r._id} pub={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}