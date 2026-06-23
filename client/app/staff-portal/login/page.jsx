import { Suspense } from "react";
import LoginPage from "@/components/dashboard/auth/LoginPage";

export const metadata = {
  title: "Staff Login — NSSEC",
  robots: { index: false, follow: false },
};

export default function StaffLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
