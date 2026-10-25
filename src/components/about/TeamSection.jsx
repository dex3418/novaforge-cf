import TeamCard from "../team/TeamCard.jsx"
import { useNotion } from "../../data/useNotion.js"

// Hidden while loading, on error, or when nobody is published yet.
export default function TeamSection() {
  const { data } = useNotion("/api/team")
  if (!data || data.length === 0) return null
  return (
    <section className="block">
      <h2 className="block__title">Team</h2>
      <div className="members">
        {data.map((m) => <TeamCard key={m.id} {...m} />)}
      </div>
    </section>
  )
}
