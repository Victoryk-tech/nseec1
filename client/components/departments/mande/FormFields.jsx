"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown, Check } from "lucide-react";

export function inputCls(error) {
  return [
    "w-full rounded-xl border px-4 py-3 text-sm transition-all duration-200",
    "focus:outline-none focus:ring-2 placeholder:text-gray-400 bg-gray-50 focus:bg-white",
    error
      ? "border-red-400 bg-red-50/40 focus:ring-red-200/60 focus:border-red-400 text-gray-700"
      : "border-gray-200 focus:border-[#24c2c2] focus:ring-[#24c2c2]/20 text-gray-800",
  ].join(" ");
}

export function Field({ label, required, error, hint, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-500 font-extrabold text-sm leading-none ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-gray-400 leading-snug">{hint}</p>}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.18 }}
            className="text-[11px] text-red-500 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Input({ label, name, value, onChange, type = "text", required, error, placeholder, hint, className }) {
  return (
    <Field label={label} required={required} error={error} hint={hint} className={className}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputCls(error)}
      />
    </Field>
  );
}

export function Select({ label, name, value, onChange, options, required, error, placeholder = "Select an option...", hint, className }) {
  return (
    <Field label={label} required={required} error={error} hint={hint} className={className}>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputCls(error)} appearance-none pr-10 cursor-pointer`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <ChevronDown className={`w-4 h-4 transition-colors ${value ? "text-[#24c2c2]" : "text-gray-400"}`} />
        </div>
      </div>
    </Field>
  );
}

export function RadioPill({ label, name, value, onChange, options, required, hint }) {
  return (
    <Field label={label} required={required} hint={hint}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const val = o.value ?? o;
          const lbl = o.label ?? o;
          const selected = value === val;
          return (
            <motion.label
              key={val}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={[
                "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer text-sm font-medium",
                "transition-colors duration-200 select-none",
                selected
                  ? "border-[#24c2c2] bg-[#24c2c2]/10 text-[#0e4f6b] shadow-sm shadow-[#24c2c2]/20"
                  : "border-gray-200 text-gray-500 hover:border-[#24c2c2]/40 bg-white hover:bg-gray-50/80",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={val}
                checked={selected}
                onChange={onChange}
                className="sr-only"
              />
              <span
                className={[
                  "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                  selected ? "border-[#24c2c2] bg-[#24c2c2]" : "border-gray-300 bg-white",
                ].join(" ")}
              >
                {selected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-white block"
                  />
                )}
              </span>
              {lbl}
            </motion.label>
          );
        })}
      </div>
    </Field>
  );
}

export function CheckChip({ label, name, values, onChange, options, hint }) {
  const toggle = (val) => {
    const next = values.includes(val) ? values.filter((v) => v !== val) : [...values, val];
    onChange({ target: { name, value: next } });
  };
  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const val = o.value ?? o;
          const lbl = o.label ?? o;
          const checked = values.includes(val);
          return (
            <motion.button
              type="button"
              key={val}
              onClick={() => toggle(val)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={[
                "flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-xs font-semibold",
                "transition-colors duration-200",
                checked
                  ? "border-[#24c2c2] bg-[#24c2c2]/10 text-[#0e4f6b]"
                  : "border-gray-200 text-gray-500 hover:border-[#24c2c2]/40 bg-white",
              ].join(" ")}
            >
              <span
                className={[
                  "w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                  checked ? "border-[#24c2c2] bg-[#24c2c2]" : "border-gray-300 bg-white",
                ].join(" ")}
              >
                <AnimatePresence>
                  {checked && (
                    <motion.span
                      key="chk"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {lbl}
            </motion.button>
          );
        })}
      </div>
    </Field>
  );
}

export function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 pt-3 pb-3 border-b border-gray-100 mb-5">
      {Icon && (
        <div className="w-7 h-7 rounded-lg bg-[#24c2c2]/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-3.5 h-3.5 text-[#24c2c2]" />
        </div>
      )}
      <h3 className="text-[#0e4f6b] font-extrabold text-[10px] uppercase tracking-[0.12em]">{children}</h3>
    </div>
  );
}

export function RatingSelect({ label, name, value, onChange, required, error }) {
  const ratings = [
    { value: "4", label: "4 — Very Good" },
    { value: "3", label: "3 — Good" },
    { value: "2", label: "2 — Fair" },
    { value: "1", label: "1 — Poor" },
  ];
  return (
    <Field label={label} required={required} error={error}>
      <div className="flex flex-wrap gap-2">
        {ratings.map(({ value: v, label: lbl }) => {
          const selected = value === v;
          const colors = { "4": "#22c55e", "3": "#3b82f6", "2": "#f59e0b", "1": "#ef4444" };
          const color = colors[v];
          return (
            <motion.label
              key={v}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={[
                "flex items-center gap-2 px-3 py-2 rounded-xl border-2 cursor-pointer text-xs font-semibold transition-all",
                selected ? "shadow-sm" : "border-gray-200 text-gray-500 hover:border-gray-300 bg-white",
              ].join(" ")}
              style={selected ? { borderColor: color, backgroundColor: color + "18", color: color } : {}}
            >
              <input type="radio" name={name} value={v} checked={selected} onChange={onChange} className="sr-only" />
              {lbl}
            </motion.label>
          );
        })}
      </div>
    </Field>
  );
}
