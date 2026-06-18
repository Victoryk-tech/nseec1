import ExecutiveSecretary from "@/components/about/ExecutiveSecretary";

export const metadata = {
  title: "Office of the Executive Secretary | NSSEC",
  description:
    "The Executive Secretary's Office (ESO) provides strategic leadership for NSSEC. Learn about Dr. Iyela Ajayi's mandate, responsibilities, and the Commission's key achievements under this office.",
  keywords: [
    "NSSEC Executive Secretary",
    "Dr Iyela Ajayi NSSEC",
    "ESO NSSEC",
    "NSSEC leadership",
    "National Senior Secondary Education Commission head",
    "NSSEC strategic direction",
  ],
  alternates: { canonical: "/about/executive-secretary" },
  openGraph: {
    title: "Office of the Executive Secretary | NSSEC",
    description:
      "Strategic leadership and coordination of NSSEC's mandate under the Executive Secretary's Office.",
    url: "https://nssec.gov.ng/about/executive-secretary",
    siteName: "NSSEC",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630, alt: "NSSEC Executive Secretary Office" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Office of the Executive Secretary | NSSEC",
    description: "Dr. Iyela Ajayi's office — mandate, responsibilities and strategic achievements.",
    images: ["/nssec.jpeg"],
  },
};

export default function ExecutiveSecretaryPage() {
  return <ExecutiveSecretary />;
}
