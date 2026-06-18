"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FormProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [success, setSuccess] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  // ── subscribe ──────────────────────────────────────────────────────────────
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!subscriberName.trim() || subscriberName.trim().length < 2) {
      setMessage("Please enter your full name.");
      setIsSuccess(false);
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required.");
      setIsSuccess(false);
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      setIsSuccess(false);
      return;
    }

    if (!agreed) {
      setMessage("Please agree to receive updates before subscribing.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(true);

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: subscriberName.trim(), email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
        setSubscriberName("");
        setIsSuccess(true);
        setAgreed(false);
      } else {
        setMessage(data.error || "Subscription failed.");
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Subscription Error:", err);
      setMessage("An unexpected error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  // ── contact ────────────────────────────────────────────────────────────────
  const handleContact = async (e) => {
    e?.preventDefault?.();

    let hasError = false;

    setNameError("");
    setEmailError("");
    setMessageError("");
    setSubjectError("");

    if (!name.trim()) {
      setNameError("Full name is required.");
      hasError = true;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters.");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Email address is required.");
      hasError = true;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!subject.trim()) {
      setSubjectError("Please provide a subject for your message.");
      hasError = true;
    } else if (subject.trim().length < 3) {
      setSubjectError("Subject must be at least 3 characters.");
      hasError = true;
    }

    if (!userMessage.trim()) {
      setMessageError("Please write your message before sending.");
      hasError = true;
    } else if (userMessage.trim().length < 10) {
      setMessageError("Message must be at least 10 characters.");
      hasError = true;
    }

    if (hasError) {
      setSuccess(false);
      return;
    }

    setLoading(true);
    setIsMessage("");
    setSuccess(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message: userMessage }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsMessage(data.message || "Your message was sent successfully! We'll get back to you soon.");
        setEmail("");
        setName("");
        setUserMessage("");
        setSubject("");
        setSuccess(true);
        window.history.replaceState(null, "", "/contact");
      } else {
        setIsMessage(data.error || "Failed to send your message. Please try again.");
        setSuccess(false);
      }
    } catch (err) {
      console.error("Contact Error:", err);
      setIsMessage("A network error occurred. Please check your connection and try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (isMessage) {
      const timer = setTimeout(() => setIsMessage(""), 60000);
      return () => clearTimeout(timer);
    }
  }, [isMessage]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <FormContext.Provider
      value={{
        nameError,
        emailError,
        messageError,
        subjectError,
        email,
        setEmail,
        name,
        setName,
        setSubject,
        subject,
        loading,
        handleSubscribe,
        message,
        isMessage,
        isSuccess,
        success,
        isModalOpen,
        closeModal,
        agreed,
        setAgreed,
        subscriberName,
        setSubscriberName,
        userMessage,
        setUserMessage,
        handleContact,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
