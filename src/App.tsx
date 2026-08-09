import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectSelector from './components/ProjectSelector'
import ProjectViewport from './components/ProjectViewport'
import TechSpecs from './components/TechSpecs'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section id="studio" className="hub-section">
        <div className="container">
          <div className="hub-header">
            <h2>Interactive Studio Hub</h2>
            <p>Explore live app previews, technical architecture, and engineering highlights.</p>
          </div>
          <ProjectSelector />
          <div className="studio-grid">
            <ProjectViewport />
            <TechSpecs />
          </div>
        </div>
      </section>
      <Credentials />
      <Contact />
      <Footer />
    </div>
  )
}
