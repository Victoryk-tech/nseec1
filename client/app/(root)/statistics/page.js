// app/(root)/about/layout.tsx or layout.jsx
import {EducationSection} from "../../components/EducationSection";
export const metadata = {
  title: "Education Data",
  description: "contact us.",
};

export default function ContactPage () {
  return (
   
      <div className="">
       
        <EducationSection/>         
      </div>
   
  );
}