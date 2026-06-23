import Link from 'next/link'
import Image from 'next/image'
import {ChevronRight, Calendar, Eye} from 'lucide-react'
import {formatDate, formatViews, CATEGORY_COLORS, getCategoryLabel} from './utils'

function CategoryBadge({category}) {
  const label = getCategoryLabel(category)
  const col = CATEGORY_COLORS[label] || CATEGORY_COLORS.default
  return (
    <span
      className={`${col.bg} ${col.text} text-[10px] px-2 py-0.5 font-semibold rounded-full uppercase tracking-widest`}
    >
      {label}
    </span>
  )
}

function RelatedCard({post}) {
  const primaryCategory = post.categories?.[0] || post.category
  const imgSrc = post.imageUrl

  return (
    <Link
      href={`/media/nssec-news/${post.slug?.current}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#24c2c2]/40 hover:shadow-lg transition-all duration-200"
    >
      <div className="relative w-full h-44 overflow-hidden bg-gray-100">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#24c2c2]/20 to-[#0e4f6b]/20 flex items-center justify-center">
            <span className="text-[#24c2c2] text-4xl font-bold opacity-30">N</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {primaryCategory && (
          <div className="absolute top-3 left-3">
            <CategoryBadge category={primaryCategory} />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-playfair text-base font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#24c2c2] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">
          {post.excerpt || post.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {formatViews(post.views)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function RelatedNews({related = []}) {
  if (!related.length) return null

  return (
    <section className="border-t border-gray-100 bg-gray-50/50 px-4 sm:px-6 lg:px-12 py-14">
      <div className="max-w-[100rem] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-[#24c2c2] uppercase tracking-widest mb-1">
              Keep Reading
            </p>
            <h2 className="font-playfair text-3xl font-bold text-[#0e4f6b]">More NSSEC News</h2>
          </div>
          <Link
            href="/media/nssec-news"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#24c2c2] hover:text-[#1a9999] transition-colors"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <RelatedCard key={p._id} post={p} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/media/nssec-news"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#24c2c2]"
          >
            View all news
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
