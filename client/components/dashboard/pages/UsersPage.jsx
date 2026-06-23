"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Trash2, X, UserCog, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useStaffStore } from "@/store/staffStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import { SpinnerInline } from "../ui/DashLoader";

const ROLES = ["viewer", "editor", "admin", "superAdmin"];
const EMPTY_FORM = { name: "", email: "", role: "viewer", department: "", phone: "" };

export default function UsersPage() {
  const { user: me } = useAuthStore();
  const { openConfirm } = useUIStore();
  const {
    staff, pagination, isLoading, isSubmitting, filters,
    fetchStaff, setFilters, createStaff, toggleActive, deleteStaff,
  } = useStaffStore();

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => { fetchStaff(); }, []);

  const handleSearch = (val) => {
    const f = { ...filters, search: val, page: 1 };
    setFilters(f);
    fetchStaff(f);
  };

  const handlePageChange = (page) => {
    const f = { ...filters, page };
    setFilters(f);
    fetchStaff(f);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const result = await createStaff(form);
    if (result.success) {
      setShowAdd(false);
      setForm(EMPTY_FORM);
    }
  };

  const handleDelete = (id, name) => {
    openConfirm({
      title: "Delete Staff Member",
      message: `Permanently delete ${name}? They will lose all access immediately.`,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: () => deleteStaff(id),
    });
  };

  const columns = [
    {
      header: "Staff Member",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#24c2c2]/10 flex items-center justify-center text-[#0e4a4a] font-semibold text-xs flex-shrink-0">
            {r.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{r.name}</p>
            <p className="text-xs text-gray-500">{r.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Role", render: (r) => <Badge label={r.role} /> },
    { header: "Dept.", render: (r) => <span className="text-xs text-gray-500">{r.department || "—"}</span> },
    { header: "Status", render: (r) => <Badge label={r.isActive ? "active" : "inactive"} dot /> },
    {
      header: "Last Login",
      render: (r) => (
        <span className="text-xs text-gray-400">
          {r.lastLogin ? new Date(r.lastLogin).toLocaleDateString() : "Never"}
        </span>
      ),
    },
    {
      header: "Logins",
      render: (r) => <span className="text-xs font-mono text-gray-500">{r.loginCount ?? 0}</span>,
    },
    {
      header: "",
      render: (r) =>
        r._id !== me?._id ? (
          <div className="flex gap-1">
            <button
              onClick={() => toggleActive(r)}
              className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                r.isActive
                  ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                  : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
              }`}
            >
              {r.isActive ? "Deactivate" : "Activate"}
            </button>
            {me?.role === "superAdmin" && (
              <button
                onClick={() => handleDelete(r._id, r.name)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">You</span>
        ),
    },
  ];

  return (
    <div>
      <DashboardHeader title="Staff Management" subtitle="Manage staff accounts, roles, and access" />
      <div className="p-6 space-y-6 max-w-[1400px]">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email…"
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
              />
            </div>
            <select
              onChange={(e) => {
                const f = { ...filters, role: e.target.value, page: 1 };
                setFilters(f);
                fetchStaff(f);
              }}
              className="px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none bg-white text-gray-600"
            >
              <option value="">All Roles</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button onClick={() => fetchStaff()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
              <RefreshCw size={15} />
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#082c2c] hover:bg-[#0e4a4a] rounded-xl transition-colors ml-auto"
            >
              <Plus size={14} /> Add Staff
            </button>
          </div>
          <DataTable
            columns={columns}
            data={staff}
            isLoading={isLoading}
            pagination={pagination}
            onPageChange={handlePageChange}
            emptyText="No staff members found"
          />
        </div>

        <AnimatePresence>
          {showAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowAdd(false)}
              />
              <motion.div
                initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md z-10"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#24c2c2]/10 rounded-lg flex items-center justify-center">
                      <UserCog size={16} className="text-[#0e4a4a]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Add Staff Member</h3>
                  </div>
                  <button onClick={() => setShowAdd(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                    <X size={16} />
                  </button>
                </div>

                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  A secure temporary password will be auto-generated and emailed to the staff member. They must change it on first login.
                </div>

                <form onSubmit={handleAdd} className="space-y-3.5">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name *" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address *" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white capitalize">
                    {ROLES.filter((r) => me?.role === "superAdmin" || r !== "superAdmin").map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Department (optional)" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number (optional)" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 text-sm text-white bg-[#082c2c] hover:bg-[#0e4a4a] rounded-xl font-medium disabled:opacity-60 flex items-center justify-center gap-2 transition-colors">
                      {isSubmitting ? <><SpinnerInline size={14} color="#fff" /> Creating…</> : "Create Account"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
