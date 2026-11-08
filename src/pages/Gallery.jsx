import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

// Authentic Hotel Sonajhuri Gallery Photos
import poolWideImg from '../assets/gallery/sonajhuri-rooftop-pool-wide.jpg'
import poolPortraitImg from '../assets/gallery/sonajhuri-pool-portrait.png'
import receptionImg from '../assets/gallery/sonajhuri-reception.png'
import roomViewImg from '../assets/gallery/sonajhuri-room-view.png'
import roomFamilyDoubleBedImg from '../assets/gallery/room-family-double-bed.jpg'
import roomDeluxeTwinImg from '../assets/gallery/room-deluxe-twin.png'
import roomBalconySeatingImg from '../assets/gallery/room-balcony-seating.jpg'
import hotelCorridorImg from '../assets/gallery/hotel-corridor.png'
import terraceOpenCafeImg from '../assets/gallery/terrace-open-cafe.png'
import terraceGardenDayImg from '../assets/gallery/terrace-garden-day.png'
import terraceGardenNightImg from '../assets/gallery/terrace-garden-night.png'

// Authentic Hotel Sonajhuri Dining & Cuisine Photos
import breakfastSpreadImg from '../assets/gallery/breakfast-spread.png'
import bengaliThaliBanquetImg from '../assets/gallery/bengali-thali-banquet.png'
import breakfastInBedImg from '../assets/gallery/breakfast-in-bed.png'
import ilishUtsavSpecialImg from '../assets/gallery/ilish-utsav-special.png'
import ilishMenuCardImg from '../assets/gallery/ilish-menu-card.png'

// Authentic Hotel Sonajhuri service photos
import roomInteriorImg from '../assets/offers-01.jpg'
import restaurantImg from '../assets/offers-02.jpg'
import terraceLawnImg from '../assets/offers-04.avif'

const categories = ['All', 'Rooms', 'Pool', 'Restaurant & Cafe', 'Reception & Corridor']

const galleryImages = [
  { src: poolWideImg, alt: 'Hotel Sonajhuri Rooftop Swimming Pool & Wooden Deck', cat: 'Pool' },
  { src: poolPortraitImg, alt: 'Rooftop Pool & Deck View', cat: 'Pool' },
  { src: roomFamilyDoubleBedImg, alt: 'Spacious Family Double Bed Room with False Ceiling', cat: 'Rooms' },
  { src: roomDeluxeTwinImg, alt: 'Comfortable Deluxe Twin Bed Room', cat: 'Rooms' },
  { src: roomBalconySeatingImg, alt: 'Private Balcony Seating with Coastal Town View', cat: 'Rooms' },
  { src: roomViewImg, alt: 'Guest Room with Scenic Balcony Windows', cat: 'Rooms' },
  { src: roomInteriorImg, alt: 'Premium AC Room Interior', cat: 'Rooms' },
  { src: receptionImg, alt: 'Hotel Sonajhuri Reception & Lobby', cat: 'Reception & Corridor' },
  { src: hotelCorridorImg, alt: 'Modern Illuminated Hotel Corridor & Passageway', cat: 'Reception & Corridor' },
  { src: bengaliThaliBanquetImg, alt: 'Grand Coastal Feast - Special Bengali Spread & Tandoori', cat: 'Restaurant & Cafe' },
  { src: breakfastSpreadImg, alt: 'Lavish In-Room Breakfast Spread with Paratha & Fruits', cat: 'Restaurant & Cafe' },
  { src: breakfastInBedImg, alt: 'Hotel Sonajhuri Breakfast in Bed Holiday Platter', cat: 'Restaurant & Cafe' },
  { src: ilishUtsavSpecialImg, alt: 'Authentic Ilish Utsav Delicacies on Banana Leaf', cat: 'Restaurant & Cafe' },
  { src: ilishMenuCardImg, alt: 'Hotel Sonajhuri Traditional Hilsa & Ilish Special Menu', cat: 'Restaurant & Cafe' },
  { src: terraceGardenNightImg, alt: 'Illuminated Rooftop Bamboo Garden with Fairy Lights & Seating', cat: 'Restaurant & Cafe' },
  { src: terraceGardenDayImg, alt: 'Lush Green Rooftop Garden Cafe & Pergola Daytime View', cat: 'Restaurant & Cafe' },
  { src: terraceOpenCafeImg, alt: 'Open-Air Terrace Garden & Rooftop Cafe Seating', cat: 'Restaurant & Cafe' },
  { src: restaurantImg, alt: 'In-House Multi-Cuisine Restaurant', cat: 'Restaurant & Cafe' },
  { src: terraceLawnImg, alt: 'Terrace Lawn & Relaxation Area', cat: 'Restaurant & Cafe' },
]

