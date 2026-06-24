import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

export const useMandEStore = create((set, get) => ({
  submissions: [],
  pagination: null,
  isLoading: false,
  filters: { page: 1, limit: 20, status: "", state: "", type: "" },

  setFilters: (f) =>
    set({ filters: { ...get().filters, ...f, page: 1 } }),

  setPage: (page) =>
    set({ filters: { ...get().filters, page } }),

  fetchSubmissions: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/mande?${query}`);
      set({
        submissions: data.data.submissions ?? [],
        pagination: data.data.pagination,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  updateStatus: async (id, status, adminNotes = "") => {
    try {
      await dashApi.patch(`/mande/${id}/status`, { status, adminNotes });
      set((s) => ({
        submissions: s.submissions.map((sub) =>
          sub._id === id ? { ...sub, status, adminNotes } : sub
        ),
      }));
      toast.success("Status updated");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
      return { success: false };
    }
  },
}));
