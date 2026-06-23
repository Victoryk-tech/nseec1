"use client";
import { motion } from "framer-motion";
import { Eye, TrendingUp, Lightbulb, UserCheck, Info } from "lucide-react";
import { SectionTitle, inputCls, Field } from "./FormFields";

const ARRAY_CONFIGS = [
  { field: "schoolDoesWell",      icon: TrendingUp, color: "#22c55e", title: "What the School Does Well",  placeholder: "Observation" },
  { field: "areasForImprovement", icon: Eye,        color: "#f59e0b", title: "Areas for Improvement",      placeholder: "Area" },
  { field: "recommendations",     icon: Lightbulb,  color: "#24c2c2", title: "Recommendations",            placeholder: "Recommendation" },
];

export default function Step7({ form, setForm }) {
  const updateArr = (field, idx, val) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[idx] = val;
      return { ...prev, [field]: arr };
    });
  };

  return (
    <div className="space-y-6">

      {/* Notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          This section is to be completed by the <strong>NSSEC evaluator</strong> who conducted the monitoring visit. Evaluator name is required before submission.
        </p>
      </div>

      {/* Dynamic array fields */}
      {ARRAY_CONFIGS.map(({ field, icon: Icon, color, title, placeholder }) => (
        <div key={field}>
          <SectionTitle icon={Icon}>{title}</SectionTitle>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 text-white"
                  style={{ background: color }}
                >
                  {i + 1}
                </span>
                <input
                  value={form[field][i]}
                  onChange={(e) => updateArr(field, i, e.target.value)}
                  className={inputCls(false)}
                  placeholder={`${placeholder} ${i + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Evaluator signatures */}
      <SectionTitle icon={UserCheck}>Evaluator Sign-off</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Evaluator Name" required>
          <input
            name="evaluatorName"
            value={form.evaluatorName}
            onChange={(e) => setForm((p) => ({ ...p, evaluatorName: e.target.value }))}
            className={inputCls(!form.evaluatorName.trim())}
            placeholder="Full name of evaluator"
          />
        </Field>
        <Field label="Lead Evaluator Name">
          <input
            name="leadEvaluatorName"
            value={form.leadEvaluatorName}
            onChange={(e) => setForm((p) => ({ ...p, leadEvaluatorName: e.target.value }))}
            className={inputCls(false)}
            placeholder="Full name of lead evaluator"
          />
        </Field>
      </div>
      {!form.evaluatorName.trim() && (
        <p className="text-xs text-amber-600 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          Evaluator name is required to enable the Submit button.
        </p>
      )}

    </div>
  );
}
