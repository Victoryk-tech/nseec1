"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Download, Trash2, RefreshCw, Mail, X } from "lucide-react";
import { useSubscriberStore } from "@/store/subscriberStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton } from "../ui/DashLoader";

const STATUSES = ["", "active", "unsubscribed", "bounced", "pending"];

export default function SubscribersPage() {
  const { subscribers, stats, pagination, isLoading, isStatsLoading, filters, setFilters, fetchSubscribers, fetchStats, addSubscriber, deleteSubscriber, exportSubscribers } = useSubscriberStore();
  const { openConfirm } = useUIStore();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ email: "", name: "" });

  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, []);

  const handleSearch = (val) => {
    const f = { ...filters, search: val, page: 1 };
    setFilters(f);
    fetchSubscribers(f);
  };

  const handleStatusFilter = (status) => {
    const f = { ...filters, status, page: 1 };
    setFilters(f);
    fetchSubscribers(f);
  };

  const handlePageChange = (page) => {
    const f = { ...filters, page };
    setFilters(f);
    fetchSubscribers(f);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const result = await addSubscriber(addForm);
    if (result.success) { setShowAdd(false); setAddForm({ email: "", name: "" }); }
  };

  const handleDelete = (id, email) => {
    openConfirm({
      title: "Delete Subscriber",
      message: `Remove ${email} from the subscriber list?`,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: () => deleteSubscriber(id),
    });
  };

  const columns = [
    { header: "Name", accessor: "name", render: (r) => <span className="font-medium text-gray-800">{r.name || <span className="text-gray-400 italic">Not provided</span>}</span> },
    { header: "Email", accessor: "email", render: (r) => <span className="text-gray-700 text-xs">{r.email}</span> },
    { header: "Status", render: (r) => <Badge label={r.status} dot /> },
    { header: "Source", render: (r) => <span className="text-xs text-gray-500 capitalize">{r.source || "website"}</span> },
    { header: "Subscribed", render: (r) => <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</span> },
    {
      header: "", render: (r) => (
        <button onClick={() => handleDelete(r._id, r.email)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={14} />
        </button>
      )
    },
  ];

  return (
    <div>
      <DashboardHeader title="Subscribers" subtitle="Manage newsletter subscribers" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {isStatsLoading ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) : (
            <>
              <StatsCard icon={Mail} label="Total" value={stats?.total?.toLocaleString()} color="teal" delay={0} />
              <StatsCard icon={Mail} label="Active" value={stats?.active?.toLocaleString()} color="green" delay={0.05} />
              <StatsCard icon={Mail} label="Unsubscribed" value={stats?.unsubscribed?.toLocaleString()} color="amber" delay={0.1} />
              <StatsCard icon={Mail} label="This Month" value={stats?.thisMonth?.toLocaleString()} color="blue" delay={0.15} />
            </>
          )}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers…"
                defaultValue={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
              />
            </div>
            <div className="flex gap-1">
              {STATUSES.map((s) => (
                <button
                  key={s || "all"}
                  onClick={() => handleStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${filters.status === s ? "bg-[#24c2c2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {s || "All"}
                </button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => fetchSubscribers()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
                <RefreshCw size={15} />
              </button>
              <button onClick={() => exportSubscribers(filters.status)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl">
                <Download size={14} /> Export
              </button>
              <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={subscribers}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={handlePageChange}
            emptyText="No subscribers found"
          />
        </div>

        {/* Add subscriber panel */}
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">Add Subscriber</h3>
                <button onClick={() => setShowAdd(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><X size={16} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-4">
                <input value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="Full name (optional)" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                <input required type="email" value={addForm.email} onChange={(e) => setAddForm({ ...addForm, email: e.target.value })} placeholder="Email address *" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium">Add Subscriber</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
