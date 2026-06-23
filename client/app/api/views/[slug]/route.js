import {NextResponse} from 'next/server'

const DOC_TYPE_MAP = {
  nssecnews: 'nssecnews',
  publication: 'publications',
  mediaPost: 'mediaPost',
}

export async function POST(req, {params}) {
  const {slug} = await params
  const {searchParams} = new URL(req.url)
  const typeParam = searchParams.get('type') || 'mediaPost'

  const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
  const SANITY_DATASET = process.env.SANITY_DATASET
  const SANITY_TOKEN = process.env.SANITY_API_TOKEN

  if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_TOKEN) {
    return NextResponse.json({message: 'Server configuration error'}, {status: 500})
  }

  const docType = DOC_TYPE_MAP[typeParam] || 'mediaPost'
  const query = `*[_type == "${docType}" && slug.current == "${slug}"][0]{ _id, views }`
  const queryUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`

  try {
    const docRes = await fetch(queryUrl)
    const {result} = await docRes.json()

    if (!result?._id) {
      return NextResponse.json({message: 'Document not found'}, {status: 404})
    }

    const patchUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${SANITY_DATASET}`
    const patchRes = await fetch(patchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SANITY_TOKEN}`,
      },
      body: JSON.stringify({
        mutations: [{patch: {id: result._id, inc: {views: 1}}}],
      }),
    })

    const data = await patchRes.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({message: 'Failed to update views'}, {status: 500})
  }
}
