import { useState } from 'react'
import { FiImage, FiZoomIn, FiChevronLeft, FiChevronRight, FiX, FiPlay } from 'react-icons/fi'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ── Personalisation ──────────────────────────────────────────────
const galleryItems = [
  { src: '/images/horse.jpeg', alt: 'Our story, kissing', caption: '{{Caption — What made this moment unforgettable}}', h: 280, type: 'image' },
    { src: '/video/bola2.MOV', alt: 'A gentle kiss', caption: '{{Caption — What happened just before this shot}}', h: 220, type: 'video' },
  { src: '/images/face.jpeg', alt: 'Together in a field', caption: '{{Caption — Where were you, what were you saying}}', h: 200, type: 'image' },
  { src: '/images/retro4.jpeg', alt: 'Silhouette of love', caption: '{{Caption — The quiet moment between two people}}', h: 260, type: 'image' },
    { src: '/images/bola6.png', alt: 'Our story, kissing', caption: '{{Caption — What made this moment unforgettable}}', h: 280, type: 'image' },




  { src: '/video/bola3.MP4', alt: 'A gentle kiss', caption: '{{Caption — What happened just before this shot}}', h: 220, type: 'video' },

  { src: '/images/IMG_8408.jpeg', alt: 'Her smile', caption: '{{Caption — The reason you saved this photo}}', h: 240, type: 'image' },
    { src: '/video/bola.MP4', alt: 'A gentle kiss', caption: '{{Caption — What happened just before this shot}}', h: 220, type: 'video' },
  { src: '/images/IMG_8858.jpeg', alt: 'Our adventure', caption: '{{Caption — An adventure we never want to forget}}', h: 195, type: 'image' },
  { src: '/images/IMG_8465.jpeg', alt: 'At dusk together', caption: '{{Caption — A small detail only you two would notice}}', h: 275, type: 'image' },
    { src: '/video/bola4.MP4', alt: 'A gentle kiss', caption: '{{Caption — What happened just before this shot}}', h: 220, type: 'video' },
  { src: '/images/IMG_5639.jpeg', alt: 'Bench at sunset', caption: '{{Caption — What you were laughing about here}}', h: 210, type: 'image' },
      { src: '/video/fola.MP4', alt: 'A gentle kiss', caption: '{{Caption — What happened just before this shot}}', h: 220, type: 'video' },
  { src: '/images/bola5.png', alt: 'Kissing at sunset', caption: '{{Caption — The last thing said before the shutter clicked}}', h: 260, type: 'image' },
]
// ────────────────────────────────────────────────────────────────I

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const containerRef = useScrollRevealAll()

  const prev = () => setLightbox(((lightbox ?? 0) - 1 + galleryItems.length) % galleryItems.length)
  const next = () => setLightbox(((lightbox ?? 0) + 1) % galleryItems.length)

  const isVideo = (index: number) => galleryItems[index]?.type === 'video'
  const getFileExtension = (src: string) => src.split('.').pop()?.toLowerCase()

  return (
    <section
      id="gallery"
      ref={containerRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: '#080808' }}
    >
      <div className="rule absolute top-0 left-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <FiImage size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <div className="h-px w-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <span className="section-label block mb-6">Memory Gallery</span>
          <h2
            className="font-display font-normal leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'white', letterSpacing: '-0.03em' }}
          >
            Every Frame
            <em className="block not-italic font-normal italic" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8em' }}>
              A Treasure
            </em>
          </h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>
            Click any image to open — each one a story only you two can read.
          </p>
        </div>

        {/* Masonry */}
        <div className="masonry reveal">
          {galleryItems.map((item, i) => (
            <div key={i} className="masonry-item group cursor-pointer" onClick={() => setLightbox(i)}>
              <div className="relative overflow-hidden" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.src}
                      className="w-full object-cover group-hover:brightness-90 transition-all duration-500 group-hover:scale-[1.03]"
                      style={{ height: item.h, display: 'block', background: '#000' }}
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                    {/* Play button overlay for videos */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      style={{ background: 'rgba(0,0,0,0.2)' }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ 
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        <FiPlay size={20} style={{ color: 'white', marginLeft: '2px' }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover img-bw group-hover:brightness-90 transition-all duration-500 group-hover:scale-[1.03]"
                    style={{ height: item.h, display: 'block' }}
                  />
                )}
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(8,8,8,0.4)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full glass flex items-center justify-center"
                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    {item.type === 'video' ? (
                      <FiPlay size={15} style={{ color: 'white', marginLeft: '1px' }} />
                    ) : (
                      <FiZoomIn size={15} style={{ color: 'white' }} />
                    )}
                  </div>
                </div>
              </div>
              <p
                className="mt-2 px-0.5 text-[11px] leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: item.caption.startsWith('{{') ? 'italic' : 'normal',
                }}
              >
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(4,4,4,0.97)', backdropFilter: 'blur(24px)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            style={{ border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(lightbox) ? (
              <video
                src={galleryItems[lightbox].src}
                className="w-full"
                style={{ maxHeight: '70vh', background: '#000' }}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img
                src={galleryItems[lightbox].src.replace(/w=\d+&h=\d+/, 'w=1200&h=800')}
                alt={galleryItems[lightbox].alt}
                className="w-full object-cover img-bw"
                style={{ maxHeight: '70vh' }}
              />
            )}
            <div
              className="p-5 flex items-center justify-between"
              style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p
                className="text-xs flex-1 pr-4"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontStyle: galleryItems[lightbox].caption.startsWith('{{') ? 'italic' : 'normal', lineHeight: 1.8 }}
              >
                {galleryItems[lightbox].caption}
              </p>
              <span className="section-label flex-shrink-0">{lightbox + 1} / {galleryItems.length}</span>
            </div>

            {/* Nav */}
            {[
              { fn: prev, Icon: FiChevronLeft, side: 'left-3' },
              { fn: next, Icon: FiChevronRight, side: 'right-3' },
            ].map(({ fn, Icon, side }) => (
              <button
                key={side}
                onClick={(e) => { e.stopPropagation(); fn() }}
                className={`absolute top-1/2 -translate-y-1/2 ${side} w-9 h-9 rounded-full glass flex items-center justify-center`}
                style={{ border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Icon size={16} style={{ color: 'white' }} />
              </button>
            ))}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <FiX size={14} style={{ color: 'white' }} />
            </button>
          </div>
        </div>
      )}

      <div className="rule absolute bottom-0 left-0 right-0" />
    </section>
  )
}