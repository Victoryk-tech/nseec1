"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Trash2, Edit2, X, FileText, Eye, ExternalLink,
  Globe, AlertCircle, TrendingUp, Loader2, CheckCircle, ImageOff,
} from "lucide-react";
import { usePressReleaseAdminStore } from "@/store/pressReleaseAdminStore";
import { portableTextToString, slugify } from "@/store/nssecNewsAdminStore";
import { useUIStore } from "@/store/uiStore";
import { sanityClient } from "@/app/lib/sanityClient";
import DashboardHeader from "../layout/DashboardHeader";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton } from "../ui/DashLoader";

const STUDIO_URL = "https://nssec2.sanity.studio";

function isValidUrl(v) {
  if (!v) return true;
  try { new URL(v); return true; } catch { return false; }
}
function isValidDomain(v) {
  if (!v) return true;
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}/.test(v);
}

const EMPTY_FORM = {
  title: "", slug: "", description: "", summary: "", body: "",
  sourceUrl: "", sourceName: "", sourceDomain: "",
  urlMetadata: null,
  categoryIds: [], tagIds: [],
  breaking: false, trending: false,
  publishedAt: "", hashtags: "",
};

export default function PressReleasePage() {
  const {
    posts, isLoading, isSubmitting,
    fetchPosts, fetchPostBody, createPost, updatePost, deletePost,
  } = usePressReleaseAdminStore();
  const { openConfirm } = useUIStore();

  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [metaFetching, setMetaFetching] = useState(false);
  const [metaWarning, setMetaWarning] = useState("");
  const metaTimerRef = useRef(null);

  useEffect(() => { fetchPosts(); }, []);

  // Load categories and tags from Sanity
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "newsCategory"] | order(title asc){ _id, title, "slug": slug.current }`)
      .then(setCategories)
      .catch(() => {});
    sanityClient
      .fetch(`*[_type == "tag"] | order(title asc){ _id, title, "slug": slug.current, category }`)
      .then(setTags)
      .catch(() => {});
  }, []);

  const filtered = posts.filter((p) =>
    !search || p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: posts.length,
    thisMonth: posts.filter((p) => {
      const d = new Date(p.publishedAt || p._createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    breaking: posts.filter((p) => p.breaking).length,
    trending: posts.filter((p) => p.trending).length,
  };

  const closeModal = () => {
    if (isSubmitting) return;
    clearTimeout(metaTimerRef.current);
    setShowModal(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setMetaFetching(false);
    setMetaWarning("");
  };

  const openCreate = () => {
    setEditTarget(null);
    setForm({ ...EMPTY_FORM, publishedAt: new Date().toISOString().slice(0, 16) });
    setFormErrors({});
    setMetaFetching(false);
    setMetaWarning("");
    setShowModal(true);
  };

  const openEdit = async (post) => {
    setEditTarget(post);
    setMetaWarning("");
    setMetaFetching(false);
    setForm({
      title: post.title || "",
      slug: post.slug?.current || "",
      description: post.description || "",
      summary: post.summary || "",
      body: "",
      sourceUrl: post.sourceUrl || "",
      sourceName: post.source?.name || post.sourceName || "",
      sourceDomain: post.source?.domain || post.sourceDomain || "",
      urlMetadata: post.urlMetadata || null,
      categoryIds: (post.categories || []).map((c) => c._id),
      tagIds: (post.tags || []).map((t) => t._id),
      breaking: post.breaking || false,
      trending: post.trending || false,
      publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16),
      hashtags: (post.hashtags || []).join(", "),
    });
    setFormErrors({});
    setShowModal(true);
    const detail = await fetchPostBody(post._id);
    if (detail) {
      setForm((f) => ({ ...f, body: portableTextToString(detail.content) }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.sourceUrl && !isValidUrl(form.sourceUrl)) errs.sourceUrl = "Enter a valid URL (include https://)";
    if (form.sourceDomain && !isValidDomain(form.sourceDomain)) errs.sourceDomain = "Enter a valid domain (e.g. vanguardngr.com)";
    return errs;
  };

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setFormErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const handleTitleChange = (val) => {
    setForm((f) => ({ ...f, title: val, ...(!editTarget && { slug: slugify(val) }) }));
    setFormErrors((e) => { const n = { ...e }; delete n.title; return n; });
  };

  const toggleCategory = (id) => {
    setForm((f) => ({
      ...f,
      categoryIds: f.categoryIds.includes(id)
        ? f.categoryIds.filter((c) => c !== id)
        : [...f.categoryIds, id],
    }));
  };

  const toggleTag = (id) => {
    setForm((f) => ({
      ...f,
      tagIds: f.tagIds.includes(id)
        ? f.tagIds.filter((t) => t !== id)
        : [...f.tagIds, id],
    }));
  };

  // Auto-fetch URL metadata with 800ms debounce when sourceUrl changes
  const fetchUrlMetadata = useCallback((url) => {
    clearTimeout(metaTimerRef.current);
    if (!url || !isValidUrl(url)) {
      setMetaWarning("");
      return;
    }
    metaTimerRef.current = setTimeout(async () => {
      setMetaFetching(true);
      setMetaWarning("");
      try {
        const res = await fetch(`/api/url-metadata?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        if (data.error) {
          setMetaWarning(`Could not fetch metadata: ${data.error}. Source name/image will not be auto-populated.`);
          setForm((f) => ({ ...f, urlMetadata: null }));
        } else {
          setForm((f) => ({
            ...f,
            urlMetadata: {
              image: data.image || null,
              title: data.title || null,
              description: data.description || null,
              siteName: data.siteName || null,
              favicon: data.favicon || null,
            },
            // Auto-populate source fields only if they are currently empty
            sourceName: f.sourceName || data.siteName || data.domain || f.sourceName,
            sourceDomain: f.sourceDomain || data.domain || f.sourceDomain,
          }));
          if (!data.image) {
            setMetaWarning("Metadata fetched but no preview image found for this URL.");
          }
        }
      } catch {
        setMetaWarning("Failed to reach the URL. Source metadata will not be auto-populated.");
        setForm((f) => ({ ...f, urlMetadata: null }));
      } finally {
        setMetaFetching(false);
      }
    }, 800);
  }, []);

  const handleSourceUrlChange = (val) => {
    setField("sourceUrl", val);
    fetchUrlMetadata(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    const payload = {
      ...form,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : new Date().toISOString(),
    };
    const result = editTarget
      ? await updatePost(editTarget._id, payload)
      : await createPost(payload);
    if (result?.success) {
      closeModal();
      fetch("/api/email/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "press-release",
          data: { title: form.title, description: form.description, sourceUrl: form.sourceUrl, sourceName: form.sourceName },
        }),
      }).catch(() => {});
    }
  };

  const handleDelete = (post) => {
    openConfirm({
      title: "Delete Press Release",
      message: `Permanently delete "${post.title}"? This cannot be undone.`,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: () => deletePost(post._id),
    });
  };

  return (
    <div>
      <DashboardHeader title="Press Release" subtitle="Create and manage official NSSEC press releases" />
      <div className="p-6 space-y-6 max-w-[1400px]">

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {isLoading && posts.length === 0 ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatsCard icon={FileText} label="Total" value={stats.total} color="teal" delay={0} />
              <StatsCard icon={Plus} label="This Month" value={stats.thisMonth} color="green" delay={0.05} />
              <StatsCard icon={AlertCircle} label="Breaking" value={stats.breaking} color="red" delay={0.1} />
              <StatsCard icon={TrendingUp} label="Trending" value={stats.trending} color="blue" delay={0.15} />
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
                placeholder="Search press releases…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]"
              />
            </div>
            <a href={STUDIO_URL} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#24c2c2] border border-[#24c2c2]/30 hover:bg-[#24c2c2]/5 rounded-xl transition-colors">
              <ExternalLink size={13} /> Sanity Studio
            </a>
            <button onClick={openCreate}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl">
              <Plus size={14} /> New Press Release
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
                  <FileText size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No press releases yet</p>
                <p className="text-xs text-gray-400 mt-1">Click "New Press Release" to get started</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Title</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Categories</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Source</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Views</th>
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
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText size={14} className="text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium text-gray-800 truncate max-w-[220px]">{post.title}</p>
                              {post.breaking && <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded font-bold">BREAKING</span>}
                              {post.trending && <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded font-bold">TRENDING</span>}
                            </div>
                            <p className="text-xs text-gray-400 font-mono">{post.slug?.current}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {(post.categories || []).slice(0, 2).map((c) => (
                            <span key={c._id} className="text-[10px] px-2 py-0.5 rounded-full bg-[#24c2c2]/10 text-[#0e4f6b] font-medium">{c.title}</span>
                          ))}
                          {!post.categories?.length && <span className="text-gray-400 text-xs">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        {(post.source?.name || post.sourceName) ? (
                          <span className="text-xs text-gray-600 flex items-center gap-1">
                            <Globe size={11} className="text-gray-400" />
                            {post.source?.name || post.sourceName}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Eye size={12} />{post.views || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(post)}
                            className="p-1.5 text-gray-400 hover:text-[#24c2c2] hover:bg-[#24c2c2]/10 rounded-lg" title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <a href={`${STUDIO_URL}/structure/mediaPost;${post._id}`} target="_blank" rel="noreferrer"
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
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-900">
                  {editTarget ? "Edit Press Release" : "New Press Release"}
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
                    placeholder="Press release title" maxLength={120}
                    className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] ${formErrors.title ? "border-red-400" : "border-gray-200"}`} />
                  {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Slug *</label>
                  <input required value={form.slug}
                    onChange={(e) => setField("slug", slugify(e.target.value))}
                    placeholder="press-release-slug"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] font-mono text-xs" />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Description / Excerpt * <span className="text-gray-400 font-normal">(max 200 chars)</span>
                  </label>
                  <textarea required rows={2} value={form.description} maxLength={200}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Brief description shown in the listing"
                    className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none ${formErrors.description ? "border-red-400" : "border-gray-200"}`} />
                  <div className="flex justify-between">
                    {formErrors.description && <p className="text-xs text-red-500">{formErrors.description}</p>}
                    <p className="text-xs text-gray-400 text-right ml-auto">{form.description.length}/200</p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Summary <span className="text-gray-400 font-normal">(lead paragraph on detail page)</span>
                  </label>
                  <textarea rows={4} value={form.summary}
                    onChange={(e) => setField("summary", e.target.value)}
                    placeholder="Full lead paragraph summarising the press release…"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] resize-none" />
                </div>

                {/* Source URL — auto-fetches metadata on paste */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                    <Globe size={12} /> Source URL
                    <span className="text-gray-400 font-normal ml-1">— paste URL to auto-fetch preview image &amp; metadata</span>
                  </label>
                  <div className="relative">
                    <input value={form.sourceUrl}
                      onChange={(e) => handleSourceUrlChange(e.target.value)}
                      placeholder="https://businessday.ng/education/nssec-guidelines"
                      className={`w-full px-3 py-2.5 pr-9 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] ${formErrors.sourceUrl ? "border-red-400" : "border-gray-200"}`} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      {metaFetching && <Loader2 size={14} className="animate-spin text-[#24c2c2]" />}
                      {!metaFetching && form.urlMetadata?.image && <CheckCircle size={14} className="text-green-500" />}
                      {!metaFetching && form.sourceUrl && !form.urlMetadata?.image && metaWarning && <ImageOff size={14} className="text-amber-400" />}
                    </span>
                  </div>
                  {formErrors.sourceUrl && <p className="text-xs text-red-500 mt-1">{formErrors.sourceUrl}</p>}

                  {/* Metadata preview card */}
                  {form.urlMetadata && (
                    <div className="mt-2 flex gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      {form.urlMetadata.image ? (
                        <img src={form.urlMetadata.image} alt="preview"
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                          onError={(e) => (e.target.style.display = "none")} />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <ImageOff size={18} className="text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {form.urlMetadata.favicon && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <img src={form.urlMetadata.favicon} alt=""
                              className="w-3.5 h-3.5 rounded-sm"
                              onError={(e) => (e.target.style.display = "none")} />
                            <span className="text-[11px] font-semibold text-[#0e4f6b]">
                              {form.urlMetadata.siteName || form.sourceDomain}
                            </span>
                          </div>
                        )}
                        <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">
                          {form.urlMetadata.title}
                        </p>
                        {form.urlMetadata.description && (
                          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{form.urlMetadata.description}</p>
                        )}
                      </div>
                      <button type="button"
                        onClick={() => { setForm((f) => ({ ...f, urlMetadata: null })); setMetaWarning(""); }}
                        className="self-start text-gray-300 hover:text-gray-500 flex-shrink-0">
                        <X size={13} />
                      </button>
                    </div>
                  )}

                  {metaWarning && !form.urlMetadata && (
                    <p className="mt-1.5 text-xs text-amber-600 flex items-start gap-1">
                      <AlertCircle size={12} className="flex-shrink-0 mt-0.5" /> {metaWarning}
                    </p>
                  )}
                </div>

                {/* Source Name + Domain (auto-populated, editable) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Source Name <span className="text-gray-400 font-normal">(auto-populated)</span>
                    </label>
                    <input value={form.sourceName}
                      onChange={(e) => setField("sourceName", e.target.value)}
                      placeholder="Vanguard Nigeria"
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Source Domain <span className="text-gray-400 font-normal">(auto-populated)</span>
                    </label>
                    <input value={form.sourceDomain}
                      onChange={(e) => setField("sourceDomain", e.target.value)}
                      placeholder="vanguardngr.com"
                      className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] ${formErrors.sourceDomain ? "border-red-400" : "border-gray-200"}`} />
                    {formErrors.sourceDomain && <p className="text-xs text-red-500 mt-1">{formErrors.sourceDomain}</p>}
                  </div>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <button key={c._id} type="button"
                          onClick={() => toggleCategory(c._id)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            form.categoryIds.includes(c._id)
                              ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                              : "border-gray-200 text-gray-600 hover:border-[#24c2c2]"
                          }`}>
                          {c.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                      {tags.filter((t) => !t.category || t.category === "press-release" || t.category === "general").map((t) => (
                        <button key={t._id} type="button"
                          onClick={() => toggleTag(t._id)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            form.tagIds.includes(t._id)
                              ? "bg-[#0e4f6b] text-white border-[#0e4f6b]"
                              : "border-gray-200 text-gray-600 hover:border-[#0e4f6b]"
                          }`}>
                          {t.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Breaking + Trending toggles */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.breaking}
                      onChange={(e) => setField("breaking", e.target.checked)}
                      className="w-4 h-4 accent-red-500 rounded" />
                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <AlertCircle size={12} className="text-red-500" /> Breaking News
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.trending}
                      onChange={(e) => setField("trending", e.target.checked)}
                      className="w-4 h-4 accent-[#24c2c2] rounded" />
                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <TrendingUp size={12} className="text-[#24c2c2]" /> Trending
                    </span>
                  </label>
                </div>

                {/* Published At */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Published At</label>
                  <input type="datetime-local" value={form.publishedAt}
                    onChange={(e) => setField("publishedAt", e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Hashtags <span className="text-gray-400 font-normal">(comma-separated, without #)</span>
                  </label>
                  <input value={form.hashtags}
                    onChange={(e) => setField("hashtags", e.target.value)}
                    placeholder="NSSEC, PressRelease, Nigeria"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" disabled={isSubmitting} onClick={closeModal}
                    className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="flex-1 py-2.5 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium disabled:opacity-50">
                    {isSubmitting ? "Saving…" : editTarget ? "Save Changes" : "Create Press Release"}
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
