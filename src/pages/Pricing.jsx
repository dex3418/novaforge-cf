import PageHeader from "../components/ui/PageHeader.jsx"
import StateMessage from "../components/ui/StateMessage.jsx"
import PlanCard from "../components/pricing/PlanCard.jsx"
import { useNotion } from "../data/useNotion.js"

export default function Pricing() {
  const { data, loading, error } = useNotion("/api/pricing")

  return (
    <>
      <PageHeader title="Pricing" text="Choose a plan and enroll." />
      <StateMessage loading={loading} error={error} empty={data && data.length === 0} emptyText="Pricing will be published soon." />
      {data && data.length > 0 && (
        <div className="plans">
          {data.map((p) => <PlanCard key={p.id} {...p} />)}
        </div>
      )}
    </>
  )
}
