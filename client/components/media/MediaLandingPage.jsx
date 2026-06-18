"use client";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Images, FileText, BookOpen, ChevronRight, Calendar, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogContext } from "@/components/contexts/BlogContext";
import NewsCard from "./NewsCard";
import GalleryCard from "./GalleryCard";
import PressReleaseCard from "./PressReleaseCard";
import PublicationCard from "@/components/publications/PublicationCard";

const sections = [
  {
    key: "nssec-news",
    label: "NSSEC News",
    href: "/media/nssec-news",
    icon: <Newspaper className="w-5 h-5" />,
    color: "text-[#24c2c2]",
    borderColor: "border-[#24c2c2]",
    bg: "bg-[#24c2c2]/5",
    desc: "Latest news, updates and activities",
  },
  {
    key: "photo-gallery",
    label: "Photo Gallery",
    href: "/media/photo-gallery",
    icon: <Images className="w-5 h-5" />,
    color: "text-amber-500",
    borderColor: "border-amber-400",
    bg: "bg-amber-50",
    desc: "Events, activities and milestones in pictures",
  },
  {
    key: "press-release",
    label: "Press Release",
    href: "/media/press-release",
    icon: <FileText className="w-5 h-5" />,
    color: "text-blue-700",
    borderColor: "border-blue-500",
    bg: "bg-blue-50",
    desc: "Official statements and announcements",
  },
];

function SectionHeader({ label, href, icon, color, borderColor, bg }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <div className={`flex-shrink-0 w-1 h-8 rounded-full ${borderColor.replace("border-", "bg-")}`} />
        <span className={`flex items-center gap-2 font-playfair text-xl font-bold text-gray-900`}>
          <span className={color}>{icon}</span>
          {label}
        </span>
      </div>
      <Link href={href} className={`text-xs font-medium flex items-center gap-1 ${color} hover:opacity-70 transition-opacity`}>
        View all <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default function MediaLandingPage() {
  const { blogs, publications, loading } = useBlogContext();

  const news = useMemo(() => blogs.filter((b) => b.mainCategory === "nssec-news").slice(0, 4), [blogs]);
  const gallery = useMemo(() => blogs.filter((b) => b.mainCategory === "photo-gallery").slice(0, 4), [blogs]);
  const pressReleases = useMemo(() => blogs.filter((b) => b.mainCategory === "press-release").slice(0, 4), [blogs]);
  const latestPubs = useMemo(() => publications.slice(0, 4), [publications]);

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl my-8 bg-gradient-to-br from-gray-950 via-gray-900 to-[#082c2c] py-16 px-8 md:px-12">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/nssec.jpeg')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#24c2c2]/20 text-[#24c2c2] text-xs font-semibold rounded-full mb-4 border border-[#24c2c2]/30">
            <Newspaper className="w-3 h-3" /> Media & News Centre
          </span>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            NSSEC Media &amp; News
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
            Stay informed with the latest news, official press releases, photo galleries, and publications from the National Senior Secondary Education Commission.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {sections.map((s) => (
              <Link key={s.key} href={s.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-white hover:bg-white/10 transition-colors`}>
                {s.icon} {s.label}
              </Link>
            ))}
            <Link href="/publications"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-white hover:bg-white/10 transition-colors">
              <BookOpen className="w-4 h-4" /> Publications
            </Link>
          </div>
        </div>
      </div>

      {/* NSSEC News Section */}
      {(loading || news.length > 0) && (
        <section className="mb-14">
          <SectionHeader label="NSSEC News" href="/media/nssec-news"
            icon={<Newspaper className="w-5 h-5" />} color="text-[#24c2c2]"
            borderColor="border-[#24c2c2]" bg="bg-teal-50" />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {news.map((post) => <NewsCard key={post._id} post={post} />)}
            </div>
          )}
        </section>
      )}

      {/* Gallery + Press Release side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
        {/* Gallery */}
        {(loading || gallery.length > 0) && (
          <section>
            <SectionHeader label="Photo Gallery" href="/media/photo-gallery"
              icon={<Images className="w-5 h-5" />} color="text-amber-500"
              borderColor="border-amber-400" bg="bg-amber-50" />
            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((album) => <GalleryCard key={album._id} album={album} />)}
              </div>
            )}
          </section>
        )}

        {/* Press Releases */}
        {(loading || pressReleases.length > 0) && (
          <section>
            <SectionHeader label="Press Release" href="/media/press-release"
              icon={<FileText className="w-5 h-5" />} color="text-blue-700"
              borderColor="border-blue-500" bg="bg-blue-50" />
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl animate-pulse">
                    <div className="w-14 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {pressReleases.map((post) => <PressReleaseCard key={post._id} post={post} />)}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Publications */}
      {(loading || latestPubs.length > 0) && (
        <section className="mb-14">
          <SectionHeader label="Publications" href="/publications"
            icon={<BookOpen className="w-5 h-5" />} color="text-emerald-600"
            borderColor="border-emerald-500" bg="bg-emerald-50" />
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestPubs.map((pub) => <PublicationCard key={pub._id} pub={pub} />)}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
