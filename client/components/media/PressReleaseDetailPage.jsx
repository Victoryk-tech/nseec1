"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, ChevronRight, User, FileText } from "lucide-react";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import SocialShare from "./SocialShare";
import { TagBadge, HashtagList } from "./TagBadge";
import MediaPortableText from "./MediaPortableText";
import PressReleaseCard from "./PressReleaseCard";

const QUERY = groq`*[_type == "mediaPost" && mainCategory == "press-release" && slug.current == $slug][0]{
  _id, title, slug, description, content,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  mainCategory, subCategory,
  "author": author->{ name },
  views, publishedAt, _createdAt, hashtags,
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const RELATED_QUERY = groq`*[_type == "mediaPost" && mainCategory == "press-release" && slug.current != $slug] | order(publishedAt desc)[0...4]{
  _id, title, slug, description, publishedAt, _createdAt,
  mainCategory, subCategory, hashtags,
  "tags": tags[]->{_id, title, "slug": slug.current}
}`;

export default function PressReleaseDetailPage({ slug }) {
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    sanityClient.fetch(QUERY, { slug }).then((data) => {
      setPost(data);
      setViews(data?.views || 0);
      setLoading(false);
      sanityClient.fetch(RELATED_QUERY, { slug }).then(setRelated);
    });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => { const v = d?.results?.[0]?.document?.views; if (v !== undefined) setViews(v); })
      .catch(() => {});
  }, [slug]);

  const formattedDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const pageUrl = `/media/press-release/${slug}`;

  if (loading) {
    return (
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-48 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <FileText className="w-12 h-12 text-gray-200 mb-4" />
        <h2 className="font-playfair text-2xl font-bold text-gray-600 mb-2">Press release not found</h2>
        <Link href="/media/press-release" className="px-6 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          Back to Press Releases
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media/press-release" className="hover:text-blue-600">Press Release</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Official header bar */}
        <div className="bg-blue-700 text-white px-5 py-3 rounded-t-xl flex items-center justify-between mb-0">
          <span className="text-xs font-semibold uppercase tracking-widest">Official Press Release</span>
          {formattedDate && (
            <span className="flex items-center gap-1.5 text-xs text-white/80">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          )}
        </div>

        <div className="border border-t-0 border-blue-100 rounded-b-xl p-6 md:p-8 mb-8">
          {post.subCategory && post.subCategory !== "uncategorized" && (
            <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded capitalize mb-3">
              {post.subCategory}
            </span>
          )}
          <h1 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-base text-gray-500 leading-relaxed border-l-4 border-blue-200 pl-4">
              {post.description}
            </p>
          )}
        </div>

        {/* Meta & Share */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-5">
          {post.author?.name && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span className="font-medium text-gray-600">{post.author.name}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views} views
          </span>
        </div>

        <div className="flex flex-col gap-3 pb-6 border-b border-gray-100 mb-6">
          <SocialShare url={pageUrl} title={post.title} hashtags={post.hashtags || []} />
          {post.hashtags?.length > 0 && <HashtagList hashtags={post.hashtags} />}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => <TagBadge key={tag._id} tag={tag} />)}
            </div>
          )}
        </div>

        {/* Featured image */}
        {post.imageUrl && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" unoptimized priority />
          </div>
        )}

        {/* Content */}
        <div className="mb-10">
          <MediaPortableText content={post.content} />
        </div>

        {/* Bottom share */}
        <div className="border-t border-gray-100 pt-6 mb-10">
          <p className="text-sm font-medium text-gray-500 mb-3">Share this press release</p>
          <SocialShare url={pageUrl} title={post.title} hashtags={post.hashtags || []} />
        </div>

        {post.hashtags?.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tags</p>
            <HashtagList hashtags={post.hashtags} />
          </div>
        )}
      </div>

      {/* Related press releases */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">More Press Releases</h2>
            <Link href="/media/press-release" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {related.slice(0, 3).map((p) => <PressReleaseCard key={p._id} post={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
