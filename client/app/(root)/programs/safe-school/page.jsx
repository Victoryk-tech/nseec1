import SafeSchool from "@/components/programs/SafeSchool";

export const metadata = {
  title: "Safe School Initiative | NSSEC Programs",
  description:
    "The NSSEC Safe School Initiative promotes secure, inclusive, and violence-free learning environments across all senior secondary schools in Nigeria, aligned with the Safe Schools Declaration.",
  keywords: ["NSSEC Safe Schools", "Safe School Initiative Nigeria", "School Security Nigeria", "Education Safety NSSEC"],
  alternates: { canonical: "https://nssec.gov.ng/programs/safe-school" },
  openGraph: {
    title: "Safe School Initiative | NSSEC",
    description: "Creating secure, inclusive learning environments for every Nigerian student.",
    url: "https://nssec.gov.ng/programs/safe-school",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe School Initiative | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function SafeSchoolPage() {
  return <SafeSchool />;
}
