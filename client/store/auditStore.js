import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

export const useAuditStore = create((set, get) => ({
  logs: [],
  stats: null,
  pagination: null,
  isLoading: false,
  filters: { page: 1, limit: 30, action: "", resource: "", status: "", search: "", from: "", to: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchLogs: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/audit?${query}`);
      set({ logs: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch {
      set({ isLoading: false });
      toast.error("Failed to load audit logs");
    }
  },

  fetchStats: async () => {
    try {
      const { data } = await dashApi.get("/audit/stats");
      set({ stats: data.data });
    } catch {}
  },

  fetchUserActivity: async (userId, params) => {
    set({ isLoading: true });
    try {
      const query = new URLSearchParams(params || { page: 1, limit: 30 }).toString();
      const { data } = await dashApi.get(`/audit/user/${userId}?${query}`);
      set({ logs: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
