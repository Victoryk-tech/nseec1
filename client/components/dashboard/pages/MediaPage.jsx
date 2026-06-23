"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Search, Trash2, Filter, Grid3X3, List, X, FileText, Film, Music, ImageIcon } from "lucide-react";
import { useMediaStore } from "@/store/mediaStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton, UploadProgress } from "../ui/DashLoader";
import Badge from "../ui/Badge";

const TYPE_ICONS = { image: ImageIcon, video: Film, document: FileText, audio: Music };
const TYPES = ["", "image", "video", "document", "audio"];

export default function MediaPage() {
  const { media, stats, pagination, isLoading, isUploading, uploadProgress, filters, setFilters, fetchMedia, fetchStats, uploadMedia, updateMedia, deleteMedia } = useMediaStore();
  const { openConfirm } = useUIStore();
  const [view, setView] = useState("grid");
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", tags: "", alt: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  useEffect(() => { fetchMedia(); fetchStats(); }, []);

  const handleTypeFilter = (type) => {
    const f = { ...filters, type, page: 1 };
    setFilters(f); fetchMedia(f);
  };
  const handleSearch = (val) => {
    const f = { ...filters, search: val, page: 1 };
    setFilters(f); fetchMedia(f);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const fd = new FormData();
    fd.append("file", selectedFile);
    Object.entries(uploadForm).forEach(([k, v]) => { if (v) fd.append(k, v); });
    const result = await uploadMedia(fd);
    if (result.success) { setShowUpload(false); setSelectedFile(null); setUploadForm({ title: "", description: "", tags: "", alt: "" }); }
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) { setSelectedFile(file); setShowUpload(true); }
  };

  const handleDelete = (id, title) => {
    openConfirm({ title: "Delete Media", message: `Permanently delete "${title}"? This cannot be undone.`, danger: true, confirmLabel: "Delete", onConfirm: () => deleteMedia(id) });
  };

  const formatSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div>
      <DashboardHeader title="Media Library" subtitle="Manage images, videos, and documents" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {!stats ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) : (
            <>
              <StatsCard icon={ImageIcon} label="Total Files" value={stats.total} color="teal" delay={0} />
              <StatsCard icon={ImageIcon} label="Images" value={stats.images} color="green" delay={0.05} />
              <StatsCard icon={Film} label="Videos" value={stats.videos} color="amber" delay={0.1} />
              <StatsCard icon={FileText} label="Documents" value={stats.documents} color="blue" delay={0.15} />
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search files…" onChange={(e) => handleSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
            </div>
            <div className="flex gap-1">
              {TYPES.map((t) => (
                <button key={t || "all"} onClick={() => handleTypeFilter(t)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${filters.type === t ? "bg-[#24c2c2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {t || "All"}
                </button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
                {view === "grid" ? <List size={15} /> : <Grid3X3 size={15} />}
              </button>
              <button onClick={() => setShowUpload(true)} className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl">
                <Upload size={14} /> Upload
              </button>
            </div>
          </div>

          <div className="p-4" onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}>
            {isLoading ? (
              <div className={`grid gap-4 ${view === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : ""}`}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div key={i} className={`${view === "grid" ? "h-40" : "h-12"} bg-gray-100 rounded-xl`} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.05 }} />
                ))}
              </div>
            ) : media.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4"><Upload size={24} className="text-gray-400" /></div>
                <p className="text-gray-500 text-sm">No media files yet</p>
                <p className="text-xs text-gray-400 mt-1">Drop files here or click Upload</p>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {media.map((item, i) => {
                  const Icon = TYPE_ICONS[item.type] || FileText;
                  return (
                    <motion.div key={item._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="group relative rounded-xl overflow-hidden border border-gray-100 hover:border-[#24c2c2]/40 bg-gray-50 aspect-square">
                      {item.type === "image" ? (
                        <img src={item.secureUrl || item.url} alt={item.alt || item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Icon size={32} className="text-gray-400" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-2">
                        <p className="text-white text-xs font-medium text-center truncate w-full">{item.title}</p>
                        <p className="text-white/60 text-[10px]">{formatSize(item.size)}</p>
                        <button onClick={() => handleDelete(item._id, item.title)} className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600"><Trash2 size={12} /></button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1">
                {media.map((item, i) => {
                  const Icon = TYPE_ICONS[item.type] || FileText;
                  return (
                    <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 group">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.type === "image" ? <img src={item.secureUrl || item.url} alt="" className="w-10 h-10 object-cover rounded-lg" /> : <Icon size={18} className="text-gray-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                        <p className="text-xs text-gray-400">{formatSize(item.size)} &bull; {item.format?.toUpperCase() || item.type}</p>
                      </div>
                      <Badge label={item.type} />
                      <p className="text-xs text-gray-400 hidden sm:block">{new Date(item.createdAt).toLocaleDateString()}</p>
                      <button onClick={() => handleDelete(item._id, item.title)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Upload modal */}
        <AnimatePresence>
          {showUpload && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isUploading && setShowUpload(false)} />
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md z-10">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-gray-900">Upload File</h3>
                  {!isUploading && <button onClick={() => setShowUpload(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><X size={16} /></button>}
                </div>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${selectedFile ? "border-[#24c2c2] bg-[#24c2c2]/5" : "border-gray-200 hover:border-[#24c2c2]"}`}
                  >
                    <input ref={fileRef} type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <Upload size={24} className={`mx-auto mb-2 ${selectedFile ? "text-[#24c2c2]" : "text-gray-400"}`} />
                    {selectedFile ? <p className="text-sm font-medium text-[#0e4a4a]">{selectedFile.name}</p> : <p className="text-sm text-gray-500">Click or drag to select a file</p>}
                  </div>
                  <input value={uploadForm.title} onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })} placeholder="Title (optional)" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  <input value={uploadForm.tags} onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })} placeholder="Tags (comma separated)" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  {isUploading && <UploadProgress percent={uploadProgress} />}
                  <div className="flex gap-3">
                    <button type="button" disabled={isUploading} onClick={() => setShowUpload(false)} className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50">Cancel</button>
                    <button type="submit" disabled={!selectedFile || isUploading} className="flex-1 py-2.5 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium disabled:opacity-50">
                      {isUploading ? "Uploading…" : "Upload"}
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
