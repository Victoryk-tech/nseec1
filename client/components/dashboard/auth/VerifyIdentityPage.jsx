"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Shield, Check, CheckCircle2 } from "lucide-react";
import { useAuthStore, checkDeviceTrust } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { SpinnerInline } from "../ui/DashLoader";
import StaffAuthLayout from "./StaffAuthLayout";

const RESEND_SECONDS = 60;
const CODE_LENGTH = 6;

function maskEmail(email = "") {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const first = local[0] || "";
  const last = local[local.length - 1] || "";
  return `${first}...${last}@${domain}`;
}

export default function VerifyIdentityPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, mfaSession, sendMfaCode, verifyMfaCode, tryDeviceAutoLogin, isLoading } =
    useAuthStore();

  const session = mfaSession || searchParams.get("session") || "";
  const email = user?.email || "";
  const maskedEmail = maskEmail(email);

  const [method, setMethod] = useState("Email");
  const [methodOpen, setMethodOpen] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [remember, setRemember] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [otp, setOtp] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [autoChecking, setAutoChecking] = useState(false);
  const inputsRef = useRef([]);

  // Guard: only redirect to login if not in any success/verifying state
  useEffect(() => {
    if (!session && !verified && !otpSuccess && !verifying) {
      router.replace("/staff-portal/login");
    }
  }, [session, verified, otpSuccess, verifying]);

  // Device trust: if device was previously trusted, skip OTP entirely
  useEffect(() => {
    if (!session || !user?._id || verified || otpSuccess) return;
    if (!checkDeviceTrust(user._id)) return;

    setAutoChecking(true);
    tryDeviceAutoLogin(user._id).then((result) => {
      if (result.success) {
        setOtpSuccess(true);
        setTimeout(() => {
          setVerified(true);
          setTimeout(() => router.push("/dashboard"), 1000);
        }, 600);
      } else {
        setAutoChecking(false);
      }
    });
  }, [session, user?._id]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleSendCode = async () => {
    setError("");
    setOtp(Array(CODE_LENGTH).fill(""));
    setCodeSent(true);
    setTimeout(() => inputsRef.current[0]?.focus(), 80);
    const result = await sendMfaCode(session);
    if (result.success) setSecondsLeft(RESEND_SECONDS);
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus();
    if (next.every((d) => d !== "")) handleVerify(next.join(""));
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code) => {
    setError("");
    setVerifying(true);
    const result = await verifyMfaCode(code, { remember, mfaSession: session });
    setVerifying(false);

    if (!result?.success) {
      setError(result?.message || "Incorrect code. Please try again.");
      setOtp(Array(CODE_LENGTH).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 80);
      return;
    }

    // Show inline green check briefly, then full-screen overlay, then redirect
    setOtpSuccess(true);
    setTimeout(() => {
      setVerified(true);
      const destination = result.requiresPasswordChange
        ? "/staff-portal/change-password"
        : "/dashboard";
      setTimeout(() => router.push(destination), 1000);
    }, 500);
  };

  // Full-screen success overlay
  if (verified) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center gap-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-400 flex items-center justify-center"
          >
            <CheckCircle2 size={52} className="text-emerald-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-[#082c2c]">Identity Verified</p>
            <p className="text-sm text-gray-500 mt-1">Signing you in…</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Auto-checking trusted device overlay
  if (autoChecking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <SpinnerInline size={32} color="#082c2c" />
          <p className="text-sm text-gray-500">Recognized device — signing you in…</p>
        </div>
      </div>
    );
  }

  return (
    <StaffAuthLayout>
      <div className="max-w-lg w-full">
        <div className="hidden md:flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 bg-[#082c2c] rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-[#24c2c2]" />
          </div>
          <span className="text-lg font-bold text-[#082c2c] tracking-tight">NSSEC Staff Portal</span>
        </div>

        <h1 className="text-3xl font-bold text-[#082c2c] mb-6">Verify Your Identity</h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7">
          <p className="text-xs font-bold text-gray-800 mb-2">Authentication Method</p>

          {/* Method selector */}
          <div className="relative mb-4">
            <button
              type="button"
              onClick={() => setMethodOpen(!methodOpen)}
              className="w-full flex items-center justify-center gap-1.5 border border-gray-200 bg-gray-50 rounded-lg py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {method} <ChevronDown size={14} />
            </button>
            {methodOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                {["Email"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMethod(m); setMethodOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!codeSent ? (
              <motion.div
                key="pre-send"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-gray-600 mb-4">
                  Send a verification code to{" "}
                  <span className="font-semibold text-gray-800">{maskedEmail}</span>.
                </p>

                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isLoading}
                  className="bg-[#082c2c] hover:bg-[#0e4a4a] text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors mb-5 disabled:opacity-60 flex items-center gap-2"
                >
                  {isLoading ? <><SpinnerInline size={14} color="#fff" /> Sending…</> : "Send Code"}
                </button>

                <RememberToggle remember={remember} setRemember={setRemember} />
              </motion.div>
            ) : (
              <motion.div
                key="post-send"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-gray-600 mb-4">
                  A 6-digit code was sent to{" "}
                  <span className="font-semibold text-gray-800">{maskedEmail}</span>.
                  Enter it below to continue.
                </p>

                <button
                  type="button"
                  disabled={secondsLeft > 0 || isLoading}
                  onClick={handleSendCode}
                  className="text-sm font-semibold rounded-lg px-5 py-2.5 mb-5 border transition-colors disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed text-[#082c2c] border-[#082c2c]/20 bg-gray-50 hover:bg-gray-100"
                >
                  {secondsLeft > 0 ? `Resend Code (${secondsLeft}s)` : "Resend Code"}
                </button>

                {/* OTP inputs + inline status icon */}
                <div className="flex gap-2 mb-2 items-center">
                  {otp.map((digit, i) => (
                    <OtpBox
                      key={i}
                      index={i}
                      digit={digit}
                      hasError={!!error}
                      verifying={verifying}
                      inputsRef={inputsRef}
                      onChange={handleOtpChange}
                      onKeyDown={handleOtpKeyDown}
                    />
                  ))}
                  {verifying && <SpinnerInline size={18} color="#082c2c" />}
                  {otpSuccess && !verifying && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <CheckCircle2 size={22} className="text-emerald-500" />
                    </motion.div>
                  )}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mb-3"
                  >
                    {error}
                  </motion.p>
                )}

                <RememberToggle remember={remember} setRemember={setRemember} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-5 border-t border-gray-100 text-sm text-gray-600 space-y-1.5">
            <p>
              Lost your MFA method?{" "}
              <a
                href="/staff-portal/contact"
                className="text-[#1da8a8] hover:text-[#24c2c2] inline-flex items-center gap-1"
              >
                Contact us <ExternalLink size={12} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </StaffAuthLayout>
  );
}

function OtpBox({ index, digit, hasError, verifying, inputsRef, onChange, onKeyDown }) {
  const filled = digit !== "";
  return (
    <input
      ref={(el) => (inputsRef.current[index] = el)}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={digit}
      onChange={(e) => onChange(index, e.target.value)}
      onKeyDown={(e) => onKeyDown(index, e)}
      disabled={verifying}
      className={[
        "w-11 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none transition-all duration-150 disabled:opacity-60",
        hasError
          ? "border-red-400 bg-red-50 text-red-600"
          : filled
          ? "border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm"
          : "border-gray-200 bg-gray-50 text-gray-800 focus:border-[#24c2c2] focus:bg-white",
      ].join(" ")}
    />
  );
}

function RememberToggle({ remember, setRemember }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer mt-3">
      <button
        type="button"
        onClick={() => setRemember(!remember)}
        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
          remember ? "bg-[#24c2c2] border-[#24c2c2]" : "border-gray-300 bg-white"
        }`}
      >
        {remember && <Check size={11} className="text-white" />}
      </button>
      Don&apos;t ask again on this device for 14 days
    </label>
  );
}
