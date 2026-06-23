const COLORS = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  teal: "bg-[#24c2c2]/10 text-[#0e4a4a] border-[#24c2c2]/30",
  gray: "bg-gray-50 text-gray-600 border-gray-200",
};

const STATUS_MAP = {
  active: "success", unsubscribed: "gray", bounced: "danger", pending: "warning",
  new: "teal", read: "info", replied: "success", archived: "gray",
  superAdmin: "teal", admin: "info", editor: "warning", viewer: "gray",
  success: "success", failure: "danger",
  high: "danger", medium: "warning", low: "success",
};

export default function Badge({ label, variant, dot = false }) {
  const v = variant || STATUS_MAP[label?.toLowerCase()] || "gray";
  const cls = COLORS[v] || COLORS.gray;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {label}
    </span>
  );
}
