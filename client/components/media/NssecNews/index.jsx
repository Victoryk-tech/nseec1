'use client'
import {useEffect, useMemo, useState} from 'react'
import Link from 'next/link'
import {ArrowLeft, Bookmark, BookOpen, TrendingUp} from 'lucide-react'
import {useNssecNewsStore} from '@/store/nssecNewsStore'
import ReadingProgress from './ReadingProgress'
import BackToTop from './BackToTop'
import HeroSection from './HeroSection'
import ArticleContent from './ArticleContent'
import AuthorInfo from './AuthorInfo'
import Tags from './Tags'
import ShareButtons from './ShareButtons'
import RelatedNews from './RelatedNews'
import NewsSidebar from './NewsSidebar'
import TableOfContents from './TableOfContents'
import ArticleSkeleton from './ArticleSkeleton'
import {calcReadTime, extractHeadings, formatViews} from './utils'

export default function NssecNews({slug}) {
  const {fetchPost, post, related, isDetailLoading, clearPost} = useNssecNewsStore()
  const [views, setViews] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (!slug) return
    clearPost()
    fetchPost(slug)
  }, [slug, fetchPost, clearPost])

  useEffect(() => {
    if (post) setViews(post.views || 0)
  }, [post])

  // Increment view count once per session
  useEffect(() => {
    if (!slug) return
    const key = `nssec_viewed_${slug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    fetch(`/api/views/${slug}?type=nssecnews`, {method: 'POST'})
      .then((r) => r.json())
      .then((d) => {
        const v = d?.results?.[0]?.document?.views
        if (v !== undefined) setViews(v)
      })
      .catch(() => {})
  }, [slug])

  const body = post?.body || post?.content
  const readTime = useMemo(
    () => post?.readingTime || calcReadTime(body),
    [post?.readingTime, body],
  )
  const headings = useMemo(() => extractHeadings(body), [body])
  const pageUrl = `/media/nssec-news/${slug}`

  if (isDetailLoading) return <ArticleSkeleton />

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-full bg-[#24c2c2]/10 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-[#24c2c2]" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-gray-700 mb-2">Article Not Found</h2>
        <p className="text-gray-400 mb-6">This article may have been moved or removed.</p>
        <Link
          href="/media/nssec-news"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#24c2c2] text-white rounded-full text-sm font-medium hover:bg-[#1a9999] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to NSSEC News
        </Link>
      </div>
    )
  }

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <article >
        {/* Hero — full-width cover image with overlaid title + meta */}
        <HeroSection post={post} views={views} readTime={readTime} />

        <div className="px-4 sm:px-6 lg:px-12 py-10">
          <div className="flex flex-col xl:flex-row gap-10 max-w-[100rem] mx-auto">

            {/* ── LEFT SIDEBAR (desktop) ── */}
            <aside className="hidden xl:block xl:w-64 flex-shrink-0">
              <TableOfContents headings={headings} variant="desktop" />
              <AuthorInfo author={post.author} variant="sidebar" />
            </aside>

            {/* ── ARTICLE BODY ── */}
            <main className="flex-1 min-w-0 max-w-3xl mx-auto xl:mx-0">
              {/* Lead / summary paragraph */}
              {(post.summary || post.excerpt || post.description) && (
                <p className="text-xl text-[#1a6b8a] leading-relaxed mb-8 font-medium border-l-4 border-[#24c2c2] pl-5 py-1 bg-[#24c2c2]/5 rounded-r-xl">
                  {post.summary || post.excerpt || post.description}
                </p>
              )}

              {/* Top share + bookmark bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 mb-8">
                <ShareButtons url={pageUrl} title={post.title} hashtags={post.hashtags || []} />
                <button
                  onClick={() => setBookmarked((b) => !b)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 h-9 rounded-full border transition-all duration-150 ${
                    bookmarked
                      ? 'border-[#24c2c2] bg-[#24c2c2]/10 text-[#24c2c2]'
                      : 'border-gray-200 text-gray-400 hover:border-[#24c2c2] hover:text-[#24c2c2]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#24c2c2]' : ''}`} />
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* Mobile TOC (inside main, hidden on xl) */}
              <TableOfContents headings={headings} variant="mobile" />

              {/* Article body */}
              <ArticleContent body={body} />

              {/* Author card — mobile only */}
              <AuthorInfo author={post.author} variant="inline" />

              {/* Tags + hashtags */}
              <Tags tags={post.tags || []} hashtags={post.hashtags || []} />

              {/* Bottom share bar */}
              <div className="border-t border-gray-100 pt-6 mt-8">
                <p className="text-sm font-semibold text-gray-500 mb-3">Share this article</p>
                <ShareButtons url={pageUrl} title={post.title} hashtags={post.hashtags || []} />
              </div>

              {/* Footer row */}
              <div className="mt-8 flex items-center justify-between">
                <Link
                  href="/media/nssec-news"
                  className="inline-flex items-center gap-2 text-sm text-[#24c2c2] hover:text-[#1a9999] font-semibold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All News
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <TrendingUp className="w-3.5 h-3.5 text-[#24c2c2]" />
                  {formatViews(views)} total views
                </div>
              </div>
            </main>

            {/* ── RIGHT SIDEBAR (desktop) ── */}
            <NewsSidebar
              related={related}
              views={views}
              readTime={readTime}
              publishedAt={post.publishedAt}
            />
          </div>
        </div>

        {/* Full-width related articles grid */}
        <RelatedNews related={related} />
      </article>

      <style jsx global>{`
        .nssec-article-body h2,
        .nssec-article-body h3,
        .nssec-article-body h4 {
          scroll-margin-top: 6rem;
        }
      `}</style>
    </>
  )
}
