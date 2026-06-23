import {sanityClient} from '@/app/lib/sanityClient'
import {newsArticleSchema} from '@/app/utils/structuredData'
import {SLUG_LIST_QUERY, META_QUERY} from '@/store/nssecNewsStore'
import NssecNews from '@/components/media/NssecNews'

const BASE = 'https://nssec.gov.ng'

export async function generateStaticParams() {
  try {
    const data = await sanityClient.fetch(SLUG_LIST_QUERY)
    return data.map((d) => ({slug: d.slug}))
  } catch {
    return []
  }
}

export async function generateMetadata({params}) {
  const {slug} = await params
  try {
    const post = await sanityClient.fetch(META_QUERY, {slug})
    if (!post) throw new Error('not found')

    const title = post.seoTitle || `${post.title} | NSSEC News`
    const description = post.seoDescription || post.excerpt || ''
    const imageUrl = post.openGraphImageUrl || post.imageUrl || `${BASE}/nssec.jpeg`
    const keywords = post.seoKeywords?.length
      ? post.seoKeywords
      : ['NSSEC', 'Nigeria Education', ...(post.hashtags || [])]

    return {
      title,
      description,
      keywords,
      alternates: {canonical: `${BASE}/media/nssec-news/${slug}`},
      openGraph: {
        title: post.title,
        description,
        url: `${BASE}/media/nssec-news/${slug}`,
        type: 'article',
        publishedTime: post.publishedAt || post._createdAt,
        authors: post.author?.name ? [`${BASE}`] : undefined,
        images: [{url: imageUrl, width: 1200, height: 630, alt: post.title}],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [imageUrl],
        site: '@NSSEC_Nigeria',
        creator: '@NSSEC_Nigeria',
      },
    }
  } catch {
    return {title: 'Article not found | NSSEC'}
  }
}

export default async function NSSECNewsArticleRoute({params}) {
  const {slug} = await params

  let jsonLd = null
  try {
    const post = await sanityClient.fetch(META_QUERY, {slug})
    if (post) {
      jsonLd = newsArticleSchema({
        title: post.title,
        description: post.excerpt || post.description,
        imageUrl: post.openGraphImageUrl || post.imageUrl,
        publishedAt: post.publishedAt || post._createdAt,
        slug,
        author: post.author?.name,
        hashtags: post.hashtags || [],
      })
    }
  } catch {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      )}
      <NssecNews slug={slug} />
    </>
  )
}
