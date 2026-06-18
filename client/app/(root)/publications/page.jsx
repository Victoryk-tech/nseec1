import PublicationsListPage from "@/components/publications/PublicationsListPage";

export const metadata = {
  title: "Publications | NSSEC",
  description: "Download official NSSEC publications including reports, digests, research journals, establishment acts, minimum standards, and implementation guidelines for senior secondary education in Nigeria.",
  keywords: ["NSSEC Publications", "Education Reports Nigeria", "NSSEC Documents", "Senior Secondary Education PDF", "NSSEC Research"],
  alternates: { canonical: "https://nssec.gov.ng/publications" },
  openGraph: {
    title: "Publications | NSSEC",
    description: "Official NSSEC publications — reports, digests, research and guidelines",
    url: "https://nssec.gov.ng/publications",
    type: "website",
    images: [{ url: "/nssec.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publications | NSSEC",
    images: ["/nssec.jpeg"],
  },
};

export default function PublicationsRoute() {
  return <PublicationsListPage />;
}
