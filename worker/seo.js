// Live /sitemap.xml and /robots.txt for Novaforge Labs. The site has a fixed set of pages.
const PAGES = ["/", "/courses", "/pricing", "/projects", "/about", "/enroll"]

export async function seoResponse(url, env) {
  const site = (env.SITE_URL || url.origin).replace(/\/$/, "")
  const headers = { "Cache-Control": "public, max-age=3600" }
  if (url.pathname === "/robots.txt")
    return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`, { headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" } })
  if (url.pathname === "/sitemap.xml") {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map((p) => `  <url><loc>${site}${p}</loc></url>`).join("\n")}\n</urlset>\n`
    return new Response(xml, { headers: { ...headers, "Content-Type": "application/xml; charset=utf-8" } })
  }
  return null
}
