import GalleryListingPage from "@/components/media/GalleryListingPage";

export const metadata = {
  title: "Photo Gallery | NSSEC Media",
  description: "Browse NSSEC's photo gallery featuring events, activities, milestones and achievements in senior secondary education across Nigeria.",
  keywords: ["NSSEC Gallery", "Education Photos Nigeria", "NSSEC Events", "Secondary Education Pictures"],
  alternates: { canonical: "https://nssec.gov.ng/media/photo-gallery" },
  openGraph: {
    title: "Photo Gallery | NSSEC",
    description: "Events, activities and milestones in pictures",
    url: "https://nssec.gov.ng/media/photo-gallery",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function GalleryListRoute() {
  return <GalleryListingPage />;
}
