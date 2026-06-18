import MonitoringLearning from "@/components/programs/MonitoringLearning";

export const metadata = {
  title: "Monitoring Learning Achievement | NSSEC Programs",
  description:
    "NSSEC's Monitoring, Learning, and Accountability (MLA) framework ensures transparent, evidence-based tracking of all programs and outcomes in Nigerian senior secondary education.",
  keywords: ["NSSEC MLA", "Monitoring Education Nigeria", "Learning Accountability NSSEC", "Education Data Tracking"],
  alternates: { canonical: "https://nssec.gov.ng/programs/monitoring-learning" },
  openGraph: {
    title: "Monitoring Learning Achievement | NSSEC",
    description: "Evidence-based tracking for accountability and continuous improvement in education.",
    url: "https://nssec.gov.ng/programs/monitoring-learning",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitoring Learning Achievement | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function MonitoringLearningPage() {
  return <MonitoringLearning />;
}
