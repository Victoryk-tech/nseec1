import UnitsOverview from "@/components/units/UnitsOverview";


export const metadata = {
  title: "Units | National Senior Secondary Education Commission",
  description:
    "Learn about the six specialist units of NSSEC — Reform Coordination (SERVICOM & ACTU), Legal Unit, Press Publication & Protocol, Internal Audit, Procurement, and ICT Unit.",
  keywords: [
    "NSSEC units",
    "Legal Unit NSSEC",
    "Procurement Unit NSSEC",
    "Internal Audit NSSEC",
    "ICT Unit NSSEC",
    "Reform Coordination SERVICOM NSSEC",
    "Press Protocol NSSEC",
    "National Senior Secondary Education Commission units",
  ],
  alternates: { canonical: "/unit" },
  openGraph: {
    title: "Units | NSSEC",
    description:
      "NSSEC's six specialist units providing legal, communications, procurement, audit, ICT, and reform coordination support services.",
    url: "https://nssec.gov.ng/unit",
    siteName: "National Senior Secondary Education Commission",
    locale: "en_NG",
    type: "website",
  },
};

export default function UnitsPage() {
  return (
    <>
      <UnitsOverview />
     
    </>
  );
}
