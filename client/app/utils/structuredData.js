const BASE = "https://nssec.gov.ng";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "National Senior Secondary Education Commission (NSSEC)",
    url: "https://nssec.gov.ng", // Update with your actual domain
    logo: "https://nssec.gov.ng/nssec-logo.png", // Update with your actual logo URL
    sameAs: [
      "https://twitter.com/NSSEC_Nigeria", // Update with your actual social media profiles
      "https://facebook.com/NSSECNigeria",
      "https://linkedin.com/company/nssec-nigeria",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-XXX-XXXXXXX", // Update with your actual contact number
      contactType: "customer service",
      email: "admin@nssec.gov.ng", // Update with your actual email
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NSSEC - National Senior Secondary Education Commission",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * @param {{ title: string, description: string, imageUrl?: string, publishedAt?: string, slug: string, author?: string, hashtags?: string[] }} post
 */
export function newsArticleSchema({ title, description, imageUrl, publishedAt, slug, author, hashtags = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description || "",
    image: imageUrl ? [imageUrl] : [`${BASE}/nssec.jpeg`],
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: publishedAt || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: author || "NSSEC",
    },
    publisher: {
      "@type": "Organization",
      name: "National Senior Secondary Education Commission (NSSEC)",
      logo: { "@type": "ImageObject", url: `${BASE}/nssec-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/media/nssec-news/${slug}` },
    keywords: hashtags.join(", "),
  };
}

/**
 * @param {{ title: string, description: string, imageUrl?: string, publishedAt?: string, slug: string, hashtags?: string[] }} pr
 */
export function pressReleaseSchema({ title, description, imageUrl, publishedAt, slug, hashtags = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: description || "",
    image: imageUrl ? [imageUrl] : [`${BASE}/nssec.jpeg`],
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: publishedAt || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "National Senior Secondary Education Commission (NSSEC)",
    },
    publisher: {
      "@type": "Organization",
      name: "National Senior Secondary Education Commission (NSSEC)",
      logo: { "@type": "ImageObject", url: `${BASE}/nssec-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/media/press-release/${slug}` },
    keywords: hashtags.join(", "),
    about: { "@type": "Thing", name: "Senior Secondary Education Nigeria" },
  };
}

/**
 * @param {{ title: string, description: string, coverImageUrl?: string, publishedAt?: string, slug: string, author?: string, fileSize?: string, pageCount?: number }} pub
 */
export function publicationSchema({ title, description, coverImageUrl, publishedAt, slug, author, fileSize, pageCount }) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title,
    description: description || "",
    image: coverImageUrl || `${BASE}/nssec.jpeg`,
    datePublished: publishedAt ? publishedAt.split("T")[0] : undefined,
    author: {
      "@type": author ? "Person" : "Organization",
      name: author || "National Senior Secondary Education Commission (NSSEC)",
    },
    publisher: {
      "@type": "Organization",
      name: "National Senior Secondary Education Commission (NSSEC)",
    },
    url: `${BASE}/publications/${slug}`,
    numberOfPages: pageCount,
    ...(fileSize ? { size: fileSize } : {}),
    inLanguage: "en-NG",
  };
}

/**
 * @param {{ title: string, description: string, imageUrl?: string, publishedAt?: string, slug: string, photoCount?: number }} album
 */
export function photoGallerySchema({ title, description, imageUrl, publishedAt, slug, photoCount }) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: title,
    description: description || "",
    image: imageUrl || `${BASE}/nssec.jpeg`,
    datePublished: publishedAt || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "National Senior Secondary Education Commission (NSSEC)",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/media/photo-gallery/${slug}` },
    ...(photoCount ? { numberOfItems: photoCount } : {}),
  };
}
