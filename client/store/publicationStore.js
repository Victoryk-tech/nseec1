import { create } from "zustand";
import axios from "axios";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const publicApi = axios.create({ baseURL: BASE_URL });

const MAX_PUB_BYTES = 50 * 1024 * 1024;
const MAX_COVER_BYTES = 10 * 1024 * 1024;
const WARN_PUB_BYTES = 30 * 1024 * 1024;

// ── Public store (used by frontend pages) ─────────────────────────────────────
export const usePublicationStore = create((set, get) => ({
  publications: [],
  publication: null,
  related: [],
  pagination: null,
  isLoading: false,
  error: null,

  fetchPublications: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries({ limit: 200, ...params }).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await publicApi.get(`/publications?${query}`);
      set({ publications: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch {
      set({ isLoading: false, error: "Failed to load publications" });
    }
  },

  fetchPublication: async (slug) => {
    set({ isLoading: true, error: null, publication: null });
    try {
      const { data } = await publicApi.get(`/publications/${slug}`);
      set({ publication: data.data.publication, isLoading: false });
      return data.data.publication;
    } catch {
      set({ isLoading: false, error: "Publication not found" });
      return null;
    }
  },

  fetchRelated: async (category, slug) => {
    try {
      const { data } = await publicApi.get(`/publications?category=${category}&limit=5`);
      const items = (data.data.data || []).filter((p) => p.slug !== slug);
      set({ related: items.slice(0, 4) });
    } catch {}
  },

  trackView: async (id) => {
    try {
      const { data } = await publicApi.post(`/publications/${id}/view`);
      return data.data?.views;
    } catch {}
  },

  trackDownload: async (id) => {
    try {
      const { data } = await publicApi.post(`/publications/${id}/download`);
      return data.data?.downloadCount;
    } catch {}
  },
}));

// ── Admin store (requires auth, used by dashboard) ────────────────────────────
export const usePublicationAdminStore = create((set, get) => ({
  publications: [],
  stats: null,
  pagination: null,
  isLoading: false,
  isUploading: false,
  uploadProgress: 0,
  filters: { page: 1, limit: 20, category: "", search: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchPublications: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await publicApi.get(`/publications?${query}`);
      set({ publications: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch {
      set({ isLoading: false });
      toast.error("Failed to load publications");
    }
  },

  fetchStats: async () => {
    try {
      const { data } = await dashApi.get("/publications/stats");
      set({ stats: data.data });
    } catch {}
  },

  validateFiles: (pubFile, coverFile) => {
    if (pubFile) {
      if (pubFile.size > MAX_PUB_BYTES) {
        return { valid: false, message: `File too large. Max allowed: 50MB (current: ${(pubFile.size / (1024 * 1024)).toFixed(1)}MB)` };
      }
      if (pubFile.size > WARN_PUB_BYTES) {
        toast(`Large file (${(pubFile.size / (1024 * 1024)).toFixed(1)}MB). Upload may take a moment.`, { icon: "⚠️" });
      }
    }
    if (coverFile && coverFile.size > MAX_COVER_BYTES) {
      return { valid: false, message: `Cover image too large. Max allowed: 10MB` };
    }
    return { valid: true };
  },

  createPublication: async (formData, onProgress) => {
    set({ isUploading: true, uploadProgress: 0 });
    try {
      const { data } = await dashApi.post("/publications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / e.total);
          set({ uploadProgress: pct });
          onProgress?.(pct);
        },
      });
      set((s) => ({
        publications: [data.data.publication, ...s.publications],
        isUploading: false,
        uploadProgress: 0,
      }));
      toast.success("Publication uploaded successfully");
      return { success: true, publication: data.data.publication };
    } catch (err) {
      set({ isUploading: false, uploadProgress: 0 });
      toast.error(err.response?.data?.message || "Upload failed");
      return { success: false };
    }
  },

  updatePublication: async (id, formData, onProgress) => {
    set({ isUploading: true, uploadProgress: 0 });
    try {
      const { data } = await dashApi.patch(`/publications/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / e.total);
          set({ uploadProgress: pct });
          onProgress?.(pct);
        },
      });
      set((s) => ({
        publications: s.publications.map((p) => (p._id === id ? data.data.publication : p)),
        isUploading: false,
        uploadProgress: 0,
      }));
      toast.success("Publication updated");
      return { success: true, publication: data.data.publication };
    } catch (err) {
      set({ isUploading: false, uploadProgress: 0 });
      toast.error(err.response?.data?.message || "Update failed");
      return { success: false };
    }
  },

  deletePublication: async (id) => {
    try {
      await dashApi.delete(`/publications/${id}`);
      set((s) => ({ publications: s.publications.filter((p) => p._id !== id) }));
      toast.success("Publication deleted");
    } catch {
      toast.error("Delete failed");
    }
  },
}));
