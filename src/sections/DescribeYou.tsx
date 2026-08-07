import { useEffect, useRef, useState } from 'react'
import { RiHeartLine } from 'react-icons/ri'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const words = [
  { text: 'Beautiful',    x: '-230px', y: '-150px', size: 1.0 },
  { text: 'Intelligent',  x: '190px',  y: '-170px', size: 0.85 },
  { text: 'Kind',         x: '-270px', y: '10px',   size: 1.1 },
  { text: 'Caring',       x: '240px',  y: '-50px',  size: 0.85 },
  { text: 'Strong',       x: '-185px', y: '155px',  size: 0.9 },
  { text: 'Funny',        x: '210px',  y: '125px',  size: 0.8 },
  { text: 'Gorgeous',     x: '-145px', y: '-220px', size: 0.95 },
  { text: 'My Peace',     x: '145px',  y: '205px',  size: 0.85 },
  { text: 'My Home',      x: '-250px', y: '90px',   size: 0.9 },
  { text: 'My Favourite', x: '265px',  y: '60px',   size: 0.8 },
  { text: 'Radiant',      x: '85px',   y: '-215px', size: 0.8 },
  { text: 'Warmth',       x: '-85px',  y: '230px',  size: 0.8 },
  { text: 'sweet',        x: '310px',  y: '-5px',   size: 0.75 },
  { text: 'smart',        x: '-310px', y: '-80px',  size: 0.7 },
]

// How many words are visible at roughly the same time.
const OVERLAP = 3
// Total time (seconds) for one word's fade in → hold → fade out.
const CYCLE_DURATION = 5.5
// ────────────────────────────────────────────────────────────────

export default function DescribeYou() {
  const containerRef = useScrollRevealAll()
  const cloudRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = cloudRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // only need to trigger once
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stagger so only ~OVERLAP words are visible at any moment, then loop.
  const totalLoop = (words.length * CYCLE_DURATION) / OVERLAP

  return (
    <section
      id="describe"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
      <style>{`
        @keyframes wordCloudCycle {
          0%   { opacity: 0; transform: translate(var(--wx), var(--wy)) scale(0.94); }
          12%  { opacity: 1; transform: translate(var(--wx), var(--wy)) scale(1); }
          70%  { opacity: 1; transform: translate(var(--wx), var(--wy)) scale(1); }
          88%  { opacity: 0; transform: translate(var(--wx), var(--wy)) scale(0.96); }
          100% { opacity: 0; transform: translate(var(--wx), var(--wy)) scale(0.96); }
        }
      `}</style>

      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <RiHeartLine size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">In My Eyes</span>
          <h2
            className="font-display font-normal leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            If I Could
            <em className="block not-italic font-normal italic" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8em' }}>
              Describe You
            </em>
          </h2>
        </div>

        {/* Portrait + cycling word cloud */}
        <div
          ref={cloudRef}
          className="reveal relative flex items-center justify-center"
          style={{ height: 580 }}
        >
          {/* Words */}
          {words.map((w, i) => {
            const delay = (totalLoop / words.length) * i
            return (
              <div
                key={i}
                className="absolute font-display font-normal pointer-events-none whitespace-nowrap"
                style={{
                  ['--wx' as string]: w.x,
                  ['--wy' as string]: w.y,
                  opacity: 0,
                  animation: `wordCloudCycle ${totalLoop}s ease-in-out ${delay}s infinite`,
                  animationPlayState: isVisible ? 'running' : 'paused',
                  color: w.text.startsWith('{{') ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.55)',
                  fontStyle: w.text.startsWith('{{') ? 'italic' : 'normal',
                  fontSize: `${w.size}rem`,
                  letterSpacing: '0.03em',
                }}
              >
                {w.text}
              </div>
            )
          })}

          {/* Center portrait */}
          <div className="relative flex-shrink-0">
            {/* Rings */}
            {[16, 30, 46].map((pad, ri) => (
              <div
                key={ri}
                className="absolute rounded-full animate-pulse-glow"
                style={{
                  inset: -pad,
                  border: `1px solid rgba(255,255,255,${0.08 - ri * 0.02})`,
                  borderRadius: '50%',
                  animationDelay: `${ri * 0.6}s`,
                }}
              />
            ))}

            <div
              className="photo-placeholder rounded-full overflow-hidden"
              style={{
                width: 240,
                height: 240,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 24px 64px rgba(0,0,0,0.8)',
              }}
            >
              {/* Replace: <img src="/adebola.jpg" className="w-full h-full object-cover img-bw" /> */}
              <div className="flex flex-col items-center gap-2">
                <span className="font-display font-normal text-xs" style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
                  Adebola
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}