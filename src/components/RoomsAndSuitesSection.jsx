import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BedDouble,
  Maximize2,
  Coffee,
  Wind,
  Wifi,
  Tv,
  Sun,
  Sparkles,
  Star,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  ShieldCheck,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Photography
import realRoomImg from '../assets/gallery/room-family-double-bed.jpg'
import realRoomTwinImg from '../assets/gallery/room-deluxe-twin.webp'
import realRoomBalconyImg from '../assets/gallery/room-balcony-seating.jpg'
import realRoomViewImg from '../assets/gallery/sonajhuri-room-view.png'
import roomSwanImg from '../assets/gallery/room-luxury-swan.jpg'
import terraceGardenImg from '../assets/gallery/rooftop-garden-terrace.jpg'

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
        stroke="#D9AD4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────
// EXACT 4 ROOMS WITH STRICT ₹1,500 - ₹2,000 / NIGHT PRICING
// ─────────────────────────────────────────────────────────
const roomsData = [
  {
    id: 'super-deluxe',
    name: 'Super Deluxe Room',
    price: 2000,
    priceFormatted: '₹2,000',
    desc: 'Spacious family double bed room featuring architectural false ceiling lighting, warm ambient textures, and handcrafted swan towel art.',
    img: realRoomImg,
    badge: 'MOST POPULAR',
    bedType: 'Double Bed',
    roomSize: '300 sq.ft.',
    facilities: ['Air Conditioning', 'Free High-Speed WiFi', 'Complimentary Breakfast', 'Room Service'],
    gallery: [realRoomImg, roomSwanImg, realRoomTwinImg],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    price: 1800,
    priceFormatted: '₹1,800',
    desc: 'Spacious, stylish twin bed sanctuary appointed with rich honey-teak paneling, warm brass sconce lighting, and coastal daylight.',
    img: realRoomTwinImg,
    badge: null,
    bedType: 'Twin Bed',
    roomSize: '240 sq.ft.',
    facilities: ['Air Conditioning', 'Free High-Speed WiFi', 'Smart LED TV', 'Daily Housekeeping'],
    gallery: [realRoomTwinImg, realRoomBalconyImg, realRoomViewImg],
  },
  {
    id: 'balcony-view',
    name: 'Balcony View Room',
    price: 1700,
    priceFormatted: '₹1,700',
    desc: 'Boutique coastal retreat featuring scenic private balcony seating overlooking peaceful sea-breeze landscapes and lush greenery.',
    img: realRoomBalconyImg,
    badge: 'POPULAR CHOICE',
    bedType: 'Queen Bed',
    roomSize: '220 sq.ft.',
    facilities: ['Private Balcony', 'Air Conditioning', 'Free High-Speed WiFi', 'Tea / Coffee Maker'],
    gallery: [realRoomBalconyImg, realRoomViewImg, terraceGardenImg],
  },
  {
    id: 'standard',
    name: 'Standard Room',
    price: 1500,
    priceFormatted: '₹1,500',
    desc: 'Comfortable and elegantly furnished room curated for peaceful relaxation, complete with cozy bedding and essential modern amenities.',
    img: realRoomViewImg,
    badge: null,
    bedType: 'Queen Bed',
    roomSize: '200 sq.ft.',
    facilities: ['Air Conditioning', 'Free High-Speed WiFi', 'Hot Water Geyser', '24/7 Room Service'],
    gallery: [realRoomViewImg, realRoomImg, roomSwanImg],
  },
]

