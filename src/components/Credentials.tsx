import { useState } from 'react'
import { Award, ShieldCheck, ExternalLink, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

interface CertItem {
  id: string
  title: string
  ects: string
  grade?: string
  desc: string
  img: string
}

const certificates: CertItem[] = [
  {
    id: 'core',
    title: 'Full Stack Web Development (Core, Parts 0–7)',
    ects: '7 ECTS',
    grade: 'Grade 5 (Highest)',
    desc: 'MERN stack, REST APIs, React, Node.js, Express, MongoDB, Redux/Zustand, integration testing & auth.',
    img: '/fso-certificate-core.png',
  },
  {
    id: 'part-8',
    title: 'GraphQL (Part 8)',
    ects: '1 ECTS',
    desc: 'Apollo Server, Apollo Client, GraphQL schemas, queries, mutations, and real-time WebSocket subscriptions.',
    img: '/certificate-6.png',
  },
  {
    id: 'part-9',
    title: 'TypeScript (Part 9)',
    ects: '1 ECTS',
    desc: 'TypeScript CLI toolchain, strict type safety, end-to-end typed Express backends and React frontends.',
    img: '/certificate-5.png',
  },
  {
    id: 'part-10',
    title: 'React Native (Part 10)',
    ects: '2 ECTS',
    desc: 'Mobile application development using Expo, React Native components, hooks, styling, and native APIs.',
    img: '/certificate-4.png',
  },
  {
    id: 'part-11',
    title: 'CI/CD — Continuous Integration (Part 11)',
    ects: '1 ECTS',
    desc: 'Automated workflow pipelines using GitHub Actions, linting, automated testing, and zero-downtime deployment.',
    img: '/certificate-3.png',
  },
  {
    id: 'part-12',
    title: 'Containers & Docker (Part 12)',
    ects: '1 ECTS',
    desc: 'Docker containers, multi-stage Dockerfiles, Docker Compose, environment management, and multi-container orchestration.',
    img: '/certificate-2.png',
  },
  {
    id: 'part-13',
    title: 'Relational Databases & SQL (Part 13)',
    ects: '1 ECTS',
    desc: 'PostgreSQL, Sequelize ORM, database migrations, complex SQL queries, transactions, and relational data modeling.',
    img: '/certificate-1.png',
  },
  {
    id: 'part-14',
    title: 'Next.js & Full Stack React (Part 14)',
    ects: '1 ECTS',
    desc: 'Server-Side Rendering (SSR), Static Site Generation (SSG), App Router, server actions, and modern React architecture.',
    img: '/certificate-0.png',
  },
]


export default function Credentials() {
  const [expanded, setExpanded] = useState(false)
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null)

  return (
    <section id="credentials" className="credentials-section credentials-compact">
      <div className="container">
        {/* Collapsed one-liner row */}
        <div className="cred-compact-row">
          <div className="cred-compact-left">
            <Award size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <div>
              <span className="cred-compact-title">University of Helsinki — Full Stack Open</span>
              <span className="cred-compact-meta">14 ECTS · Grade 5 · Project-based curriculum</span>
            </div>
          </div>
          <button
            className="cred-expand-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse certificates' : 'Expand certificates'}
          >
            {expanded ? (
              <><ChevronUp size={16} /> Hide Certificates</>
            ) : (
              <><ChevronDown size={16} /> View Certificates</>
            )}
          </button>
        </div>

        {/* Expandable detail panel */}
        {expanded && (
          <div className="cred-expanded-panel">
            {/* Core cert preview */}
            <div className="cred-expanded-top">
              <div className="cred-expanded-text">
                <p className="cred-expanded-desc">
                  Official University of Helsinki Open University course. 100% exercise-driven — no passive
                  video content. Every certificate required shipping working code to GitHub, passing automated
                  test suites, and submitting through an MOSS-checked academic review system.
                </p>
                <div className="fso-highlights-pill-list" style={{ marginTop: 12 }}>
                  <span className="fso-pill">University-Backed</span>
                  <span className="fso-pill">ECTS-Recognized</span>
                  <span className="fso-pill">MOSS Plagiarism-Checked</span>
                  <span className="fso-pill">Automated CI Tests</span>
                </div>
              </div>
              <div
                className="fso-cert-preview-wrapper"
                style={{ maxWidth: 340 }}
                onClick={() => setSelectedCert(certificates[0])}
              >
                <div className="cert-image-frame">
                  <img src="/fso-certificate-core.png" alt="Core Certificate" className="cert-preview-img" />
                  <div className="cert-overlay">
                    <Sparkles size={20} />
                    <span>Click to Inspect</span>
                  </div>
                </div>
                <span className="cert-caption">Core Certificate (Parts 0–7) — 7 ECTS · Grade 5</span>
              </div>
            </div>

            {/* Module grid */}
            <div className="modules-grid" style={{ marginTop: 28 }}>
              {certificates.map((cert) => (
                <div key={cert.id} className="module-card" onClick={() => setSelectedCert(cert)}>
                  <div className="module-card-top">
                    <span className="module-ects">{cert.ects}</span>
                    {cert.grade && <span className="module-grade">{cert.grade}</span>}
                  </div>
                  <h4 className="module-title">{cert.title}</h4>
                  <p className="module-desc">{cert.desc}</p>
                  <div className="module-footer">
                    <span className="module-view-btn">View Certificate <ExternalLink size={13} /></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="verification-note" style={{ marginTop: 24 }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent)' }} />
              <span><em>Certificates and transcript available upon request. Verified by University of Helsinki submission system.</em></span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedCert(null)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="cert-modal-header">
              <h3>{selectedCert.title}</h3>
              <p>{selectedCert.ects}{selectedCert.grade ? ` · ${selectedCert.grade}` : ''}</p>
            </div>
            <div className="cert-modal-body">
              <img src={selectedCert.img} alt={selectedCert.title} className="cert-modal-img" />
            </div>
            <div className="cert-modal-footer">
              <p>{selectedCert.desc}</p>
              <span className="cert-verified-tag">✓ Verified University of Helsinki Credential</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
