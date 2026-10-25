import { Link } from "react-router-dom"
import { hero } from "../../data/home.js"
import TrackBus from "./TrackBus.jsx"

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__lead">{hero.lead}</p>
        <div className="hero__actions">
          <Link to="/enroll" className="btn btn--primary">Enroll now</Link>
          <Link to="/courses" className="btn btn--ghost">View courses</Link>
        </div>
      </div>
      <TrackBus />
    </section>
  )
}
