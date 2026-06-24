"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Mail, MessageSquare, ImageIcon,
  ScrollText, Settings, ChevronRight, LogOut, Bell, BookOpen, Camera,
  Newspaper, FileText, ClipboardList,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useNotificationStore } from "@/store/notificationStore";

const NAV = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Overview",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/subscribers",
    icon: Mail,
    label: "Subscribers",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/contacts",
    icon: MessageSquare,
    label: "Contacts",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/media",
    icon: ImageIcon,
    label: "Media",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/publications",
    icon: BookOpen,
    label: "Publications",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/gallery",
    icon: Camera,
    label: "Gallery",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/nssec-news",
    icon: Newspaper,
    label: "NSSEC News",
    roles: ["superAdmin", "admin", "editor"],
  },
  {
    href: "/dashboard/press-release",
    icon: FileText,
    label: "Press Release",
    roles: ["superAdmin", "admin", "editor"],
  },
  {
    href: "/dashboard/users",
    icon: Users,
    label: "Staff",
    roles: ["superAdmin", "admin"],
  },
  {
    href: "/dashboard/mande",
    icon: ClipboardList,
    label: "M&E Submissions",
    roles: ["superAdmin", "admin", "editor", "viewer"],
  },
  {
    href: "/dashboard/audit",
    icon: ScrollText,
    label: "Audit Log",
    roles: ["superAdmin"],
  },
  {
    href: "/dashboard/notifications",
    icon: Bell,
    label: "Notifications",
    roles: ["superAdmin", "admin", "editor", "viewer"],
    badge: true,
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Settings",
    roles: ["superAdmin", "admin"],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, openConfirm } = useUIStore();
  const { unreadCount } = useNotificationStore();

  const allowed = NAV.filter((n) => n.roles.includes(user?.role));

  const isActive = (href) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 72 : 256,
          x: sidebarOpen || typeof window === "undefined" ? 0 : -256,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-[#082c2c] z-50 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 min-h-[64px]">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
            <Image src="/nssec.jpeg" alt="NSSEC" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
              >
                <p className="text-white font-bold text-sm whitespace-nowrap">NSSEC</p>
                <p className="text-white/40 text-[10px] whitespace-nowrap">Dashboard</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <div className="space-y-0.5 px-3">
            {allowed.map((item) => {
              const active = isActive(item.href);
              const showBadge = item.badge && unreadCount > 0;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                    active
                      ? "bg-[#24c2c2] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <item.icon size={18} />
                    {showBadge && sidebarCollapsed && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </div>
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium whitespace-nowrap flex-1"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge on expanded sidebar */}
                  {!sidebarCollapsed && showBadge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                        active ? "bg-white/20 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}

                  {active && !sidebarCollapsed && !showBadge && (
                    <ChevronRight size={14} className="ml-auto opacity-60" />
                  )}

                  {/* Tooltip on collapsed */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50 flex items-center gap-1.5">
                      {item.label}
                      {showBadge && (
                        <span className="bg-red-500 text-white text-[9px] font-bold px-1 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User + logout */}
        <div className="border-t border-white/10 px-3 py-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#24c2c2]/20 flex items-center justify-center text-[#24c2c2] font-bold text-sm flex-shrink-0 overflow-hidden">
                {user?.avatar
                  ? <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-full h-full object-cover" />
                  : user?.name?.[0]?.toUpperCase()
                }
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate">{user?.name}</p>
                <p className="text-white/40 text-[10px] truncate capitalize">{user?.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={() =>
              openConfirm({
                title: "Sign Out",
                message: "Are you sure you want to sign out of your account?",
                danger: true,
                confirmLabel: "Sign Out",
                onConfirm: logout,
              })
            }
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
