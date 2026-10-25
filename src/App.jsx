import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout.jsx"
import Home from "./pages/Home.jsx"
import Courses from "./pages/Courses.jsx"
import Pricing from "./pages/Pricing.jsx"
import Projects from "./pages/Projects.jsx"
import About from "./pages/About.jsx"
import Enroll from "./pages/Enroll.jsx"
import NotFound from "./pages/NotFound.jsx"

// Each new page = one file in /pages + one <Route> here + one line in the Navbar.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
