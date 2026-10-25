import { useState } from "react"
import { NavLink } from "react-router-dom"

// Add or remove entries here when a page is added or removed.
const LINKS = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/pricing", label: "Pricing" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <nav className="nav panel panel--blur" aria-label="Main">
      <NavLink to="/" className="nav__brand" onClick={close}>
        Novaforge<span>Labs</span>
      </NavLink>
      <button className="nav__toggle" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>
      <ul className={`nav__links ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.to === "/"} className={({ isActive }) => `nav__link ${isActive ? "active" : ""}`} onClick={close}>
              {l.label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/enroll" className="nav__link nav__link--cta" onClick={close}>Enroll</NavLink>
        </li>
      </ul>
      <NavLink to="/enroll" className="nav__cta">Enroll</NavLink>
    </nav>
  )
}
