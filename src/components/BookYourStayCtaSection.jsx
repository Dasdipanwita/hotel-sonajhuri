import { useEffect, useRef } from 'react'
import { ArrowRight, Phone, BedDouble, UtensilsCrossed, Waves, Compass, Clock, Star } from 'lucide-react'
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
        stroke="#D6AD46"
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
  const subtitleRef = useRef(null)
  const amenitiesContainerRef = useRef(null)
  const amenityItemsRef = useRef([])
  const ctaBtnRef = useRef(null)
  const phoneNoticeRef = useRef(null)
  const botanicalTopLeftRef = useRef(null)
  const botanicalBottomRightRef = useRef(null)

  const { openBooking } = useBooking()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback for users preferring reduced motion
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
      // 1. SUBTLE BACKGROUND IMAGE PARALLAX (Natural & Professional)
      // ─────────────────────────────────────────────
      gsap.fromTo(
        bgImageRef.current,
        { yPercent: -7, scale: 1.08 },
        {
          yPercent: 7,
          scale: 1.02,
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
      // 2. MAIN CONTENT STAGGERED REVEAL
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
      // 3. VERY GENTLE, MINIMAL FLOATING BOTANICALS (NON-FLASHY)
      // ─────────────────────────────────────────────
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
      className="relative py-24 sm:py-28 lg:py-32 overflow-hidden bg-[#032B25] text-[#F8F5EB]"
      style={{ willChange: 'transform' }}
    >
      {/* ── BACKGROUND BEDROOM IMAGE WITH PARALLAX ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src={bedroomHeroImg}
          alt="Hotel Sonajhuri Luxury Bedroom"
          className="w-full h-full object-cover object-center scale-110 brightness-95 contrast-[1.08]"
          loading="lazy"
        />

        {/* Balanced Emerald & Forest Green Overlay — Lightened so bedroom is clearly visible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 43, 37, 0.48) 0%, rgba(3, 43, 37, 0.38) 45%, rgba(3, 43, 37, 0.62) 100%)',
          }}
        />

        {/* Subtle Vignette at Edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(3, 43, 37, 0.15) 0%, rgba(3, 43, 37, 0.55) 100%)',
          }}
        />

        {/* Subtle static gold hairline borders at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6AD46]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6AD46]/40 to-transparent" />

        {/* Corner Botanical Decorations (Subtle, Minimal, Non-Flashy) */}
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
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D6AD46]" />
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#D6AD46]">
            HOTEL SONAJHURI
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D6AD46]" />
        </div>

        {/* Main Heading: Begin Your Coastal Journey */}
        <h2
          className="font-serif text-[#F8F5EB] mb-5 leading-[1.15] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
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
              className="inline-block text-[#D6AD46] drop-shadow-[0_2px_14px_rgba(214,173,70,0.45)] mr-2 sm:mr-3"
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

        {/* Static Antique Gold Divider with Center Diamond Ornament */}
        <div className="relative w-32 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#D6AD46] to-transparent mx-auto mb-6">
          <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#D6AD46]" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[#F8F5EB] font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
        >
          Experience luxury, comfort and warm hospitality at Hotel Sonajhuri.
        </p>

        {/* ── 4. AMENITIES HORIZONTAL LAYOUT ── */}
        <div
          ref={amenitiesContainerRef}
          className="relative max-w-4xl mx-auto mb-11 sm:mb-14 rounded-2xl border border-[#D6AD46]/30 bg-[#032B25]/75 backdrop-blur-md px-4 sm:px-6 py-5 sm:py-6 shadow-xl shadow-[#032B25]/80"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-0">
            {ctaAmenities.map((item, idx) => {
              const Icon = item.icon
              const isLast = idx === ctaAmenities.length - 1

              return (
                <div
                  key={item.label}
                  ref={(el) => (amenityItemsRef.current[idx] = el)}
                  className={`group flex flex-col items-center justify-center text-center px-2 sm:px-3 py-1 transition-all duration-300 hover:-translate-y-0.5 ${
                    !isLast ? 'lg:border-r lg:border-[#D6AD46]/25' : ''
                  }`}
                >
                  {/* Elegant Golden Line Icon */}
                  <div className="w-10 h-10 rounded-full border border-[#D6AD46]/35 bg-[#063B32]/60 flex items-center justify-center text-[#D6AD46] mb-2.5 transition-all duration-300 group-hover:border-[#D6AD46] group-hover:bg-[#D6AD46]/15 group-hover:scale-105">
                    <Icon size={18} className="transition-transform duration-300" />
                  </div>

                  {/* Clean Readable Typography */}
                  <span className="text-xs sm:text-sm font-medium text-[#F8F5EB] tracking-wide transition-colors duration-200 group-hover:text-[#D6AD46]">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── 5. PREMIUM CTA BUTTON & RESERVATION PHONE (REFINED & ACCESSIBLE) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Main Gold Pill CTA Button */}
          <button
            ref={ctaBtnRef}
            type="button"
            onClick={() => openBooking()}
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wider uppercase text-[#032B25] shadow-lg shadow-[#032B25]/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#D6AD46]/25 active:translate-y-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D6AD46] focus:ring-offset-2 focus:ring-offset-[#032B25]"
            style={{
              background: 'linear-gradient(135deg, #F5D77F 0%, #D6AD46 50%, #C49B38 100%)',
            }}
            aria-label="Book Your Stay at Hotel Sonajhuri"
          >
            <span>BOOK YOUR STAY</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </button>

          {/* Preserved Phone Reservation Action */}
          <a
            ref={phoneNoticeRef}
            href="tel:09332656724"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/30 hover:border-[#D6AD46] bg-[#032B25]/60 hover:bg-[#063B32] text-[#F8F5EB]/90 hover:text-[#D6AD46] text-sm font-medium transition-all duration-300 shadow-md shadow-[#032B25]/50 focus:outline-none focus:ring-2 focus:ring-[#D6AD46]"
            aria-label="Call Hotel Sonajhuri for direct booking"
          >
            <Phone size={15} className="text-[#D6AD46] transition-transform duration-300 group-hover:rotate-12" />
            <span>Call: 093326-56724</span>
          </a>
        </div>

      </div>
    </section>
  )
}
