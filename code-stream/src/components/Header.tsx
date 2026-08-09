import React, { useState } from 'react'
import { useAppStore } from '../store'
import styles from './Header.module.css'
import {
  GitBranch, Users, Share2, Download, ChevronLeft,
  Code2, Split, Wifi, WifiOff, Menu, Bell
} from 'lucide-react'

export default function Header() {
  const { session, activeView, setActiveView, toggleSidebar, toggleComments } = useAppStore()
  const [isOnline] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(`https://codestream.dev/review/${session.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = () => {
    const content = `# Code Review: ${session.name}\n\nDate: ${new Date().toLocaleDateString()}\nParticipants: ${session.participants.map(p => p.name).join(', ')}\n\n## Code\n\`\`\`${session.snippet.language}\n${session.snippet.code}\n\`\`\`\n\n## Comments\n\n${session.comments.map(c => `### Line ${c.line} — ${c.author.name} (${c.createdAt})\n${c.text}\n${c.replies.map(r => `  > **${r.author.name}** (${r.createdAt}): ${r.text}`).join('\n')}`).join('\n\n')}`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `review-${session.id}.md`
    a.click()
  }

  const openCount = session.comments.filter(c => !c.resolved).length

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className="btn-icon" onClick={toggleSidebar} id="toggle-sidebar" data-tooltip="Toggle Sidebar">
          <Menu size={16} />
        </button>
        <div className={styles.logo}>
          <Code2 size={18} className={styles.logoIcon} />
          <span className={styles.logoText}>CodeStream</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.sessionInfo}>
          <GitBranch size={13} className={styles.branchIcon} />
          <span className={styles.sessionName}>{session.name}</span>
          <span className={`badge ${session.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
            {session.status}
          </span>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.viewToggle}>
          <button
            id="view-editor"
            className={`${styles.viewBtn} ${activeView === 'editor' ? styles.viewBtnActive : ''}`}
            onClick={() => setActiveView('editor')}
          >
            <Code2 size={13} />
            Editor
          </button>
          <button
            id="view-diff"
            className={`${styles.viewBtn} ${activeView === 'diff' ? styles.viewBtnActive : ''}`}
            onClick={() => setActiveView('diff')}
          >
            <Split size={13} />
            Diff View
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.participants}>
          {session.participants.slice(0, 4).map((user, i) => (
            <div
              key={user.id}
              className={styles.avatar}
              style={{ background: user.color, zIndex: 10 - i }}
              data-tooltip={user.name}
            >
              {user.avatar}
            </div>
          ))}
          {session.participants.length > 4 && (
            <div className={`${styles.avatar} ${styles.avatarMore}`}>
              +{session.participants.length - 4}
            </div>
          )}
        </div>

        <div className={styles.onlineStatus}>
          {isOnline ? (
            <><Wifi size={13} className={styles.online} /><span className={styles.online}>Live</span></>
          ) : (
            <><WifiOff size={13} className={styles.offline} /><span className={styles.offline}>Offline</span></>
          )}
        </div>

        <button id="comments-toggle" className="btn btn-ghost" onClick={toggleComments} style={{ position: 'relative' }}>
          <Bell size={13} />
          Comments
          {openCount > 0 && <span className={styles.badge}>{openCount}</span>}
        </button>

        <button id="share-btn" className="btn btn-ghost" onClick={handleShare}>
          <Share2 size={13} />
          {copied ? 'Copied!' : 'Share'}
        </button>

        <button id="export-btn" className="btn btn-primary" onClick={handleExport}>
          <Download size={13} />
          Export
        </button>
      </div>
    </header>
  )
}
