import PageHeader from "../components/ui/PageHeader.jsx"
import Story from "../components/about/Story.jsx"
import TeamSection from "../components/about/TeamSection.jsx"
import TrackBus from "../components/home/TrackBus.jsx"
import CtaBand from "../components/home/CtaBand.jsx"
import { about } from "../data/about.js"

export default function About() {
  return (
    <>
      <PageHeader title={about.title} />
      <section className="about block">
        <Story />
        <TrackBus />
      </section>
      <TeamSection />
      <CtaBand />
    </>
  )
}
