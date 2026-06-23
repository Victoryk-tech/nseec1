import Image from 'next/image'
import {User} from 'lucide-react'

function AuthorAvatar({author, size = 'sm'}) {
  const dim = size === 'md' ? 'w-14 h-14' : 'w-12 h-12'
  const iconDim = size === 'md' ? 'w-6 h-6' : 'w-5 h-5'
  const src = author.cloudinaryUrl || author.imageUrl

  if (src) {
    return (
      <div
        className={`relative ${dim} rounded-full overflow-hidden border-2 border-[#24c2c2]/30 flex-shrink-0`}
      >
        <Image src={src} alt={author.name} fill className="object-cover" unoptimized />
      </div>
    )
  }
  return (
    <div
      className={`${dim} rounded-full bg-[#24c2c2]/10 flex items-center justify-center flex-shrink-0 border-2 border-[#24c2c2]/30`}
    >
      <User className={`${iconDim} text-[#24c2c2]`} />
    </div>
  )
}

const Header = () => (
  <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
    <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
      <User className="w-3.5 h-3.5" />
      Written By
    </p>
  </div>
)

/**
 * variant="sidebar" — sticky card for the desktop left sidebar
 * variant="inline"  — inline block for the mobile view inside <main>
 */
export default function AuthorInfo({author, variant = 'sidebar'}) {
  if (!author) return null

  if (variant === 'sidebar') {
    return (
      <div className="sticky top-24 mt-6 bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
        <Header />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <AuthorAvatar author={author} size="sm" />
            <div>
              <p className="font-bold text-sm text-gray-900">{author.name}</p>
              {author.role && <p className="text-xs text-[#24c2c2] font-medium">{author.role}</p>}
            </div>
          </div>
          {author.bio && <p className="text-xs text-gray-500 leading-relaxed">{author.bio}</p>}
        </div>
      </div>
    )
  }

  // Inline (mobile)
  return (
    <div className="xl:hidden mt-10 mb-8 bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden">
      <Header />
      <div className="p-5 flex items-start gap-4">
        <AuthorAvatar author={author} size="md" />
        <div>
          <p className="font-bold text-gray-900">{author.name}</p>
          {author.role && <p className="text-sm text-[#24c2c2] font-medium">{author.role}</p>}
          {author.bio && (
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{author.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}
