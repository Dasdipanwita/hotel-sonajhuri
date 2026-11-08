import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Wifi, Car, Coffee, Waves, Tv, Zap, Phone, MapPin, Quote, Sparkles } from 'lucide-react'
import { useScrollReveal, fadeUp, slideLeft, slideRight, staggerContainer } from '../hooks/useScrollReveal'
import { use3DTilt, useMouseParallax, useParallaxScroll } from '../hooks/use3DEffects'
import NearbyPlacesSection from '../components/NearbyPlacesSection'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri exclusive service photos
import serviceRoomImg from '../assets/offers-01.jpg'
import serviceRestaurantImg from '../assets/offers-02.jpg'
import servicePoolImg from '../assets/offers-03.jpg'
import serviceLawnImg from '../assets/offers-04.avif'
import heroPoolImg from '../assets/sonajhuri-pool-hero.jpg'
import realRoomImg from '../assets/gallery/room-family-double-bed.jpg'
import realRoomTwinImg from '../assets/gallery/room-deluxe-twin.png'
import realRoomViewImg from '../assets/gallery/sonajhuri-room-view.png'

// Hero slides using authentic Hotel Sonajhuri imagery & premium hotel scenes
const heroSlides = [
  {
    img: heroPoolImg,
    label: 'Hotel Sonajhuri',
    title: 'Hotel in New Digha',
    sub: 'A tranquil escape by the sea — where comfort meets coastal elegance',
  },
  {
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80&auto=format&fit=crop',
    label: 'Premium Rooms',
    title: 'Rooms & Suites',
    sub: 'Spacious, stylish, and perfect for a coastal getaway',
  },
  {
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80&auto=format&fit=crop',
    label: 'Exclusive Services',
    title: 'Rooftop Pool & Lawn',
    sub: 'Unwind at our rooftop pool with stunning sea-breeze views',
  },
]

const amenities = [
  { icon: Wifi, label: 'Free Wi-Fi' },
  { icon: Waves, label: 'Swimming Pool' },
  { icon: Car, label: 'Car Parking' },
  { icon: Coffee, label: 'Tea / Coffee' },
  { icon: Tv, label: 'Smart TV' },
  { icon: Zap, label: '24x7 Power' },
]

const rooms = [
  {
    img: realRoomImg,
    name: 'Super Deluxe Room',
    desc: 'Spacious family double bed room with false ceiling and warm ambiance.',
    features: ['Double Bed', '300 sq.ft', 'Breakfast'],
  },
  {
    img: realRoomTwinImg,
    name: 'Deluxe Room',
    desc: 'Spacious, stylish twin bed setup with modern amenities.',
    features: ['Twin Bed', '240 sq.ft', 'AC'],
  },
  {
    img: realRoomViewImg,
    name: 'Balcony View Room',
    desc: 'Comfortable coastal room featuring scenic balcony windows.',
    features: ['Queen Bed', '220 sq.ft', 'Balcony'],
  },
]

const services = [
  {
    img: serviceRoomImg,
    label: 'Premium Rooms',
  },
  {
    img: serviceRestaurantImg,
    label: 'Restaurant',
  },
  {
    img: servicePoolImg,
    label: 'Rooftop Swimming Pool',
  },
  {
    img: serviceLawnImg,
    label: 'Terrace Lawn',
  },
]

