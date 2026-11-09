import { useEffect, useRef } from 'react'
import {
  Waves,
  UtensilsCrossed,
  BedDouble,
  Leaf,
  Headset,
  Sparkles,
  ArrowRight,
  Phone,
  CheckCircle2,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri Assets
import poolImg from '../assets/sonajhuri-pool-hero.webp'
import diningImg from '../assets/offers-02.jpg'
import roomImg from '../assets/gallery/room-deluxe-twin.webp'
import gardenImg from '../assets/gallery/rooftop-garden-terrace.jpg'
import corridorImg from '../assets/gallery/hotel-corridor.png'

gsap.registerPlugin(ScrollTrigger)

export default function AmenitiesBentoSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])
  const floatingIconPoolRef = useRef(null)
  const floatingIconLeafRef = useRef(null)
  const floatingIconSupportRef = useRef(null)
  const { openBooking } = useBooking()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerRef.current, cardsRef.current], { opacity: 1, y: 0 })
        return
      }

      // ── 1. HEADER REVEAL ──
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
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ── 2. ASYMMETRIC BENTO GRID CARDS STAGGERED ENTRANCE ──
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ── 3. FLOATING AMENITY ICON ANIMATIONS ──
      if (floatingIconPoolRef.current) {
        gsap.to(floatingIconPoolRef.current, {
          y: -8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (floatingIconLeafRef.current) {
        gsap.to(floatingIconLeafRef.current, {
          rotation: 6,
          y: -6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (floatingIconSupportRef.current) {
        gsap.to(floatingIconSupportRef.current, {
          scale: 1.06,
          duration: 2.2,
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
      className="relative bg-[#061426] py-24 lg:py-32 overflow-hidden text-[#F8F3E9] border-t border-[#D9AD4F]/20"
      aria-label="Hotel Sonajhuri Amenities and Features"
    >
      {/* ── Background Subtle Radial Gradient Mesh ── */}
      <div className="absolute inset-0 bg-radial-gradient from-[#0B1C30] via-[#061426] to-[#040E1B] opacity-95 pointer-events-none" />

      {/* Decorative Gold Radial Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#D9AD4F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#D9AD4F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── SECTION HEADER ── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center gap-2.5 mb-3">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D9AD4F]" />
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9AD4F] inline-flex items-center gap-2">
              <Sparkles size={13} className="text-[#D9AD4F]" />
              WHAT WE OFFER
            </p>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D9AD4F]" />
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F3E9] mb-5 leading-[1.15]"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Hotel Amenities <span className="text-[#D9AD4F] font-serif italic font-normal">&amp;</span> Features
          </h2>

          {/* Golden Diamond Divider */}
          <div className="relative w-32 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#D9AD4F] to-transparent mx-auto mb-5">
            <span className="absolute -top-[3.5px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#D9AD4F] shadow-[0_0_8px_rgba(217,173,79,0.8)]" />
          </div>

          <p className="text-[#AEB8C5] text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Thoughtful comforts and small moments of care, designed to make every stay feel effortless.
          </p>
        </div>

        {/* ── ASYMMETRIC LUXURY BENTO GRID (12-COLUMNS DESKTOP) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* ═════════════════════════════════════════════════════════════
              CARD 1: ROOFTOP POOL (MAIN FEATURED CARD — 7 COLS)
          ═════════════════════════════════════════════════════════════ */}
          <article
            ref={(el) => (cardsRef.current[0] = el)}
            className="group relative md:col-span-2 lg:col-span-7 rounded-2xl lg:rounded-3xl bg-[#0B1C30] border border-[#D9AD4F]/25 hover:border-[#D9AD4F] overflow-hidden transition-all duration-500 shadow-[0_12px_32px_rgba(3,11,20,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(217,173,79,0.2)] hover:-translate-y-2 flex flex-col justify-between min-h-[420px] sm:min-h-[460px]"
          >
            {/* Full-Bleed Photograph with Slow Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={poolImg}
                alt="Hotel Sonajhuri Rooftop Swimming Pool"
                className="w-full h-full object-cover object-center scale-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
                loading="lazy"
              />
              {/* Layered Midnight Navy Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 20, 38, 0.30) 0%, rgba(6, 20, 38, 0.55) 50%, rgba(6, 20, 38, 0.95) 100%)',
                }}
              />
              {/* Subtle Vignette */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#061426]/30 to-[#061426]/80 pointer-events-none" />
            </div>

            {/* Top Bar: Badges & Floating Pool Icon */}
            <div className="relative z-10 p-6 sm:p-8 flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D9AD4F] via-[#F8F3E9] to-[#D9AD4F] text-[#061426] font-bold text-[11px] tracking-wider uppercase shadow-lg shadow-black/40">
                  <Sparkles size={11} fill="currentColor" />
                  SIGNATURE HIGHLIGHT
                </span>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/30 text-[#D9AD4F] text-xs font-medium">
                  Open-Air Sky Oasis
                </span>
              </div>

              {/* Floating Waves Icon with subtle sine bobbing */}
              <div
                ref={floatingIconPoolRef}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/50 flex items-center justify-center text-[#D9AD4F] shadow-lg shadow-[#061426]/80 group-hover:bg-[#D9AD4F] group-hover:text-[#061426] transition-colors duration-300"
              >
                <Waves size={24} strokeWidth={1.8} />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 sm:p-8 pt-0">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D9AD4F] font-semibold">
                    01 • ROOFTOP AMENITY
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8F3E9] group-hover:text-[#D9AD4F] transition-colors duration-300 leading-tight mb-3"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  Rooftop Pool
                </h3>

                <p className="text-[#AEB8C5] text-sm sm:text-base leading-relaxed font-light mb-5">
                  An open-sky pool offering a relaxing place to unwind overlooking refreshing sea breezes. Enjoy morning swims under the coastal sun or quiet starlit evening dips.
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                  {['Crystal Azure Water', 'Poolside Loungers', 'Panoramic Sky Views', 'Night Illumination'].map(
                    (chip, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#061426]/75 backdrop-blur-sm border border-[#D9AD4F]/20 text-xs font-medium text-[#F8F3E9]/90"
                      >
                        <CheckCircle2 size={11} className="text-[#D9AD4F]" />
                        {chip}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* ═════════════════════════════════════════════════════════════
              CARD 2: DELICIOUS DINING (MEDIUM-SIZED CARD — 5 COLS)
          ═════════════════════════════════════════════════════════════ */}
          <article
            ref={(el) => (cardsRef.current[1] = el)}
            className="group relative md:col-span-2 lg:col-span-5 rounded-2xl lg:rounded-3xl bg-[#0B1C30] border border-[#D9AD4F]/25 hover:border-[#D9AD4F] overflow-hidden transition-all duration-500 shadow-[0_12px_32px_rgba(3,11,20,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(217,173,79,0.2)] hover:-translate-y-2 flex flex-col justify-between min-h-[420px] sm:min-h-[460px]"
          >
            {/* Photograph Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={diningImg}
                alt="Hotel Sonajhuri Delicious Dining Experience"
                className="w-full h-full object-cover object-center scale-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 20, 38, 0.35) 0%, rgba(6, 20, 38, 0.65) 50%, rgba(6, 20, 38, 0.96) 100%)',
                }}
              />
            </div>

            {/* Top Bar: Badge & Utensils Icon */}
            <div className="relative z-10 p-6 sm:p-7 flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 text-[#D9AD4F] text-xs font-semibold uppercase tracking-wider">
                GASTRONOMY
              </span>

              <div className="w-12 h-12 rounded-2xl bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 flex items-center justify-center text-[#D9AD4F] shadow-md group-hover:bg-[#D9AD4F] group-hover:text-[#061426] transition-colors duration-300">
                <UtensilsCrossed size={20} strokeWidth={1.8} />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 sm:p-7 pt-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D9AD4F] font-semibold">
                  02 • CULINARY
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-bold text-[#F8F3E9] group-hover:text-[#D9AD4F] transition-colors duration-300 leading-tight mb-3"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                Delicious Dining
              </h3>

              <p className="text-[#AEB8C5] text-sm leading-relaxed font-light mb-5">
                Fresh coastal flavors and regional Bengali favorites, served with care. Savor freshly prepared catch of the day, authentic Bengali thalis, and all-day multi-cuisine specialties.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                {['Authentic Bengali Thalis', 'Fresh Seafood Catch', 'In-Room Breakfast'].map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#061426]/75 border border-[#D9AD4F]/20 text-xs font-medium text-[#F8F3E9]/90"
                  >
                    <CheckCircle2 size={10} className="text-[#D9AD4F]" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ═════════════════════════════════════════════════════════════
              CARD 3: PREMIUM ROOMS (MEDIUM-SIZED CARD — 5 COLS)
          ═════════════════════════════════════════════════════════════ */}
          <article
            ref={(el) => (cardsRef.current[2] = el)}
            className="group relative md:col-span-1 lg:col-span-5 rounded-2xl lg:rounded-3xl bg-[#0B1C30] border border-[#D9AD4F]/25 hover:border-[#D9AD4F] overflow-hidden transition-all duration-500 shadow-[0_12px_32px_rgba(3,11,20,0.6)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(217,173,79,0.2)] hover:-translate-y-2 flex flex-col justify-between min-h-[340px] sm:min-h-[360px]"
          >
            {/* Photograph Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={roomImg}
                alt="Hotel Sonajhuri Luxury Room Interiors"
                className="w-full h-full object-cover object-center scale-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 20, 38, 0.35) 0%, rgba(6, 20, 38, 0.70) 55%, rgba(6, 20, 38, 0.97) 100%)',
                }}
              />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-6 flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 text-[#D9AD4F] text-xs font-semibold uppercase tracking-wider">
                ACCOMMODATION
              </span>

              <div className="w-11 h-11 rounded-2xl bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 flex items-center justify-center text-[#D9AD4F] shadow-md group-hover:bg-[#D9AD4F] group-hover:text-[#061426] transition-colors duration-300">
                <BedDouble size={18} strokeWidth={1.8} />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 pt-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D9AD4F] font-semibold">
                  03 • SUITES
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold text-[#F8F3E9] group-hover:text-[#D9AD4F] transition-colors duration-300 leading-tight mb-2.5"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                Premium Rooms
              </h3>

              <p className="text-[#AEB8C5] text-sm leading-relaxed font-light mb-4">
                Thoughtfully appointed rooms designed for restful coastal stays. Experience warm false ceiling lighting, teak accents, and peaceful seaside ambiance.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                {['Teak Paneling', 'Double & Twin Beds', 'Plush Linens'].map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#061426]/75 border border-[#D9AD4F]/20 text-xs font-medium text-[#F8F3E9]/90"
                  >
                    <CheckCircle2 size={10} className="text-[#D9AD4F]" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ═════════════════════════════════════════════════════════════
              CARD 4: SERENE VIEW (SMALLER ELEGANT CARD — 4 COLS)
          ═════════════════════════════════════════════════════════════ */}
          <article
            ref={(el) => (cardsRef.current[3] = el)}
            className="group relative md:col-span-1 lg:col-span-4 rounded-2xl lg:rounded-3xl bg-[#0B1C30] border border-[#D9AD4F]/25 hover:border-[#D9AD4F] overflow-hidden transition-all duration-500 shadow-[0_12px_32px_rgba(3,11,20,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(217,173,79,0.2)] hover:-translate-y-2 flex flex-col justify-between min-h-[340px] sm:min-h-[360px]"
          >
            {/* Photograph Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={gardenImg}
                alt="Hotel Sonajhuri Rooftop Bamboo Terrace Garden"
                className="w-full h-full object-cover object-center scale-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 20, 38, 0.30) 0%, rgba(6, 20, 38, 0.70) 55%, rgba(6, 20, 38, 0.97) 100%)',
                }}
              />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-6 flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 text-[#D9AD4F] text-xs font-semibold uppercase tracking-wider">
                TRANQUILITY
              </span>

              <div
                ref={floatingIconLeafRef}
                className="w-11 h-11 rounded-2xl bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 flex items-center justify-center text-[#D9AD4F] shadow-md group-hover:bg-[#D9AD4F] group-hover:text-[#061426] transition-colors duration-300"
              >
                <Leaf size={18} strokeWidth={1.8} />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 pt-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D9AD4F] font-semibold">
                  04 • OUTDOOR
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold text-[#F8F3E9] group-hover:text-[#D9AD4F] transition-colors duration-300 leading-tight mb-2.5"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                Serene View
              </h3>

              <p className="text-[#AEB8C5] text-sm leading-relaxed font-light mb-4">
                Unwind with calm rooftop garden views and a slower pace. Relax under natural bamboo accents and warm architectural lighting.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                {['Bamboo Terrace Garden', 'Lush Tropical Foliage'].map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#061426]/75 border border-[#D9AD4F]/20 text-xs font-medium text-[#F8F3E9]/90"
                  >
                    <CheckCircle2 size={10} className="text-[#D9AD4F]" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ═════════════════════════════════════════════════════════════
              CARD 5: 24/7 SUPPORT (SMALLER ELEGANT CARD — 3 COLS)
          ═════════════════════════════════════════════════════════════ */}
          <article
            ref={(el) => (cardsRef.current[4] = el)}
            className="group relative md:col-span-2 lg:col-span-3 rounded-2xl lg:rounded-3xl bg-gradient-to-b from-[#0B1C30] via-[#0B1C30] to-[#061426] border border-[#D9AD4F]/25 hover:border-[#D9AD4F] overflow-hidden transition-all duration-500 shadow-[0_12px_32px_rgba(3,11,20,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(217,173,79,0.2)] hover:-translate-y-2 flex flex-col justify-between min-h-[340px] sm:min-h-[360px]"
          >
            {/* Subtle Corridor Texture Backdrop */}
            <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none">
              <img
                src={corridorImg}
                alt="Hotel Sonajhuri Corridor"
                className="w-full h-full object-cover grayscale mix-blend-overlay"
              />
            </div>

            {/* Glowing Accent Ring in Top Right */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D9AD4F]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar */}
            <div className="relative z-10 p-6 flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 text-[#D9AD4F] text-xs font-semibold uppercase tracking-wider">
                CONCIERGE
              </span>

              {/* Glowing Pulse Headset Icon */}
              <div
                ref={floatingIconSupportRef}
                className="relative w-11 h-11 rounded-2xl bg-[#061426]/80 backdrop-blur-md border border-[#D9AD4F]/40 flex items-center justify-center text-[#D9AD4F] shadow-md group-hover:bg-[#D9AD4F] group-hover:text-[#061426] transition-colors duration-300"
              >
                <span className="absolute inset-0 rounded-2xl bg-[#D9AD4F]/25 animate-ping pointer-events-none" />
                <Headset size={18} strokeWidth={1.8} className="relative z-10" />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 pt-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D9AD4F] font-semibold">
                  05 • ROUND-THE-CLOCK
                </span>
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold text-[#F8F3E9] group-hover:text-[#D9AD4F] transition-colors duration-300 leading-tight mb-2.5"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                24/7 Support
              </h3>

              <p className="text-[#AEB8C5] text-sm leading-relaxed font-light mb-4">
                Our team is here around the clock for a seamless stay. Dedicated reception, prompt room assistance, and local sightseeing guidance.
              </p>

              {/* Direct Telephone Button */}
              <a
                href="tel:09332656724"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#061426]/85 hover:bg-[#D9AD4F] border border-[#D9AD4F]/35 hover:border-[#D9AD4F] text-[#F8F3E9] hover:text-[#061426] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
              >
                <Phone size={13} className="text-[#D9AD4F] group-hover:text-[#061426]" />
                <span>Call: 093326-56724</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
