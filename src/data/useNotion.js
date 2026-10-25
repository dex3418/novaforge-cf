import { useEffect, useState } from "react"

// Loads a list from one of the /api endpoints. Reused by every page.
export function useNotion(endpoint) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let alive = true
    fetch(endpoint)
      .then((r) => {
        if (!r.ok) throw new Error("Could not load content")
        return r.json()
      })
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((e) => alive && setState({ data: null, loading: false, error: e.message }))
    return () => {
      alive = false
    }
  }, [endpoint])

  return state
}
