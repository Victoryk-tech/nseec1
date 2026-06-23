import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

export const useSubscriberStore = create((set, get) => ({
  subscribers: [],
  stats: null,
  pagination: null,
  isLoading: false,
  isStatsLoading: false,
  filters: { page: 1, limit: 20, status: "", search: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchSubscribers: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/subscribers?${query}`);
      set({ subscribers: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      toast.error(err.response?.data?.message || "Failed to load subscribers");
    }
  },

  fetchStats: async () => {
    set({ isStatsLoading: true });
    try {
      const { data } = await dashApi.get("/subscribers/stats");
      set({ stats: data.data, isStatsLoading: false });
    } catch {
      set({ isStatsLoading: false });
    }
  },

  addSubscriber: async (payload) => {
    try {
      const { data } = await dashApi.post("/subscribers", payload);
      toast.success("Subscriber added");
      await get().fetchSubscribers();
      return { success: true, subscriber: data.data.subscriber };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add subscriber");
      return { success: false };
    }
  },

  updateSubscriber: async (id, payload) => {
    try {
      const { data } = await dashApi.patch(`/subscribers/${id}`, payload);
      set((s) => ({ subscribers: s.subscribers.map((x) => (x._id === id ? data.data.subscriber : x)) }));
      toast.success("Subscriber updated");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return { success: false };
    }
  },

  deleteSubscriber: async (id) => {
    try {
      await dashApi.delete(`/subscribers/${id}`);
      set((s) => ({ subscribers: s.subscribers.filter((x) => x._id !== id) }));
      toast.success("Subscriber deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  },

  exportSubscribers: async (status) => {
    try {
      const { data } = await dashApi.get(`/subscribers/export${status ? `?status=${status}` : ""}`, { responseType: "blob" });
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subscribers.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Export failed");
    }
  },

  publicSubscribe: async ({ name, email }) => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    try {
      const res = await fetch(`${API}/subscribers/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: "website" }),
      });
      const data = await res.json();
      if (res.ok) return { success: true, message: data.message || "You're subscribed! Check your inbox." };
      if (res.status === 400) return { success: false, message: data.message || "Please check your details and try again." };
      if (res.status === 429) return { success: false, message: "Too many requests. Please wait a moment and try again." };
      return { success: false, message: data.message || "Something went wrong. Please try again shortly." };
    } catch {
      return { success: false, message: "Unable to connect. Please check your internet connection." };
    }
  },
}));
