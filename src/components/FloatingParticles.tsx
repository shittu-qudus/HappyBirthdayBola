import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  kind: 'dot' | 'cross' | 'ring'
  opacity: number
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        delay: Math.random() * 12,
        duration: Math.random() * 8 + 8,
        kind: (['dot', 'cross', 'ring'] as const)[Math.floor(Math.random() * 3)],
        opacity: Math.random() * 0.12 + 0.03,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.kind === 'dot' && (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: 'white',
              }}
            />
          )}
          {p.kind === 'cross' && (
            <svg
              width={p.size * 2}
              height={p.size * 2}
              viewBox="0 0 10 10"
              fill="none"
            >
              <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="0.8" />
            </svg>
          )}
          {p.kind === 'ring' && (
            <div
              style={{
                width: p.size * 2,
                height: p.size * 2,
                borderRadius: '50%',
                border: '0.5px solid rgba(255,255,255,0.6)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
