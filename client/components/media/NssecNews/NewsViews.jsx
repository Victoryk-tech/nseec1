import {Eye} from 'lucide-react'
import {formatViews} from './utils'

export default function NewsViews({views, className = ''}) {
  return (
    <span className={`flex items-center gap-1 text-xs text-gray-400 ${className}`}>
      <Eye className="w-3.5 h-3.5 text-[#24c2c2]" />
      {formatViews(views)} views
    </span>
  )
}
