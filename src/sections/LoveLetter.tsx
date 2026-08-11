import { useState, useEffect } from 'react'
import { FiMail, FiCornerDownLeft } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const LETTER_DATE = "August 19, 2026"
const letter = {
  greeting: 'My Dearest Adebola,',
  opening:
    'Today is your special day, and honestly, I\'m grateful to Allah for blessing the world with you.  May Allah continue to bless your new age, increase you in wisdom, happiness, and good health, and make this new chapter better than the last. Insha Allah, this year will bring you plenty of reasons to smile.',
  memory:
    'I still remember some of the random moments we\'ve shared, especially the ones that started unexpectedly and somehow became memories we still laugh about.  Those little moments are what make our journey interesting. Ya Rabb, may we continue to create more beautiful memories, even if some of them come with small misunderstandings along the way. ',
  appreciation:
    'Adebola, one thing I genuinely appreciate about you is the person you are. Your personality, your confidence, your funny moments, and even the times when you\'re being stubborn all make you uniquely you. You have a way of making ordinary moments interesting, and that\'s something I truly value.',
  wishes:
    'As you enter this new age, my prayer for you is simple: may Allah grant you your heart\'s desires, protect you from anything harmful, and open doors of opportunities for you. May He bless your efforts, increase your happiness, strengthen your faith, and surround you with good people. Insha Allah, everything you\'re working towards will fall into place at the right time.',
  closing:
    'So today, forget the stress, enjoy yourself, eat plenty of cake , take beautiful pictures, and celebrate properly. You deserve to enjoy your day. May this new chapter bring you more laughter, unforgettable experiences, answered prayers, and countless blessings.\n\nHappy Birthday, Adebola! \nMay Allah bless your new age and make it a truly beautiful one. Ameen. ',
  signature: 'With Love,\nQudus ❤️',
}
// ────────────────────────────────────────────────────────────────

export default function LoveLetter() {
  const [opened, setOpened] = useState(false)
  const [displayedContent, setDisplayedContent] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentParaIndex, setCurrentParaIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const containerRef = useScrollRevealAll()
  
  const paragraphs = [
    letter.opening,
    letter.memory,
    letter.appreciation,
    letter.wishes,
    letter.closing
  ]

  // Typing animation effect
  useEffect(() => {
    if (!opened) {
      setDisplayedContent([])
      setCurrentParaIndex(0)
      setCharIndex(0)
      return
    }

    setIsTyping(true)
    
    if (currentParaIndex < paragraphs.length) {
      const currentText = paragraphs[currentParaIndex]
      
      if (charIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayedContent(prev => {
            const newContent = [...prev]
            if (newContent.length <= currentParaIndex) {
              newContent.push('')
            }
            newContent[currentParaIndex] = currentText.substring(0, charIndex + 1)
            return newContent
          })
          setCharIndex(prev => prev + 1)
        }, 25) // Slightly slower for calligraphy feel
        
        return () => clearTimeout(timer)
      } else {
        // Move to next paragraph after a pause
        const timer = setTimeout(() => {
          setCurrentParaIndex(prev => prev + 1)
          setCharIndex(0)
        }, 600)
        
        return () => clearTimeout(timer)
      }
    } else {
      setIsTyping(false)
    }
  }, [opened, currentParaIndex, charIndex, paragraphs])

  // Reset when closing
  useEffect(() => {
    if (!opened) {
      setDisplayedContent([])
      setCurrentParaIndex(0)
      setCharIndex(0)
      setIsTyping(false)
    }
  }, [opened])

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
                    style={{ 
                      color: '#080808', 
                      letterSpacing: '0.02em',
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                    }}
                  >
                    {letter.greeting}
                  </p>

                  {displayedContent.map((text, index) => (
                    <p
                      key={index}
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'rgba(0,0,0,0.7)',
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        fontSize: '1.05rem',
                        lineHeight: 2.1,
                        letterSpacing: '0.02em',
                        minHeight: '1.8rem',
                        fontStyle: 'italic',
                      }}
                    >
                      {text}
                      {isTyping && index === currentParaIndex - 1 && (
                        <span 
                          className="inline-block ml-0.5"
                          style={{
                            width: '2px',
                            height: '1.2em',
                            background: '#8B7355',
                            animation: 'blink 0.8s infinite'
                          }}
                        />
                      )}
                    </p>
                  ))}

                  {/* Show all paragraphs after typing is complete */}
                  {!isTyping && displayedContent.length === paragraphs.length && (
                    <>
                      {/* All content is already displayed */}
                    </>
                  )}

                  <div className="pt-5" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                    <p
                      className="font-display font-normal text-xl whitespace-pre-line"
                      style={{ 
                        color: '#080808', 
                        lineHeight: 1.6,
                        fontFamily: "'Playfair Display', 'Georgia', serif",
                        letterSpacing: '0.02em',
                      }}
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

      {/* Add typing cursor animation and import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Smooth writing effect for each paragraph */
        .typing-paragraph {
          transition: opacity 0.3s ease;
        }
      `}</style>
    </section>
  )
}