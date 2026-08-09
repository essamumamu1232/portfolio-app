import { useStore } from '../store'
import { projects } from '../data/projects'
import { Zap } from 'lucide-react'

export default function TechSpecs() {
  const { activeProject } = useStore()
  const project = projects.find((p) => p.id === activeProject)!

  return (
    <div className="tech-specs">
      <h3 className="specs-title">
        <Zap size={18} style={{ color: 'var(--accent)' }} />
        Technical Specs
      </h3>
      <div className="spec-group">
        <span className="spec-label">Role</span>
        <span className="spec-value">{project.role}</span>
      </div>
      <div className="spec-group">
        <span className="spec-label">Tech Stack</span>
        <div className="spec-badges">
          {project.stack.map((s) => (
            <span key={s} className="badge">{s}</span>
          ))}
        </div>
      </div>
      <div className="spec-group">
        <span className="spec-label">Key Highlights</span>
        <ul className="spec-highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
