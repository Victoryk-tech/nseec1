"use client";

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import ContactPage from "./contact/ContactPage";
import Footer from "./Footer";

export default function Contact() {
  useEffect(() => {
    Aos.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <div>
      <ContactPage />
      <Footer />
    </div>
  );
}
