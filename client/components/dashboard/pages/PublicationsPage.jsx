"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Search, Trash2, Edit2, X, FileText, BookOpen,
  Download, Eye, Star, Filter, ChevronDown,
} from "lucide-react";
import { usePublicationAdminStore } from "@/store/publicationStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton, UploadProgress } from "../ui/DashLoader";
import Badge from "../ui/Badge";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "reports", label: "Reports" },
  { value: "digest", label: "Digest" },
  { value: "research-journals", label: "Research / Journals" },
  { value: "nssec-establishment-act", label: "Establishment Act" },
  { value: "national-policy-sse", label: "National Policy" },
  { value: "minimum-standards", label: "Minimum Standards" },
  { value: "implementation-guidelines", label: "Impl. Guidelines" },
];

const MONTHS = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const EMPTY_FORM = {
  title: "", description: "", category: "", author: "",
  yearOfPublication: "", monthOfPublication: "", pageCount: "",
  featured: false, tags: "",
};

export default function PublicationsPage() {
  const {
    publications, stats, pagination, isLoading, isUploading, uploadProgress,
    filters, setFilters, fetchPublications, fetchStats,
    createPublication, updatePublication, deletePublication, validateFiles,
  } = usePublicationAdminStore();
  const { openConfirm } = useUIStore();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [pubFile, setPubFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const pubFileRef = useRef();
  const coverFileRef = useRef();

  useEffect(() => { fetchPublications(); fetchStats(); }, []);

  const handleSearch = (val) => {
    const f = { ...filters, search: val, page: 1 };
    setFilters(f); fetchPublications(f);
  };

  const handleCategoryFilter = (category) => {
    const f = { ...filters, category, page: 1 };
    setFilters(f); fetchPublications(f);
  };

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setPubFile(null);
    setCoverFile(null);
    setFileError("");
    setShowModal(true);
  };

  const openEdit = (pub) => {
    setEditTarget(pub);
    setForm({
      title: pub.title || "",
      description: pub.description || "",
      category: pub.category || "",
      author: pub.author || "",
      yearOfPublication: pub.yearOfPublication || "",
      monthOfPublication: pub.monthOfPublication || "",
      pageCount: pub.pageCount || "",
      featured: pub.featured || false,
      tags: (pub.tags || []).join(", "),
    });
    setPubFile(null);
    setCoverFile(null);
    setFileError("");
    setShowModal(true);
  };

  const handlePubFileChange = (file) => {
    setFileError("");
    if (!file) return setPubFile(null);
    const check = validateFiles(file, null);
    if (!check.valid) { setFileError(check.message); return; }
    setPubFile(file);
  };

  const handleCoverFileChange = (file) => {
    setFileError("");
    if (!file) return setCoverFile(null);
    const check = validateFiles(null, file);
    if (!check.valid) { setFileError(check.message); return; }
    setCoverFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileError("");

    if (!editTarget && !pubFile) {
      setFileError("Publication file is required");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) fd.append(k, v);
    });
    if (pubFile) fd.append("file", pubFile);
    if (coverFile) fd.append("coverImage", coverFile);

    const result = editTarget
      ? await updatePublication(editTarget._id, fd)
      : await createPublication(fd);

    if (result.success) {
      setShowModal(false);
      setEditTarget(null);
      setForm(EMPTY_FORM);
      setPubFile(null);
      setCoverFile(null);
      fetchStats();
    }
  };

  const handleDelete = (pub) => {
    openConfirm({
      title: "Delete Publication",
      message: `Permanently delete "${pub.title}"? This cannot be undone.`,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: () => deletePublication(pub._id),
    });
  };

  const formatSize = (s) => s || "—";

  return (
    <div>
      <DashboardHeader title="Publications" subtitle="Manage NSSEC publications and documents" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {!stats ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatsCard icon={BookOpen} label="Total" value={stats.total} color="teal" delay={0} />
              {(stats.byCategory || []).slice(0, 3).map((c, i) => (
                <StatsCard
                  key={c._id}
                  icon={FileText}
                  label={CATEGORIES.find((x) => x.value === c._id)?.label || c._id}
                  value={c.count}
                  color={["green", "blue", "amber"][i]}
                  delay={(i + 1) * 0.05}
                />
              ))}
            </>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search publications…"
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
              />
            </div>
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white"
              >
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl ml-auto"
            >
              <Upload size={14} /> Upload Publication
            </button>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i} className="h-14 bg-gray-100 rounded-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.07 }} />
                ))}
              </div>
            ) : publications.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No publications yet</p>
                <p className="text-xs text-gray-400 mt-1">Click "Upload Publication" to get started</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Title</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Year</th>
                    <th className="text-left px-4 py-3 font-medium hidden xl:table-cell">Size</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Views</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Downloads</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((pub, i) => (
                    <motion.tr
                      key={pub._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-gray-50 hover:bg-gray-50 group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText size={14} className="text-emerald-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate max-w-[220px]">{pub.title}</p>
                            {pub.author && <p className="text-xs text-gray-400 truncate">{pub.author}</p>}
                          </div>
                          {pub.featured && <Star size={12} className="text-amber-400 flex-shrink-0" fill="currentColor" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge label={CATEGORIES.find((c) => c.value === pub.category)?.label || pub.category} />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-500">
                        {pub.yearOfPublication || "—"}
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell text-gray-500">
                        {formatSize(pub.fileSize)}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Eye size={12} />{pub.views || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Download size={12} />{pub.downloadCount || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEdit(pub)}
                            className="p-1.5 text-gray-400 hover:text-[#24c2c2] hover:bg-[#24c2c2]/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <a
                            href={pub.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download size={14} />
                          </a>
                          <button
                            onClick={() => handleDelete(pub)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Upload / Edit modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => !isUploading && setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">
                  {editTarget ? "Edit Publication" : "Upload Publication"}
                </h3>
                {!isUploading && (
                  <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                    <X size={16} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Publication file */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Publication File (PDF / Word){!editTarget && " *"}
                  </label>
                  <div
                    onClick={() => pubFileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                      pubFile ? "border-[#24c2c2] bg-[#24c2c2]/5" : "border-gray-200 hover:border-[#24c2c2]"
                    }`}
                  >
                    <input
                      ref={pubFileRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handlePubFileChange(e.target.files[0])}
                    />
                    <FileText size={20} className={`mx-auto mb-1.5 ${pubFile ? "text-[#24c2c2]" : "text-gray-400"}`} />
                    {pubFile ? (
                      <p className="text-sm font-medium text-[#0e4a4a]">{pubFile.name}</p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {editTarget ? "Replace file (leave empty to keep existing)" : "Click to select PDF or Word document"}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Max 50MB • Large files are flagged for review</p>
                  </div>
                </div>

                {/* Cover image */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Cover Image (optional)
                  </label>
                  <div
                    onClick={() => coverFileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                      coverFile ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-400"
                    }`}
                  >
                    <input
                      ref={coverFileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleCoverFileChange(e.target.files[0])}
                    />
                    {coverFile ? (
                      <p className="text-sm font-medium text-emerald-700">{coverFile.name}</p>
                    ) : (
                      <p className="text-sm text-gray-500">Click to select cover image (auto-compressed)</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">Max 10MB • JPEG, PNG, WebP</p>
                  </div>
                </div>

                {fileError && (
                  <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{fileError}</p>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Publication title"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Abstract / Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of the publication (max 500 characters)"
                    maxLength={500}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none"
                  />
                  <p className="text-xs text-gray-400 text-right mt-0.5">{form.description.length}/500</p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.filter((c) => c.value).map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Author + Year + Month row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Author / Publisher</label>
                    <input
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="e.g. NSSEC"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
                    <input
                      type="number"
                      min={1900}
                      max={new Date().getFullYear()}
                      value={form.yearOfPublication}
                      onChange={(e) => setForm({ ...form, yearOfPublication: e.target.value })}
                      placeholder="e.g. 2024"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
                    />
                  </div>
                </div>

                {/* Month + Page count */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Month</label>
                    <select
                      value={form.monthOfPublication}
                      onChange={(e) => setForm({ ...form, monthOfPublication: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white"
                    >
                      {MONTHS.map((m, i) => (
                        <option key={i} value={i || ""}>{i === 0 ? "Select month" : m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Page Count</label>
                    <input
                      type="number"
                      min={1}
                      value={form.pageCount}
                      onChange={(e) => setForm({ ...form, pageCount: e.target.value })}
                      placeholder="e.g. 48"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma-separated)</label>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="e.g. policy, standards, 2024"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
                  />
                </div>

                {/* Featured toggle */}
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, featured: !form.featured })}
                    className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? "bg-[#24c2c2]" : "bg-gray-200"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-gray-600">Featured publication</span>
                </label>

                {isUploading && <UploadProgress percent={uploadProgress} />}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 py-2.5 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium disabled:opacity-50"
                  >
                    {isUploading
                      ? `Uploading ${uploadProgress}%…`
                      : editTarget ? "Save Changes" : "Upload & Notify"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
