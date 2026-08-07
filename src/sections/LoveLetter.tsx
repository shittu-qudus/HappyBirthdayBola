import { useState } from 'react'
import { FiMail, FiCornerDownLeft } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const LETTER_DATE = "{{Today's Date}}"
const letter = {
  greeting: 'My dearest Adebola,',
  opening:
    '{{Write your birthday letter opening here. Tell her what this day means, what it feels like to be celebrating it with her, how different your world is because she exists in it.}}',
  memory:
    '{{Share your most cherished memory together. Be vivid and specific — the kind of detail that will bring both tears and smiles at the same time.}}',
  appreciation:
    '{{Write about the things you appreciate most about her — not just the grand gestures, but the small everyday things that remind you how lucky you are.}}',
  wishes:
    '{{Write your birthday wishes for her. What do you hope this new year brings? What do you want the world to give her that she deserves?}}',
  closing:
    '{{Close with something only you two would understand — a private phrase, a promise, a feeling only you can name.}}',
  signature: 'Forever Yours,\nQudus ❤️',
}
// ────────────────────────────────────────────────────────────────

export default function LoveLetter() {
  const [opened, setOpened] = useState(false)
  const containerRef = useScrollRevealAll()

  return (
    <section
      id="letter"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiMail size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">A Letter for You</span>
          <h2
            className="font-display font-normal leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            Words From
            <em className="block not-italic font-normal italic" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8em' }}>
              My Heart
            </em>
          </h2>
          {!opened && (
            <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>
              Tap the envelope to open your letter
            </p>
          )}
        </div>

        <div className="reveal flex flex-col items-center">
          {!opened ? (
            /* Envelope */
            <div
              className="relative cursor-pointer select-none group"
              style={{ width: 340, height: 230 }}
              onClick={() => setOpened(true)}
            >
              {/* Body */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(145deg, #161616 0%, #101010 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              />
              {/* Flap top */}
              <div
                className="absolute top-0 left-0 right-0 transition-transform duration-500 origin-top group-hover:-rotate-12"
                style={{
                  height: '55%',
                  background: 'linear-gradient(170deg, #1a1a1a 0%, #131313 100%)',
                  clipPath: 'polygon(0 0, 50% 58%, 100% 0)',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              />
              {/* Left fold */}
              <div className="absolute bottom-0 left-0" style={{ width: '51%', height: '62%', background: '#111111', clipPath: 'polygon(0 100%, 100% 100%, 0 0)', borderRight: '1px solid rgba(255,255,255,0.05)' }} />
              {/* Right fold */}
              <div className="absolute bottom-0 right-0" style={{ width: '51%', height: '62%', background: '#111111', clipPath: 'polygon(0 100%, 100% 100%, 100% 0)', borderLeft: '1px solid rgba(255,255,255,0.05)' }} />

              {/* Wax seal */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-7 w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: '#f5f5f5',
                  boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                  zIndex: 5,
                }}
              >
                <span className="font-display font-normal text-2xl" style={{ color: '#080808' }}>Q</span>
              </div>

              {/* Hover label */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="section-label animate-bounce-gentle" style={{ display: 'block' }}>
                  Open ↓
                </span>
              </div>
            </div>
          ) : (
            /* Letter */
            <div
              className="w-full"
              style={{ animation: 'contentReveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards' }}
            >
              <div
                style={{
                  background: '#f7f6f2',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                  padding: '3rem 3.5rem',
                }}
              >
                {/* Letterhead */}
                <div className="flex justify-between items-start mb-8">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: '#080808' }}
                  >
                    <span className="font-display text-sm" style={{ color: 'white' }}>Q</span>
                  </div>
                  <span
                    className="text-[11px]"
                    style={{ color: 'rgba(0,0,0,0.3)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}
                  >
                    {LETTER_DATE}
                  </span>
                </div>

                <div className="mb-6 h-px" style={{ background: 'rgba(0,0,0,0.07)' }} />

                <div className="space-y-5">
                  <p
                    className="font-display font-normal text-xl mb-6"
                    style={{ color: '#080808', letterSpacing: '0.01em' }}
                  >
                    {letter.greeting}
                  </p>

                  {[letter.opening, letter.memory, letter.appreciation, letter.wishes, letter.closing].map((para, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed"
                      style={{
                        color: para.startsWith('{{') ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.65)',
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: para.startsWith('{{') ? 'italic' : 'normal',
                        lineHeight: 2,
                      }}
                    >
                      {para}
                    </p>
                  ))}

                  <div className="pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                    <p
                      className="font-display font-normal text-xl whitespace-pre-line"
                      style={{ color: '#080808', lineHeight: 1.6 }}
                    >
                      {letter.signature}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpened(false)}
                className="mt-6 flex items-center gap-2 mx-auto transition-opacity hover:opacity-60"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em' }}
              >
                <FiCornerDownLeft size={12} />
                FOLD LETTER
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}
