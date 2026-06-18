import NSSECIntervention from "@/components/projects/NSSECIntervention";

export const metadata = {
  title: "NSSEC Intervention Projects | NSSEC",
  description:
    "NSSEC's infrastructure intervention projects deliver classroom renovations, laboratory construction, ICT facilities, and security infrastructure to senior secondary schools across Nigeria.",
  keywords: [
    "NSSEC Intervention",
    "School Infrastructure Nigeria",
    "NSSEC Construction Projects",
    "Secondary School Renovation Nigeria",
    "NSSEC Annex Building",
  ],
  alternates: { canonical: "https://nssec.gov.ng/projects/nssec-intervention" },
  openGraph: {
    title: "NSSEC Intervention Projects | NSSEC",
    description:
      "Transforming learning environments — NSSEC delivers modern classrooms, labs, ICT blocks, and safe infrastructure to schools nationwide.",
    url: "https://nssec.gov.ng/projects/nssec-intervention",
    type: "website",
    images: [{ url: "/projects/nssec-annex-building.jpg", width: 1200, height: 630, alt: "NSSEC Annex Building" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSSEC Intervention Projects | NSSEC",
    images: ["/projects/nssec-annex-building.jpg"],
  },
};

export default function NSSECInterventionPage() {
  return <NSSECIntervention />;
}
