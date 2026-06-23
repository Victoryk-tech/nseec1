import PublicationDetailPage from "@/components/publications/PublicationDetailPage";
import { publicationSchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/publications/slugs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data?.slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API}/publications/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const pub = data.data?.publication;
    if (!pub) throw new Error();
    const details = [pub.fileSize, pub.pageCount ? `${pub.pageCount} pages` : null].filter(Boolean).join(" • ");
    return {
      title: `${pub.title} | Publications | NSSEC`,
      description: `${pub.description || `Download ${pub.title}`}${details ? ` (${details})` : ""}`,
      keywords: ["NSSEC", "Publication", pub.category, "Nigeria Education", "PDF Download"],
      alternates: { canonical: `${BASE}/publications/${slug}` },
      openGraph: {
        title: pub.title,
        description: pub.description || `Download ${pub.title}`,
        url: `${BASE}/publications/${slug}`,
        type: "article",
        publishedTime: pub.publishedAt || pub.createdAt,
        images: [{ url: pub.coverImageUrl || `${BASE}/nssec.jpeg`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: pub.title,
        description: pub.description || "",
        images: [pub.coverImageUrl || `${BASE}/nssec.jpeg`],
        site: "@NSSEC_Nigeria",
      },
    };
  } catch {
    return { title: "Publication not found | NSSEC" };
  }
}

export default async function PublicationDetailRoute({ params }) {
  const { slug } = await params;
  let jsonLd = null;
  try {
    const res = await fetch(`${API}/publications/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const pub = data.data?.publication;
      if (pub) {
        jsonLd = publicationSchema({
          title: pub.title,
          description: pub.description,
          coverImageUrl: pub.coverImageUrl,
          publishedAt: pub.publishedAt || pub.createdAt,
          slug,
          author: pub.author,
          fileSize: pub.fileSize,
          pageCount: pub.pageCount,
        });
      }
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
      <PublicationDetailPage slug={slug} />
    </>
  );
}
