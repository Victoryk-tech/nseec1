// app/posts/[slug]/page.jsx
import PostsPage from "../../../components/PostsPage";
import { sanityClient } from "../../../lib/sanityClient"; // Ensure this is properly set up
import { groq } from "next-sanity";

const postQuery = groq`
  *[_type == "mediaPost" && slug.current == $slug][0] {
      _id,
          title,
          slug,
          description,
          content,
          image{
            asset->{_id, url}
          },
          mainCategory,
          subCategory,
          comments,
          views,
          publishedAt,
          _createdAt
  }
`;

const allSlugsQuery = groq`
  *[_type == "mediaPost" && defined(slug.current)]{
    "slug": slug.current
  }
`;


export async function generateStaticParams() {
  try {
    const data = await sanityClient.fetch(allSlugsQuery);

    return data.map((post) => ({
      slug: post.slug, // already a plain string
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}


export async function generateMetadata({ params }) {
  const { slug } = params;
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const post = await sanityClient.fetch(postQuery, { slug });

    if (!post) throw new Error("Post not found");

    const imageUrl = post.image ? post.image.asset?.url : null;

    return {
      title: `${post.title} | My Blog`,
      description: post.description || "Read this insightful blog post.",
      openGraph: {
        title: post.title,
        description: post.description || "Read this insightful blog post.",
        url: `${siteUrl}/media/${slug}`,
        type: "article",
        images: [
          {
            url: imageUrl || `${siteUrl}/default-image.png`,
            width: 800,
            height: 600,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description || "Read this insightful blog post.",
        images: [imageUrl || `${siteUrl}/default-image.png`],
      },
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }
}
export default async function Page({ params }) {
  const { slug } = await params; 
  return <PostsPage slug={slug} />;
}

