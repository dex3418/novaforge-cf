// Builds a set of loose circuit traces that never touch or overlap.
// Hand-placed traces go in first; then extra irregular ones (90 and 45 degree bends,
// fixed seed) are added only where they keep a clear gap from every trace already placed.
function rng(seed) {
  let s = seed
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
}

function parse(d) {
  const pts = []
  let x = 0
  let y = 0
  for (const m of d.matchAll(/([MHVL])\s*(-?[\d.]+)(?:[\s,]+(-?[\d.]+))?/g)) {
    const [, c, a, b] = m
    if (c === "M" || c === "L") { x = +a; y = +b }
    else if (c === "H") x = +a
    else y = +a
    pts.push([x, y])
  }
  return pts
}

function distToSeg(px, py, [ax, ay], [bx, by]) {
  const dx = bx - ax
  const dy = by - ay
  const len2 = dx * dx + dy * dy
  const t = len2 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2)) : 0
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

// True if any trace A is closer than `gap` to trace B (checked both ways).
function tooClose(a, b, gap) {
  const check = (p, q) => {
    for (let i = 0; i < p.length - 1; i++) {
      const len = Math.hypot(p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1])
      const steps = Math.max(1, Math.ceil(len / 4))
      for (let s = 0; s <= steps; s++) {
        const t = s / steps
        const x = p[i][0] + (p[i + 1][0] - p[i][0]) * t
        const y = p[i][1] + (p[i + 1][1] - p[i][1]) * t
        for (let j = 0; j < q.length - 1; j++) if (distToSeg(x, y, q[j], q[j + 1]) < gap) return true
      }
    }
    return false
  }
  return check(a, b) || check(b, a)
}

function candidate(r, w, h) {
  const side = Math.floor(r() * 4)
  let x, y, dx, dy
  if (side === 0) { x = 0; y = Math.round(r() * h); dx = 1; dy = 0 }
  else if (side === 1) { x = w; y = Math.round(r() * h); dx = -1; dy = 0 }
  else if (side === 2) { y = 0; x = Math.round(r() * w); dx = 0; dy = 1 }
  else { y = h; x = Math.round(r() * w); dx = 0; dy = -1 }
  const inside = (a, b) => a >= 0 && a <= w && b >= 0 && b <= h

  let d = `M${x} ${y}`
  const bends = 2 + Math.floor(r() * 3)
  for (let b = 0; b < bends; b++) {
    const len = Math.round((w + h) * (0.03 + r() * 0.07))
    const sx = x + dx * len
    const sy = y + dy * len
    if (!inside(sx, sy)) break
    d += dx !== 0 ? ` H${sx}` : ` V${sy}`
    x = sx; y = sy
    const t = r() < 0.5 ? 1 : -1
    const nx = -dy * t
    const ny = dx * t
    const dg = Math.round(18 + r() * 22)
    const ex = x + (dx + nx) * dg
    const ey = y + (dy + ny) * dg
    if (!inside(ex, ey)) break
    d += ` L${ex} ${ey}`
    x = ex; y = ey; dx = nx; dy = ny
  }
  return d.includes("L") ? d : null
}

export function buildSet({ hand, seed, w, h, count, gap }) {
  const r = rng(seed)
  const placed = []
  const add = (d) => {
    const pts = parse(d)
    if (placed.every((p) => !tooClose(pts, p.pts, gap))) placed.push({ d, pts })
  }
  hand.forEach((d) => placed.length < count && add(d))
  for (let tries = 0; tries < 600 && placed.length < count; tries++) {
    const d = candidate(r, w, h)
    if (d) add(d)
  }
  return {
    traces: placed.map((p) => p.d),
    nodes: placed.map((p) => p.pts[p.pts.length - 1]),
  }
}
