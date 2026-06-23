"use client";
import { useState } from "react";
import { Twitter, Facebook, Linkedin, MessageSquare, Link2, Check, Share2 } from "lucide-react";

const PLATFORMS = [
  {
    key: "twitter",
    label: "Twitter / X",
    Icon: Twitter,
    color: "hover:bg-black hover:text-white hover:border-black",
    url: (u, t, h) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}&hashtags=${(h || []).join(",")}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: Facebook,
    color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    Icon: Linkedin,
    color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    url: (u, t) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    Icon: MessageSquare,
    color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    url: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  },
];

export default function PressReleaseShareBar({ pageUrl, title, hashtags }) {
  const [copied, setCopied] = useState(false);
  const fullUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pageUrl}` : pageUrl;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PLATFORMS.map(({ key, label, Icon, color, url }) => (
        <a
          key={key}
          href={url(fullUrl, title, hashtags)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${label}`}
          className={`flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 transition-all duration-150 ${color}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copy}
        className={`flex items-center gap-1.5 h-9 px-3 rounded-full border text-xs font-semibold transition-all duration-150 ${
          copied
            ? "border-[#24c2c2] bg-[#24c2c2]/10 text-[#24c2c2]"
            : "border-gray-200 text-gray-500 hover:border-[#24c2c2] hover:text-[#24c2c2]"
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
      {typeof navigator !== "undefined" && navigator.share && (
        <button
          onClick={() => navigator.share({ title, url: fullUrl }).catch(() => {})}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-all duration-150"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
