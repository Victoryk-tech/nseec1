import DepartmentsOverview from "@/components/departments/DepartmentsOverview";


export const metadata = {
  title: "Departments | National Senior Secondary Education Commission",
  description:
    "Explore the six core departments of NSSEC — Quality Assurance, Human Resource Management, Finance & Accounts, Planning Research & Statistics, Teacher Development & International Partnership, and Physical Planning.",
  keywords: [
    "NSSEC departments",
    "Quality Assurance NSSEC",
    "Human Resource Management NSSEC",
    "Finance Accounts NSSEC",
    "Planning Research Statistics NSSEC",
    "Teacher Development NSSEC",
    "Physical Planning NSSEC",
    "National Senior Secondary Education Commission departments",
  ],
  alternates: { canonical: "/departments" },
  openGraph: {
    title: "Departments | NSSEC",
    description:
      "The six core departments driving NSSEC's mandate across quality assurance, human resources, finance, planning, teacher development, and infrastructure.",
    url: "https://nssec.gov.ng/departments",
    siteName: "National Senior Secondary Education Commission",
    locale: "en_NG",
    type: "website",
  },
};

export default function DepartmentsPage() {
  return (
    <>
      <DepartmentsOverview />
    
    </>
  );
}
