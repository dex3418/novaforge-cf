import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="panel" style={{ padding: "40px 28px" }}>
      <h1 style={{ margin: "0 0 8px" }}>Page not found</h1>
      <p style={{ color: "var(--text-dim)", marginTop: 0 }}>This page does not exist yet.</p>
      <Link to="/" style={{ color: "var(--cyan)" }}>Go home</Link>
    </section>
  )
}
