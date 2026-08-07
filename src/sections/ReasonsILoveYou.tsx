import { useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const reasons = [
  'The way your eyes light up when you talk about something you love',
  'How you make every ordinary moment feel like a celebration',
  'Your laugh — genuinely the most beautiful sound I have ever heard',
  'The warmth you bring to every room you walk into',
  'How fiercely you love the people who matter to you',
  'The way you always know exactly what to say',
  'How you never stop trying to be a better version of yourself',
  'The way you see the best in everyone around you',
  'How your hugs feel like coming home after a long journey',
  'The dreams you carry and the quiet strength to chase them',
  'The depth of your kindness — it genuinely has no bottom',
  'Simply because you are Adebola, and that is more than enough ❤️',
]
// ────────────────────────────────────────────────────────────────

export default function ReasonsILoveYou() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const containerRef = useScrollRevealAll()

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <section
      id="reasons"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiHeart size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">All the Reasons</span>
          <h2
            className="font-display font-normal leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            Why I Love
            <em className="block not-italic font-normal italic" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8em' }}>
              You
            </em>
          </h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>
            Hover or tap each card to reveal a reason
          </p>
        </div>

        {/* Grid */}
        <div
          className="reveal"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: '0.75rem' }}
        >
          {reasons.map((reason, i) => {
            const isFlipped = flipped.has(i)
            const num = String(i + 1).padStart(2, '0')
            return (
              <div
                key={i}
                className={`flip-card cursor-pointer select-none ${isFlipped ? 'flipped' : ''}`}
                style={{ height: 165 }}
                onClick={() => toggle(i)}
              >
                <div className="flip-card-inner">
                  {/* Front — dark card, white number */}
                  <div
                    className="flip-card-front rounded-none flex flex-col items-center justify-center gap-4"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <span
                      className="font-display font-normal"
                      style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.03em' }}
                    >
                      {num}
                    </span>
                    <FiHeart size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    <span className="section-label" style={{ fontSize: '0.55rem' }}>Tap to reveal</span>
                  </div>

                  {/* Back — white card, black text */}
                  <div
                    className="flip-card-back rounded-none flex items-center justify-center p-5"
                    style={{ background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.08)' }}
                  >
                    <p
                      className="text-center text-xs leading-relaxed"
                      style={{
                        color: reason.startsWith('{{') ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.75)',
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: reason.startsWith('{{') ? 'italic' : 'normal',
                        fontSize: reason.length > 60 ? '0.68rem' : '0.75rem',
                        lineHeight: 1.8,
                      }}
                    >
                      {reason}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}
