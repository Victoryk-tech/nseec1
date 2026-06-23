export function calcReadTime(content) {
  if (!content || !Array.isArray(content)) return 1
  const words = content
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children?.map((c) => c.text || '') || [])
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatViews(n) {
  if (!n) return '0'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function extractHeadings(content) {
  if (!content || !Array.isArray(content)) return []
  return content
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => ({
      id: b._key,
      text: b.children?.map((c) => c.text).join('') || '',
      level: b.style,
    }))
}

export const CATEGORY_COLORS = {
  Innovation: {bg: 'bg-[#24c2c2]', text: 'text-white'},
  Events: {bg: 'bg-[#1a6b8a]', text: 'text-white'},
  Scholarships: {bg: 'bg-[#0e4f6b]', text: 'text-white'},
  Partnerships: {bg: 'bg-[#1a9999]', text: 'text-white'},
  Announcements: {bg: 'bg-[#24c2c2]/80', text: 'text-white'},
  default: {bg: 'bg-[#24c2c2]/10', text: 'text-[#0e4f6b]'},
}

export function getCategoryLabel(category) {
  if (!category) return ''
  return typeof category === 'string' ? category : category?.title || ''
}
