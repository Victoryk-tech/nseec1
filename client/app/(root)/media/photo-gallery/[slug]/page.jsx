import GalleryDetailPage from "@/components/media/GalleryDetailPage";
import { photoGallerySchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/gallery/slugs`);
    const data = await res.json();
    return (data.data?.slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API}/gallery/${slug}`);
    const data = await res.json();
    const album = data.data?.album;
    if (!album) throw new Error();
    const photoCount = album.images?.length || 0;
    const coverUrl = album.thumbnailUrl || album.images?.[0]?.imageUrl || `${BASE}/nssec.jpeg`;
    return {
      title: `${album.title} | Photo Gallery | NSSEC`,
      description: album.description || `View ${photoCount} photos from ${album.title}`,
      alternates: { canonical: `${BASE}/media/photo-gallery/${slug}` },
      openGraph: {
        title: album.title,
        description: album.description || `${photoCount} photos`,
        url: `${BASE}/media/photo-gallery/${slug}`,
        type: "website",
        images: [{ url: coverUrl, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: album.title,
        images: [coverUrl],
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
    const res = await fetch(`${API}/gallery/${slug}`);
    const data = await res.json();
    const album = data.data?.album;
    if (album) {
      jsonLd = photoGallerySchema({
        title: album.title,
        description: album.description,
        imageUrl: album.thumbnailUrl || album.images?.[0]?.imageUrl,
        publishedAt: album.publishedAt || album.createdAt,
        slug,
        photoCount: album.images?.length,
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
