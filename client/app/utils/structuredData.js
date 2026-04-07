// structuredData.js
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'National Senior Secondary Education Commission (NSSEC)',
    url: 'https://nssec.gov.ng', // Update with your actual domain
    logo: 'https://nssec.gov.ng/nssec-logo.png', // Update with your actual logo URL
    sameAs: [
      'https://twitter.com/NSSEC_Nigeria', // Update with your actual social media profiles
      'https://facebook.com/NSSECNigeria',
      'https://linkedin.com/company/nssec-nigeria',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-XXX-XXXXXXX', // Update with your actual contact number
      contactType: 'customer service',
      email: 'info@nssec.gov.ng', // Update with your actual email
      areaServed: 'NG',
      availableLanguage: ['English'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NSSEC - National Senior Secondary Education Commission',
    url: 'https://nssec.gov.ng', // Update with your actual domain
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nssec.gov.ng/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
