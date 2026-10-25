import { DB, listEndpoint, getText, getSelect, getUrl, getFile } from "./_notion.js"

export default listEndpoint(DB.projects, (p) => ({
  title: getText(p.Title),
  slug: getText(p.Slug),
  description: getText(p.Description),
  student: getText(p.Student),
  track: getSelect(p.Track),
  image: getFile(p.Image),
  link: getUrl(p.Link),
}))
