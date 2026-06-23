"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Trash2, Edit2, X, Newspaper, Eye,
  ExternalLink, AlertCircle, CheckCircle, Zap, Star,
} from "lucide-react";
import {
  useNssecNewsAdminStore,
  portableTextToString,
  slugify,
} from "@/store/nssecNewsAdminStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton } from "../ui/DashLoader";
import Badge from "../ui/Badge";

const STUDIO_URL = "https://nssec2.sanity.studio";

const EMPTY_FORM = {
  title: "", slug: "", excerpt: "", summary: "", body: "",
  status: "draft", publishedAt: "", cloudinaryUrl: "",
  hashtags: "", featuredNews: false, breakingNews: false, trendingNews: false,
};

export default function NssecNewsPage() {
  const {
    posts, isLoading, isSubmitting,
    fetchPosts, fetchPostBody, createPost, updatePost, deletePost,
  } = useNssecNewsAdminStore();
  const { openConfirm } = useUIStore();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const imageRef = useRef();

  useEffect(() => { fetchPosts(); }, []);

  const filtered = posts.filter((p) => {
    if (filter === "published" && p.status !== "published") return false;
    if (filter === "draft" && p.status !== "published" && p.status !== "draft") return false;
    if (filter === "draft" && p.status === "published") return false;
    if (search && !p.title?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status !== "published").length,
    breaking: posts.filter((p) => p.breakingNews).length,
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setShowModal(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
  };

  const openCreate = () => {
    setEditTarget(null);
    setForm({ ...EMPTY_FORM, publishedAt: new Date().toISOString().slice(0, 16) });
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = async (post) => {
    setEditTarget(post);
    setForm({
      title: post.title || "",
      slug: post.slug?.current || "",
      excerpt: post.excerpt || "",
      summary: "",
      body: "",
      status: post.status || "draft",
      publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16),
      cloudinaryUrl: post.imageUrl?.includes("cloudinary") ? post.imageUrl : "",
      hashtags: (post.hashtags || []).join(", "),
      featuredNews: post.featuredNews || false,
      breakingNews: post.breakingNews || false,
      trendingNews: post.trendingNews || false,
    });
    setImageFile(null);
    setShowModal(true);
    // Fetch body in the background
    const detail = await fetchPostBody(post._id);
    if (detail) {
      setForm((f) => ({
        ...f,
        summary: detail.summary || "",
        body: portableTextToString(detail.body),
      }));
    }
  };

  const handleTitleChange = (val) => {
    setForm((f) => ({
      ...f,
      title: val,
      ...(!editTarget && { slug: slugify(val) }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : new Date().toISOString(),
    };
    const result = editTarget
      ? await updatePost(editTarget._id, payload, imageFile)
      : await createPost(payload, imageFile);
    if (result.success) closeModal();
  };

  const handleDelete = (post) => {
    openConfirm({
      title: "Delete Article",
      message: `Permanently delete "${post.title}"? This cannot be undone.`,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: () => deletePost(post._id),
    });
  };

  return (
    <div>
      <DashboardHeader title="NSSEC News" subtitle="Create and manage NSSEC news articles in Sanity" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {isLoading && posts.length === 0 ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatsCard icon={Newspaper} label="Total" value={stats.total} color="teal" delay={0} />
              <StatsCard icon={CheckCircle} label="Published" value={stats.published} color="green" delay={0.05} />
              <StatsCard icon={AlertCircle} label="Drafts" value={stats.drafts} color="amber" delay={0.1} />
              <StatsCard icon={Zap} label="Breaking" value={stats.breaking} color="blue" delay={0.15} />
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
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
              />
            </div>
            <div className="flex gap-1">
              {["all", "published", "draft"].map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                    filter === f ? "bg-[#24c2c2] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
            <a href={STUDIO_URL} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#24c2c2] border border-[#24c2c2]/30 hover:bg-[#24c2c2]/5 rounded-xl transition-colors">
              <ExternalLink size={13} /> Sanity Studio
            </a>
            <button onClick={openCreate}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl">
              <Plus size={14} /> New Article
            </button>
          </div>

          <div className="overflow-x-auto">
            {isLoading && posts.length === 0 ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div key={i} className="h-14 bg-gray-100 rounded-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.07 }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Newspaper size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No articles found</p>
                <p className="text-xs text-gray-400 mt-1">Click "New Article" to get started</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Article</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Status</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Views</th>
                    <th className="text-left px-4 py-3 font-medium hidden xl:table-cell">Flags</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((post, i) => (
                    <motion.tr key={post._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-gray-50 hover:bg-gray-50 group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Newspaper size={14} className="text-teal-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate max-w-[220px]">{post.title}</p>
                            <p className="text-xs text-gray-400 font-mono">{post.slug?.current}</p>
                          </div>
                          {post.breakingNews && (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex-shrink-0">BREAKING</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {post.status || "draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-NG", {
                              day: "numeric", month: "short", year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Eye size={12} />{post.views || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {post.featuredNews && (
                            <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Featured</span>
                          )}
                          {post.trendingNews && (
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Trending</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(post)}
                            className="p-1.5 text-gray-400 hover:text-[#24c2c2] hover:bg-[#24c2c2]/10 rounded-lg" title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <a href={`${STUDIO_URL}/structure/nssecnews;${post._id}`} target="_blank" rel="noreferrer"
                            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg" title="Open in Sanity Studio">
                            <ExternalLink size={14} />
                          </a>
                          <button onClick={() => handleDelete(post)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg" title="Delete">
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

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal} />
            <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">
                  {editTarget ? "Edit Article" : "New Article"}
                </h3>
                {!isSubmitting && (
                  <button onClick={closeModal} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                    <X size={16} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                  <input required value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Article title" maxLength={120}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Slug *</label>
                  <input required value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                    placeholder="article-slug"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] font-mono text-xs" />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Excerpt * <span className="text-gray-400 font-normal">(listing page teaser)</span>
                  </label>
                  <textarea required rows={2} value={form.excerpt} maxLength={160}
                    onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                    placeholder="Short teaser shown on listing pages (max 160 chars)"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none" />
                  <p className="text-xs text-gray-400 text-right mt-0.5">{form.excerpt.length}/160</p>
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Summary <span className="text-gray-400 font-normal">(lead paragraph on article page)</span>
                  </label>
                  <textarea rows={3} value={form.summary}
                    onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                    placeholder="Intro shown at the top of the article"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none" />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Body <span className="text-gray-400 font-normal">(separate paragraphs with a blank line)</span>
                  </label>
                  <textarea rows={8} value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    placeholder={"First paragraph...\n\nSecond paragraph...\n\nThird paragraph..."}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-y" />
                  <p className="text-xs text-gray-400 mt-0.5">
                    For headings, links, and rich formatting — use{" "}
                    <a href={editTarget ? `${STUDIO_URL}/structure/nssecnews;${editTarget._id}` : STUDIO_URL}
                      target="_blank" rel="noreferrer" className="text-[#24c2c2] hover:underline">
                      Sanity Studio ↗
                    </a>
                  </p>
                </div>

                {/* Status + Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Status *</label>
                    <select value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-white">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Published At</label>
                    <input type="datetime-local" value={form.publishedAt}
                      onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Featured Image</label>
                  <div onClick={() => imageRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                      imageFile ? "border-[#24c2c2] bg-[#24c2c2]/5" : "border-gray-200 hover:border-[#24c2c2]"
                    }`}>
                    <input ref={imageRef} type="file" accept="image/*" className="hidden"
                      onChange={(e) => {
                        setImageFile(e.target.files[0] || null);
                        if (e.target.files[0]) setForm((f) => ({ ...f, cloudinaryUrl: "" }));
                      }} />
                    {imageFile
                      ? <p className="text-sm font-medium text-[#0e4a4a]">{imageFile.name}</p>
                      : <p className="text-sm text-gray-500">
                          Click to upload image{editTarget && " (leave empty to keep existing)"}
                        </p>}
                    <p className="text-xs text-gray-400 mt-0.5">JPEG, PNG, WebP — uploaded to Sanity</p>
                  </div>
                  <input value={form.cloudinaryUrl}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, cloudinaryUrl: e.target.value }));
                      if (e.target.value) setImageFile(null);
                    }}
                    placeholder="Or paste a Cloudinary URL"
                    className="mt-2 w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Hashtags <span className="text-gray-400 font-normal">(comma-separated, without #)</span>
                  </label>
                  <input value={form.hashtags}
                    onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))}
                    placeholder="NSSECNews, Education, Nigeria"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { key: "featuredNews", label: "Featured" },
                    { key: "breakingNews", label: "Breaking News" },
                    { key: "trendingNews", label: "Trending" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2.5 cursor-pointer select-none">
                      <div onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                        className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form[key] ? "bg-[#24c2c2]" : "bg-gray-200"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                      <span className="text-sm text-gray-600">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" disabled={isSubmitting} onClick={closeModal}
                    className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="flex-1 py-2.5 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium disabled:opacity-50">
                    {isSubmitting ? "Saving…" : editTarget ? "Save Changes" : "Create Article"}
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
