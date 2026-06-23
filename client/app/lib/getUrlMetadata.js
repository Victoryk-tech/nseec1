const TIMEOUT_MS = 10_000;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function attr(html, property, name, fallback = "") {
  // Matches <meta property="X" content="Y"> and <meta content="Y" property="X">
  // Handles property=, name=, both orderings, single and double quotes
  const keys = [property, ...(name ? [name] : [])];
  for (const key of keys) {
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${esc}["'][^>]+content=["']([^"'<>]+)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"'<>]+)["'][^>]+(?:property|name)=["']${esc}["']`,
        "i"
      ),
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m?.[1]) {
        return m[1]
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .trim();
      }
    }
  }
  return fallback;
}

function absoluteUrl(href, base) {
  if (!href) return null;
  if (/^https?:\/\//i.test(href)) return href;
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function extractFavicon(html, baseUrl) {
  const rels = ["apple-touch-icon", "icon", "shortcut icon", "mask-icon"];
  for (const rel of rels) {
    const re = new RegExp(
      `<link[^>]+rel=["'][^"']*${rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"']*["'][^>]+href=["']([^"'<>]+)["']`,
      "i"
    );
    const m = html.match(re);
    if (m?.[1]) {
      const abs = absoluteUrl(m[1], baseUrl);
      if (abs) return abs;
    }
    // Also try reversed attribute order
    const re2 = new RegExp(
      `<link[^>]+href=["']([^"'<>]+)["'][^>]+rel=["'][^"']*${rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"']*["']`,
      "i"
    );
    const m2 = html.match(re2);
    if (m2?.[1]) {
      const abs = absoluteUrl(m2[1], baseUrl);
      if (abs) return abs;
    }
  }
  return null;
}

function titleFromHtml(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim() || "";
}

/**
 * Fetches a URL server-side and extracts OpenGraph / Twitter Card metadata.
 * Works for news sites, blogs, government sites, YouTube, Facebook, LinkedIn, etc.
 * Returns null values for fields that could not be extracted (never throws).
 */
export async function getUrlMetadata(url) {
  const empty = {
    image: null,
    title: null,
    description: null,
    siteName: null,
    favicon: null,
    domain: null,
    error: null,
  };

  if (!url) return { ...empty, error: "No URL provided" };

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { ...empty, error: "Invalid URL" };
  }

  const domain = parsedUrl.hostname.replace(/^www\./, "");
  const googleFavicon = `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: "follow",
    });

    if (!res.ok) {
      return {
        ...empty,
        domain,
        favicon: googleFavicon,
        error: `HTTP ${res.status}`,
      };
    }

    // Only parse text/html; don't try to parse PDFs or binaries
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("html")) {
      return { ...empty, domain, favicon: googleFavicon, error: "Not an HTML page" };
    }

    const html = await res.text();
    const baseUrl = parsedUrl.origin;

    // Extract image: og:image → twitter:image → twitter:image:src → og:image:secure_url
    let image =
      attr(html, "og:image") ||
      attr(html, "twitter:image", "twitter:image") ||
      attr(html, "twitter:image:src", "twitter:image:src") ||
      attr(html, "og:image:secure_url") ||
      null;
    if (image) image = absoluteUrl(image, baseUrl);

    // Extract title: og:title → twitter:title → <title>
    const title =
      attr(html, "og:title") ||
      attr(html, "twitter:title", "twitter:title") ||
      titleFromHtml(html) ||
      null;

    // Extract description: og:description → twitter:description → meta description
    const description =
      attr(html, "og:description") ||
      attr(html, "twitter:description", "twitter:description") ||
      attr(html, "", "description") ||
      null;

    // Extract site name
    const siteName =
      attr(html, "og:site_name") ||
      attr(html, "application-name", "application-name") ||
      null;

    // Extract favicon
    const favicon = extractFavicon(html, baseUrl) || googleFavicon;

    return {
      image,
      title: title ? title.slice(0, 200) : null,
      description: description ? description.slice(0, 300) : null,
      siteName: siteName || null,
      favicon,
      domain,
      error: null,
    };
  } catch (err) {
    return {
      ...empty,
      domain,
      favicon: googleFavicon,
      error: err.name === "TimeoutError" ? "Request timed out" : err.message,
    };
  }
}
