import Link from 'next/link'
import Image from 'next/image'
import {BookOpen, TrendingUp, ChevronRight} from 'lucide-react'
import NewsMeta from './NewsMeta'
import {formatDate, CATEGORY_COLORS, getCategoryLabel} from './utils'

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

export default function NewsSidebar({related = [], views, readTime, publishedAt}) {
  return (
    <aside className="hidden xl:block xl:w-72 flex-shrink-0 space-y-6">
      {/* NSSEC brand badge */}
      <div className="bg-gradient-to-br from-[#0e4f6b] to-[#1a6b8a] rounded-2xl p-5 text-center text-white">
        <div className="w-10 h-10 rounded-full bg-[#24c2c2]/20 flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-5 h-5 text-[#24c2c2]" />
        </div>
        <p className="font-playfair text-lg font-bold mb-1">NSSEC News</p>
        <p className="text-xs text-white/60 leading-relaxed">
          Official news, press releases, and announcements from the National Senior Secondary
          Education Commission.
        </p>
        <Link
          href="/media/nssec-news"
          className="mt-4 inline-block px-5 py-2 bg-[#24c2c2] text-white text-xs font-bold rounded-full uppercase tracking-wide hover:bg-[#1a9999] transition-colors"
        >
          Browse All News
        </Link>
      </div>

      {/* Article stats */}
      <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
          <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Article Stats
          </p>
        </div>
        <div className="p-4">
          <NewsMeta views={views} readTime={readTime} publishedAt={publishedAt} />
        </div>
      </div>

      {/* More stories */}
      {related.length > 0 && (
        <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
            <p className="text-white text-xs font-bold uppercase tracking-widest">More Stories</p>
          </div>
          <div className="divide-y divide-gray-50">
            {related.slice(0, 4).map((p) => {
              const primaryCategory = p.categories?.[0] || p.category
              return (
                <Link
                  key={p._id}
                  href={`/media/nssec-news/${p.slug?.current}`}
                  className="flex gap-3 p-4 hover:bg-[#24c2c2]/5 transition-colors group"
                >
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    {p.imageUrl && (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {primaryCategory && <CategoryBadge category={primaryCategory} />}
                    <p className="mt-1 text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#24c2c2] transition-colors">
                      {p.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">{formatDate(p.publishedAt)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="p-4 border-t border-gray-50">
            <Link
              href="/media/nssec-news"
              className="flex items-center justify-center gap-1 text-xs font-semibold text-[#24c2c2] hover:text-[#1a9999] transition-colors"
            >
              View all news
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </aside>
  )
}
