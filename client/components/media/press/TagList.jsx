import Link from "next/link";
import { Tag } from "lucide-react";

export default function TagList({ tags }) {
  if (!tags?.length) return null;
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        <Tag className="w-3.5 h-3.5" />
        Filed Under
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={`/media/press-release?tag=${tag.slug || tag.title}`}
            className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#24c2c2]/10 text-[#0e4f6b] border border-[#24c2c2]/20 hover:bg-[#24c2c2] hover:text-white hover:border-[#24c2c2] transition-all duration-150"
          >
            {tag.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
