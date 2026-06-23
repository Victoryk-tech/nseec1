import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'ayaihaxr',
  dataset: "production",
  apiVersion: "2025-09-23",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export function getImageUrl(item, fallback = "/nssec.jpeg") {
  if (!item) return fallback;
  if (item.cloudinaryUrl) return item.cloudinaryUrl;
  if (item.image?.asset?.url) return item.image.asset.url;
  if (item.image) {
    try { return urlFor(item.image).url(); } catch { return fallback; }
  }
  return fallback;
}
