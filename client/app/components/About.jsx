"use client";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Image from "next/image";

export default function AboutPage() {
  const aboutContents1 = [
    {
      color: "",
      section: <AboutUs />,
    },
  ];
  return (
    <div>
      <div className="min-h-screen">
       

        <div className="">
          {aboutContents1.map((content, index) => {
            // Define background styles based on content
            const bgStyle = content.bgImage
              ? { backgroundImage: `url(${content.bgImage})` }
              : { backgroundColor: content.color || "" }; // Fallback to a default color

            return (
              <div
                key={index}
                className="w-full"
                style={{
                  ...bgStyle,
                  backgroundSize: "cover", // Ensure the image covers the section
                }}
              >
                <div className="">
                  {content.section}
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}
