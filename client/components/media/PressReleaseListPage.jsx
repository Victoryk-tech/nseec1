"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, ChevronRight, Search } from "lucide-react";
import { useBlogContext } from "@/components/contexts/BlogContext";
import PressReleaseCard from "./PressReleaseCard";

const POSTS_PER_PAGE = 10;

function SkeletonCard() {
  return (
    <div className="flex gap-4 p-5 border border-gray-100 rounded-xl animate-pulse">
      <div className="w-14 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}

export default function PressReleaseListPage() {
  const { blogs, loading } = useBlogContext();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pressReleases = useMemo(
    () => blogs.filter((b) => b.mainCategory === "press-release"),
    [blogs]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return pressReleases;
    const s = search.toLowerCase();
    return pressReleases.filter(
      (p) => p.title?.toLowerCase().includes(s) || p.description?.toLowerCase().includes(s)
    );
  }, [pressReleases, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">Press Release</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-blue-700 rounded-full" />
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">Press Release</h1>
            <p className="text-sm text-gray-500 mt-0.5">Official statements and announcements from NSSEC</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search press releases..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FileText className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="font-playfair text-xl font-semibold text-gray-500 mb-2">No press releases found</h3>
          <p className="text-sm text-gray-400">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginated.map((post) => (
              <PressReleaseCard key={post._id} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                Previous
              </button>
              {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 text-sm rounded-lg border transition-all ${
                    page === i + 1 ? "bg-blue-700 text-white border-blue-700" : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
