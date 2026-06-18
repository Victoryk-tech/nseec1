import Organogram from "@/components/about/Organogram";

export const metadata = {
  title: "Organogram | National Senior Secondary Education Commission",
  description:
    "The organisational chart of NSSEC showing the Executive Secretary, five departments, six units, and direct reporting relationships within the Commission.",
  keywords: [
    "NSSEC organogram",
    "NSSEC organisational structure",
    "NSSEC departments",
    "NSSEC units",
    "National Senior Secondary Education Commission structure",
    "NSSEC chart",
  ],
  alternates: { canonical: "/about/organogram" },
  openGraph: {
    title: "Organogram | NSSEC",
    description:
      "Visual organisational chart of the National Senior Secondary Education Commission — ES, 5 Departments and 6 Units.",
    url: "https://nssec.gov.ng/about/organogram",
    siteName: "NSSEC",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630, alt: "NSSEC Organisational Chart" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organogram | NSSEC",
    description: "The full organisational chart of NSSEC — structure, departments, and units.",
    images: ["/nssec.jpeg"],
  },
};

export default function OrganogramPage() {
  return <Organogram />;
}
