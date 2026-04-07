"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
  
  // subscribers
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required.");
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
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
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

  // handle contact

  const handleContact = async (e) => {
    e?.preventDefault?.();

    let hasError = false;

    // Reset all errors before validation
    setNameError("");
    setEmailError("");
    setMessageError("");
    setSubjectError("");

    if (!name.trim()) {
      setNameError("Please enter your name.");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    }

    if (!userMessage.trim()) {
      setMessageError("Please write your message.");
      hasError = true;
    }
    
    if (!subject.trim()) {
      setSubjectError("Please write the subject of your message.");
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
        setIsMessage(data.message || "Message sent successfully!");
        setEmail("");
        setName("");
        setUserMessage("");
        setSuccess(true);

        // Clean up URL
        window.history.replaceState(null, "", "/contact");
      } else {
        setIsMessage(data.error || "Failed to send message.");
        setSuccess(false);
      }
    } catch (err) {
      console.error("Contact Error:", err);
      setIsMessage("Network issue, Please try again.");
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
  }, [message, setMessage]);

  // blog form

  useEffect(() => {
    if (isMessage) {
      const timer = setTimeout(() => setIsMessage(""), 60000);
      return () => clearTimeout(timer);
    }
  }, [isMessage, setIsMessage]);

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
