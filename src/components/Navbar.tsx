import { Menu, X } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useStore } from '../store'
import { useMagnetic } from '../hooks/useMagnetic'

export default function Navbar() {
  const { menuOpen, toggleMenu } = useStore()
  const magneticCta = useMagnetic(0.2)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <>
      {/* Scroll-Linked Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--accent-primary)',
          transformOrigin: '0%',
          zIndex: 1000,
          scaleX
        }}
      />

      <nav className="navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="container navbar-inner" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" className="logo" style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            ESSAM<span style={{ color: 'var(--accent-primary)' }}>.DEV</span>
          </a>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#projects">Work</a>
            <a href="#toolkit">Toolkit</a>
            <a href="#credentials">Credentials</a>
            <a href="#faq">FAQ</a>
            <a
              ref={magneticCta.ref as any}
              onMouseMove={magneticCta.handleMouseMove}
              onMouseLeave={magneticCta.handleMouseLeave}
              href="#contact"
              className="btn btn-primary"
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                background: 'var(--accent-primary)',
                color: 'var(--bg-base)',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none'
              }}
            >
              Let's Talk
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav open" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)', padding: '20px' }}>
            <a href="#projects" onClick={toggleMenu}>Work</a>
            <a href="#toolkit" onClick={toggleMenu}>Toolkit</a>
            <a href="#credentials" onClick={toggleMenu}>Credentials</a>
            <a href="#faq" onClick={toggleMenu}>FAQ</a>
            <a href="#contact" onClick={toggleMenu}>Contact</a>
          </div>
        )}
      </nav>
    </>
  )
}
