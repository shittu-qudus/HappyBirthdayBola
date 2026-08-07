import { useState, useEffect } from 'react'
import { FiHome, FiBookOpen, FiClock, FiImage, FiHeart, FiMail, FiGift, FiStar } from 'react-icons/fi'

const navItems = [
  { id: 'hero',     Icon: FiHome,     label: 'Home' },
  { id: 'story',    Icon: FiBookOpen, label: 'Story' },
  { id: 'timeline', Icon: FiClock,    label: 'Journey' },
  { id: 'gallery',  Icon: FiImage,    label: 'Gallery' },
  { id: 'reasons',  Icon: FiHeart,    label: 'Love' },
  { id: 'letter',   Icon: FiMail,     label: 'Letter' },
  { id: 'gift',     Icon: FiGift,     label: 'Gift' },
  { id: 'finale',   Icon: FiStar,     label: 'Finale' },
]

export default function Navigation() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          setActive(navItems[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
      style={{ opacity: scrolled ? 1 : 0.7 }}
    >
      <div
        className="glass flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        {navItems.map(({ id, Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={label}
              className="group relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
              style={{
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(255,255,255,0.18)' : '1px solid transparent',
              }}
            >
              <Icon
                size={14}
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.35)',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' : 'none',
                  transition: 'all 0.3s',
                }}
              />
              {/* Tooltip */}
              <span
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', fontFamily: "'Inter', sans-serif" }}
              >
                {label.toUpperCase()}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
