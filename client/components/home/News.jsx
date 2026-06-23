"use client";
import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, ArrowRight, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { urlFor } from "@/app/lib/imageUrl";
import { useNewsStore } from "@/store/newsStore";

const CATEGORY_LABELS = {
  "nssec-news": "NSSEC News",
  "press-release": "Press Release",
  "photo-gallery": "Photo Gallery",
  "gallery": "Gallery",
  "news-headlines": "News",
};

const formatCat = (cat) =>
  CATEGORY_LABELS[cat] ||
  (cat ? cat.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") : "");

/* ── Skeleton ── */
function Skeleton() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-3">
            <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-8 w-56 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-8 w-32 bg-gray-100 rounded-xl animate-pulse hidden sm:block" />
        </div>
        <div className="grid lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 h-72 sm:h-96 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-4 bg-gray-50 rounded-2xl p-4 animate-pulse">
                <div className="w-24 h-20 bg-gray-200 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-44 bg-gray-200" />
              <div className="p-5 space-y-2">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Compact list card ── */
function ListCard({ item }) {
  return (
    <Link
      href={`/media/${item.category}/${item.slug}`}
      className="group flex gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:bg-white hover:shadow-md hover:border-[#24c2c2]/25 transition-all duration-300"
    >
      <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <span className="inline-block text-[10px] font-bold text-[#24c2c2] uppercase tracking-wide mb-1">
            {formatCat(item.category)}
          </span>
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#24c2c2] transition-colors">
            {item.title}
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1.5">
          <Clock className="w-3 h-3 text-[#24c2c2]" />
          <span>{item.formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Standard news card ── */
function NewsCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Link
        href={`/media/${item.category}/${item.slug}`}
        className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#24c2c2]/25 transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3">
            <span className="inline-block text-[10px] font-bold text-white bg-[#24c2c2] px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
              {formatCat(item.category)}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#24c2c2] transition-colors flex-grow">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-4">{item.description}</p>
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#24c2c2]" />
              {item.formattedDate}
            </span>
            {item.views && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-[#24c2c2]" />
                {item.views.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function formatTime(timestamp) {
  if (!timestamp) return "";
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now - postDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days} days ago`;
  return postDate.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });
}

export default function News() {
  const { posts, isLoading: loading, fetchPosts } = useNewsStore();

  useEffect(() => { fetchPosts(); }, []);

  const recentNews = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return posts
      .slice(0, 6)
      .map((b) => ({
        id: b._id,
        title: b.title,
        description: b.description,
        slug: b.slug?.current || b.slug,
        image: b.imageUrl || (b.image ? urlFor(b.image).url() : "/nssec.jpeg"),
        category: b.mainCategory,
        views: b.views,
        subCategory: b.subCategory,
        date: b.publishedAt || b._createdAt,
        formattedDate: formatTime(b.publishedAt || b._createdAt),
      }));
  }, [posts]);

  
  if (loading || !blogs || blogs.length === 0) {
  return null;
}

  if (recentNews.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#24c2c2]/8 rounded-full mb-5">
            <Newspaper className="w-10 h-10 text-[#24c2c2]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No News Available</h3>
          <p className="text-gray-500 text-sm">Check back soon for the latest updates and announcements.</p>
        </div>
      </section>
    );
  }

  const featured = recentNews[0];
  const listItems = recentNews.slice(1, 3);
  const standardItems = recentNews.slice(3, 6);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[#24c2c2] text-sm font-semibold uppercase tracking-widest mb-2">
              Latest Updates
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              News &amp; Announcements
            </h2>
          </div>
          <Link
            href="/media"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#24c2c2] border border-[#24c2c2]/30 px-5 py-2.5 rounded-xl hover:bg-[#24c2c2] hover:text-white hover:border-[#24c2c2] transition-all duration-300 whitespace-nowrap self-start sm:self-auto"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Featured row */}
        <div className="grid lg:grid-cols-5 gap-5 mb-5">
          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-3"
          >
            <Link
              href={`/media/${featured.category}/${featured.slug}`}
              className="group relative flex h-72 sm:h-[400px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <span className="inline-block self-start text-[10px] font-bold text-white bg-[#24c2c2] px-2.5 py-1 rounded-full uppercase tracking-wide mb-3 shadow-sm">
                  {formatCat(featured.category)}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug line-clamp-2 mb-2 group-hover:text-[#24c2c2] transition-colors">
                  {featured.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 hidden sm:block mb-3">
                  {featured.description}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-white/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#24c2c2]" />
                    {featured.formattedDate}
                  </span>
                  {featured.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#24c2c2]" />
                      {featured.views.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Compact list column */}
          {listItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {listItems.map((item) => (
                <ListCard key={item.id} item={item} />
              ))}
              {listItems.length < 2 && (
                <div className="flex-1 bg-[#082c2c] rounded-2xl p-6 flex flex-col justify-center">
                  <div className="h-0.5 w-8 bg-[#24c2c2] mb-4" />
                  <p className="text-white font-bold text-sm mb-2">Stay Updated</p>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    Subscribe to NSSEC&apos;s newsletter for the latest education news.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#24c2c2]"
                  >
                    Contact Us <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Standard 3-card row */}
        {standardItems.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {standardItems.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
