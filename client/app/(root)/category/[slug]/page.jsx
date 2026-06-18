// app/media/category/[slug]/page.jsx
import MediaPost from "@/components/MediaPost";


export async function generateMetadata({ params }) {
  const slug =
    typeof params?.slug === "string" ? params.slug : "";

  const categoryName = slug
    ? slug.replace(/-/g, " ").toLowerCase()
    : "category";

  const siteUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: categoryName,
    description: `Explore insightful posts in the ${categoryName} category.`,

    openGraph: {
      title: categoryName,
      description: `Explore insightful posts in the ${categoryName} category.`,
      url: `${siteUrl}/media/category/${slug}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: categoryName,
      description: `Explore insightful posts in the ${categoryName} category.`,
    },
  };
}

export default async function Page({ params }) {
    const { slug } = await params; 

  return <MediaPost slug={slug}/>;
}
