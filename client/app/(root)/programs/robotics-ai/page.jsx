import RoboticsAI from "@/components/programs/RoboticsAI";

export const metadata = {
  title: "Robotics & AI Initiative | NSSEC Programs",
  description:
    "NSSEC's Robotics and AI initiative includes training 6,000 teachers in partnership with Google, establishing school robotics clubs, and hosting the National Robotics & AI Challenge.",
  keywords: ["NSSEC Robotics AI", "AI Education Nigeria", "Robotics Schools Nigeria", "Google NSSEC Partnership", "STEM Nigeria"],
  alternates: { canonical: "https://nssec.gov.ng/programs/robotics-ai" },
  openGraph: {
    title: "Robotics & AI Initiative | NSSEC",
    description: "Preparing Nigerian students for a technology-driven future through AI and robotics education.",
    url: "https://nssec.gov.ng/programs/robotics-ai",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics & AI Initiative | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function RoboticsAIPage() {
  return <RoboticsAI />;
}
