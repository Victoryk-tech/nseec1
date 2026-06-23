"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Images, ChevronRight, Search } from "lucide-react";
import { useGalleryStore } from "@/store/galleryStore";
import GalleryCard from "./GalleryCard";

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

const POSTS_PER_PAGE = 12;

export default function GalleryListingPage() {
  const { albums, isLoading: loading, fetchAlbums } = useGalleryStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { fetchAlbums(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return albums;
    const s = search.toLowerCase();
    return albums.filter(
      (a) => a.title?.toLowerCase().includes(s) || a.description?.toLowerCase().includes(s)
    );
  }, [albums, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">Photo Gallery</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-amber-500 rounded-full" />
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">Photo Gallery</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {albums.length} album{albums.length !== 1 ? "s" : ""} — events, activities and milestones
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search albums..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Images className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="font-playfair text-xl font-semibold text-gray-500 mb-2">No albums found</h3>
          <p className="text-sm text-gray-400">No gallery albums match your search</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginated.map((album) => (
              <GalleryCard key={album._id} album={album} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-amber-400 hover:text-amber-600 transition-colors"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 text-sm rounded-lg border transition-all ${
                    page === i + 1 ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 hover:border-amber-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:border-amber-400 hover:text-amber-600 transition-colors"
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
