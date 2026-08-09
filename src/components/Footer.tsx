import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2026 Essam Mubbashir</p>
        <a href="https://github.com/essamumamu1232" target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={20} />
        </a>
      </div>
    </footer>
  )
}
