import React, { useState } from 'react'
import { useAppStore } from '../store'
import styles from './Sidebar.module.css'
import {
  FileCode, ChevronDown, ChevronRight, Plus, History,
  Star, Folder, Clock, Users2
} from 'lucide-react'

export default function Sidebar() {
  const { session, sidebarCollapsed } = useAppStore()
  const [openSections, setOpenSections] = useState({ files: true, sessions: true, team: false })

  const toggle = (key: keyof typeof openSections) =>
    setOpenSections(s => ({ ...s, [key]: !s[key] }))

  if (sidebarCollapsed) return null

  const recentSessions = [
    { id: 's2', name: 'Auth middleware refactor', time: '2h ago', comments: 4 },
    { id: 's3', name: 'Database query optimization', time: '1d ago', comments: 12 },
    { id: 's4', name: 'API rate limiting logic', time: '2d ago', comments: 7 },
    { id: 's5', name: 'WebSocket reconnect strategy', time: '3d ago', comments: 2 },
  ]

  return (
    <aside className={styles.sidebar}>
      {/* Active Review */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('files')}>
          <span className={styles.sectionTitle}>
            {openSections.files ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            Current Review
          </span>
        </div>
        {openSections.files && (
          <div className={styles.sectionBody}>
            <div className={`${styles.fileItem} ${styles.fileItemActive}`} id="active-file">
              <FileCode size={13} className={styles.fileIcon} />
              <span className={styles.fileName}>{session.snippet.title}</span>
              <span className={styles.fileLang}>{session.snippet.language}</span>
            </div>
            <div className={styles.fileMeta}>
              <Clock size={11} />
              Updated {session.snippet.updatedAt}
            </div>
            <div className={styles.fileMeta}>
              <Users2 size={11} />
              {session.participants.length} reviewers
            </div>
            <button id="new-session-btn" className={`btn btn-ghost ${styles.newBtn}`}>
              <Plus size={13} />
              New Review
            </button>
          </div>
        )}
      </div>

      <div className="divider" />

      {/* Recent Sessions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('sessions')}>
          <span className={styles.sectionTitle}>
            {openSections.sessions ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            Recent Sessions
          </span>
        </div>
        {openSections.sessions && (
          <div className={styles.sectionBody}>
            {recentSessions.map(s => (
              <div key={s.id} className={styles.sessionItem}>
                <History size={12} className={styles.sessionIcon} />
                <div className={styles.sessionMeta}>
                  <span className={styles.sessionName}>{s.name}</span>
                  <span className={styles.sessionTime}>{s.time} · {s.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="divider" />

      {/* Team */}
      <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={() => toggle('team')}>
          <span className={styles.sectionTitle}>
            {openSections.team ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            Team
          </span>
        </div>
        {openSections.team && (
          <div className={styles.sectionBody}>
            {session.participants.map(user => (
              <div key={user.id} className={styles.teamMember}>
                <div className={styles.teamAvatar} style={{ background: user.color }}>
                  {user.avatar}
                </div>
                <div className={styles.teamInfo}>
                  <span className={styles.teamName}>{user.name}</span>
                  <span className={styles.teamEmail}>{user.email}</span>
                </div>
                <div className={styles.onlineDot} style={{ background: user.color }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Star size={12} />
        <span>CodeStream Pro</span>
      </div>
    </aside>
  )
}
