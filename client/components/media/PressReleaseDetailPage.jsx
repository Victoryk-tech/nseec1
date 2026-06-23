"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Bookmark, Share2, TrendingUp, Eye } from "lucide-react";
import { usePressReleaseStore } from "@/store/pressReleaseStore";
import {
  ReadingProgress,
  BackToTop,
  PressReleaseHero,
  OfficialReleaseBox,
  PressReleaseShareBar,
  TagList,
  HashtagList,
  SourceCard,
  RelatedPressReleases,
  DetailSkeleton,
  formatViews,
  computeRelated,
} from "./press";

export default function PressReleaseDetailPage({ slug }) {
  const { fetchPost, post, related, isDetailLoading, clearPost } = usePressReleaseStore();
  const [views, setViews] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetchPost(slug);
    return () => clearPost();
  }, [slug]);

  // Fetch + increment view count
  useEffect(() => {
    if (!slug) return;
    fetch(`/api/views/${slug}?type=mediaPost`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        const v = d?.results?.[0]?.document?.views;
        if (v !== undefined) setViews(v);
      })
      .catch(() => {});
  }, [slug]);

  // Sync views from fetched post
  useEffect(() => {
    if (post?.views) setViews(post.views);
  }, [post?.views]);

  // OG image comes from Sanity urlMetadata — no runtime fetch needed
  const ogImage = post?.urlMetadata?.image || null;

  const computedRelated = useMemo(() => computeRelated(post, related), [post, related]);
  const pageUrl = `/media/press-release/${slug}`;

  if (isDetailLoading) return <DetailSkeleton />;

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#24c2c2]/10 flex items-center justify-center mb-4">
          <Share2 className="w-8 h-8 text-[#24c2c2]/60" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-gray-700 mb-2">Press release not found</h2>
        <p className="text-gray-400 mb-6">This release may have been moved or removed.</p>
        <Link
          href="/media/press-release"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#24c2c2] text-white rounded-full text-sm font-semibold hover:bg-[#1a9999] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Press Releases
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <article className="">
        {/* Hero */}
        <PressReleaseHero post={post} views={views} ogImage={ogImage} />

        {/* Main content */}
        <div className="px-4 sm:px-6 lg:px-12 py-10">
          <div className="flex flex-col xl:flex-row gap-10 max-w-[100rem] mx-auto">

            {/* Article body */}
            <main className="flex-1 min-w-0 max-w-3xl mx-auto xl:mx-0">

              {/* Official release box */}
              <OfficialReleaseBox post={post} />

              {/* Share bar (top) */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 mb-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Share this release</p>
                  <PressReleaseShareBar pageUrl={pageUrl} title={post.title} hashtags={post.hashtags} />
                </div>
                <button
                  onClick={() => setBookmarked((b) => !b)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-4 h-9 rounded-full border transition-all duration-150 ${
                    bookmarked
                      ? "border-[#24c2c2] bg-[#24c2c2]/10 text-[#24c2c2]"
                      : "border-gray-200 text-gray-400 hover:border-[#24c2c2] hover:text-[#24c2c2]"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-[#24c2c2]" : ""}`} />
                  {bookmarked ? "Saved" : "Save"}
                </button>
              </div>

              {/* Tags + Hashtags */}
              {(post.tags?.length > 0 || post.hashtags?.length > 0) && (
                <div className="space-y-5 mb-8">
                  <TagList tags={post.tags} />
                  <HashtagList hashtags={post.hashtags} />
                </div>
              )}

              {/* Bottom share */}
              <div className="border-t border-gray-100 pt-6 mb-8">
                <p className="text-sm font-bold text-gray-500 mb-3">Share this press release</p>
                <PressReleaseShareBar pageUrl={pageUrl} title={post.title} hashtags={post.hashtags} />
              </div>

              {/* Footer nav */}
              <div className="flex items-center justify-between">
                <Link
                  href="/media/press-release"
                  className="inline-flex items-center gap-2 text-sm text-[#24c2c2] hover:text-[#1a9999] font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Press Releases
                </Link>
                {post.sourceUrl && (
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0e4f6b] transition-colors font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View original source
                  </a>
                )}
              </div>
            </main>

            {/* Right sidebar (desktop only) */}
            <aside className="hidden xl:block xl:w-72 flex-shrink-0 space-y-6">

              <SourceCard post={post} />

              {/* Stats card */}
              <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
                  <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Stats
                  </p>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  <div className="text-center py-2">
                    <Eye className="w-4 h-4 text-[#24c2c2] mx-auto mb-1" />
                    <p className="text-base font-bold text-[#0e4f6b]">{formatViews(views)}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Views</p>
                  </div>
                  <div className="text-center py-2">
                    <TrendingUp className="w-4 h-4 text-[#24c2c2] mx-auto mb-1" />
                    <p className="text-base font-bold text-[#0e4f6b]">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })
                        : "—"}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Published</p>
                  </div>
                </div>
              </div>

              {/* Share sidebar */}
              <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
                  <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </p>
                </div>
                <div className="p-4">
                  <PressReleaseShareBar pageUrl={pageUrl} title={post.title} hashtags={post.hashtags} />
                </div>
              </div>

              {/* Related sidebar */}
              {computedRelated.length > 0 && (
                <RelatedPressReleases related={computedRelated} variant="sidebar" />
              )}
            </aside>
          </div>
        </div>

        {/* Related releases — bottom grid */}
        {computedRelated.length > 0 && (
          <RelatedPressReleases related={computedRelated} variant="bottom" />
        )}
      </article>
    </>
  );
}
