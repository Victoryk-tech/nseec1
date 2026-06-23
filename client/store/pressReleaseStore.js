import { create } from "zustand";
import { sanityClient } from "@/app/lib/sanityClient";
import { groq } from "next-sanity";

const LIST_QUERY = groq`*[_type == "mediaPost" && mainCategory == "press-release"] | order(publishedAt desc, _createdAt desc){
  _id, title, slug, description, summary,
  sourceUrl, sourceName, sourceDomain,
  urlMetadata { image, title, description, siteName, favicon },
  "source": source->{ name, domain, favicon, website },
  mainCategory, featured, breaking, trending,
  views, publishedAt, _createdAt, hashtags,
  "categories": categories[]->{_id, title, "slug": slug.current},
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const DETAIL_QUERY = groq`*[_type == "mediaPost" && mainCategory == "press-release" && slug.current == $slug][0]{
  _id, title, slug, description, summary,
  sourceUrl, sourceName, sourceDomain,
  urlMetadata { image, title, description, siteName, favicon },
  "source": source->{ name, domain, favicon, website },
  mainCategory, featured, breaking, trending,
  "author": author->{ name },
  views, publishedAt, _createdAt, hashtags,
  "categories": categories[]->{_id, title, "slug": slug.current},
  "tags": tags[]->{_id, title, "slug": slug.current, category}
}`;

const RELATED_QUERY = groq`*[_type == "mediaPost" && mainCategory == "press-release" && slug.current != $slug] | order(publishedAt desc)[0...6]{
  _id, title, slug, description, publishedAt, _createdAt,
  sourceUrl, sourceName, sourceDomain,
  urlMetadata { image, favicon },
  "source": source->{ name, domain },
  mainCategory, hashtags, breaking, trending,
  "categories": categories[]->{_id, title, "slug": slug.current},
  "tags": tags[]->{_id, title, "slug": slug.current}
}`;

export const usePressReleaseStore = create((set, get) => ({
  posts: [],
  post: null,
  related: [],
  isLoading: false,
  isDetailLoading: false,
  error: null,

  fetchPosts: async () => {
    if (get().posts.length > 0) return;
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
