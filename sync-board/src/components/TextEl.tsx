import React from 'react'
import { TextElement } from '../types'
import { useBoardStore } from '../store'
import styles from './TextEl.module.css'

interface Props {
  element: TextElement
  isSelected: boolean
  onSelect: () => void
  onDragStart: (clientX: number, clientY: number) => void
}

export default function TextEl({ element, isSelected, onSelect, onDragStart }: Props) {
  const { updateElement } = useBoardStore()

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()
    if (e.button === 0) onDragStart(e.clientX, e.clientY)
  }

  return (
    <div
      id={`text-${element.id}`}
      className={`${styles.textEl} ${isSelected ? styles.selected : ''}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width,
        zIndex: element.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={styles.content}
        style={{
          fontSize: element.fontSize,
          fontWeight: element.bold ? 700 : 400,
          color: element.color,
        }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => updateElement(element.id, { text: e.currentTarget.textContent ?? '' } as any)}
        onMouseDown={e => e.stopPropagation()}
      >
        {element.text}
      </div>
    </div>
  )
}
