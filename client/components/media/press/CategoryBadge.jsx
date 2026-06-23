export default function CategoryBadge({ title, variant = "hero" }) {
  if (!title) return null;
  if (variant === "hero") {
    return (
      <span className="px-3 py-1 bg-white/10 border border-white/20 text-white/80 text-[10px] font-medium rounded-full backdrop-blur-sm">
        {title}
      </span>
    );
  }
  return (
    <span className="px-2.5 py-0.5 bg-[#24c2c2]/10 text-[#0e4f6b] text-[10px] font-bold uppercase tracking-widest rounded-full">
      {title}
    </span>
  );
}