export default function RoomsAndSuitesSection() {
  const sectionRef = useRef(null)
  const headerLabelRef = useRef(null)
  const headingWordsRef = useRef([])
  const goldDividerRef = useRef(null)
  const headerLinkRef = useRef(null)
  const cardsRef = useRef([])
  const roomsTrackRef = useRef(null)
  const botanicalLeftRef = useRef(null)
  const botanicalRightRef = useRef(null)
  const { openBooking } = useBooking()

  // Gallery Modal State
  const [activeGalleryRoom, setActiveGalleryRoom] = useState(null)
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  const openRoomGallery = (room) => {
    setActiveGalleryRoom(room)
    setActivePhotoIdx(0)
  }

  const closeRoomGallery = () => {
    setActiveGalleryRoom(null)
    setActivePhotoIdx(0)
  }

  const scrollRooms = (direction) => {
    const track = roomsTrackRef.current
    if (!track) return

    const cards = Array.from(track.querySelectorAll('[data-room-card]'))
    if (!cards.length) return

    const trackLeft = track.getBoundingClientRect().left
    const positions = cards.map(
      (card) => track.scrollLeft + card.getBoundingClientRect().left - trackLeft
    )
    const currentIndex = positions.reduce((nearest, position, index) => (
      Math.abs(position - track.scrollLeft) < Math.abs(positions[nearest] - track.scrollLeft)
        ? index
        : nearest
    ), 0)
    const nextIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    track.scrollTo({
      left: positions[nextIndex],
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  const nextPhoto = (e) => {
    e?.stopPropagation()
    if (!activeGalleryRoom) return
    setActivePhotoIdx((prev) => (prev + 1) % activeGalleryRoom.gallery.length)
  }

  const prevPhoto = (e) => {
    e?.stopPropagation()
    if (!activeGalleryRoom) return
    setActivePhotoIdx(
      (prev) => (prev - 1 + activeGalleryRoom.gallery.length) % activeGalleryRoom.gallery.length
    )
  }

  // Close gallery on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeRoomGallery()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }
    if (activeGalleryRoom) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeGalleryRoom])

  // GSAP ScrollTrigger Animations
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
          ],
          { opacity: 1, y: 0, scale: 1 }
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

      // Small uppercase tag
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
          duration: 0.85,
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

      // ─── 2. STAGGERED 2-COLUMN CARDS ENTRANCE ───
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      cardsTl.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.16,
          ease: 'power3.out',
        }
      )

      // ─── 3. GENTLE FLOATING BOTANICAL PALMS ───
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
      className="relative bg-[#061426] py-24 lg:py-32 overflow-hidden border-t border-[#D9AD4F]/20 text-[#F8F3E9]"
      aria-label="Rooms and Suites"
    >
      {/* ── Subtle Luxury Midnight Navy Radial Overlay ── */}
      <div className="absolute inset-0 bg-radial-gradient from-[#0B1C30] via-[#061426] to-[#040E1B] opacity-95 pointer-events-none" />

      {/* ── Botanical Palms (Left & Right) ── */}
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

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-14 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Small uppercase tag */}
            <p
              ref={headerLabelRef}
              className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9AD4F] mb-3 inline-flex items-center gap-2"
            >
              <Sparkles size={13} className="text-[#D9AD4F]" />
              HOTEL SONAJHURI
            </p>

            {/* Split Heading: Rooms & Suites with Golden & */}
            <h2
              className="text-[#F8F3E9] font-bold tracking-tight flex items-center flex-wrap gap-x-2.5"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              }}
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
                  className="inline-block text-[#D9AD4F] font-serif italic text-[1.12em] px-1"
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
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#D9AD4F] to-[#F8F3E9]" />
              <div className="w-2 h-2 rotate-45 bg-[#D9AD4F] shadow-[0_0_8px_rgba(217,173,79,0.8)]" />
              <div className="w-8 h-[1px] bg-[#D9AD4F]/50" />
            </div>
          </div>

          {/* View All Rooms Link */}
          <div ref={headerLinkRef} className="pt-2">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2.5 text-[#D9AD4F] hover:text-[#F8F3E9] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors duration-300 group py-2"
            >
              <span>View All Rooms</span>
              <span className="w-7 h-7 rounded-full border border-[#D9AD4F]/40 flex items-center justify-center group-hover:bg-[#D9AD4F] group-hover:text-[#061426] transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        {/* ── SINGLE-ROW ROOM CAROUSEL: THREE CARDS VISIBLE ON WIDE SCREENS ── */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollRooms(-1)}
            className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#D9AD4F] text-[#061426] hover:bg-[#F8F3E9] flex items-center justify-center shadow-lg shadow-black/25 transition-colors duration-200 cursor-pointer"
            aria-label="Previous rooms"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            ref={roomsTrackRef}
            className="min-w-0 flex-1 flex items-stretch gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Room options"
          >
            {roomsData.map((room, index) => (
              <div
                key={room.id}
                data-room-card
                className="flex-none w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-1.25rem)] 2xl:w-[calc(33.333%-1.667rem)] snap-start"
              >
                <RoomCardItem
                  room={room}
                  index={index}
                  setCardRef={(el) => (cardsRef.current[index] = el)}
                  onBook={() => openBooking({ roomType: room.name })}
                  onOpenGallery={() => openRoomGallery(room)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollRooms(1)}
            className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#D9AD4F] text-[#061426] hover:bg-[#F8F3E9] flex items-center justify-center shadow-lg shadow-black/25 transition-colors duration-200 cursor-pointer"
            aria-label="Next rooms"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* ── LIGHTBOX GALLERY MODAL OVERLAY ── */}
      {activeGalleryRoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGalleryRoom.name} Photo Gallery`}
          onClick={closeRoomGallery}
          className="fixed inset-0 z-50 bg-[#061426]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0B1C30] border border-[#D9AD4F]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#061426]/70">
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#F8F3E9]"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {activeGalleryRoom.name} — Gallery
                </h3>
                <p className="text-xs text-[#AEB8C5]">
                  Photo {activePhotoIdx + 1} of {activeGalleryRoom.gallery.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeRoomGallery}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D9AD4F] text-[#F8F3E9] hover:text-[#061426] flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close photo gallery"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Main Image (16:9) */}
            <div className="relative aspect-[16/9] w-full bg-black/60 flex items-center justify-center overflow-hidden">
              <img
                src={activeGalleryRoom.gallery[activePhotoIdx]}
                alt={`${activeGalleryRoom.name} photo ${activePhotoIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Prev / Next Navigation Arrows */}
              {activeGalleryRoom.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#061426]/70 hover:bg-[#D9AD4F] text-[#F8F3E9] hover:text-[#061426] border border-[#D9AD4F]/40 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#061426]/70 hover:bg-[#D9AD4F] text-[#F8F3E9] hover:text-[#061426] border border-[#D9AD4F]/40 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="p-4 bg-[#061426]/90 flex items-center justify-center gap-3 overflow-x-auto">
              {activeGalleryRoom.gallery.map((photo, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setActivePhotoIdx(pIdx)}
                  className={`relative aspect-[16/9] w-20 sm:w-24 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    pIdx === activePhotoIdx
                      ? 'border-[#D9AD4F] scale-105 shadow-md shadow-[#D9AD4F]/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Jump to photo ${pIdx + 1}`}
                >
                  <img
                    src={photo}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// WIDE LANDSCAPE-STYLE ROOM CARD (16:9 RECTANGULAR IMAGE)
// ─────────────────────────────────────────────────────────
function RoomCardItem({ room, index, setCardRef, onBook, onOpenGallery }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={(el) => {
        cardRef.current = el
        setCardRef(el)
      }}
      className="h-full flex"
    >
      <article className="group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-[#0B1C30] border border-[#D9AD4F]/25 hover:border-[#D9AD4F] transition-all duration-500 shadow-[0_12px_32px_rgba(3,11,20,0.6)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(217,173,79,0.18)] hover:-translate-y-2 flex flex-col justify-between w-full will-change-transform">
        {/* ── TOP RECTANGULAR ROOM IMAGE (16:9 ASPECT RATIO) ── */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#061426]">
          <img
            src={room.img}
            alt={room.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
            loading="lazy"
          />

          {/* Smooth Dark Gradient Overlays for Visual Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C30] via-transparent to-transparent opacity-85 pointer-events-none" />

          {/* ── MOST POPULAR BADGE (Top-Left of Image) ── */}
          {room.badge && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-gradient-to-r from-[#D9AD4F] via-[#F8F3E9] to-[#D9AD4F] text-[#061426] font-bold text-[11px] tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-lg shadow-black/50">
              <Star size={11} fill="currentColor" />
              <span>{room.badge}</span>
            </div>
          )}

          {/* ── GALLERY BUTTON OVERLAY (Bottom-Right of Image) ── */}
          <button
            type="button"
            onClick={onOpenGallery}
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#061426]/80 hover:bg-[#D9AD4F] text-[#F8F3E9] hover:text-[#061426] border border-[#D9AD4F]/40 hover:border-[#D9AD4F] backdrop-blur-md text-xs font-semibold tracking-wide transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
            aria-label={`Open photo gallery for ${room.name}`}
          >
            <Images size={13} />
            <span>Gallery</span>
          </button>
        </div>

        {/* ── PREMIUM DEEP NAVY CONTENT AREA BELOW THE IMAGE ── */}
        <div className="relative z-10 p-6 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#0B1C30] to-[#061426]">
          <div>
            {/* Header: Room Name & Pricing Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <h3
                  className="text-2xl lg:text-[1.7rem] font-bold text-[#F8F3E9] group-hover:text-[#D9AD4F] transition-colors duration-300 leading-tight"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {room.name}
                </h3>
              </div>

              {/* Exact Room Pricing (Strictly ₹1,500 - ₹2,000 / Night) */}
              <div className="sm:text-right shrink-0">
                <div className="flex sm:flex-col items-baseline sm:items-end gap-1.5 sm:gap-0">
                  <span
                    className="text-2xl sm:text-3xl font-bold text-[#D9AD4F] tracking-tight"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {room.priceFormatted}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#AEB8C5] font-medium">
                    / Night
                  </span>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-[#AEB8C5] text-sm leading-relaxed font-light line-clamp-2">
              {room.desc}
            </p>

            {/* Key Specs: Bed Type & Room Size */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#061426]/70 border border-[#D9AD4F]/20 text-xs font-medium text-[#F8F3E9]">
                <BedDouble size={14} className="text-[#D9AD4F]" />
                <span>{room.bedType}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#061426]/70 border border-[#D9AD4F]/20 text-xs font-medium text-[#F8F3E9]">
                <Maximize2 size={13} className="text-[#D9AD4F]" />
                <span>{room.roomSize}</span>
              </div>
            </div>

            {/* Available Facilities */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#D9AD4F]/90 mb-2.5">
                Included Amenities:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#AEB8C5]">
                {room.facilities.map((fac, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#D9AD4F]/15 border border-[#D9AD4F]/30 flex items-center justify-center text-[#D9AD4F] shrink-0">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="truncate">{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARD FOOTER WITH GUARANTEED RATE & BOOK NOW BUTTON ── */}
          <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#AEB8C5]/70 uppercase tracking-widest font-mono">
              <ShieldCheck size={13} className="text-[#D9AD4F]" />
              <span>Direct Rate</span>
            </div>

            <button
              type="button"
              onClick={onBook}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-[#061426] bg-[#D9AD4F] hover:bg-[#F8F3E9] shadow-md hover:shadow-lg hover:shadow-[#D9AD4F]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group/btn"
              aria-label={`Book ${room.name} at ${room.priceFormatted} per night`}
            >
              <span>BOOK NOW</span>
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
