import PublicationDetailPage from "@/components/publications/PublicationDetailPage";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import { publicationSchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";
const allSlugsQuery = groq`*[_type == "publications" && defined(slug.current)]{ "slug": slug.current }`;
const pubQuery = groq`*[_type == "publications" && slug.current == $slug][0]{
  title, description,
  "coverImageUrl": coalesce(cloudinaryUrl, coverImage.asset->url),
  category, author, publishedAt, _createdAt, fileSize, pageCount
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
    const pub = await sanityClient.fetch(pubQuery, { slug });
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
        publishedTime: pub.publishedAt || pub._createdAt,
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
    const pub = await sanityClient.fetch(pubQuery, { slug });
    if (pub) {
      jsonLd = publicationSchema({
        title: pub.title,
        description: pub.description,
        coverImageUrl: pub.coverImageUrl,
        publishedAt: pub.publishedAt || pub._createdAt,
        slug,
        author: pub.author,
        fileSize: pub.fileSize,
        pageCount: pub.pageCount,
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
      <PublicationDetailPage slug={slug} />
    </>
  );
}
