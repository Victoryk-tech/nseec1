import PressReleaseDetailPage from "@/components/media/PressReleaseDetailPage";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import { pressReleaseSchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";
const allSlugsQuery = groq`*[_type == "mediaPost" && mainCategory == "press-release" && defined(slug.current)]{ "slug": slug.current }`;
const prQuery = groq`*[_type == "mediaPost" && mainCategory == "press-release" && slug.current == $slug][0]{
  title, description, "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  publishedAt, _createdAt, hashtags
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
    const pr = await sanityClient.fetch(prQuery, { slug });
    if (!pr) throw new Error();
    const hashtags = pr.hashtags?.map((h) => `#${h}`).join(" ") || "";
    return {
      title: `${pr.title} | Press Release | NSSEC`,
      description: `${pr.description || ""} ${hashtags}`.trim(),
      keywords: ["NSSEC", "Press Release", "Nigeria Education", ...(pr.hashtags || [])],
      alternates: { canonical: `${BASE}/media/press-release/${slug}` },
      openGraph: {
        title: pr.title,
        description: pr.description || "",
        url: `${BASE}/media/press-release/${slug}`,
        type: "article",
        publishedTime: pr.publishedAt || pr._createdAt,
        images: [{ url: pr.imageUrl || `${BASE}/nssec.jpeg`, width: 1200, height: 630 }],
      },
      twitter: {
        card: "summary_large_image",
        title: pr.title,
        description: pr.description || "",
        images: [pr.imageUrl || `${BASE}/nssec.jpeg`],
        site: "@NSSEC_Nigeria",
      },
    };
  } catch {
    return { title: "Press release not found | NSSEC" };
  }
}

export default async function PressReleaseDetailRoute({ params }) {
  const { slug } = await params;
  let jsonLd = null;
  try {
    const pr = await sanityClient.fetch(prQuery, { slug });
    if (pr) {
      jsonLd = pressReleaseSchema({
        title: pr.title,
        description: pr.description,
        imageUrl: pr.imageUrl,
        publishedAt: pr.publishedAt || pr._createdAt,
        slug,
        hashtags: pr.hashtags || [],
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
      <PressReleaseDetailPage slug={slug} />
    </>
  );
}
