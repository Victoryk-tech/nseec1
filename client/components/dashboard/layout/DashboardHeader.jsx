"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, PanelLeftClose, Bell, Check, Trash2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TYPE_ICONS = {
  LOGIN: "🔐",
  FAILED_LOGIN: "⚠️",
  PASSWORD_CHANGED: "🔑",
  USER_CREATED: "👤",
  USER_UPDATED: "✏️",
  USER_DELETED: "🗑️",
  USER_ACTIVATED: "✅",
  USER_DEACTIVATED: "🚫",
  CONTACT_RECEIVED: "📬",
  SUBSCRIBER_JOINED: "📮",
  MEDIA_UPLOADED: "🖼️",
  SYSTEM: "⚙️",
  FIRST_LOGIN_PENDING: "🔒",
};

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function DashboardHeader({ title, subtitle }) {
  const router = useRouter();
  const { toggleSidebar, collapseSidebar, sidebarCollapsed } = useUIStore();
  const { user } = useAuthStore();
  const { unreadCount, notifications, fetchNotifications, markAsRead, markAllAsRead } =
    useNotificationStore();

  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef(null);

  // Load recent notifications when dropdown opens
  useEffect(() => {
    if (bellOpen) fetchNotifications({ page: 1, limit: 6 });
  }, [bellOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotifClick = async (notif) => {
    if (!notif.isRead) await markAsRead(notif._id);
    setBellOpen(false);
    if (notif.link) router.push(notif.link);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-6 h-16 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <button
          onClick={collapseSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hidden lg:flex"
        >
          <PanelLeftClose
            size={18}
            className={`transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        {title && (
          <div>
            <h1 className="text-sm font-semibold text-gray-900 truncate">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setBellOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 relative transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {bellOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-red-100 text-red-600 font-bold rounded-full px-2 py-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-[#1da8a8] hover:text-[#24c2c2] font-medium flex items-center gap-1"
                    >
                      <Check size={12} /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center">
                      <Bell size={24} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-400">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.slice(0, 6).map((n) => (
                      <button
                        key={n._id}
                        onClick={() => handleNotifClick(n)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex gap-3 ${
                          !n.isRead ? "bg-[#f0fdfc]" : ""
                        }`}
                      >
                        <span className="text-base flex-shrink-0 mt-0.5">
                          {TYPE_ICONS[n.type] || "🔔"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-semibold truncate ${!n.isRead ? "text-[#082c2c]" : "text-gray-700"}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                        </div>
                        {!n.isRead && (
                          <div className="w-2 h-2 bg-[#24c2c2] rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </button>
                    ))
                  )}
                </div>

                <div className="border-t border-gray-100 p-3">
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setBellOpen(false)}
                    className="flex items-center justify-center gap-1.5 text-xs text-[#1da8a8] hover:text-[#24c2c2] font-medium py-1"
                  >
                    View all notifications <ExternalLink size={11} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#24c2c2]/10 border border-[#24c2c2]/30 flex items-center justify-center text-[#0e4a4a] font-semibold text-sm">
          {user?.name?.[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
