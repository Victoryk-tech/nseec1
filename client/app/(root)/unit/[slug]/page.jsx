import { notFound } from "next/navigation";
import { UNITS } from "@/lib/departments-units-data";
import UnitDetail from "@/components/units/UnitDetail";

export function generateStaticParams() {
  return UNITS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const unit = UNITS.find((u) => u.slug === slug);
  if (!unit) return {};
  return {
    title: `${unit.name} | National Senior Secondary Education Commission`,
    description: unit.description,
    keywords: [
      unit.name,
      unit.short,
      "NSSEC unit",
      ...(unit.head ? [unit.head] : []),
      "National Senior Secondary Education Commission",
      "Nigeria education",
    ],
    alternates: { canonical: unit.path },
    openGraph: {
      title: `${unit.name} | NSSEC`,
      description: unit.description,
      url: `https://nssec.gov.ng${unit.path}`,
      siteName: "National Senior Secondary Education Commission",
      locale: "en_NG",
      type: "website",
      ...(unit.photo && {
        images: [{ url: unit.photo, width: 1200, height: 630, alt: unit.head }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${unit.name} | NSSEC`,
      description: unit.description,
    },
  };
}

export default async function UnitPage({ params }) {
  const { slug } = await params;
  const unit = UNITS.find((u) => u.slug === slug);
  if (!unit) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: unit.name,
    description: unit.description,
    url: `https://nssec.gov.ng${unit.path}`,
    email: unit.email,
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "National Senior Secondary Education Commission",
      url: "https://nssec.gov.ng",
    },
    ...(unit.head && {
      employee: {
        "@type": "Person",
        name: unit.head,
        jobTitle: unit.headTitle,
        email: unit.email,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UnitDetail unit={unit} />
    </>
  );
}
