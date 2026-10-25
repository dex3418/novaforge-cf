export default function TagChip({ children }) {
  if (!children) return null
  return <span className="tag">{children}</span>
}
