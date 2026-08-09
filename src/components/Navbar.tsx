import { useStore } from '../store'
import { Menu, X, Github, FileText } from 'lucide-react'

export default function Navbar() {
  const { menuOpen, toggleMenu, setProject } = useStore()

  const handleProjectClick = (id: 'code-stream' | 'ledger-line' | 'sync-board') => {
    setProject(id)
    toggleMenu()
    const el = document.getElementById('studio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="logo">ESSAM<span>.</span>DEV</a>
        <div className="nav-links">
          <button onClick={() => handleProjectClick('code-stream')}>CodeStream</button>
          <button onClick={() => handleProjectClick('ledger-line')}>LedgerLine</button>
          <button onClick={() => handleProjectClick('sync-board')}>SyncBoard</button>
          <a href="#credentials">Credentials</a>
          <a href="#contact">Contact</a>
          <div className="nav-social">
            <a href="https://github.com/essamumamu1232" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#contact" aria-label="Contact">
              <FileText size={20} />
            </a>
          </div>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-nav open">
          <button onClick={() => handleProjectClick('code-stream')}>CodeStream</button>
          <button onClick={() => handleProjectClick('ledger-line')}>LedgerLine</button>
          <button onClick={() => handleProjectClick('sync-board')}>SyncBoard</button>
          <a href="#credentials" onClick={toggleMenu}>Credentials</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <a href="https://github.com/essamumamu1232" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      )}
    </nav>
  )
}
