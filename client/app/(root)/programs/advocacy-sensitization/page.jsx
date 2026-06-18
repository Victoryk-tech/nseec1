import AdvocacySensitization from "@/components/programs/AdvocacySensitization";

export const metadata = {
  title: "Advocacy & Sensitization Visits | NSSEC Programs",
  description:
    "NSSEC engages state governments, traditional rulers, and education stakeholders through strategic advocacy and sensitization visits to align policies and mobilize support for educational reform.",
  keywords: ["NSSEC Advocacy", "Sensitization Visits Nigeria", "SSSEB Establishment", "NSSEC Stakeholder Engagement", "Education Reform Nigeria"],
  alternates: { canonical: "https://nssec.gov.ng/programs/advocacy-sensitization" },
  openGraph: {
    title: "Advocacy & Sensitization | NSSEC Programs",
    description: "Mobilizing stakeholder support for senior secondary education reform across Nigeria.",
    url: "https://nssec.gov.ng/programs/advocacy-sensitization",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advocacy & Sensitization | NSSEC Programs",
    images: ["/nssec.jpeg"],
  },
};

export default function AdvocacySensitizationPage() {
  return <AdvocacySensitization />;
}
