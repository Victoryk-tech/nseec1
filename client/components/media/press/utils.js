export function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n || 0);
}

export function getFavicon(domain) {
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
}

export function getSourceName(post) {
  return post?.source?.name || post?.sourceName || "";
}

export function getSourceDomain(post) {
  return post?.source?.domain || post?.sourceDomain || "";
}

export function computeRelated(current, all) {
  if (!current || !all?.length) return [];
  const catSlugs = new Set((current.categories || []).map((c) => c?.slug).filter(Boolean));
  const tagSet = new Set((current.tags || []).map((t) => t?._id).filter(Boolean));
  const hashSet = new Set(current.hashtags || []);
  return all
    .filter((p) => p._id !== current._id)
    .map((p) => {
      const catMatch = (p.categories || []).filter((c) => catSlugs.has(c?.slug)).length;
      const tagMatch = (p.tags || []).filter((t) => tagSet.has(t?._id)).length;
      const hashMatch = (p.hashtags || []).filter((h) => hashSet.has(h)).length;
      return { ...p, _score: catMatch * 3 + tagMatch * 2 + hashMatch };
    })
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 4);
}