// ─────────────────────────────────────────────
// HERO SECTION — Cinematic 3D Parallax
// ─────────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const heroRef = useRef(null)
  const { openBooking } = useBooking()

  // Mouse parallax for depth layers
  const { x: mouseX, y: mouseY } = useMouseParallax(12)

  // Scroll-based vertical parallax on the image layer
  const scrollY = useParallaxScroll(0.25)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1)
      setCurrent((p) => (p + 1) % heroSlides.length)
    }, 5500)
    return () => clearTimeout(timer)
  }, [current])

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => { setDirection(-1); setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length) }
  const next = () => { setDirection(1); setCurrent((p) => (p + 1) % heroSlides.length) }

  const slide = heroSlides[current]

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] min-h-[560px] overflow-hidden bg-[#0d3330]"
    >
      {/* ── Layer 1: Background image with scroll parallax ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d) => ({ x: d > 0 ? '5%' : '-5%', opacity: 0, scale: 1.06 }),
            center: { x: 0, opacity: 1, scale: 1 },
            exit: (d) => ({ x: d > 0 ? '-5%' : '5%', opacity: 0, scale: 0.98 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 hero-parallax-layer"
          style={{ y: scrollY }}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover scale-110"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Layer 2: Gradient overlay with subtle mouse parallax ── */}
      <motion.div
        className="absolute inset-0 hero-parallax-layer"
        style={{
          x: useTransformValue(mouseX, -4, 4),
          y: useTransformValue(mouseY, -4, 4),
          background: 'linear-gradient(to bottom, rgba(13,51,48,0.35) 0%, rgba(13,51,48,0.55) 50%, rgba(13,51,48,0.80) 100%)',
        }}
      />

      {/* ── Layer 3: Decorative vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(13,51,48,0.5) 100%)',
        }}
      />

      {/* ── Layer 3.5: Subtle Golden Ambient Dust Shimmer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {[
          { top: '22%', left: '12%', size: 4, dur: 4.2, delay: 0 },
          { top: '38%', left: '88%', size: 5, dur: 5.1, delay: 0.8 },
          { top: '68%', left: '22%', size: 3, dur: 4.6, delay: 1.8 },
          { top: '78%', left: '76%', size: 4, dur: 6.0, delay: 0.4 },
          { top: '48%', left: '52%', size: 3, dur: 5.4, delay: 1.2 },
          { top: '16%', left: '62%', size: 5, dur: 4.4, delay: 2.0 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#ffd875] blur-[1px]"
            style={{
              top: pt.top,
              left: pt.left,
              width: pt.size,
              height: pt.size,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.75, 0.15],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: pt.dur,
              delay: pt.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Layer 4: Content with depth offset on mouse move ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current + '-content'}
            initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(2px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
            style={{
              x: useTransformValue(mouseX, -6, 6),
              y: useTransformValue(mouseY, -6, 6),
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label mb-4"
            >
              {slide.label}
            </motion.p>
            <h1
              className="text-white font-bold mb-5 leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {slide.title.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '115%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.12 + wIdx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
            >
              {slide.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {/* Primary Online Booking CTA */}
              <motion.button
                onClick={() => openBooking()}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="btn-gold-shimmer flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold px-8 py-3.5 rounded transition-colors duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/30 cursor-pointer"
              >
                Book Online <ArrowRight size={16} />
              </motion.button>
              {/* Explore Rooms CTA */}
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link
                  to="/rooms"
                  className="flex items-center gap-2 border border-white/60 hover:border-[#c9a84c] text-white hover:text-[#c9a84c] px-8 py-3.5 rounded transition-all duration-300"
                >
                  Our Rooms
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-400 rounded-full ${i === current ? 'w-8 h-2 bg-[#c9a84c]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/40 hover:border-[#c9a84c] hover:bg-[#c9a84c]/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/40 hover:border-[#c9a84c] hover:bg-[#c9a84c]/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </section>
  )
}

// Helper: use a motion value with transform range for simpler inline usage
function useTransformValue(motionVal, from, to) {
  return useTransform(motionVal, [-15, 15], [from, to])
}

