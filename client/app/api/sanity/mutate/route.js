import { NextResponse } from "next/server";

const PROJECT = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET;
const TOKEN = process.env.SANITY_API_TOKEN;

export async function POST(req) {
  if (!PROJECT || !DATASET || !TOKEN) {
    return NextResponse.json({ error: "Sanity credentials not configured" }, { status: 500 });
  }
  try {
    const { mutations } = await req.json();
    const res = await fetch(
      `https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    );
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
