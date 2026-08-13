import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How much does a typical project cost?',
    a: 'Most internal dashboards and finance tools I build for small teams range from $1,500 to $3,000, depending on data complexity, user roles, and integrations. I quote fixed prices after a 15-minute discovery call — no hourly billing, no surprise invoices.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'I ship a working prototype within 48 hours of project kickoff. This is not a mockup — it is real code, deployed to a live URL, that you can click and test. Final delivery is typically 5–7 business days.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'A 30-minute call to map your workflow, plus any spreadsheets or data exports you currently use. I handle the architecture, design, and deployment. You just need to tell me what hurts.',
  },
  {
    q: 'Do you offer support after delivery?',
    a: 'Yes — 30 days of bug fixes and minor tweaks are included. After that, I offer monthly retainer blocks for ongoing feature work.',
  },
  {
    q: 'Are CodeStream, LedgerLine, and SyncBoard real products?',
    a: 'They are production-grade demo systems built to the same standard as client work. LedgerLine uses multi-tenant architecture, role-based access control, and Dockerized deployment. The only difference is that demo data runs locally — client projects connect to live databases.',
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
    a: 'It is an official University of Helsinki course — not a bootcamp, not a MOOC vendor. It is a project-based curriculum where every certificate requires shipping working code to GitHub, passing automated tests, and manual review by university TAs. I hold certificates across the full curriculum: 14 ECTS, Grade 5.',
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
    <div style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '16px',
          fontWeight: 500,
          textAlign: 'left',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {q}
        <ChevronDown
          size={18}
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--t-fast)',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        />
      </button>
      {open && (
        <p
          style={{
            marginTop: '12px',
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            paddingRight: '32px',
          }}
        >
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  )
}
