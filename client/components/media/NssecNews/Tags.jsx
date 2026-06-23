import Link from 'next/link'
import {Tag, Hash} from 'lucide-react'

export default function Tags({tags = [], hashtags = []}) {
  if (!tags.length && !hashtags.length) return null

  return (
    <div className="border-t border-gray-100 pt-8 mt-8">
      {tags.length > 0 && (
        <div className="mb-5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            <Tag className="w-3.5 h-3.5" />
            Filed Under
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag._id}
                href={`/media/nssec-news?tag=${encodeURIComponent(tag.slug || tag.title)}`}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#24c2c2]/10 text-[#0e4f6b] border border-[#24c2c2]/20 hover:bg-[#24c2c2] hover:text-white hover:border-[#24c2c2] transition-all duration-150"
              >
                {tag.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {hashtags.length > 0 && (
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            <Hash className="w-3.5 h-3.5" />
            Hashtags
          </p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <a
                key={tag}
                href={`https://twitter.com/hashtag/${tag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#24c2c2] hover:text-[#1a9999] transition-colors font-medium"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
