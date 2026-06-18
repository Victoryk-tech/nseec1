import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact NSSEC | National Senior Secondary Education Commission",
  description:
    "Get in touch with NSSEC. Send a message via our contact form or reach any of our 17 departments and units directly by email — Finance, Education Quality Assurance, ICT, Legal, HR, and more.",
  keywords: [
    "Contact NSSEC",
    "NSSEC email",
    "NSSEC phone number",
    "NSSEC Abuja address",
    "National Senior Secondary Education Commission contact",
    "NSSEC departments email",
    "Education Quality Assurance Nigeria",
    "NSSEC Executive Secretary",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact NSSEC | National Senior Secondary Education Commission",
    description:
      "Reach NSSEC via our contact form or email any department directly — Executive Secretary, Finance, Legal, ICT, HR, and more.",
    url: "https://nssec.gov.ng/contact",
    siteName: "NSSEC",
    images: [
      {
        url: "/nssec.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact the National Senior Secondary Education Commission",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact NSSEC",
    description:
      "Send a message or email a specific NSSEC department directly. 17 department contacts available.",
    images: ["/nssec.jpeg"],
    creator: "@NSSEC_Nigeria",
    site: "@NSSEC_Nigeria",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactRoute() {
  return <Contact />;
}
