"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Images, ChevronRight, ChevronLeft, X } from "lucide-react";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import SocialShare from "./SocialShare";

const QUERY = groq`*[_type == "mediaPost" && mainCategory == "photo-gallery" && slug.current == $slug][0]{
  _id, title, slug, description,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  publishedAt, _createdAt,
  "galleryImages": galleryImages[]{
    "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
    caption, altText
  }
}`;

export default function GalleryDetailPage({ slug }) {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    sanityClient.fetch(QUERY, { slug }).then((data) => {
      setAlbum(data);
      setLoading(false);
    });
  }, [slug]);

  const openLightbox = (index) => { setLightboxIndex(index); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImg = () => setLightboxIndex((i) => Math.max(0, i - 1));
  const nextImg = () => setLightboxIndex((i) => Math.min((album?.galleryImages?.length || 1) - 1, i + 1));

  useEffect(() => {
    const handler = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  if (loading) {
    return (
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Images className="w-12 h-12 text-gray-200 mb-4" />
        <h2 className="font-playfair text-2xl font-bold text-gray-600 mb-2">Album not found</h2>
        <Link href="/media/photo-gallery" className="px-6 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const images = album.galleryImages || [];
  const date = album.publishedAt || album._createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#24c2c2]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media" className="hover:text-[#24c2c2]">Media</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/media/photo-gallery" className="hover:text-amber-500">Photo Gallery</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 truncate max-w-[200px]">{album.title}</span>
      </nav>

      {/* Album header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
          Photo Gallery
        </span>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3">{album.title}</h1>
        {album.description && (
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mb-4">{album.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          )}
          {images.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Images className="w-4 h-4" />
              {images.length} photo{images.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="mt-4">
          <SocialShare url={`/media/photo-gallery/${slug}`} title={album.title} />
        </div>
      </div>

      {/* Photo grid */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 rounded-xl">
          <Images className="w-10 h-10 text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No photos in this album yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative aspect-square rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <Image
                src={img.imageUrl || "/nssec.jpeg"}
                alt={img.altText || img.caption || `Photo ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <p className="text-white text-xs line-clamp-2">{img.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
            onClick={closeLightbox}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-6 py-4 text-white/80"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm">{lightboxIndex + 1} / {images.length}</span>
              <button
                onClick={closeLightbox}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main image */}
            <div
              className="flex-1 flex items-center justify-center px-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={prevImg}
                disabled={lightboxIndex === 0}
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="relative w-full max-h-[70vh] max-w-5xl aspect-auto flex items-center justify-center">
                <Image
                  src={images[lightboxIndex].imageUrl || "/nssec.jpeg"}
                  alt={images[lightboxIndex].altText || images[lightboxIndex].caption || "Gallery photo"}
                  width={1200}
                  height={800}
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                  unoptimized
                />
              </div>
              <button
                onClick={nextImg}
                disabled={lightboxIndex === images.length - 1}
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Caption */}
            {images[lightboxIndex].caption && (
              <p
                className="text-center text-white/70 text-sm px-6 py-2"
                onClick={(e) => e.stopPropagation()}
              >
                {images[lightboxIndex].caption}
              </p>
            )}

            {/* Thumbnail strip */}
            <div
              className="flex items-center gap-2 px-4 py-3 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? "border-amber-400 opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img.imageUrl || "/nssec.jpeg"}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
