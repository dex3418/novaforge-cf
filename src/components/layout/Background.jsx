import CircuitSet from "./CircuitSet.jsx"
import { buildSet } from "./circuitGen.js"

// Loose circuit traces (not a tiled pattern). A landscape set and a separate portrait set for phones.
// Traces that would touch or overlap are skipped.
const WIDE_HAND = [
  "M0 120 H130 L170 160 V260 L210 300 H340",
  "M0 260 H60 L90 290 V380",
  "M1200 90 H1060 L1020 130 V220 L980 260 H860",
  "M300 0 V50 L340 90 H470",
  "M0 640 H120 L160 680 V780 L200 820 H330",
  "M1200 700 H1110 L1080 730 V820 H980",
  "M900 900 V850 L860 810 H740",
  "M600 0 V30 L630 60 H700",
]
const TALL_HAND = [
  "M0 90 H70 L100 120 V200 L130 230 H210",
  "M400 140 H340 L315 165 V240 H250",
  "M0 330 H40 L60 350 V430",
  "M400 450 H350 L325 475 V560 L300 585 H230",
  "M0 620 H60 L90 650 V720 L120 750 H210",
  "M300 800 V760 L330 730 H400",
]

const WIDE = { viewBox: "0 0 1200 900", ...buildSet({ hand: WIDE_HAND, seed: 21, w: 1200, h: 900, count: 18, gap: 18 }) }
const TALL = { viewBox: "0 0 400 800", ...buildSet({ hand: TALL_HAND, seed: 23, w: 400, h: 800, count: 15, gap: 16 }) }

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__glow" />
      <CircuitSet className="bg__traces--wide" {...WIDE} />
      <CircuitSet className="bg__traces--tall" {...TALL} />
    </div>
  )
}
