import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import heroPoolImg from '../assets/sonajhuri-pool-hero.jpg'
import roomHeroImg from '../assets/gallery/room-family-double-bed.jpg'
import lawnHeroImg from '../assets/gallery/terrace-garden-night.png'

gsap.registerPlugin(ScrollTrigger)

// 3 Authentic Slides
const slides = [
  {
    id: 'pool',
    img: heroPoolImg,
    label: 'HOTEL SONAJHURI',
    titlePrefix: 'Hotel in ',
    highlight: 'New Digha',
    titleSuffix: '',
    subtitle: 'A tranquil escape by the sea — where comfort meets coastal elegance.',
  },
  {
    id: 'rooms',
    img: roomHeroImg,
    label: 'HOTEL SONAJHURI',
    titlePrefix: 'Rooms & ',
    highlight: 'Suites',
    titleSuffix: '',
    subtitle: 'Spacious, stylish, and perfect for a coastal getaway.',
  },
  {
    id: 'lawn',
    img: lawnHeroImg,
    label: 'HOTEL SONAJHURI',
    titlePrefix: 'Rooftop Pool & ',
    highlight: 'Lawn',
    titleSuffix: '',
    subtitle: 'Unwind at our rooftop pool with stunning sea-breeze views.',
  },
]

export default function CinematicHeroSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { openBooking } = useBooking()

  const heroContainerRef = useRef(null)
  const bgWrapperRef = useRef(null)
  const contentContainerRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaPrimaryRef = useRef(null)
  const ctaSecondaryRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  // ─────────────────────────────────────────────
  // SLIDER AUTOPLAY (6s, Pauses on interaction)
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (idx) => {
    setCurrent(idx)
  }

  // ─────────────────────────────────────────────
  // GSAP SCROLL-BASED BACKGROUND PARALLAX
  // ─────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !bgWrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(bgWrapperRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroContainerRef)

    return () => ctx.revert()
  }, [])

  // ─────────────────────────────────────────────
  // GSAP CONTENT ENTRANCE ON SLIDE CHANGE
  // ─────────────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(
        [
          labelRef.current,
          headingRef.current,
          subtitleRef.current,
          ctaPrimaryRef.current,
          ctaSecondaryRef.current,
        ],
        { opacity: 1, y: 0 }
      )
      return
    }

    const tl = gsap.timeline()

    // Label reveal
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: -12, letterSpacing: '0.35em' },
      { opacity: 1, y: 0, letterSpacing: '0.24em', duration: 0.7, ease: 'power3.out' }
    )

    // Heading words reveal
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.hero-word')
      tl.fromTo(
        words,
        { opacity: 0, y: 35, rotateX: 20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.45'
      )
    }

    // Subtitle reveal
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.45'
    )

    // CTA buttons sequential entrance
    tl.fromTo(
      [ctaPrimaryRef.current, ctaSecondaryRef.current],
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out' },
      '-=0.4'
    )
  }, [current])

  // Scroll indicator vertical pulse
  useEffect(() => {
    if (!scrollIndicatorRef.current) return
    const tween = gsap.to(scrollIndicatorRef.current, {
      y: 8,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => tween.kill()
  }, [])

  const slide = slides[current]

  return (
    <section
      ref={heroContainerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#032B25] text-[#F8F5EB]"
      aria-label="Hotel Sonajhuri Hero Showcase"
    >
      {/* ── BACKGROUND CAROUSEL WITH SMOOTH CROSSFADE & PARALLAX ── */}
      <div
        ref={bgWrapperRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none select-none"
      >
        {slides.map((s, index) => {
          const isActive = index === current
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={s.img}
                alt={s.highlight}
                className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-[6000ms] ease-out"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Sophisticated Dark Emerald & Forest Green Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(3, 43, 37, 0.42) 0%, rgba(6, 59, 50, 0.38) 45%, rgba(3, 43, 37, 0.82) 100%)',
                }}
              />

              {/* Edge Vignette for Text Focus & High Readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(3, 43, 37, 0.15) 0%, rgba(3, 43, 37, 0.65) 100%)',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* ── TOP SPACER TO OFFSET NAVBAR ── */}
      <div className="h-20 sm:h-24" />

      {/* ── MAIN CENTERED EDITORIAL HERO CONTENT ── */}
      <div
        ref={contentContainerRef}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-12"
      >
        {/* Small uppercase label */}
        <div
          ref={labelRef}
          className="inline-flex items-center justify-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D6AD46]" />
          <span className="text-xs uppercase tracking-[0.24em] font-medium text-[#D6AD46] drop-shadow-sm">
            {slide.label}
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D6AD46]" />
        </div>

        {/* Main Heading: Playfair Display Serif */}
        <h1
          ref={headingRef}
          className="text-[#F8F5EB] font-serif font-bold tracking-tight mb-5 leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(2.4rem, 6.2vw, 5.2rem)',
          }}
        >
          <span className="hero-word inline-block mr-2 sm:mr-3">
            {slide.titlePrefix}
          </span>
          <span className="hero-word inline-block text-[#D6AD46] drop-shadow-[0_2px_16px_rgba(214,173,70,0.4)]">
            {slide.highlight}
          </span>
          {slide.titleSuffix && (
            <span className="hero-word inline-block ml-2 sm:ml-3">
              {slide.titleSuffix}
            </span>
          )}
        </h1>

        {/* Static Antique Gold Divider with Center Diamond */}
        <div className="relative w-28 sm:w-36 h-px bg-gradient-to-r from-transparent via-[#D6AD46] to-transparent mx-auto mb-6">
          <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#D6AD46]" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[#F8F5EB]/90 font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-9 sm:mb-11 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          {slide.subtitle}
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary Button: Book Online → */}
          <button
            ref={ctaPrimaryRef}
            type="button"
            onClick={() => openBooking()}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base tracking-wider uppercase text-[#032B25] shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#D6AD46]/35 active:translate-y-0 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #F5D77F 0%, #D6AD46 50%, #C49B38 100%)',
            }}
            aria-label="Book Online at Hotel Sonajhuri"
          >
            <span>Book Online</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>

          {/* Secondary Button: Our Rooms */}
          <Link
            ref={ctaSecondaryRef}
            to="/rooms"
            className="group inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base tracking-wide text-[#F8F5EB] border border-white/50 hover:border-[#D6AD46] hover:text-[#D6AD46] bg-black/20 hover:bg-[#032B25]/60 backdrop-blur-sm transition-all duration-300 shadow-md"
            aria-label="View our luxury hotel rooms"
          >
            <span>Our Rooms</span>
          </Link>
        </div>
      </div>

      {/* ── CAROUSEL CONTROLS: PREV & NEXT ARROWS ── */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-12 h-11 sm:h-12 rounded-full border border-white/25 bg-[#032B25]/50 hover:bg-[#D6AD46] hover:text-[#032B25] hover:border-[#D6AD46] text-[#F8F5EB] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-12 h-11 sm:h-12 rounded-full border border-white/25 bg-[#032B25]/50 hover:bg-[#D6AD46] hover:text-[#032B25] hover:border-[#D6AD46] text-[#F8F5EB] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── 8. BOTTOM DECORATIVE DESIGN & CURVED SECTION DIVIDER ── */}
      <div className="relative z-20 w-full pt-6 pb-2">
        {/* Minimal Golden Pagination Indicators */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                i === current
                  ? 'w-9 h-1.5 bg-[#D6AD46] shadow-[0_0_8px_rgba(214,173,70,0.6)]'
                  : 'w-2.5 h-1.5 bg-white/35 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Minimal Centered Scroll Indicator */}
        <div className="flex flex-col items-center justify-center pb-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#F8F5EB]/65 mb-1.5 font-light">
            Scroll to explore
          </span>
          <div
            ref={scrollIndicatorRef}
            className="w-5 h-8 rounded-full border border-[#D6AD46]/50 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-[#D6AD46]" />
          </div>
        </div>

        {/* Sophisticated Curved Dark Emerald Section Divider */}
        <div className="relative w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-8 sm:h-12 lg:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Soft background curve matching #063B32 (About Sonajhuri section) */}
            <path
              d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
              fill="#063B32"
            />
            {/* Thin static antique gold curved hairline line */}
            <path
              d="M0,0 C300,90 900,90 1200,0"
              fill="none"
              stroke="#D6AD46"
              strokeWidth="1.5"
              strokeOpacity="0.45"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
