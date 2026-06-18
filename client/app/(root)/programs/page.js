import ProgramsOverview from "@/components/programs/ProgramsOverview";

export const metadata = {
  title: "Programs | NSSEC",
  description:
    "Explore NSSEC's comprehensive programs and initiatives — Safe School Initiative, TVET, Monitoring Learning Achievement, School Management Committees, Reskilling Teachers, Robotics & AI, and Advocacy Visits.",
  keywords: ["NSSEC Programs", "Education Programs Nigeria", "NSSEC Initiatives", "Senior Secondary School Programs Nigeria"],
  alternates: { canonical: "https://nssec.gov.ng/programs" },
  openGraph: {
    title: "Programs | NSSEC",
    description: "Comprehensive initiatives designed to transform senior secondary education in Nigeria.",
    url: "https://nssec.gov.ng/programs",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Programs | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function ProgramsRoute() {
  return <ProgramsOverview />;
}
