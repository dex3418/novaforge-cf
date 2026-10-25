import { about } from "../../data/about.js"

export default function Story() {
  return (
    <div>
      <p className="about__mission">{about.mission}</p>
      {about.story.map((t) => (
        <p className="about__text" key={t}>{t}</p>
      ))}
      <p className="about__vision">{about.vision}</p>
    </div>
  )
}
