"use client";
import { motion } from "framer-motion";

export default function StatsCard({ icon: Icon, label, value, sub, trend, color = "teal", delay = 0 }) {
  const colors = {
    teal: "from-[#24c2c2]/10 to-[#24c2c2]/5 border-[#24c2c2]/20 text-[#0e4a4a]",
    green: "from-emerald-50 to-emerald-25 border-emerald-200 text-emerald-700",
    amber: "from-amber-50 to-amber-25 border-amber-200 text-amber-700",
    red: "from-red-50 to-red-25 border-red-200 text-red-700",
    blue: "from-sky-50 to-sky-25 border-sky-200 text-sky-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5 relative overflow-hidden`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1 tabular-nums">{value ?? "—"}</p>
          {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors[color]}`}>
            <Icon size={22} className="opacity-70" />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <p className={`text-xs font-medium mt-3 ${trend >= 0 ? "text-emerald-600" : "text-red-500"}`}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% this month
        </p>
      )}
    </motion.div>
  );
}
