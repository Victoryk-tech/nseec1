import { create } from "zustand";
import { persist } from "zustand/middleware";
import dashApi, { setAccessToken, clearAccessToken } from "@/lib/dashApi";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function generateDeviceFingerprint() {
  if (typeof window === "undefined") return "";
  try {
    return btoa(
      [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        screen.colorDepth,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      ].join("|")
    ).slice(0, 64);
  } catch {
    return "";
  }
}

function saveDeviceTrust(userId) {
  if (typeof window === "undefined" || !userId) return;
  try {
    localStorage.setItem(
      `nssec_device_trust_${userId}`,
      JSON.stringify({
        fingerprint: generateDeviceFingerprint(),
        trustedUntil: Date.now() + 14 * 24 * 60 * 60 * 1000,
      })
    );
  } catch {}
}

export function checkDeviceTrust(userId) {
  if (typeof window === "undefined" || !userId) return false;
  try {
    const raw = localStorage.getItem(`nssec_device_trust_${userId}`);
    if (!raw) return false;
    const { fingerprint, trustedUntil } = JSON.parse(raw);
    if (Date.now() > trustedUntil) {
      localStorage.removeItem(`nssec_device_trust_${userId}`);
      return false;
    }
    return fingerprint === generateDeviceFingerprint();
  } catch {
    return false;
  }
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      mfaSession: null,
      isLoading: false,
      isInitialized: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await dashApi.post("/auth/login", { email, password });
          if (data.data.requiresMfa) {
            set({
              isLoading: false,
              user: data.data.user,
              mfaSession: data.data.mfaSession,
            });
            return { success: true, requiresMfa: true };
          }
          setAccessToken(data.data.accessToken);
          set({
            user: data.data.user,
            accessToken: data.data.accessToken,
            mfaSession: null,
            isLoading: false,
            isInitialized: true,
          });
          toast.success("Welcome back!");
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          const msg = err.response?.data?.message || "Login failed";
          toast.error(msg);
          return { success: false, message: msg };
        }
      },

      sendMfaCode: async (mfaSession) => {
        try {
          await dashApi.post("/auth/mfa/send", { mfaSession });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || "Failed to send verification code";
          toast.error(msg);
          return { success: false, message: msg };
        }
      },

      verifyMfaCode: async (code, { remember = false, mfaSession } = {}) => {
        set({ isLoading: true });
        try {
          const session = mfaSession || get().mfaSession;
          const { data } = await dashApi.post("/auth/mfa/verify", {
            code,
            mfaSession: session,
            remember,
          });

          setAccessToken(data.data.accessToken);
          set({
            user: data.data.user,
            accessToken: data.data.accessToken,
            mfaSession: null,
            isLoading: false,
            isInitialized: true,
          });

          if (remember && data.data.user?._id) {
            saveDeviceTrust(data.data.user._id);
          }

          if (data.data.requiresPasswordChange) {
            return { success: true, requiresPasswordChange: true };
          }

          toast.success(`Welcome back, ${data.data.user.name?.split(" ")[0]}!`);
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return {
            success: false,
            message: err.response?.data?.message || "Verification failed",
          };
        }
      },

      tryDeviceAutoLogin: async (userId) => {
        if (!checkDeviceTrust(userId)) return { success: false };
        try {
          const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          if (!refreshRes.ok) return { success: false };
          const refreshData = await refreshRes.json();
          const { accessToken } = refreshData.data;
          setAccessToken(accessToken);
          set({ accessToken, mfaSession: null });
          const { data } = await dashApi.get("/auth/me");
          set({ user: data.data.user, isInitialized: true });
          toast.success(`Welcome back, ${data.data.user.name?.split(" ")[0]}!`);
          return { success: true };
        } catch {
          return { success: false };
        }
      },

      logout: async () => {
        try {
          await dashApi.post("/auth/logout");
        } catch {}
        clearAccessToken();
        set({ user: null, accessToken: null, mfaSession: null });
        toast.success("Logged out");
      },

      fetchMe: async () => {
        try {
          const token = get().accessToken;
          if (token) setAccessToken(token);
          const { data } = await dashApi.get("/auth/me");
          set({ user: data.data.user, isInitialized: true });
        } catch {
          clearAccessToken();
          set({ user: null, accessToken: null, mfaSession: null, isInitialized: true });
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true });
        try {
          await dashApi.post("/auth/forgot-password", { email });
          set({ isLoading: false });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          toast.error(err.response?.data?.message || "Failed to send reset link");
          return { success: false };
        }
      },

      resetPassword: async (token, password, confirmPassword) => {
        set({ isLoading: true });
        try {
          await dashApi.post("/auth/reset-password", { token, password, confirmPassword });
          set({ isLoading: false });
          toast.success("Password reset successfully");
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          toast.error(err.response?.data?.message || "Password reset failed");
          return { success: false };
        }
      },

      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true });
        try {
          await dashApi.patch("/auth/change-password", { currentPassword, newPassword });
          set((s) => ({
            isLoading: false,
            user: s.user ? { ...s.user, requiresPasswordChange: false } : s.user,
          }));
          toast.success("Password changed successfully");
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          toast.error(err.response?.data?.message || "Failed to change password");
          return { success: false };
        }
      },
    }),
    {
      name: "nssec-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        mfaSession: state.mfaSession,
      }),
    }
  )
);
