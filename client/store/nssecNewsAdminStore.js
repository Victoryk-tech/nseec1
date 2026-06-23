import { create } from "zustand";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import toast from "react-hot-toast";

const ADMIN_LIST_QUERY = groq`
  *[_type == "nssecnews"] | order(publishedAt desc, _createdAt desc) {
    _id, title, slug, excerpt, status, publishedAt, _createdAt, views,
    "imageUrl": coalesce(featuredImageCloudinaryUrl, featuredImage.asset->url),
    featuredNews, breakingNews, trendingNews, hashtags
  }
`;

const BODY_QUERY = groq`*[_id == $id][0]{ body, summary }`;

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function bodyToPortableText(text) {
  return text
    .split("\n\n")
    .filter((p) => p.trim())
    .map((para, i) => ({
      _type: "block",
      _key: `b${i}${Date.now()}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `s${i}`, text: para.trim(), marks: [] }],
    }));
}

export function portableTextToString(blocks) {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => b.children?.map((c) => c.text || "").join("") || "")
    .join("\n\n");
}

async function sanityMutate(mutations) {
  const res = await fetch("/api/sanity/mutate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Sanity mutation failed");
  }
  return res.json();
}

async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/sanity/assets", { method: "POST", body: fd });
  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return data.document._id;
}

export const useNssecNewsAdminStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  isSubmitting: false,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const data = await sanityClient.fetch(ADMIN_LIST_QUERY);
      set({ posts: data || [], isLoading: false });
    } catch (err) {
      toast.error("Failed to load articles");
      set({ isLoading: false });
    }
  },

  fetchPostBody: async (id) => {
    try {
      return await sanityClient.fetch(BODY_QUERY, { id });
    } catch {
      return null;
    }
  },

  createPost: async (formData, imageFile) => {
    set({ isSubmitting: true });
    try {
      let featuredImage;
      const cloudUrl = formData.cloudinaryUrl?.trim();

      if (imageFile && !cloudUrl) {
        const assetId = await uploadImage(imageFile);
        featuredImage = { _type: "image", asset: { _type: "reference", _ref: assetId } };
      }

      const doc = {
        _type: "nssecnews",
        title: formData.title,
        slug: { _type: "slug", current: formData.slug || slugify(formData.title) },
        excerpt: formData.excerpt,
        status: formData.status || "draft",
        publishedAt: formData.publishedAt || new Date().toISOString(),
        hashtags: formData.hashtags
          ? formData.hashtags.split(",").map((h) => h.trim()).filter(Boolean)
          : [],
        featuredNews: !!formData.featuredNews,
        breakingNews: !!formData.breakingNews,
        trendingNews: !!formData.trendingNews,
        views: 0,
      };

      if (formData.summary?.trim()) doc.summary = formData.summary.trim();
      if (formData.body?.trim()) doc.body = bodyToPortableText(formData.body);
      if (featuredImage) doc.featuredImage = featuredImage;
      if (cloudUrl) doc.featuredImageCloudinaryUrl = cloudUrl;

      await sanityMutate([{ create: doc }]);
      toast.success("Article created");
      await get().fetchPosts();
      set({ isSubmitting: false });
      return { success: true };
    } catch (err) {
      toast.error(err.message || "Failed to create article");
      set({ isSubmitting: false });
      return { success: false };
    }
  },

  updatePost: async (id, formData, imageFile) => {
    set({ isSubmitting: true });
    try {
      const setFields = {
        title: formData.title,
        "slug.current": formData.slug,
        excerpt: formData.excerpt,
        status: formData.status,
        publishedAt: formData.publishedAt || new Date().toISOString(),
        hashtags: formData.hashtags
          ? formData.hashtags.split(",").map((h) => h.trim()).filter(Boolean)
          : [],
        featuredNews: !!formData.featuredNews,
        breakingNews: !!formData.breakingNews,
        trendingNews: !!formData.trendingNews,
      };

      if (formData.summary !== undefined) setFields.summary = formData.summary.trim() || null;
      if (formData.body?.trim()) setFields.body = bodyToPortableText(formData.body);

      if (imageFile) {
        const assetId = await uploadImage(imageFile);
        setFields.featuredImage = { _type: "image", asset: { _type: "reference", _ref: assetId } };
        setFields.featuredImageCloudinaryUrl = null;
      } else {
        const cloudUrl = formData.cloudinaryUrl?.trim();
        setFields.featuredImageCloudinaryUrl = cloudUrl || null;
      }

      await sanityMutate([{ patch: { id, set: setFields } }]);
      toast.success("Article updated");
      await get().fetchPosts();
      set({ isSubmitting: false });
      return { success: true };
    } catch (err) {
      toast.error(err.message || "Failed to update article");
      set({ isSubmitting: false });
      return { success: false };
    }
  },

  deletePost: async (id) => {
    try {
      await sanityMutate([{ delete: { id } }]);
      set((s) => ({ posts: s.posts.filter((p) => p._id !== id) }));
      toast.success("Article deleted");
    } catch {
      toast.error("Failed to delete article");
    }
  },
}));
