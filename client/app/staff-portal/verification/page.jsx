import { Suspense } from "react";
import VerifyIdentityPage from "@/components/dashboard/auth/VerifyIdentityPage";

export const metadata = {
  title: "Verify Identity — NSSEC Staff",
  robots: { index: false, follow: false },
};

export default function StaffVerifyPage() {
  return (
    <Suspense>
      <VerifyIdentityPage />
    </Suspense>
  );
}
