import ConstituencyProjects from "@/components/projects/ConstituencyProjects";

export const metadata = {
  title: "Constituency Projects 2025/2026 | NSSEC",
  description:
    "NSSEC's constituency construction programme — tracking infrastructure upgrades across 50 senior secondary schools in all six geopolitical zones of Nigeria.",
  keywords: [
    "NSSEC Constituency Projects",
    "School Construction Nigeria 2025",
    "NSSEC Infrastructure",
    "Secondary School Projects Nigeria",
    "NSSEC 2025 2026",
  ],
  alternates: { canonical: "https://nssec.gov.ng/projects/constituency-projects" },
  openGraph: {
    title: "Constituency Projects 2025/2026 | NSSEC",
    description: "50 school construction and renovation projects across Nigeria's six geopolitical zones.",
    url: "https://nssec.gov.ng/projects/constituency-projects",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Constituency Projects 2025/2026 | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function ConstituencyProjectsPage() {
  return <ConstituencyProjects />;
}
