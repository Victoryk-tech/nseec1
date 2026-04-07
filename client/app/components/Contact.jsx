"use client";

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import ContactPage from "./ContactPage";
import Footer from "./Footer";



export default function Contact() {
  const aboutContents1 = [
    {
      bgColor: "",
      section: <ContactPage/>,
    },
    {
      bgColor: "",
      section: <Footer />,
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="bg-background">
      {aboutContents1.map((content, index) => {
        // Define background styles based on content
        const bgStyle = content.bgImage
          ? { backgroundImage: `url(${content.bgImage})` }
          : { backgroundColor: content.bgColor || "" }; // Fallback to a default color

        return (
          <div
            key={index}
            className="w-full"
            style={{
              ...bgStyle,
              backgroundSize: "cover",
            }}
          >
            <div className="">
              {content.section}
            </div>
          </div>
        );
      })}
    </div>
  );
}
