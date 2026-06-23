"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Save } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import DashboardHeader from "../layout/DashboardHeader";
import { SpinnerInline } from "../ui/DashLoader";
import dashApi from "@/lib/dashApi";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, fetchMe, changePassword } = useAuthStore();
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", department: user?.department || "", phone: user?.phone || "" });
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [passError, setPassError] = useState("");

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
    const result = await changePassword(passForm.currentPassword, passForm.newPassword);
    if (result.success) setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSavingPass(false);
  };

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Manage your profile and security" />
      <div className="p-6 space-y-6 max-w-2xl">

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center">
              <User size={18} className="text-[#0e4a4a]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Profile Information</h3>
              <p className="text-xs text-gray-500">Update your name and contact details</p>
            </div>
          </div>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Full Name</label>
                <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Email</label>
                <input value={user?.email} disabled className="w-full px-3 py-2.5 text-sm border border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Department</label>
                <input value={profileForm.department} onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" placeholder="e.g. ICT & Data" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Phone</label>
                <input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" placeholder="+234 xxx xxx xxxx" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 capitalize">Role: <strong className="text-gray-600">{user?.role}</strong></span>
              <button type="submit" disabled={savingProfile} className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium disabled:opacity-60">
                {savingProfile ? <><SpinnerInline size={14} color="#fff" /> Saving…</> : <><Save size={14} /> Save Changes</>}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Password */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#24c2c2]/10 rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-[#0e4a4a]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Change Password</h3>
              <p className="text-xs text-gray-500">Use a strong, unique password</p>
            </div>
          </div>
          <form onSubmit={handlePassChange} className="space-y-4">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  {field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm New Password"}
                </label>
                <input type="password" value={passForm[field]} onChange={(e) => setPassForm({ ...passForm, [field]: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#24c2c2]" />
              </div>
            ))}
            {passError && <p className="text-xs text-red-500">{passError}</p>}
            <button type="submit" disabled={savingPass} className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#24c2c2] hover:bg-[#1da8a8] rounded-xl font-medium disabled:opacity-60">
              {savingPass ? <><SpinnerInline size={14} color="#fff" /> Changing…</> : <><Lock size={14} /> Change Password</>}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
