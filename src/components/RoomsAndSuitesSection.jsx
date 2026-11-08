import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BedDouble, Maximize2, Coffee, Wind, Sun, Sparkles, Star } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import realRoomImg from '../assets/gallery/room-family-double-bed.jpg'
import realRoomTwinImg from '../assets/gallery/room-deluxe-twin.png'
import realRoomViewImg from '../assets/gallery/sonajhuri-room-view.png'

gsap.registerPlugin(ScrollTrigger)

// Botanical Palm Frond SVG Component for Luxury Resort Aesthetic
function BotanicalPalm({ className = '', style = {} }) {
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
        stroke="#c9a84c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
    </svg>
  )
}

const roomsData = [
  {
    id: 'super-deluxe',
    name: 'Super Deluxe Room',
    desc: 'Spacious family double bed room with false ceiling and warm ambiance.',
    img: realRoomImg,
    badge: 'Most Popular',
    features: [
      { icon: BedDouble, label: 'Double Bed' },
      { icon: Maximize2, label: '300 sq.ft.' },
      { icon: Coffee, label: 'Breakfast' },
    ],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    desc: 'Spacious, stylish twin bed setup with modern amenities.',
    img: realRoomTwinImg,
    badge: null,
    features: [
      { icon: BedDouble, label: 'Twin Bed' },
      { icon: Maximize2, label: '240 sq.ft.' },
      { icon: Wind, label: 'AC' },
    ],
  },
  {
    id: 'balcony-view',
    name: 'Balcony View Room',
    desc: 'Comfortable room featuring scenic balcony views.',
    img: realRoomViewImg,
    badge: null,
    features: [
      { icon: BedDouble, label: 'Queen Bed' },
      { icon: Maximize2, label: '220 sq.ft.' },
      { icon: Sun, label: 'Balcony' },
    ],
  },
]

