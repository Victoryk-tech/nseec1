"use client";

import { Home, Search, FileQuestion, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/nssec.jpeg"
                alt="NSSEC Logo"
                fill
                
                className="rounded-lg object-cover"
              />
            </div>
            <div className="hidden sm:block">
             
              <p className="text-xs md:text-sm opacity-90 leading-tight max-w-48">
                National Senior Secondary Education Commission
              </p>
            </div>
          </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                <FileQuestion className="w-16 h-16 text-[#24c2c2]" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#24c2c2] rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Page Not Available
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            We`re sorry, but the page you`re looking for is not available at the moment.
          </p>
          <p className="text-base text-gray-500 mb-10">
            The page may have been moved, removed, or is temporarily unavailable. Please check the URL or return to the homepage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#24c2c2] text-white font-medium rounded-lg hover:bg-[#1fa8a8] transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-100 pt-8">
            <p className="text-sm font-medium text-gray-900 mb-4">You might be looking for:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              <Link href="/contact" className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-[#24c2c2] hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/about" className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-[#24c2c2] hover:text-white transition-colors">
                About
              </Link>
              <Link href="/core-departments" className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-[#24c2c2] hover:text-white transition-colors">
                Departments
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}