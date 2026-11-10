import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BedDouble,
  UtensilsCrossed,
  Waves,
  Compass,
  Headset,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Maximize2,
  CalendarCheck,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import roomImg from '../assets/gallery/room-deluxe-luxury-new.jpg'
import diningImg from '../assets/offers-02.jpg'
import poolImg from '../assets/sonajhuri-pool-hero.webp'
import seaViewImg from '../assets/gallery/rooftop-garden-terrace.jpg'
import supportImg from '../assets/gallery/sonajhuri-reception.png'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────
// 5 DISTINCT HOTEL FEATURES WITH EXPANDED LUXURY DETAILS
// ─────────────────────────────────────────────────────────
const features = [
  {
    id: '01',
    num: '01',
    title: 'Premium Rooms',
    category: 'ACCOMMODATION',
    badge: 'ACTIVE FEATURE',
    desc: 'Spacious, air-conditioned sanctuaries featuring warm ambient cove lighting, handcrafted wooden furnishings, and restful coastal comforts.',
    detailedDesc: 'Designed for supreme comfort and tranquil seaside living. Each room features premium teak wood wall paneling, warm ambient false-ceiling illumination, plush spring mattresses, silent split air-conditioning, attached modern bathroom with 24-hour hot water, and a cozy private balcony to relish the soothing sea breeze.',
    icon: BedDouble,
    img: roomImg,
    link: '/rooms',
    tag: 'Teak Paneling & Ambient Cove Lighting',
    tags: [
      'Teak Paneling & Ambient Cove Lighting',
      'Silent Split AC & 24x7 Power Backup',
      'Attached Bath with Instant Geyser',
      'Private Balcony & High-Speed Wi-Fi',
    ],
  },
  {
    id: '02',
    num: '02',
    title: 'Delicious Dining',
    category: 'GASTRONOMY',
    badge: 'ACTIVE FEATURE',
    desc: 'Fresh coastal catch and authentic regional Bengali delicacies, prepared daily with artisanal care and served in an elegant dining ambiance.',
    detailedDesc: 'Immerse yourself in authentic Bengal culinary heritage. Our in-house chefs craft celebrated regional specialties including iconic Hilsa (Ilish) preparations, giant tiger prawns (Chingri Malai Curry), Bhetki paturi, and fragrant Basmati rice thalis. Savor farm-fresh ingredients, local coastal spices, and fresh fish cooked to perfection.',
    icon: UtensilsCrossed,
    img: diningImg,
    link: '/gallery?category=Restaurant%20%26%20Cafe',
    tag: 'Authentic Bengali Feasts & Fresh Catch',
    tags: [
      'Authentic Bengali Thali & Seafood',
      'Seasonal Hilsa (Ilish) Specials',
      'Hygienic Kitchen & Artisanal Recipes',
      'In-Room Dining & Banquet Facilities',
    ],
  },
  {
    id: '03',
    num: '03',
    title: 'Rooftop Swimming Pool',
    category: 'SKY OASIS',
    badge: 'ACTIVE FEATURE',
    desc: 'Crystal azure waters on our open-air roof deck offering sweeping views of the horizon, soothing coastal breezes, and peaceful poolside relaxation.',
    detailedDesc: 'Perched high above New Digha, our rooftop swimming pool is a tranquil oasis under the open sky. Surrounded by natural bamboo walls, tropical planters, and comfortable outdoor loungers, guests can take an energizing morning dip or unwind with a refreshing drink while enjoying panoramic sunset vistas.',
    icon: Waves,
    img: poolImg,
    link: '/gallery?category=Pool',
    tag: 'Open-Air Sky Deck & Azure Water',
    tags: [
      'Filtered Crystal Azure Pool Waters',
      'Panoramic Open-Air Sunset Views',
      'Wooden Loungers & Bamboo Garden',
      'Evening Ambient Lighting & Music',
    ],
  },
  {
    id: '04',
    num: '04',
    title: 'Serene Sea View',
    category: 'TRANQUILITY',
    badge: 'ACTIVE FEATURE',
    desc: 'Unwind with panoramic coastal vistas, natural bamboo terrace greenery, and gentle ocean sea breezes at morning dawn and starlit twilight.',
    detailedDesc: 'Located in a serene enclave of New Digha away from crowded commercial avenues, Hotel Sonajhuri offers a peaceful retreat by the sea. Relax on the illuminated open-air terrace lawn, bask in natural sea winds, and stargaze under calm coastal night skies for complete rejuvenation.',
    icon: Compass,
    img: seaViewImg,
    link: '/gallery?category=Garden',
    tag: 'Bamboo Garden & Panoramic Vistas',
    tags: [
      'Minutes Away from New Digha Beach',
      'Lush Rooftop Garden & Bamboo Wall',
      'Open-Air Terrace Lounge & Seating',
      'Starry Twilight & Morning Breezes',
    ],
  },
  {
    id: '05',
    num: '05',
    title: '24/7 Guest Support',
    category: 'CONCIERGE',
    badge: 'ACTIVE FEATURE',
    desc: 'Dedicated round-the-clock concierge and reception assistance to ensure every detail of your seaside vacation is seamless and effortless.',
    detailedDesc: 'From express check-in and round-the-clock room assistance to arranging reliable local sightseeing cabs, beach transport, and custom dining orders, our attentive hospitality team is on duty 24 hours a day to provide hospitable, caring, and memorable coastal service.',
    icon: Headset,
    img: supportImg,
    link: '/contact',
    tag: 'Round-The-Clock Dedicated Hospitality',
    tags: [
      '24x7 Front Desk & Concierge',
      'Local Sightseeing & Cab Assistance',
      'Express Check-in & Luggage Care',
      'Daily Housekeeping & Prompt Service',
    ],
  },
]

