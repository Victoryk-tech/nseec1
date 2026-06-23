"use client";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import DashboardSidebar from "./DashboardSidebar";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function DashboardLayout({ children }) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex-1 min-w-0"
      >
        {children}
      </motion.main>
      <ConfirmDialog />
    </div>
  );
}
