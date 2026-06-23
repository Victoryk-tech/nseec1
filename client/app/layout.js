import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Navbar from "../components/Navbar";
import { BlogProvider } from "../components/contexts/BlogContext";
import { organizationSchema, websiteSchema } from './utils/structuredData';
import CanonicalURL from '../components/CanonicalURL';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

//  meristem (gnzbw2g4)
 // coderina (jcpla9kp)  for sanity
 // esteam (t8pcupgd)
export const metadata = {
  title: {
    default: "NSSEC - NATIONAL SENIOR SECONDARY EDUCATION COMMISSION (NSSEC)",
    template: "%s | NSSEC",
  },
  description: "The National Senior Secondary Education Commission (NSSEC) is a regulatory body established to oversee and elevate the quality of senior secondary education in Nigeria. We ensure quality assurance and standardize senior secondary education nationwide.",
  keywords: ["NSSEC", "Nigeria Education", "Senior Secondary Education", "Education Commission", "Nigeria Schools", "Education Regulation", "Secondary Education Nigeria"],
  authors: [{ name: "National Senior Secondary Education Commission" }],
  creator: "NSSEC",
  publisher: "National Senior Secondary Education Commission",
  formatDetection: { email: false, address: false, telephone: true },
  metadataBase: new URL('https://nssec.gov.ng'),
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/en-US' },
  },
  openGraph: {
    title: "NSSEC - National Senior Secondary Education Commission",
    description: "Regulatory body overseeing and standardizing senior secondary education in Nigeria",
    url: 'https://nssec.gov.ng',
    siteName: 'NSSEC',
    images: [{ url: '/nssec.jpeg', width: 1200, height: 630, alt: 'NSSEC - National Senior Secondary Education Commission' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "NSSEC - National Senior Secondary Education Commission",
    description: "Regulatory body overseeing senior secondary education in Nigeria",
    images: ["/nssec.jpeg"],
    creator: "@NSSEC_Nigeria",
    site: "@NSSEC_Nigeria",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/nssec.jpeg',
    shortcut: '/nssec.jpeg',
    apple: '/nssec.jpeg',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <CanonicalURL />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans scroll-smooth bg-white`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [organizationSchema(), websiteSchema()],
            })
          }}
        />
        <main className="flex-1">
          <BlogProvider>
            <Navbar />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: { borderRadius: "10px", fontSize: "14px" },
                success: { style: { background: "#f0fdfc", border: "1px solid #24c2c2", color: "#082c2c" } },
                error: { style: { background: "#fff1f2", border: "1px solid #fca5a5", color: "#7f1d1d" } },
              }}
            />
          </BlogProvider>
        </main>
      </body>
    </html>
  );
}