// ─────────────────────────────────────────────
// ABOUT SECTION — Scroll-based depth reveal
// ─────────────────────────────────────────────
function AboutSection() {
  const { ref: leftRef, isInView: leftIn } = useScrollReveal()
  const { ref: rightRef, isInView: rightIn } = useScrollReveal()

  return (
    <section className="bg-[#1a4740] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            ref={leftRef}
            variants={slideLeft}
            initial="hidden"
            animate={leftIn ? 'visible' : 'hidden'}
          >
            <p className="section-label mb-3">About Sonajhuri</p>
            <div className="gold-line" />
            <h2
              className="text-white mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              A Tranquil Escape<br />By The Sea
            </h2>
            <p className="text-white/70 leading-relaxed mb-5">
              Nestled in the heart of New Digha, Hotel Sonajhuri is a peaceful coastal retreat designed for relaxation and comfort. Surrounded by serene landscapes and just moments from the shore, we offer a refined experience where warm hospitality meets modern elegance.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Whether you're here for a quiet getaway or an adventurous seaside escape, Sonajhuri welcomes you to unwind in style.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Link
                  to="/rooms"
                  className="btn-gold-shimmer flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold px-6 py-3 rounded transition-colors duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/25"
                >
                  Book Room
                </Link>
              </motion.div>
              <a href="tel:09332656724" className="flex items-center gap-3 text-white/80 hover:text-[#c9a84c] transition-colors duration-200">
                <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-[#c9a84c] transition-all duration-300 group-hover:scale-110">
                  <Phone size={16} />
                </span>
                <span className="font-medium">093326-56724</span>
              </a>
            </div>
          </motion.div>

          {/* Right images — staggered depth reveal */}
          <motion.div
            ref={rightRef}
            variants={slideRight}
            initial="hidden"
            animate={rightIn ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="grid grid-cols-5 gap-4 h-80 lg:h-96">
              {/* Main image — subtle depth lift on hover */}
              <motion.div
                className="col-span-3 overflow-hidden rounded-lg group"
                whileHover={{ scale: 1.02, rotateY: -1, z: 10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={heroPoolImg}
                  alt="Hotel Sonajhuri Rooftop Pool"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </motion.div>
              {/* Secondary image — offset lift */}
              <motion.div
                className="col-span-2 overflow-hidden rounded-lg group"
                whileHover={{ scale: 1.02, rotateY: 1, z: 10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={realRoomImg}
                  alt="Hotel Sonajhuri Family Room"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </motion.div>
            </div>
            {/* Floating badge — gentle levitation with luxury gold aura */}
            <div className="absolute -bottom-5 -left-4 bg-[#c9a84c] text-[#0d3330] rounded-lg p-4 shadow-xl hidden sm:block float-badge gold-aura-glow cursor-default">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <div className="font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Trusted Hotel</div>
              <div className="text-xs opacity-80">New Digha</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// AMENITIES STRIP — Staggered icon entrance
// ─────────────────────────────────────────────
function AmenitiesStrip() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="bg-[#0d3330] py-10 border-y border-[#c9a84c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-3 md:grid-cols-6 gap-6"
        >
          {amenities.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center gap-2 text-center group"
            >
              <motion.div
                className="w-12 h-12 rounded-full border border-[#c9a84c]/40 flex items-center justify-center group-hover:bg-[#c9a84c]/10 group-hover:border-[#c9a84c] transition-all duration-300"
                whileHover={{ scale: 1.15, rotateZ: 5 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
              >
                <Icon size={20} className="text-[#c9a84c]" />
              </motion.div>
              <span className="text-white/70 text-xs font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ROOMS SECTION
// ─────────────────────────────────────────────
function RoomsSection() {
  const { ref: titleRef, isInView: titleIn } = useScrollReveal()

  return (
    <section className="bg-[#1a4740] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          ref={titleRef}
          variants={fadeUp}
          initial="hidden"
          animate={titleIn ? 'visible' : 'hidden'}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="section-label mb-3">Hotel Sonajhuri</p>
            <div className="gold-line" />
            <h2
              className="text-white font-bold"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Rooms &amp; Suites
            </h2>
          </div>
          <Link to="/rooms" className="text-[#c9a84c] hover:text-[#d4b870] text-sm font-medium flex items-center gap-2 transition-colors duration-200 group">
            View All Rooms <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, i) => <RoomCard key={room.name} room={room} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ROOM CARD — 3D Tilt + Gold Shimmer
// ─────────────────────────────────────────────
function RoomCard({ room, index }) {
  const { ref: revealRef, isInView } = useScrollReveal()
  const { openBooking } = useBooking()
  const tilt = use3DTilt({ maxTilt: 8, scale: 1.03 })
  const shineRef = useRef(null)

  // Track mouse for CSS shine variable
  const handleMouseMove = (e) => {
    tilt.onMouseMove(e)
    if (!shineRef.current) return
    const rect = tilt.ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    shineRef.current.style.setProperty('--shine-x', `${x}%`)
    shineRef.current.style.setProperty('--shine-y', `${y}%`)
  }

  return (
    <motion.div
      ref={revealRef}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="perspective-scene"
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        onTouchEnd={tilt.onTouchEnd}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.scale,
        }}
        className="tilt-card group relative overflow-hidden rounded-xl bg-[#0d3330] depth-shadow cursor-default"
      >
        {/* Gold shimmer layer */}
        <div ref={shineRef} className="tilt-card-shine" />

        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={room.img}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3330] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {room.name}
          </h3>
          <p className="text-white/60 text-sm mb-4">{room.desc}</p>
          <div className="flex flex-wrap gap-3 mb-5">
            {room.features.map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-white/50 text-xs">
                <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                {f}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openBooking({ roomType: room.name })}
            className="flex items-center gap-2 text-[#c9a84c] text-sm font-medium hover:text-[#d4b870] transition-colors duration-200 group/btn cursor-pointer"
          >
            Book Now <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SERVICES SECTION — Perspective image gallery
// ─────────────────────────────────────────────
function ServicesSection() {
  const { ref: titleRef, isInView: titleIn } = useScrollReveal()

  return (
    <section className="bg-[#0d3330] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          variants={fadeUp}
          initial="hidden"
          animate={titleIn ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Comfort &amp; Relax</p>
          <div className="gold-line mx-auto" />
          <h2
            className="text-white font-bold"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Our Exclusive Service
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => <ServiceCard key={s.label} service={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const { ref, isInView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[3/4]"
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <img
        src={service.img}
        alt={service.label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d3330]/90 via-[#0d3330]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="text-white font-semibold text-lg leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {service.label}
        </h3>
        <div className="w-8 h-0.5 bg-[#c9a84c] mt-2 group-hover:w-16 transition-all duration-400" />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// STATS SECTION — Interactive Count-Up Animation
// ─────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '', isInView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1600
    const startTime = performance.now()

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    const frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, value])

  return (
    <span>{count}{suffix}</span>
  )
}

function StatsSection() {
  const { ref, isInView } = useScrollReveal()

  const stats = [
    { value: 50, suffix: '+', label: 'Premium Rooms' },
    { value: 5, suffix: '★', label: 'Guest Rating' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '%', label: 'Guest Satisfaction' },
  ]

  return (
    <section className="bg-[#c9a84c] py-16 relative overflow-hidden">
      {/* Decorative luxury wave watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#0d3330_1px,transparent_1px)] [background-size:16px_16px]" />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            whileHover={{ scale: 1.06, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="p-4 rounded-xl cursor-default transition-all duration-300 hover:bg-[#d4b870]/40"
          >
            <div
              className="text-[#0d3330] font-bold mb-1 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)' }}
            >
              <AnimatedCounter value={s.value} suffix={s.suffix} isInView={isInView} />
            </div>
            <div className="text-[#0d3330]/80 text-sm font-semibold tracking-wider uppercase">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────
// TESTIMONIALS SECTION — Luxury Carousel with Floating Quotes
// ─────────────────────────────────────────────
const testimonials = [
  {
    quote: "Hotel Sonajhuri exceeded all our expectations! The rooftop pool has an amazing open breeze, and the rooms are so clean with lovely warm lighting. The front desk staff treated us like family.",
    author: "Anirban Mukherjee",
    location: "Kolkata, WB",
    stay: "Family Vacation",
    highlight: "Rooftop Swimming Pool & Warm Hospitality",
  },
  {
    quote: "Best coastal retreat in New Digha! The authentic Bengali feast with Hilsa fish was unforgettable. Just minutes from the sea yet completely serene, quiet and peaceful at night.",
    author: "Poulomi Chatterjee",
    location: "Howrah, WB",
    stay: "Weekend Escape",
    highlight: "Delicious Bengali Cuisine & Calm Location",
  },
  {
    quote: "A truly tranquil escape. The rooftop garden at night with fairy lights is breathtakingly romantic. Direct booking process was seamless and hospitable. We will definitely visit again!",
    author: "Debabrata Sen",
    location: "Burdwan, WB",
    stay: "Couple Holiday",
    highlight: "Illuminated Terrace Garden & Booking Ease",
  },
]

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const { ref, isInView } = useScrollReveal()

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [active])

  const next = () => {
    setDirection(1)
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const item = testimonials[active]

  return (
    <section className="bg-[#0d3330] py-20 lg:py-28 relative overflow-hidden border-t border-[#c9a84c]/20">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#1a4740]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 mb-3">
            <Sparkles size={13} className="text-[#ffd875]" />
            <span className="text-[11px] font-semibold text-[#ffd875] tracking-widest uppercase">Guest Experiences</span>
          </div>
          <h2
            className="text-white font-bold"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Words From Our Guests
          </h2>
          <div className="gold-line mx-auto" />
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative bg-[#1a4740]/90 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-[#c9a84c]/25 shadow-2xl depth-shadow">
          {/* Large decorative quotation mark */}
          <div className="absolute top-6 left-8 text-[#c9a84c]/15 pointer-events-none">
            <Quote size={80} />
          </div>

          <div className="relative z-10 min-h-[200px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction * 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 35 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.div
                      key={s}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: s * 0.08, type: 'spring', stiffness: 400 }}
                    >
                      <Star size={18} className="text-[#ffd875] fill-[#ffd875]" />
                    </motion.div>
                  ))}
                  <span className="text-white/60 text-xs ml-2 font-medium">Verified 5.0 Stay</span>
                </div>

                <p
                  className="text-white/95 text-lg sm:text-2xl italic leading-relaxed font-light"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  "{item.quote}"
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-[#ffd875] font-semibold text-base sm:text-lg tracking-wide">
                      {item.author}
                    </h4>
                    <p className="text-white/60 text-xs sm:text-sm">
                      {item.location} • <span className="text-white/80">{item.stay}</span>
                    </p>
                  </div>
                  <span className="inline-block text-xs text-[#c9a84c] bg-[#0d3330] border border-[#c9a84c]/30 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons and Dots */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > active ? 1 : -1)
                      setActive(i)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-[#c9a84c]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c9a84c] hover:bg-[#c9a84c] text-white hover:text-[#0d3330] flex items-center justify-center transition-all duration-200 cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c9a84c] hover:bg-[#c9a84c] text-white hover:text-[#0d3330] flex items-center justify-center transition-all duration-200 cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// CTA SECTION — Parallax background image
// ─────────────────────────────────────────────
function CtaSection() {
  const { ref: sectionRef, isInView } = useScrollReveal()
  const { openBooking } = useBooking()
  const ctaScrollRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: ctaScrollRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ctaScrollRef} className="relative py-28 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=70&auto=format&fit=crop"
          alt="Hotel pool"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0d3330]/75" />
      <motion.div
        ref={sectionRef}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-3xl mx-auto px-4 text-center"
      >
        <p className="section-label mb-4">Book Your Stay</p>
        <div className="gold-line mx-auto" />
        <h2
          className="text-white font-bold mb-4"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Begin Your Coastal Journey
        </h2>
        <p className="text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
          Experience the warmth of our hospitality and the charm of New Digha's coastline. Reserve your room today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            onClick={() => openBooking()}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="btn-gold-shimmer flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold px-8 py-4 rounded transition-colors duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/30 cursor-pointer"
          >
            Book Your Room <ArrowRight size={16} />
          </motion.button>
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
            <a
              href="tel:09332656724"
              className="flex items-center gap-2 border border-white/60 hover:border-[#c9a84c] text-white hover:text-[#c9a84c] px-8 py-4 rounded transition-all duration-300"
            >
              <Phone size={16} /> Call Now
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────
// LOCATION SECTION
// ─────────────────────────────────────────────
function LocationSection() {
  const { ref: textRef, isInView: textIn } = useScrollReveal()

  return (
    <section className="bg-[#1a4740] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={textRef}
            variants={slideLeft}
            initial="hidden"
            animate={textIn ? 'visible' : 'hidden'}
          >
            <p className="section-label mb-3">Find Us</p>
            <div className="gold-line" />
            <h2
              className="text-white font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Located in the Heart<br />of New Digha
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Hotel Sonajhuri is conveniently located in New Digha, East Midnapore, West Bengal — just steps away from the beach and all major attractions. Easily accessible from Kolkata and other nearby cities.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                  <span className="absolute inset-0 rounded-full bg-[#c9a84c] opacity-35 animate-ping pointer-events-none" />
                  <MapPin size={16} className="text-[#c9a84c] relative z-10" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Address</div>
                  <div className="text-white/60 text-sm mt-0.5">New Digha, East Midnapore, West Bengal, India</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Phone</div>
                  <a href="tel:09332656724" className="text-white/60 text-sm mt-0.5 hover:text-[#c9a84c] transition-colors">093326-56724</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map with depth frame */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={textIn ? 'visible' : 'hidden'}
            className="rounded-xl overflow-hidden h-80 lg:h-96 relative depth-shadow"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Hotel+Sonajhuri+-+New+Digha&ll=21.6237715,87.5005749&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Hotel Sonajhuri - New Digha Location"
              className="grayscale-[20%] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <a
              href="https://www.google.com/maps/place/Hotel+Sonajhuri+-+New+Digha/@21.623772,87.500575,2023m/data=!3m1!1e3!4m9!3m8!1s0x3a1ccd9d53a3686b:0x33ccb78e3f360935!5m2!4m1!1i2!8m2!3d21.6237715!4d87.5005749!16s%2Fg%2F11ss2w0bhk"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-[#0d3330]/90 hover:bg-[#c9a84c] text-white hover:text-[#0d3330] border border-[#c9a84c]/50 text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 shadow-md font-medium"
            >
              Open in Google Maps ↗
            </a>
            <div className="absolute inset-0 ring-2 ring-[#c9a84c]/30 rounded-xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <AmenitiesStrip />
      <RoomsSection />
      <ServicesSection />
      <NearbyPlacesSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <LocationSection />
    </main>
  )
}
