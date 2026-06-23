"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldX } from "lucide-react";

const ROLE_HIERARCHY = { superAdmin: 4, admin: 3, editor: 2, viewer: 1 };

export default function RouteGuard({ children, requiredRole, exact = false }) {
  const { user } = useAuthStore();
  const router = useRouter();

  const userLevel = ROLE_HIERARCHY[user?.role] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

  const hasAccess = exact
    ? user?.role === requiredRole
    : userLevel >= requiredLevel;

  useEffect(() => {
    if (!user) router.replace("/staff-portal/login");
  }, [user]);

  if (!user) return null;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
          <ShieldX size={28} className="text-red-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-gray-500 max-w-sm">
          You don&apos;t have permission to view this page. Contact your Super Admin if you need access.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-4 py-2 text-sm bg-[#082c2c] text-white rounded-xl hover:bg-[#0e4a4a] transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return children;
}
