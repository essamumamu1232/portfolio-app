import React from 'react'
import { useBoardStore } from '../store'
import styles from './Toolbar.module.css'
import { Tool } from '../types'
import {
  MousePointer2, StickyNote, Square, Circle,
  Diamond, Type, Hand, Undo2, Redo2,
  Download, FileJson, Minus, Plus, Maximize2
} from 'lucide-react'

interface ToolDef {
  id: Tool
  label: string
  icon: React.ReactNode
  shortcut?: string
}

const TOOLS: ToolDef[] = [
  { id: 'select',    label: 'Select',         icon: <MousePointer2 size={16} />, shortcut: 'V' },
  { id: 'pan',       label: 'Pan',            icon: <Hand size={16} />,          shortcut: 'H' },
  { id: 'sticky',    label: 'Sticky Note',    icon: <StickyNote size={16} />,    shortcut: 'S' },
  { id: 'rect',      label: 'Rectangle',      icon: <Square size={16} />,        shortcut: 'R' },
  { id: 'circle',    label: 'Circle',         icon: <Circle size={16} />,        shortcut: 'C' },
  { id: 'diamond',   label: 'Diamond',        icon: <Diamond size={16} />,       shortcut: 'D' },
  { id: 'text',      label: 'Text',           icon: <Type size={16} />,          shortcut: 'T' },
]

const STICKY_COLORS = [
  { color: 'yellow', bg: '#fef08a' },
  { color: 'pink',   bg: '#fce7f3' },
  { color: 'blue',   bg: '#dbeafe' },
  { color: 'green',  bg: '#d1fae5' },
  { color: 'purple', bg: '#ede9fe' },
] as const

export default function Toolbar() {
  const {
    tool, setTool, zoom, setZoom,
    undo, redo, historyIndex, history,
    exportJSON, addSticky
  } = useBoardStore()

  const [showColorPicker, setShowColorPicker] = React.useState(false)

  const handleToolClick = (t: Tool) => {
    if (t === 'sticky' && tool === 'sticky') {
      setShowColorPicker(v => !v)
    } else {
      setShowColorPicker(false)
    }
    setTool(t)
  }

  const zoomPct = Math.round(zoom * 100)

  return (
    <div className={styles.wrapper}>
      {/* Color picker for sticky */}
      {showColorPicker && tool === 'sticky' && (
        <div className={styles.colorPopup}>
          {STICKY_COLORS.map(({ color, bg }) => (
            <button
              key={color}
              className={styles.colorBtn}
              style={{ background: bg }}
              title={color}
              onClick={() => { addSticky(200, 200, color as any); setShowColorPicker(false) }}
              id={`color-${color}`}
            />
          ))}
        </div>
      )}

      <div className={styles.toolbar} id="main-toolbar">
        {/* Tools */}
        <div className={styles.group}>
          {TOOLS.map(t => (
            <button
              key={t.id}
              id={`tool-${t.id}`}
              className={`${styles.toolBtn} ${tool === t.id ? styles.toolActive : ''}`}
              onClick={() => handleToolClick(t.id)}
              title={`${t.label}${t.shortcut ? ` (${t.shortcut})` : ''}`}
            >
              {t.icon}
            </button>
          ))}
        </div>

        <div className={styles.separator} />

        {/* Undo / Redo */}
        <div className={styles.group}>
          <button
            id="undo-btn"
            className={styles.toolBtn}
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (⌘Z)"
          >
            <Undo2 size={15} />
          </button>
          <button
            id="redo-btn"
            className={styles.toolBtn}
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (⌘⇧Z)"
          >
            <Redo2 size={15} />
          </button>
        </div>

        <div className={styles.separator} />

        {/* Zoom controls */}
        <div className={styles.group}>
          <button id="zoom-out" className={styles.toolBtn} onClick={() => setZoom(zoom / 1.2)} title="Zoom Out">
            <Minus size={14} />
          </button>
          <button
            id="zoom-reset"
            className={styles.zoomLabel}
            onClick={() => setZoom(1)}
            title="Reset Zoom"
          >
            {zoomPct}%
          </button>
          <button id="zoom-in" className={styles.toolBtn} onClick={() => setZoom(zoom * 1.2)} title="Zoom In">
            <Plus size={14} />
          </button>
        </div>

        <div className={styles.separator} />

        {/* Export */}
        <div className={styles.group}>
          <button
            id="export-json-btn"
            className={styles.toolBtn}
            onClick={exportJSON}
            title="Export JSON"
          >
            <FileJson size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
