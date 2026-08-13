import { motion } from 'framer-motion'
import { Phone, FileText, Zap } from 'lucide-react'
import { fadeSlideUp, staggerContainer, staggerItem } from '../lib/animations'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: '30 minutes to map your workflow and identify the highest-impact automation. No pitch, just listening.',
    icon: Phone,
  },
  {
    num: '02',
    title: 'Fixed Scope & Price',
    desc: 'You get a clear proposal with a fixed price and delivery date. No hourly billing. No surprise invoices.',
    icon: FileText,
  },
  {
    num: '03',
    title: 'Prototype in 48hrs',
    desc: 'Working code, deployed to a live URL, that you can click and test. Real progress, not mockups.',
    icon: Zap,
  },
]

export default function HowItWorks() {
  return (
    <section id="process" style={{ position: 'relative', padding: '100px 24px', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '48px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlideUp}
        >
          <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Simple & Transparent
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
            How It Works
          </h2>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {steps.map((s) => {
            const IconComp = s.icon
            return (
              <motion.div
                key={s.num}
                variants={staggerItem}
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '16px',
                  padding: '32px',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ borderColor: 'var(--border-hover)', translateY: -4 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--accent-primary)' }}>
                    <IconComp size={20} />
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: 'var(--accent-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {s.num}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
