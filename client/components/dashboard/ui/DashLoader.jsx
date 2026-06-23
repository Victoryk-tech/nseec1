"use client";
import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#24c2c2]/20"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#24c2c2]"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-sm text-gray-500 tracking-wide">Loading…</p>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 8, cols = 5 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <motion.div
              key={j}
              className="h-10 bg-gray-100 rounded-lg flex-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: (i + j) * 0.07 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <motion.div
      className="h-28 bg-gray-100 rounded-2xl"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />
  );
}

export function SpinnerInline({ size = 18, color = "#24c2c2" }) {
  return (
    <motion.div
      style={{
        width: size, height: size,
        border: `2px solid ${color}30`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        display: "inline-block",
        flexShrink: 0,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function UploadProgress({ percent }) {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Uploading…</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#24c2c2] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
