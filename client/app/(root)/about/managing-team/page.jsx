import ManagingTeam from "@/components/about/ManagingTeam";

export const metadata = {
  title: "Managing Team | National Senior Secondary Education Commission",
  description:
    "Meet the managing team of NSSEC — Dr. Iyela Ajayi (Executive Secretary), Rabia Umar Muhammad, Mr. Saleh Bature, Usman Abubakar Bokani, Mohammed Salihu, Arc. Maimuna Umar, Fatima Bappare, Aduku Alexander Ojonim, Abdulazeez Abdulkadeer Maikanti, Okwori Mary Favour, and all department and unit heads driving NSSEC's mission.",
  keywords: [
    "NSSEC managing team",
    "Dr Iyela Ajayi Executive Secretary NSSEC",
    "Rabia Umar Muhammad NSSEC",
    "Saleh Bature NSSEC",
    "Usman Abubakar Bokani NSSEC",
    "Mohammed Salihu NSSEC",
    "Maimuna Umar NSSEC",
    "Fatima Bappare NSSEC",
    "Aduku Alexander Ojonim NSSEC",
    "Abdulazeez Abdulkadeer Maikanti NSSEC",
    "Okwori Mary Favour NSSEC",
    "Mairiga SA NSSEC",
    "Maryam Sidi Ali NSSEC",
    "NSSEC staff",
    "NSSEC directors",
    "NSSEC unit heads",
    "National Senior Secondary Education Commission management",
    "NSSEC leadership Nigeria",
  ],
  alternates: { canonical: "/about/managing-team" },
  openGraph: {
    title: "Managing Team | NSSEC",
    description:
      "The leadership and management team of the National Senior Secondary Education Commission — executive secretary, department heads, and unit heads.",
    url: "https://nssec.gov.ng/about/managing-team",
    siteName: "National Senior Secondary Education Commission",
    images: [
      {
        url: "/about/Iyela-Ajayi.png",
        width: 1200,
        height: 630,
        alt: "Dr. Iyela Ajayi — Executive Secretary, NSSEC",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Managing Team | NSSEC",
    description:
      "The dedicated professionals driving NSSEC's mission across all departments and units.",
    images: ["/about/Iyela-Ajayi.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NSSEC Managing Team",
  description:
    "Leadership, department heads, and unit heads of the National Senior Secondary Education Commission",
  numberOfItems: 13,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Person",
        name: "Dr. Iyela Ajayi",
        honorificPrefix: "Dr.",
        jobTitle: "Executive Secretary",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "es@nssec.gov.ng",
        image: "https://nssec.gov.ng/about/Iyela-Ajayi.png",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Person",
        name: "Rabia Umar Muhammad",
        jobTitle: "Head, Quality Assurance Department",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "deqa@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Person",
        name: "Saleh Bature",
        jobTitle: "Head, Human Resource Management Department",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "hrm@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Person",
        name: "Salihu Bukar Malgwi",
        jobTitle: "Head, Finance & Accounts Department",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "dfa@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Person",
        name: "Usman Abubakar Bokani",
        jobTitle: "Head, Planning, Research & Statistics Department",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "dprs@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Person",
        name: "Mohammed Salihu",
        jobTitle:
          "Head, Teacher Development & International Partnership Department",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "tdip@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "Person",
        name: "Maimuna Umar",
        honorificSuffix: "FNIA",
        jobTitle: "Head, Physical Planning Department",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "ppd@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 8,
      item: {
        "@type": "Person",
        name: "Okwori Mary Favour",
        jobTitle: "Head, Reform Coordination (SERVICOM & ACTU)",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "reform_dev@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 9,
      item: {
        "@type": "Person",
        name: "Maryam Sidi Ali",
        jobTitle: "Head, Legal Unit",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "legal@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 10,
      item: {
        "@type": "Person",
        name: "Fatima Bappare",
        jobTitle: "Head, Press, Publication & Protocol",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "press@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 11,
      item: {
        "@type": "Person",
        name: "Aduku Alexander Ojonim",
        jobTitle: "Head, Internal Audit Unit",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "Internal_audit@nssec.gov.ng",
      },
    },
    {
      "@type": "ListItem",
      position: 12,
      item: {
        "@type": "Person",
        name: "Abdulazeez Abdulkadeer Maikanti",
        jobTitle: "Head, Procurement Unit",
        worksFor: {
          "@type": "Organization",
          name: "National Senior Secondary Education Commission",
        },
        email: "procurement@nssec.gov.ng",
      },
    },
  ],
};

export default function ManagingTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ManagingTeam />
    </>
  );
}
