import { Suspense } from "react";
import ChangePasswordPage from "@/components/dashboard/auth/ChangePasswordPage";

export const metadata = {
  title: "Set Password — NSSEC Staff",
  robots: { index: false, follow: false },
};

export default function StaffChangePasswordPage() {
  return (
    <Suspense>
      <ChangePasswordPage />
    </Suspense>
  );
}
