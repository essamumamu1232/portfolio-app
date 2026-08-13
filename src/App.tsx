import AmbientBackground from './components/AmbientBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import HowItWorks from './components/HowItWorks'
import Toolkit from './components/Toolkit'
import Credentials from './components/Credentials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-base)', overflowX: 'hidden' }}>
      <CustomCursor />
      <AmbientBackground />
      <Navbar />
      <Hero />
      <FeaturedProject />
      <HowItWorks />
      <Toolkit />
      <Credentials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
