import {CoreSection} from "../../components/DepartmentSection";
import { generateSEO } from "../../components/SEO";

export const metadata = generateSEO({
  title: "NSSEC Core Departments - National Senior Secondary Education Commission",
  description: "Discover the core departments of the National Senior Secondary Education Commission (NSSEC). Learn about our organizational structure, departmental functions, and the teams driving educational excellence across Nigeria.",
  keywords: ["NSSEC Departments", "Education Departments", "NSSEC Structure", "Organizational Units", "NSSEC Teams", "Education Administration"],
  pathname: "/core-departments",
  image: "/nssec.jpeg",
});

export default function CoreDepartments () {
  return (
    <div className="">
      <CoreSection/>
      </div>
  
  );
}