const galleryVideos = [
  { src: '/videos/hotel-sonajhuri-1.mp4', title: 'A Warm Welcome' },
  { src: '/videos/hotel-sonajhuri-2.mp4', title: 'Rooftop Moments' },
  { src: '/videos/hotel-sonajhuri-3.mp4', title: 'The Coastal Stay' },
  { src: '/videos/hotel-sonajhuri-4.mp4', title: 'Taste of Sonajhuri' },
  { src: '/videos/hotel-sonajhuri-5.mp4', title: 'Life at the Hotel' },
]

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#0d3330]">
      <motion.img
        src={poolWideImg}
        alt="Hotel Sonajhuri Rooftop Pool"
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d3330]/30 via-[#0d3330]/55 to-[#0d3330]/75" />
      <div className="relative z-10 text-center px-4">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-3">
          Our Hotel
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Gallery
        </motion.h1>
        <div className="gold-line mx-auto mt-4" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ENHANCED LIGHTBOX — navigation + perspective
// ─────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const [direction, setDirection] = useState(0)
  const img = images[current]

  const go = useCallback((dir) => {
    setDirection(dir)
    setCurrent((c) => {
      const next = c + dir
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }, [images.length])

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'Escape') onClose()
  }, [go, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lightbox-backdrop"
      style={{ backgroundColor: 'rgba(13, 51, 48, 0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      {/* Image panel */}
      <motion.div
        className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 z-10 w-10 h-10 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          aria-label="Close lightbox"
        >
          <X size={18} />
        </button>

        {/* Sliding image with perspective */}
        <div className="gallery-perspective w-full overflow-hidden rounded-lg">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.img
              key={current}
              src={img.src}
              alt={img.alt}
              className="max-w-full max-h-[80vh] object-contain mx-auto block rounded-lg"
              custom={direction}
              variants={{
                enter: (d) => ({
                  x: d >= 0 ? 60 : -60,
                  opacity: 0,
                  rotateY: d >= 0 ? 8 : -8,
                }),
                center: { x: 0, opacity: 1, rotateY: 0 },
                exit: (d) => ({
                  x: d >= 0 ? -60 : 60,
                  opacity: 0,
                  rotateY: d >= 0 ? -8 : 8,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>

        {/* Caption + Counter */}
        <div className="flex items-center justify-between w-full mt-4 px-1">
          <p className="text-white/60 text-sm">{img.alt}</p>
          <p className="text-white/40 text-xs">{current + 1} / {images.length}</p>
        </div>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between px-2 pointer-events-none">
          <motion.button
            onClick={() => go(-1)}
            className="pointer-events-auto w-11 h-11 bg-[#1a4740]/80 hover:bg-[#c9a84c] text-white hover:text-[#0d3330] border border-white/20 hover:border-[#c9a84c] rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={() => go(1)}
            className="pointer-events-auto w-11 h-11 bg-[#1a4740]/80 hover:bg-[#c9a84c] text-white hover:text-[#0d3330] border border-white/20 hover:border-[#c9a84c] rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// GALLERY ITEM — perspective on hover
// ─────────────────────────────────────────────
function GalleryItem({ img, index, onClick }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="relative overflow-hidden rounded-xl group cursor-pointer gallery-item depth-shadow aspect-[4/3] w-full"
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.02, y: -3 }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0d3330]/0 group-hover:bg-[#0d3330]/45 transition-all duration-400 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 rounded-full bg-[#c9a84c]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ZoomIn size={20} className="text-[#0d3330]" />
        </motion.div>
      </div>
      {/* Category tag */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] font-medium tracking-widest uppercase bg-[#c9a84c] text-[#0d3330] px-2 py-0.5 rounded">
          {img.cat}
        </span>
      </div>
    </motion.div>
  )
}

function VideoGalleryItem({ video, index }) {
  const { ref, isInView } = useScrollReveal()
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="video-gallery-card group min-w-0"
    >
      <div className="video-gallery-frame">
        <video
          className="video-gallery-media"
          src={video.src}
          controls
          preload="metadata"
          loading="lazy"
          playsInline
          aria-label={`Play ${video.title} video`}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          Your browser does not support the video element.
        </video>
        {!isPlaying && (
          <div className="video-play-overlay" aria-hidden="true">
            <span className="video-play-button">
              <Play size={22} fill="currentColor" />
            </span>
          </div>
        )}
        <div className="video-shimmer" aria-hidden="true" />
      </div>
      <div className="video-gallery-caption">
        <span aria-hidden="true">0{index + 1}</span>
        <h3>{video.title}</h3>
      </div>
    </motion.article>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const videoRailRef = useRef(null)
  const { ref: titleRef, isInView: titleIn } = useScrollReveal()

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.cat === activeCategory)

  const openLightbox = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const scrollVideoRail = useCallback((direction) => {
    videoRailRef.current?.scrollBy({
      left: direction * Math.max(260, videoRailRef.current.clientWidth * 0.72),
      behavior: 'smooth',
    })
  }, [])

  return (
    <main>
      <PageHero />

      <section className="bg-[#1a4740] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            ref={titleRef}
            variants={fadeUp}
            initial="hidden"
            animate={titleIn ? 'visible' : 'hidden'}
            className="text-center mb-10"
          >
            <p className="section-label mb-3">Photo Gallery</p>
            <div className="gold-line mx-auto" />
            <h2
              className="text-white font-bold"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Explore Our Hotel
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={titleIn ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <motion.button
                  key={cat}
                  variants={fadeUp}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full border transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'border-[#c9a84c] text-[#0d3330]'
                      : 'border-white/20 text-white/60 hover:border-[#c9a84c] hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="galleryActiveTab"
                      className="absolute inset-0 bg-[#c9a84c] rounded-full -z-10 shadow-lg shadow-[#c9a84c]/25"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Uniform Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <GalleryItem
                  key={img.src}
                  img={img}
                  index={i}
                  onClick={openLightbox}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="video-gallery-section" aria-labelledby="video-gallery-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="video-gallery-heading"
          >
            <p className="section-label mb-3">Moving Impressions</p>
            <div className="gold-line mx-auto" />
            <h2 id="video-gallery-heading">Video Gallery</h2>
            <p>Discover the atmosphere, spaces, and warm hospitality of Hotel Sonajhuri.</p>
          </motion.div>

          <div className="video-gallery-rail-wrap">
            <button
              type="button"
              className="video-gallery-arrow video-gallery-arrow-left"
              onClick={() => scrollVideoRail(-1)}
              aria-label="Previous videos"
            >
              <ChevronLeft size={22} />
            </button>
            <div ref={videoRailRef} className="video-gallery-grid">
              {galleryVideos.map((video, index) => (
                <VideoGalleryItem key={video.src} video={video} index={index} />
              ))}
            </div>
            <button
              type="button"
              className="video-gallery-arrow video-gallery-arrow-right"
              onClick={() => scrollVideoRail(1)}
              aria-label="Next videos"
            >
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="video-gallery-dots" aria-hidden="true">
            <span />
            <span className="active" />
            <span />
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
