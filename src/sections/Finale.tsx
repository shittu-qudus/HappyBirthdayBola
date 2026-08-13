import { useEffect, useRef, useState } from 'react'
import { FiStar } from 'react-icons/fi'
import { RiHeartLine } from 'react-icons/ri'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const HER_NAME = "Adebola"
const FINAL_MESSAGE =
  'Happy birthday, my love.May this new chapter bring you endless happiness, peace, and beautiful memories. Always remember, you are deeply loved, today and every day.'
const SIGNATURE = 'Forever Yours,\nQudus ❤️'
// ────────────────────────────────────────────────────────────────

interface FWParticle {
  x:number; y:number; vx:number; vy:number; life:number; size:number; alpha:number
}

function useFireworks(active: boolean, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: FWParticle[] = []

    const burst = (cx: number, cy: number) => {
      const count = 60 + Math.floor(Math.random() * 40)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3
        const speed = Math.random() * 4 + 0.8
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.2,
          life: 1,
          size: Math.random() * 2.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.6,
        })
      }
    }

    let frame = 0
    let raf = 0
    const draw = () => {
      ctx.fillStyle = 'rgba(8,8,8,0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (frame % 45 === 0) burst(canvas.width * (0.15 + Math.random() * 0.7), canvas.height * (0.08 + Math.random() * 0.5))
      if (frame % 75 === 40) burst(canvas.width * (0.15 + Math.random() * 0.7), canvas.height * (0.08 + Math.random() * 0.4))

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        p.vy += 0.055; p.vx *= 0.99
        p.life -= 0.013

        if (p.life <= 0) { particles.splice(i, 1); continue }

        const alpha = p.life * p.alpha
        const gray = Math.floor(200 + Math.random() * 55)
        ctx.globalAlpha = alpha
        ctx.fillStyle = `rgb(${gray},${gray},${gray})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      frame++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [active, canvasRef])
}

export default function Finale() {
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const containerRef = useScrollRevealAll()

  useFireworks(active, canvasRef)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true) }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // White/gray confetti pieces
  const confetti = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    gray: Math.floor(160 + Math.random() * 95),
    size: Math.random() * 8 + 3,
    delay: Math.random() * 5,
    dur: Math.random() * 4 + 5,
    circle: Math.random() > 0.5,
    rot: Math.random() * 360,
  }))

  return (
    <section
      id="finale"
      ref={(el) => {
        sectionRef.current = el
        ;(containerRef as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-28"
      style={{ background: '#080808' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      {/* Fireworks canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      />

      {/* Confetti */}
      {active && confetti.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.circle ? p.size : p.size * 0.55,
            height: p.circle ? p.size : p.size * 2.2,
            background: `rgb(${p.gray},${p.gray},${p.gray})`,
            borderRadius: p.circle ? '50%' : 1,
            transform: `rotate(${p.rot}deg)`,
            opacity: 0.7,
            animation: `confettifall ${p.dur}s ${p.delay}s ease-in infinite`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(8,8,8,0.5) 100%)', zIndex: 3 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="reveal mb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiStar size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>

        {/* Happy Birthday label */}
        <div className="reveal mb-3">
          <p
            className="font-display font-normal italic"
            style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}
          >
            Happy Birthday,
          </p>
        </div>

        {/* Name — massive */}
        <div className="reveal mb-12">
          <h2
            className="font-display font-normal leading-none shimmer-text"
            style={{ fontSize: 'clamp(5rem, 20vw, 13rem)', letterSpacing: '-0.04em' }}
          >
            {HER_NAME}
          </h2>
        </div>

        {/* Hearts row */}
        <div className="reveal flex justify-center gap-4 mb-14">
          {[1.2, 1, 1.5, 1, 1.2].map((scale, i) => (
            <RiHeartLine
              key={i}
              size={18 * scale}
              className="animate-heartbeat"
              style={{
                color: `rgba(255,255,255,${0.2 + i * 0.08})`,
                animationDelay: `${i * 0.2}s`,
                filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.15))',
              }}
            />
          ))}
        </div>

        {/* Final message */}
        <div
          className="reveal mx-auto mb-14 p-10 md:p-14"
          style={{
            maxWidth: 680,
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p
            className="text-sm md:text-base"
            style={{
              color: FINAL_MESSAGE.startsWith('{{') ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.6)',
              fontFamily: "'Inter', sans-serif",
              fontStyle: FINAL_MESSAGE.startsWith('{{') ? 'italic' : 'normal',
              lineHeight: 2.1,
            }}
          >
            {FINAL_MESSAGE}
          </p>
        </div>

        {/* Signature */}
        <div className="reveal mb-14">
          <p
            className="font-display font-normal italic whitespace-pre-line"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'white',
              textShadow: '0 0 40px rgba(255,255,255,0.1)',
              lineHeight: 1.5,
            }}
          >
            {SIGNATURE}
          </p>
        </div>

        {/* Stars */}
        <div className="reveal flex justify-center items-center gap-4">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className="animate-twinkle"
              style={{
                color: `rgba(255,255,255,${0.15 + (i % 3) * 0.12})`,
                fontSize: i === 4 ? 18 : 11,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
