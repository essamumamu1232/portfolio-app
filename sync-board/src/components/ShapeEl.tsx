import React from 'react'
import { ShapeElement } from '../types'
import { useBoardStore } from '../store'
import styles from './ShapeEl.module.css'

interface Props {
  element: ShapeElement
  isSelected: boolean
  onSelect: () => void
  onDragStart: (clientX: number, clientY: number) => void
}

export default function ShapeEl({ element, isSelected, onSelect, onDragStart }: Props) {
  const { updateElement } = useBoardStore()

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()
    if (e.button === 0) onDragStart(e.clientX, e.clientY)
  }

  const w = element.width
  const h = element.height

  const renderShape = () => {
    if (element.shape === 'circle') {
      return (
        <svg width={w} height={h} style={{ position: 'absolute', inset: 0 }}>
          <ellipse cx={w/2} cy={h/2} rx={w/2 - 2} ry={h/2 - 2}
            fill={element.fill} stroke={element.stroke} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '0' : '0'} />
        </svg>
      )
    }
    if (element.shape === 'diamond') {
      const pts = `${w/2},2 ${w-2},${h/2} ${w/2},${h-2} 2,${h/2}`
      return (
        <svg width={w} height={h} style={{ position: 'absolute', inset: 0 }}>
          <polygon points={pts} fill={element.fill} stroke={element.stroke} strokeWidth={isSelected ? 2.5 : 1.5} />
        </svg>
      )
    }
    // rect
    return (
      <svg width={w} height={h} style={{ position: 'absolute', inset: 0 }}>
        <rect x={1} y={1} width={w-2} height={h-2} rx={6}
          fill={element.fill} stroke={element.stroke} strokeWidth={isSelected ? 2.5 : 1.5} />
      </svg>
    )
  }

  return (
    <div
      id={`shape-${element.id}`}
      className={`${styles.shape} ${isSelected ? styles.selected : ''}`}
      style={{ left: element.x, top: element.y, width: w, height: h, zIndex: element.zIndex }}
      onMouseDown={handleMouseDown}
    >
      {renderShape()}
      {element.label && (
        <div className={styles.label} contentEditable suppressContentEditableWarning
          onBlur={e => updateElement(element.id, { label: e.currentTarget.textContent ?? '' } as any)}
          onMouseDown={e => e.stopPropagation()}
        >
          {element.label}
        </div>
      )}
    </div>
  )
}
