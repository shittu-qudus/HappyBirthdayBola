import { FiClock, FiMessageCircle, FiCamera, FiMap, FiAnchor, FiGift } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const milestones = [
  {
    date: '{{First Chat Date}}',
    title: 'Our First "Hello"',
    desc: '{{How your first conversation started. What was said? What did you feel in that exact moment?}}',
    Icon: FiMessageCircle,
    photo: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=480&h=260&fit=crop&auto=format',
    alt: 'Stars — the night we first connected',
  },
  {
    date: '{{First Date}}',
    title: 'Our First Date',
    desc: '{{Where did you go? What happened? How did the evening end? Every detail matters.}}',
    Icon: FiMap,
    photo: '/src/images/date1.JPG',
    alt: 'Red roses — our first date',
  },
  {
    date: '{{First Photo Together}}',
    title: 'First Photo Together',
    desc: '{{The first time someone captured both of you. Where were you? How did it feel?}}',
    Icon: FiCamera,
    photo: '/src/images/firstpic.jpeg',
    alt: 'Silhouette — our first captured moment',
  },
  {
    date: '{{Favorite Trip}}',
    title: 'Our Greatest Adventure',
    desc: '{{Your most memorable trip together — the destination, the highlight, the moment you never want to forget.}}',
    Icon: FiMap,
    photo: 'https://images.unsplash.com/photo-1566759996874-04d713cc224a?w=480&h=260&fit=crop&auto=format',
    alt: 'Adventure — our favourite journey',
  },
  {
    date: '{{Special Anniversary}}',
    title: 'A Day to Remember',
    desc: '{{A milestone anniversary, the day it became official, or any landmark moment in your relationship.}}',
    Icon: FiAnchor,
    photo: 'https://images.unsplash.com/photo-1598288103147-6bc615cb464c?w=480&h=260&fit=crop&auto=format',
    alt: 'Candlelight — our anniversary',
  },
  {
    date: "Today — Adebola's Birthday",
    title: "Happy Birthday, My Love",
    desc: '{{What this birthday means to you. What this year together has been. What you wish for her in this new chapter.}}',
    Icon: FiGift,
    photo: 'https://images.unsplash.com/photo-1628345851631-db863f35fa0e?w=480&h=260&fit=crop&auto=format',
    alt: 'Together — her birthday',
  },
]
// ────────────────────────────────────────────────────────────────

export default function Timeline() {
  const containerRef = useScrollRevealAll()

  return (
    <section
      id="timeline"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiClock size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">Our Journey</span>
          <h2
            className="font-display font-normal leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            Every Milestone
            <em className="block not-italic font-normal italic" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8em' }}>
              That Led Us Here
            </em>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent 100%)' }}
          />

          <div className="space-y-14">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={i}
                  className="reveal flex flex-col md:flex-row items-center gap-0"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {/* Card */}
                  <div className={`flex-1 w-full ${isLeft ? 'md:pr-10' : 'md:order-3 md:pl-10'}`}>
                    <div
                      className="glass overflow-hidden transition-all duration-300 hover:-translate-y-1"
                      style={{
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        maxWidth: 380,
                        marginLeft: isLeft ? 'auto' : 0,
                        marginRight: isLeft ? 0 : 'auto',
                      }}
                    >
                      {/* Photo */}
                      <div className="relative overflow-hidden" style={{ height: 150 }}>
                        <img
                          src={m.photo}
                          alt={m.alt}
                          className="w-full h-full object-cover img-bw"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.9) 100%)' }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="section-label px-2 py-1 glass rounded-sm">
                            {m.date}
                          </span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-5">
                        <h3
                          className="font-display font-normal text-xl mb-2"
                          style={{ color: 'white', letterSpacing: '-0.01em' }}
                        >
                          {m.title}
                        </h3>
                        <p
                          className="text-xs leading-relaxed"
                          style={{
                            color: 'rgba(255,255,255,0.35)',
                            fontFamily: "'Inter', sans-serif",
                            lineHeight: 1.9,
                            fontStyle: m.desc.startsWith('{{') ? 'italic' : 'normal',
                          }}
                        >
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex-shrink-0 md:order-2 my-4 md:my-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 0 0 4px #0a0a0a, 0 0 20px rgba(255,255,255,0.05)',
                      }}
                    >
                      <m.Icon size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className={`flex-1 hidden md:block ${isLeft ? 'md:order-3' : ''}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}
