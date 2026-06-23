// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
// import { useAuthStore } from "@/store/authStore";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { SpinnerInline } from "../ui/DashLoader";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login, isLoading } = useAuthStore();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
//     if (!form.password) e.password = "Password is required";
//     setErrors(e);
//     return !Object.keys(e).length;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     const result = await login(form.email, form.password);
//     if (result.success) router.push("/dashboard");
//   };

//   return (
//     <div className="min-h-screen bg-[#082c2c] flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="bg-white rounded-3xl shadow-2xl overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-br from-[#082c2c] to-[#0e4a4a] px-8 pt-10 pb-8 text-center">
//             <div className="w-14 h-14 bg-[#24c2c2] rounded-2xl mx-auto flex items-center justify-center mb-4">
//               <Shield size={28} className="text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-white">Staff Portal</h1>
//             <p className="text-white/60 text-sm mt-1">NSSEC Dashboard — Authorised Access Only</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
//             <div>
//               <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Email Address</label>
//               <div className="relative">
//                 <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   placeholder="staff@nssec.gov.ng"
//                   className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2] transition-all ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
//                 />
//               </div>
//               {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Password</label>
//               <div className="relative">
//                 <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type={showPass ? "text" : "password"}
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   placeholder="Enter your password"
//                   className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2] transition-all ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"}`}
//                 />
//                 <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                   {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//               {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
//             </div>

//             <div className="flex justify-end">
//               <Link href="/staff-portal/forgot-password" className="text-xs text-[#24c2c2] hover:text-[#1da8a8]">
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-3 bg-[#24c2c2] hover:bg-[#1da8a8] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
//             >
//               {isLoading ? <><SpinnerInline size={16} color="#fff" /> Signing in…</> : "Sign In"}
//             </button>
//           </form>

//           <div className="px-8 pb-6 text-center">
//             <p className="text-xs text-gray-400">This portal is restricted to NSSEC staff only.<br/>Unauthorised access is prohibited.</p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SpinnerInline } from "../ui/DashLoader";

function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.1 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-1.7 13.5-4.6l-6.2-5.3C29.3 35.6 26.8 36 24 36c-5.2 0-9.6-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-2.9 5.3-5.5 6.9l6.2 5.3C39.9 36.9 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuthStore();

  const [step, setStep] = useState("email"); // "email" | "password"
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const loggedOut = searchParams.get("loggedOut") === "true";

  const validateEmail = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validatePassword = () => {
    const e = {};
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setErrors({});
    setStep("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    const result = await login(form.email, form.password);
    if (result.success) {
      if (result.requiresMfa) {
        router.push("/staff-portal/verification");
      } else if (result.requiresPasswordChange) {
        router.push("/staff-portal/change-password");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left panel */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-8 sm:px-14 py-12 relative">
        <div className="max-w-sm w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-[#082c2c] rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-[#24c2c2]" />
            </div>
            <span className="text-lg font-bold text-[#082c2c] tracking-tight">NSSEC Staff Portal</span>
          </div>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-bold text-[#082c2c] mb-2">Log in to your account</h1>
                <p className="text-sm text-gray-500 mb-6">
                  Need access?{" "}
                  <Link href="/staff-portal/contact" className="text-[#1da8a8] font-semibold hover:text-[#24c2c2]">
                    Contact admin
                  </Link>
                </p>

                {loggedOut && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-[#e6f9f6] border border-[#bdeee6] text-[#0e4a4a] text-sm font-medium rounded-xl px-4 py-3 mb-5"
                  >
                    <CheckCircle2 size={16} className="text-[#24c2c2] flex-shrink-0" />
                    You have successfully logged out.
                  </motion.div>
                )}

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 mb-5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <GoogleIcon size={18} />
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 whitespace-nowrap">Or with email and password</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form onSubmit={handleNext} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="staff@nssec.gov.ng"
                        className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2] transition-all ${
                          errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                      {form.email && !errors.email && (
                        <CheckCircle2
                          size={16}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#24c2c2]"
                        />
                      )}
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#082c2c] hover:bg-[#0e4a4a] text-white font-semibold rounded-xl transition-colors"
                  >
                    Next
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="password-step"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#082c2c] mb-4"
                >
                  <ArrowLeft size={14} /> {form.email}
                </button>

                <h1 className="text-3xl font-bold text-[#082c2c] mb-6">Enter your password</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Enter your password"
                        autoFocus
                        className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2] transition-all ${
                          errors.password ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex justify-end">
                    <Link href="/staff-portal/forgot-password" className="text-xs text-[#24c2c2] hover:text-[#1da8a8]">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#082c2c] hover:bg-[#0e4a4a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <SpinnerInline size={16} color="#fff" /> Signing in…
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-gray-400 mt-10">
            This portal is restricted to NSSEC staff only.
            <br />
            Unauthorised access is prohibited.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden md:flex md:w-[60%] relative bg-gradient-to-br from-[#082c2c] to-[#0e4a4a] overflow-hidden">
        {/* decorative shapes */}
        <svg className="absolute top-0 right-0 h-full w-1/2 opacity-[0.18]" viewBox="0 0 400 700" fill="none">
          <path
            d="M150 0C100 70 100 160 170 210C100 260 100 380 170 450"
            stroke="#24c2c2"
            strokeWidth="44"
            strokeLinecap="round"
          />
          <path
            d="M300 0C250 70 250 160 320 210C250 260 250 380 320 450"
            stroke="#24c2c2"
            strokeWidth="44"
            strokeLinecap="round"
          />
        </svg>
        <svg className="absolute bottom-16 right-28 w-44 h-44 opacity-[0.14]" viewBox="0 0 100 100" fill="none">
          <g stroke="#24c2c2" strokeWidth="6" strokeLinecap="round">
            <line x1="50" y1="4" x2="50" y2="96" />
            <line x1="50" y1="4" x2="50" y2="96" transform="rotate(60 50 50)" />
            <line x1="50" y1="4" x2="50" y2="96" transform="rotate(120 50 50)" />
          </g>
        </svg>
        <div className="absolute bottom-0 right-0 w-32 h-[140%] bg-gradient-to-t from-[#24c2c2]/20 to-transparent -rotate-12 translate-x-10" />

        <div className="relative z-10 px-16 py-20 max-w-lg self-center">
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Everything your team needs, in one dashboard
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-6">
            Track staff records, manage approvals, and stay on top of every department update from a single secure
            workspace built for NSSEC staff.
          </p>
          <Link
            href="/staff-portal/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#24c2c2] hover:text-white transition-colors"
          >
            Learn more <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* floating help button */}
      <button
        type="button"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#24c2c2] hover:bg-[#1da8a8] text-white flex items-center justify-center shadow-lg transition-colors z-50"
        aria-label="Chat support"
      >
        <MessageCircle size={20} />
      </button>
    </div>
  );
}