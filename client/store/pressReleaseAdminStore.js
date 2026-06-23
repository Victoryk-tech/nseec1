import { create } from "zustand";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";
import toast from "react-hot-toast";
import { bodyToPortableText, portableTextToString, slugify } from "./nssecNewsAdminStore";

const ADMIN_LIST_QUERY = groq`
  *[_type == "mediaPost" && mainCategory == "press-release"]
  | order(publishedAt desc, _createdAt desc) {
    _id, title, slug, description, summary,
    sourceUrl, sourceName, sourceDomain,
    urlMetadata { image, title, description, siteName, favicon },
    "source": source->{ name, domain },
    breaking, trending, featured,
    views, publishedAt, _createdAt, hashtags,
    "categories": categories[]->{_id, title, "slug": slug.current},
    "tags": tags[]->{_id, title, "slug": slug.current, category}
  }
`;

const BODY_QUERY = groq`*[_id == $id][0]{ content }`;

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

function buildCategoryRefs(ids = []) {
  return ids.filter(Boolean).map((id) => ({ _type: "reference", _ref: id, _key: id }));
}

function buildTagRefs(ids = []) {
  return ids.filter(Boolean).map((id) => ({ _type: "reference", _ref: id, _key: id }));
}

export const usePressReleaseAdminStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  isSubmitting: false,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const data = await sanityClient.fetch(ADMIN_LIST_QUERY);
      set({ posts: data || [], isLoading: false });
    } catch (err) {
      toast.error("Failed to load press releases");
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

  createPost: async (formData) => {
    set({ isSubmitting: true });
    try {
      const doc = {
        _type: "mediaPost",
        mainCategory: "press-release",
        title: formData.title,
        slug: { _type: "slug", current: formData.slug || slugify(formData.title) },
        description: formData.description,
        publishedAt: formData.publishedAt || new Date().toISOString(),
        hashtags: formData.hashtags
          ? formData.hashtags.split(",").map((h) => h.trim()).filter(Boolean)
          : [],
        breaking: !!formData.breaking,
        trending: !!formData.trending,
        views: 0,
      };

      if (formData.summary?.trim()) doc.summary = formData.summary.trim();
      if (formData.sourceUrl?.trim()) doc.sourceUrl = formData.sourceUrl.trim();
      if (formData.sourceName?.trim()) doc.sourceName = formData.sourceName.trim();
      if (formData.sourceDomain?.trim()) doc.sourceDomain = formData.sourceDomain.trim();
      if (formData.urlMetadata) doc.urlMetadata = formData.urlMetadata;
      if (formData.body?.trim()) doc.content = bodyToPortableText(formData.body);

      const catRefs = buildCategoryRefs(formData.categoryIds);
      if (catRefs.length) doc.categories = catRefs;

      const tagRefs = buildTagRefs(formData.tagIds);
      if (tagRefs.length) doc.tags = tagRefs;

      await sanityMutate([{ create: doc }]);
      toast.success("Press release created");
      await get().fetchPosts();
      set({ isSubmitting: false });
      return { success: true };
    } catch (err) {
      toast.error(err.message || "Failed to create press release");
      set({ isSubmitting: false });
      return { success: false };
    }
  },

  updatePost: async (id, formData) => {
    set({ isSubmitting: true });
    try {
      const setFields = {
        title: formData.title,
        "slug.current": formData.slug,
        description: formData.description,
        publishedAt: formData.publishedAt || new Date().toISOString(),
        hashtags: formData.hashtags
          ? formData.hashtags.split(",").map((h) => h.trim()).filter(Boolean)
          : [],
        breaking: !!formData.breaking,
        trending: !!formData.trending,
        summary: formData.summary?.trim() || null,
        sourceUrl: formData.sourceUrl?.trim() || null,
        sourceName: formData.sourceName?.trim() || null,
        sourceDomain: formData.sourceDomain?.trim() || null,
        urlMetadata: formData.urlMetadata || null,
        categories: buildCategoryRefs(formData.categoryIds),
        tags: buildTagRefs(formData.tagIds),
      };

      if (formData.body?.trim()) setFields.content = bodyToPortableText(formData.body);

      await sanityMutate([{ patch: { id, set: setFields } }]);
      toast.success("Press release updated");
      await get().fetchPosts();
      set({ isSubmitting: false });
      return { success: true };
    } catch (err) {
      toast.error(err.message || "Failed to update press release");
      set({ isSubmitting: false });
      return { success: false };
    }
  },

  deletePost: async (id) => {
    try {
      await sanityMutate([{ delete: { id } }]);
      set((s) => ({ posts: s.posts.filter((p) => p._id !== id) }));
      toast.success("Press release deleted");
    } catch {
      toast.error("Failed to delete press release");
    }
  },

  portableTextToString,
}));
