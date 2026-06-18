import ZonalOffices from "@/components/about/ZonalOffices";

export const metadata = {
  title: "Zonal & State Offices | National Senior Secondary Education Commission",
  description:
    "NSSEC operates across all 6 geopolitical zones, 36 states and the FCT. Find NSSEC zonal and state offices near you, covering over 45,000 senior secondary schools and 14 million students.",
  keywords: [
    "NSSEC state offices",
    "NSSEC zonal offices",
    "NSSEC Nigeria offices",
    "senior secondary education zones Nigeria",
    "NSSEC geopolitical zones",
    "NSSEC coverage",
  ],
  alternates: { canonical: "/about/zonal-offices" },
  openGraph: {
    title: "Zonal & State Offices | NSSEC",
    description:
      "NSSEC's presence across Nigeria's 6 geopolitical zones, 36 States and the FCT — coordinating senior secondary education nationwide.",
    url: "https://nssec.gov.ng/about/zonal-offices",
    siteName: "NSSEC",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630, alt: "NSSEC Zonal Offices" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonal & State Offices | NSSEC",
    description: "NSSEC offices across Nigeria's 6 geopolitical zones and 36 states.",
    images: ["/nssec.jpeg"],
  },
};

export default function ZonalOfficesPage() {
  return <ZonalOffices />;
}
