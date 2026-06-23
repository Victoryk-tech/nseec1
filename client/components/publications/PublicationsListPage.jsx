"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, FileText, Download } from "lucide-react";
import { usePublicationStore } from "@/store/publicationStore";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "reports", label: "Reports" },
  { value: "digest", label: "Digest" },
  { value: "research-journals", label: "Research / Journals" },
  { value: "nssec-establishment-act", label: "Establishment Act" },
  { value: "national-policy-sse", label: "National Policy" },
  { value: "minimum-standards", label: "Minimum Standards" },
  { value: "implementation-guidelines", label: "Impl. Guidelines" },
];

const CATEGORY_LABELS = {
  reports: "Reports",
  digest: "Digest",
  "research-journals": "Research / Journals",
  "nssec-establishment-act": "Establishment Act",
  "national-policy-sse": "National Policy on SSE",
  "minimum-standards": "Minimum Standards",
  "implementation-guidelines": "Implementation Guidelines",
};

const ITEMS_PER_PAGE = 10;

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 animate-pulse">
      <td className="px-4 py-4 w-10">
        <div className="h-3 w-5 bg-gray-200 rounded mx-auto" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </td>
      <td className="px-4 py-4 text-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 mx-auto" />
      </td>
      <td className="px-4 py-4 text-right hidden sm:table-cell">
        <div className="h-3 w-10 bg-gray-100 rounded ml-auto" />
      </td>
    </tr>
  );
}

export default function PublicationsListPage() {
  const { publications, isLoading, fetchPublications } = usePublicationStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPublications();
  }, []);

  const filtered = useMemo(() => {
    let result = publications;
    if (activeCategory !== "all")
      result = result.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s)
      );
    }
    return result;
  }, [publications, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDownload = (pub, e) => {
    e.preventDefault();
    const downloadUrl = pub.fileUrl || pub.pdfUrl;
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = pub.title ? `${pub.title}.pdf` : "publication.pdf";
    a.target = "_blank";
    a.click();
  };

  const getYear = (pub) => {
    const date = pub.publishedAt || pub.createdAt || pub._createdAt;
    return date ? new Date(date).getFullYear() : "";
  };

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#24c2c2] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2] transition-colors">
          Media
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">Publications</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-[#24c2c2] rounded-full" />
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
              Publications
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {publications.length} publications — reports, digests, research
              and guidelines
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search publications..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/20 focus:border-[#24c2c2] w-full sm:w-72 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setActiveCategory(cat.value);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeCategory === cat.value
                ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                : "border-gray-200 text-gray-600 hover:border-[#24c2c2] hover:text-[#24c2c2]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#24c2c2] text-white">
              <th className="px-4 py-3 text-center font-medium text-xs uppercase tracking-wider w-10 hidden sm:table-cell">
                #
              </th>
              <th className="px-4 py-3 text-left font-medium text-xs uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-center font-medium text-xs uppercase tracking-wider w-24">
                Download
              </th>
              <th className="px-4 py-3 text-right font-medium text-xs uppercase tracking-wider w-20 hidden sm:table-cell">
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <FileText className="w-10 h-10 text-gray-200 mb-3" />
                    <p className="font-playfair text-lg font-semibold text-gray-400 mb-1">
                      No publications found
                    </p>
                    <p className="text-xs text-gray-400">
                      Try a different category or search term
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((pub, i) => {
                const href = `/publications/${pub.slug?.current || pub.slug}`;
                const downloadUrl = pub.fileUrl || pub.pdfUrl;
                const year = getYear(pub);
                const rowNum = (page - 1) * ITEMS_PER_PAGE + i + 1;

                return (
                  <tr
                    key={pub._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-[#24c2c2]/[0.03] transition-colors group"
                  >
                    {/* # */}
                    <td className="px-4 py-4 text-center text-xs text-gray-400 tabular-nums hidden sm:table-cell">
                      {rowNum}
                    </td>

                    {/* Title */}
                    <td className="px-4 py-4">
                      <Link href={href} className="group/link">
                        <p className="font-medium text-gray-900 leading-snug group-hover/link:text-[#24c2c2] transition-colors">
                          {pub.title}
                        </p>
                        {pub.category && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#24c2c2]/10 text-[#1aabab]">
                            {CATEGORY_LABELS[pub.category] || pub.category}
                          </span>
                        )}
                      </Link>
                    </td>

                    {/* Download */}
                    <td className="px-4 py-4 text-center">
                      {downloadUrl ? (
                        <button
                          onClick={(e) => handleDownload(pub, e)}
                          title="Download PDF"
                          aria-label={`Download ${pub.title}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#24c2c2] hover:bg-[#1aabab] text-white transition-colors mx-auto"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Year */}
                    <td className="px-4 py-4 text-right text-xs text-gray-400 tabular-nums hidden sm:table-cell">
                      {year}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
          <p className="text-xs text-gray-400">
            Page {page} of {totalPages} &mdash; {filtered.length} results
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
            >
              Previous
            </button>

            {[...Array(Math.min(totalPages, 7))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 text-xs rounded-lg border transition-all ${
                    page === pageNum
                      ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                      : "border-gray-200 text-gray-600 hover:border-[#24c2c2] hover:text-[#24c2c2]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}