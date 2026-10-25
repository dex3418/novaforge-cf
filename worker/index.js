// Cloudflare Worker entry for Novaforge Labs.
// Static files and the SPA fallback are served by the assets binding.
// Only /api/* reaches this Worker (see run_worker_first in wrangler.jsonc).
// The handlers in /api were written for Vercel (req, res), so a tiny shim adapts them.
import courses from "../api/courses.js"
import enroll from "../api/enroll.js"
import pricing from "../api/pricing.js"
import projects from "../api/projects.js"
import team from "../api/team.js"

const ROUTES = { courses, enroll, pricing, projects, team }

async function run(handler, request, query) {
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text()
  const headers = new Headers()
  const reqHeaders = Object.fromEntries(request.headers)
  // Vercel sets x-forwarded-for; on Cloudflare the visitor address is cf-connecting-ip.
  if (!reqHeaders["x-forwarded-for"] && reqHeaders["cf-connecting-ip"]) reqHeaders["x-forwarded-for"] = reqHeaders["cf-connecting-ip"]

  return new Promise((resolve) => {
    let status = 200
    const done = (out) => resolve(new Response(out, { status, headers }))
    const res = {
      setHeader: (k, v) => headers.set(k, v),
      status(code) {
        status = code
        return res
      },
      json(data) {
        headers.set("Content-Type", "application/json")
        done(JSON.stringify(data))
      },
      send: (out) => done(out),
      redirect(code, location) {
        status = code
        headers.set("Location", location)
        done(null)
      },
    }
    const req = { method: request.method, query, headers: reqHeaders, body }
    Promise.resolve(handler(req, res)).catch((e) => {
      console.error(e)
      status = 500
      res.json({ error: "Something went wrong. Please try again later." })
    })
  })
}

export default {
  async fetch(request, env) {
    // Secrets and variables also reach process.env, which the handlers read.
    for (const [k, v] of Object.entries(env || {})) if (typeof v === "string" && !process.env[k]) process.env[k] = v

    const url = new URL(request.url)
    const handler = ROUTES[url.pathname.replace(/^\/api\//, "").replace(/\/$/, "")]
    if (url.pathname.startsWith("/api/") && handler) return run(handler, request, Object.fromEntries(url.searchParams))
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
  },
}
