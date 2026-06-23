import {create} from 'zustand'
import {sanityClient} from '@/app/lib/sanityClient'
import {groq} from 'next-sanity'

// ── GROQ Fragments ────────────────────────────────────────────────────────────

const AUTHOR_PROJECTION = `
  "author": author->{
    name, role, bio,
    "imageUrl": coalesce(cloudinaryUrl, image.asset->url)
  }`

const CATEGORIES_PROJECTION = `
  "categories": categories[]->{_id, title, "slug": slug.current}`

const TAGS_PROJECTION = `
  "tags": tags[]->{_id, title, "slug": slug.current}`

const IMAGE_URL = `
  "imageUrl": coalesce(featuredImageCloudinaryUrl, featuredImage.asset->url)`

// ── Queries ───────────────────────────────────────────────────────────────────

export const LIST_QUERY = groq`
  *[_type == "nssecnews" && status == "published"]
  | order(publishedAt desc, _createdAt desc){
    _id, title, slug, excerpt, publishedAt, _createdAt,
    ${IMAGE_URL},
    views, featuredNews, breakingNews, trendingNews, hashtags, readingTime,
    ${CATEGORIES_PROJECTION},
    ${TAGS_PROJECTION}
  }`

export const DETAIL_QUERY = groq`
  *[_type == "nssecnews" && slug.current == $slug][0]{
    _id, title, slug, excerpt, summary, body,
    ${IMAGE_URL},
    featuredMediaType, featuredImageCloudinaryUrl,
    "featuredImage": featuredImage{ ..., "url": asset->url },
    "featuredVideo": featuredVideo{ url, provider, thumbnail, caption },
    "gallery": gallery[]{
      mediaType, cloudinaryUrl, videoUrl, caption, alt,
      "image": image{ ..., "url": asset->url }
    },
    ${AUTHOR_PROJECTION},
    ${CATEGORIES_PROJECTION},
    ${TAGS_PROJECTION},
    hashtags, views, likes, shares, readingTime,
    featuredNews, breakingNews, trendingNews,
    publishedAt, _createdAt, _updatedAt,
    seoTitle, seoDescription, seoKeywords,
    "openGraphImageUrl": coalesce(openGraphImageCloudinaryUrl, openGraphImage.asset->url)
  }`

export const RELATED_QUERY = groq`
  *[_type == "nssecnews" && status == "published" && slug.current != $slug]
  | order(publishedAt desc)[0...4]{
    _id, title, slug, excerpt, publishedAt,
    ${IMAGE_URL},
    views, readingTime,
    ${CATEGORIES_PROJECTION}
  }`

export const BY_CATEGORY_QUERY = groq`
  *[_type == "nssecnews" && status == "published"
    && $categorySlug in categories[]->slug.current]
  | order(publishedAt desc){
    _id, title, slug, excerpt, publishedAt,
    ${IMAGE_URL},
    views, readingTime,
    ${CATEGORIES_PROJECTION}
  }`

export const BY_TAG_QUERY = groq`
  *[_type == "nssecnews" && status == "published"
    && $tagSlug in tags[]->slug.current]
  | order(publishedAt desc){
    _id, title, slug, excerpt, publishedAt,
    ${IMAGE_URL},
    views, readingTime,
    ${TAGS_PROJECTION}
  }`

export const SLUG_LIST_QUERY = groq`
  *[_type == "nssecnews" && defined(slug.current)]{ "slug": slug.current }`

export const META_QUERY = groq`
  *[_type == "nssecnews" && slug.current == $slug][0]{
    title, excerpt, publishedAt, _createdAt, hashtags,
    ${IMAGE_URL},
    ${AUTHOR_PROJECTION},
    seoTitle, seoDescription, seoKeywords,
    "openGraphImageUrl": coalesce(openGraphImageCloudinaryUrl, openGraphImage.asset->url)
  }`

// ── Store ─────────────────────────────────────────────────────────────────────

export const useNssecNewsStore = create((set, get) => ({
  posts: [],
  post: null,
  related: [],
  isLoading: false,
  isDetailLoading: false,
  error: null,

  fetchPosts: async () => {
    if (get().posts.length > 0) return
    set({isLoading: true, error: null})
    try {
      const data = await sanityClient.fetch(LIST_QUERY)
      set({posts: data || [], isLoading: false})
    } catch (err) {
      set({error: err.message, isLoading: false})
    }
  },

  fetchPost: async (slug) => {
    set({isDetailLoading: true, post: null, related: [], error: null})
    try {
      const [postData, relatedData] = await Promise.all([
        sanityClient.fetch(DETAIL_QUERY, {slug}),
        sanityClient.fetch(RELATED_QUERY, {slug}),
      ])
      set({post: postData || null, related: relatedData || [], isDetailLoading: false})
      return postData
    } catch (err) {
      set({error: err.message, isDetailLoading: false})
      return null
    }
  },

  fetchByCategory: async (categorySlug) => {
    set({isLoading: true, error: null})
    try {
      const data = await sanityClient.fetch(BY_CATEGORY_QUERY, {categorySlug})
      set({posts: data || [], isLoading: false})
    } catch (err) {
      set({error: err.message, isLoading: false})
    }
  },

  fetchByTag: async (tagSlug) => {
    set({isLoading: true, error: null})
    try {
      const data = await sanityClient.fetch(BY_TAG_QUERY, {tagSlug})
      set({posts: data || [], isLoading: false})
    } catch (err) {
      set({error: err.message, isLoading: false})
    }
  },

  clearPost: () => set({post: null, related: []}),
  clearPosts: () => set({posts: []}),
}))
