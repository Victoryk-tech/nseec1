import { create } from "zustand";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

export const useStaffStore = create((set, get) => ({
  staff: [],
  selected: null,
  pagination: null,
  isLoading: false,
  isSubmitting: false,
  filters: { page: 1, limit: 15, role: "", isActive: "", search: "" },

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  fetchStaff: async (params) => {
    set({ isLoading: true });
    try {
      const p = params || get().filters;
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(p).filter(([, v]) => v !== ""))
      ).toString();
      const { data } = await dashApi.get(`/users?${query}`);
      set({
        staff: data.data.data,
        pagination: data.data.pagination,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      toast.error(err.response?.data?.message || "Failed to load staff");
    }
  },

  fetchStaffMember: async (id) => {
    try {
      const { data } = await dashApi.get(`/users/${id}`);
      set({ selected: data.data.user });
      return data.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load staff member");
      return null;
    }
  },

  createStaff: async (formData) => {
    set({ isSubmitting: true });
    try {
      const { data } = await dashApi.post("/users", formData);
      // Refresh the list
      await get().fetchStaff();
      set({ isSubmitting: false });
      toast.success(`Staff account created. Credentials sent to ${formData.email}`);
      return { success: true, user: data.data.user };
    } catch (err) {
      set({ isSubmitting: false });
      const msg = err.response?.data?.message || "Failed to create staff member";
      toast.error(msg);
      return { success: false, message: msg };
    }
  },

  updateStaff: async (id, updates) => {
    set({ isSubmitting: true });
    try {
      const { data } = await dashApi.patch(`/users/${id}`, updates);
      set((s) => ({
        isSubmitting: false,
        staff: s.staff.map((u) => (u._id === id ? data.data.user : u)),
        selected: s.selected?._id === id ? data.data.user : s.selected,
      }));
      toast.success("Staff member updated");
      return { success: true, user: data.data.user };
    } catch (err) {
      set({ isSubmitting: false });
      toast.error(err.response?.data?.message || "Failed to update staff member");
      return { success: false };
    }
  },

  toggleActive: async (user) => {
    try {
      const { data } = await dashApi.patch(`/users/${user._id}`, {
        isActive: !user.isActive,
      });
      set((s) => ({
        staff: s.staff.map((u) => (u._id === user._id ? data.data.user : u)),
      }));
      toast.success(user.isActive ? "Staff member deactivated" : "Staff member activated");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
      return { success: false };
    }
  },

  deleteStaff: async (id) => {
    try {
      await dashApi.delete(`/users/${id}`);
      set((s) => ({
        staff: s.staff.filter((u) => u._id !== id),
        pagination: s.pagination
          ? { ...s.pagination, total: s.pagination.total - 1 }
          : null,
      }));
      toast.success("Staff member deleted");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete staff member");
      return { success: false };
    }
  },
}));
