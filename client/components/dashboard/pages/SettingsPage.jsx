"use client";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Save,
  Camera,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import DashboardHeader from "../layout/DashboardHeader";
import { SpinnerInline } from "../ui/DashLoader";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

function AvatarUploader({ currentAvatar, userName, onUploadSuccess }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);

  const processFile = (f) => {
    if (!f || !f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      return;
    }
    setFile(f);
    setDone(false);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("avatar", file);
      const { data } = await dashApi.post("/users/me/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDone(true);
      setFile(null);
      onUploadSuccess(data.data.avatarUrl || data.data.avatar);
      toast.success("Avatar updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
    setUploading(false);
  };

  const displaySrc = preview || currentAvatar || "/nssec.jpeg";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-5 flex-wrap">
        {/* Avatar preview */}
        <div className="relative group flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm bg-gray-50">
            <Image
              src={displaySrc}
              alt={userName}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/nssec.jpeg";
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#24c2c2] rounded-xl flex items-center justify-center shadow-md hover:bg-[#1da8a8] transition-colors"
          >
            <Camera size={13} className="text-white" />
          </button>
          {done && (
            <div className="absolute inset-0 bg-emerald-500/80 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} className="text-white" />
            </div>
          )}
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`flex-1 min-w-[180px] border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            dragging
              ? "border-[#24c2c2] bg-[#24c2c2]/5"
              : "border-gray-200 hover:border-[#24c2c2]/50 hover:bg-gray-50/50"
          }`}
        >
          <Upload
            size={18}
            className={`mx-auto mb-2 ${dragging ? "text-[#24c2c2]" : "text-gray-300"}`}
          />
          <p className="text-xs font-medium text-gray-500">
            {file ? file.name : "Drop image here or click to browse"}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            PNG, JPG, WEBP · Max 5 MB
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
      />

      {file && (
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500 flex-1 truncate">
            {file.name} ({(file.size / 1024).toFixed(0)} KB)
          </p>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
          >
            <X size={13} />
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl disabled:opacity-60"
          >
            {uploading ? (
              <>
                <SpinnerInline size={12} color="#fff" /> Uploading…
              </>
            ) : (
              <>
                <Upload size={12} /> Upload
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const { user, fetchMe, changePassword } = useAuthStore();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    department: user?.department || "",
    phone: user?.phone || "",
  });
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [passError, setPassError] = useState("");

  const handleAvatarSuccess = async (avatarUrl) => {
    await fetchMe();
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await dashApi.patch(`/users/${user._id}`, profileForm);
      await fetchMe();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
    setSavingProfile(false);
  };

  const handlePassChange = async (e) => {
    e.preventDefault();
    setPassError("");
    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError("Passwords do not match");
      return;
    }
    if (passForm.newPassword.length < 8) {
      setPassError("Password must be at least 8 characters");
      return;
    }
    setSavingPass(true);
    const result = await changePassword(
      passForm.currentPassword,
      passForm.newPassword,
    );
    if (result.success)
      setPassForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    setSavingPass(false);
  };

  return (
    <div>
      <DashboardHeader
        title="Settings"
        subtitle="Manage your profile and security"
      />
      <div className="p-4 sm:p-6 space-y-5 max-w-2xl">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center">
              <Camera size={18} className="text-[#0e4a4a]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Profile Photo</h3>
              <p className="text-xs text-gray-500">
                Upload a photo that represents you
              </p>
            </div>
          </div>
          <AvatarUploader
            currentAvatar={user?.avatar}
            userName={user?.name || "User"}
            onUploadSuccess={handleAvatarSuccess}
          />
        </motion.div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center">
              <User size={18} className="text-[#0e4a4a]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Profile Information
              </h3>
              <p className="text-xs text-gray-500">
                Update your name and contact details
              </p>
            </div>
          </div>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  value={user?.email}
                  disabled
                  className="w-full px-3 py-2.5 text-sm border border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <input
                  value={profileForm.department}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      department: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-gray-50 focus:bg-white transition-colors"
                  placeholder="e.g. ICT & Data"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <input
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-gray-50 focus:bg-white transition-colors"
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-gray-400 capitalize">
                Role: <strong className="text-gray-600">{user?.role}</strong>
              </span>
              <button
                type="submit"
                disabled={savingProfile}
                className="ml-auto flex items-center gap-2 px-4 py-2.5 text-sm text-white bg-[#082c2c] hover:bg-[#0e4a4a] rounded-xl font-semibold disabled:opacity-60 transition-colors"
              >
                {savingProfile ? (
                  <>
                    <SpinnerInline size={14} color="#fff" /> Saving…
                  </>
                ) : (
                  <>
                    <Save size={14} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-[#0e4a4a]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Change Password</h3>
              <p className="text-xs text-gray-500">
                Use a strong, unique password for your account
              </p>
            </div>
          </div>
          <form onSubmit={handlePassChange} className="space-y-4">
            {[
              { field: "currentPassword", label: "Current Password" },
              { field: "newPassword", label: "New Password" },
              { field: "confirmPassword", label: "Confirm New Password" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  {label}
                </label>
                <input
                  type="password"
                  value={passForm[field]}
                  onChange={(e) =>
                    setPassForm({ ...passForm, [field]: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2] bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            ))}
            {passError && (
              <p className="text-xs text-red-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {passError}
              </p>
            )}
            <button
              type="submit"
              disabled={savingPass}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-semibold disabled:opacity-60 transition-colors"
            >
              {savingPass ? (
                <>
                  <SpinnerInline size={14} color="#fff" /> Changing…
                </>
              ) : (
                <>
                  <Lock size={14} /> Change Password
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
