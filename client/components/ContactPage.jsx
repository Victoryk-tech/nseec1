import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { useFormContext } from "./contexts/FormContext";

const ContactPage = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    userMessage,
    setUserMessage,
    handleContact, // comes from FormContext
    loading,
    success,
    isMessage,
    nameError,
    emailError,
    messageError,
    subjectError,
  } = useFormContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}

      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg shadow-[#24c2c2]/10 mb-4">
              <Phone className="w-10 h-10 text-[#24c2c2]" />
            </div>
            <div className="space-y-4">
              <div className="inline-block">
                <p className="text-sm font-semibold text-[#24c2c2] uppercase tracking-wider mb-2">
                  National Senior Secondary Education Commission
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We`re here to help and answer any questions you might have. We
                look forward to hearing from you.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <Mail className="w-4 h-4 text-[#24c2c2]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Office Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#24c2c2] bg-opacity-10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-[#24c2c2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Office Address
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Plot 14 Yobe Close, Maitama, Abuja
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#24c2c2] bg-opacity-10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-[#24c2c2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Call Us
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">09155555268</p>
                    <p className="text-gray-600">09055557119</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#24c2c2] bg-opacity-10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-[#24c2c2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600">admin@nssec.gov.ng</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-[#24c2c2] bg-opacity-10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-[#24c2c2]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Opening Hours
                  </h3>
                  <p className="text-gray-600">Monday - Friday 9am - 4pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg">
                  We really appreciate you taking the time to get in touch.
                  Please fill in the form below.
                </p>
              </div>

              <form onSubmit={handleContact} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {nameError && (
                      <p className="text-red-500 text-sm mt-1">{nameError}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent"
                    placeholder="Enter the subject of your message"
                  />
                  {subjectError && (
                    <p className="text-red-500 text-sm mt-1">{subjectError}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave your message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      rows={6}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:border-transparent resize-vertical"
                      placeholder="Type your message here..."
                    />
                  </div>
                  {messageError && (
                    <p className="text-red-500 text-sm mt-1">{messageError}</p>
                  )}
                </div>

                {/* Feedback Message */}
                {isMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      success
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-8 py-3 bg-[#24c2c2] text-white font-semibold rounded-lg hover:bg-[#1ea8a8] focus:outline-none focus:ring-2 focus:ring-[#24c2c2] focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#24c2c2] to-[#1ea8a8] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">We`re Here to Help</h3>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Our team is committed to providing you with the best possible
              service. Whether you have questions, feedback, or need assistance,
              we`re always ready to help. Thank you for choosing NSSEC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
