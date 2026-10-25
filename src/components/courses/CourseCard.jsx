import { Link } from "react-router-dom"
import TagChip from "../ui/TagChip.jsx"

export default function CourseCard({ title, track, summary, level, duration, mode, image }) {
  const meta = [level, duration, mode].filter(Boolean)
  return (
    <article className="course panel">
      {image && <img className="course__img" src={image} alt={title} loading="lazy" />}
      <div className="course__body">
        <TagChip>{track}</TagChip>
        <h2 className="course__title">{title}</h2>
        {summary && <p className="course__text">{summary}</p>}
        {meta.length > 0 && <p className="course__meta">{meta.join("  /  ")}</p>}
        <Link to={`/enroll?course=${encodeURIComponent(title)}`} className="course__link">Enroll</Link>
      </div>
    </article>
  )
}
