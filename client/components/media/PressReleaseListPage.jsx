"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Search, FileText, Filter, X } from "lucide-react";
import { usePressReleaseStore } from "@/store/pressReleaseStore";
import { PressReleaseCard, SkeletonCard } from "./press";

const POSTS_PER_PAGE = 6;

export default function PressReleaseListPage() {
  const { posts, isLoading, fetchPosts } = usePressReleaseStore();
  const [search, setSearch] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => { fetchPosts(); }, []);

  // Derive unique categories from actual Sanity data
  const categories = useMemo(() => {
    const seen = new Set();
    const cats = [];
    for (const p of posts) {
      for (const c of p.categories || []) {
        if (c?.slug && !seen.has(c.slug)) {
          seen.add(c.slug);
          cats.push({ slug: c.slug, title: c.title });
        }
      }
    }
    return [{ slug: "all", title: "All" }, ...cats];
  }, [posts]);

  const filtered = useMemo(() => {
    let result = [...posts];
    if (activeCategorySlug !== "all") {
      result = result.filter((p) =>
        p.categories?.some((c) => c.slug === activeCategorySlug)
      );
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s) ||
          (p.source?.name || p.sourceName)?.toLowerCase().includes(s)
      );
    }
    return result;
  }, [posts, search, activeCategorySlug]);

  const featured = useMemo(() => posts.find((p) => p.featured), [posts]);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleSearch = (v) => { setSearch(v); setPage(1); };
  const handleCategory = (slug) => { setActiveCategorySlug(slug); setPage(1); };

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-[#24c2c2] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2] transition-colors">Media</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#0e4f6b] font-medium">Press Releases</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-bold text-[#24c2c2] uppercase tracking-widest mb-1">Official Statements</p>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e4f6b]">
            Press Releases
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Official statements, communiqués, and announcements from NSSEC
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search press releases..."
            className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2] transition-all"
          />
          {search && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Accent divider */}
      <div className="h-px bg-gradient-to-r from-[#24c2c2] via-[#1a9999] to-transparent mb-8" />

      {/* Category filters — derived from Sanity data */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategory(cat.slug)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                  activeCategorySlug === cat.slug
                    ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                    : "border-gray-200 text-gray-500 hover:border-[#24c2c2] hover:text-[#0e4f6b]"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats bar */}
      {!isLoading && (
        <p className="text-xs text-gray-400 mb-6">
          Showing{" "}
          <span className="font-semibold text-[#0e4f6b]">{filtered.length}</span>{" "}
          press release{filtered.length !== 1 ? "s" : ""}
          {activeCategorySlug !== "all" && (
            <>
              {" "}in{" "}
              <span className="font-semibold text-[#24c2c2]">
                {categories.find((c) => c.slug === activeCategorySlug)?.title || activeCategorySlug}
              </span>
            </>
          )}
          {search && (
            <>
              {" "}matching{" "}
              <span className="font-semibold text-[#24c2c2]">"{search}"</span>
            </>
          )}
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-[#24c2c2]/10 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#24c2c2]/60" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-gray-600 mb-2">No press releases found</h3>
          <p className="text-sm text-gray-400 mb-4">
            {search ? `No results for "${search}"` : "Nothing here yet"}
          </p>
          <button
            onClick={() => { setSearch(""); setActiveCategorySlug("all"); }}
            className="px-5 py-2 bg-[#24c2c2] text-white text-sm font-semibold rounded-full hover:bg-[#1a9999] transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginated.map((post) => (
              <PressReleaseCard key={post._id} post={post} featured={post.featured} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-30 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors font-medium"
              >
                ← Previous
              </button>
              {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 text-sm rounded-xl border font-semibold transition-all ${
                    page === i + 1
                      ? "bg-[#24c2c2] text-white border-[#24c2c2] shadow-sm"
                      : "border-gray-200 text-gray-600 hover:border-[#24c2c2] hover:text-[#24c2c2]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-5 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-30 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors font-medium"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
