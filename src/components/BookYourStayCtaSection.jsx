import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Phone, BedDouble, UtensilsCrossed, Waves, Compass, Clock } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import bedroomHeroImg from '../assets/gallery/room-family-double-bed.jpg'

gsap.registerPlugin(ScrollTrigger)

// Static Botanical Corner Palm Leaf Illustration
function CornerBotanicalSVG({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M10 150C30 110 70 60 150 10M150 10C125 25 100 30 75 22M150 10C135 35 130 60 140 85M115 45C95 55 75 50 60 38M115 45C108 65 112 85 125 105M85 80C70 85 55 80 42 70M85 80C78 95 82 115 95 130"
        stroke="#D6A93D"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  )
}

const ctaAmenities = [
  {
    icon: BedDouble,
    label: 'Premium Rooms',
  },
  {
    icon: UtensilsCrossed,
    label: 'Delicious Dining',
  },
  {
    icon: Waves,
    label: 'Rooftop Pool',
  },
  {
    icon: Compass,
    label: 'Serene View',
  },
  {
    icon: Clock,
    label: '24/7 Support',
  },
]

export default function BookYourStayCtaSection() {
  const sectionRef = useRef(null)
  const bgImageRef = useRef(null)
  const labelRef = useRef(null)
  const headingWordsRef = useRef([])
  const diamondRef = useRef(null)
  const subtitleRef = useRef(null)
  const amenitiesContainerRef = useRef(null)
  const amenityItemsRef = useRef([])
  const ctaBtnRef = useRef(null)
  const phoneNoticeRef = useRef(null)
  const botanicalTopLeftRef = useRef(null)
  const botanicalBottomRightRef = useRef(null)

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { openBooking } = useBooking()

  const handleMouseMove = (e) => {
    if (!amenitiesContainerRef.current) return
    const rect = amenitiesContainerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            headingWordsRef.current,
            subtitleRef.current,
            amenitiesContainerRef.current,
            amenityItemsRef.current,
            ctaBtnRef.current,
            phoneNoticeRef.current,
          ],
          { opacity: 1, y: 0 }
        )
        return
      }

      // ─────────────────────────────────────────────
      // 1. CINEMATIC BACKGROUND ZOOM & PARALLAX
      // ─────────────────────────────────────────────
      gsap.fromTo(
        bgImageRef.current,
        { yPercent: -6, scale: 1.05 },
        {
          yPercent: 6,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )

      // ─────────────────────────────────────────────
      // 2. MAIN CONTENT STAGGERED REVEAL (Word-by-Word)
      // ─────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      // Small uppercase label reveal
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 16, letterSpacing: '0.35em' },
        { opacity: 1, y: 0, letterSpacing: '0.22em', duration: 0.8, ease: 'power3.out' }
      )

      // Split words reveal for heading
      tl.fromTo(
        headingWordsRef.current,
        { opacity: 0, y: 35, rotateX: 20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
        },
        '-=0.45'
      )

      // Subtitle fade-up
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.45'
      )

      // Amenities container and items staggered entrance
      tl.fromTo(
        amenitiesContainerRef.current,
        { opacity: 0, y: 22, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      tl.fromTo(
        amenityItemsRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.55'
      )

      // CTA Button & Reservation hotline fade-up
      tl.fromTo(
        [ctaBtnRef.current, phoneNoticeRef.current],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' },
        '-=0.35'
      )

      // ─────────────────────────────────────────────
      // 3. CONTINUOUS ROTATING DIAMOND DIVIDER
      // ─────────────────────────────────────────────
      if (diamondRef.current) {
        gsap.to(diamondRef.current, {
          rotation: '+=360',
          duration: 12,
          repeat: -1,
          ease: 'linear',
        })
      }

      // Gentle Floating Botanicals
      if (botanicalTopLeftRef.current) {
        gsap.to(botanicalTopLeftRef.current, {
          y: 8,
          duration: 6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
      if (botanicalBottomRightRef.current) {
        gsap.to(botanicalBottomRightRef.current, {
          y: -8,
          duration: 7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-28 lg:py-32 overflow-hidden bg-[#10243A] text-[#FFFFFF]"
      style={{ willChange: 'transform' }}
    >
      {/* ── BACKGROUND BEDROOM IMAGE WITH PARALLAX ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src={bedroomHeroImg}
          alt="Hotel Sonajhuri Luxury Bedroom"
          className="w-full h-full object-cover object-center scale-105 brightness-95 contrast-[1.08]"
          loading="lazy"
        />

        {/* ── STRICT COLOR THEME: DEEP NAVY BLUE (#10243A & #0B1B2B) OVERLAY — ZERO GREEN ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(16, 36, 58, 0.78) 0%, rgba(11, 27, 43, 0.68) 45%, rgba(16, 36, 58, 0.90) 100%)',
          }}
        />

        {/* Deep Navy Subtle Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 36, 58, 0.18) 0%, rgba(11, 27, 43, 0.85) 100%)',
          }}
        />

        {/* Subtle Static Gold Hairline Borders at Top and Bottom */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6A93D]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6A93D]/40 to-transparent" />

        {/* ── DECORATIVE GOLDEN CORNER ACCENT LINES ── */}
        <div className="absolute top-6 left-6 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-[#D6A93D]/50 pointer-events-none" />
        <div className="absolute top-6 right-6 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-[#D6A93D]/50 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-[#D6A93D]/50 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-[#D6A93D]/50 pointer-events-none" />

        {/* ── FLOATING GOLDEN PARTICLES ── */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#F2CE75] animate-particle pointer-events-none"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${12 + (i * 7) % 76}%`,
              left: `${8 + (i * 11) % 84}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${5 + (i % 4)}s`,
              boxShadow: '0 0 8px rgba(242, 206, 117, 0.85)',
            }}
          />
        ))}

        {/* Corner Botanical Illustrations */}
        <div
          ref={botanicalTopLeftRef}
          className="absolute -top-6 -left-6 w-44 h-44 opacity-25 hidden sm:block"
        >
          <CornerBotanicalSVG className="w-full h-full" />
        </div>
        <div
          ref={botanicalBottomRightRef}
          className="absolute -bottom-8 -right-8 w-48 h-48 opacity-25 hidden sm:block rotate-180"
        >
          <CornerBotanicalSVG className="w-full h-full" />
        </div>
      </div>

      {/* ── MAIN CONTENT (PERFECTLY CENTERED WITH BALANCED SPACING) ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Small uppercase label */}
        <div
          ref={labelRef}
          className="inline-flex items-center justify-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D6A93D]" />
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#D6A93D]">
            HOTEL SONAJHURI
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D6A93D]" />
        </div>

        {/* Main Heading: Begin Your Coastal Journey */}
        <h2
          className="font-serif text-[#FFFFFF] mb-5 leading-[1.15] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(2.2rem, 4.8vw, 3.8rem)',
          }}
        >
          <span className="inline-block overflow-hidden">
            <span
              ref={(el) => (headingWordsRef.current[0] = el)}
              className="inline-block mr-2 sm:mr-3"
            >
              Begin
            </span>
            <span
              ref={(el) => (headingWordsRef.current[1] = el)}
              className="inline-block mr-2 sm:mr-3"
            >
              Your
            </span>
            <span
              ref={(el) => (headingWordsRef.current[2] = el)}
              className="inline-block bg-gradient-to-r from-[#D6A93D] via-[#F2CE75] to-[#D6A93D] bg-clip-text text-transparent font-serif italic drop-shadow-[0_2px_16px_rgba(214,169,61,0.55)] mr-2 sm:mr-3"
            >
              Coastal
            </span>
            <span
              ref={(el) => (headingWordsRef.current[3] = el)}
              className="inline-block"
            >
              Journey
            </span>
          </span>
        </h2>

        {/* Animated Golden Divider with Center Rotating Diamond Ornament */}
        <div className="relative w-36 sm:w-44 h-px bg-gradient-to-r from-transparent via-[#D6A93D] to-transparent mx-auto mb-6 flex items-center justify-center">
          <span
            ref={diamondRef}
            className="w-2.5 h-2.5 rotate-45 bg-[#D6A93D] shadow-[0_0_12px_rgba(214,169,61,0.85)] inline-block"
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[#D5D9DE] font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
        >
          Experience luxury, comfort and warm hospitality at Hotel Sonajhuri.
        </p>

        {/* ── 4. GLASSMORPHISM FEATURE CARDS WITH SOFT GOLD SPOTLIGHT ── */}
        <div
          ref={amenitiesContainerRef}
          onMouseMove={handleMouseMove}
          className="group/container relative max-w-4xl mx-auto mb-11 sm:mb-14 rounded-2xl border border-[#D6A93D]/30 bg-[#142B40]/80 backdrop-blur-md px-4 sm:px-6 py-5 sm:py-6 shadow-2xl shadow-[#0B1B2B]/90 overflow-hidden"
        >
          {/* Soft Golden Spotlight following mouse cursor */}
          <div
            className="absolute pointer-events-none -inset-px opacity-0 group-hover/container:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(214, 169, 61, 0.18), transparent 75%)`,
            }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-0 relative z-10">
            {ctaAmenities.map((item, idx) => {
              const Icon = item.icon
              const isLast = idx === ctaAmenities.length - 1

              return (
                <div
                  key={item.label}
                  ref={(el) => (amenityItemsRef.current[idx] = el)}
                  className={`group flex flex-col items-center justify-center text-center px-2 sm:px-3 py-1 transition-all duration-300 hover:-translate-y-1 ${
                    !isLast ? 'lg:border-r lg:border-[#D6A93D]/25' : ''
                  }`}
                >
                  {/* Elegant Golden Line Icon Container */}
                  <div className="w-11 h-11 rounded-full border border-[#D6A93D]/40 bg-[#10243A]/80 flex items-center justify-center text-[#D6A93D] mb-2.5 transition-all duration-300 group-hover:border-[#D6A93D] group-hover:bg-[#D6A93D]/20 group-hover:scale-110 shadow-md shadow-[#0B1B2B]">
                    <Icon size={19} className="transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Clean Readable Typography */}
                  <span className="text-xs sm:text-sm font-medium text-[#FFFFFF] tracking-wide transition-colors duration-200 group-hover:text-[#D6A93D]">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 5. PREMIUM CTA BUTTONS (BOOK YOUR STAY & PHONE HOTLINE) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Main Gold Pill CTA Button with Shimmer Wave */}
          <button
            ref={ctaBtnRef}
            type="button"
            onClick={() => openBooking()}
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wider uppercase text-[#10243A] shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D6A93D]/35 active:translate-y-0 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#D6A93D] focus:ring-offset-2 focus:ring-offset-[#10243A]"
            style={{
              background: 'linear-gradient(135deg, #F2CE75 0%, #D6A93D 50%, #B88928 100%)',
            }}
            aria-label="Book Your Stay at Hotel Sonajhuri"
          >
            {/* Golden Shimmer Wave */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer-gold pointer-events-none" />

            <span className="relative z-10 font-bold">BOOK YOUR STAY</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>

          {/* Preserved Phone Reservation Action with Navy Background & Golden Border */}
          <a
            ref={phoneNoticeRef}
            href="tel:09332656724"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#D6A93D]/50 hover:border-[#D6A93D] bg-[#142B40] hover:bg-[#10243A] text-[#FFFFFF] hover:text-[#F2CE75] text-sm font-medium transition-all duration-300 shadow-lg shadow-[#0B1B2B]/60 focus:outline-none focus:ring-2 focus:ring-[#D6A93D] cursor-pointer"
            aria-label="Call Hotel Sonajhuri for direct booking"
          >
            <Phone size={16} className="text-[#D6A93D] transition-transform duration-300 group-hover:rotate-12 animate-pulse" />
            <span>Call: 093326-56724</span>
          </a>
        </div>

      </div>
    </section>
  )
}
