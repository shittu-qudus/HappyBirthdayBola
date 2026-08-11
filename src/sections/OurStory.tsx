import { FiBookOpen } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const chapters = [
  {
    label: 'I',
    title: 'How We First Met',
    body: 'We met through a mutual friend who couldn’t stop telling me how beautiful you were. Curiosity got the better of me, and somehow, I ended up getting your number from your friend with a little prize in exchange. Little did I know that something that started so playfully would lead me to someone who would become so special to me.',
    note: 'Referral',
    photo: '/images/marriot.jpeg',
    alt: 'Two people, a beginning',
    side: 'right' as const,
  },
  {
    label: 'II',
    title: 'The First Conversation',
    body: 'I honestly can’t remember everything we talked about, but I remember sending you a DM and you were there forming celebrity, taking forever to reply. I had no choice but to call you myself just to get you to respond.Looking back, I was really doing the most just to get one reply from you.',
    note: 'First Message',
    photo: '/images/retro1.jpeg',
    alt: 'A silhouette of two souls',
    side: 'left' as const,
  },
  {
    label: 'III',
    title: 'My First Impression',
      body: 'The first time I really saw you at the school tarmac, I was impressed immediately. Your face card was doing serious work 😂. I literally looked at you like, “Where have you been all my life?” You definitely caught my attention that day.',
      note: 'First Impression',
      photo: '/images/retro2.jpeg',
      alt: 'Tenderness captured in a moment',
    side: 'right' as const,
  },
  {
    label: 'IV',
    title: 'That Unforgettable Memory',
    body: "Our first date was honestly a movie. We had a misunderstanding, fought a little, then squashed the beef and started talking about living right. Somehow, by 1 PM, we were at the Marriott. Definitely not how I expected our first date to go!",
    note: 'First Date Schenegian',
    photo: '/images/home1.jpeg',
    alt: 'A smile that stays with you',
    side: 'left' as const,
  },
]
// ────────────────────────────────────────────────────────────────

export default function OurStory() {
  const containerRef = useScrollRevealAll()

  return (
    <section
      id="story"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-28">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiBookOpen size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">Our Story</span>
          <h2
            className="font-display font-normal leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            Where It All{' '}
            <em className="not-italic" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Began
            </em>
          </h2>
        </div>

        {/* Chapters */}
        <div className="space-y-36">
          {chapters.map((ch, i) => (
            <div
              key={i}
              className={`reveal flex flex-col gap-12 md:gap-20 items-center
                ${ch.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              {/* Photo */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div
                  className="relative overflow-hidden group"
                  style={{
                    aspectRatio: '4/3',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
                  }}
                >
                  <img
                    src={ch.photo}
                    alt={ch.alt}
                    className="w-full h-full object-cover img-bw group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 50%)' }}
                  />
                  {/* Chapter number overlay */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="font-display text-7xl font-normal leading-none"
                      style={{ color: 'rgba(255,255,255,0.06)', WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                    >
                      {ch.label}
                    </span>
                  </div>
                  {/* Replace hint */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(8,8,8,0.55)' }}
                  >
                    {/* <span className="section-label px-4 py-2 glass rounded-full">
                      Replace With Your Photo
                    </span> */}
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-display italic text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Chapter {ch.label}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                </div>

                <h3
                  className="font-display font-normal mb-6 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', letterSpacing: '-0.02em' }}
                >
                  {ch.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{
                    color: 'rgba(255,255,255,0.42)',
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 2,
                    fontStyle: ch.body.startsWith('{{') ? 'italic' : 'normal',
                  }}
                >
                  {ch.body}
                </p>

                {/* Footnote */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  <span
                    className="text-xs italic"
                    style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {ch.note}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}
