import MissionVision from "@/components/about/MissionVision";

export const metadata = {
  title: "Mission, Vision & Core Values | NSSEC",
  description:
    "NSSEC's mission is to produce senior secondary graduates with life skills for further studies. Our vision is to reposition senior secondary education in Nigeria for global competitiveness.",
  keywords: [
    "NSSEC mission",
    "NSSEC vision",
    "NSSEC core values",
    "senior secondary education mission Nigeria",
    "NSSEC purpose",
    "education values Nigeria",
  ],
  alternates: { canonical: "/about/mission-vision" },
  openGraph: {
    title: "Mission, Vision & Core Values | NSSEC",
    description:
      "Discover NSSEC's mission, vision, and the core values that guide all our programmes and partnerships.",
    url: "https://nssec.gov.ng/about/mission-vision",
    siteName: "NSSEC",
    images: [
      {
        url: "/about/mission-vision.jpg",
        width: 1200,
        height: 630,
        alt: "NSSEC Mission and Vision",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission, Vision & Core Values | NSSEC",
    description: "NSSEC's guiding mission, vision and six core values.",
    images: ["/about/mission-vision.jpg"],
  },
};

export default function MissionVisionPage() {
  return <MissionVision />;
}
