import EvaluationHero from "@/components/departments/mande/EvaluationHero";
import MandEForm      from "@/components/departments/mande/MandEForm";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";

const BASE     = "https://nssec.gov.ng";
const PAGE_URL = `${BASE}/departments/quality-assurance/monitoring-evaluation`;

export const metadata = {
  title:       "M&E Form — School Monitoring & Evaluation | NSSEC Quality Assurance",
  description: "Submit the NSSEC Instrument for Monitoring and Evaluation of Schools. Fill the form online or download the blank form, complete it offline, and upload the PDF.",
  keywords: [
    "NSSEC monitoring evaluation", "school M&E form", "Nigeria secondary school inspection",
    "NSSEC quality assurance", "school evaluation instrument", "DEQA NSSEC",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:       "School Monitoring & Evaluation Form | NSSEC",
    description: "Submit the NSSEC Instrument for Monitoring and Evaluation of Schools online or as a PDF upload.",
    url:         PAGE_URL,
    siteName:    "NSSEC",
    locale:      "en_NG",
    type:        "website",
    images: [{ url: `${BASE}/nssec.jpeg`, width: 1200, height: 630, alt: "NSSEC M&E Form" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "School M&E Form | NSSEC",
    description: "Submit the NSSEC Instrument for Monitoring and Evaluation of Schools.",
    images:      [`${BASE}/nssec.jpeg`],
    site:        "@NSSEC_Nigeria",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "WebPage",
  name:        "NSSEC School Monitoring & Evaluation Form",
  description: "Online submission form for the NSSEC Instrument for Monitoring and Evaluation of Schools",
  url:         PAGE_URL,
  publisher: {
    "@type": "GovernmentOrganization",
    name:    "National Secondary Education Commission (NSSEC)",
    url:     BASE,
  },
};

export default function MandEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <EvaluationHero />

      {/* Notice bar */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-3">
          <p className="text-xs text-amber-800 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>
              <span className="font-bold">Note:</span> This form is intended for NSSEC evaluators and school principals.
              All submissions are reviewed by the Directorate of Education Quality Assurance.
              For assistance contact{" "}
              <a href="mailto:deqa@nssec.gov.ng" className="font-semibold underline underline-offset-2 hover:text-amber-900 transition-colors">
                deqa@nssec.gov.ng
              </a>.
            </span>
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <MandEForm />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#f8fafb] border-t border-gray-100 py-12">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <p className="text-sm text-gray-500 mb-4">Looking for the full Quality Assurance department page?</p>
          <Link
            href="/departments/quality-assurance"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#24c2c2] text-[#24c2c2] text-sm font-bold rounded-xl hover:bg-[#24c2c2]/10 transition-colors"
          >
            View DEQA Department <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
