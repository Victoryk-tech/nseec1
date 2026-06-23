'use client'
import {useState} from 'react'
import {Twitter, Facebook, Linkedin, MessageSquare, Share2, Link2, Check} from 'lucide-react'

const PLATFORMS = [
  {
    key: 'twitter',
    label: 'Twitter / X',
    icon: Twitter,
    color: 'hover:bg-black hover:text-white hover:border-black',
    getUrl: (url, title, hashtags) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(',')}`,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: Facebook,
    color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    color: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
    getUrl: (url, title) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: MessageSquare,
    color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
]

export default function ShareButtons({url, title, hashtags = []}) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({title, url: fullUrl})
      } catch {}
    }
  }

  return (
    <div className="flex items-center flex-wrap gap-2">
      {PLATFORMS.map(({key, label, icon: Icon, color, getUrl}) => (
        <a
          key={key}
          href={getUrl(fullUrl, title, hashtags)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${label}`}
          className={`flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 transition-all duration-150 ${color}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}

      <button
        onClick={copyLink}
        title="Copy link"
        className={`flex items-center gap-1.5 h-9 px-3 rounded-full border text-xs font-medium transition-all duration-150 ${
          copied
            ? 'border-[#24c2c2] bg-[#24c2c2]/10 text-[#24c2c2]'
            : 'border-gray-200 text-gray-500 hover:border-[#24c2c2] hover:text-[#24c2c2]'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>

      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={nativeShare}
          title="Share"
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-all duration-150"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
