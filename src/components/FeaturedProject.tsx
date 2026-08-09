import { ExternalLink, Github, Mail, MessageSquare } from 'lucide-react'
import LedgerLinePreview from './LedgerLinePreview'

const TAGS = [
  'Multi-tenant accounts',
  'Role-based access',
  'CSV import',
  'Recharts dashboards',
  'Audit log',
  'Docker + CI/CD',
]

export default function FeaturedProject() {
  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <div className="featured-label">Featured Project</div>
        <div className="featured-grid">

          {/* Left: Info */}
          <div className="featured-info">
            <h2 className="featured-title">LedgerLine</h2>
            <p className="featured-desc">
              A multi-tenant finance dashboard built for SaaS teams who outgrew spreadsheets.
              Accountants get a live chart of accounts, transaction ledger, and one-click CSV import.
              Managers see revenue vs expenses in real time. Admins control role access and audit every change.
            </p>

            <div className="featured-tags">
              {TAGS.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>

            <div className="featured-status">
              <span className="status-dot" />
              <span>Live deployment in progress — <a href="#contact" className="featured-contact-link">contact me for a private walkthrough</a></span>
            </div>

            <div className="featured-ctas">
              <a
                href="https://github.com/essamumamu1232/portfolio-app/tree/main/ledger-line"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <Github size={16} /> View Source
              </a>
              <a href="#contact" className="btn btn-ghost">
                <Mail size={16} /> Request Private Demo
              </a>
            </div>

            <div className="other-projects-row">
              <span className="other-label">Also built:</span>
              <a href="#other-projects" className="other-link">
                CodeStream <ExternalLink size={12} />
              </a>
              <a href="#other-projects" className="other-link">
                SyncBoard <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="featured-preview-wrap">
            <div className="featured-browser-chrome">
              <span className="tl-red" />
              <span className="tl-yellow" />
              <span className="tl-green" />
              <span className="featured-chrome-url">ledgerline.app · Private Demo</span>
            </div>
            <div className="featured-preview-body">
              <LedgerLinePreview />
            </div>
          </div>

        </div>

        {/* Secondary projects — minimal, non-mock */}
        <div id="other-projects" className="other-projects-section">
          <h3 className="other-projects-title">Other Projects</h3>
          <div className="other-projects-grid">
            <div className="other-card">
              <div className="other-card-top">
                <h4>CodeStream</h4>
                <span className="badge">In Progress</span>
              </div>
              <p>Real-time collaborative code review platform. Monaco editor, side-by-side diffs, inline comment threads, and live cursor positions.</p>
              <a
                href="https://github.com/essamumamu1232/portfolio-app/tree/main/code-stream"
                target="_blank"
                rel="noreferrer"
                className="other-card-link"
              >
                View Source <ExternalLink size={13} />
              </a>
            </div>
            <div className="other-card">
              <div className="other-card-top">
                <h4>SyncBoard</h4>
                <span className="badge">In Progress</span>
              </div>
              <p>Collaborative whiteboard with React Konva canvas, draggable sticky notes, shapes, connectors, and live multi-user cursor tracking via Socket.io.</p>
              <a
                href="https://github.com/essamumamu1232/portfolio-app/tree/main/sync-board"
                target="_blank"
                rel="noreferrer"
                className="other-card-link"
              >
                View Source <ExternalLink size={13} />
              </a>
            </div>
            <div className="other-card other-card-cta">
              <MessageSquare size={24} style={{ color: 'var(--accent)', marginBottom: 12 }} />
              <h4>Have a project in mind?</h4>
              <p>Describe what you need and I will tell you whether I can build it and what it will cost — usually within a few hours.</p>
              <a href="#contact" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
