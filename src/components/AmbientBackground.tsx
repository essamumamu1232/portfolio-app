import { motion } from 'framer-motion'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { floatNode } from '../lib/animations'

const NODE_COUNT = 18

export function AmbientBackground() {
  const { x, y } = useMouseParallax(0.02)

  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15
  }))

  return (
    <div className="ambient-bg" style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Radial gradient mesh */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.35,
          background: 'radial-gradient(ellipse at 30% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)'
        }}
      />

      {/* Floating nodes */}
      <motion.div style={{ x, y, position: 'absolute', inset: 0 }}>
        {nodes.map((node) => {
          const fn = floatNode(node.delay, node.duration)
          return (
            <motion.div
              key={node.id}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                width: node.size,
                height: node.size,
                left: `${node.x}%`,
                top: `${node.y}%`,
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, transparent 75%)',
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.4)'
              }}
              animate={fn.animate}
              transition={fn.transition as any}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
export default AmbientBackground
