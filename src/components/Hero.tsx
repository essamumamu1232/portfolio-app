import { motion } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'
import { wordSplitContainer, wordSplitItem } from '../lib/animations'
import { useMagnetic } from '../hooks/useMagnetic'

const heroCopy = {
  eyebrow: 'Solo Full-Stack Developer',
  headline: 'I turn messy operations into clean dashboards.',
  subheadline: 'Solo developer for teams who are tired of spreadsheets. I design and build internal tools, admin panels, and SaaS interfaces that your team actually wants to use.',
  ctaPrimary: 'View My Work',
  ctaSecondary: 'Start a Project'
}

export default function Hero() {
  const words = heroCopy.headline.split(' ')

  const magneticPrimary = useMagnetic(0.2)
  const magneticSecondary = useMagnetic(0.2)

  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        textAlign: 'center',
        zIndex: 10
      }}
    >
      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ marginBottom: '24px' }}
      >
        <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '9999px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', fontSize: '14px' }}>
          <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
          {heroCopy.eyebrow}
        </span>
      </motion.div>

      {/* Headline with word stagger */}
      <motion.h1
        style={{
          maxWidth: '900px',
          color: 'var(--text-primary)',
          fontWeight: 800,
          fontSize: 'var(--text-hero)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '24px'
        }}
        variants={wordSplitContainer}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordSplitItem}
            style={{ display: 'inline-block', marginRight: '0.3em', perspective: '1000px' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        style={{
          maxWidth: '680px',
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          lineHeight: 1.7,
          marginBottom: '40px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {heroCopy.subheadline}
      </motion.p>

      {/* CTA Group */}
      <motion.div
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <motion.a
          ref={magneticPrimary.ref as any}
          onMouseMove={magneticPrimary.handleMouseMove}
          onMouseLeave={magneticPrimary.handleMouseLeave}
          href="#projects"
          className="btn btn-primary"
          style={{
            padding: '14px 32px',
            borderRadius: 'var(--r-md)',
            background: 'var(--accent-primary)',
            color: 'var(--bg-base)',
            fontWeight: 600,
            fontSize: '15px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{heroCopy.ctaPrimary}</span>
          <ArrowDown size={16} />
        </motion.a>

        <motion.a
          ref={magneticSecondary.ref as any}
          onMouseMove={magneticSecondary.handleMouseMove}
          onMouseLeave={magneticSecondary.handleMouseLeave}
          href="#contact"
          className="btn btn-ghost"
          style={{
            padding: '14px 32px',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border-default)',
            background: 'rgba(15, 23, 42, 0.5)',
            color: 'var(--text-primary)',
            fontWeight: 500,
            fontSize: '15px',
            textDecoration: 'none'
          }}
          whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)' }}
          whileTap={{ scale: 0.98 }}
        >
          {heroCopy.ctaSecondary}
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ marginTop: '60px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '24px',
            height: '40px',
            borderRadius: '9999px',
            border: '2px solid var(--text-muted)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '6px'
          }}
        >
          <div style={{ width: '4px', height: '8px', borderRadius: '9999px', background: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
