import {ProgramsPage} from "../../components/ProgramsPage";
import { generateSEO } from "../../components/SEO";

export const metadata = generateSEO({
  title: "NSSEC Programs - National Senior Secondary Education Commission",
  description: "Explore the comprehensive programs and initiatives by the National Senior Secondary Education Commission (NSSEC). Discover our educational programs, training initiatives, and development schemes for senior secondary education in Nigeria.",
  keywords: ["NSSEC Programs", "Education Programs Nigeria", "Secondary Education Initiatives", "NSSEC Training", "Educational Development", "School Programs", "NSSEC Initiatives"],
  pathname: "/programs",
  image: "/nssec.jpeg",
});

export default function Programs () {
  return (
    <div className="">
      <ProgramsPage/>
    </div>
     
  
  );
}