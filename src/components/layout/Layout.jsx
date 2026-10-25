import { Outlet } from "react-router-dom"
import Background from "./Background.jsx"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"

export default function Layout() {
  return (
    <div className="shell">
      <Background />
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
