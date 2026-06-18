"use client";
import Projects from "./Projected";
import ConstituencyProject from "./ConstituencyProject"
import Footer from "./Footer";

export const ProgramsPage= () =>  {
  const aboutContents1 = [
    {
      color: "",
      section: <Projects/>,
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





export const ProjectPage= () =>  {
  const aboutContents1 = [
    {
      color: "",
      section: <ConstituencyProject/>,
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
