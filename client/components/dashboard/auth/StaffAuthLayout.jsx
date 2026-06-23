"use client";
import { Shield } from "lucide-react";

export default function StaffAuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left decorative panel */}
      <div className="hidden md:flex md:w-[28%] relative bg-gradient-to-br from-[#082c2c] to-[#0e4a4a] overflow-hidden flex-shrink-0">
        <svg
          className="absolute -left-6 top-0 h-full w-full opacity-25"
          viewBox="0 0 200 700"
          fill="none"
        >
          <path
            d="M70 0C30 60 30 150 90 190C30 230 30 340 90 400C30 440 30 540 90 600"
            stroke="#24c2c2"
            strokeWidth="42"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute right-4 top-1/4 w-24 h-24 opacity-10"
          viewBox="0 0 100 100"
          fill="none"
        >
          <g stroke="#24c2c2" strokeWidth="6" strokeLinecap="round">
            <line x1="50" y1="4" x2="50" y2="96" />
            <line x1="50" y1="4" x2="50" y2="96" transform="rotate(60 50 50)" />
            <line x1="50" y1="4" x2="50" y2="96" transform="rotate(120 50 50)" />
          </g>
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-[#24c2c2]/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-8 pb-12">
          <div className="w-10 h-10 bg-[#24c2c2]/20 rounded-xl flex items-center justify-center mb-4">
            <Shield size={20} className="text-[#24c2c2]" />
          </div>
          <p className="text-white/90 font-bold text-sm">NSSEC Staff Portal</p>
          <p className="text-white/40 text-xs mt-1 leading-relaxed">
            Secure access for authorised personnel only
          </p>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 min-h-screen">
        <div className="flex items-center gap-2.5 mb-10 md:hidden">
          <div className="w-8 h-8 bg-[#082c2c] rounded-xl flex items-center justify-center">
            <Shield size={16} className="text-[#24c2c2]" />
          </div>
          <span className="text-base font-bold text-[#082c2c] tracking-tight">NSSEC Staff Portal</span>
        </div>
        {children}
      </div>
    </div>
  );
}
