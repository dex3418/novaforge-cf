import { useState } from "react"
import PageHeader from "../components/ui/PageHeader.jsx"
import StateMessage from "../components/ui/StateMessage.jsx"
import TrackFilter from "../components/ui/TrackFilter.jsx"
import ProjectCard from "../components/projects/ProjectCard.jsx"
import { useNotion } from "../data/useNotion.js"

export default function Projects() {
  const { data, loading, error } = useNotion("/api/projects")
  const [track, setTrack] = useState("All")

  const tracks = data ? [...new Set(data.map((p) => p.track).filter(Boolean))] : []
  const shown = data ? data.filter((p) => track === "All" || p.track === track) : []

  return (
    <>
      <PageHeader title="Student projects" text="Things our students have built." />
      <StateMessage loading={loading} error={error} empty={data && data.length === 0} emptyText="Student projects will appear here soon." />
      {data && data.length > 0 && (
        <>
          <TrackFilter tracks={tracks} value={track} onChange={setTrack} />
          <div className="grid">
            {shown.map((p) => <ProjectCard key={p.id} {...p} />)}
          </div>
        </>
      )}
    </>
  )
}
