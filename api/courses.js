import { DB, listEndpoint, getText, getSelect, getFile } from "./_notion.js"

export default listEndpoint(DB.courses, (p) => ({
  title: getText(p.Title),
  slug: getText(p.Slug),
  track: getSelect(p.Track),
  summary: getText(p.Summary),
  level: getSelect(p.Level),
  duration: getText(p.Duration),
  mode: getSelect(p.Mode),
  image: getFile(p.Image),
}))
