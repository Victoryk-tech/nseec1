import Link from "next/link";
import Image from "next/image";
import { Images, Calendar } from "lucide-react";

export default function GalleryCard({ album }) {
  const {
    title,
    slug,
    description,
    thumbnailUrl,
    imageUrl,
    image,
    images = [],
    galleryImages = [],
    publishedAt,
    createdAt,
    _createdAt,
  } = album;

  const href = `/media/photo-gallery/${slug?.current || slug}`;
  const coverSrc = thumbnailUrl || imageUrl || image?.asset?.url || images[0]?.imageUrl || galleryImages[0]?.imageUrl || "/nssec.jpeg";
  const photoCount = images.length || galleryImages?.length || 0;
  const date = publishedAt || createdAt || _createdAt;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
    : "";

  return (
    <Link href={href} className="group block">
      <article className="rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-300 bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={coverSrc}
            alt={title || "Gallery album"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {photoCount > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              <Images className="w-3 h-3" />
              {photoCount} {photoCount === 1 ? "photo" : "photos"}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-playfair text-base font-bold text-white leading-snug line-clamp-2">
              {title}
            </h3>
            {formattedDate && (
              <p className="flex items-center gap-1 text-white/70 text-xs mt-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </p>
            )}
          </div>
        </div>
        {description && (
          <div className="px-4 py-3">
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{description}</p>
          </div>
        )}
      </article>
    </Link>
  );
}
