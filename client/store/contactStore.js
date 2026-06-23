import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// ── Public contact form store ─────────────────────────────────────────────
export const useContactFormStore = create((set, get) => ({
  name: "",
  email: "",
  subject: "",
  message: "",
  errors: {},
  status: null, // null | "loading" | "success" | "error"
  statusMessage: "",

  setField: (field, value) =>
    set((s) => ({ [field]: value, errors: { ...s.errors, [field]: "" } })),

  validate: () => {
    const { name, email, subject, message } = get();
    const errors = {};
    if (!name.trim() || name.trim().length < 2)
      errors.name = "Full name must be at least 2 characters.";
    if (!email.trim() || !EMAIL_RE.test(email.trim()))
      errors.email = "Please enter a valid email address.";
    if (!subject.trim() || subject.trim().length < 3)
      errors.subject = "Subject must be at least 3 characters.";
    if (!message.trim() || message.trim().length < 10)
      errors.message = "Message must be at least 10 characters.";
    set({ errors });
    return Object.keys(errors).length === 0;
  },

  submit: async (e) => {
    e?.preventDefault?.();
    if (!get().validate()) return;
    set({ status: "loading", statusMessage: "" });
    const { name, email, subject, message } = get();
    try {
      const res = await fetch(`${API()}/contacts/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      const msg = data?.message;

      if (res.ok) {
        set({
          status: "success",
          statusMessage: msg || "Your message has been received. We'll get back to you within 2–3 business days.",
          name: "", email: "", subject: "", message: "", errors: {},
        });
      } else if (res.status === 400) {
        set({ status: "error", statusMessage: msg || "Please check your details and try again." });
      } else if (res.status === 429) {
        set({ status: "error", statusMessage: "Too many requests. Please wait a moment and try again." });
      } else {
        set({ status: "error", statusMessage: msg || "Something went wrong. Please try again shortly." });
      }
    } catch (err) {
      console.error("[Contact form] network error:", err);
      set({ status: "error", statusMessage: "Unable to connect. Please check your internet connection." });
    }
  },

  reset: () => set({ name: "", email: "", subject: "", message: "", errors: {}, status: null, statusMessage: "" }),
}));

// ── Dashboard admin contact store ─────────────────────────────────────────
export const useContactStore = create((set, get) => ({
  contacts: [],
  selected: null,
  stats: null,
  pagination: null,
  isLoading: false,
  filters: { page: 1, limit: 20, status: "", search: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchContacts: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/contacts?${query}`);
      set({ contacts: data.data.data, pagination: data.data.pagination, isLoading: false });
    } catch {
      set({ isLoading: false });
      toast.error("Failed to load contacts");
    }
  },

  fetchContact: async (id) => {
    try {
      const { data } = await dashApi.get(`/contacts/${id}`);
      set({ selected: data.data.contact });
      set((s) => ({ contacts: s.contacts.map((c) => (c._id === id ? data.data.contact : c)) }));
    } catch {
      toast.error("Failed to load contact");
    }
  },

  fetchStats: async () => {
    try {
      const { data } = await dashApi.get("/contacts/stats");
      set({ stats: data.data });
    } catch {}
  },

  updateContact: async (id, payload) => {
    try {
      const { data } = await dashApi.patch(`/contacts/${id}`, payload);
      set((s) => ({ contacts: s.contacts.map((c) => (c._id === id ? data.data.contact : c)), selected: data.data.contact }));
      toast.success("Contact updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  },

  replyToContact: async (id, message) => {
    try {
      const { data } = await dashApi.post(`/contacts/${id}/reply`, { message });
      set((s) => ({ contacts: s.contacts.map((c) => (c._id === id ? data.data.contact : c)), selected: data.data.contact }));
      toast.success("Reply sent");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Reply failed");
      return { success: false };
    }
  },

  deleteContact: async (id) => {
    try {
      await dashApi.delete(`/contacts/${id}`);
      set((s) => ({ contacts: s.contacts.filter((c) => c._id !== id), selected: null }));
      toast.success("Contact deleted");
    } catch {
      toast.error("Delete failed");
    }
  },
}));
