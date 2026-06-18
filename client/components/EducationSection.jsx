// components/Header.js
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import EducationDataLanding from './EducationDataLanding';
import Data from "./Data"
import Footer from "./Footer";

export const EducationSection = () => {
  const aboutContents1 = [
    {
      color: "",
      section: <Data/>,
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



export const DemographicsSection = () => {
  const aboutContents1 = [
    {
      color: "",
      section: <EducationDataLanding/>,
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
