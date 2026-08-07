import { useState, useRef, useEffect } from 'react'
import { FiPlay, FiPause, FiMusic } from 'react-icons/fi'

// ── Personalisation ──────────────────────────────────────────────
const AUDIO_SRC  = ''          // Replace with '/your-song.mp3' or a hosted URL
const SONG_NAME  = '{{Our Song}}'
const ARTIST     = '{{Artist Name}}'
// ────────────────────────────────────────────────────────────────

export default function MusicPlayer() {
  const [playing, setPlaying]   = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const barHeights = [4, 8, 5, 11, 7, 9, 5, 8, 4]

  useEffect(() => {
    if (!AUDIO_SRC) return
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audioRef.current = audio
    const onTime = () => audio.duration && setProgress((audio.currentTime / audio.duration) * 100)
    audio.addEventListener('timeupdate', onTime)
    return () => { audio.pause(); audio.removeEventListener('timeupdate', onTime) }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (a) playing ? a.pause() : a.play().catch(() => {})
    setPlaying(!playing)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded panel */}
      <div
        className="glass overflow-hidden transition-all duration-500"
        style={{
          width: expanded ? 210 : 0,
          opacity: expanded ? 1 : 0,
          border: '1px solid rgba(255,255,255,0.07)',
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      >
        <div className="p-4">
          <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif" }}>
            {SONG_NAME}
          </p>
          <p className="text-[10px] mb-3" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif" }}>
            {ARTIST}
          </p>

          {/* Progress */}
          <div className="relative h-px mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="absolute left-0 top-0 h-full transition-all duration-300"
              style={{ width: `${playing ? (AUDIO_SRC ? progress : 45) : 0}%`, background: 'white' }}
            />
          </div>

          {/* Waveform */}
          <div className="flex items-end justify-center gap-0.5" style={{ height: 24 }}>
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-150"
                style={{
                  width: 2.5,
                  height: playing ? h : 3,
                  background: playing ? 'white' : 'rgba(255,255,255,0.15)',
                  animation: playing ? `bounceGentle ${0.5 + i * 0.07}s ease-in-out infinite` : 'none',
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Player button */}
      <button
        className="flex items-center gap-2.5 transition-all duration-300 hover:bg-white hover:text-[#080808] active:scale-95 group"
        style={{
          background: playing ? 'white' : '#111111',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '10px 16px 10px 12px',
          boxShadow: playing ? '0 8px 32px rgba(255,255,255,0.1)' : '0 8px 24px rgba(0,0,0,0.5)',
        }}
        onClick={() => { toggle(); if (!expanded) setExpanded(true) }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => !playing && setExpanded(false)}
      >
        {/* Icon */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: playing ? '#080808' : 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {playing
            ? <FiPause size={11} style={{ color: 'white' }} />
            : <FiPlay  size={11} style={{ color: 'white', marginLeft: 1 }} />}
        </div>

        <div className="flex flex-col items-start">
          <span className="section-label mb-0.5" style={{ fontSize: '0.55rem' }}>
            {playing ? 'Now Playing' : 'Our Song'}
          </span>
          <span
            className="text-xs font-medium truncate"
            style={{
              color: playing ? '#080808' : 'rgba(255,255,255,0.6)',
              fontFamily: "'Inter', sans-serif",
              maxWidth: 100,
            }}
          >
            {SONG_NAME}
          </span>
        </div>

        <FiMusic
          size={12}
          style={{ color: playing ? '#080808' : 'rgba(255,255,255,0.3)', marginLeft: 2 }}
        />
      </button>
    </div>
  )
}
