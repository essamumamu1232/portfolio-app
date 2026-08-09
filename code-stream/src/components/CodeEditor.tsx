import React, { useRef, useState, useCallback, useEffect } from 'react'
import Editor, { Monaco } from '@monaco-editor/react'
import { useAppStore } from '../store'
import styles from './CodeEditor.module.css'
import { MessageSquare, Plus } from 'lucide-react'

export default function CodeEditor() {
  const { session, currentUser, updateCode, updateCursor, setSelectedLine, setCommentDraft, commentDraft, addComment, selectedLine } = useAppStore()
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const decorationsRef = useRef<string[]>([])
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)
  const [draftText, setDraftText] = useState('')

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Theme override for our dark palette
    monaco.editor.defineTheme('codestream-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'a78bfa' },
        { token: 'string', foreground: '34d399' },
        { token: 'number', foreground: 'fb923c' },
        { token: 'type', foreground: '38bdf8' },
        { token: 'function', foreground: '818cf8' },
      ],
      colors: {
        'editor.background': '#0f172a',
        'editor.foreground': '#e2e8f0',
        'editorLineNumber.foreground': '#334155',
        'editorLineNumber.activeForeground': '#94a3b8',
        'editor.selectionBackground': '#6366f133',
        'editor.lineHighlightBackground': '#1e293b',
        'editorCursor.foreground': '#818cf8',
        'editor.selectionHighlightBackground': '#6366f122',
        'editorGutter.background': '#0f172a',
        'editorWidget.background': '#1e293b',
        'editorWidget.border': '#334155',
        'input.background': '#0f172a',
        'input.border': '#334155',
        'scrollbarSlider.background': '#33415588',
        'scrollbarSlider.hoverBackground': '#475569aa',
      }
    })
    monaco.editor.setTheme('codestream-dark')

    // Track cursor movement
    editor.onDidChangeCursorPosition((e: any) => {
      updateCursor(e.position.lineNumber, e.position.column)
    })

    // Hover: show comment button on line
    editor.onMouseMove((e: any) => {
      const line = e.target?.position?.lineNumber
      setHoveredLine(line ?? null)
    })
    editor.onMouseLeave(() => setHoveredLine(null))
  }

  // Render cursor decorations for other users
  useEffect(() => {
    const editor = editorRef.current
    const monaco = monacoRef.current
    if (!editor || !monaco) return

    const otherCursors = session.cursors.filter(c => c.userId !== currentUser.id)
    const commentLines = session.comments.filter(c => !c.resolved).map(c => c.line)

    const decorations = [
      ...otherCursors.map(cursor => ({
        range: new monaco.Range(cursor.line, cursor.column, cursor.line, cursor.column + 1),
        options: {
          className: `cursor-decoration-${cursor.userId}`,
          beforeContentClassName: 'cursor-before',
          stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          zIndex: 100,
        }
      })),
      ...commentLines.map(line => ({
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          className: styles.commentLine,
          glyphMarginClassName: styles.commentGlyph,
          overviewRuler: { color: '#6366f1', position: 4 },
        }
      }))
    ]

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations)
  }, [session.cursors, session.comments, currentUser.id])

  const handleCommentSubmit = () => {
    if (commentDraft && draftText.trim()) {
      addComment(commentDraft.line, draftText.trim())
      setDraftText('')
    }
  }

  return (
    <div className={styles.editorWrapper}>
      {/* Cursor overlays for live users */}
      <div className={styles.cursorLabels} aria-hidden="true">
        {session.cursors
          .filter(c => c.userId !== currentUser.id)
          .map(cursor => (
            <div
              key={cursor.userId}
              className={styles.cursorLabel}
              style={{
                top: `${(cursor.line - 1) * 19 + 14}px`,
                borderColor: cursor.user.color,
                background: cursor.user.color,
              }}
            >
              {cursor.user.name}
            </div>
          ))}
      </div>

      <Editor
        height="100%"
        language={session.snippet.language}
        value={session.snippet.code}
        onChange={(val) => updateCode(val ?? '')}
        onMount={handleEditorMount}
        options={{
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          lineHeight: 22,
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          renderWhitespace: 'selection',
          glyphMargin: true,
          folding: true,
          wordWrap: 'off',
          smoothScrolling: true,
          cursorBlinking: 'phase',
          cursorSmoothCaretAnimation: 'on',
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: 'line',
          contextmenu: true,
          selectOnLineNumbers: true,
        }}
      />

      {/* Inline comment draft box */}
      {commentDraft && (
        <div
          className={styles.commentDraft}
          style={{ top: `${(commentDraft.line - 1) * 22 + 60}px` }}
        >
          <div className={styles.commentDraftHeader}>
            <MessageSquare size={12} />
            <span>Comment on Line {commentDraft.line}</span>
            <button className="btn-icon" onClick={() => setCommentDraft(null)} style={{ marginLeft: 'auto', fontSize: 11 }}>✕</button>
          </div>
          <textarea
            id="comment-textarea"
            className={styles.commentTextarea}
            placeholder="Write a comment… (Markdown supported)"
            value={draftText}
            onChange={e => setDraftText(e.target.value)}
            autoFocus
            rows={3}
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCommentSubmit()
              if (e.key === 'Escape') setCommentDraft(null)
            }}
          />
          <div className={styles.commentDraftFooter}>
            <span className={styles.commentHint}>⌘↵ to submit · Esc to cancel</span>
            <button id="submit-comment" className="btn btn-primary" onClick={handleCommentSubmit} style={{ fontSize: 12, padding: '5px 12px' }}>
              Comment
            </button>
          </div>
        </div>
      )}

      {/* Add comment button on hover */}
      {hoveredLine && !commentDraft && (
        <button
          className={styles.addCommentBtn}
          style={{ top: `${(hoveredLine - 1) * 22 + 52}px` }}
          onClick={() => setCommentDraft({ line: hoveredLine, text: '' })}
          id={`add-comment-line-${hoveredLine}`}
        >
          <Plus size={11} />
        </button>
      )}
    </div>
  )
}
