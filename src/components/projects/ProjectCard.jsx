import TagChip from "../ui/TagChip.jsx"

export default function ProjectCard({ title, description, student, track, image, link }) {
  return (
    <article className="project panel">
      {image && <img className="project__img" src={image} alt={title} loading="lazy" />}
      <div className="project__body">
        <TagChip>{track}</TagChip>
        <h2 className="project__title">{title}</h2>
        {description && <p className="project__text">{description}</p>}
        {student && <p className="project__student">Built by {student}</p>}
        {link && (
          <a className="project__link" href={link} target="_blank" rel="noreferrer">View project</a>
        )}
      </div>
    </article>
  )
}
