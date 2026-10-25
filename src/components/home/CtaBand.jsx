import { Link } from "react-router-dom"
import { cta } from "../../data/home.js"

export default function CtaBand() {
  return (
    <section className="cta panel">
      <div>
        <h2 className="cta__title">{cta.title}</h2>
        <p className="cta__text">{cta.text}</p>
      </div>
      <div className="cta__actions">
        <Link to="/enroll" className="btn btn--primary">Enroll now</Link>
        <Link to="/pricing" className="btn btn--ghost">See pricing</Link>
      </div>
    </section>
  )
}
