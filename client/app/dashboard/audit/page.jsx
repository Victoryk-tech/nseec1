import AuditPage from "@/components/dashboard/pages/AuditPage";
import RouteGuard from "@/components/dashboard/ui/RouteGuard";

export const metadata = { title: "Audit Log — NSSEC Dashboard", robots: { index: false } };

export default function Page() {
  return (
    <RouteGuard requiredRole="superAdmin" exact>
      <AuditPage />
    </RouteGuard>
  );
}
