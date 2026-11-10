import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Phone, 
  Star, 
  BedDouble, 
  UtensilsCrossed, 
  Waves, 
  Palmtree, 
  Headset, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import heroPoolImg from '../assets/sonajhuri-pool-hero.jpg'
import roomImg from '../assets/gallery/room-family-double-bed.jpg'
import deluxeRoomImg from '../assets/gallery/room-deluxe-luxury-new.jpg'
import diningImg from '../assets/offers-02.jpg'
import poolImg from '../assets/sonajhuri-pool-hero.jpg'
import gardenImg from '../assets/gallery/rooftop-garden-terrace.jpg'
import receptionImg from '../assets/gallery/sonajhuri-reception.png'

gsap.registerPlugin(ScrollTrigger)

// Botanical Palm Frond for Coastal Luxury Aesthetic
function CoastalPalmSVG({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 220C40 180 80 120 180 30M180 30C150 45 120 50 90 40M180 30C165 60 160 90 170 120M140 70C115 80 90 75 70 60M140 70C130 95 135 120 150 145M105 110C85 115 65 110 50 95M105 110C95 130 100 155 115 175M75 150C60 155 45 150 35 140M75 150C70 165 75 180 85 195"
        stroke="#D6A93D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
      />
    </svg>
  )
}

const amenitiesData = [
  {
    id: 'premium-rooms',
    icon: BedDouble,
    title: 'Premium Rooms',
    desc: 'Bespoke Comfort',
    img: deluxeRoomImg,
  },
  {
    id: 'delicious-dining',
    icon: UtensilsCrossed,
    title: 'Delicious Dining',
    desc: 'Coastal Flavors',
    img: diningImg,
  },
  {
    id: 'rooftop-pool',
    icon: Waves,
    title: 'Rooftop Pool',
    desc: 'Panoramic Azure',
    img: poolImg,
  },
  {
    id: 'serene-view',
    icon: Palmtree,
    title: 'Serene View',
    desc: 'Seaside Serenity',
    img: gardenImg,
  },
  {
    id: '24-7-support',
    icon: Headset,
    title: '24/7 Support',
    desc: 'Attentive Care',
    img: receptionImg,
  },
]

