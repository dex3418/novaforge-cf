import { tracks } from "../../data/home.js"

// The three learning tracks drawn as parts wired onto one bus line.
export default function TrackBus() {
  return (
    <div className="bus panel">
      <p className="bus__title">Learning tracks</p>
      <ul className="bus__list">
        {tracks.map((t) => (
          <li className="bus__item" key={t.name}>
            <h3 className="bus__name">{t.name}</h3>
            <p className="bus__text">{t.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
