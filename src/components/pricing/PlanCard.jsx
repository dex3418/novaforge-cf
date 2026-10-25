import { Link } from "react-router-dom"

export default function PlanCard({ name, price, billing, description, features, featured, buttonText }) {
  return (
    <article className={`plan panel ${featured ? "plan--featured" : ""}`}>
      <h2 className="plan__name">{name}</h2>
      <p className="plan__price">
        {price}
        {billing && <span className="plan__billing"> {billing}</span>}
      </p>
      {description && <p className="plan__text">{description}</p>}
      {features.length > 0 && (
        <ul className="plan__features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      )}
      <Link to={`/enroll?plan=${encodeURIComponent(name)}`} className={`btn ${featured ? "btn--primary" : "btn--ghost"} plan__btn`}>
        {buttonText || "Enroll"}
      </Link>
    </article>
  )
}
