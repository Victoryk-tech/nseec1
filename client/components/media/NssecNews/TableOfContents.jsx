'use client'
import {useEffect, useState} from 'react'
import {BookOpen} from 'lucide-react'

function useActiveHeading(headings) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      {rootMargin: '-20% 0% -75% 0%', threshold: 0},
    )
    headings.forEach(({id}) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  return activeId
}

/**
 * variant="desktop" — sticky card, shown only on xl+ (place inside the left aside)
 * variant="mobile"  — collapsible <details>, shown only on <xl (place inside main)
 */
export default function TableOfContents({headings, variant = 'desktop'}) {
  const activeId = useActiveHeading(headings)

  if (!headings.length) return null

  if (variant === 'mobile') {
    return (
      <details className="xl:hidden mb-8 border border-[#24c2c2]/20 rounded-2xl overflow-hidden">
        <summary className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3 text-white text-xs font-bold uppercase tracking-widest cursor-pointer list-none flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5" />
          On This Page
        </summary>
        <nav className="px-4 py-3 space-y-1 bg-white">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.currentTarget.closest('details')?.removeAttribute('open')
              }}
              className={`block text-sm py-1.5 transition-colors ${
                h.level === 'h3' ? 'pl-4 text-gray-400' : 'text-gray-500'
              } hover:text-[#24c2c2]`}
            >
              {h.level === 'h3' ? '— ' : ''}{h.text}
            </a>
          ))}
        </nav>
      </details>
    )
  }

  // Desktop sticky
  return (
    <div className="sticky top-24">
      <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
          <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            On This Page
          </p>
        </div>
        <nav className="px-4 py-4 space-y-1">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-sm py-1.5 px-2 rounded-lg transition-all duration-150 border-l-2 ${
                activeId === h.id
                  ? 'border-[#24c2c2] text-[#24c2c2] bg-[#24c2c2]/5 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-[#0e4f6b] hover:border-[#24c2c2]/40 hover:bg-[#24c2c2]/5'
              } ${h.level === 'h3' ? 'pl-5' : ''}`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
