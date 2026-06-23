import Image from 'next/image'
import Link from 'next/link'
import {ChevronRight, User, Calendar, Eye, Clock} from 'lucide-react'
import {formatDate, formatViews} from './utils'

export default function HeroSection({post, views, readTime}) {
  const imgSrc = post.featuredImageCloudinaryUrl || post.featuredImage?.url || post.imageUrl

  return (
    <div className="relative w-full h-[55vh] min-h-[380px] max-h-[640px] overflow-hidden bg-[#0e4f6b]">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={post.featuredImage?.alt || post.title}
          fill
          className="object-cover opacity-60"
          unoptimized
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e40] via-[#0a2e40]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#24c2c2] via-[#1a9999] to-[#24c2c2]" />

      <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 lg:px-12 pb-10 max-w-[100rem] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs text-white/50 mb-4">
          <Link href="/" className="hover:text-[#24c2c2] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media" className="hover:text-[#24c2c2] transition-colors">Media</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/media/nssec-news" className="hover:text-[#24c2c2] transition-colors">NSSEC News</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/30 truncate max-w-[180px]">{post.title}</span>
        </nav>

        {/* Category badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-[#24c2c2] text-white text-xs font-bold rounded-full uppercase tracking-widest">
            NSSEC News
          </span>
          {post.categories?.map((cat) => (
            <span
              key={cat._id}
              className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-medium rounded-full capitalize backdrop-blur-sm"
            >
              {cat.title}
            </span>
          ))}
          {post.breakingNews && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full uppercase tracking-widest animate-pulse">
              Breaking
            </span>
          )}
          {post.trendingNews && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-widest">
              Trending
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-4xl drop-shadow-lg">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          {post.author?.name && (
            <span className="flex items-center gap-1.5">
              {post.author.imageUrl || post.author.cloudinaryUrl ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#24c2c2]/50">
                  <Image
                    src={post.author.cloudinaryUrl || post.author.imageUrl}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="font-semibold text-white/80">{post.author.name}</span>
              {post.author.role && (
                <span className="text-white/40 hidden sm:inline">· {post.author.role}</span>
              )}
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            {formatViews(views)} views
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readTime} min read
          </span>
        </div>
      </div>
    </div>
  )
}
