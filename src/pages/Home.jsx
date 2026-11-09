import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Wifi, Car, Coffee, Waves, Tv, Zap, Phone, MapPin, Quote, Sparkles } from 'lucide-react'
import { useScrollReveal, fadeUp, slideLeft, slideRight, staggerContainer } from '../hooks/useScrollReveal'
import { use3DTilt, useMouseParallax, useParallaxScroll } from '../hooks/use3DEffects'
import NearbyPlacesSection from '../components/NearbyPlacesSection'
import ExclusiveServices from '../components/ExclusiveServices'
import RoomsAndSuitesSection from '../components/RoomsAndSuitesSection'
import AboutSonajhuriSection from '../components/AboutSonajhuriSection'
import BookYourStayCtaSection from '../components/BookYourStayCtaSection'
import CinematicHeroSection from '../components/CinematicHeroSection'
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
// HERO SECTION — Replaced with Cinematic GSAP CinematicHeroSection
// ─────────────────────────────────────────────
function HeroSection() {
  return <CinematicHeroSection />
}

// ─────────────────────────────────────────────
// ABOUT SECTION — Replaced with Ultra-Premium GSAP AboutSonajhuriSection
// ─────────────────────────────────────────────
function AboutSection() {
  return <AboutSonajhuriSection />
}

// ─────────────────────────────────────────────
// ROOMS SECTION — Replaced with Ultra-Premium GSAP RoomsAndSuitesSection
// ─────────────────────────────────────────────
function RoomsSection() {
  return <RoomsAndSuitesSection />
}

// ─────────────────────────────────────────────
// SERVICES SECTION — Replaced with Cinematic GSAP ExclusiveServices
// ─────────────────────────────────────────────
function ServicesSection() {
  return <ExclusiveServices />
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
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#07182B_1px,transparent_1px)] [background-size:16px_16px]" />

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
              className="text-[#07182B] font-bold mb-1 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)' }}
            >
              <AnimatedCounter value={s.value} suffix={s.suffix} isInView={isInView} />
            </div>
            <div className="text-[#07182B]/80 text-sm font-semibold tracking-wider uppercase">{s.label}</div>
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
    <section className="bg-[#07182B] py-20 lg:py-28 relative overflow-hidden border-t border-[#c9a84c]/20">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#10243A]/40 rounded-full blur-3xl pointer-events-none" />

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
        <div className="relative bg-[#10243A]/90 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-[#c9a84c]/25 shadow-2xl depth-shadow">
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
                  <span className="inline-block text-xs text-[#c9a84c] bg-[#07182B] border border-[#c9a84c]/30 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
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
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c9a84c] hover:bg-[#c9a84c] text-white hover:text-[#07182B] flex items-center justify-center transition-all duration-200 cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#c9a84c] hover:bg-[#c9a84c] text-white hover:text-[#07182B] flex items-center justify-center transition-all duration-200 cursor-pointer"
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
// CTA SECTION — Replaced with Luxury GSAP BookYourStayCtaSection
// ─────────────────────────────────────────────
function CtaSection() {
  return <BookYourStayCtaSection />
}

// ─────────────────────────────────────────────
// LOCATION SECTION
// ─────────────────────────────────────────────
function LocationSection() {
  const { ref: textRef, isInView: textIn } = useScrollReveal()

  return (
    <section className="bg-[#10243A] py-20 lg:py-28">
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
              className="absolute bottom-3 right-3 bg-[#07182B]/90 hover:bg-[#c9a84c] text-white hover:text-[#07182B] border border-[#c9a84c]/50 text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 shadow-md font-medium"
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
