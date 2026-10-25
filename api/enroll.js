// Receives the Enroll form and saves it to Supabase (table: enrollments).
// Uses the publishable key only. The database lets that key add rows but never read them.
const PHONE = /^[0-9+ ()-]{10,18}$/
const hits = new Map()

// Best-effort limit: 5 submissions per 10 minutes per visitor on a warm server.
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "")

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  let body = req.body
  if (typeof body === "string") {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  body = body || {}

  // Hidden field that real visitors never fill. Bots do. Pretend it worked.
  if (clean(body.website, 100)) return res.status(200).json({ ok: true })

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown"
  if (limited(ip)) return res.status(429).json({ error: "Too many tries. Please try again in a few minutes." })

  const row = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 18),
    email: clean(body.email, 150) || null,
    course: clean(body.course, 150) || null,
    plan: clean(body.plan, 100) || null,
    message: clean(body.message, 500) || null,
  }

  if (row.name.length < 2) return res.status(400).json({ error: "Please enter your name." })
  if (!PHONE.test(row.phone)) return res.status(400).json({ error: "Please enter a valid phone number." })
  if (row.email && !/^\S+@\S+\.\S+$/.test(row.email)) return res.status(400).json({ error: "Please enter a valid email or leave it empty." })

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) {
    console.error("SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set")
    return res.status(500).json({ error: "Something went wrong. Please try again later." })
  }

  const headers = { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" }
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}` // legacy JWT-style keys

  try {
    const r = await fetch(`${url}/rest/v1/enrollments`, { method: "POST", headers, body: JSON.stringify(row) })
    if (!r.ok) {
      console.error("Supabase insert failed", r.status, await r.text())
      return res.status(500).json({ error: "Something went wrong. Please try again later." })
    }
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: "Something went wrong. Please try again later." })
  }
}
