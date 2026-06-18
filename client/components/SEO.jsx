// SEO Metadata Generator for Next.js App Router
// This generates metadata objects for use in page.js files

const baseUrl = 'https://nssec.gov.ng'; // Update with your actual domain

/**
 * Generate SEO metadata for Next.js App Router pages
 * @param {Object} options - SEO configuration options
 * @returns {Object} Next.js metadata object
 */

// Enter same passphrase again: 
// Your identification has been saved in /home/nssecgov/.ssh/id_rsa
// Your public key has been saved in /home/nssecgov/.ssh/id_rsa.pub
// The key fingerprint is:
// SHA256:Q37loj8pM9VoLTo1BPRBkw91YpHiLVzmx/FdRQHAFGk 
// The key's randomart image is:
export function generateSEO({ 
  title, 
  description, 
  keywords = [],
  image = '/nssec.jpeg', 
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  canonicalUrl,
  pathname = '',
}) {
  const pageUrl = `${baseUrl}${pathname}`;
  const pageImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  const robots = {
    index: !noindex,
    follow: !nofollow,
  };

  const metadata = {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    robots,
    openGraph: {
      title,
      description,
      type,
      url: pageUrl,
      siteName: 'NSSEC - National Senior Secondary Education Commission',
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [pageImage],
      creator: '@NSSEC_Nigeria',
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph.publishedTime = publishedTime;
    metadata.openGraph.modifiedTime = modifiedTime;
    metadata.openGraph.authors = author ? [author] : undefined;
    metadata.openGraph.section = section;
    metadata.openGraph.tags = tags.length > 0 ? tags : undefined;
  }

  // Add canonical URL
  if (canonicalUrl) {
    metadata.alternates = {
      canonical: canonicalUrl,
    };
  } else if (pathname) {
    metadata.alternates = {
      canonical: pageUrl,
    };
  }

  return metadata;
}

// Export default for backward compatibility
export default generateSEO;