export default function ExclusiveServices() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const { openBooking } = useBooking()

  // ─────────────────────────────────────────────────────────
  // AUTOPLAY: Slow graceful cycle when not interacting (7s) & not expanded
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isHovered || isExpanded) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [isHovered, isExpanded])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % features.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  // Wheel scroll interaction: scroll down lifts cards up, scroll up brings them back down
  const lastScrollTime = useRef(0)
  const handleWheel = (e) => {
    if (isExpanded) return
    const now = Date.now()
    if (now - lastScrollTime.current < 420) return

    if (e.deltaY > 15) {
      // Scrolling down -> card flies UP one by one!
      lastScrollTime.current = now
      handleNext()
    } else if (e.deltaY < -15) {
      // Scrolling up -> card returns back DOWN!
      lastScrollTime.current = now
      handlePrev()
    }
  }

  // Keyboard navigation while expanded
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
      } else if (e.key === 'ArrowRight' && isExpanded) {
        handleNext()
      } else if (e.key === 'ArrowLeft' && isExpanded) {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Calculate 3D Layered Card Stack transform per card
  const getCardStyle = (diff) => {
    // diff === 0: Front active card
    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        zIndex: 40,
        filter: 'drop-shadow(0 25px 40px rgba(3, 11, 20, 0.9))',
        pointerEvents: 'auto',
      }
    }
    // diff === 1: First card behind (subtle offset right & down, smaller scale)
    if (diff === 1) {
      return {
        x: 36,
        y: 12,
        scale: 0.93,
        rotate: 2.2,
        opacity: 0.88,
        zIndex: 30,
        filter: 'drop-shadow(0 18px 30px rgba(3, 11, 20, 0.75))',
        pointerEvents: 'auto',
      }
    }
    // diff === 2: Second card behind (offset further, smaller scale, lower opacity)
    if (diff === 2) {
      return {
        x: 72,
        y: 24,
        scale: 0.86,
        rotate: 4.5,
        opacity: 0.60,
        zIndex: 20,
        filter: 'drop-shadow(0 12px 24px rgba(3, 11, 20, 0.6))',
        pointerEvents: 'auto',
      }
    }
    // diff === 3: Third card behind (deepest layered paper-stack edge)
    if (diff === 3) {
      return {
        x: 104,
        y: 36,
        scale: 0.80,
        rotate: 6.8,
        opacity: 0.32,
        zIndex: 10,
        filter: 'drop-shadow(0 8px 18px rgba(3, 11, 20, 0.45))',
        pointerEvents: 'auto',
      }
    }
    // diff === 4: Card that has been scrolled/lifted UP!
    // It lifts and flies UP above the stack (-520px), and returns back down when scrolled down!
    return {
      x: -20,
      y: -520,
      scale: 0.92,
      rotate: -5,
      opacity: 0,
      zIndex: 50,
      filter: 'none',
      pointerEvents: 'none',
    }
  }

  const currentFeature = features[activeIndex]

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#10243A] py-24 lg:py-32 overflow-hidden border-t border-[#D6A93D]/20 text-[#FFFFFF]"
      aria-label="Hotel Sonajhuri Features and Experiences"
    >
      {/* ── Ambient Luxury Radial Gradient & Mesh Glow ── */}
      <div className="absolute inset-0 bg-radial-gradient from-[#142B40] via-[#10243A] to-[#040E1B] opacity-95 pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#D6A93D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#D6A93D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ═══════════════════════════════════════════════════════════
                STANDARD EDITORIAL 3D STACKED VIEW (COLLAPSED)
            ═══════════════════════════════════════════════════════════ */
            <motion.div
              key="stacked-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
            >
              {/* ─────────────────────────────────────────────────────────
                  LEFT COLUMN: EDITORIAL HEADING & SLIDER NAVIGATION
              ───────────────────────────────────────────────────────── */}
              <div ref={headerRef} className="lg:col-span-5 flex flex-col justify-between">
                {/* Small uppercase label */}
                <div className="inline-flex items-center gap-2.5 mb-3.5">
                  <Sparkles size={13} className="text-[#D6A93D]" />
                  <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D6A93D]">
                    HOTEL SONAJHURI
                  </p>
                </div>

                {/* Main Editorial Serif Heading */}
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFFFF] mb-5 leading-[1.14]"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  Curated Luxury <br className="hidden sm:block" />
                  <span className="text-[#D6A93D] font-serif italic font-normal">&amp;</span> Experiences
                </h2>

                {/* Antique Gold Divider Line with Diamond Center */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[#D6A93D] to-[#FFFFFF]" />
                  <div className="w-2 h-2 rotate-45 bg-[#D6A93D] shadow-[0_0_8px_rgba(214,173,85,0.8)]" />
                  <div className="w-8 h-[1px] bg-[#D6A93D]/50" />
                </div>

                <p className="text-[#AEB8C5] text-sm sm:text-base leading-relaxed font-light mb-8 max-w-md">
                  From peaceful ocean-breeze retreats to rooftop relaxation and authentic coastal cuisine, discover what makes your stay at Hotel Sonajhuri an unforgettable getaway.
                </p>

                {/* Current Active Counter */}
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="text-3xl font-bold text-[#D6A93D] font-mono tracking-wider"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {currentFeature.num}
                  </span>
                  <span className="text-[#AEB8C5]/50 font-mono text-sm">/ 05</span>
                  <span className="h-px flex-1 max-w-[80px] bg-[#D6A93D]/30 ml-2" />
                  <span className="text-xs uppercase tracking-widest text-[#AEB8C5] font-medium">
                    {currentFeature.category}
                  </span>
                </div>

                {/* Interactive Feature Jump Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-10">
                  {features.map((feat, fIdx) => (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => setActiveIndex(fIdx)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                        fIdx === activeIndex
                          ? 'bg-[#D6A93D] text-[#10243A] font-semibold shadow-md shadow-[#D6A93D]/30 scale-105'
                          : 'bg-[#142B40] border border-[#D6A93D]/20 text-[#AEB8C5] hover:text-[#FFFFFF] hover:border-[#D6A93D]/50'
                      }`}
                      aria-label={`Jump to feature ${feat.title}`}
                    >
                      {feat.num} {feat.title}
                    </button>
                  ))}
                </div>

                {/* Slider Navigation Arrows (Prev & Next) */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full border border-[#D6A93D]/40 hover:border-[#D6A93D] bg-[#142B40]/80 hover:bg-[#D6A93D] text-[#FFFFFF] hover:text-[#10243A] flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                    aria-label="Previous hotel feature card"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full border border-[#D6A93D]/40 hover:border-[#D6A93D] bg-[#142B40]/80 hover:bg-[#D6A93D] text-[#FFFFFF] hover:text-[#10243A] flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                    aria-label="Next hotel feature card"
                  >
                    <ChevronRight size={22} />
                  </button>

                  {/* Minimal Dot Indicators */}
                  <div className="flex items-center gap-2 ml-4">
                    {features.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setActiveIndex(dotIdx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          dotIdx === activeIndex
                            ? 'w-7 h-1.5 bg-[#D6A93D]'
                            : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────
                  RIGHT COLUMN: 3D STACKED LAYERED PAPER-STACK CARD SLIDER
              ───────────────────────────────────────────────────────── */}
              <div
                className="lg:col-span-7 flex flex-col items-center lg:items-end justify-center"
                onWheel={handleWheel}
              >
                {/* Visual hint above the stack */}
                <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] flex items-center justify-between text-[11px] font-semibold text-[#D6A93D]/80 uppercase tracking-widest mb-3 px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A93D] animate-pulse" />
                    Scroll to flip stack
                  </span>
                  <span>Click any card to expand</span>
                </div>

                <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] h-[520px] sm:h-[550px]">
                  {features.map((feature, index) => {
                    const diff = (index - activeIndex + features.length) % features.length
                    const isFront = diff === 0
                    const IconComponent = feature.icon

                    return (
                      <motion.div
                        key={feature.id}
                        animate={getCardStyle(diff)}
                        transition={{
                          type: 'spring',
                          stiffness: 240,
                          damping: 24,
                          mass: 0.85,
                        }}
                        drag={isFront ? true : false}
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.25}
                        onDragEnd={(e, { offset, velocity }) => {
                          if (offset.y < -50 || velocity.y < -350 || offset.x < -60 || velocity.x < -400) {
                            handleNext()
                          } else if (offset.y > 50 || velocity.y > 350 || offset.x > 60 || velocity.x > 400) {
                            handlePrev()
                          }
                        }}
                        onClick={() => {
                          setActiveIndex(index)
                          setIsExpanded(true)
                        }}
                        className="absolute inset-0 select-none will-change-transform cursor-pointer group"
                        role="region"
                        aria-label={`${feature.title} stacked card`}
                      >
                        {/* ── CARD CONTAINER (LAYERED PAPER-STACK WITH GOLD ACCENTS) ── */}
                        <div className="relative w-full h-full rounded-3xl bg-[#142B40] border border-[#D6A93D]/35 hover:border-[#D6A93D] overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-2xl">
                          {/* ── TOP SECTION: CINEMATIC RECTANGULAR PHOTOGRAPH ── */}
                          <div className="relative h-[270px] sm:h-[290px] w-full overflow-hidden bg-[#0B1B2B]">
                            <img
                              src={feature.img}
                              alt={feature.title}
                              className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-108"
                              loading="lazy"
                            />

                            {/* Subtle Dark Navy Gradient Blend at Bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#142B40] via-[#142B40]/30 to-transparent opacity-95 pointer-events-none" />

                            {/* Top-Left: Small Numbered Badge */}
                            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1B2B]/85 backdrop-blur-md border border-[#D6A93D]/40 text-[#D6A93D] font-mono text-xs font-semibold shadow">
                              <span>FEATURE {feature.num}</span>
                            </div>

                            {/* Click to expand hover hint on front card */}
                            {isFront && (
                              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#D6A93D] text-[#10243A] text-[11px] font-bold uppercase tracking-wider shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-1.5 scale-95 group-hover:scale-100 shrink-0 whitespace-nowrap">
                                <Maximize2 size={12} />
                                <span>Click to expand</span>
                              </div>
                            )}

                            {/* Top-Right: Elegant Gold Icon Circle */}
                            <div className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-[#0B1B2B]/85 backdrop-blur-md border border-[#D6A93D]/50 flex items-center justify-center text-[#D6A93D] shadow-lg shadow-[#0B1B2B]/80">
                              <IconComponent size={19} strokeWidth={1.8} />
                            </div>

                            {/* Category Tag on Image Lower Left */}
                            <div className="absolute bottom-3 left-6 z-10">
                              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D6A93D]">
                                {feature.category}
                              </span>
                            </div>
                          </div>

                          {/* ── BOTTOM SECTION: EDITORIAL CONTENT & EXPLORE MORE LINK ── */}
                          <div className="relative z-10 p-6 sm:p-7 pt-2 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#142B40] to-[#10243A]">
                            <div>
                              {/* Large Serif Heading */}
                              <h3
                                className="text-2xl sm:text-[1.7rem] font-bold text-[#FFFFFF] group-hover:text-[#D6A93D] transition-colors duration-300 leading-tight mb-3"
                                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                              >
                                {feature.title}
                              </h3>

                              {/* Short Description */}
                              <p className="text-[#AEB8C5] text-sm leading-relaxed font-light line-clamp-3 mb-4">
                                {feature.desc}
                              </p>

                              {/* Subtle Feature Highlight Chip */}
                              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FFFFFF]/80 bg-[#0B1B2B]/70 border border-[#D6A93D]/20 px-3 py-1 rounded-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D6A93D]" />
                                <span>{feature.tag}</span>
                              </div>
                            </div>

                            {/* ── CLICKABLE "EXPLORE MORE" ACTION ROW ── */}
                            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveIndex(index)
                                  setIsExpanded(true)
                                }}
                                className="group/link inline-flex items-center gap-2 text-[#D6A93D] hover:text-[#FFFFFF] text-xs uppercase font-semibold tracking-widest transition-colors duration-300 cursor-pointer"
                                aria-label={`Expand details for ${feature.title}`}
                              >
                                <span className="relative">
                                  Explore Details
                                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#D6A93D] group-hover/link:w-full transition-all duration-300" />
                                </span>
                                <ArrowRight
                                  size={14}
                                  className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                                />
                              </button>

                              {/* Instant Booking Trigger */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (isFront) {
                                    openBooking({ roomType: feature.title })
                                  } else {
                                    setActiveIndex(index)
                                  }
                                }}
                                className="text-[11px] uppercase tracking-wider text-[#AEB8C5]/80 hover:text-[#D6A93D] transition-colors cursor-pointer font-medium"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ═══════════════════════════════════════════════════════════
                EXPANDED DETAILED SHOWCASE VIEW (Dedicated Single Card View)
            ═══════════════════════════════════════════════════════════ */
            <motion.div
              key="expanded-view"
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: 'spring', stiffness: 240, damping: 25 }}
              className="relative w-full max-w-5xl mx-auto py-2"
            >
              {/* ── THE LARGE EXPANDED CARD (Only Selected Card Shown) ── */}
              <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#0C223C] via-[#08182B] to-[#040F1D] border-2 border-[#D6A93D]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(214,173,85,0.2)] p-6 sm:p-10 lg:p-12 overflow-hidden">
                {/* Subtle Ambient Gold Hairline Glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F2CE75] to-transparent pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* LEFT DETAILS COLUMN (lg:col-span-7) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top Row: Number — Category & Active Badge + Close X */}
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-lg sm:text-xl font-bold text-[#D6A93D] font-mono tracking-wider"
                            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                          >
                            {currentFeature.num}
                          </span>
                          <span className="w-8 sm:w-12 h-px bg-[#D6A93D]/60" />
                          <span className="text-xs sm:text-[13px] uppercase tracking-[0.22em] font-semibold text-[#D6A93D]">
                            {currentFeature.category}
                          </span>
                        </div>

                        {/* Top-Right Badge & Close Button */}
                        <div className="flex items-center gap-2.5">
                          <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-[#D6A93D]/15 border border-[#D6A93D]/40 text-[#D6A93D] shrink-0">
                            {currentFeature.badge}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            title="Click to return to stack"
                            className="w-8 h-8 rounded-full bg-[#10243A]/85 border border-[#D6A93D]/40 text-[#D6A93D] hover:bg-[#D6A93D] hover:text-[#10243A] flex items-center justify-center transition-all duration-300 shadow cursor-pointer"
                            aria-label="Close and return to stack"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Main Large Heading */}
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight uppercase leading-tight mt-2 mb-4"
                        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                      >
                        {currentFeature.title}
                      </h3>

                      {/* Short Lead Summary */}
                      <p className="text-[#E2E8F0] text-sm sm:text-base leading-relaxed font-light mb-5 max-w-xl">
                        {currentFeature.desc}
                      </p>

                      {/* Thin Horizontal Divider Line */}
                      <div className="w-full h-px bg-[#D6A93D]/30 my-5" />

                      {/* Detailed Extended Description */}
                      <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed font-light mb-6">
                        {currentFeature.detailedDesc}
                      </p>

                      {/* Multiple Feature Highlight Tags / Pills */}
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
                        {currentFeature.tags.map((tagText, tIdx) => (
                          <div
                            key={tIdx}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[#0B1B2B]/80 border border-[#D6A93D]/30 text-[#FFFFFF]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A93D]" />
                            <span>{tagText}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-4 border-t border-[#D6A93D]/20 flex flex-wrap items-center justify-between gap-4">
                      {/* Click to collapse ^ */}
                      <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D6A93D] hover:text-white transition-colors cursor-pointer py-1"
                      >
                        <span>Click to return to stack</span>
                        <ChevronUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
                      </button>

                      {/* Direct Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Link
                          to={currentFeature.link}
                          className="px-4 py-2 rounded-full border border-[#D6A93D]/50 hover:border-[#D6A93D] bg-[#10243A] text-[#D6A93D] hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                        >
                          Explore Page ↗
                        </Link>
                        <button
                          type="button"
                          onClick={() => openBooking({ roomType: currentFeature.title })}
                          className="px-5 py-2 rounded-full bg-[#D6A93D] hover:bg-[#F2CE75] text-[#10243A] text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#D6A93D]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PHOTOGRAPH COLUMN (lg:col-span-5) */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div
                      onClick={() => setIsExpanded(false)}
                      title="Click photo to return to stack"
                      className="relative w-full h-[280px] sm:h-[350px] lg:h-[420px] rounded-2xl overflow-hidden border border-[#D6A93D]/40 shadow-2xl bg-[#0B1B2B] group cursor-pointer"
                    >
                      <img
                        src={currentFeature.img}
                        alt={currentFeature.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B]/75 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Click-to-return hint */}
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0B1B2B]/85 backdrop-blur-md border border-[#D6A93D]/40 text-[#D6A93D] text-xs font-semibold shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5">
                        <X size={12} />
                        <span>Click to return to stack</span>
                      </div>

                      {/* Floating Category Tag */}
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0B1B2B]/85 backdrop-blur-md border border-[#D6A93D]/40 text-[#D6A93D] font-mono text-xs font-semibold shadow">
                        <span>FEATURE {currentFeature.num}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
