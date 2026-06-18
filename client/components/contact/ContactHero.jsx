"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const ContactHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#24c2c2] via-[#1db8b8] to-[#168888] py-20 sm:py-28">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative orbs */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-28 -right-28 w-[520px] h-[520px] bg-white rounded-full pointer-events-none"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.07 }}
        transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
        className="absolute -bottom-44 -left-28 w-[640px] h-[640px] bg-white rounded-full pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-5 shadow-lg"
        >
          <Phone className="w-8 h-8 text-white" />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-[0.2em] mb-3"
        >
          National Senior Secondary Education Commission
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight"
        >
          Contact Us
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
          className="text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
        >
          Send us a message or reach any department directly.
          We look forward to hearing from you.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactHero;
