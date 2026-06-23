"use client";
import { Suspense } from "react";
import ResetPasswordPage from "@/components/dashboard/auth/ResetPasswordPage";

export default function StaffResetPage() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
