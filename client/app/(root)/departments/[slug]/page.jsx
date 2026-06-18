import { notFound } from "next/navigation";
import { DEPARTMENTS } from "@/lib/departments-units-data";
import DepartmentDetail from "@/components/departments/DepartmentDetail";


export function generateStaticParams() {
  return DEPARTMENTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) return {};
  return {
    title: `${dept.name} | National Senior Secondary Education Commission`,
    description: dept.description,
    keywords: [
      dept.name,
      dept.short,
      "NSSEC department",
      dept.head,
      "National Senior Secondary Education Commission",
      "Nigeria education",
    ],
    alternates: { canonical: dept.path },
    openGraph: {
      title: `${dept.name} | NSSEC`,
      description: dept.description,
      url: `https://nssec.gov.ng${dept.path}`,
      siteName: "National Senior Secondary Education Commission",
      locale: "en_NG",
      type: "website",
      ...(dept.photo && {
        images: [{ url: dept.photo, width: 1200, height: 630, alt: dept.head }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${dept.name} | NSSEC`,
      description: dept.description,
    },
  };
}

export default async function DepartmentPage({ params }) {
  const { slug } = await params;
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: dept.name,
    description: dept.description,
    url: `https://nssec.gov.ng${dept.path}`,
    email: dept.email,
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "National Senior Secondary Education Commission",
      url: "https://nssec.gov.ng",
    },
    ...(dept.head && {
      employee: {
        "@type": "Person",
        name: dept.head,
        jobTitle: dept.headTitle,
        email: dept.email,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DepartmentDetail dept={dept} />
     
    </>
  );
}
