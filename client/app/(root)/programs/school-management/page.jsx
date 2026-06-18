import SchoolManagement from "@/components/programs/SchoolManagement";

export const metadata = {
  title: "School Based Management Committee | NSSEC Programs",
  description:
    "NSSEC supports School Based Management Committees (SBMCs) that strengthen school governance through community engagement, parent participation, and transparent resource management.",
  keywords: ["SBMC Nigeria", "School Management Committee NSSEC", "School Governance Nigeria", "Community School Management"],
  alternates: { canonical: "https://nssec.gov.ng/programs/school-management" },
  openGraph: {
    title: "School Management Committee | NSSEC",
    description: "Empowering communities through decentralized, transparent school governance.",
    url: "https://nssec.gov.ng/programs/school-management",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Management Committee | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function SchoolManagementPage() {
  return <SchoolManagement />;
}
