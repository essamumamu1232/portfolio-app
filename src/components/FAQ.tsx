import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { fadeSlideUp } from '../lib/animations'

const faqs = [
  {
    q: 'How much does a typical project cost?',
    a: 'Most internal dashboards and tools I build for small teams range from $1,500 to $3,000, depending on data complexity, user roles, and integrations. I quote fixed prices after a 15-minute discovery call — no hourly billing, no surprise invoices.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'I deliver a working prototype within 48 hours of project kickoff. This gives you a live clickable link to test early. Full production deployment is typically completed within 5–7 business days.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A 30-minute discovery call to map your workflow, plus any spreadsheets or data exports you currently use. I handle the architecture, design, and deployment. You just need to tell me what hurts.',
  },
  {
    q: 'Do you offer support after delivery?',
    a: 'Yes — 30 days of bug fixes and minor tweaks are included. After that, I offer flexible monthly retainer blocks for ongoing feature work.',
  },
  {
    q: 'Are CodeStream, LedgerLine, and SyncBoard real products?',
    a: 'They are interactive demo systems built using patterns used in client work: role-based access, typed APIs, interactive visualizations, and CI/CD pipelines. They give you a real hands-on feel for how your application will work.',
  },
  {
    q: 'Can I see the code?',
    a: 'Yes. Every project links to its GitHub repository with full source code, commit history, and documentation. I ship client code the same way — clean, commented, and yours to own.',
  },
  {
    q: 'Can you build something other than dashboards?',
    a: 'My specialty is internal tools and data-heavy web applications — CRMs, inventory systems, reporting suites, and admin panels. If your problem involves turning messy data into a clean interface, I can solve it.',
  },
  {
    q: 'What is Full Stack Open?',
    a: 'It is an official University of Helsinki course — a rigorous project-based curriculum where every certificate requires shipping working code to GitHub, passing automated tests, and manual review by university TAs. I hold certificates across the full curriculum: 14 ECTS, Grade 5.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. I am based in Pakistan (UTC+5) and work with clients in the US, EU, and Middle East. I am comfortable with async communication and schedule overlap calls when needed.',
  },
  {
    q: 'What do you NOT build?',
    a: 'I specialize in internal tools and data dashboards. I do not build e-commerce stores, WordPress sites, or marketing landing pages.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--border-default)', padding: '20px 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--text-primary)',
          fontSize: '1.0625rem',
          fontWeight: 600
        }}
      >
        <span>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: 'var(--accent-primary)', flexShrink: 0, marginLeft: '16px' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" style={{ position: 'relative', padding: '100px 24px', zIndex: 10 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '48px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlideUp}
        >
          <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={14} /> Frequently Asked Questions
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
            Everything You Need To Know
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeSlideUp}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
