import { useState, useEffect, useRef } from 'react'
import { FiPlay, FiPause, FiChevronDown, FiArrowRight } from 'react-icons/fi'
import { RiHeartLine } from 'react-icons/ri'

// ── Personalisation ──────────────────────────────────────────────
const HER_NAME = "Adebola"
const SUBTITLE = "Today the world celebrates someone who makes mine infinitely brighter."
const BG_IMAGE = "/images/IMG_7961.jpeg"

// ── YouTube Song Configuration ────────────────────────────────────
// ✅ CORRECT Video ID from: https://youtu.be/t_-Fv9HTteQ?si=Rs2hGUbQgjJSo6lo
const YOUTUBE_VIDEO_ID = "t_-Fv9HTteQ"  // Fixed: extracted correctly
const SONG_NAME = "Joy"
const SONG_ARTIST = "Wizkid"
// ──────────────────────────────────────────────────────────────────

// YouTube Player API
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const [nameIn, setNameIn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  
  const playerRef = useRef<any>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 80)
    setTimeout(() => setNameIn(true), 500)

    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (playerContainerRef.current) {
        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: () => {
              setPlayerReady(true)
              const duration = playerRef.current?.getDuration()
              if (duration) setDuration(duration)
              console.log('✅ YouTube Player Ready! Video ID:', YOUTUBE_VIDEO_ID)
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setPlaying(true)
                startProgressTracking()
                console.log('▶️ Playing')
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setPlaying(false)
                stopProgressTracking()
                console.log('⏸️ Paused')
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setPlaying(false)
                setProgress(0)
                setCurrentTime(0)
                stopProgressTracking()
                console.log('⏹️ Ended')
              }
            },
          },
        })
      }
    }

    // If API is already loaded, initialize immediately
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady()
    }

    return () => {
      stopProgressTracking()
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  // Progress tracking
  const startProgressTracking = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerReady) {
        const current = playerRef.current.getCurrentTime()
        const total = playerRef.current.getDuration()
        if (total) {
          setCurrentTime(current)
          setProgress((current / total) * 100)
        }
      }
    }, 500)
  }

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!playerRef.current || !playerReady) {
      console.warn('⚠️ Player not ready')
      return
    }

    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  // Seek to position
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !playerReady || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const seekTime = x * duration
    playerRef.current.seekTo(seekTime, true)
  }

  // Format time
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const scrollToStory = () =>
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Hidden YouTube Player */}
      <div ref={playerContainerRef} className="hidden" />

      {/* B&W hero image */}
      <div className="absolute inset-0 bg-[#080808]">
        <img
          src={BG_IMAGE}
          alt="Adebola — our love story"
          className="w-full h-full object-cover img-bw"
          style={{ opacity: 0.28, objectPosition: 'center 25%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.15) 35%, rgba(8,8,8,0.6) 75%, #080808 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(8,8,8,0.5) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Issue label */}
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(10px)', transitionDelay: '0.1s' }}
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <span className="section-label">A Birthday Edition</span>
            <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>

        {/* Portrait */}
        <div
          className="relative mb-10 transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px) scale(0.97)', transitionDelay: '0.2s' }}
        >
          {[14, 28].map((pad, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse-glow"
              style={{
                inset: -pad,
                border: `1px solid rgba(255,255,255,${i === 0 ? 0.1 : 0.05})`,
                borderRadius: '50%',
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
          <div
            className="photo-placeholder rounded-full overflow-hidden"
            style={{
              width: 200,
              height: 200,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <RiHeartLine size={24} style={{ color: 'rgba(255,255,255,0.2)' }} />
              <span>ADD PORTRAIT</span>
            </div>
          </div>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center animate-heartbeat"
            style={{
              background: 'white',
              boxShadow: '0 4px 20px rgba(255,255,255,0.25)',
              zIndex: 5,
            }}
          >
            <RiHeartLine size={13} style={{ color: '#080808' }} />
          </div>
        </div>

        {/* Name */}
        <div
          className="mb-5 transition-all duration-1000"
          style={{ opacity: nameIn ? 1 : 0, transform: nameIn ? 'none' : 'translateY(30px)' }}
        >
          <h1
            className="font-display font-normal shimmer-text leading-none"
            style={{
              fontSize: 'clamp(5rem, 20vw, 13rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {HER_NAME}
          </h1>
        </div>

        {/* Italic tagline */}
        <div
          className="mb-3 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.9s' }}
        >
          <p
            className="font-display italic"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.03em',
            }}
          >
            "Her birthday is the world's greatest day."
          </p>
        </div>

        {/* Rule */}
        <div
          className="mb-6 w-24 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '1s' }}
        >
          <div className="rule" />
        </div>

        {/* Subtitle */}
        <p
          className="max-w-md text-sm leading-relaxed mb-12 transition-all duration-700"
          style={{ color: 'rgba(255,255,255,0.35)', opacity: visible ? 1 : 0, transitionDelay: '1.1s', lineHeight: 1.9, fontFamily: "'Inter', sans-serif" }}
        >
          {SUBTITLE}
        </p>

        {/* Actions */}
        <div
          className="flex flex-col items-center gap-4 transition-all duration-700 w-full max-w-md"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '1.3s' }}
        >
          {/* Music Player */}
          <div className="w-full flex flex-col items-center gap-2">
            <button
              onClick={togglePlay}
              disabled={!playerReady}
              className="flex items-center gap-3 px-5 py-3 rounded-full glass transition-all duration-300 hover:bg-white/[0.06] active:scale-95 w-full max-w-sm"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: playing ? 'white' : 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                {playing
                  ? <FiPause size={11} style={{ color: '#080808' }} />
                  : <FiPlay size={11} style={{ color: 'white', marginLeft: 1 }} />}
              </div>
              
              <div className="text-left flex-1 min-w-0">
                <p className="section-label mb-0.5">
                  {playing ? 'Now Playing' : playerReady ? 'Play Song' : 'Loading...'}
                </p>
                <p className="text-xs font-medium truncate" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif" }}>
                  {SONG_NAME} — {SONG_ARTIST}
                </p>
              </div>

              {/* Visualizer bars */}
              {playing && (
                <div className="flex items-end gap-0.5 ml-1">
                  {[4, 8, 5, 10, 6].map((h, i) => (
                    <div 
                      key={i} 
                      className="rounded-full" 
                      style={{ 
                        width: 2.5, 
                        height: h, 
                        background: 'rgba(255,255,255,0.6)',
                        animation: `bounceGentle ${0.5 + i * 0.1}s ease-in-out infinite`,
                        animationDelay: `${i * 0.08}s`,
                      }} 
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Progress bar */}
            {duration > 0 && (
              <div className="w-full max-w-sm px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30 font-mono min-w-[30px]">
                    {formatTime(currentTime)}
                  </span>
                  <div 
                    className="flex-1 h-0.5 rounded-full cursor-pointer relative"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${progress}%`,
                        background: 'rgba(255,255,255,0.4)'
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-white/30 font-mono min-w-[30px]">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Story CTA */}
          <button
            onClick={scrollToStory}
            className="flex items-center gap-3 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-[#080808] active:scale-95"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'white',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Begin Our Story
            <FiArrowRight size={14} />
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700"
          style={{ opacity: visible ? 0.5 : 0, transitionDelay: '1.8s' }}
        >
          <span className="section-label">Scroll</span>
          <div className="animate-scroll-arrow">
            <FiChevronDown size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
          </div>
        </div>
      </div>

      {/* Bottom horizontal rule */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
    </section>
  )
}