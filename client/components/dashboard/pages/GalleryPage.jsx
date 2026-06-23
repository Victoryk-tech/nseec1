"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Images, Plus, Trash2, Edit2, Eye, X, Upload,
  ImageIcon, Video, Star, Hash,
} from "lucide-react";
import toast from "react-hot-toast";
import { useGalleryAdminStore } from "@/store/galleryStore";
import { useUIStore } from "@/store/uiStore";
import DashboardHeader from "../layout/DashboardHeader";
import StatsCard from "../ui/StatsCard";
import { StatCardSkeleton } from "../ui/DashLoader";

const EMPTY_FORM = {
  title: "",
  description: "",
  hashtags: "",
  featured: false,
};

export default function GalleryPage() {
  const {
    albums, stats, isLoading, isSubmitting, uploadProgress, error,
    fetchAlbums, fetchStats, createAlbum, updateAlbum, deleteAlbum, removeImage,
  } = useGalleryAdminStore();
  const { openConfirm } = useUIStore();

  const [modal, setModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageCaptions, setImageCaptions] = useState([]);
  const [videoCaptions, setVideoCaptions] = useState([]);
  const [viewAlbum, setViewAlbum] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    fetchAlbums();
    fetchStats();
  }, []);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setImageFiles([]);
    setVideoFiles([]);
    setImagePreviews([]);
    setImageCaptions([]);
    setVideoCaptions([]);
    setModal(true);
  };

  const openEdit = (album) => {
    setEditTarget(album);
    setForm({
      title: album.title || "",
      description: album.description || "",
      hashtags: album.hashtags?.join(", ") || "",
      featured: album.featured || false,
    });
    setImageFiles([]);
    setVideoFiles([]);
    setImagePreviews([]);
    setImageCaptions([]);
    setVideoCaptions([]);
    setModal(true);
  };

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    setImageCaptions((prev) => [...prev, ...files.map(() => "")]);
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreviews((prev) => [...prev, ev.target.result]);
      reader.readAsDataURL(f);
    });
  };

  const handleVideoFiles = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles((prev) => [...prev, ...files]);
    setVideoCaptions((prev) => [...prev, ...files.map(() => "")]);
  };

  const removeNewImage = (idx) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
    setImageCaptions((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeNewVideo = (idx) => {
    setVideoFiles((prev) => prev.filter((_, i) => i !== idx));
    setVideoCaptions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    if (!editTarget && imageFiles.length === 0 && videoFiles.length === 0) {
      return toast.error("Add at least one image or video");
    }

    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("description", form.description.trim());
    fd.append("featured", form.featured);
    form.hashtags
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
      .forEach((h) => fd.append("hashtags", h));

    imageFiles.forEach((f) => fd.append("images", f));
    imageCaptions.forEach((c) => fd.append("imageCaptions", c));
    imageCaptions.forEach((_, i) => fd.append("imageAltTexts", imageFiles[i]?.name || ""));

    videoFiles.forEach((f) => fd.append("videos", f));
    videoCaptions.forEach((c) => fd.append("videoCaptions", c));

    const result = editTarget
      ? await updateAlbum(editTarget._id, fd)
      : await createAlbum(fd);

    if (result.success) {
      toast.success(editTarget ? "Album updated" : "Album created");
      setModal(false);
      fetchStats();
    } else {
      toast.error(result.error || "Failed");
    }
  };

  const handleDelete = (album) => {
    openConfirm({
      title: "Delete Album",
      message: `"${album.title}" and all its photos/videos will be permanently deleted.`,
      danger: true,
      confirmLabel: "Delete",
      onConfirm: async () => {
        const result = await deleteAlbum(album._id);
        if (result.success) {
          toast.success("Album deleted");
          fetchStats();
        } else {
          toast.error(result.error || "Delete failed");
        }
      },
    });
  };

  const handleRemoveExistingImage = async (albumId, cloudinaryId) => {
    const result = await removeImage(albumId, cloudinaryId);
    if (result.success) {
      toast.success("Image removed");
      if (viewAlbum?._id === albumId) {
        setViewAlbum((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.cloudinaryId !== cloudinaryId),
        }));
      }
    } else {
      toast.error(result.error || "Failed to remove image");
    }
  };

  return (
    <div>
      <DashboardHeader title="Photo Gallery" subtitle="Manage gallery albums and media" />

      <div className="p-6 space-y-6 max-w-[1400px]">
        {/* Action row */}
        <div className="flex items-center justify-end">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#082c2c] hover:bg-[#0e4a4a] text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> New Album
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {!stats
            ? Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
            : (
              <>
                <StatsCard icon={Images} label="Total Albums" value={stats.totalAlbums} color="amber" delay={0} />
                <StatsCard icon={ImageIcon} label="Total Images" value={stats.totalImages} color="teal" delay={0.05} />
                <StatsCard icon={Eye} label="Total Views" value={stats.totalViews} color="blue" delay={0.1} />
              </>
            )}
        </div>

        {/* Albums grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-xl">
            <Images className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-lg font-semibold text-gray-400 mb-1">No albums yet</p>
            <p className="text-xs text-gray-400 mb-4">Create your first gallery album</p>
            <button
              onClick={openCreate}
              className="px-5 py-2.5 bg-[#082c2c] text-white text-sm rounded-xl hover:bg-[#0e4a4a] transition-colors"
            >
              Create Album
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <div
                key={album._id}
                className="group relative rounded-xl border border-gray-100 overflow-hidden bg-white hover:shadow-md transition-shadow"
              >
                <button onClick={() => setViewAlbum(album)} className="block w-full text-left">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    {album.thumbnailUrl ? (
                      <Image src={album.thumbnailUrl} alt={album.title} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300">
                        <Images className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span className="px-2 py-0.5 bg-black/60 text-white text-[10px] rounded-full">
                        {album.images?.length || 0} photos
                      </span>
                      {album.videos?.length > 0 && (
                        <span className="px-2 py-0.5 bg-black/60 text-white text-[10px] rounded-full">
                          {album.videos.length} video{album.videos.length !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    {album.featured && (
                      <div className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm text-gray-900 line-clamp-1">{album.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {album.views || 0} views
                    </p>
                  </div>
                </button>
                <div className="flex gap-1 px-3 pb-3">
                  <button
                    onClick={() => openEdit(album)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(album)}
                    className="flex items-center justify-center p-1.5 text-gray-400 border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  {editTarget ? "Edit Album" : "New Gallery Album"}
                </h2>
                <button
                  onClick={() => setModal(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Album Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2]"
                    placeholder="e.g. Annual Education Conference 2025"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2] resize-none"
                    placeholder="Brief description of this album..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    <Hash className="w-3.5 h-3.5 inline mr-1" />Hashtags (comma-separated)
                  </label>
                  <input
                    value={form.hashtags}
                    onChange={(e) => setForm((f) => ({ ...f, hashtags: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2]"
                    placeholder="education, conference, NSSEC"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      form.featured ? "bg-[#24c2c2]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                        form.featured ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                  <label className="text-sm text-gray-700 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500" /> Feature this album
                  </label>
                </div>

                {/* Image upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    <ImageIcon className="w-3.5 h-3.5 inline mr-1" />
                    Images {editTarget ? "(add more)" : "*"} — up to 10 MB each
                  </label>
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#24c2c2] transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click to select images</p>
                    <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP — multiple allowed</p>
                  </div>
                  <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageFiles} />

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="relative group">
                          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <Image src={src} alt="" fill className="object-cover" unoptimized />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeNewImage(i)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <input
                            value={imageCaptions[i] || ""}
                            onChange={(e) =>
                              setImageCaptions((prev) =>
                                prev.map((c, idx) => (idx === i ? e.target.value : c))
                              )
                            }
                            placeholder="Caption..."
                            className="w-full mt-1 text-[10px] border border-gray-200 rounded px-1.5 py-1 focus:outline-none focus:border-[#24c2c2]"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {editTarget && editTarget.images?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Existing images:</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {editTarget.images.map((img, i) => (
                          <div key={i} className="relative group">
                            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                              <Image src={img.imageUrl} alt="" fill className="object-cover" unoptimized />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveExistingImage(editTarget._id, img.cloudinaryId)}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    <Video className="w-3.5 h-3.5 inline mr-1" />Videos (optional) — up to 100 MB each
                  </label>
                  <div
                    onClick={() => videoInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#24c2c2] transition-colors"
                  >
                    <p className="text-sm text-gray-400">Click to add videos</p>
                    <p className="text-xs text-gray-300 mt-1">MP4, WebM — multiple allowed</p>
                  </div>
                  <input ref={videoInputRef} type="file" accept="video/*" multiple className="hidden" onChange={handleVideoFiles} />
                  {videoFiles.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {videoFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                            <Video className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600 truncate">{f.name}</span>
                          </div>
                          <input
                            value={videoCaptions[i] || ""}
                            onChange={(e) =>
                              setVideoCaptions((prev) =>
                                prev.map((c, idx) => (idx === i ? e.target.value : c))
                              )
                            }
                            placeholder="Caption..."
                            className="w-32 text-xs border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:border-[#24c2c2]"
                          />
                          <button type="button" onClick={() => removeNewVideo(i)} className="p-1.5 text-red-400 hover:text-red-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 bg-[#082c2c] hover:bg-[#0e4a4a] disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    {isSubmitting
                      ? `Uploading ${uploadProgress}%…`
                      : editTarget
                      ? "Update Album"
                      : "Create Album"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Album Modal */}
      <AnimatePresence>
        {viewAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setViewAlbum(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-4xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">{viewAlbum.title}</h2>
                <button
                  onClick={() => setViewAlbum(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {viewAlbum.description && (
                  <p className="text-sm text-gray-600 mb-5">{viewAlbum.description}</p>
                )}
                {viewAlbum.images?.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Images ({viewAlbum.images.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                      {viewAlbum.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-100">
                            <Image src={img.imageUrl} alt={img.caption || ""} fill className="object-cover" unoptimized />
                          </div>
                          {img.caption && (
                            <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{img.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {viewAlbum.videos?.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Videos ({viewAlbum.videos.length})
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {viewAlbum.videos.map((vid, i) => (
                        <div key={i}>
                          <video src={vid.videoUrl} controls className="w-full rounded-xl border border-gray-100" />
                          {vid.caption && (
                            <p className="text-xs text-gray-400 mt-1">{vid.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
