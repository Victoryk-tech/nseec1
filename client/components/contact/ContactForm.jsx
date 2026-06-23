"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useMemo } from "react";
import {
  MapPin, Phone, Mail, Clock,
  Send, User, MessageSquare,
  CheckCircle, AlertCircle, Loader2, Building2, ArrowRight,
} from "lucide-react";
import { useContactFormStore } from "@/store/contactStore";

/* ─────────────────── helpers ─────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClasses = (hasError, padLeft = true) =>
  [
    "block w-full",
    padLeft ? "pl-10" : "pl-4",
    "pr-4 py-3.5 rounded-xl border text-sm transition-all duration-200",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-red-400 focus:ring-red-200 bg-red-50/40 placeholder-red-300"
      : "border-gray-200 focus:ring-[#24c2c2]/25 focus:border-[#24c2c2] bg-white placeholder-gray-400",
  ].join(" ");

/* ─────────────────── sub-components ─────────────────── */

const InfoCard = ({ icon: Icon, title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.42, delay }}
    whileHover={{ y: -3, boxShadow: "0 18px 36px rgba(0,0,0,0.07)" }}
    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="shrink-0 bg-[#24c2c2]/10 p-3 rounded-xl">
        <Icon className="h-5 w-5 text-[#24c2c2]" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
        {children}
      </div>
    </div>
  </motion.div>
);

const FieldWrapper = ({ label, error, icon: Icon, children }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (error) {
      controls.start({ x: [0, -8, 8, -8, 8, -4, 0], transition: { duration: 0.42 } });
    }
  }, [error, controls]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <motion.div animate={controls} className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon className={`h-5 w-5 transition-colors duration-200 ${error ? "text-red-400" : "text-gray-400"}`} />
          </div>
        )}
        {children}
      </motion.div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5 overflow-hidden"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────── main component ─────────────────── */

const ContactForm = ({ onSwitchToDepts }) => {
  const {
    name, email, subject, message,
    errors, status, statusMessage,
    setField, submit, reset,
  } = useContactFormStore();

  const isFormValid = useMemo(
    () =>
      name.trim().length >= 2 &&
      EMAIL_RE.test(email.trim()) &&
      subject.trim().length >= 3 &&
      message.trim().length >= 10,
    [name, email, subject, message]
  );

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <section className="bg-gray-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── LEFT: quick info ────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-1"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1.5">Get In Touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fill out the form and our team will get back to you within one business day.
              </p>
            </motion.div>

            <InfoCard icon={MapPin} title="Office Address" delay={0.08}>
              <p className="text-gray-500 text-xs leading-relaxed">Plot 14 Yobe Close, Maitama, Abuja</p>
            </InfoCard>
            <InfoCard icon={Phone} title="Call Us" delay={0.14}>
              <p className="text-gray-500 text-xs">09155555268</p>
              <p className="text-gray-500 text-xs">09055557119</p>
            </InfoCard>
            <InfoCard icon={Mail} title="Email" delay={0.2}>
              <p className="text-gray-500 text-xs">admin@nssec.gov.ng</p>
            </InfoCard>
            <InfoCard icon={Clock} title="Office Hours" delay={0.26}>
              <p className="text-gray-500 text-xs">Monday – Friday</p>
              <p className="text-gray-700 text-xs font-semibold">9:00 AM – 4:00 PM</p>
            </InfoCard>

            <motion.button
              onClick={onSwitchToDepts}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.34 }}
              whileHover={{ x: 4 }}
              className="mt-2 flex items-center gap-3 p-4 rounded-2xl border border-[#24c2c2]/20 bg-[#24c2c2]/5 text-left group transition-colors hover:bg-[#24c2c2]/10"
            >
              <div className="shrink-0 bg-[#24c2c2]/15 p-2.5 rounded-xl">
                <Building2 className="h-4 w-4 text-[#24c2c2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#24c2c2]">Contact a Department Directly</p>
                <p className="text-xs text-gray-400 mt-0.5">View all 17 department emails</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#24c2c2] shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </div>

          {/* ── RIGHT: form ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-100/60 border border-gray-100">

              {/* Success state */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mb-5">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{statusMessage}</p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div className="mb-7">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
                      <p className="text-gray-400 text-sm">We&apos;ll get back to you as soon as possible.</p>
                      <div className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#24c2c2] to-[#1ea8a8]" />
                    </div>

                    <form onSubmit={submit} className="space-y-5" noValidate>
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FieldWrapper label="Full Name *" error={errors.name} icon={User}>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setField("name", e.target.value)}
                            className={fieldClasses(!!errors.name)}
                            placeholder="Your full name"
                          />
                        </FieldWrapper>
                        <FieldWrapper label="Email Address *" error={errors.email} icon={Mail}>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setField("email", e.target.value)}
                            className={fieldClasses(!!errors.email)}
                            placeholder="your@email.com"
                          />
                        </FieldWrapper>
                      </div>

                      {/* Subject */}
                      <FieldWrapper label="Subject *" error={errors.subject}>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setField("subject", e.target.value)}
                          className={fieldClasses(!!errors.subject, false)}
                          placeholder="What is your message about?"
                        />
                      </FieldWrapper>

                      {/* Message */}
                      <FieldWrapper label="Your Message *" error={errors.message} icon={MessageSquare}>
                        <textarea
                          value={message}
                          onChange={(e) => setField("message", e.target.value)}
                          rows={5}
                          className={fieldClasses(!!errors.message) + " resize-none"}
                          placeholder="Type your message here…"
                        />
                      </FieldWrapper>

                      {/* Error banner */}
                      <AnimatePresence mode="wait">
                        {status === "error" && statusMessage && (
                          <motion.div
                            key="error-banner"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                            className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium border bg-red-50 text-red-700 border-red-200"
                          >
                            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                            <span>{statusMessage}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div>
                          <p className="text-xs text-gray-400">* All fields required</p>
                          <AnimatePresence>
                            {!isFormValid && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-amber-500 mt-0.5 overflow-hidden"
                              >
                                Complete all fields to enable sending.
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isLoading || !isFormValid}
                          whileHover={isFormValid && !isLoading ? { scale: 1.04, y: -2 } : {}}
                          whileTap={isFormValid && !isLoading ? { scale: 0.97 } : {}}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#24c2c2] to-[#1ea8a8] text-white font-semibold rounded-xl shadow-lg shadow-[#24c2c2]/25 focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:ring-offset-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none enabled:hover:shadow-xl enabled:hover:shadow-[#24c2c2]/35"
                        >
                          {isLoading ? (
                            <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                          ) : (
                            <><Send className="h-5 w-5" /> Send Message</>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
