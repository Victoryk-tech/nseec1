"use client";
import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";

const BASE_URL = "https://nssec.gov.ng";

export default function SocialShare({ url, title, hashtags = [], compact = false }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);

  const fullUrl = url?.startsWith("http") ? url : `${BASE_URL}${url || ""}`;
  const encoded = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title || "");
  const tags = hashtags.map((h) => h.replace(/^#/, "")).join(",");

  const shareLinks = [
    {
      label: "Twitter / X",
      icon: <FaTwitter className="w-3.5 h-3.5" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}${tags ? `&hashtags=${tags}` : ""}`,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      label: "Facebook",
      icon: <FaFacebookF className="w-3.5 h-3.5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      bg: "bg-[#1877F2] hover:bg-[#1460cc]",
    },
    {
      label: "LinkedIn",
      icon: <FaLinkedinIn className="w-3.5 h-3.5" />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`,
      bg: "bg-[#0A66C2] hover:bg-[#0854a0]",
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp className="w-3.5 h-3.5" />,
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      bg: "bg-[#25D366] hover:bg-[#1da852]",
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyTitle = async () => {
    await navigator.clipboard.writeText(title || "");
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {shareLinks.map(({ label, icon, href, bg }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${label}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium transition-all ${bg}`}
        >
          {icon}
          {!compact && <span className="hidden sm:inline">{label}</span>}
        </a>
      ))}

      <button
        onClick={copyLink}
        title="Copy article link"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-all"
      >
        {copiedLink ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Link2 className="w-3.5 h-3.5" />
        )}
        {!compact && (
          <span className="hidden sm:inline">{copiedLink ? "Copied!" : "Copy link"}</span>
        )}
      </button>

      <button
        onClick={copyTitle}
        title="Copy article title"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-all"
      >
        {copiedTitle ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        {!compact && (
          <span className="hidden sm:inline">{copiedTitle ? "Copied!" : "Copy title"}</span>
        )}
      </button>
    </div>
  );
}
