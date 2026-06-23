"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Upload, FileText, AlertCircle, Loader2, X } from "lucide-react";
import { Field, inputCls } from "./FormFields";
import { NIGERIAN_STATES, API_BASE } from "./constants";

export default function PdfMode({ onSuccess }) {
  const [fields, setFields]           = useState({ schoolName: "", schoolEmail: "", state: "", evaluatorName: "" });
  const [file, setFile]               = useState(null);
  const [dragOver, setDragOver]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState({});
  const [submitError, setSubmitError] = useState("");
  const fileRef = useRef();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") {
      setFile(f);
      setErrors((p) => { const n = { ...p }; delete n.file; return n; });
    } else {
      setSubmitError("Only PDF files are accepted.");
    }
  }, []);

  const validate = () => {
    const errs = {};
    if (!fields.schoolName.trim()) errs.schoolName = "School name is required";
    if (!fields.state)             errs.state      = "State is required";
    if (!file)                     errs.file       = "Please upload the completed PDF form";
    return errs;
  };

  const canSubmit = fields.schoolName.trim() && fields.state && file && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
      fd.append("pdf", file);
      const res  = await fetch(`${API_BASE}/mande/submit-pdf`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      onSuccess(data.data?.submissionId);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">

      {/* Download card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0e4f6b]/5 to-[#24c2c2]/5 border border-[#24c2c2]/20 rounded-2xl p-5"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#24c2c2]/10 border border-[#24c2c2]/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#24c2c2]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#0e4f6b] text-sm mb-1">Step 1 — Download Blank Form</p>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              Download the official 2025 NSSEC M&amp;E instrument, fill it offline, then return here to upload.
            </p>
            <motion.a
              href="/departments/CORRECTED%20COPY%20%20OF%20NSSEC%20M%20%26%20E%20MANUAL%202025%20-%202.docx"
              download="NSSEC-MandE-Form-2025.docx"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e4f6b] text-white text-xs font-bold rounded-xl hover:bg-[#0a3d57] transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download NSSEC M&E Form 2025
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* School details */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Step 2 — Your Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="School Name" required error={errors.schoolName}>
            <input name="schoolName" value={fields.schoolName} onChange={onChange}
              className={inputCls(errors.schoolName)} placeholder="Official school name" />
          </Field>

          <Field label="School Email">
            <input name="schoolEmail" type="email" value={fields.schoolEmail} onChange={onChange}
              className={inputCls(false)} placeholder="school@example.edu.ng" />
          </Field>

          <Field label="State" required error={errors.state}>
            <div className="relative">
              <select name="state" value={fields.state} onChange={onChange}
                className={`${inputCls(errors.state)} appearance-none pr-10 cursor-pointer`}>
                <option value="">Select state...</option>
                {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </Field>

          <Field label="Evaluator Name">
            <input name="evaluatorName" value={fields.evaluatorName} onChange={onChange}
              className={inputCls(false)} placeholder="Name of evaluator (optional)" />
          </Field>
        </div>
      </div>

      {/* PDF upload */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Step 3 — Upload Completed PDF</p>
        <Field label="Upload Completed PDF Form" required error={errors.file}>
          <motion.div
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            animate={{ scale: dragOver ? 1.01 : 1 }}
            transition={{ duration: 0.15 }}
            className={[
              "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200",
              dragOver        ? "border-[#24c2c2] bg-[#24c2c2]/5"      :
              file            ? "border-[#24c2c2]/60 bg-[#24c2c2]/5"   :
              errors.file     ? "border-red-300 bg-red-50/30"           :
                                "border-gray-200 hover:border-[#24c2c2]/40 hover:bg-gray-50",
            ].join(" ")}
          >
            <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) { setFile(f); setErrors((p) => { const n = { ...p }; delete n.file; return n; }); }
              }}
            />
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="w-10 h-10 rounded-xl bg-[#24c2c2]/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#24c2c2]" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-bold text-[#0e4f6b] truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB · PDF</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="ml-1 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-600">Drag &amp; drop your PDF here</p>
                  <p className="text-xs text-gray-400 mt-1">or <span className="text-[#24c2c2] font-bold">click to browse</span></p>
                  <p className="text-[10px] text-gray-300 mt-2">PDF only · Max 50 MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Field>
      </div>

      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.02 } : {}}
        whileTap={canSubmit  ? { scale: 0.98 } : {}}
        className="w-full py-4 bg-gradient-to-r from-[#24c2c2] to-[#1a9999] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#24c2c2]/25 text-sm"
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading…</>
          : <><Upload className="w-4 h-4" />Submit PDF Form</>
        }
      </motion.button>
    </form>
  );
}
