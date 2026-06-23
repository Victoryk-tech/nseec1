import { create } from "zustand";
import axios from "axios";
import dashApi from "@/lib/dashApi";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const publicApi = axios.create({ baseURL: BASE_URL });

// ── Public store ─────────────────────────────────────────────────────────────

export const useGalleryStore = create((set, get) => ({
  albums: [],
  album: null,
  isLoading: false,
  error: null,

  fetchAlbums: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await publicApi.get("/gallery", { params: { limit: 200, ...params } });
      set({ albums: data.data?.data || [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAlbum: async (slug) => {
    set({ isLoading: true, album: null, error: null });
    try {
      const { data } = await publicApi.get(`/gallery/${slug}`);
      const album = data.data?.album || null;
      set({ album, isLoading: false });
      return album;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  trackView: async (slug) => {
    try {
      await publicApi.post(`/gallery/${slug}/view`);
    } catch {}
  },
}));

// ── Admin store ──────────────────────────────────────────────────────────────

export const useGalleryAdminStore = create((set, get) => ({
  albums: [],
  stats: null,
  isLoading: false,
  isSubmitting: false,
  uploadProgress: 0,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const { data } = await dashApi.get("/gallery", { params: { limit: 200 } });
      set({ albums: data.data?.data || [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      const { data } = await dashApi.get("/gallery/stats");
      set({ stats: data.data || {} });
    } catch {
      set({ stats: {} });
    }
  },

  createAlbum: async (formData) => {
    set({ isSubmitting: true, uploadProgress: 0, error: null });
    try {
      const { data } = await dashApi.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
          set({ uploadProgress: pct });
        },
      });
      const album = data.data?.album;
      set((s) => ({ albums: [album, ...s.albums], isSubmitting: false, uploadProgress: 0 }));
      return { success: true, album };
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      set({ error: msg, isSubmitting: false, uploadProgress: 0 });
      return { success: false, error: msg };
    }
  },

  updateAlbum: async (id, formData) => {
    set({ isSubmitting: true, uploadProgress: 0, error: null });
    try {
      const { data } = await dashApi.patch(`/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
          set({ uploadProgress: pct });
        },
      });
      const updated = data.data?.album;
      set((s) => ({
        albums: s.albums.map((a) => (a._id === id ? updated : a)),
        isSubmitting: false,
        uploadProgress: 0,
      }));
      return { success: true, album: updated };
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      set({ error: msg, isSubmitting: false, uploadProgress: 0 });
      return { success: false, error: msg };
    }
  },

  deleteAlbum: async (id) => {
    try {
      await dashApi.delete(`/gallery/${id}`);
      set((s) => ({ albums: s.albums.filter((a) => a._id !== id) }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  },

  removeImage: async (albumId, cloudinaryId) => {
    try {
      const { data } = await dashApi.delete(
        `/gallery/${albumId}/images/${encodeURIComponent(cloudinaryId)}`
      );
      const updated = data.data?.album;
      set((s) => ({ albums: s.albums.map((a) => (a._id === albumId ? updated : a)) }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  },
}));
