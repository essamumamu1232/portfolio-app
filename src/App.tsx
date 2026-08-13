import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import Toolkit from './components/Toolkit'
import Credentials from './components/Credentials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-base)', overflowX: 'hidden' }}>
      <AmbientBackground />
      <Navbar />
      <Hero />
      <FeaturedProject />
      <Toolkit />
      <Credentials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
