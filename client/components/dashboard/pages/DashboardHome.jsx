"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, MessageSquare, ImageIcon, Activity } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useSubscriberStore } from "@/store/subscriberStore";
import { useContactStore } from "@/store/contactStore";
import { useMediaStore } from "@/store/mediaStore";
import { useAuditStore } from "@/store/auditStore";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton } from "../ui/DashLoader";
import DashboardHeader from "../layout/DashboardHeader";
import Badge from "../ui/Badge";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dashApi from "@/lib/dashApi";
import { useState } from "react";

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { stats: subStats, fetchStats: fetchSubStats, isStatsLoading } = useSubscriberStore();
  const { stats: contactStats, fetchStats: fetchContactStats } = useContactStore();
  const { stats: mediaStats, fetchStats: fetchMediaStats } = useMediaStore();
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
    fetchLogs({ page: 1, limit: 10 });
  }, []);

  const growth = dashStats?.subscribers?.growth || [];

  return (
    <div>
      <DashboardHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Admin"}`}
        subtitle="Here's what's happening on NSSEC today"
      />
      <div className="p-6 space-y-6 max-w-[1400px]">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatsCard icon={Mail} label="Total Subscribers" value={dashStats?.subscribers?.total?.toLocaleString()} sub={`${dashStats?.subscribers?.active?.toLocaleString()} active`} color="teal" delay={0} />
              <StatsCard icon={MessageSquare} label="Contact Messages" value={dashStats?.contacts?.total?.toLocaleString()} sub={`${dashStats?.contacts?.unreplied} unreplied`} color="amber" delay={0.05} />
              <StatsCard icon={ImageIcon} label="Media Files" value={dashStats?.media?.total?.toLocaleString()} color="blue" delay={0.1} />
              <StatsCard icon={Users} label="Staff Members" value={dashStats?.users?.total?.toLocaleString()} sub={`${dashStats?.users?.active} active`} color="green" delay={0.15} />
            </>
          )}
        </div>

        {/* Charts + Activity */}
        <div className="grid xl:grid-cols-3 gap-6">
          {/* Subscriber Growth */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Subscriber Growth (7 days)</h3>
            {growth.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={growth}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#24c2c2" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#24c2c2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="_id" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={30} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="count" stroke="#24c2c2" strokeWidth={2} fill="url(#tealGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-sm text-gray-400">No data yet</div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-[#24c2c2]" />
              <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[220px]">
              {logs.slice(0, 10).map((log) => (
                <motion.div
                  key={log._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-[#24c2c2]/10 flex items-center justify-center flex-shrink-0 text-[#0e4a4a] text-xs font-bold">
                    {log.userName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-700 font-medium truncate">{log.action?.replace(/_/g, " ")}</p>
                    <p className="text-xs text-gray-400">{log.userName || "System"} &bull; {log.resource}</p>
                  </div>
                  <Badge label={log.status} />
                </motion.div>
              ))}
              {logs.length === 0 && <p className="text-xs text-gray-400 text-center py-6">No activity yet</p>}
            </div>
          </div>
        </div>

        {/* Quick status row */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "New contacts this week", value: dashStats?.contacts?.newThisWeek || 0, icon: MessageSquare },
            { label: "Subscribers this month", value: dashStats?.subscribers?.newThisMonth || 0, icon: Mail },
            { label: "Unreplied messages", value: dashStats?.contacts?.unreplied || 0, icon: MessageSquare },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center">
                <item.icon size={18} className="text-[#0e4a4a]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 tabular-nums">{item.value}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
