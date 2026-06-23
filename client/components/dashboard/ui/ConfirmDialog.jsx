"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export default function ConfirmDialog() {
  const { confirmDialog, closeConfirm } = useUIStore();

  const handleConfirm = async () => {
    await confirmDialog?.onConfirm?.();
    closeConfirm();
  };

  return (
    <AnimatePresence>
      {confirmDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeConfirm}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-10"
          >
            <button onClick={closeConfirm} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 text-gray-400">
              <X size={18} />
            </button>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${confirmDialog.danger ? "bg-red-50" : "bg-amber-50"}`}>
              <AlertTriangle size={22} className={confirmDialog.danger ? "text-red-500" : "text-amber-500"} />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">{confirmDialog.title || "Are you sure?"}</h3>
            <p className="text-sm text-gray-500 mb-6">{confirmDialog.message}</p>
            <div className="flex gap-3">
              <button onClick={closeConfirm} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors ${confirmDialog.danger ? "bg-red-500 hover:bg-red-600" : "bg-[#24c2c2] hover:bg-[#1da8a8]"}`}
              >
                {confirmDialog.confirmLabel || "Confirm"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
