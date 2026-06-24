"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList, Search, Filter, Download, Eye, X, ChevronLeft,
  ChevronRight, CheckCircle2, Clock, Archive, FileText, Globe,
  MapPin, Mail, User, Calendar, AlertCircle, RefreshCw,
} from "lucide-react";
import { useMandEStore } from "@/store/mandEStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";

const STATUS_CONFIG = {
  pending:  { label: "Pending",  bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"  },
  reviewed: { label: "Reviewed", bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500" },
  archived: { label: "Archived", bg: "bg-gray-100",    text: "text-gray-500",    dot: "bg-gray-400"   },
};

const TYPE_CONFIG = {
  web: { icon: Globe,     label: "Online Form", bg: "bg-blue-50",   text: "text-blue-700"  },
  pdf: { icon: FileText,  label: "PDF Upload",  bg: "bg-purple-50", text: "text-purple-700" },
};

function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function TypeBadge({ type }) {
  const c = TYPE_CONFIG[type] || TYPE_CONFIG.web;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${c.bg} ${c.text}`}>
      <Icon size={10} /> {c.label}
    </span>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 sm:px-6 py-4 border-b border-gray-50 animate-pulse">
      <div className="h-4 w-1/4 bg-gray-100 rounded" />
      <div className="h-4 w-1/6 bg-gray-100 rounded" />
      <div className="h-4 w-1/8 bg-gray-100 rounded" />
      <div className="h-5 w-20 bg-gray-100 rounded-full ml-auto" />
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-gray-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-700 break-words">{value}</p>
      </div>
    </div>
  );
}

function DetailModal({ submission, onClose, onStatusChange }) {
  const [status, setStatus] = useState(submission.status);
  const [notes, setNotes] = useState(submission.adminNotes || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await onStatusChange(submission._id, status, notes);
    if (result?.success) onClose();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[92vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 sm:px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <ClipboardList size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">{submission.schoolName}</h2>
              <p className="text-xs text-gray-400 mt-0.5">ID: {submission._id?.slice(-8).toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TypeBadge type={submission.submissionType} />
            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-6">

          <div className="grid sm:grid-cols-2 gap-4">
            <DetailRow icon={MapPin}    label="State"          value={submission.state} />
            <DetailRow icon={Mail}      label="School Email"   value={submission.schoolEmail} />
            <DetailRow icon={User}      label="Evaluator"      value={submission.evaluatorName} />
            <DetailRow icon={Calendar}  label="Submitted"      value={submission.createdAt ? new Date(submission.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""} />
            {submission.visitDate && (
              <DetailRow icon={Calendar} label="Visit Date" value={new Date(submission.visitDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} />
            )}
          </div>

          {submission.submissionType === "pdf" && submission.pdfUrl && (
            <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-100 rounded-xl">
              <FileText size={20} className="text-purple-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-purple-800">PDF Document Available</p>
                <p className="text-xs text-purple-500 mt-0.5 truncate">{submission.pdfUrl}</p>
              </div>
              <a
                href={submission.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <Download size={12} /> Download
              </a>
            </div>
          )}

          {/* Web form summary */}
          {submission.submissionType === "web" && (
            <div className="space-y-3">
              {submission.schoolDoesWell?.some(Boolean) && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">What the School Does Well</p>
                  <ul className="space-y-1">
                    {submission.schoolDoesWell.filter(Boolean).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {submission.areasForImprovement?.some(Boolean) && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Areas for Improvement</p>
                  <ul className="space-y-1">
                    {submission.areasForImprovement.filter(Boolean).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <AlertCircle size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {submission.recommendations?.some(Boolean) && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Recommendations</p>
                  <ul className="space-y-1">
                    {submission.recommendations.filter(Boolean).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Status update */}
          <div className="border border-gray-100 rounded-xl p-4 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Update Status</p>
            <div className="flex gap-2 flex-wrap">
              {["pending", "reviewed", "archived"].map((s) => {
                const c = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                      status === s
                        ? `${c.bg} ${c.text} border-current`
                        : "border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status === s ? c.dot : "bg-gray-300"}`} />
                    {c.label}
                  </button>
                );
              })}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Admin notes (optional)…"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#082c2c] hover:bg-[#0e4a4a] rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? <><RefreshCw size={13} className="animate-spin" /> Saving…</> : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

