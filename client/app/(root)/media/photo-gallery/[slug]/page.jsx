import GalleryDetailPage from "@/components/media/GalleryDetailPage";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import { photoGallerySchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";
const allSlugsQuery = groq`*[_type == "mediaPost" && mainCategory == "photo-gallery" && defined(slug.current)]{ "slug": slug.current }`;
const albumQuery = groq`*[_type == "mediaPost" && mainCategory == "photo-gallery" && slug.current == $slug][0]{
  title, description, publishedAt, _createdAt,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  "galleryImages": galleryImages[]{ "imageUrl": coalesce(cloudinaryUrl, image.asset->url) }
}`;

export async function generateStaticParams() {
  try {
    const data = await sanityClient.fetch(allSlugsQuery);
    return data.map((d) => ({ slug: d.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const album = await sanityClient.fetch(albumQuery, { slug });
    if (!album) throw new Error();
    const photoCount = album.galleryImages?.length || 0;
    return {
      title: `${album.title} | Photo Gallery | NSSEC`,
      description: album.description || `View ${photoCount} photos from ${album.title}`,
      alternates: { canonical: `${BASE}/media/photo-gallery/${slug}` },
      openGraph: {
        title: album.title,
        description: album.description || `${photoCount} photos`,
        url: `${BASE}/media/photo-gallery/${slug}`,
        type: "website",
        images: [{ url: album.imageUrl || album.galleryImages?.[0]?.imageUrl || `${BASE}/nssec.jpeg`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: album.title,
        images: [album.imageUrl || `${BASE}/nssec.jpeg`],
      },
    };
  } catch {
    return { title: "Gallery album not found | NSSEC" };
  }
}

export default async function GalleryAlbumRoute({ params }) {
  const { slug } = await params;
  let jsonLd = null;
  try {
    const album = await sanityClient.fetch(albumQuery, { slug });
    if (album) {
      jsonLd = photoGallerySchema({
        title: album.title,
        description: album.description,
        imageUrl: album.imageUrl || album.galleryImages?.[0]?.imageUrl,
        publishedAt: album.publishedAt || album._createdAt,
        slug,
        photoCount: album.galleryImages?.length,
      });
    }
  } catch {}
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <GalleryDetailPage slug={slug} />
    </>
  );
}
