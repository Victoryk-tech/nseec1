"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Shield, CheckCircle, KeyRound } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { SpinnerInline } from "../ui/DashLoader";
import StaffAuthLayout from "./StaffAuthLayout";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { changePassword, isLoading, user } = useAuthStore();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password))
      e.password = "Must contain uppercase, lowercase, and a number";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // First-login: pass empty string as current password — server skips check when requiresPasswordChange is true
    const result = await changePassword("", form.password);
    if (result.success) {
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2500);
    }
  };

  const strength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-400"][strength];

  return (
    <StaffAuthLayout>
      <div className="max-w-md w-full">
        <div className="flex items-center gap-2.5 mb-10 hidden md:flex">
          <div className="w-9 h-9 bg-[#082c2c] rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-[#24c2c2]" />
          </div>
          <span className="text-lg font-bold text-[#082c2c] tracking-tight">NSSEC Staff Portal</span>
        </div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Password set!</h3>
              <p className="text-sm text-gray-500 mt-2">Taking you to the dashboard…</p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center">
                <KeyRound size={18} className="text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#082c2c]">Set Your Password</h1>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-8 pl-0">
              Welcome, <strong>{user?.name?.split(" ")[0]}</strong>! Your account was created with a temporary
              password. Please set a permanent one to continue.
            </p>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7">
              <form onSubmit={handleSubmit} className="space-y-5">
                {(["password", "confirm"]).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      {field === "password" ? "New Password" : "Confirm Password"}
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={show[field] ? "text" : "password"}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        placeholder={field === "password" ? "Min. 8 characters" : "Repeat password"}
                        className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2] transition-all ${
                          errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShow({ ...show, [field]: !show[field] })}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {field === "password" && form.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((n) => (
                            <div key={n} className={`h-1 flex-1 rounded-full transition-all ${strength >= n ? strengthColor : "bg-gray-100"}`} />
                          ))}
                        </div>
                        {strengthLabel && (
                          <p className={`text-xs ${["", "text-red-500", "text-amber-500", "text-blue-500", "text-emerald-500"][strength]}`}>
                            {strengthLabel}
                          </p>
                        )}
                      </div>
                    )}
                    {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#082c2c] hover:bg-[#0e4a4a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? <><SpinnerInline size={16} color="#fff" /> Saving…</> : "Set Password & Continue"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </StaffAuthLayout>
  );
}
