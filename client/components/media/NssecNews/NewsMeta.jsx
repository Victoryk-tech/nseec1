import {Eye, Clock, Calendar} from 'lucide-react'
import {formatViews} from './utils'

export default function NewsMeta({views, readTime, publishedAt}) {
  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-NG', {day: 'numeric', month: 'short'})
    : '—'

  const stats = [
    {icon: Eye, label: 'Views', value: formatViews(views)},
    {icon: Clock, label: 'Read time', value: `${readTime}m`},
    {icon: Calendar, label: 'Published', value: dateStr},
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({icon: Icon, label, value}) => (
        <div key={label} className="text-center">
          <Icon className="w-4 h-4 text-[#24c2c2] mx-auto mb-1" />
          <p className="text-base font-bold text-[#0e4f6b]">{value}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
        </div>
      ))}
    </div>
  )
}
