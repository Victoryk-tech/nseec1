import GoverningBoard from "@/components/about/GoverningBoard";

export const metadata = {
  title: "Governing Board | National Senior Secondary Education Commission",
  description:
    "Learn about the NSSEC Governing Board — its composition, functions, and role in providing strategic oversight and policy direction for the Commission's mandate.",
  keywords: [
    "NSSEC governing board",
    "NSSEC board members",
    "NSSEC leadership",
    "National Senior Secondary Education Commission board",
    "education commission governance Nigeria",
  ],
  alternates: { canonical: "/about/governing-board" },
  openGraph: {
    title: "Governing Board | NSSEC",
    description:
      "The NSSEC Governing Board provides strategic oversight and policy direction for senior secondary education in Nigeria.",
    url: "https://nssec.gov.ng/about/governing-board",
    siteName: "NSSEC",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630, alt: "NSSEC Governing Board" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Governing Board | NSSEC",
    description: "Composition and functions of the NSSEC Governing Board.",
    images: ["/nssec.jpeg"],
  },
};

export default function GoverningBoardPage() {
  return <GoverningBoard />;
}
