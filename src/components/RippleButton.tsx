import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function RippleButton({ children, className = '', onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
    
    if (onClick) onClick(e)
  }

  return (
    <button
      ref={buttonRef}
      className={`btn ${className}`}
      onClick={handleClick}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              pointerEvents: 'none',
              left: ripple.x,
              top: ripple.y
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ width: 400, height: 400, x: -200, y: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}
export default RippleButton
