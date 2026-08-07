import Navigation from './components/Navigation'
import FloatingParticles from './components/FloatingParticles'
import MusicPlayer from './components/MusicPlayer'
import Hero from './sections/Hero'
import OurStory from './sections/OurStory'
import Timeline from './sections/Timeline'
import Gallery from './sections/Gallery'
import ReasonsILoveYou from './sections/ReasonsILoveYou'
import DescribeYou from './sections/DescribeYou'
import LoveLetter from './sections/LoveLetter'
import BirthdayGift from './sections/BirthdayGift'
import Finale from './sections/Finale'

export default function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#020617' }}>
      {/* Ambient floating particles */}
      <FloatingParticles />

      {/* Floating glass navigation */}
      <Navigation />

      {/* Persistent music player */}
      <MusicPlayer />

      <main>
        <Hero />
        <OurStory />
        <Timeline />
        <Gallery />
        <ReasonsILoveYou />
        <DescribeYou />
        <LoveLetter />
        <BirthdayGift />
        <Finale />
      </main>
    </div>
  )
}
