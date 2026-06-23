import { Globe, ExternalLink } from "lucide-react";
import { getFavicon, getSourceName, getSourceDomain } from "./utils";

export default function SourceCard({ post }) {
  const sourceName = getSourceName(post);
  const sourceDomain = getSourceDomain(post);
  if (!sourceName && !post.sourceUrl) return null;

  return (
    <div className="bg-white border border-[#24c2c2]/20 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#24c2c2] to-[#1a9999] px-5 py-3">
        <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" />
          Source
        </p>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          {(post.urlMetadata?.favicon || sourceDomain) && (
            <img
              src={post.urlMetadata?.favicon || getFavicon(sourceDomain)}
              alt={sourceName}
              className="w-8 h-8 rounded-lg border border-gray-100"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div>
            {sourceName && <p className="font-bold text-sm text-gray-900">{sourceName}</p>}
            {sourceDomain && <p className="text-xs text-gray-400">{sourceDomain}</p>}
          </div>
        </div>
        {post.sourceUrl && (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#24c2c2] text-white text-xs font-bold rounded-xl hover:bg-[#1a9999] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Read Full Release
          </a>
        )}
      </div>
    </div>
  );
}
