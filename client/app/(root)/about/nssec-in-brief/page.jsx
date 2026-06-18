import NSSECInBrief from "@/components/about/NSSECInBrief";

export const metadata = {
  title: "NSSEC In Brief | National Senior Secondary Education Commission",
  description:
    "Learn about the National Senior Secondary Education Commission — its history, establishment under the NSSEC Act 2023, statutory mandates, key achievements, and organisational composition.",
  keywords: [
    "NSSEC overview",
    "National Senior Secondary Education Commission history",
    "NSSEC Act 2023",
    "senior secondary education Nigeria",
    "NSSEC mandate",
    "NSSEC establishment",
  ],
  alternates: { canonical: "/about/nssec-in-brief" },
  openGraph: {
    title: "NSSEC In Brief | National Senior Secondary Education Commission",
    description:
      "Discover NSSEC's history, mandate, composition and achievements since its establishment in April 2021.",
    url: "https://nssec.gov.ng/about/nssec-in-brief",
    siteName: "NSSEC",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630, alt: "NSSEC Agency Profile" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NSSEC In Brief",
    description: "History, mandate, composition and achievements of the National Senior Secondary Education Commission.",
    images: ["/nssec.jpeg"],
  },
};

export default function NSSECInBriefPage() {
  return <NSSECInBrief />;
}
