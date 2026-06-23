"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Trash2, MessageSquare, Send, X, ChevronRight } from "lucide-react";
import { useContactStore } from "@/store/contactStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton, SpinnerInline } from "../ui/DashLoader";

const STATUSES = ["", "new", "read", "replied", "archived"];

export default function ContactsPage() {
  const { contacts, stats, pagination, isLoading, filters, setFilters, fetchContacts, fetchStats, fetchContact, selected, updateContact, replyToContact, deleteContact } = useContactStore();
  const { openConfirm } = useUIStore();
  const [detail, setDetail] = useState(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => { fetchContacts(); fetchStats(); }, []);

  const handleSearch = (val) => {
    const f = { ...filters, search: val, page: 1 };
    setFilters(f); fetchContacts(f);
  };
  const handleStatusFilter = (status) => {
    const f = { ...filters, status, page: 1 };
    setFilters(f); fetchContacts(f);
  };
  const handlePageChange = (page) => {
    const f = { ...filters, page };
    setFilters(f); fetchContacts(f);
  };
  const openDetail = async (id) => {
    await fetchContact(id);
    setDetail(id);
  };
  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    const result = await replyToContact(detail, reply);
    if (result.success) setReply("");
    setSending(false);
  };
  const handleDelete = (id, name) => {
    openConfirm({ title: "Delete Contact", message: `Delete message from ${name}?`, danger: true, confirmLabel: "Delete", onConfirm: () => { deleteContact(id); setDetail(null); } });
  };

  const columns = [
    { header: "Name", render: (r) => <span className="font-medium text-gray-800 text-sm">{r.name}</span> },
    { header: "Email", render: (r) => <span className="text-xs text-gray-600">{r.email}</span> },
    { header: "Subject", render: (r) => <span className="text-xs text-gray-700 max-w-[180px] truncate block">{r.subject}</span> },
    { header: "Status", render: (r) => <Badge label={r.status} dot /> },
    { header: "Priority", render: (r) => <Badge label={r.priority} /> },
    { header: "Date", render: (r) => <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span> },
    { header: "", render: (r) => (
      <div className="flex gap-1">
        <button onClick={() => openDetail(r._id)} className="p-1.5 text-gray-400 hover:text-[#24c2c2] hover:bg-[#24c2c2]/10 rounded-lg transition-colors"><ChevronRight size={14} /></button>
        <button onClick={() => handleDelete(r._id, r.name)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
      </div>
    )},
  ];

  const selectedContact = contacts.find((c) => c._id === detail) || selected;

  return (
    <div>
      <DashboardHeader title="Contact Messages" subtitle="Review and respond to enquiries" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {!stats ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) : (
            <>
              <StatsCard icon={MessageSquare} label="Total" value={stats.total} color="teal" delay={0} />
              <StatsCard icon={MessageSquare} label="New" value={stats.new} color="amber" delay={0.05} />
              <StatsCard icon={MessageSquare} label="Replied" value={stats.replied} color="green" delay={0.1} />
              <StatsCard icon={MessageSquare} label="Archived" value={stats.archived} color="blue" delay={0.15} />
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search messages…" onChange={(e) => handleSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
            </div>
            <div className="flex gap-1">
              {STATUSES.map((s) => (
                <button key={s || "all"} onClick={() => handleStatusFilter(s)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${filters.status === s ? "bg-[#24c2c2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {s || "All"}
                </button>
              ))}
            </div>
            <button onClick={() => fetchContacts()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl ml-auto"><RefreshCw size={15} /></button>
          </div>
          <DataTable columns={columns} data={contacts} isLoading={isLoading} pagination={pagination} onPageChange={handlePageChange} emptyText="No messages found" />
        </div>

        {/* Detail slide-over */}
        <AnimatePresence>
          {detail && selectedContact && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)} />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="relative bg-white w-full max-w-lg shadow-2xl flex flex-col h-full z-10 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedContact.subject}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{selectedContact.name} &bull; {selectedContact.email}</p>
                  </div>
                  <button onClick={() => setDetail(null)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 flex-shrink-0"><X size={16} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    <Badge label={selectedContact.status} dot />
                    <Badge label={selectedContact.priority} />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                    <p className="text-xs text-gray-400 mt-3">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                  </div>
                  {(selectedContact.replies || []).map((r, i) => (
                    <div key={i} className="bg-[#24c2c2]/5 border border-[#24c2c2]/20 rounded-xl p-4 ml-4">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{r.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{r.sentBy?.name || "Admin"} &bull; {new Date(r.sentAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={3} placeholder="Write a reply…" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none" />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => updateContact(detail, { status: "archived" })} className="px-3 py-2 text-xs text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200">Archive</button>
                    <button onClick={handleReply} disabled={!reply.trim() || sending} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl disabled:opacity-50">
                      {sending ? <SpinnerInline size={14} color="#fff" /> : <Send size={14} />}
                      {sending ? "Sending…" : "Send Reply"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
