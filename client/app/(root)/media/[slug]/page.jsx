import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import { redirect, notFound } from "next/navigation";

const postQuery = groq`*[_type == "mediaPost" && slug.current == $slug][0]{ mainCategory, "slug": slug.current }`;

const CATEGORY_MAP = {
  "nssec-news": "nssec-news",
  "news-headlines": "nssec-news",
  "photo-gallery": "photo-gallery",
  gallery: "photo-gallery",
  "press-release": "press-release",
};

export default async function LegacyMediaRoute({ params }) {
  const { slug } = await params;
  try {
    const post = await sanityClient.fetch(postQuery, { slug });
    if (!post) notFound();
    const newCategory = CATEGORY_MAP[post.mainCategory] || "nssec-news";
    redirect(`/media/${newCategory}/${post.slug}`);
  } catch {
    notFound();
  }
}
