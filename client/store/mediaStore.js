import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

export const useMediaStore = create((set, get) => ({
  media: [],
  stats: null,
  pagination: null,
  isLoading: false,
  isUploading: false,
  uploadProgress: 0,
  filters: { page: 1, limit: 24, type: "", search: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchMedia: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/media?${query}`);
      set({ media: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch {
      set({ isLoading: false });
      toast.error("Failed to load media");
    }
  },

  fetchStats: async () => {
    try {
      const { data } = await dashApi.get("/media/stats");
      set({ stats: data.data });
    } catch {}
  },

  uploadMedia: async (formData, onProgress) => {
    set({ isUploading: true, uploadProgress: 0 });
    try {
      const { data } = await dashApi.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / e.total);
          set({ uploadProgress: pct });
          onProgress?.(pct);
        },
      });
      set((s) => ({ media: [data.data.media, ...s.media], isUploading: false, uploadProgress: 0 }));
      toast.success("File uploaded successfully");
      return { success: true, media: data.data.media };
    } catch (err) {
      set({ isUploading: false, uploadProgress: 0 });
      toast.error(err.response?.data?.message || "Upload failed");
      return { success: false };
    }
  },

  updateMedia: async (id, payload) => {
    try {
      const { data } = await dashApi.patch(`/media/${id}`, payload);
      set((s) => ({ media: s.media.map((m) => (m._id === id ? data.data.media : m)) }));
      toast.success("Updated");
      return { success: true };
    } catch {
      toast.error("Update failed");
      return { success: false };
    }
  },

  deleteMedia: async (id) => {
    try {
      await dashApi.delete(`/media/${id}`);
      set((s) => ({ media: s.media.filter((m) => m._id !== id) }));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  },
}));
