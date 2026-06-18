// app/(root)/about/layout.tsx or layout.jsx
import {DemographicsSection} from "@/components/EducationSection";
export const metadata = {
  title: "Demographics",
  description: "demographics.",
};

export default function ContactPage () {
  return (
   
      <div className="">
       
        <DemographicsSection/>         
      </div>
   
  );
}