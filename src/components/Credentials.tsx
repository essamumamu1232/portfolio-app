import { useState } from 'react'
import { Award, CheckCircle2, ShieldCheck, ExternalLink, X, BookOpen, Cpu, Sparkles } from 'lucide-react'

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
    img: '/certificate-0.png',
  },
  {
    id: 'part-9',
    title: 'TypeScript (Part 9)',
    ects: '1 ECTS',
    desc: 'TypeScript CLI toolchain, strict type safety, end-to-end typed Express backends and React frontends.',
    img: '/certificate-1.png',
  },
  {
    id: 'part-10',
    title: 'React Native (Part 10)',
    ects: '2 ECTS',
    desc: 'Mobile application development using Expo, React Native components, hooks, styling, and native APIs.',
    img: '/certificate-2.png',
  },
  {
    id: 'part-11',
    title: 'CI/CD Pipelines (Part 11)',
    ects: '1 ECTS',
    desc: 'Automated workflow pipelines using GitHub Actions, linting, automated testing, and zero-downtime deployment.',
    img: '/certificate-3.png',
  },
  {
    id: 'part-12',
    title: 'Containers & Docker (Part 12)',
    ects: '1 ECTS',
    desc: 'Docker containers, multi-stage Dockerfiles, Docker Compose, environment management, and multi-container orchestration.',
    img: '/certificate-4.png',
  },
  {
    id: 'part-13',
    title: 'Relational Databases & SQL (Part 13)',
    ects: '1 ECTS',
    desc: 'PostgreSQL, Sequelize ORM, database migrations, complex SQL queries, transactions, and relational data modeling.',
    img: '/certificate-5.png',
  },
  {
    id: 'part-14',
    title: 'Next.js & Full Stack React (Part 14)',
    ects: '1 ECTS',
    desc: 'Server-Side Rendering (SSR), Static Site Generation (SSG), App Router, server actions, and modern React architecture.',
    img: '/certificate-6.png',
  },
]

export default function Credentials() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null)

  return (
    <section id="credentials" className="credentials-section">
      <div className="container">
        {/* Section Header */}
        <div className="credentials-header">
          <div className="credentials-badge">
            <Award size={16} />
            <span>Academic Credentials & Certification</span>
          </div>
          <h2>University of Helsinki — Full Stack Open</h2>
          <p className="credentials-sub">
            Official University Credit (14 ECTS Total) · Open University, Finland · 2025–2026
          </p>
        </div>

        {/* Hero Credential Block */}
        <div className="fso-hero-card">
          <div className="fso-card-main">
            <div className="fso-card-tag">Official University Qualification</div>
            <h3>Full Stack Web Development Curriculum</h3>
            <p className="fso-card-summary">
              Rigorous, 100% exercise-driven computer science curriculum covering modern web engineering, 
              distributed architecture, mobile development, DevOps pipelines, and relational database systems.
            </p>

            <div className="fso-metrics">
              <div className="fso-metric">
                <span className="fso-metric-value">14 ECTS</span>
                <span className="fso-metric-label">Total European Credits</span>
              </div>
              <div className="fso-metric">
                <span className="fso-metric-value accent">Grade 5</span>
                <span className="fso-metric-label">Core Course Distinction (Highest)</span>
              </div>
              <div className="fso-metric">
                <span className="fso-metric-value">150+</span>
                <span className="fso-metric-label">Reviewed Code Submissions</span>
              </div>
            </div>

            <div className="fso-highlights-pill-list">
              <span className="fso-pill"><CheckCircle2 size={14} /> University-Backed</span>
              <span className="fso-pill"><CheckCircle2 size={14} /> ECTS-Recognized</span>
              <span className="fso-pill"><CheckCircle2 size={14} /> MOSS Plagiarism-Checked</span>
              <span className="fso-pill"><CheckCircle2 size={14} /> Automated Test Suites</span>
            </div>
          </div>

          <div className="fso-cert-preview-wrapper" onClick={() => setSelectedCert(certificates[0])}>
            <div className="cert-image-frame">
              <img src="/fso-certificate-core.png" alt="University of Helsinki Core Certificate" className="cert-preview-img" />
              <div className="cert-overlay">
                <Sparkles size={20} />
                <span>Click to Inspect Official Certificate</span>
              </div>
            </div>
            <span className="cert-caption">Core Certificate (Parts 0–7) — 7 ECTS · Grade 5</span>
          </div>
        </div>

        {/* Credibility Markers Grid */}
        <div className="credibility-grid">
          <div className="credibility-card">
            <div className="credibility-icon"><BookOpen size={20} /></div>
            <h4>University-Backed</h4>
            <p>Official University of Helsinki Open University course with academic integrity standards and ECTS degree credits.</p>
          </div>
          <div className="credibility-card">
            <div className="credibility-icon"><Award size={20} /></div>
            <h4>Grade 5 (Highest Distinction)</h4>
            <p>Finnish grading scale (1–5). Grade 5 requires completing 150+ rigorous coding exercises with 100% test pass rate.</p>
          </div>
          <div className="credibility-card">
            <div className="credibility-icon"><Cpu size={20} /></div>
            <h4>Project-Driven & Tested</h4>
            <p>No passive video watching. 100% hands-on development shipping production code to GitHub validated by automated CI test suites.</p>
          </div>
          <div className="credibility-card">
            <div className="credibility-icon"><ShieldCheck size={20} /></div>
            <h4>Continuously Updated</h4>
            <p>Updated twice yearly to mirror cutting-edge industry practices: Vite, React 19, TypeScript, Express v5, Docker, PostgreSQL.</p>
          </div>
        </div>

        {/* Module Breakdown Grid */}
        <div className="modules-header">
          <h3>Completed Course Modules & Certificates</h3>
          <p>Click any module certificate to view high-resolution university verification document.</p>
        </div>

        <div className="modules-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="module-card" onClick={() => setSelectedCert(cert)}>
              <div className="module-card-top">
                <span className="module-ects">{cert.ects}</span>
                {cert.grade && <span className="module-grade">{cert.grade}</span>}
              </div>
              <h4 className="module-title">{cert.title}</h4>
              <p className="module-desc">{cert.desc}</p>
              <div className="module-footer">
                <span className="module-view-btn">
                  View Certificate <ExternalLink size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="verification-note">
          <ShieldCheck size={18} style={{ color: 'var(--accent)' }} />
          <span>
            <em>Certificates and transcript available upon request. Verified by University of Helsinki submission system.</em>
          </span>
        </div>
      </div>

      {/* Lightbox Modal for Certificate View */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedCert(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="cert-modal-header">
              <h3>{selectedCert.title}</h3>
              <p>{selectedCert.ects} {selectedCert.grade ? `· ${selectedCert.grade}` : ''}</p>
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
