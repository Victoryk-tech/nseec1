"use client"

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import Footer from "../components/Footer";
import NSSECLandingPage from "../components/NSSECLandingPage"


export default function Home() {
  const homeContents1 = [
  
    {
      bgColor: "",
      section: <NSSECLandingPage/>,
    },

    {
      bgColor: "",
      section: <Footer/>,
    },
 
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="bg-background">
    {homeContents1.map((content, index) => {
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
            backgroundSize: "cover", // Ensure the image covers the section
          }}
        >
          <div className="">{content.section}</div>
        </div>
      );
    })}
  </div>
  );
}
