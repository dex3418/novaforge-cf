import { DB, listEndpoint, getText, getCheckbox } from "./_notion.js"

// Features are typed one per line in Notion and sent to the page as a list.
export default listEndpoint(DB.pricing, (p) => ({
  name: getText(p.Name),
  price: getText(p.Price),
  billing: getText(p.Billing),
  description: getText(p.Description),
  features: getText(p.Features).split(/\r?\n/).map((f) => f.trim()).filter(Boolean),
  featured: getCheckbox(p.Featured),
  buttonText: getText(p["Button Text"]),
}))
