import { NextResponse } from "next/server";

const PROJECT = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET;
const TOKEN = process.env.SANITY_API_TOKEN;

export async function POST(req) {
  if (!PROJECT || !DATASET || !TOKEN) {
    return NextResponse.json({ error: "Sanity credentials not configured" }, { status: 500 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name || "upload";

    const res = await fetch(
      `https://${PROJECT}.api.sanity.io/v2024-01-01/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": file.type || "image/jpeg",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: buffer,
      }
    );
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
