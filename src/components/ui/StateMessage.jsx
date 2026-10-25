// Loading, empty and error states for any list page.
export default function StateMessage({ loading, error, empty, emptyText }) {
  if (loading) return <p className="state panel">Loading…</p>
  if (error) return <p className="state panel">Could not load this section. Refresh to try again.</p>
  if (empty) return <p className="state panel">{emptyText || "Nothing here yet."}</p>
  return null
}
