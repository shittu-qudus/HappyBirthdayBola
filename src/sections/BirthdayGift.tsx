import { useState, useRef } from 'react'
import { FiGift, FiLink } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const giftTitle = 'A Day Entirely For You'

const giftMessage =
  'Wheel Spinning, There’s a little surprise waiting for you below. Give the wheel a spin and see what you get! You only get one spin, so… fingers crossed! '




const wheelSegments = [
  'Spa Day',
  'Shopping Spree',
  'Cinema Date',
  'Picnic Date',
  'Skincare Prod ',
  'Movie Night',
]
const WINNING_LABEL = 'Cinema Date'

const dateDetails = 'You pick the movie and the date.'
// ────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'shaking' | 'open'
type WheelPhase = 'ready' | 'spinning' | 'settling' | 'done'

const SIZE = 240
const CENTER = SIZE / 2
const RADIUS = SIZE / 2 - 6
const OVERSHOOT = 10 // degrees past the target before it wobbles back

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeSlice(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`
}

export default function BirthdayGift() {
  const [phase, setPhase] = useState<Phase>('idle')
  const containerRef = useScrollRevealAll()

  const [wheelPhase, setWheelPhase] = useState<WheelPhase>('ready')
  const [rotation, setRotation] = useState(0)
  const spinningRef = useRef(false)
  const finalTargetRef = useRef(0)

  const segCount = wheelSegments.length
  const segAngle = 360 / segCount
  const winningIndex = wheelSegments.findIndex((s) => s === WINNING_LABEL)

  const handleOpen = () => {
    if (phase !== 'idle') return
    setPhase('shaking')
    setTimeout(() => setPhase('open'), 700)
  }

  const handleSpin = () => {
    if (spinningRef.current || wheelPhase === 'done') return
    spinningRef.current = true
    setWheelPhase('spinning')

    // Center angle of the winning slice (0 = top, clockwise).
    const targetCenter = winningIndex * segAngle + segAngle / 2
    const fullSpins = 6 + Math.floor(Math.random() * 3) // 6–8 full turns
    const extra = (360 - targetCenter + 360) % 360

    setRotation((prev) => {
      const base = prev - (prev % 360)
      const finalTarget = base + fullSpins * 360 + extra
      finalTargetRef.current = finalTarget
      // overshoot slightly past the target, then settle back
      return finalTarget + OVERSHOOT
    })
  }

  const handleTransitionEnd = () => {
    if (wheelPhase === 'spinning') {
      // main spin finished, now wobble back to the exact target
      setWheelPhase('settling')
      setRotation(finalTargetRef.current)
      return
    }
    if (wheelPhase === 'settling') {
      spinningRef.current = false
      setWheelPhase('done')
    }
  }

  const wheelClickable = wheelPhase === 'ready'

  return (
    <section
      id="gift"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiGift size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">Something Special</span>
          <h2
            className="font-display font-normal leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            Your Birthday
            <em className="block not-italic font-normal italic" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8em' }}>
              Gift
            </em>
          </h2>
        </div>

        <div className="reveal flex flex-col items-center">
          {phase !== 'open' ? (
            /* Gift box */
            <div className="flex flex-col items-center gap-8">
              <div
                className="relative cursor-pointer select-none"
                style={{
                  width: 200,
                  height: 200,
                  animation: phase === 'shaking' ? 'giftShake 0.6s ease-in-out' : 'none',
                }}
                onClick={handleOpen}
              >
                <div
                  className={phase === 'shaking' ? '' : 'animate-bounce-gentle'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: -10,
                    right: -10,
                    height: 52,
                    background: '#f5f5f5',
                    borderRadius: '6px 6px 2px 2px',
                    boxShadow: '0 -6px 24px rgba(255,255,255,0.08)',
                    zIndex: 3,
                  }}
                >
                  {[{ tx: '-110%', r: '-32deg' }, { tx: '10%', r: '32deg' }].map((b, bi) => (
                    <div
                      key={bi}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: -18,
                        width: 38,
                        height: 28,
                        background: '#d0d0d0',
                        borderRadius: bi === 0 ? '50% 0 50% 50%' : '0 50% 50% 50%',
                        transform: `translateX(${b.tx}) rotate(${b.r})`,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                      }}
                    />
                  ))}
                  <div style={{ position: 'absolute', left: '50%', top: -6, width: 16, height: 16, borderRadius: '50%', transform: 'translateX(-50%)', background: 'white', zIndex: 4, boxShadow: '0 2px 8px rgba(255,255,255,0.3)' }} />
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 10, transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.12)', borderRadius: 2 }} />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: 45,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 24px 56px rgba(0,0,0,0.6)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: 8, background: 'rgba(255,255,255,0.07)' }} />
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 8, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.07)' }} />
                  {[{x:'25%',y:'25%',d:0},{x:'70%',y:'60%',d:0.4},{x:'40%',y:'70%',d:0.8},{x:'75%',y:'25%',d:0.2}].map((s,si)=>(
                    <div key={si} className="animate-twinkle absolute" style={{ left:s.x, top:s.y, color:'rgba(255,255,255,0.2)', fontSize:10, animationDelay:`${s.d}s` }}>✦</div>
                  ))}
                </div>
              </div>

              <button onClick={handleOpen} className="section-label animate-bounce-gentle" style={{ cursor: 'pointer' }}>
                {phase === 'shaking' ? 'Opening...' : 'Tap to Open'}
              </button>
            </div>
          ) : (
            /* Reveal */
            <div className="w-full" style={{ animation: 'contentReveal 0.7s ease-out forwards' }}>
              {/* Main message */}
              <div
                style={{
                  background: '#0e0e0e',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                  padding: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 animate-heartbeat"
                  style={{ background: 'white', boxShadow: '0 4px 24px rgba(255,255,255,0.12)' }}
                >
                  <FiGift size={22} style={{ color: '#080808' }} />
                </div>
                <h3
                  className="font-display font-normal mb-4"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                    color: giftTitle.startsWith('{{') ? 'rgba(255,255,255,0.25)' : 'white',
                    fontStyle: giftTitle.startsWith('{{') ? 'italic' : 'normal',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {giftTitle}
                </h3>
                <p
                  className="text-sm mx-auto"
                  style={{
                    color: giftMessage.startsWith('{{') ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.55)',
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: giftMessage.startsWith('{{') ? 'italic' : 'normal',
                    lineHeight: 2,
                    maxWidth: 400,
                  }}
                >
                  {giftMessage}
                </p>
              </div>

              {/* Spin wheel */}
              <div className="flex flex-col items-center gap-6 mb-8">
                <span className="section-label">
                  {wheelPhase === 'ready' ? 'Tap The Wheel To Spin' : 'Spin For Your Surprise'}
                </span>

                <div
                  className="relative select-none"
                  style={{
                    width: SIZE,
                    height: SIZE,
                    cursor: wheelClickable ? 'pointer' : 'default',
                  }}
                  onClick={handleSpin}
                  role="button"
                  aria-label="Spin the wheel"
                  tabIndex={wheelClickable ? 0 : -1}
                  onKeyDown={(e) => {
                    if (wheelClickable && (e.key === 'Enter' || e.key === ' ')) handleSpin()
                  }}
                >
                  {/* Pointer */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '16px solid white',
                      zIndex: 5,
                      filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
                    }}
                  />

                  {/* Soft pulse ring inviting a tap, only while idle */}
                  {wheelClickable && (
                    <div
                      className="animate-pulse-ring absolute inset-0 rounded-full pointer-events-none"
                      style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                  )}

                  <svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition:
                        wheelPhase === 'spinning'
                          ? 'transform 4s cubic-bezier(0.12,0.67,0.1,1)'
                          : wheelPhase === 'settling'
                          ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)'
                          : 'none',
                      filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.55))',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#0e0e0e" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                    {wheelSegments.map((label, i) => {
                      const start = i * segAngle
                      const end = start + segAngle
                      const mid = start + segAngle / 2
                      const isWinner = label === WINNING_LABEL
                      const labelPos = polarToCartesian(CENTER, CENTER, RADIUS * 0.62, mid)
                      return (
                        <g key={label}>
                          <path
                            d={describeSlice(CENTER, CENTER, RADIUS, start, end)}
                            fill={i % 2 === 0 ? '#151515' : '#1c1c1c'}
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth={1}
                          />
                          <text
                            x={labelPos.x}
                            y={labelPos.y}
                            transform={`rotate(${mid}, ${labelPos.x}, ${labelPos.y})`}
                            textAnchor="middle"
                            fontSize={10}
                            fontFamily="'Inter', sans-serif"
                            letterSpacing="0.05em"
                            fill={isWinner ? 'white' : 'rgba(255,255,255,0.45)'}
                            fontWeight={isWinner ? 600 : 400}
                          >
                            {label}
                          </text>
                        </g>
                      )
                    })}
                    <circle cx={CENTER} cy={CENTER} r={16} fill="white" />
                  </svg>
                </div>

                {wheelPhase !== 'done' ? (
                  <button
                    onClick={handleSpin}
                    disabled={wheelPhase !== 'ready'}
                    className="section-label"
                    style={{
                      cursor: wheelPhase === 'ready' ? 'pointer' : 'default',
                      opacity: wheelPhase === 'ready' ? 1 : 0.4,
                    }}
                  >
                    {wheelPhase === 'ready' ? 'Tap to Spin' : 'Spinning...'}
                  </button>
                ) : (
                  <div className="text-center" style={{ animation: 'contentReveal 0.6s ease-out forwards' }}>
                    <p className="section-label mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      You Landed On
                    </p>
                    <h4
                      className="font-display font-normal mb-2"
                      style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', color: 'white', letterSpacing: '-0.02em' }}
                    >
                       {WINNING_LABEL}
                    </h4>
                    <p
                      className="text-xs"
                      style={{
                        color: dateDetails.startsWith('{{') ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)',
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: dateDetails.startsWith('{{') ? 'italic' : 'normal',
                        lineHeight: 1.8,
                      }}
                    >
                      {dateDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Final CTA — only after the wheel lands */}
              {wheelPhase === 'done' && (
                <div className="text-center" style={{ animation: 'contentReveal 0.6s ease-out forwards' }}>
                  <button
                    onClick={() => document.getElementById('finale')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-3 px-8 py-4 font-medium transition-all duration-300 hover:bg-white hover:text-[#080808] active:scale-95"
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: 'white',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    One Last Surprise ❤️
                    <FiLink size={13} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}