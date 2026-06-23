"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, AlertCircle } from "lucide-react";

import { STEPS, INITIAL_FORM, API_BASE, canProceed } from "./constants";
import StepProgress  from "./StepProgress";
import ModeSelector  from "./ModeSelector";
import PdfMode       from "./PdfMode";
import SuccessScreen from "./SuccessScreen";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

const STEP_COMPONENTS = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7];

const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ? "55%"  : "-55%", opacity: 0 }),
  center:            { x: 0,      opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? "-55%" : "55%",  opacity: 0 }),
};

export default function MandEForm() {
  const [mode,        setMode]        = useState(null);
  const [step,        setStep]        = useState(0);
  const [direction,   setDirection]   = useState(1);
  const [form,        setForm]        = useState(INITIAL_FORM);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successId,   setSuccessId]   = useState(null);
  const topRef = useRef();

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => { if (!prev[name]) return prev; const n = { ...prev }; delete n[name]; return n; });
  }, []);

  const validateStep0 = () => {
    const errs = {};
    if (!form.schoolName.trim()) errs.schoolName = "School name is required";
    if (!form.state)             errs.state      = "Please select the school's state";
    return errs;
  };

  const ok = canProceed(step, form);

  const goTo = (target) => {
    if (target < 0 || target >= STEPS.length) return;
    setDirection(target > step ? 1 : -1);
    setErrors({});
    setStep(target);
    scrollTop();
  };

  const next = () => {
    if (step === 0) {
      const errs = validateStep0();
      if (Object.keys(errs).length) { setErrors(errs); scrollTop(); return; }
    }
    goTo(step + 1);
  };

  const buildPayload = () => {
    const numFields = [
      "yearEstablished","attendanceTeaching","attendanceNonTeaching",
      "teachingStaffMale","teachingStaffFemale","nonTeachingStaffMale","nonTeachingStaffFemale",
      "permanentStaff","temporaryStaff","totalBoys","totalGirls",
      "learnersWithSpecialNeeds","dropoutCount","classroomsRating",
    ];
    const payload = { ...form };
    numFields.forEach((f) => {
      if (payload[f] !== "" && payload[f] !== undefined) payload[f] = Number(payload[f]) || undefined;
      else delete payload[f];
    });
    payload.schoolDoesWell      = form.schoolDoesWell.filter(Boolean);
    payload.areasForImprovement = form.areasForImprovement.filter(Boolean);
    payload.recommendations     = form.recommendations.filter(Boolean);
    if (form.visitDate) payload.visitDate = new Date(form.visitDate).toISOString();
    return payload;
  };

  const handleSubmit = async () => {
    setSubmitError("");
    const errs = validateStep0();
    if (Object.keys(errs).length) { setErrors(errs); goTo(0); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/mande/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSuccessId(data.data?.submissionId);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessId(null); setMode(null); setStep(0);
    setForm(INITIAL_FORM); setErrors({}); setSubmitError("");
  };

  /* ─── Success ─── */
  if (successId) return <SuccessScreen successId={successId} onReset={handleReset} />;

  /* ─── Mode selector ─── */
  if (!mode) return <ModeSelector onSelect={setMode} />;

  /* ─── PDF mode ─── */
  if (mode === "pdf") {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <button type="button" onClick={() => setMode(null)}
          className="flex items-center gap-1.5 text-[#24c2c2] hover:text-[#1a9999] text-sm font-bold mb-7 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to options
        </button>
        <PdfMode onSuccess={(id) => setSuccessId(id)} />
      </motion.div>
    );
  }

  /* ─── Web form ─── */
  const CurrentStep = STEP_COMPONENTS[step];
  const StepIcon    = STEPS[step].icon;
  const isLast      = step === STEPS.length - 1;
  const isFirst     = step === 0;
  const canSubmit   = !!form.evaluatorName.trim() && !loading;

  return (
    <div ref={topRef} className="w-full">

      {/* Back to mode selector */}
      <button type="button" onClick={() => setMode(null)}
        className="flex items-center gap-1.5 text-[#24c2c2] hover:text-[#1a9999] text-sm font-bold mb-7 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Change submission mode
      </button>

      {/* Step progress bar */}
      <StepProgress step={step} onStepClick={goTo} />

      {/* Step panel */}
      <div className="rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden mb-6">

        {/* Panel header */}
        <div className="flex items-center gap-3 px-5 sm:px-8 py-4 border-b border-gray-50 bg-gradient-to-r from-[#0e4f6b]/[0.03] to-transparent">
          <div className="w-10 h-10 rounded-xl bg-[#24c2c2]/10 flex items-center justify-center flex-shrink-0">
            <StepIcon className="w-5 h-5 text-[#24c2c2]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Section {step + 1} of {STEPS.length}
            </p>
            <h2 className="font-bold text-[#0e4f6b] text-base leading-tight truncate">{STEPS[step].title}</h2>
          </div>
          <AnimatePresence>
            {ok && !isLast && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"
              >
                <CheckCircle className="w-3 h-3" /> Ready
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Step content with slide animation */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="px-5 sm:px-8 py-7"
            >
              <CurrentStep
                form={form}
                onChange={onChange}
                setForm={setForm}
                errors={errors}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Server error */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0,  height: "auto" }}
            exit={{ opacity: 0, y: -8,    height: 0 }}
            className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-5"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">

        {/* Previous */}
        <motion.button
          type="button"
          onClick={() => goTo(step - 1)}
          disabled={isFirst}
          whileHover={!isFirst ? { scale: 1.03 } : {}}
          whileTap={!isFirst   ? { scale: 0.97 } : {}}
          className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-500 text-sm font-bold rounded-xl
            disabled:opacity-30 disabled:cursor-not-allowed
            hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </motion.button>

        {/* Next / Submit */}
        {isLast ? (
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.04 } : {}}
            whileTap={canSubmit  ? { scale: 0.97 } : {}}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#24c2c2] to-[#1a9999]
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white text-sm font-bold rounded-xl shadow-lg shadow-[#24c2c2]/30 transition-shadow"
          >
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</>
              : <><CheckCircle className="w-4 h-4" />Submit Form</>
            }
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={next}
            disabled={!ok}
            whileHover={ok ? { scale: 1.04 } : {}}
            whileTap={ok  ? { scale: 0.97 } : {}}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#0e4f6b] to-[#1a7070]
              disabled:opacity-40 disabled:cursor-not-allowed
              text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0e4f6b]/20 transition-shadow"
          >
            Next <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Required hint */}
      <p className="text-center text-[11px] text-gray-400 mt-4">
        Fields marked <span className="text-red-500 font-extrabold">*</span> are required to proceed
      </p>

    </div>
  );
}
