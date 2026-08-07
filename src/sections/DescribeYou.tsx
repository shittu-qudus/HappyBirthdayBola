import { RiHeartLine } from 'react-icons/ri'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const words = [
  { text: 'Beautiful',      x: '-230px', y: '-150px', delay: 0,    size: 1.0 },
  { text: 'Intelligent',    x: '190px',  y: '-170px', delay: 0.9,  size: 0.85 },
  { text: 'Kind',           x: '-270px', y: '10px',   delay: 1.7,  size: 1.1 },
  { text: 'Caring',         x: '240px',  y: '-50px',  delay: 0.4,  size: 0.85 },
  { text: 'Strong',         x: '-185px', y: '155px',  delay: 2.1,  size: 0.9 },
  { text: 'Funny',          x: '210px',  y: '125px',  delay: 1.3,  size: 0.8 },
  { text: 'Gorgeous',       x: '-145px', y: '-220px', delay: 0.6,  size: 0.95 },
  { text: 'My Peace',       x: '145px',  y: '205px',  delay: 1.9,  size: 0.85 },
  { text: 'My Home',        x: '-250px', y: '90px',   delay: 2.5,  size: 0.9 },
  { text: 'My Favourite',   x: '265px',  y: '60px',   delay: 1.1,  size: 0.8 },
  { text: 'Radiant',        x: '85px',   y: '-215px', delay: 0.2,  size: 0.8 },
  { text: 'Warmth',         x: '-85px',  y: '230px',  delay: 1.5,  size: 0.8 },
  { text: '{{Add Word}}',   x: '310px',  y: '-5px',   delay: 2.3,  size: 0.75 },
  { text: '{{Add Word}}',   x: '-310px', y: '-80px',  delay: 0.8,  size: 0.7 },
]
// ────────────────────────────────────────────────────────────────

export default function DescribeYou() {
  const containerRef = useScrollRevealAll()

  return (
    <section
      id="describe"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
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

        {/* Portrait + floating words */}
        <div className="reveal relative flex items-center justify-center" style={{ height: 580 }}>
          {/* Words */}
          {words.map((w, i) => (
            <div
              key={i}
              className="absolute font-display font-normal animate-word-drift pointer-events-none whitespace-nowrap"
              style={{
                transform: `translate(${w.x}, ${w.y})`,
                color: w.text.startsWith('{{') ? 'rgba(255,255,255,0.12)' : `rgba(255,255,255,${0.3 + (i % 4) * 0.12})`,
                animationDelay: `${w.delay}s`,
                animationDuration: `${5.5 + (i % 3) * 0.8}s`,
                fontSize: `${w.size}rem`,
                fontStyle: w.text.startsWith('{{') ? 'italic' : 'normal',
                letterSpacing: '0.03em',
              }}
            >
              {w.text}
            </div>
          ))}

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
