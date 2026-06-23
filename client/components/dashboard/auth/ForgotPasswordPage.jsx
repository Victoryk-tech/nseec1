"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { SpinnerInline } from "../ui/DashLoader";
import StaffAuthLayout from "./StaffAuthLayout";

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    const result = await forgotPassword(email);
    if (result.success) setSent(true);
  };

  return (
    <StaffAuthLayout>
      <div className="max-w-md w-full">
        <div className="flex items-center gap-2.5 mb-10 hidden md:flex">
          <div className="w-9 h-9 bg-[#082c2c] rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-[#24c2c2]" />
          </div>
          <span className="text-lg font-bold text-[#082c2c] tracking-tight">NSSEC Staff Portal</span>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-4 text-center"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Check your email</h3>
              <p className="text-sm text-gray-500 mt-2">
                If <strong>{email}</strong> is associated with an account, a reset link has been sent.
              </p>
            </div>
            <Link
              href="/staff-portal/login"
              className="inline-flex items-center justify-center gap-2 text-sm text-[#24c2c2] hover:text-[#1da8a8] font-medium"
            >
              <ArrowLeft size={14} /> Back to login
            </Link>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#082c2c] mb-2">Reset Password</h1>
            <p className="text-sm text-gray-500 mb-8">
              Enter your staff email and we&apos;ll send you a secure reset link.
            </p>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="staff@nssec.gov.ng"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2] transition-all ${
                        error ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
                      }`}
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#082c2c] hover:bg-[#0e4a4a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? <><SpinnerInline size={16} color="#fff" /> Sending…</> : "Send Reset Link"}
                </button>

                <Link
                  href="/staff-portal/login"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft size={14} /> Back to login
                </Link>
              </form>
            </div>
          </>
        )}
      </div>
    </StaffAuthLayout>
  );
}
