import AboutPage from "../../components/About";
import { generateSEO } from "../../components/SEO";
  
export const metadata = generateSEO({
  title: "About NSSEC - National Senior Secondary Education Commission",
  description: "Learn about the National Senior Secondary Education Commission (NSSEC), our mission, vision, and commitment to transforming senior secondary education in Nigeria. Discover our history, leadership, and strategic objectives.",
  keywords: ["About NSSEC", "NSSEC Mission", "NSSEC Vision", "Education Commission Nigeria", "NSSEC Leadership", "Education Regulation", "Nigerian Education System"],
  pathname: "/about",
  image: "/nssec.jpeg",
});

export default function About () {
  return (
    <div className="flex flex-col items-center justify-center">
      <AboutPage />
    </div>
      
  );
}