export default function RoomsAndSuitesSection() {
  const sectionRef = useRef(null)
  const headerLabelRef = useRef(null)
  const headingWordsRef = useRef([])
  const goldDividerRef = useRef(null)
  const headerLinkRef = useRef(null)
  const cardsRef = useRef([])
  const imageWrappersRef = useRef([])
  const imagesRef = useRef([])
  const botanicalLeftRef = useRef(null)
  const botanicalRightRef = useRef(null)
  const { openBooking } = useBooking()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            headerLabelRef.current,
            goldDividerRef.current,
            headingWordsRef.current,
            headerLinkRef.current,
            cardsRef.current,
            imageWrappersRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, clipPath: 'none' }
        )
        return
      }

      // ─── 1. HEADER TIMELINE ───
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Small uppercase label
      headerTl.fromTo(
        headerLabelRef.current,
        { opacity: 0, y: -12, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.8, ease: 'power3.out' }
      )

      // Split heading words reveal from overflow-hidden mask
      headerTl.fromTo(
        headingWordsRef.current,
        { yPercent: 125, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power4.out',
        },
        '-=0.5'
      )

      // Golden decorative line expansion
      headerTl.fromTo(
        goldDividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )

      // "View All Rooms ->" link fade-in
      headerTl.fromTo(
        headerLinkRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )

      // ─── 2. STAGGERED CARDS ENTRANCE WITH CLIP-PATH IMAGE REVEAL ───
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      // Cards container staggered entrance
      cardsTl.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 65,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.16,
          ease: 'power3.out',
        }
      )

      // Smooth cinematic clip-path reveal for room images
      cardsTl.fromTo(
        imageWrappersRef.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.0,
          stagger: 0.14,
          ease: 'power3.inOut',
        },
        '-=0.8'
      )

      // ─── 3. SCROLL-BASED IMAGE PARALLAX ───
      imagesRef.current.forEach((img) => {
        if (!img) return
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
            },
          }
        )
      })

      // ─── 4. GENTLE FLOATING BOTANICAL MOTIFS ───
      if (botanicalLeftRef.current) {
        gsap.to(botanicalLeftRef.current, {
          y: -14,
          rotation: 3,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (botanicalRightRef.current) {
        gsap.to(botanicalRightRef.current, {
          y: -16,
          rotation: -4,
          duration: 7.2,
          delay: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#133c37] py-24 lg:py-32 overflow-hidden border-t border-[#c9a84c]/20"
      aria-label="Rooms and Suites"
    >
      {/* ── Subtle Emerald Luxury Gradient Background ── */}
      <div className="absolute inset-0 bg-radial-gradient from-[#1a4740] via-[#0d3330] to-[#092523] opacity-90 pointer-events-none" />

      {/* ── Elegant Botanical Decorative Palms (Left & Right) ── */}
      <div
        ref={botanicalLeftRef}
        className="absolute -top-10 -left-12 w-64 lg:w-80 h-auto pointer-events-none opacity-20 hidden md:block z-0"
      >
        <BotanicalPalm className="w-full h-full transform scale-x-[-1]" />
      </div>
      <div
        ref={botanicalRightRef}
        className="absolute -bottom-14 -right-12 w-72 lg:w-96 h-auto pointer-events-none opacity-20 hidden md:block z-0"
      >
        <BotanicalPalm className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Premium Section Header ── */}
        <div className="mb-14 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Small uppercase tag */}
            <p
              ref={headerLabelRef}
              className="section-label mb-3 inline-flex items-center gap-2"
            >
              <Sparkles size={12} className="text-[#ffd875]" />
              HOTEL SONAJHURI
            </p>

            {/* Split Heading: Rooms & Suites with Golden & */}
            <h2
              className="text-white font-bold tracking-wide flex items-center flex-wrap gap-x-2.5"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
            >
              <span className="inline-block overflow-hidden py-1">
                <span
                  ref={(el) => (headingWordsRef.current[0] = el)}
                  className="inline-block"
                >
                  Rooms
                </span>
              </span>

              {/* Highlighted Gold & Symbol */}
              <span className="inline-block overflow-hidden py-1">
                <span
                  ref={(el) => (headingWordsRef.current[1] = el)}
                  className="inline-block text-[#ffd875] font-serif italic text-[1.1em] px-1"
                >
                  &amp;
                </span>
              </span>

              <span className="inline-block overflow-hidden py-1">
                <span
                  ref={(el) => (headingWordsRef.current[2] = el)}
                  className="inline-block"
                >
                  Suites
                </span>
              </span>
            </h2>

            {/* Elegant Golden Decorative Divider */}
            <div className="flex items-center gap-2 mt-4 origin-left" ref={goldDividerRef}>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#ffd875]" />
              <div className="w-2 h-2 rotate-45 bg-[#ffd875] shadow-[0_0_8px_rgba(255,216,117,0.8)]" />
              <div className="w-8 h-[1px] bg-[#c9a84c]/50" />
            </div>
          </div>

          {/* View All Rooms Link on Right */}
          <div ref={headerLinkRef} className="pt-2">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2.5 text-[#ffd875] hover:text-white text-sm font-semibold tracking-wider uppercase transition-colors duration-300 group py-2"
            >
              <span>View All Rooms</span>
              <span className="w-7 h-7 rounded-full border border-[#c9a84c]/40 flex items-center justify-center group-hover:bg-[#c9a84c] group-hover:text-[#0d3330] transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Exactly Three Large Room Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch">
          {roomsData.map((room, index) => (
            <RoomCardItem
              key={room.id}
              room={room}
              index={index}
              setCardRef={(el) => (cardsRef.current[index] = el)}
              setImageWrapperRef={(el) => (imageWrappersRef.current[index] = el)}
              setImageRef={(el) => (imagesRef.current[index] = el)}
              onBook={() => openBooking({ roomType: room.name })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// INDIVIDUAL ROOM CARD COMPONENT
// Features: 60% Image Height, 3D Perspective Tilt,
// Smooth Clip-Path Reveal, Parallax Scrub, Specular Light Sweep,
// Magnetic Book Now CTA Button, Golden Amenity Icons
// ─────────────────────────────────────────────────────────
function RoomCardItem({
  room,
  index,
  setCardRef,
  setImageWrapperRef,
  setImageRef,
  onBook,
}) {
  const cardOuterRef = useRef(null)
  const cardInnerRef = useRef(null)
  const shineRef = useRef(null)
  const btnRef = useRef(null)

  // 3D Tilt calculation
  const handleMouseMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const card = cardInnerRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    const xPos = (clientX / rect.width) * 2 - 1
    const yPos = (clientY / rect.height) * 2 - 1

    // Subtle luxury 3D tilt (max 5.5 degrees)
    const rotateX = -yPos * 5.5
    const rotateY = xPos * 5.5

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    })

    // Dynamic specular golden reflection
    if (shineRef.current) {
      const shineX = (clientX / rect.width) * 100
      const shineY = (clientY / rect.height) * 100
      shineRef.current.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 216, 117, 0.22) 0%, rgba(201, 168, 76, 0.05) 40%, transparent 70%)`
      shineRef.current.style.opacity = '1'
    }

    // Magnetic Book Now button attraction
    if (btnRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect()
      const btnCenterX = btnRect.left + btnRect.width / 2
      const btnCenterY = btnRect.top + btnRect.height / 2
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY)

      if (dist < 90) {
        const pullX = (e.clientX - btnCenterX) * 0.22
        const pullY = (e.clientY - btnCenterY) * 0.22
        gsap.to(btnRef.current, { x: pullX, y: pullY, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
      }
    }
  }

  const handleMouseLeave = () => {
    const card = cardInnerRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.5)',
    })

    if (shineRef.current) {
      shineRef.current.style.opacity = '0'
    }

    if (btnRef.current) {
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.45, ease: 'power2.out' })
    }
  }

  return (
    <div
      ref={(el) => {
        cardOuterRef.current = el
        setCardRef(el)
      }}
      className="perspective-[1000px] h-full"
    >
      <article
        ref={cardInnerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl bg-[#0d3330] border border-[#c9a84c]/25 hover:border-[#ffd875]/70 transition-all duration-500 shadow-2xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_25px_rgba(201,168,76,0.18)] hover:-translate-y-2 flex flex-col justify-between h-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Top 60% Image Section with Clip-Path Reveal & Parallax ── */}
        <div
          ref={setImageWrapperRef}
          className="relative h-72 sm:h-80 overflow-hidden rounded-t-2xl will-change-transform"
        >
          <img
            ref={setImageRef}
            src={room.img}
            alt={room.name}
            className="absolute -top-[10%] left-0 w-full h-[120%] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06] will-change-transform"
            loading="lazy"
          />

          {/* Smooth Dark Gradient Overlays (bottom 40% blend) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3330] via-[#0d3330]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_60%,rgba(13,51,48,0.5)_100%)] pointer-events-none" />

          {/* ── Optional "Most Popular" Badge on Card 1 ── */}
          {room.badge && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-gradient-to-r from-[#c9a84c] to-[#ffd875] text-[#0d3330] font-bold text-[11px] tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-lg shadow-black/40">
              <Star size={11} fill="currentColor" />
              <span>{room.badge}</span>
            </div>
          )}

          {/* Room Index Indicator */}
          <div className="absolute top-4 right-4 z-20 bg-[#0d3330]/80 backdrop-blur-md border border-[#c9a84c]/30 text-[#ffd875] font-mono text-xs font-semibold px-3 py-1 rounded-full shadow">
            0{index + 1}
          </div>
        </div>

        {/* ── Specular Golden Reflection Layer ── */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-20 rounded-2xl"
        />

        {/* ── Diagonal Gold Sheen Sweep Beam on Hover ── */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* ── Card Content Details ── */}
        <div
          className="relative z-20 p-7 pt-4 flex-1 flex flex-col justify-between"
          style={{ transform: 'translateZ(24px)' }}
        >
          <div>
            {/* Title */}
            <h3
              className="text-white text-2xl font-bold leading-tight group-hover:text-[#ffd875] transition-colors duration-300"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {room.name}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed mt-2.5 font-light line-clamp-2">
              {room.desc}
            </p>

            {/* ── Golden Amenity Icons Row ── */}
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-white/10">
              {room.features.map((feature, fIdx) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={fIdx}
                    className="flex items-center gap-2 text-white/80 text-xs font-medium"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center text-[#ffd875] flex-shrink-0">
                      <IconComponent size={14} />
                    </span>
                    <span>{feature.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Book Now CTA Button ── */}
          <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
              Direct Guaranteed Rate
            </span>

            <button
              ref={btnRef}
              type="button"
              onClick={onBook}
              className="btn-gold-shimmer inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#ffd875] text-[#0d3330] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all duration-300 active:scale-95 cursor-pointer group/btn"
              aria-label={`Book ${room.name} now`}
            >
              <span>Book Now</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
