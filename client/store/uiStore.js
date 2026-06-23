import { create } from "zustand";

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  modal: null,
  confirmDialog: null,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  collapseSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),

  openConfirm: (dialog) => set({ confirmDialog: dialog }),
  closeConfirm: () => set({ confirmDialog: null }),
}));
