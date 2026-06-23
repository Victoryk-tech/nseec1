import { FileText, Globe, ExternalLink } from "lucide-react";
import { formatDate, getSourceName } from "./utils";

export default function OfficialReleaseBox({ post }) {
  const sourceName = getSourceName(post);

  return (
    <div className="rounded-2xl border border-[#24c2c2]/25 overflow-hidden mb-8 shadow-sm">
      <div className="bg-gradient-to-r from-[#0e4f6b] to-[#1a6b8a] px-5 py-3.5 flex items-center justify-between">
        <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          Official Press Release
        </span>
        <span className="text-white/60 text-xs">{formatDate(post.publishedAt || post._createdAt)}</span>
      </div>

      <div className="p-6 md:p-8 bg-white">
        {/* Source attribution */}
        {(post.sourceUrl || sourceName) && (
          <div className="flex items-center gap-2 mb-5 pb-5 border-b border-gray-100">
            <Globe className="w-4 h-4 text-[#24c2c2] flex-shrink-0" />
            <span className="text-sm text-gray-500">
              Originally published by{" "}
              {post.sourceUrl ? (
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0e4f6b] hover:text-[#24c2c2] transition-colors inline-flex items-center gap-1"
                >
                  {sourceName || post.sourceUrl}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="font-semibold text-[#0e4f6b]">{sourceName}</span>
              )}
            </span>
          </div>
        )}

        {/* Summary / lead paragraph */}
        {post.summary && (
          <p className="text-base text-gray-700 leading-8 mb-6">{post.summary}</p>
        )}

        {/* Read full release CTA */}
        {post.sourceUrl && (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#24c2c2] text-white text-sm font-bold rounded-xl hover:bg-[#1a9999] transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Read Full Release{sourceName ? ` on ${sourceName}` : ""}
          </a>
        )}
      </div>
    </div>
  );
}
