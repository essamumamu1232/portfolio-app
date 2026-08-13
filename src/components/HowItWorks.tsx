import { Phone, FileText, Zap } from 'lucide-react'

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
    <section id="process" className="section">
      <div className="container">
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {steps.map((s) => (
            <div
              key={s.num}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                padding: '32px',
                transition: 'all var(--t-fast)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <s.icon size={20} style={{ color: 'var(--accent)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--accent)',
                    fontWeight: 500,
                  }}
                >
                  {s.num}
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
