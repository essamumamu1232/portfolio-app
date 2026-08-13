import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, Sparkles, Layers, Terminal, LayoutDashboard } from 'lucide-react'
import { staggerContainer, staggerItem, fadeSlideUp, easeOutExpo } from '../lib/animations'
import ProjectViewport from './ProjectViewport'
import { useStore } from '../store'
import { projects } from '../data/projects'

const isTouchDevice = typeof window !== 'undefined' 
  ? ('ontouchstart' in window || navigator.maxTouchPoints > 0) 
  : false

const projectsCopy = {
  eyebrow: 'Selected Work',
  headline: 'Real tools. Real outcomes.',
  subheadline: 'Every project here replaced something broken — a spreadsheet, a manual process, or a tool the team hated.',
  cards: [
    {
      id: 'ledger-line',
      title: 'Operations & Accounting Dashboard',
      subtitle: 'LedgerLine',
      description: 'Replaced disconnected spreadsheets with a real-time financial dashboard. Interactive chart of accounts, CSV importing, and role-based views.',
      tags: ['React 19', 'TypeScript', 'Recharts', 'PapaParse'],
      featured: true,
      icon: LayoutDashboard,
      repoUrl: 'https://github.com/essamumamu1232/portfolio-app/tree/main/ledger-line'
    },
    {
      id: 'code-stream',
      title: 'Collaborative Code Review Workspace',
      subtitle: 'CodeStream',
      description: 'Monaco code editor with side-by-side diff viewer, line-by-line inline comments, and simulated multi-user cursors.',
      tags: ['Monaco Editor', 'Framer Motion', 'Zustand'],
      featured: false,
      icon: Terminal,
      repoUrl: 'https://github.com/essamumamu1232/portfolio-app/tree/main/code-stream'
    },
    {
      id: 'sync-board',
      title: 'Interactive Canvas Whiteboard',
      subtitle: 'SyncBoard',
      description: 'Visual canvas for team brainstorming with draggable sticky notes, shapes, connectors, and multi-user cursor tracking.',
      tags: ['React Konva', 'HTML5 Canvas', 'Zustand'],
      featured: false,
      icon: Layers,
      repoUrl: 'https://github.com/essamumamu1232/portfolio-app/tree/main/sync-board'
    }
  ]
}

function ProjectCard({ card, isSelected, onSelect }: { card: typeof projectsCopy.cards[0]; isSelected: boolean; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    const relX = (x / rect.width) - 0.5
    const relY = (y / rect.height) - 0.5
    mouseX.set(relX)
    mouseY.set(relY)
  }

  const handleMouseLeave = () => {
    if (isTouchDevice) return
    mouseX.set(0)
    mouseY.set(0)
  }

  const IconComp = card.icon

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onClick={onSelect}
      style={{
        position: 'relative',
        borderRadius: '16px',
        padding: '28px',
        cursor: 'pointer',
        background: isSelected ? 'rgba(15, 23, 42, 0.85)' : 'rgba(15, 23, 42, 0.5)',
        border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-default)',
        boxShadow: isSelected ? '0 0 25px rgba(56, 189, 248, 0.2)' : 'none',
        backdropFilter: 'blur(16px)',
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={isTouchDevice ? {} : { scale: 1.02, borderColor: 'var(--border-hover)' }}
      transition={{ duration: 0.3, ease: easeOutExpo as any }}
    >
      {/* Radial glow chase effect */}
      {!isTouchDevice && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.8,
            pointerEvents: 'none',
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.1), transparent 60%)`
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Card Tab Strip */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
          {['Overview', 'Interactive Demo', 'Source Code'].map((tab, idx) => (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
              style={{
                padding: '3px 8px',
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                borderRadius: '4px',
                background: idx === 1 && isSelected ? 'var(--accent-primary)' : 'rgba(0, 0, 0, 0.4)',
                color: idx === 1 && isSelected ? 'var(--bg-base)' : 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-elevated)', color: 'var(--accent-primary)' }}>
              <IconComp size={20} />
            </span>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {card.subtitle}
            </span>
          </div>

          <a
            href={card.repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', textDecoration: 'none' }}
            className="hover-bright"
          >
            <Github size={14} /> Source <ExternalLink size={12} />
          </a>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.3 }}>
          {card.title}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '20px' }}>
          {card.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                background: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProject() {
  const { activeProject, setProject } = useStore()

  return (
    <section id="projects" style={{ position: 'relative', padding: '100px 24px', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          style={{ marginBottom: '48px', textAlign: 'center' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeSlideUp}
        >
          <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {projectsCopy.eyebrow}
          </span>
          <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
            {projectsCopy.headline}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', maxWidth: '600px', margin: '12px auto 0', lineHeight: 1.6 }}>
            {projectsCopy.subheadline}
          </p>
        </motion.div>

        {/* 3D Bento Grid Cards */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {projectsCopy.cards.map((card) => (
            <ProjectCard
              key={card.id}
              card={card}
              isSelected={activeProject === card.id}
              onSelect={() => setProject(card.id as any)}
            />
          ))}
        </motion.div>

        {/* Live Interactive Project Viewport Header & Frame */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeSlideUp}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Live Interactive Demo Viewport
              </h4>
            </div>

            {/* Viewport project selector tabs */}
            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-surface)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-default)' }}>
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProject(p.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    border: 'none',
                    background: activeProject === p.id ? 'var(--accent-primary)' : 'transparent',
                    color: activeProject === p.id ? 'var(--bg-base)' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <ProjectViewport />
        </motion.div>
      </div>
    </section>
  )
}
