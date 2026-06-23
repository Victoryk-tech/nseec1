"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { STEPS } from "./constants";

export default function StepProgress({ step, onStepClick }) {
  const pct = (step / (STEPS.length - 1)) * 100;

  return (
    <div className="mb-8">

      {/* ── Mobile: compact bar + dots ── */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {(() => { const Icon = STEPS[step].icon; return <Icon className="w-4 h-4 text-[#24c2c2]" />; })()}
            <span className="text-sm font-bold text-[#0e4f6b]">{STEPS[step].title}</span>
          </div>
          <span className="text-xs text-gray-400 font-bold tabular-nums">{step + 1}/{STEPS.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#24c2c2] to-[#1a9999] rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-center gap-1.5 mt-2.5">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => i <= step && onStepClick(i)}
              title={s.title}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-5 bg-[#0e4f6b]" : i < step ? "w-1.5 bg-[#24c2c2]" : "w-1.5 bg-gray-200",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop / tablet: full stepper ── */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Track line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-100 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-[#24c2c2] to-[#1a9999] origin-left"
              initial={false}
              animate={{ scaleX: step === 0 ? 0 : pct / 100 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          <div className="relative z-10 flex items-start justify-between">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done   = i < step;
              const active = i === step;
              const click  = i <= step;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2" style={{ width: `${100 / STEPS.length}%` }}>
                  <motion.button
                    type="button"
                    onClick={() => click && onStepClick(i)}
                    disabled={!click}
                    whileHover={click ? { scale: 1.12 } : {}}
                    whileTap={click   ? { scale: 0.93 } : {}}
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      done
                        ? "bg-[#24c2c2] border-[#24c2c2] shadow-md shadow-[#24c2c2]/30"
                        : active
                        ? "bg-[#0e4f6b] border-[#0e4f6b] shadow-md shadow-[#0e4f6b]/25 ring-4 ring-[#0e4f6b]/15"
                        : "bg-white border-gray-200",
                    ].join(" ")}
                  >
                    {done ? (
                      <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.span>
                    ) : (
                      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-300"}`} />
                    )}
                  </motion.button>
                  <span className={[
                    "text-[9px] font-bold text-center leading-tight max-w-[56px] transition-colors duration-200",
                    active ? "text-[#0e4f6b]" : done ? "text-[#24c2c2]" : "text-gray-400",
                  ].join(" ")}>
                    {s.shortTitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
