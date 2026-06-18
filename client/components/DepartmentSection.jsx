// components/Header.js
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Office from './Office';
import CoreDepartment from "./CoreDepartment";
import EventsSection from "./EventsSection";
import Footer from "./Footer";

export const OfficeSection = () => {
  const aboutContents1 = [
    {
      color: "",
      section: <Office/>,
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


export const CoreSection = () => {
  const aboutContents1 = [
    {
      color: "",
      section: <CoreDepartment/>,
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


export const Media = () => {
  const aboutContents1 = [
    {
      color: "",
      section: <EventsSection/>,
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