export default function MandESubmissionsPage() {
  const { submissions, pagination, isLoading, filters, fetchSubmissions, setFilters, updateStatus } = useMandEStore();
  const { openConfirm } = useUIStore();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    // search param needs text index but we'll filter client-side for now
    fetchSubmissions({ ...filters, search, page: 1 });
  };

  const handleFilter = (key, value) => setFilters({ [key]: value });

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1;
  const currentPage = pagination?.page || 1;

  const handleStatusChange = async (id, status, adminNotes) => {
    return await updateStatus(id, status, adminNotes);
  };

  return (
    <div>
      <DashboardHeader title="M&E Submissions" subtitle="Monitor and evaluate school submissions" />

      <div className="p-4 sm:p-6 space-y-5">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total", value: pagination?.total ?? "—", icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Pending",  value: submissions.filter(s => s.status === "pending").length,  icon: Clock,        color: "text-amber-600",   bg: "bg-amber-50" },
            { label: "Reviewed", value: submissions.filter(s => s.status === "reviewed").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <s.icon size={16} className={s.color} />
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 tabular-nums leading-tight">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search school name…"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-gray-50 focus:bg-white"
              />
            </div>
            <button type="submit" className="px-4 py-2.5 bg-[#082c2c] text-white text-sm font-semibold rounded-xl hover:bg-[#0e4a4a] transition-colors">
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <Filter size={12} className="text-gray-400" />
              <span className="text-[11px] text-gray-400 font-medium">Filters:</span>
            </div>
            <select
              value={filters.status}
              onChange={(e) => handleFilter("status", e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filters.type}
              onChange={(e) => handleFilter("type", e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white"
            >
              <option value="">All types</option>
              <option value="web">Online Form</option>
              <option value="pdf">PDF Upload</option>
            </select>
            <select
              value={filters.state}
              onChange={(e) => handleFilter("state", e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white"
            >
              <option value="">All states</option>
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {(filters.status || filters.type || filters.state) && (
              <button
                onClick={() => setFilters({ status: "", type: "", state: "" })}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
              >
                <X size={11} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-6 py-3">School</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3">State</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3">Type</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => <tr key={i}><td colSpan={6}><SkeletonRow /></td></tr>)
                  : submissions.length === 0
                  ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <ClipboardList size={32} className="text-gray-200 mx-auto mb-3" />
                        <p className="text-sm text-gray-400">No submissions found</p>
                      </td>
                    </tr>
                  )
                  : submissions.map((sub, i) => (
                    <motion.tr
                      key={sub._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{sub.schoolName}</p>
                        {sub.evaluatorName && <p className="text-xs text-gray-400 mt-0.5">{sub.evaluatorName}</p>}
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600 whitespace-nowrap">{sub.state || "—"}</td>
                      <td className="px-4 py-4"><TypeBadge type={sub.submissionType} /></td>
                      <td className="px-4 py-4"><StatusBadge status={sub.status} /></td>
                      <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString("en-GB") : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setSelected(sub)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#24c2c2] hover:text-[#1a9999] transition-colors"
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </motion.tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-50">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
              : submissions.length === 0
              ? (
                <div className="py-16 text-center">
                  <ClipboardList size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">No submissions found</p>
                </div>
              )
              : submissions.map((sub) => (
                <motion.div
                  key={sub._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{sub.schoolName}</p>
                      <p className="text-xs text-gray-400">{sub.state || "—"} · {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString("en-GB") : ""}</p>
                    </div>
                    <StatusBadge status={sub.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <TypeBadge type={sub.submissionType} />
                    <button
                      onClick={() => setSelected(sub)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#24c2c2]"
                    >
                      <Eye size={13} /> View Details
                    </button>
                  </div>
                </motion.div>
              ))
            }
          </div>

          {/* Pagination */}
          {pagination && pagination.total > pagination.limit && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-50">
              <p className="text-xs text-gray-400">
                Showing {((currentPage - 1) * pagination.limit) + 1}–{Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setFilters({ page: currentPage - 1 })}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="text-xs font-medium text-gray-700 tabular-nums">{currentPage} / {totalPages}</span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setFilters({ page: currentPage + 1 })}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <DetailModal
            submission={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
