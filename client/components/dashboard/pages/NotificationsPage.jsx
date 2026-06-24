"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Trash2, Filter, RefreshCw } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";
import DashboardHeader from "../layout/DashboardHeader";

const TYPE_ICONS = {
  LOGIN: "🔐",
  FAILED_LOGIN: "⚠️",
  PASSWORD_CHANGED: "🔑",
  FIRST_LOGIN_PENDING: "🔒",
  USER_CREATED: "👤",
  USER_UPDATED: "✏️",
  USER_DELETED: "🗑️",
  USER_ACTIVATED: "✅",
  USER_DEACTIVATED: "🚫",
  CONTACT_RECEIVED: "📬",
  SUBSCRIBER_JOINED: "📮",
  MANDE_SUBMITTED: "📋",
  MEDIA_UPLOADED: "🖼️",
  SYSTEM: "⚙️",
};

const TYPE_COLORS = {
  LOGIN: "bg-emerald-50 border-emerald-200",
  FAILED_LOGIN: "bg-red-50 border-red-200",
  PASSWORD_CHANGED: "bg-amber-50 border-amber-200",
  USER_CREATED: "bg-sky-50 border-sky-200",
  USER_DELETED: "bg-red-50 border-red-200",
  USER_ACTIVATED: "bg-emerald-50 border-emerald-200",
  USER_DEACTIVATED: "bg-orange-50 border-orange-200",
  CONTACT_RECEIVED: "bg-purple-50 border-purple-200",
  SUBSCRIBER_JOINED: "bg-teal-50 border-teal-200",
  MANDE_SUBMITTED: "bg-indigo-50 border-indigo-200",
  SYSTEM: "bg-gray-50 border-gray-200",
};

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  if (s < 604800) return `${Math.floor(s / 86400)} days ago`;
  return new Date(date).toLocaleDateString();
}

export default function NotificationsPage() {
  const {
    notifications, unreadCount, pagination, isLoading,
    filters, setFilters, fetchNotifications,
    markAsRead, markAllAsRead, deleteNotification, clearReadNotifications,
  } = useNotificationStore();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchNotifications({ page: 1, limit: 20, unread: "" });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newFilters = { page: 1, limit: 20, unread: tab === "unread" ? "true" : "" };
    setFilters(newFilters);
    fetchNotifications(newFilters);
  };

  const handlePageChange = (page) => {
    const f = { ...filters, page };
    setFilters(f);
    fetchNotifications(f);
  };

  const handleMarkRead = async (notif) => {
    if (!notif.isRead) await markAsRead(notif._id);
  };

  return (
    <div>
      <DashboardHeader title="Notifications" subtitle="Stay up to date with activity on your account" />

      <div className="p-6 space-y-5 max-w-3xl">
        {/* Tabs + actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {[
              { key: "all", label: "All" },
              { key: "unread", label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-[#082c2c] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1da8a8] border border-[#24c2c2]/30 rounded-lg hover:bg-[#24c2c2]/5 transition-colors"
              >
                <Check size={13} /> Mark all read
              </button>
            )}
            <button
              onClick={clearReadNotifications}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Trash2 size={13} /> Clear read
            </button>
            <button
              onClick={() => fetchNotifications()}
              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="space-y-0 divide-y divide-gray-50">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="px-5 py-4 flex gap-3"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1 }}
                >
                  <div className="w-9 h-9 bg-gray-100 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-20 text-center">
              <Bell size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-500">No notifications</p>
              <p className="text-xs text-gray-400 mt-1">
                {activeTab === "unread" ? "You're all caught up!" : "Nothing here yet."}
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {notifications.map((n, i) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-start gap-3 px-5 py-4 border-b border-gray-50 last:border-0 transition-colors ${
                    !n.isRead ? "bg-[#f0fdfc]/60" : "hover:bg-gray-50/50"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base flex-shrink-0 ${
                      TYPE_COLORS[n.type] || "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {TYPE_ICONS[n.type] || "🔔"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${!n.isRead ? "text-[#082c2c]" : "text-gray-700"}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                    {n.actorName && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        by <span className="font-medium">{n.actorName}</span>
                        {n.actorRole && ` · ${n.actorRole}`}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!n.isRead && (
                      <button
                        onClick={() => handleMarkRead(n)}
                        title="Mark as read"
                        className="p-1.5 text-[#1da8a8] hover:bg-[#24c2c2]/10 rounded-lg transition-colors"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n._id)}
                      title="Delete"
                      className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Unread dot */}
                  {!n.isRead && (
                    <div className="w-2 h-2 bg-[#24c2c2] rounded-full flex-shrink-0 mt-2" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-2">
              <button
                disabled={!pagination.hasPrev}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Prev
              </button>
              <button
                disabled={!pagination.hasNext}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
