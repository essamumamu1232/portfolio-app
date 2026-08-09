import { Mail, Phone, Github, MessageSquare, ArrowRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header">
          <div className="contact-badge">
            <MessageSquare size={15} />
            <span>Direct Contact & Collaboration</span>
          </div>
          <h2>Start a Project Together</h2>
          <p className="contact-sub">
            Whether you need a custom web app, internal dashboard, finance software, or code review — reach out anytime.
          </p>
        </div>

        <div className="contact-cards-grid">

          {/* 1. Email — primary */}
          <div className="contact-card highlight">
            <div className="contact-card-tag">Best for Proposals</div>
            <div className="contact-card-icon accent">
              <Mail size={24} />
            </div>
            <h3>Email Me</h3>
            <p className="contact-card-value">essammubbashirbusiness@gmail.com</p>
            <p className="contact-card-desc">Best for detailed project proposals, scopes, and contract inquiries. I reply within 24 hours.</p>
            <div className="contact-card-actions">
              <a href="mailto:essammubbashirbusiness@gmail.com" className="btn btn-primary btn-sm">
                Send Email <ArrowRight size={14} />
              </a>
              <button onClick={() => handleCopy('essammubbashirbusiness@gmail.com', 'email')} className="btn btn-ghost btn-sm" title="Copy Email">
                {copied === 'email' ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
                {copied === 'email' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* 2. GitHub — secondary */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <Github size={24} />
            </div>
            <h3>GitHub</h3>
            <p className="contact-card-value">github.com/essamumamu1232</p>
            <p className="contact-card-desc">Browse repositories, review commits, or send a GitHub message to discuss collaboration.</p>
            <div className="contact-card-actions">
              <a href="https://github.com/essamumamu1232" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                Open GitHub <ArrowRight size={14} />
              </a>
              <button onClick={() => handleCopy('https://github.com/essamumamu1232', 'github')} className="btn btn-ghost btn-sm">
                {copied === 'github' ? <Check size={14} style={{ color: 'var(--accent)' }} /> : <Copy size={14} />}
                {copied === 'github' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* 3. WhatsApp — third */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <Phone size={24} />
            </div>
            <h3>WhatsApp / Phone</h3>
            <p className="contact-card-value">+92 336 2243778</p>
            <p className="contact-card-desc">Quick questions and short calls. Best for Pakistan-based clients and fast follow-ups.</p>
            <div className="contact-card-actions">
              <a href="https://wa.me/923362243778" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                WhatsApp <ArrowRight size={14} />
              </a>
              <a href="tel:+923362243778" className="btn btn-ghost btn-sm">
                Call
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
