import { motion } from 'framer-motion'
import { Mail, Calendar, Sparkles } from 'lucide-react'
import { fadeSlideUp, scaleIn } from '../lib/animations'
import { useMagnetic } from '../hooks/useMagnetic'

const contactCopy = {
  eyebrow: 'Start a Project',
  headline: 'Have a dashboard that needs building?',
  subheadline: 'I work with small teams and founders who need tools that work — not PowerPoints that promise.',
  cta: 'Send Me An Email',
  email: 'essam.mubbashir@gmail.com',
  availability: 'Currently available for new projects'
}

export default function Contact() {
  const magneticCTA = useMagnetic(0.3)

  return (
    <section id="contact" style={{ position: 'relative', padding: '100px 24px 120px', zIndex: 10 }}>
      <motion.div
        style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeSlideUp}
      >
        <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} /> {contactCopy.eyebrow}
        </span>

        <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '12px', lineHeight: 1.2 }}>
          {contactCopy.headline}
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', marginTop: '16px', lineHeight: 1.6 }}>
          {contactCopy.subheadline}
        </p>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '20px' }}>
          Currently building my client base — I offer a free 30-minute workflow audit with no obligation.
        </p>

        <div style={{ marginTop: '40px' }}>
          <motion.a
            ref={magneticCTA.ref as any}
            onMouseMove={magneticCTA.handleMouseMove}
            onMouseLeave={magneticCTA.handleMouseLeave}
            href={`mailto:${contactCopy.email}`}
            className="btn"
            style={{
              x: magneticCTA.x,
              y: magneticCTA.y,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 40px',
              borderRadius: '16px',
              background: 'var(--accent-cta)',
              color: '#020617',
              fontWeight: 700,
              fontSize: '1.125rem',
              textDecoration: 'none',
              boxShadow: '0 0 35px var(--glow-cta)'
            }}
            variants={scaleIn}
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(245, 158, 11, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={22} />
            <span>{contactCopy.cta}</span>
          </motion.a>
        </div>

        <div style={{ marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <Calendar size={14} style={{ color: 'var(--accent-primary)' }} />
          <span>{contactCopy.availability}</span>
        </div>
      </motion.div>
    </section>
  )
}
