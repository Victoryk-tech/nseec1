import MediaLandingPage from "@/components/media/MediaLandingPage";

export const metadata = {
  title: "Media & News | NSSEC",
  description: "Stay informed with the latest news, official press releases, photo galleries, and publications from the National Senior Secondary Education Commission.",
  keywords: ["NSSEC Media", "NSSEC News", "Press Releases", "Photo Gallery", "NSSEC Publications", "Education Nigeria"],
  alternates: { canonical: "https://nssec.gov.ng/media" },
  openGraph: {
    title: "Media & News | NSSEC",
    description: "Latest news, press releases, gallery and publications from NSSEC",
    url: "https://nssec.gov.ng/media",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & News | NSSEC",
    description: "Latest news, press releases, gallery and publications from NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function MediaPage() {
  return <MediaLandingPage />;
}
