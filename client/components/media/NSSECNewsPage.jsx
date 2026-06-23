"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Newspaper, ChevronRight, Search } from "lucide-react";
import { useNssecNewsStore } from "@/store/nssecNewsStore";
import NewsCard from "./NewsCard";

const POSTS_PER_PAGE = 9;

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}

export default function NSSECNewsPage() {
  const { posts: newsPosts, isLoading: loading, fetchPosts } = useNssecNewsStore();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { fetchPosts(); }, []);

  // Build tabs from whichever categories actually exist in the fetched posts
  const tabs = useMemo(() => {
    const seen = new Set();
    const cats = [];
    for (const post of newsPosts) {
      for (const cat of post.categories || []) {
        if (cat?.slug && !seen.has(cat.slug)) {
          seen.add(cat.slug);
          cats.push({ slug: cat.slug, title: cat.title });
        }
      }
    }
    return [{ slug: "all", title: "All News" }, ...cats];
  }, [newsPosts]);

  const filtered = useMemo(() => {
    let result = newsPosts;
    if (activeTab !== "all") {
      result = result.filter((p) =>
        p.categories?.some((c) => c.slug === activeTab)
      );
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) => p.title?.toLowerCase().includes(s) || p.excerpt?.toLowerCase().includes(s)
      );
    }
    return result;
  }, [newsPosts, activeTab, search]);

  const featured = useMemo(() => filtered.find((p) => p.featuredNews) || filtered[0], [filtered]);
  const rest = useMemo(() => filtered.filter((p) => p._id !== featured?._id), [filtered, featured]);

  const totalPages = Math.ceil(rest.length / POSTS_PER_PAGE);
  const paginated = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">NSSEC News</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-[#24c2c2] rounded-full" />
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">NSSEC News</h1>
              <p className="text-sm text-gray-500 mt-0.5">Latest news and updates from NSSEC</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search news..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2] w-full sm:w-64"
            />
          </div>
        </div>

        {/* Category tabs — driven by actual Sanity newsCategory data */}
        {tabs.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => { setActiveTab(tab.slug); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all border ${
                  activeTab === tab.slug
                    ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                    : "border-gray-200 text-gray-600 hover:border-[#24c2c2] hover:text-[#24c2c2]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Newspaper className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="font-playfair text-xl font-semibold text-gray-500 mb-2">No news found</h3>
          <p className="text-sm text-gray-400">Try a different search or category</p>
        </div>
      ) : (
        <>
          {/* Featured article */}
          {featured && (
            <div className="mb-8">
              <NewsCard post={featured} size="large" />
            </div>
          )}

          {/* Grid */}
          {paginated.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginated.map((post) => (
                  <NewsCard key={post._id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 text-sm rounded-lg border transition-all ${
                        page === i + 1
                          ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                          : "border-gray-200 hover:border-[#24c2c2] hover:text-[#24c2c2]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
