import PressReleaseDetailPage from "@/components/media/PressReleaseDetailPage";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import { pressReleaseSchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";

const allSlugsQuery = groq`*[_type == "mediaPost" && mainCategory == "press-release" && defined(slug.current)]{ "slug": slug.current }`;

const metaQuery = groq`*[_type == "mediaPost" && mainCategory == "press-release" && slug.current == $slug][0]{
  title, description, summary,
  sourceUrl, sourceName, sourceDomain,
  "source": source->{ name, domain },
  publishedAt, _createdAt, hashtags,
  "categories": categories[]->{title},
  "tags": tags[]->{title}
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
    const pr = await sanityClient.fetch(metaQuery, { slug });
    if (!pr) throw new Error();
    const sourceName = pr.source?.name || pr.sourceName || "";
    const desc = pr.summary || pr.description || "";
    const hashtags = (pr.hashtags || []).map((h) => `#${h}`).join(" ");
    const categoryNames = (pr.categories || []).map((c) => c.title);
    const tagNames = (pr.tags || []).map((t) => t.title);
    const pageUrl = `${BASE}/media/press-release/${slug}`;
    return {
      title: `${pr.title} | Press Release | NSSEC`,
      description: desc.slice(0, 160),
      keywords: ["NSSEC", "Press Release", "Nigeria Education", ...categoryNames, ...tagNames, ...(pr.hashtags || [])],
      alternates: { canonical: pageUrl },
      openGraph: {
        title: pr.title,
        description: desc.slice(0, 200),
        url: pageUrl,
        type: "article",
        publishedTime: pr.publishedAt || pr._createdAt,
        section: categoryNames[0] || "Press Release",
        tags: tagNames,
        siteName: "NSSEC",
        images: [{ url: `${BASE}/nssec.jpeg`, width: 1200, height: 630, alt: pr.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: pr.title,
        description: desc.slice(0, 200),
        images: [`${BASE}/nssec.jpeg`],
        site: "@NSSEC_Nigeria",
        creator: "@NSSEC_Nigeria",
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
    const pr = await sanityClient.fetch(metaQuery, { slug });
    if (pr) {
      jsonLd = pressReleaseSchema({
        title: pr.title,
        description: pr.summary || pr.description,
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
