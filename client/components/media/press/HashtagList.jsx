import { Hash } from "lucide-react";

export default function HashtagList({ hashtags }) {
  if (!hashtags?.length) return null;
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        <Hash className="w-3.5 h-3.5" />
        Hashtags
      </p>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((h) => (
          <a
            key={h}
            href={`https://twitter.com/hashtag/${h}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#24c2c2] hover:text-[#1a9999] transition-colors font-medium"
          >
            #{h}
          </a>
        ))}
      </div>
    </div>
  );
}
