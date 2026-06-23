"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, RefreshCw, ScrollText, AlertCircle } from "lucide-react";
import { useAuditStore } from "@/store/auditStore";
import DashboardHeader from "../layout/DashboardHeader";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton } from "../ui/DashLoader";

const ACTIONS = ["", "LOGIN", "LOGOUT", "FAILED_LOGIN", "CREATE", "UPDATE", "DELETE", "UPLOAD", "PASSWORD_CHANGED"];

export default function AuditPage() {
  const { logs, stats, pagination, isLoading, filters, setFilters, fetchLogs, fetchStats } = useAuditStore();

  useEffect(() => { fetchLogs(); fetchStats(); }, []);

  const handleFilter = (key, val) => {
    const f = { ...filters, [key]: val, page: 1 };
    setFilters(f); fetchLogs(f);
  };
  const handlePageChange = (p) => {
    const f = { ...filters, page: p };
    setFilters(f); fetchLogs(f);
  };

  const columns = [
    {
      header: "User", render: (r) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#24c2c2]/10 flex items-center justify-center text-xs font-bold text-[#0e4a4a] flex-shrink-0">
            {r.userName?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-800">{r.userName || "System"}</p>
            <p className="text-[10px] text-gray-400">{r.userEmail || ""}</p>
          </div>
        </div>
      )
    },
    { header: "Action", render: (r) => <span className="text-xs font-mono text-gray-700">{r.action?.replace(/_/g, " ")}</span> },
    { header: "Resource", render: (r) => <span className="text-xs text-gray-500 capitalize">{r.resource}</span> },
    { header: "Role", render: (r) => r.userRole ? <Badge label={r.userRole} /> : <span className="text-gray-400 text-xs">—</span> },
    { header: "Status", render: (r) => <Badge label={r.status} dot /> },
    { header: "IP", render: (r) => <span className="text-[10px] text-gray-400 font-mono">{r.ipAddress || "—"}</span> },
    { header: "Time", render: (r) => <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleString()}</span> },
  ];

  return (
    <div>
      <DashboardHeader title="Audit Log" subtitle="Full record of all staff activity" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {!stats ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) : (
            <>
              <StatsCard icon={ScrollText} label="Events (30d)" value={stats.total?.toLocaleString()} color="teal" delay={0} />
              <StatsCard icon={AlertCircle} label="Failures (30d)" value={stats.failures?.toLocaleString()} color="red" delay={0.05} />
              <StatsCard icon={ScrollText} label="Logins (30d)" value={stats.logins?.toLocaleString()} color="green" delay={0.1} />
              <StatsCard icon={ScrollText} label="Top Action" value={stats.topActions?.[0]?._id?.replace(/_/g, " ") || "—"} color="blue" delay={0.15} />
            </>
          )}
        </div>

        {/* Top users + top actions */}
        {stats && (
          <div className="grid xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Most Active Users (30d)</h3>
              <div className="space-y-2">
                {(stats.topUsers || []).map((u, i) => (
                  <div key={u._id} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                    <div className="w-7 h-7 rounded-full bg-[#24c2c2]/10 flex items-center justify-center text-xs font-bold text-[#0e4a4a]">{u.name?.[0]?.toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{u.name}</p>
                      <p className="text-[10px] text-gray-400">{u.email}</p>
                    </div>
                    <span className="text-xs font-bold text-[#24c2c2]">{u.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Actions (30d)</h3>
              <div className="space-y-2">
                {(stats.topActions || []).map((a) => (
                  <div key={a._id} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-700 flex-1">{a._id?.replace(/_/g, " ")}</span>
                    <div className="h-1.5 bg-gray-100 rounded-full flex-1 max-w-[120px] overflow-hidden">
                      <motion.div className="h-full bg-[#24c2c2] rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min(100, (a.count / (stats.topActions[0]?.count || 1)) * 100)}%` }} transition={{ delay: 0.2 }} />
                    </div>
                    <span className="text-xs font-bold text-gray-600 w-8 text-right">{a.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Log table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by user, resource…" onChange={(e) => handleFilter("search", e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
            </div>
            <select onChange={(e) => handleFilter("action", e.target.value)} className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white text-gray-600">
              {ACTIONS.map((a) => <option key={a || "all"} value={a}>{a ? a.replace(/_/g, " ") : "All Actions"}</option>)}
            </select>
            <select onChange={(e) => handleFilter("status", e.target.value)} className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white text-gray-600">
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
            </select>
            <button onClick={() => fetchLogs()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl ml-auto"><RefreshCw size={15} /></button>
          </div>
          <DataTable columns={columns} data={logs} isLoading={isLoading} pagination={pagination} onPageChange={handlePageChange} emptyText="No audit logs found" />
        </div>
      </div>
    </div>
  );
}
