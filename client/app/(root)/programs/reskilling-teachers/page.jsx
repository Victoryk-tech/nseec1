import ReskillingTeachers from "@/components/programs/ReskillingTeachers";

export const metadata = {
  title: "Reskilling Teachers in Core Subjects | NSSEC Programs",
  description:
    "NSSEC's teacher reskilling program delivers structured professional development in Mathematics, English, Sciences, and Social Studies to upgrade teacher capacity across Nigeria.",
  keywords: ["NSSEC Teacher Training", "Reskilling Teachers Nigeria", "CPD Nigeria Teachers", "Teacher Professional Development NSSEC"],
  alternates: { canonical: "https://nssec.gov.ng/programs/reskilling-teachers" },
  openGraph: {
    title: "Reskilling Teachers | NSSEC Programs",
    description: "Building 21st-century teacher capacity through structured professional development.",
    url: "https://nssec.gov.ng/programs/reskilling-teachers",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reskilling Teachers | NSSEC Programs",
    images: ["/nssec.jpeg"],
  },
};

export default function ReskillingTeachersPage() {
  return <ReskillingTeachers />;
}
