import React, { useState, useRef } from 'react'
import { StickyNote } from '../types'
import { useBoardStore } from '../store'
import styles from './StickyNoteEl.module.css'
import { CheckSquare, Square, MoreVertical, Trash2, Clock, User } from 'lucide-react'

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  yellow: { bg: '#fef9c3', border: '#facc15', text: '#713f12' },
  pink:   { bg: '#fce7f3', border: '#f9a8d4', text: '#831843' },
  blue:   { bg: '#dbeafe', border: '#93c5fd', text: '#1e3a5f' },
  green:  { bg: '#d1fae5', border: '#6ee7b7', text: '#064e3b' },
  purple: { bg: '#ede9fe', border: '#c4b5fd', text: '#4c1d95' },
}

const STATUS_COLOR: Record<string, string> = {
  todo:  '#6b7280',
  doing: '#3b82f6',
  done:  '#10b981',
}

const STATUS_LABEL: Record<string, string> = {
  todo: '📋 To Do',
  doing: '⚡ In Progress',
  done: '✅ Done',
}

interface Props {
  element: StickyNote
  isSelected: boolean
  onSelect: () => void
  onDragStart: (clientX: number, clientY: number) => void
}

export default function StickyNoteEl({ element, isSelected, onSelect, onDragStart }: Props) {
  const { updateElement, deleteElement, toggleTask, setTaskStatus } = useBoardStore()
  const [editing, setEditing] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const colors = COLOR_MAP[element.color] ?? COLOR_MAP.yellow

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => textRef.current?.focus(), 50)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (editing) return
    e.stopPropagation()
    onSelect()
    if (e.button === 0) {
      onDragStart(e.clientX, e.clientY)
    }
  }

  return (
    <div
      id={`sticky-${element.id}`}
      className={`${styles.sticky} ${isSelected ? styles.selected : ''} animate-pop`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        minHeight: element.height,
        background: colors.bg,
        borderColor: isSelected ? '#6366f1' : colors.border,
        zIndex: element.zIndex,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {/* Header tape effect */}
      <div className={styles.tape} style={{ background: colors.border }} />

      {/* Menu */}
      <button
        className={styles.menuBtn}
        onClick={e => { e.stopPropagation(); setShowMenu(v => !v) }}
        id={`sticky-menu-${element.id}`}
      >
        <MoreVertical size={12} />
      </button>

      {showMenu && (
        <div className={styles.menu} onClick={e => e.stopPropagation()}>
          <button className={styles.menuItem} onClick={() => { toggleTask(element.id); setShowMenu(false) }}>
            {element.isTask ? <Square size={11} /> : <CheckSquare size={11} />}
            {element.isTask ? 'Remove task' : 'Make task'}
          </button>
          {/* Color swatches */}
          <div className={styles.colorPicker}>
            {(['yellow', 'pink', 'blue', 'green', 'purple'] as const).map(c => (
              <button
                key={c}
                className={styles.colorSwatch}
                style={{ background: COLOR_MAP[c].bg, borderColor: COLOR_MAP[c].border }}
                onClick={() => { updateElement(element.id, { color: c } as any); setShowMenu(false) }}
              />
            ))}
          </div>
          <button className={`${styles.menuItem} ${styles.menuDanger}`} onClick={() => { deleteElement(element.id); setShowMenu(false) }}>
            <Trash2 size={11} />Delete
          </button>
        </div>
      )}

      {/* Task status badge */}
      {element.isTask && element.taskStatus && (
        <div className={styles.taskBar}>
          <select
            className={styles.statusSelect}
            style={{ color: STATUS_COLOR[element.taskStatus] }}
            value={element.taskStatus}
            onChange={e => setTaskStatus(element.id, e.target.value as any)}
            onClick={e => e.stopPropagation()}
            id={`status-${element.id}`}
          >
            <option value="todo">📋 To Do</option>
            <option value="doing">⚡ In Progress</option>
            <option value="done">✅ Done</option>
          </select>
        </div>
      )}

      {/* Text */}
      {editing ? (
        <textarea
          ref={textRef}
          className={styles.editor}
          style={{ color: colors.text, fontSize: element.fontSize }}
          value={element.text}
          onChange={e => updateElement(element.id, { text: e.target.value } as any)}
          onBlur={() => setEditing(false)}
          onMouseDown={e => e.stopPropagation()}
          rows={5}
        />
      ) : (
        <div className={styles.text} style={{ color: colors.text, fontSize: element.fontSize }}>
          {element.text}
        </div>
      )}

      {/* Assignee + Due date */}
      {element.isTask && (
        <div className={styles.taskMeta}>
          {element.assignee && (
            <span className={styles.assignee}><User size={9} />{element.assignee}</span>
          )}
          {element.dueDate && (
            <span className={styles.dueDate}><Clock size={9} />{element.dueDate}</span>
          )}
        </div>
      )}

      {/* Resize handle */}
      <div className={styles.resizeHandle} onMouseDown={e => e.stopPropagation()} />
    </div>
  )
}
