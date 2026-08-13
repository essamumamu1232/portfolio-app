import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeSlideUp } from '../lib/animations'
import { Code2, Database, Server } from 'lucide-react'

const toolkitCopy = {
  eyebrow: 'My Toolkit',
  headline: 'I do not chase trends. I use tools that ship fast and stay reliable.',
  categories: [
    {
      title: 'Frontend & UI Engineering',
      description: 'Interfaces that feel instant, intuitive, and responsive.',
      icon: Code2,
      items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Vite']
    },
    {
      title: 'Backend & Data Architecture',
      description: 'Solid foundations that scale cleanly and run reliably.',
      icon: Database,
      items: ['Node.js', 'PostgreSQL', 'Sequelize / Prisma', 'REST & GraphQL APIs', 'SQL Modeling']
    },
    {
      title: 'Infrastructure & Tooling',
      description: 'Deployed, monitored, and automated without DevOps complexity.',
      icon: Server,
      items: ['Vercel & Netlify', 'Docker Containers', 'GitHub Actions CI/CD', 'Git Version Control']
    }
  ]
}

export default function Toolkit() {
  return (
    <section id="toolkit" style={{ position: 'relative', padding: '100px 24px', zIndex: 10 }}>
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'start'
        }}
      >
        {/* Left: Sticky Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlideUp}
        >
          <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {toolkitCopy.eyebrow}
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '12px', lineHeight: 1.2 }}>
            {toolkitCopy.headline}
          </h2>
        </motion.div>

        {/* Right: Skill Category Cards */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {toolkitCopy.categories.map((cat) => {
            const IconComp = cat.icon
            return (
              <motion.div
                key={cat.title}
                variants={staggerItem}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-default)',
                  background: 'rgba(15, 23, 42, 0.5)',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ borderColor: 'var(--border-hover)', boxShadow: '0 0 25px rgba(56, 189, 248, 0.12)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--accent-primary)' }}>
                    <IconComp size={20} />
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {cat.title}
                  </h3>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '20px' }}>
                  {cat.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--bg-elevated)',
                        color: 'var(--accent-primary)',
                        border: '1px solid var(--border-default)'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
