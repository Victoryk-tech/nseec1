"use client";
import { motion } from "framer-motion";
import { CheckCircle, RefreshCw, Mail } from "lucide-react";

export default function SuccessScreen({ successId, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Icon with ripple rings */}
      <div className="relative mb-8">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 1.8 + i * 0.4, opacity: 0 }}
            transition={{ delay: 0.3 + i * 0.18, duration: 1.1, repeat: Infinity, repeatDelay: 2.5 }}
            className="absolute inset-0 rounded-full border-2 border-[#24c2c2]/25"
          />
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
          className="relative w-24 h-24 rounded-full bg-[#24c2c2]/10 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 16 }}
          >
            <CheckCircle className="w-12 h-12 text-[#24c2c2]" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="font-playfair text-3xl font-bold text-[#0e4f6b] mb-3">Submission Received!</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed text-sm">
          Your M&amp;E instrument has been submitted successfully to NSSEC DEQA. A confirmation email will be sent if you provided your school email address.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-gradient-to-r from-[#24c2c2]/10 to-[#0e4f6b]/10 border border-[#24c2c2]/20 rounded-2xl px-8 py-5 mb-8 w-full max-w-xs"
      >
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Submission ID</p>
        <p className="font-mono text-base font-bold text-[#0e4f6b] break-all">{successId}</p>
        <p className="text-[11px] text-gray-400 mt-1.5">Save this reference number for your records</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#24c2c2] text-[#24c2c2] text-sm font-bold rounded-xl hover:bg-[#24c2c2]/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Submit Another Form
        </motion.button>
        <motion.a
          href="mailto:deqa@nssec.gov.ng"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0e4f6b] text-white text-sm font-bold rounded-xl hover:bg-[#0a3d57] transition-colors"
        >
          <Mail className="w-4 h-4" />
          Contact DEQA
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
