import { NextResponse } from "next/server";
import { getUrlMetadata } from "@/app/lib/getUrlMetadata";

// In-memory cache: url → { data, ts }
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url param required" }, { status: 400 });
  }

  const now = Date.now();
  const hit = cache.get(url);
  if (hit && now - hit.ts < CACHE_TTL) {
    return NextResponse.json({ ...hit.data, cached: true });
  }

  const data = await getUrlMetadata(url);
  cache.set(url, { data, ts: now });

  return NextResponse.json(data);
}

// Bust cache for a specific URL (called by dashboard after save)
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (url) cache.delete(url);
  return NextResponse.json({ ok: true });
}
