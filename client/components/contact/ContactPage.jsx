"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Building2 } from "lucide-react";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactEmails from "./ContactEmails";

const TABS = [
  { id: "form", label: "Send a Message", icon: MessageSquare },
  { id: "departments", label: "Contact a Department", icon: Building2 },
];

const ContactPage = () => {
  const [view, setView] = useState("form");

  return (
    <div className="min-h-screen bg-white">
      <ContactHero />

      {/* ── Sticky tab bar ──────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex" role="tablist">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                onClick={() => setView(id)}
                className={`relative flex items-center gap-2 px-5 sm:px-8 py-4 text-sm font-semibold transition-colors duration-200 outline-none ${
                  view === id
                    ? "text-[#24c2c2]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">
                  {id === "form" ? "Message" : "Departments"}
                </span>

                {/* Animated underline */}
                {view === id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full bg-gradient-to-r from-[#24c2c2] to-[#1ea8a8]"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── View content ────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          {view === "form" ? (
            <ContactForm onSwitchToDepts={() => setView("departments")} />
          ) : (
            <ContactEmails onSwitchToForm={() => setView("form")} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
