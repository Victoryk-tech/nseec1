import TVETPage from "@/components/programs/TVET";

export const metadata = {
  title: "TVET | NSSEC Programs",
  description:
    "The NSSEC Technical and Vocational Education Training exhibitions promote skills-based education, industry engagement, and innovation among senior secondary school students across Nigeria.",
  keywords: ["NSSEC TVET", "Technical Education Nigeria", "Vocational Training Nigeria", "TVET Exhibitions NSSEC"],
  alternates: { canonical: "https://nssec.gov.ng/programs/tvet" },
  openGraph: {
    title: "TVET | NSSEC Programs",
    description: "Connecting education to industry — empowering the next generation with practical, marketable skills.",
    url: "https://nssec.gov.ng/programs/tvet",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TVET | NSSEC Programs",
    images: ["/nssec.jpeg"],
  },
};

export default function TVETRoute() {
  return <TVETPage />;
}
