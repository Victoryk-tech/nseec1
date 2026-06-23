import MandEForm from "@/components/departments/MandEForm";
import Link from "next/link";
import { ChevronRight, ClipboardList, FileText, Shield } from "lucide-react";

const BASE = "https://nssec.gov.ng";
const PAGE_URL = `${BASE}/departments/quality-assurance/monitoring-evaluation`;

export const metadata = {
  title: "M&E Form — School Monitoring & Evaluation | NSSEC Quality Assurance",
  description:
    "Submit the NSSEC Instrument for Monitoring and Evaluation of Schools. Fill the form online or download the blank form, complete it offline, and upload the PDF.",
  keywords: [
    "NSSEC monitoring evaluation", "school M&E form", "Nigeria secondary school inspection",
    "NSSEC quality assurance", "school evaluation instrument", "DEQA NSSEC",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "School Monitoring & Evaluation Form | NSSEC",
    description: "Submit the NSSEC Instrument for Monitoring and Evaluation of Schools online or as a PDF upload.",
    url: PAGE_URL,
    siteName: "NSSEC",
    locale: "en_NG",
    type: "website",
    images: [{ url: `${BASE}/nssec.jpeg`, width: 1200, height: 630, alt: "NSSEC M&E Form" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "School M&E Form | NSSEC",
    description: "Submit the NSSEC Instrument for Monitoring and Evaluation of Schools.",
    images: [`${BASE}/nssec.jpeg`],
    site: "@NSSEC_Nigeria",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "NSSEC School Monitoring & Evaluation Form",
  description: "Online submission form for the NSSEC Instrument for Monitoring and Evaluation of Schools",
  url: PAGE_URL,
  publisher: {
    "@type": "GovernmentOrganization",
    name: "National Secondary Education Commission (NSSEC)",
    url: BASE,
  },
};

export default function MandEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative bg-[#0a2e40] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e4f6b] to-[#082c2c]" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#24c2c2] via-[#1a9999] to-[#24c2c2]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-1.5 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-[#24c2c2] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/departments" className="hover:text-[#24c2c2] transition-colors">Departments</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/departments/quality-assurance" className="hover:text-[#24c2c2] transition-colors">Quality Assurance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/30">M&amp;E Form</span>
          </nav>

          {/* Label */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1 bg-[#24c2c2] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Educational Quality Assurance
            </span>
            <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
              Official Instrument
            </span>
          </div>

          <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Instrument for Monitoring & Evaluation of Schools
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed">
            Submit your school&apos;s monitoring and evaluation data to the NSSEC Directorate of Education Quality Assurance.
            Fill the form online or download, complete offline, and upload as PDF.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: ClipboardList, label: "9 Sections", desc: "Comprehensive coverage" },
              { icon: FileText, label: "PDF Option", desc: "Offline completion available" },
              { icon: Shield, label: "Secure Submission", desc: "Data handled by NSSEC DEQA" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#24c2c2]" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">{label}</p>
                  <p className="text-white/40 text-[10px]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-amber-800 flex items-start gap-2">
            <span className="font-bold flex-shrink-0">Note:</span>
            This form is intended for NSSEC evaluators and school principals. All submissions are reviewed by the Directorate of
            Education Quality Assurance. For assistance, contact{" "}
            <a href="mailto:deqa@nssec.gov.ng" className="font-semibold underline">deqa@nssec.gov.ng</a>.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <MandEForm />
      </section>

      {/* Footer CTA */}
      <section className="bg-[#f8fafb] border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Looking for the full Quality Assurance department page?
          </p>
          <Link
            href="/departments/quality-assurance"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#24c2c2] text-[#24c2c2] text-sm font-semibold rounded-xl hover:bg-[#24c2c2]/10 transition-colors"
          >
            View DEQA Department <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
