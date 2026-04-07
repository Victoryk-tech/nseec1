"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "../lib/imageUrl";
import { useBlogContext } from "./contexts/BlogContext";
import nih from "../../public/nih.jpeg";
import ministry from "../../public/ministry.jpeg";
import coderina from "../../public/coderina.png";
import Link from "next/link";

const partners = [
  { logo: nih, link: "https://nih.gov", size: 80 },
  { logo: ministry, link: "https://ministry.gov", size: 100 },
  { logo: coderina, link: "https://coderina.org", size: 90 },
  { logo: coderina, link: "https://coderina.org", size: 90 },
  { logo: coderina, link: "https://coderina.org", size: 90 },
  { logo: coderina, link: "https://coderina.org", size: 90 },
];

const GallerySection = () => {
  const { blogs, loading, error, formatTime } = useBlogContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const galleryItems = blogs
    ?.filter((blog) => blog.mainCategory === "gallery")
    .sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt))
    .map((blog) => ({
      id: blog._id,
      title: blog.title,
      subtitle: formatTime(blog._createdAt),
      image: blog.image ? urlFor(blog.image).url() : "/nssec.jpeg",
      description: blog.description || "",
    })) || [];

  useEffect(() => {
    if (isAutoPlaying && galleryItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, isAutoPlaying, galleryItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="py-8">
      <div className="mx-auto px-2 max-w-7xl grid md:grid-cols-2 md:gap-6 lg:gap-8 md:max-h-[500px]">

        {/* Gallery Slider - hidden on mobile */}
        <div className="relative hidden md:block rounded-3xl overflow-hidden bg-white lg:order-1">
          {loading ? (
            <div className="h-[450px] bg-gray-200 animate-pulse rounded-3xl" />
          ) : error || !galleryItems.length ? (
            <div className="h-[450px] flex items-center justify-center text-gray-600">
              {error ? "Error loading gallery" : "No gallery items"}
            </div>
          ) : (
            <div className="relative h-[450px] overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryItems.map((item) => (
                  <div key={item.id} className="min-w-full h-full relative">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-200 mb-2">{item.subtitle}</p>
                      <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {galleryItems.length > 1 && (
                <>
                  <button onClick={prevSlide} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-[#24c2c2] hover:text-white transition-all duration-300 hover:scale-110">
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button onClick={nextSlide} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-[#24c2c2] hover:text-white transition-all duration-300 hover:scale-110">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Partners Section */}
        <div className="relative lg:order-2 h-40 md:h-[500px] bg-white rounded-2xl overflow-hidden shadow-sm p-2">

          {/* Desktop scattered logos */}
          <div className="hidden lg:block relative w-full h-full">
            {partners.map((partner, idx) => (
              <Link key={idx} href={partner.link} target="_blank" rel="noopener noreferrer"
                className="absolute rounded-lg shadow-md p-2 bg-white"
                style={{
                  top: `${20 + idx * 25}%`, // static positions
                  left: `${15 + idx * 30}%`,
                  width: `${partner.size}px`,
                  height: `${partner.size}px`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image src={partner.logo} alt={`Partner ${idx + 1}`} width={partner.size} height={partner.size} className="object-contain"/>
              </Link>
            ))}
          </div>

          {/* Mobile horizontal sliding logos */}
          <div className="lg:hidden overflow-hidden relative h-32">
            <div className="flex animate-slide gap-6">
              {partners.concat(partners).map((partner, idx) => (
                <a key={idx} href={partner.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <Image src={partner.logo} alt={`Partner ${idx + 1}`} width={partner.size} height={partner.size} className="object-contain"/>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

     
    </div>
  );
};

export default GallerySection;
