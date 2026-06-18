import NSSECNewsPage from "@/components/media/NSSECNewsPage";

export const metadata = {
  title: "NSSEC News | Media & News",
  description: "Latest news, updates and activities from the National Senior Secondary Education Commission of Nigeria.",
  keywords: ["NSSEC News", "Education News Nigeria", "Senior Secondary Education", "NSSEC Updates", "Nigeria Education Commission"],
  alternates: { canonical: "https://nssec.gov.ng/media/nssec-news" },
  openGraph: {
    title: "NSSEC News | National Senior Secondary Education Commission",
    description: "Latest news and updates from NSSEC",
    url: "https://nssec.gov.ng/media/nssec-news",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSSEC News",
    description: "Latest news and updates from NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function NSSECNewsRoute() {
  return <NSSECNewsPage />;
}
