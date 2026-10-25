import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import FormField from "./FormField.jsx"
import { useNotion } from "../../data/useNotion.js"

const PHONE = /^[0-9+ ()-]{10,18}$/
const NOT_SURE = "Not sure yet"

export default function EnrollForm() {
  const [params] = useSearchParams()
  const courses = useNotion("/api/courses").data || []
  const plans = useNotion("/api/pricing").data || []

  const [v, setV] = useState({
    name: "", phone: "", email: "",
    course: params.get("course") || "",
    plan: params.get("plan") || "",
    message: "", website: "",
  })
  const [status, setStatus] = useState("idle") // idle | sending | done
  const [error, setError] = useState("")

  const set = (e) => setV({ ...v, [e.target.name]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setError("")
    if (v.name.trim().length < 2) return setError("Please enter your name.")
    if (!PHONE.test(v.phone.trim())) return setError("Please enter a valid phone number.")
    setStatus("sending")
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, course: v.course === NOT_SURE ? "" : v.course, plan: v.plan === NOT_SURE ? "" : v.plan }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.")
      setStatus("done")
    } catch (err) {
      setError(err.message)
      setStatus("idle")
    }
  }

  if (status === "done") {
    return (
      <div className="panel enroll__done" role="status">
        <h2>Thank you, {v.name.trim().split(" ")[0]}.</h2>
        <p>We have received your details and will contact you on {v.phone.trim()}.</p>
      </div>
    )
  }

  return (
    <form className="panel form" onSubmit={submit} noValidate>
      <FormField label="Your name" name="name" value={v.name} onChange={set} autoComplete="name" required />
      <FormField label="Phone number" name="phone" type="tel" value={v.phone} onChange={set} autoComplete="tel" inputMode="tel" required />
      <FormField label="Email (optional)" name="email" type="email" value={v.email} onChange={set} autoComplete="email" />

      <FormField label="Course" name="course" as="select" value={v.course} onChange={set}>
        <option value="">Choose a course</option>
        {courses.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
        <option value={NOT_SURE}>{NOT_SURE}</option>
      </FormField>

      <FormField label="Plan" name="plan" as="select" value={v.plan} onChange={set}>
        <option value="">Choose a plan</option>
        {plans.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
        <option value={NOT_SURE}>{NOT_SURE}</option>
      </FormField>

      <FormField label="Anything you want to tell us (optional)" name="message" as="textarea" rows={3} maxLength={500} value={v.message} onChange={set} />

      {/* Hidden from real visitors. Bots fill it, and the server ignores those submissions. */}
      <div className="form__trap" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set} /></label>
      </div>

      {error && <p className="form__error" role="alert">{error}</p>}
      <p className="form__note">We use your details only to contact you about enrollment.</p>
      <button className="btn btn--primary form__submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enrollment request"}
      </button>
    </form>
  )
}
