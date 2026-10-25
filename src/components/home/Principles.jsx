import { principles } from "../../data/home.js"

export default function Principles() {
  return (
    <section className="block">
      <h2 className="block__title">How we teach</h2>
      <div className="principles">
        {principles.map((p) => (
          <article className="panel principle" key={p.title}>
            <h3 className="principle__title">{p.title}</h3>
            <p className="principle__text">{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
