// Shared Notion reader. Files starting with _ are not exposed as endpoints by Vercel.
const VERSION = "2022-06-28"

export const DB = {
  courses: "d612808a6d4c4ec0b4da13f2b506b9c0",
  pricing: "013ca204539f4b0ea6009c88e3530708",
  projects: "78d0553b71b5469399b17534a6fbe052",
  team: "990d2047719244b1ad683f13824a8b49",
}

async function call(path, method, body) {
  const token = process.env.NOTION_TOKEN
  if (!token) throw new Error("NOTION_TOKEN is not set")
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": VERSION, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`)
  return res.json()
}

// Only rows with Published ticked. Optional extra filter, e.g. a slug match.
export async function queryPublished(dbId, sorts = [{ property: "Order", direction: "ascending" }], extra) {
  const published = { property: "Published", checkbox: { equals: true } }
  const filter = extra ? { and: [published, extra] } : published
  let results = []
  let cursor
  do {
    const data = await call(`/databases/${dbId}/query`, "POST", {
      filter,
      ...(sorts && sorts.length ? { sorts } : {}),
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    })
    results = results.concat(data.results)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)
  return results
}

export async function getBlocks(pageId) {
  let blocks = []
  let cursor
  do {
    const data = await call(`/blocks/${pageId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`, "GET")
    blocks = blocks.concat(data.results)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)
  return blocks
}

export const getText = (p) => (p?.title || p?.rich_text || []).map((t) => t.plain_text).join("")
export const getUrl = (p) => p?.url || ""
export const getSelect = (p) => p?.select?.name || ""
export const getCheckbox = (p) => !!p?.checkbox
export const getDate = (p) => p?.date?.start || ""
export const getRelationIds = (p) => (p?.relation || []).map((r) => r.id)
export const getFile = (p) => {
  const f = p?.files?.[0]
  return f ? f.file?.url || f.external?.url || "" : ""
}

// Notion file links expire after about an hour, so cache for less than that.
export function send(res, data) {
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=300")
  res.status(200).json(data)
}

export function fail(res, err) {
  console.error(err)
  res.status(500).json({ error: "Could not load content" })
}

// Builds a simple list endpoint: published rows mapped to plain objects.
export function listEndpoint(dbId, map, sorts) {
  return async function handler(req, res) {
    try {
      const rows = await queryPublished(dbId, sorts)
      send(res, rows.map((r) => ({ id: r.id, ...map(r.properties) })))
    } catch (e) {
      fail(res, e)
    }
  }
}
