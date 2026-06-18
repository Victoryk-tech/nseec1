"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, Clock, ChevronRight, User } from "lucide-react";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import SocialShare from "./SocialShare";
import { TagBadge, HashtagList } from "./TagBadge";
import MediaPortableText from "./MediaPortableText";
import NewsCard from "./NewsCard";

function calcReadTime(content) {
  if (!content || !Array.isArray(content)) return 1;
  const words = content
    .filter((b) => b._type === "block")
    .flatMap((b) => b.children?.map((c) => c.text || "") || [])
    .join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const QUERY = groq`*[_type == "mediaPost" && slug.current == $slug][0]{
  _id, title, slug, description, content,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  mainCategory, subCategory,
  "author": author->{ name, "imageUrl": image.asset->url },
  views, featured, publishedAt, _createdAt, hashtags,
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const RELATED_QUERY = groq`*[_type == "mediaPost" && mainCategory == $cat && slug.current != $slug] | order(publishedAt desc)[0...4]{
  _id, title, slug, description,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  mainCategory, subCategory, views, publishedAt, _createdAt, content
}`;

export default function NewsArticlePage({ slug }) {
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
      if (data?.mainCategory) {
        sanityClient.fetch(RELATED_QUERY, { cat: data.mainCategory, slug }).then(setRelated);
      }
    });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        const v = d?.results?.[0]?.document?.views;
        if (v !== undefined) setViews(v);
      })
      .catch(() => {});
  }, [slug]);

  const readTime = useMemo(() => calcReadTime(post?.content), [post?.content]);
  const formattedDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const pageUrl = `/media/nssec-news/${slug}`;

  if (loading) {
    return (
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
          <div className="aspect-video bg-gray-200 rounded-xl mb-8" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded mb-3" style={{ width: `${75 + Math.random() * 25}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="font-playfair text-2xl font-bold text-gray-700 mb-2">Article not found</h2>
        <p className="text-gray-400 mb-6">This article may have been moved or removed.</p>
        <Link href="/media/nssec-news" className="px-6 py-2.5 bg-[#24c2c2] text-white rounded-lg text-sm font-medium hover:bg-[#1a9999] transition-colors">
          Back to News
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
          <Link href="/media/nssec-news" className="hover:text-[#24c2c2]">NSSEC News</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Category badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-[#24c2c2] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
            NSSEC News
          </span>
          {post.subCategory && post.subCategory !== "uncategorized" && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
              {post.subCategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-950 leading-tight mb-5">
          {post.title}
        </h1>

        {/* Description */}
        {post.description && (
          <p className="text-lg text-gray-500 leading-relaxed mb-6 border-l-4 border-gray-100 pl-4">
            {post.description}
          </p>
        )}

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-5 border-b border-gray-100 mb-5">
          {post.author?.name && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span className="font-medium text-gray-700">{post.author.name}</span>
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views} views
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {readTime} min read
          </span>
        </div>

        {/* Share + Tags */}
        <div className="flex flex-col gap-3 mb-7">
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
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="mb-12">
          <MediaPortableText content={post.content} />
        </div>

        {/* Bottom share */}
        <div className="border-t border-gray-100 pt-6 mb-12">
          <p className="text-sm font-medium text-gray-500 mb-3">Share this article</p>
          <SocialShare url={pageUrl} title={post.title} hashtags={post.hashtags || []} />
        </div>

        {/* Hashtags at bottom */}
        {post.hashtags?.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tags</p>
            <HashtagList hashtags={post.hashtags} />
          </div>
        )}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold text-gray-900">More News</h2>
            <Link href="/media/nssec-news" className="text-sm text-[#24c2c2] hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <NewsCard key={p._id} post={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
