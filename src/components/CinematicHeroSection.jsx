import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import rooftopGardenHeroImg from '../assets/gallery/rooftop-garden-terrace.jpg'
import heroPoolImg from '../assets/sonajhuri-pool-hero.webp'
import roomHeroImg from '../assets/gallery/room-deluxe-twin.webp'

gsap.registerPlugin(ScrollTrigger)

// 3 Authentic Slides matching the luxury Midnight Navy & Champagne Gold direction
const slides = [
  {
    id: 'new-digha',
    img: rooftopGardenHeroImg,
    label: 'HOTEL SONAJHURI',
    titlePrefix: 'Hotel in ',
    highlight: 'New Digha',
    titleSuffix: '',
    subtitle: 'A tranquil coastal escape by the sea — where comfort meets timeless elegance.',
    objectPosition: 'center 40%',
  },
  {
    id: 'rooftop-pool-lawn',
    img: heroPoolImg,
    label: 'HOTEL SONAJHURI',
    titlePrefix: 'Rooftop Pool & ',
    highlight: 'Lawn',
    titleSuffix: '',
    subtitle: 'Unwind at our rooftop pool with stunning sea-breeze views.',
    objectPosition: 'center 85%',
    overlayGradient:
      'linear-gradient(180deg, rgba(7, 24, 43, 0.20) 0%, rgba(7, 24, 43, 0.32) 42%, rgba(7, 24, 43, 0.65) 100%)',
    vignetteGradient:
      'radial-gradient(ellipse at center, rgba(7, 24, 43, 0.04) 0%, rgba(7, 24, 43, 0.45) 100%)',
    contentOffset: 'translate-y-4 sm:translate-y-6 md:translate-y-10',
  },
  {
    id: 'rooms-suites',
    img: roomHeroImg,
    label: 'HOTEL SONAJHURI',
    titlePrefix: 'Rooms & ',
    highlight: 'Suites',
    titleSuffix: '',
    subtitle: 'Spacious, stylish, and curated for an unforgettable seaside retreat.',
    objectPosition: 'center 42%',
    overlayGradient:
      'linear-gradient(180deg, rgba(7, 24, 43, 0.20) 0%, rgba(7, 24, 43, 0.25) 45%, rgba(7, 24, 43, 0.55) 100%)',
    vignetteGradient:
      'radial-gradient(ellipse at center, rgba(7, 24, 43, 0.0) 0%, rgba(7, 24, 43, 0.38) 100%)',
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
  const dividerRef = useRef(null)
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
        yPercent: 16,
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
          dividerRef.current,
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
      { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.7, ease: 'power3.out' }
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

    // Gold diamond divider expansion
    tl.fromTo(
      dividerRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.65, ease: 'power2.out' },
      '-=0.4'
    )

    // Subtitle reveal
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )

    // CTA buttons sequential entrance
    tl.fromTo(
      [ctaPrimaryRef.current, ctaSecondaryRef.current],
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out' },
      '-=0.35'
    )
  }, [current])

  // Scroll indicator vertical movement
  useEffect(() => {
    if (!scrollIndicatorRef.current) return
    const tween = gsap.to(scrollIndicatorRef.current, {
      y: 7,
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
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#07182B] text-[#F8F4EA]"
      aria-label="Hotel Sonajhuri Luxury Hero Showcase"
    >
      {/* ── BACKGROUND CAROUSEL WITH LAYERED NAVY OVERLAY & PARALLAX ── */}
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
                className="w-full h-full object-cover scale-[1.02] brightness-[1.03] contrast-[1.06] transition-transform duration-[6000ms] ease-out"
                style={{ objectPosition: s.objectPosition || 'center center' }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Exact Layered Navy Overlay: subtle so room interior details, natural lighting & woodwork stay rich */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    s.overlayGradient ||
                    'linear-gradient(180deg, rgba(7, 24, 43, 0.28) 0%, rgba(7, 24, 43, 0.36) 45%, rgba(7, 24, 43, 0.70) 100%)',
                }}
              />

              {/* Subtle Edge Vignette for Text Focus & Natural Color Preservation */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    s.vignetteGradient ||
                    'radial-gradient(ellipse at center, rgba(7, 24, 43, 0.05) 0%, rgba(7, 24, 43, 0.50) 100%)',
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
        className={`relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-8 sm:py-12 transition-transform duration-700 ease-out ${
          slide.contentOffset || ''
        }`}
      >
        {/* Small uppercase label: — HOTEL SONAJHURI — */}
        <div
          ref={labelRef}
          className="inline-flex items-center justify-center gap-3 mb-4 sm:mb-5"
        >
          <span className="w-7 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#D6B875]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D6B875] drop-shadow-sm">
            {slide.label}
          </span>
          <span className="w-7 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#D6B875]" />
        </div>

        {/* Main Heading: Playfair Display Luxury Serif */}
        <h1
          ref={headingRef}
          className="text-[#F8F4EA] font-serif font-bold tracking-tight mb-5 leading-[1.12] drop-shadow-[0_4px_24px_rgba(7,24,43,0.9)]"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(2.5rem, 6.2vw, 5.2rem)',
          }}
        >
          <span className="hero-word inline-block mr-2 sm:mr-3">
            {slide.titlePrefix}
          </span>
          <span className="hero-word inline-block text-[#D6B875] drop-shadow-[0_2px_18px_rgba(214,184,117,0.45)]">
            {slide.highlight}
          </span>
          {slide.titleSuffix && (
            <span className="hero-word inline-block ml-2 sm:ml-3">
              {slide.titleSuffix}
            </span>
          )}
        </h1>

        {/* Decorative Gold Divider with Diamond-Shaped Center */}
        <div
          ref={dividerRef}
          className="relative w-32 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#D6B875] to-transparent mx-auto mb-6"
        >
          <span className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#D6B875] shadow-[0_0_8px_rgba(214,184,117,0.55)]" />
        </div>

        {/* Subtitle in Elegant Italic Serif */}
        <p
          ref={subtitleRef}
          className="text-[#F8F4EA]/90 font-serif italic text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-9 sm:mb-11 drop-shadow-[0_2px_14px_rgba(7,24,43,0.95)]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          {slide.subtitle}
        </p>

        {/* ── 5. PREMIUM CTA BUTTONS (CHAMPAGNE GOLD & NAVY) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary Button: BOOK ONLINE → */}
          <button
            ref={ctaPrimaryRef}
            type="button"
            onClick={() => openBooking()}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#07182B] shadow-xl shadow-[#07182B]/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#D6B875]/35 active:translate-y-0 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #F2D28B 0%, #D6B875 50%, #B8964E 100%)',
            }}
            aria-label="Book Online at Hotel Sonajhuri"
          >
            <span>BOOK ONLINE</span>
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>

          {/* Secondary Button: Our Rooms */}
          <Link
            ref={ctaSecondaryRef}
            to="/rooms"
            className="group inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm tracking-wider text-[#F8F4EA] border border-[#D6B875]/60 hover:border-[#D6B875] hover:text-[#F2D28B] bg-[#07182B]/45 hover:bg-[#D6B875]/15 backdrop-blur-sm transition-all duration-300 shadow-md"
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
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-12 h-11 sm:h-12 rounded-full border border-[#D6B875]/40 hover:border-[#D6B875] bg-[#07182B]/50 hover:bg-[#D6B875] hover:text-[#07182B] text-[#F8F4EA] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-12 h-11 sm:h-12 rounded-full border border-[#D6B875]/40 hover:border-[#D6B875] bg-[#07182B]/50 hover:bg-[#D6B875] hover:text-[#07182B] text-[#F8F4EA] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── 8. BOTTOM DECORATIVE DESIGN & CURVED WAVE SECTION DIVIDER ── */}
      <div className="relative z-20 w-full pt-6 pb-0">
        {/* Minimal Golden Pagination Indicators */}
        <div className="flex items-center justify-center gap-2.5 mb-5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                i === current
                  ? 'w-9 h-2 bg-[#D6B875] shadow-[0_0_10px_rgba(214,184,117,0.55)]'
                  : 'w-2.5 h-2.5 bg-white/35 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Centered Scroll Indicator */}
        <div className="flex flex-col items-center justify-center pb-5">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F8F4EA]/70 mb-1.5 font-light">
            SCROLL TO EXPLORE
          </span>
          <div
            ref={scrollIndicatorRef}
            className="w-5 h-8 rounded-full border border-[#D6B875]/60 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-[#D6B875]" />
          </div>
        </div>

        {/* Sophisticated Curved Wave Divider with Thin Champagne Gold Border */}
        <div className="relative w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-8 sm:h-12 lg:h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Smooth organic wave filled with deep midnight navy #07182B */}
            <path
              d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z"
              fill="#07182B"
            />
            {/* Thin static champagne-gold curved border */}
            <path
              d="M0,0 C300,90 900,90 1200,0"
              fill="none"
              stroke="#D6B875"
              strokeWidth="1.5"
              strokeOpacity="0.55"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
