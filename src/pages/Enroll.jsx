import PageHeader from "../components/ui/PageHeader.jsx"
import EnrollForm from "../components/enroll/EnrollForm.jsx"

export default function Enroll() {
  return (
    <>
      <PageHeader title="Enroll" text="Tell us a little about you and we will get in touch." />
      <div className="enroll">
        <EnrollForm />
        <aside className="panel enroll__side">
          <h2>What happens next</h2>
          <ul>
            <li>You send this form.</li>
            <li>We contact you on the number you share.</li>
            <li>We help you pick the right course and plan.</li>
          </ul>
        </aside>
      </div>
    </>
  )
}