export default function AboutSonajhuriSection() {
  const sectionRef = useRef(null)
  const contentColRef = useRef(null)
  const labelRef = useRef(null)
  const headingWordsRef = useRef([])
  const dividerLineRef = useRef(null)
  const paragraph1Ref = useRef(null)
  const paragraph2Ref = useRef(null)
  const actionsRef = useRef(null)

  // Right Side Image Refs
  const imageCompositionRef = useRef(null)
  const mainImageWrapperRef = useRef(null)
  const mainImageRef = useRef(null)
  const secondImageWrapperRef = useRef(null)
  const secondImageRef = useRef(null)
  const floatingBadgeRef = useRef(null)

  // Amenities Ref
  const amenitiesBarRef = useRef(null)
  const amenityItemsRef = useRef([])

  // Decorative Botanical Background Refs
  const botanicalTopRef = useRef(null)
  const botanicalBottomRef = useRef(null)

  const { openBooking } = useBooking()

  // Active amenity state for the showcase matching 2nd reference screenshot
  const [activeAmenityIdx, setActiveAmenityIdx] = useState(0)
  const handleNextAmenity = () => setActiveAmenityIdx((prev) => (prev + 1) % amenitiesData.length)
  const handlePrevAmenity = () => setActiveAmenityIdx((prev) => (prev - 1 + amenitiesData.length) % amenitiesData.length)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback for reduced motion
        gsap.set(
          [
            labelRef.current,
            headingWordsRef.current,
            dividerLineRef.current,
            paragraph1Ref.current,
            paragraph2Ref.current,
            actionsRef.current,
            mainImageWrapperRef.current,
            secondImageWrapperRef.current,
            floatingBadgeRef.current,
            amenitiesBarRef.current,
            amenityItemsRef.current,
          ],
          { opacity: 1, y: 0, x: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1 }
        )
        return
      }

      // ─────────────────────────────────────────────
      // 1. LEFT CONTENT STAGGERED ENTRANCE
      // ─────────────────────────────────────────────
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: contentColRef.current,
          start: 'top 82%',
          once: true,
        },
      })

      // Label reveal
      contentTl.fromTo(
        labelRef.current,
        { opacity: 0, y: 18, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.9, ease: 'power3.out' }
      )

      // Split words reveal in heading
      contentTl.fromTo(
        headingWordsRef.current,
        { opacity: 0, y: 35, rotateX: 25 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.55'
      )

      // Golden decorative line expansion
      contentTl.fromTo(
        dividerLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, transformOrigin: 'left center', duration: 0.95, ease: 'power2.out' },
        '-=0.45'
      )

      // Paragraphs stagger fade-up
      contentTl.fromTo(
        [paragraph1Ref.current, paragraph2Ref.current],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      )

      // Actions & Reservation info
      contentTl.fromTo(
        actionsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.45'
      )

      // ─────────────────────────────────────────────
      // 2. CINEMATIC RIGHT-SIDE IMAGE REVEAL & PARALLAX
      // ─────────────────────────────────────────────
      // Main Pool Image clip-path reveal
      gsap.fromTo(
        mainImageWrapperRef.current,
        {
          opacity: 0,
          scale: 0.94,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.35,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imageCompositionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Main image subtle scroll parallax scrub
      gsap.fromTo(
        mainImageRef.current,
        { yPercent: -5, scale: 1.08 },
        {
          yPercent: 5,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: imageCompositionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )

      // Secondary Room Image entry with subtle horizontal depth
      gsap.fromTo(
        secondImageWrapperRef.current,
        {
          opacity: 0,
          x: 45,
          y: 35,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageCompositionRef.current,
            start: 'top 78%',
            once: true,
          },
        }
      )

      // Secondary image parallax scrub (counters main image for multidimensional depth)
      gsap.fromTo(
        secondImageRef.current,
        { yPercent: 6, scale: 1.07 },
        {
          yPercent: -6,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: imageCompositionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      // ─────────────────────────────────────────────
      // 3. FLOATING TRUST BADGE CONTINUOUS SINE WAVE
      // ─────────────────────────────────────────────
      if (floatingBadgeRef.current) {
        // Entrance
        gsap.fromTo(
          floatingBadgeRef.current,
          { opacity: 0, scale: 0.75, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.0,
            delay: 0.5,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: imageCompositionRef.current,
              start: 'top 75%',
              once: true,
            },
            onComplete: () => {
              // Gentle perpetual floating wave
              gsap.to(floatingBadgeRef.current, {
                y: -8,
                rotationZ: 0.5,
                duration: 2.8,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
              })
            },
          }
        )
      }

      // ─────────────────────────────────────────────
      // 4. BOTTOM AMENITIES BAR ENTRANCE
      // ─────────────────────────────────────────────
      const amenitiesTl = gsap.timeline({
        scrollTrigger: {
          trigger: amenitiesBarRef.current,
          start: 'top 88%',
          once: true,
        },
      })

      amenitiesTl.fromTo(
        amenitiesBarRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      )

      amenitiesTl.fromTo(
        amenityItemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
        },
        '-=0.55'
      )

      // ─────────────────────────────────────────────
      // 5. GENTLE BOTANICAL BACKGROUND DRIFT
      // ─────────────────────────────────────────────
      if (botanicalTopRef.current) {
        gsap.to(botanicalTopRef.current, {
          y: 12,
          rotation: 3,
          duration: 7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
      if (botanicalBottomRef.current) {
        gsap.to(botanicalBottomRef.current, {
          y: -14,
          rotation: -2.5,
          duration: 8.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ─────────────────────────────────────────────
  // 3D TILT HOVER FOR IMAGE COMPOSITION (DESKTOP)
  // ─────────────────────────────────────────────
  const handleMouseMove = (e) => {
    if (!imageCompositionRef.current || window.matchMedia('(hover: none)').matches) return
    const rect = imageCompositionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const tiltX = (y / (rect.height / 2)) * -6
    const tiltY = (x / (rect.width / 2)) * 6

    gsap.to(mainImageWrapperRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    })

    gsap.to(secondImageWrapperRef.current, {
      rotateX: tiltX * 1.3,
      rotateY: tiltY * 1.3,
      x: (x / (rect.width / 2)) * 8,
      y: (y / (rect.height / 2)) * 8,
      duration: 0.7,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    if (!imageCompositionRef.current || window.matchMedia('(hover: none)').matches) return
    gsap.to([mainImageWrapperRef.current, secondImageWrapperRef.current], {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#10243A] via-[#0B1B2B] to-[#10243A] py-24 sm:py-28 lg:py-32 overflow-hidden text-[#FFFFFF]"
      style={{ willChange: 'transform' }}
    >
      {/* ── AMBIENT BACKGROUND GLOW & BOTANICALS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Gold Aura */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6A93D]/7 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#0B1B2B]/60 rounded-full blur-[120px]" />

        {/* Ambient Botanical Palm vector line illustrations */}
        <div
          ref={botanicalTopRef}
          className="absolute -top-10 -left-12 w-64 h-80 opacity-20 hidden md:block"
        >
          <CoastalPalmSVG className="w-full h-full" />
        </div>
        <div
          ref={botanicalBottomRef}
          className="absolute -bottom-16 -right-16 w-80 h-96 opacity-20 hidden lg:block rotate-180"
        >
          <CoastalPalmSVG className="w-full h-full" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* ── TOP TWO-COLUMN COMPOSITION: CONTENT & CINEMATIC IMAGES ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20 lg:mb-24">
          
          {/* ─────────────────────────────────────────
              LEFT SIDE: CONTENT AREA (5 cols lg)
             ───────────────────────────────────────── */}
          <div ref={contentColRef} className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            
            {/* Small uppercase label */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#D6A93D]" />
              <p
                ref={labelRef}
                className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D6A93D] drop-shadow-sm"
              >
                ABOUT SONAJHURI
              </p>
              <Sparkles size={13} className="text-[#D6A93D]/80 animate-pulse" />
            </div>

            {/* Main Editorial Heading */}
            <h2
              className="text-[#F8F5EB] font-serif mb-5 leading-[1.12] tracking-tight"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2.15rem, 4.2vw, 3.4rem)',
              }}
            >
              <span className="block overflow-hidden">
                <span
                  ref={(el) => (headingWordsRef.current[0] = el)}
                  className="inline-block mr-2"
                >
                  A
                </span>
                <span
                  ref={(el) => (headingWordsRef.current[1] = el)}
                  className="inline-block mr-2"
                >
                  Tranquil
                </span>
                <span
                  ref={(el) => (headingWordsRef.current[2] = el)}
                  className="inline-block"
                >
                  Escape
                </span>
              </span>
              <span className="block overflow-hidden mt-1">
                <span
                  ref={(el) => (headingWordsRef.current[3] = el)}
                  className="inline-block mr-2"
                >
                  By
                </span>
                <span
                  ref={(el) => (headingWordsRef.current[4] = el)}
                  className="inline-block mr-2"
                >
                  The
                </span>
                <span
                  ref={(el) => (headingWordsRef.current[5] = el)}
                  className="inline-block text-[#D6AD46] drop-shadow-[0_2px_12px_rgba(214,173,70,0.35)] relative"
                >
                  Sea
                </span>
              </span>
            </h2>

            {/* Animated Golden Decorative Divider */}
            <div
              ref={dividerLineRef}
              className="relative w-36 h-[2px] mb-8 origin-left"
              style={{
                background: 'linear-gradient(90deg, #D6AD46 0%, #F5D77F 50%, rgba(214, 173, 70, 0.1) 100%)',
              }}
            >
              <span className="absolute -top-[3px] left-10 w-2 h-2 rotate-45 bg-[#D6AD46] shadow-[0_0_8px_#D6AD46]" />
            </div>

            {/* Existing Authentic Descriptions */}
            <p
              ref={paragraph1Ref}
              className="text-[#F8F5EB]/85 font-light leading-relaxed text-sm sm:text-base mb-4 drop-shadow-sm"
            >
              Nestled in the heart of New Digha, Hotel Sonajhuri is a peaceful coastal retreat designed for relaxation and comfort. Surrounded by serene landscapes and just moments from the shore, we offer a refined experience where warm hospitality meets modern elegance.
            </p>

            <p
              ref={paragraph2Ref}
              className="text-[#F8F5EB]/75 font-light leading-relaxed text-sm sm:text-base mb-8 drop-shadow-sm"
            >
              Whether you&apos;re here for a quiet getaway or an adventurous seaside escape, Sonajhuri welcomes you to unwind in style.
            </p>

            {/* CTAs & Reservation Contact */}
            <div
              ref={actionsRef}
              className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2"
            >
              {/* Premium Golden "Book Room" Button */}
              <button
                type="button"
                onClick={() => openBooking()}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-[#040E1B] overflow-hidden cursor-pointer shadow-lg shadow-[#D6AD46]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D6AD46]/40 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #F5D77F 0%, #D6AD46 50%, #B38C2B 100%)',
                }}
              >
                {/* Diagonal Light Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/30 transform -skew-x-12 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
                <span className="relative z-10 flex items-center gap-2">
                  Book Room
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              {/* Reservation Phone Interaction */}
              <a
                href="tel:09332656724"
                className="group flex items-center gap-3.5 transition-colors duration-200"
                aria-label="Call Hotel Sonajhuri for reservation"
              >
                <div className="w-11 h-11 rounded-full border border-[#D6AD46]/40 bg-[#07182B]/70 flex items-center justify-center text-[#D6AD46] transition-all duration-300 group-hover:border-[#D6AD46] group-hover:bg-[#D6AD46] group-hover:text-[#040E1B] group-hover:scale-105 shadow-md shadow-[#040E1B]/60">
                  <Phone size={17} className="transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D6AD46] font-medium opacity-90">
                    Call for Reservation
                  </span>
                  <span className="text-base sm:text-lg font-serif tracking-wide text-[#F8F5EB] group-hover:text-[#D6AD46] transition-colors duration-200">
                    093326-56724
                  </span>
                </div>
              </a>
            </div>

          </div>

          {/* ─────────────────────────────────────────
              RIGHT SIDE: ASYMMETRIC CINEMATIC IMAGES (7 cols lg)
             ───────────────────────────────────────── */}
          <div
            ref={imageCompositionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 xl:col-span-7 relative pt-4 lg:pt-0"
            style={{ perspective: 1200 }}
          >
            <div className="relative w-full max-w-lg lg:max-w-none mx-auto grid grid-cols-12 items-center">
              
              {/* ── MAIN IMAGE: Rooftop Swimming Pool (~65% width) ── */}
              <div
                ref={mainImageWrapperRef}
                className="col-span-9 sm:col-span-8 relative rounded-2xl overflow-hidden border border-[#D6AD46]/40 shadow-2xl shadow-[#040E1B]/90 group transition-all duration-300"
                style={{
                  height: 'clamp(320px, 42vw, 460px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Background Image with Parallax & Hover Zoom */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    ref={mainImageRef}
                    src={heroPoolImg}
                    alt="Hotel Sonajhuri Rooftop Swimming Pool with Pergola"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Subtle dark gradient overlay & gold sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040E1B]/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6AD46]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#D6AD46]/30 pointer-events-none" />

                {/* Pool Caption Strip */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-[#F8F5EB]/90 bg-[#040E1B]/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#D6AD46]/25">
                  <span className="font-serif italic tracking-wide">Rooftop Swimming Pool</span>
                  <span className="text-[#D6AD46] text-[10px] uppercase tracking-wider font-semibold">Panoramic View</span>
                </div>
              </div>

              {/* ── SECONDARY IMAGE: Hotel Room Photo (Offset & Overlapping) ── */}
              <div
                ref={secondImageWrapperRef}
                className="col-span-6 sm:col-span-5 absolute -right-2 sm:-right-4 bottom-2 sm:-bottom-4 z-20 rounded-2xl overflow-hidden border border-[#D6AD46]/45 shadow-2xl shadow-[#040E1B] group"
                style={{
                  height: 'clamp(210px, 28vw, 320px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    ref={secondImageRef}
                    src={roomImg}
                    alt="Hotel Sonajhuri Family Room with warm ambiance"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                </div>

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040E1B]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#D6AD46]/35 pointer-events-none" />

                {/* Room label overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-xs text-[#F8F5EB] bg-[#040E1B]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D6AD46]/20">
                  <p className="font-serif font-medium text-[12px] truncate">Family Double Bed</p>
                  <p className="text-[#D6AD46] text-[10px] tracking-wider uppercase">False Ceiling & AC</p>
                </div>
              </div>

              {/* ── FLOATING TRUST BADGE (Overlapping Pool Image) ── */}
              <div
                ref={floatingBadgeRef}
                className="absolute -top-4 sm:-top-6 left-3 sm:left-6 z-30 p-3.5 sm:p-4 rounded-xl shadow-2xl transition-all duration-300 cursor-default"
                style={{
                  background: 'linear-gradient(135deg, #F5D77F 0%, #D6AD46 60%, #B38C2B 100%)',
                  boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(214, 173, 70, 0.35)',
                }}
              >
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-1 text-[#040E1B]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      fill="#040E1B"
                      className="text-[#040E1B]"
                    />
                  ))}
                </div>
                {/* Badge Titles */}
                <div
                  className="font-bold text-xs sm:text-sm text-[#040E1B] leading-tight"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  Premium Stay
                </div>
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#040E1B]/85 mt-0.5">
                  in New Digha
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────
            5. OUR PREMIUM AMENITIES SHOWCASE (Exact Match to Reference Screenshot)
           ───────────────────────────────────────── */}
        <div
          ref={amenitiesBarRef}
          className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-8"
        >
          {/* Subtle Corner Botanical Accents */}
          <div className="absolute -top-10 -left-6 sm:-left-10 w-44 sm:w-56 h-auto opacity-30 pointer-events-none hidden md:block z-0">
            <CoastalPalmSVG className="w-full h-full transform -rotate-15" />
          </div>
          <div className="absolute bottom-16 -right-6 sm:-right-10 w-48 sm:w-64 h-auto opacity-30 pointer-events-none hidden md:block z-0">
            <CoastalPalmSVG className="w-full h-full transform rotate-165" />
          </div>

          {/* ── Section Header ── */}
          <div className="text-center mb-10 sm:mb-14 relative z-10">
            {/* Tagline */}
            <div className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#D6A93D] uppercase mb-3">
              <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#D6A93D]/70" />
              <span>HOTEL SONAJHURI</span>
              <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#D6A93D]/70" />
            </div>

            {/* Main Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-white tracking-tight"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              Our Premium <span className="text-[#D6A93D] italic">Amenities</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#D5D9DE] italic text-sm sm:text-base md:text-lg mt-2.5 font-serif max-w-xl mx-auto">
              Experience the perfect blend of luxury and comfort.
            </p>

            {/* Golden Diamond Divider */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#D6A93D]/50 to-[#D6A93D]" />
              <span className="w-2.5 h-2.5 rotate-45 border border-[#D6A93D] bg-[#D6A93D]/40 shadow-[0_0_8px_rgba(214,169,61,0.6)]" />
              <span className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#D6A93D]/50 to-[#D6A93D]" />
            </div>
          </div>

          {/* ── Connected 5-Cards Showcase ── */}
          <div className="relative w-full px-2 sm:px-6 lg:px-8">
            {/* Horizontal Golden Connecting Guide Line */}
            <div className="absolute top-[46%] left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D6A93D]/40 to-transparent pointer-events-none hidden lg:block z-0" />

            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrevAmenity}
              aria-label="Previous amenity"
              className="absolute -left-2 sm:-left-4 lg:-left-5 top-[46%] -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D6A93D]/60 bg-[#10243A]/90 backdrop-blur-md text-[#D6A93D] hover:bg-[#D6A93D] hover:text-[#10243A] flex items-center justify-center transition-all duration-300 shadow-xl shadow-black/60 hover:scale-110 z-30 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNextAmenity}
              aria-label="Next amenity"
              className="absolute -right-2 sm:-right-4 lg:-right-5 top-[46%] -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D6A93D]/60 bg-[#10243A]/90 backdrop-blur-md text-[#D6A93D] hover:bg-[#D6A93D] hover:text-[#10243A] flex items-center justify-center transition-all duration-300 shadow-xl shadow-black/60 hover:scale-110 z-30 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>

            {/* 5 Cards Row - Inactive cards are blurred, active clicked card is unblurred */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3.5 xl:gap-4 relative z-10">
              {amenitiesData.map((item, index) => {
                const Icon = item.icon
                const isActive = index === activeAmenityIdx

                return (
                  <div
                    key={item.id}
                    ref={(el) => (amenityItemsRef.current[index] = el)}
                    onClick={() => setActiveAmenityIdx(index)}
                    className={`group relative rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer select-none ${
                      isActive
                        ? 'border-2 border-[#D6A93D] bg-gradient-to-b from-[#142B40] via-[#0B1B2B] to-[#10243A] shadow-[0_0_30px_rgba(214,169,61,0.5),0_20px_35px_rgba(0,0,0,0.85)] scale-[1.03] -translate-y-2.5 z-20 opacity-100 filter-none'
                        : 'border border-[#D6A93D]/20 bg-gradient-to-b from-[#142B40]/70 via-[#0B1B2B]/80 to-[#10243A]/90 hover:border-[#D6A93D]/50 hover:opacity-80 scale-[0.98] z-10 opacity-45 blur-[3.5px] hover:blur-[1.5px]'
                    }`}
                    style={{ willChange: 'filter, transform, opacity' }}
                  >
                    {/* Active Top Golden Halo Line */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F2CE75] to-transparent z-10 shadow-[0_0_10px_#F2CE75]" />
                    )}

                    {/* Top Content Area */}
                    <div className="p-4 sm:p-5 flex flex-col items-center text-center">
                      {/* Circular Gold Icon Ring */}
                      <div
                        className={`relative w-14 h-14 sm:w-15 sm:h-15 rounded-full border flex items-center justify-center text-[#D6A93D] mb-3.5 transition-all duration-300 ${
                          isActive
                            ? 'border-2 border-[#D6A93D] bg-[#10243A] shadow-[0_0_16px_rgba(214,169,61,0.4)] scale-105'
                            : 'border-[#D6A93D]/45 bg-[#10243A]/80 group-hover:border-[#D6A93D] group-hover:scale-105'
                        }`}
                      >
                        <Icon size={24} className="transition-transform duration-300 group-hover:rotate-6" />
                      </div>

                      {/* Title */}
                      <h3
                        className="font-serif font-bold text-base sm:text-[17px] text-white tracking-wide mb-1 leading-snug"
                        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                      >
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-[13px] text-[#D6A93D] font-medium tracking-wide">
                        {item.desc}
                      </p>

                      {/* Gold Divider */}
                      <div className="w-8 h-px bg-[#D6A93D]/50 mt-3 mb-1" />
                    </div>

                    {/* Bottom Photograph */}
                    <div className="relative w-full aspect-[16/11] overflow-hidden rounded-b-[14px] mt-auto">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B]/85 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Minimalist Pagination Pills ── */}
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10 mb-4">
            {amenitiesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAmenityIdx(idx)}
                aria-label={`Go to amenity ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  idx === activeAmenityIdx
                    ? 'w-8 h-1.5 rounded-full bg-[#D6A93D] shadow-[0_0_10px_#D6A93D]'
                    : 'w-2 h-1.5 rounded-full bg-[#D6A93D]/35 hover:bg-[#D6A93D]/70'
                }`}
              />
            ))}
          </div>

          {/* ── Scroll To Explore with Animated Mouse Icon ── */}
          <div className="flex flex-col items-center justify-center mt-3 text-center">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#D6A93D]/90 mb-2">
              SCROLL TO EXPLORE
            </span>
            <div className="w-4 h-6 rounded-full border border-[#D6A93D]/70 flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-[#D6A93D] animate-bounce" />
            </div>
          </div>
        </div>

      </div>

      {/* ── BOTTOM CURVED WAVE DIVIDER ── */}
      <div className="w-full overflow-hidden leading-none -mb-24 sm:-mb-28 lg:-mb-32 mt-10 pointer-events-none relative z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-14 md:h-18"
        >
          {/* Solid Fill to merge seamlessly into next section */}
          <path
            d="M0,15 C300,90 900,90 1200,15 L1200,120 L0,120 Z"
            fill="#0B1B2B"
          />
          {/* Golden Stroke on the curve only */}
          <path
            d="M0,15 C300,90 900,90 1200,15"
            fill="none"
            stroke="#D6A93D"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  )
}
