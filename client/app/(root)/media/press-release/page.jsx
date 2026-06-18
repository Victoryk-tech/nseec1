import PressReleaseListPage from "@/components/media/PressReleaseListPage";

export const metadata = {
  title: "Press Release | NSSEC Media",
  description: "Official press releases and statements from the National Senior Secondary Education Commission of Nigeria.",
  keywords: ["NSSEC Press Release", "NSSEC Official Statement", "Nigeria Education Commission", "NSSEC Announcement"],
  alternates: { canonical: "https://nssec.gov.ng/media/press-release" },
  openGraph: {
    title: "Press Release | NSSEC",
    description: "Official statements and announcements from NSSEC",
    url: "https://nssec.gov.ng/media/press-release",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Release | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function PressReleaseListRoute() {
  return <PressReleaseListPage />;
}
