"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { PageLoader } from "@/components/dashboard/ui/DashLoader";

export default function DashboardRootLayout({ children }) {
  const { user, accessToken, isInitialized, fetchMe } = useAuthStore();
  const { startPolling, stopPolling } = useNotificationStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) fetchMe();
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized && !user) {
      router.push("/staff-portal/login");
    }
  }, [user, isInitialized]);

  // Start notification polling when authenticated
  useEffect(() => {
    if (isInitialized && user) {
      startPolling();
      return () => stopPolling();
    }
  }, [isInitialized, user]);

  if (!isInitialized || !user) return <PageLoader />;

  return <DashboardLayout>{children}</DashboardLayout>;
}
