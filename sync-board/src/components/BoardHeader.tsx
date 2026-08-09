import React, { useState } from 'react'
import { useBoardStore, BOARD_USERS } from '../store'
import styles from './BoardHeader.module.css'
import {
  Share2, Download, Pencil, Check, Users, Wifi,
  LayoutGrid, ChevronDown
} from 'lucide-react'

export default function BoardHeader() {
  const { boardName, users, zoom, setZoom, elements, exportJSON } = useBoardStore()
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState(boardName)
  const [copied, setCopied] = useState(false)

  const onlineUsers = users.filter(u => u.online)
  const taskCount = elements.filter(el => el.type === 'sticky' && (el as any).isTask).length
  const doneCount = elements.filter(el => el.type === 'sticky' && (el as any).taskStatus === 'done').length

  const handleShare = () => {
    navigator.clipboard.writeText(`https://syncboard.dev/board/sprint-12`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className={styles.header}>
      {/* Left: Logo + Board Name */}
      <div className={styles.left}>
        <div className={styles.logo}>
          <LayoutGrid size={18} className={styles.logoIcon} />
          <span className={styles.logoText}>SyncBoard</span>
        </div>
        <div className={styles.divider} />
        {editingName ? (
          <div className={styles.nameEdit}>
            <input
              id="board-name-input"
              className={styles.nameInput}
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              onKeyDown={e => { if (e.key === 'Enter') setEditingName(false) }}
            />
            <button className={styles.nameConfirm} onClick={() => setEditingName(false)}>
              <Check size={13} />
            </button>
          </div>
        ) : (
          <button className={styles.namePill} onClick={() => setEditingName(true)} id="board-name">
            <span className={styles.boardName}>{name}</span>
            <Pencil size={11} className={styles.pencil} />
          </button>
        )}
        {/* Progress pill */}
        {taskCount > 0 && (
          <div className={styles.progressPill}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(doneCount / taskCount) * 100}%` }}
              />
            </div>
            <span className={styles.progressLabel}>{doneCount}/{taskCount} done</span>
          </div>
        )}
      </div>

      {/* Right: Online users + controls */}
      <div className={styles.right}>
        {/* Online dot */}
        <div className={styles.liveIndicator}>
          <Wifi size={12} className={styles.liveIcon} />
          <span>Live</span>
          <span className={styles.liveCount}>{onlineUsers.length}</span>
        </div>

        {/* User avatars */}
        <div className={styles.avatars}>
          {users.map((user, i) => (
            <div
              key={user.id}
              className={`${styles.avatar} ${!user.online ? styles.avatarOffline : ''}`}
              style={{
                background: user.color,
                zIndex: users.length - i,
              }}
              title={`${user.name}${!user.online ? ' (offline)' : ''}`}
            >
              {user.avatar}
              {user.online && <span className={styles.onlineDot} />}
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <button id="share-board-btn" className="btn btn-ghost" onClick={handleShare} style={{ fontSize: 12 }}>
          <Share2 size={13} />
          {copied ? 'Link copied!' : 'Share'}
        </button>

        <button id="export-board-btn" className="btn btn-primary" onClick={exportJSON} style={{ fontSize: 12 }}>
          <Download size={13} />
          Export
        </button>
      </div>
    </header>
  )
}
