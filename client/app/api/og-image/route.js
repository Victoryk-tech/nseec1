import { NextResponse } from "next/server";

const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

function extractOgImage(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  return null;
}

export async function GET(req) {
  const url = new URL(req.url).searchParams.get("url");
  if (!url) return NextResponse.json({ imageUrl: null }, { status: 400 });

  const now = Date.now();
  const cached = cache.get(url);
  if (cached && now - cached.ts < CACHE_TTL) {
    return NextResponse.json({ imageUrl: cached.imageUrl, cached: true });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NSSSECBot/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const imageUrl = extractOgImage(html);
    cache.set(url, { imageUrl, ts: now });
    return NextResponse.json({ imageUrl });
  } catch {
    cache.set(url, { imageUrl: null, ts: now });
    return NextResponse.json({ imageUrl: null });
  }
}
