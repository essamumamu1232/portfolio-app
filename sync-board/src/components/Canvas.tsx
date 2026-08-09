import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useBoardStore } from '../store'
import StickyNoteEl from './StickyNoteEl'
import ShapeEl from './ShapeEl'
import TextEl from './TextEl'
import LiveCursors from './LiveCursors'
import styles from './Canvas.module.css'

export default function Canvas() {
  const {
    elements, zoom, pan, setPan, setZoom,
    tool, addSticky, addShape, addText,
    updateCursor, selectedId, setSelected, moveElement
  } = useBoardStore()

  const containerRef = useRef<HTMLDivElement>(null)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [panOrigin, setPanOrigin] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null)
  const animFrameRef = useRef<number | undefined>(undefined)

  // Dot grid background via canvas
  const dotCanvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = dotCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#d1d5db'
    const spacing = 24 * zoom
    const offsetX = (pan.x % spacing + spacing) % spacing
    const offsetY = (pan.y % spacing + spacing) % spacing
    for (let x = offsetX; x < W; x += spacing) {
      for (let y = offsetY; y < H; y += spacing) {
        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }, [zoom, pan])

  const screenToCanvas = useCallback((sx: number, sy: number) => {
    const rect = containerRef.current!.getBoundingClientRect()
    return {
      x: (sx - rect.left - pan.x) / zoom,
      y: (sy - rect.top - pan.y) / zoom,
    }
  }, [pan, zoom])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
      // Zoom
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setZoom(zoom * delta)
    } else {
      // Pan
      setPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY })
    }
  }, [zoom, pan, setZoom, setPan])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && tool === 'pan')) {
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
      setPanOrigin({ ...pan })
      return
    }
    if (e.button !== 0) return
    const { x, y } = screenToCanvas(e.clientX, e.clientY)

    if (tool === 'sticky') {
      addSticky(x - 100, y - 85)
    } else if (tool === 'rect') {
      addShape(x - 80, y - 50, 'rect')
    } else if (tool === 'circle') {
      addShape(x - 60, y - 60, 'circle')
    } else if (tool === 'diamond') {
      addShape(x - 70, y - 50, 'diamond')
    } else if (tool === 'text') {
      addText(x - 100, y - 18)
    } else if (tool === 'select') {
      setSelected(null)
    }
  }, [tool, pan, zoom, screenToCanvas, addSticky, addShape, addText, setSelected])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { x, y } = screenToCanvas(e.clientX, e.clientY)
    updateCursor(x, y)

    if (isPanning) {
      setPan({
        x: panOrigin.x + (e.clientX - panStart.x),
        y: panOrigin.y + (e.clientY - panStart.y),
      })
    }

    if (dragging) {
      const dx = (e.clientX - dragging.startX) / zoom
      const dy = (e.clientY - dragging.startY) / zoom
      moveElement(dragging.id, dragging.elX + dx, dragging.elY + dy)
    }
  }, [isPanning, panOrigin, panStart, dragging, zoom, screenToCanvas, setPan, updateCursor, moveElement])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
    setDragging(null)
  }, [])

  const startDrag = useCallback((id: string, clientX: number, clientY: number, elX: number, elY: number) => {
    setDragging({ id, startX: clientX, startY: clientY, elX, elY })
  }, [])

  const getCursor = () => {
    if (isPanning) return 'grabbing'
    if (tool === 'pan') return 'grab'
    if (tool === 'select') return 'default'
    return 'crosshair'
  }

  return (
    <div
      ref={containerRef}
      className={styles.canvasWrapper}
      style={{ cursor: getCursor() }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dot grid */}
      <canvas ref={dotCanvasRef} className={styles.dotCanvas} />

      {/* Transform layer */}
      <div
        className={styles.transformLayer}
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        {/* Elements sorted by zIndex */}
        {[...elements]
          .sort((a, b) => a.zIndex - b.zIndex)
          .map(el => {
            if (el.type === 'sticky') return (
              <StickyNoteEl
                key={el.id}
                element={el}
                isSelected={selectedId === el.id}
                onSelect={() => setSelected(el.id)}
                onDragStart={(cx, cy) => startDrag(el.id, cx, cy, el.x, el.y)}
              />
            )
            if (el.type === 'shape') return (
              <ShapeEl
                key={el.id}
                element={el}
                isSelected={selectedId === el.id}
                onSelect={() => setSelected(el.id)}
                onDragStart={(cx, cy) => startDrag(el.id, cx, cy, el.x, el.y)}
              />
            )
            if (el.type === 'text') return (
              <TextEl
                key={el.id}
                element={el}
                isSelected={selectedId === el.id}
                onSelect={() => setSelected(el.id)}
                onDragStart={(cx, cy) => startDrag(el.id, cx, cy, el.x, el.y)}
              />
            )
            return null
          })}
      </div>

      {/* Live cursors (in screen space) */}
      <LiveCursors pan={pan} zoom={zoom} />
    </div>
  )
}
