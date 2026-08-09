import { Menu, X, Github, Mail } from 'lucide-react'
import { useStore } from '../store'

export default function Navbar() {
  const { menuOpen, toggleMenu } = useStore()

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="logo">ESSAM<span>.</span>DEV</a>
        <div className="nav-links">
          <a href="#featured">Projects</a>
          <a href="#credentials">Credentials</a>
          <a href="#contact">Contact</a>
          <div className="nav-social">
            <a href="https://github.com/essamumamu1232" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="mailto:essammubbashirbusiness@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-nav open">
          <a href="#featured" onClick={toggleMenu}>Projects</a>
          <a href="#credentials" onClick={toggleMenu}>Credentials</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <a href="https://github.com/essamumamu1232" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      )}
    </nav>
  )
}
