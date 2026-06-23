import { create } from "zustand";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";

const LIST_QUERY = groq`*[_type == "mediaPost" && mainCategory == "nssec-news"] | order(publishedAt desc, _createdAt desc){
  _id, title, slug, description,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  mainCategory, subCategory, views, featured,
  publishedAt, _createdAt, hashtags,
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const DETAIL_QUERY = groq`*[_type == "mediaPost" && mainCategory == "nssec-news" && slug.current == $slug][0]{
  _id, title, slug, description, content,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  mainCategory, subCategory,
  "author": author->{ name, "imageUrl": image.asset->url },
  views, featured, publishedAt, _createdAt, hashtags,
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const RELATED_QUERY = groq`*[_type == "mediaPost" && mainCategory == "nssec-news" && slug.current != $slug] | order(publishedAt desc)[0...4]{
  _id, title, slug, description,
  "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
  mainCategory, subCategory, views, publishedAt, _createdAt, content
}`;

export const useNewsStore = create((set, get) => ({
  posts: [],
  post: null,
  related: [],
  isLoading: false,
  isDetailLoading: false,
  error: null,

  fetchPosts: async () => {
    if (get().posts.length > 0) return; // simple cache: don't refetch
    set({ isLoading: true, error: null });
    try {
      const data = await sanityClient.fetch(LIST_QUERY);
      set({ posts: data || [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchPost: async (slug) => {
    set({ isDetailLoading: true, post: null, related: [], error: null });
    try {
      const [postData, relatedData] = await Promise.all([
        sanityClient.fetch(DETAIL_QUERY, { slug }),
        sanityClient.fetch(RELATED_QUERY, { slug }),
      ]);
      set({ post: postData || null, related: relatedData || [], isDetailLoading: false });
      return postData;
    } catch (err) {
      set({ error: err.message, isDetailLoading: false });
      return null;
    }
  },

  clearPost: () => set({ post: null, related: [] }),
}));
