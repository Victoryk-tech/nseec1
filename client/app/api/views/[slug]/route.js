// views/[slug]/route.js
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { slug } = params;

  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
  const SANITY_DATASET = process.env.SANITY_DATASET;
  const SANITY_TOKEN = process.env.SANITY_API_TOKEN;

  // ✅ Inject slug directly in the GROQ query string
  const query = `*[_type == "mediaPost" && slug.current == "${slug}"][0]`;

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  const docRes = await fetch(url);
  const { result } = await docRes.json();

  if (!result?._id) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const patchUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${SANITY_DATASET}`;

  const patchBody = {
    mutations: [
      {
        patch: {
          id: result._id,
          inc: { views: 1 },
        },
      },
    ],
  };

  const patchRes = await fetch(patchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify(patchBody),
  });

  const data = await patchRes.json();
  return NextResponse.json(data);
}
