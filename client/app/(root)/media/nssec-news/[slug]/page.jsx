import NewsArticlePage from "@/components/media/NewsArticlePage";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import { newsArticleSchema } from "@/app/utils/structuredData";

const BASE = "https://nssec.gov.ng";

const allSlugsQuery = groq`*[_type == "mediaPost" && mainCategory == "nssec-news" && defined(slug.current)]{ "slug": slug.current }`;
const postQuery = groq`*[_type == "mediaPost" && slug.current == $slug][0]{
  title, description,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  publishedAt, _createdAt, hashtags,
  "author": author->{ name }
}`;

export async function generateStaticParams() {
  try {
    const data = await sanityClient.fetch(allSlugsQuery);
    return data.map((d) => ({ slug: d.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await sanityClient.fetch(postQuery, { slug });
    if (!post) throw new Error();
    const date = post.publishedAt || post._createdAt;
    const hashtags = post.hashtags?.map((h) => `#${h}`).join(" ") || "";
    return {
      title: `${post.title} | NSSEC News`,
      description: `${post.description || ""} ${hashtags}`.trim(),
      keywords: ["NSSEC", "Nigeria Education", ...(post.hashtags || [])],
      alternates: { canonical: `${BASE}/media/nssec-news/${slug}` },
      openGraph: {
        title: post.title,
        description: post.description || "",
        url: `${BASE}/media/nssec-news/${slug}`,
        type: "article",
        publishedTime: date,
        authors: post.author?.name ? [`${BASE}`] : undefined,
        images: [{ url: post.imageUrl || `${BASE}/nssec.jpeg`, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description || "",
        images: [post.imageUrl || `${BASE}/nssec.jpeg`],
        site: "@NSSEC_Nigeria",
        creator: "@NSSEC_Nigeria",
      },
    };
  } catch {
    return { title: "Article not found | NSSEC" };
  }
}

export default async function NSSECNewsArticleRoute({ params }) {
  const { slug } = await params;
  let jsonLd = null;
  try {
    const post = await sanityClient.fetch(postQuery, { slug });
    if (post) {
      jsonLd = newsArticleSchema({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        publishedAt: post.publishedAt || post._createdAt,
        slug,
        author: post.author?.name,
        hashtags: post.hashtags || [],
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
      <NewsArticlePage slug={slug} />
    </>
  );
}
