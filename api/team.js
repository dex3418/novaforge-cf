import { DB, listEndpoint, getText, getUrl, getFile } from "./_notion.js"

export default listEndpoint(DB.team, (p) => ({
  name: getText(p.Name),
  role: getText(p.Role),
  bio: getText(p.Bio),
  photo: getFile(p.Photo),
  social: getUrl(p["Social Link"]),
}))
