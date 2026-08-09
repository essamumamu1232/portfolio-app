import React, { useState } from 'react'
import { useAppStore } from '../store'
import styles from './CommentsPanel.module.css'
import { MessageSquare, CheckCircle2, Circle, ChevronDown, ChevronRight, Send, X } from 'lucide-react'

export default function CommentsPanel() {
  const { session, commentsCollapsed, resolveComment, addReply } = useAppStore()
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all')

  const filtered = session.comments.filter(c => {
    if (filter === 'open') return !c.resolved
    if (filter === 'resolved') return c.resolved
    return true
  })

  const openCount = session.comments.filter(c => !c.resolved).length
  const resolvedCount = session.comments.filter(c => c.resolved).length

  if (commentsCollapsed) return null

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return
    addReply(commentId, replyText.trim())
    setReplyText('')
    setReplyingTo(null)
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.title}>
          <MessageSquare size={14} />
          <span>Comments</span>
        </div>
        <div className={styles.counts}>
          <span className={styles.countOpen}>{openCount} open</span>
          <span className={styles.countResolved}>{resolvedCount} resolved</span>
        </div>
      </div>

      <div className={styles.filters}>
        {(['all', 'open', 'resolved'] as const).map(f => (
          <button
            key={f}
            id={`filter-${f}`}
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <MessageSquare size={28} className={styles.emptyIcon} />
            <p>No {filter !== 'all' ? filter : ''} comments yet</p>
            <span>Click any line in the editor to add one</span>
          </div>
        )}

        {filtered.map(comment => (
          <div
            key={comment.id}
            className={`${styles.comment} ${comment.resolved ? styles.commentResolved : ''}`}
            id={`comment-${comment.id}`}
          >
            <div className={styles.commentHeader}>
              <div className={styles.authorAvatar} style={{ background: comment.author.color }}>
                {comment.author.avatar}
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{comment.author.name}</span>
                <span className={styles.commentMeta}>Line {comment.line} · {comment.createdAt}</span>
              </div>
              <button
                className={styles.resolveBtn}
                onClick={() => resolveComment(comment.id)}
                data-tooltip={comment.resolved ? 'Reopen' : 'Resolve'}
                id={`resolve-${comment.id}`}
              >
                {comment.resolved
                  ? <CheckCircle2 size={14} className={styles.resolved} />
                  : <Circle size={14} className={styles.unresolved} />
                }
              </button>
            </div>

            <div className={styles.commentBody}>
              <p className={styles.commentText}>{comment.text}</p>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className={styles.replies}>
                {comment.replies.map(reply => (
                  <div key={reply.id} className={styles.reply}>
                    <div className={styles.replyAvatar} style={{ background: reply.author.color }}>
                      {reply.author.avatar}
                    </div>
                    <div className={styles.replyContent}>
                      <div className={styles.replyMeta}>
                        <span className={styles.replyAuthor}>{reply.author.name}</span>
                        <span className={styles.replyTime}>{reply.createdAt}</span>
                      </div>
                      <p className={styles.replyText}>{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            {replyingTo === comment.id ? (
              <div className={styles.replyBox}>
                <textarea
                  id={`reply-input-${comment.id}`}
                  className={styles.replyInput}
                  placeholder="Write a reply…"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  autoFocus
                  rows={2}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleReply(comment.id)
                    if (e.key === 'Escape') { setReplyingTo(null); setReplyText('') }
                  }}
                />
                <div className={styles.replyActions}>
                  <button className="btn-icon" onClick={() => { setReplyingTo(null); setReplyText('') }}>
                    <X size={12} />
                  </button>
                  <button
                    id={`send-reply-${comment.id}`}
                    className="btn btn-primary"
                    onClick={() => handleReply(comment.id)}
                    style={{ fontSize: 12, padding: '4px 10px' }}
                  >
                    <Send size={11} />
                    Reply
                  </button>
                </div>
              </div>
            ) : (
              <button
                id={`reply-btn-${comment.id}`}
                className={styles.replyToggle}
                onClick={() => setReplyingTo(comment.id)}
              >
                Reply
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
