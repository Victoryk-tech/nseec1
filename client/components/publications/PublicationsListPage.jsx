"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Search, FileText } from "lucide-react";
import { useBlogContext } from "../contexts/BlogContext";
import PublicationCard from "./PublicationCard";

const CATEGORIES = [
  { value: "all", label: "All Publications" },
  { value: "reports", label: "Reports" },
  { value: "digest", label: "Digest" },
  { value: "research-journals", label: "Research / Journals" },
  { value: "nssec-establishment-act", label: "Establishment Act" },
  { value: "national-policy-sse", label: "National Policy" },
  { value: "minimum-standards", label: "Minimum Standards" },
  { value: "implementation-guidelines", label: "Impl. Guidelines" },
];

const ITEMS_PER_PAGE = 12;

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-8 bg-gray-200 rounded mt-3" />
      </div>
    </div>
  );
}

export default function PublicationsListPage() {
  const { publications, loading } = useBlogContext();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = publications;
    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter((p) => p.title?.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s));
    }
    return result;
  }, [publications, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDownload = async (slug) => {
    try {
      await fetch(`/api/downloads/${slug}`, { method: "POST" });
    } catch {}
  };

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">Publications</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-emerald-600 rounded-full" />
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">Publications</h1>
            <p className="text-sm text-gray-500 mt-0.5">{publications.length} publications — reports, digests, research and guidelines</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search publications..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 w-full sm:w-72"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => { setActiveCategory(cat.value); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeCategory === cat.value
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FileText className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="font-playfair text-xl font-semibold text-gray-500 mb-2">No publications found</h3>
          <p className="text-sm text-gray-400">Try a different category or search</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {paginated.map((pub) => (
              <PublicationCard key={pub._id} pub={pub} onDownload={handleDownload} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                Previous
              </button>
              {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 text-sm rounded-lg border transition-all ${page === i + 1 ? "bg-emerald-600 text-white border-emerald-600" : "border-gray-200 hover:border-emerald-400"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
