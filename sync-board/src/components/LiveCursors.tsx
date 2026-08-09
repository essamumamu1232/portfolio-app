import React, { useEffect, useRef, useState } from 'react'
import { useBoardStore } from '../store'
import styles from './LiveCursors.module.css'

interface Props {
  pan: { x: number; y: number }
  zoom: number
}

// Lerp helper for smooth cursor glide
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function LiveCursors({ pan, zoom }: Props) {
  const { cursors, currentUser } = useBoardStore()
  const positionsRef = useRef<Record<string, { x: number; y: number; targetX: number; targetY: number }>>({})
  const rafRef = useRef<number | undefined>(undefined)
  const [tick, setTick] = useState(0)

  // Initialize positions
  cursors.forEach(c => {
    if (c.userId === currentUser.id) return
    if (!positionsRef.current[c.userId]) {
      positionsRef.current[c.userId] = { x: c.x, y: c.y, targetX: c.x, targetY: c.y }
    } else {
      positionsRef.current[c.userId].targetX = c.x
      positionsRef.current[c.userId].targetY = c.y
    }
  })

  // Animate lerp
  useEffect(() => {
    const animate = () => {
      let needsUpdate = false
      Object.values(positionsRef.current).forEach(pos => {
        const dx = Math.abs(pos.targetX - pos.x)
        const dy = Math.abs(pos.targetY - pos.y)
        if (dx > 0.5 || dy > 0.5) {
          pos.x = lerp(pos.x, pos.targetX, 0.15)
          pos.y = lerp(pos.y, pos.targetY, 0.15)
          needsUpdate = true
        }
      })
      if (needsUpdate) setTick(n => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // Simulate cursor drift for demo users
  useEffect(() => {
    const DEMO_USERS = ['u2', 'u4']
    const demoPositions: Record<string, { x: number; y: number; vx: number; vy: number }> = {
      u2: { x: 450, y: 250, vx: 0.4, vy: 0.3 },
      u4: { x: 710, y: 180, vx: -0.3, vy: 0.5 },
    }

    const interval = setInterval(() => {
      DEMO_USERS.forEach(uid => {
        const p = demoPositions[uid]
        p.x += p.vx * 0.8 + (Math.random() - 0.5) * 0.3
        p.y += p.vy * 0.8 + (Math.random() - 0.5) * 0.3
        // Gentle bounce
        if (p.x < 50 || p.x > 900) p.vx *= -1
        if (p.y < 50 || p.y > 600) p.vy *= -1
        if (positionsRef.current[uid]) {
          positionsRef.current[uid].targetX = p.x
          positionsRef.current[uid].targetY = p.y
        }
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  const otherCursors = cursors.filter(c => c.userId !== currentUser.id)

  return (
    <div className={styles.overlay} aria-hidden="true">
      {otherCursors.map(cursor => {
        const pos = positionsRef.current[cursor.userId]
        if (!pos) return null
        // Convert canvas coords → screen coords
        const sx = pos.x * zoom + pan.x
        const sy = pos.y * zoom + pan.y
        return (
          <div
            key={cursor.userId}
            className={styles.cursor}
            style={{ transform: `translate(${sx}px, ${sy}px)` }}
          >
            {/* SVG cursor arrow */}
            <svg width="20" height="20" viewBox="0 0 20 20" className={styles.arrow}>
              <path
                d="M2 2L2 16L6.5 12L9 18L11 17L8.5 11L14 11Z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            {/* Name tag */}
            <div
              className={styles.nameTag}
              style={{ background: cursor.color }}
            >
              {cursor.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
