import { useState } from "react"
import PageHeader from "../components/ui/PageHeader.jsx"
import StateMessage from "../components/ui/StateMessage.jsx"
import TrackFilter from "../components/ui/TrackFilter.jsx"
import CourseCard from "../components/courses/CourseCard.jsx"
import { useNotion } from "../data/useNotion.js"

export default function Courses() {
  const { data, loading, error } = useNotion("/api/courses")
  const [track, setTrack] = useState("All")

  const tracks = data ? [...new Set(data.map((c) => c.track).filter(Boolean))] : []
  const shown = data ? data.filter((c) => track === "All" || c.track === track) : []

  return (
    <>
      <PageHeader title="Courses" text="Pick a track and start building." />
      <StateMessage loading={loading} error={error} empty={data && data.length === 0} emptyText="No courses published yet." />
      {data && data.length > 0 && (
        <>
          <TrackFilter tracks={tracks} value={track} onChange={setTrack} />
          <div className="grid">
            {shown.map((c) => <CourseCard key={c.id} {...c} />)}
          </div>
        </>
      )}
    </>
  )
}
