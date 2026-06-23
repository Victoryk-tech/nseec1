"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-100">
      <div
        className="h-full bg-gradient-to-r from-[#24c2c2] to-[#1a9999] transition-all duration-75"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
