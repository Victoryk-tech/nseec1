import DevelopmentPartners from "@/components/about/DevelopmentPartners";

export const metadata = {
  title: "Development Partners | National Senior Secondary Education Commission",
  description:
    "NSSEC collaborates with multilateral agencies, bilateral partners, civil society organisations, and research institutions to improve senior secondary education outcomes across Nigeria.",
  keywords: [
    "NSSEC development partners",
    "NSSEC partnerships",
    "education partners Nigeria",
    "NSSEC donor agencies",
    "NSSEC international collaboration",
    "senior secondary education funding Nigeria",
  ],
  alternates: { canonical: "/about/development-partners" },
  openGraph: {
    title: "Development Partners | NSSEC",
    description:
      "NSSEC's collaboration with UNICEF, World Bank, USAID, and other partners to transform secondary education in Nigeria.",
    url: "https://nssec.gov.ng/about/development-partners",
    siteName: "NSSEC",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630, alt: "NSSEC Development Partners" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Development Partners | NSSEC",
    description: "NSSEC's national and international partnerships for advancing secondary education in Nigeria.",
    images: ["/nssec.jpeg"],
  },
};

export default function DevelopmentPartnersPage() {
  return <DevelopmentPartners />;
}
