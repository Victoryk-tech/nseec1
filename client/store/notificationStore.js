import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

let pollTimer = null;

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  pagination: null,
  isLoading: false,
  filters: { page: 1, limit: 20, unread: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchNotifications: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/notifications?${query}`);
      set({
        notifications: data.data.data,
        pagination: data.data.pagination,
        unreadCount: data.data.unreadCount,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const { data } = await dashApi.get("/notifications/unread-count");
      set({ unreadCount: data.data.count });
    } catch {
      // Silent — polling failure shouldn't toast
    }
  },

  markAsRead: async (id) => {
    try {
      await dashApi.patch(`/notifications/${id}/read`);
      set((s) => ({
        notifications: s.notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, s.unreadCount - 1),
      }));
    } catch {}
  },

  markAllAsRead: async () => {
    try {
      await dashApi.patch("/notifications/read-all");
      set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark notifications as read");
    }
  },

  deleteNotification: async (id) => {
    try {
      await dashApi.delete(`/notifications/${id}`);
      set((s) => {
        const removed = s.notifications.find((n) => n._id === id);
        return {
          notifications: s.notifications.filter((n) => n._id !== id),
          unreadCount: removed && !removed.isRead
            ? Math.max(0, s.unreadCount - 1)
            : s.unreadCount,
        };
      });
    } catch {
      toast.error("Failed to delete notification");
    }
  },

  clearReadNotifications: async () => {
    try {
      await dashApi.delete("/notifications/clear-read");
      set((s) => ({
        notifications: s.notifications.filter((n) => !n.isRead),
      }));
      toast.success("Read notifications cleared");
    } catch {
      toast.error("Failed to clear notifications");
    }
  },

  startPolling: () => {
    if (pollTimer) return;
    get().fetchUnreadCount();
    pollTimer = setInterval(() => {
      get().fetchUnreadCount();
    }, 30_000);
  },

  stopPolling: () => {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  },
}));
