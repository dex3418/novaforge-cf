// Filter buttons built from the tracks found in the data. Shows nothing when there is only one track.
export default function TrackFilter({ tracks, value, onChange }) {
  if (tracks.length < 2) return null
  const all = ["All", ...tracks]
  return (
    <div className="filters" role="tablist" aria-label="Filter by track">
      {all.map((t) => (
        <button key={t} role="tab" aria-selected={value === t} className={`filter ${value === t ? "filter--on" : ""}`} onClick={() => onChange(t)}>
          {t}
        </button>
      ))}
    </div>
  )
}
