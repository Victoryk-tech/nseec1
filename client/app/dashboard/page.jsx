import DashboardHome from "@/components/dashboard/pages/DashboardHome";

export const metadata = {
  title: "Dashboard — NSSEC",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardHome />;
}
