//CanonicalURL.jsx

'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

const baseUrl = 'https://nssec.gov.ng'; // Update with your actual domain

export default function CanonicalURL() {
  const pathname = usePathname();
  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} key="canonical" />
    </Head>
  );
}
