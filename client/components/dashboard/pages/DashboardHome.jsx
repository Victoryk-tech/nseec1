"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Users, Mail, MessageSquare, ImageIcon, Activity, ClipboardList,
  BookOpen, ArrowRight, TrendingUp, TrendingDown, Minus, Zap,
  Plus, BarChart2, Bell,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useAuditStore } from "@/store/auditStore";
import DashboardHeader from "../layout/DashboardHeader";
import Badge from "../ui/Badge";
import { StatCardSkeleton } from "../ui/DashLoader";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import dashApi from "@/lib/dashApi";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } },
};

function TrendIcon({ value }) {
  if (!value || value === 0) return <Minus size={12} className="text-gray-300" />;
  if (value > 0) return <TrendingUp size={12} className="text-emerald-500" />;
  return <TrendingDown size={12} className="text-red-400" />;
}

function StatCard({ icon: Icon, label, value, sub, color, trend, link, delay = 0 }) {
  const colors = {
    teal:   { bg: "bg-[#e6f9f9]",  icon: "text-[#0e9090]",  dot: "bg-[#24c2c2]",  ring: "ring-[#24c2c2]/20"  },
    amber:  { bg: "bg-amber-50",   icon: "text-amber-600",  dot: "bg-amber-400",  ring: "ring-amber-200"    },
    blue:   { bg: "bg-blue-50",    icon: "text-blue-600",   dot: "bg-blue-400",   ring: "ring-blue-200"     },
    green:  { bg: "bg-emerald-50", icon: "text-emerald-600",dot: "bg-emerald-400",ring: "ring-emerald-200"  },
    purple: { bg: "bg-purple-50",  icon: "text-purple-600", dot: "bg-purple-400", ring: "ring-purple-200"   },
    indigo: { bg: "bg-indigo-50",  icon: "text-indigo-600", dot: "bg-indigo-400", ring: "ring-indigo-200"   },
  };
  const c = colors[color] || colors.teal;
  const numVal = typeof value === "number" ? value : parseInt(value) || 0;

  return (
    <motion.div
      variants={stagger.item}
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full ${c.bg} opacity-50 translate-x-6 -translate-y-6`} />
      <div className="relative">
        <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center mb-4 ring-4 ${c.ring}`}>
          <Icon size={18} className={c.icon} />
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums leading-none">
              <CountUp end={numVal} duration={1.4} separator="," />
            </p>
            <p className="text-xs font-medium text-gray-500 mt-1">{label}</p>
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-0.5 text-xs text-gray-400 mb-0.5">
              <TrendIcon value={trend} />
              <span className={trend > 0 ? "text-emerald-500" : trend < 0 ? "text-red-400" : "text-gray-400"}>
                {trend > 0 ? `+${trend}` : trend}
              </span>
            </div>
          )}
        </div>
        {sub && <p className="text-[11px] text-gray-400 mt-1.5">{sub}</p>}
        {link && (
          <Link href={link} className="flex items-center gap-1 text-[11px] font-semibold text-[#24c2c2] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            View all <ArrowRight size={10} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xl px-4 py-2.5">
      <p className="text-[11px] text-gray-400 font-medium">{label}</p>
      <p className="text-sm font-bold text-[#082c2c]">{payload[0]?.value} subscribers</p>
    </div>
  );
};

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { logs, fetchLogs } = useAuditStore();
  const [loading, setLoading] = useState(true);
  const [dashStats, setDashStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await dashApi.get("/dashboard/stats");
        setDashStats(data.data);
      } catch {}
      setLoading(false);
    };
    load();
    fetchLogs({ page: 1, limit: 8 });
  }, []);

  const growth = dashStats?.subscribers?.growth || [];

  const QUICK_ACTIONS = [
    { label: "New Staff",      icon: Plus,         href: "/dashboard/users",        color: "bg-[#082c2c] text-white" },
    { label: "View Contacts",  icon: MessageSquare,href: "/dashboard/contacts",     color: "bg-indigo-50 text-indigo-700" },
    { label: "M&E Submissions",icon: ClipboardList, href: "/dashboard/mande",       color: "bg-purple-50 text-purple-700" },
    { label: "Notifications",  icon: Bell,          href: "/dashboard/notifications",color: "bg-amber-50 text-amber-700" },
  ];

  return (
    <div>
      <DashboardHeader
        title={`${getGreeting()}, ${user?.name?.split(" ")[0] || "Admin"} 👋`}
        subtitle="Here's a live overview of everything happening on NSSEC"
      />

      <div className="p-4 sm:p-6 space-y-6 max-w-[1400px]">

        {/* Stats Grid */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4"
          data-aos="fade-up"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard icon={Mail}         label="Subscribers"        value={dashStats?.subscribers?.total ?? 0}    sub={`${dashStats?.subscribers?.active ?? 0} active`}     color="teal"   link="/dashboard/subscribers" />
              <StatCard icon={MessageSquare}label="Contact Messages"    value={dashStats?.contacts?.total ?? 0}       sub={`${dashStats?.contacts?.unreplied ?? 0} unreplied`}  color="amber"  link="/dashboard/contacts" />
              <StatCard icon={ImageIcon}    label="Media Files"         value={dashStats?.media?.total ?? 0}          color="blue"   link="/dashboard/media" />
              <StatCard icon={Users}        label="Staff Members"       value={dashStats?.users?.total ?? 0}          sub={`${dashStats?.users?.active ?? 0} active`}           color="green"  link="/dashboard/users" />
              <StatCard icon={ClipboardList}label="M&E Submissions"     value={dashStats?.mande?.total ?? 0}          sub={`${dashStats?.mande?.pending ?? 0} pending`}         color="purple" link="/dashboard/mande" />
              <StatCard icon={BookOpen}     label="Publications"        value={dashStats?.publications?.total ?? 0}   color="indigo" link="/dashboard/publications" />
            </>
          )}
        </motion.div>

        {/* Chart + Activity */}
        <div className="grid xl:grid-cols-3 gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="100">

          {/* Subscriber Growth Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Subscriber Growth</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Last 7 days</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#24c2c2] font-semibold">
                <TrendingUp size={14} />
                <span>{dashStats?.subscribers?.newThisMonth ?? 0} this month</span>
              </div>
            </div>
            {growth.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={growth} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#24c2c2" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#24c2c2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} width={28} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#24c2c2", strokeWidth: 1, strokeDasharray: "4 4" }} />
                  <Area type="monotone" dataKey="count" stroke="#24c2c2" strokeWidth={2.5} fill="url(#tealGrad)" dot={{ fill: "#24c2c2", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "#082c2c" }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex flex-col items-center justify-center text-gray-300">
                <BarChart2 size={32} className="mb-2" />
                <p className="text-sm">No subscriber data yet</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#24c2c2]/10 rounded-lg flex items-center justify-center">
                <Activity size={14} className="text-[#24c2c2]" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[230px] pr-1">
              {logs.slice(0, 8).map((log, i) => (
                <motion.div
                  key={log._id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-[#082c2c]/8 flex items-center justify-center flex-shrink-0 text-[#0e4a4a] text-[11px] font-bold border border-[#24c2c2]/20">
                    {log.userName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-700 font-medium truncate">{log.action?.replace(/_/g, " ")}</p>
                    <p className="text-[10px] text-gray-400 truncate">{log.userName || "System"} · {log.resource}</p>
                  </div>
                  <Badge label={log.status} />
                </motion.div>
              ))}
              {logs.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-gray-300">
                  <Activity size={24} className="mb-2" />
                  <p className="text-xs">No activity yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions + Mini Stats Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="150">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={action.href}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#24c2c2]/30 hover:shadow-sm transition-all group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color}`}>
                  <action.icon size={16} />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#082c2c] transition-colors flex-1 leading-tight">
                  {action.label}
                </span>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#24c2c2] group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom info row */}
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="200">
          {[
            { label: "New contacts this week",    value: dashStats?.contacts?.newThisWeek ?? 0,    icon: MessageSquare, href: "/dashboard/contacts"     },
            { label: "Subscribers this month",    value: dashStats?.subscribers?.newThisMonth ?? 0, icon: Mail,          href: "/dashboard/subscribers"  },
            { label: "Pending M&E submissions",   value: dashStats?.mande?.pending ?? 0,            icon: ClipboardList, href: "/dashboard/mande"        },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              whileHover={{ y: -1 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 group hover:border-[#24c2c2]/20 transition-colors"
            >
              <div className="w-11 h-11 bg-[#24c2c2]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-[#0e4a4a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-gray-900 tabular-nums leading-none">
                  <CountUp end={item.value} duration={1.2} />
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{item.label}</p>
              </div>
              <Link href={item.href} className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-[#24c2c2]" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
