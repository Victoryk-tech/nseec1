import ForgotPasswordPage from "@/components/dashboard/auth/ForgotPasswordPage";

export const metadata = {
  title: "Forgot Password — NSSEC Staff",
  robots: { index: false, follow: false },
};

export default function StaffForgotPage() {
  return <ForgotPasswordPage />;
}
