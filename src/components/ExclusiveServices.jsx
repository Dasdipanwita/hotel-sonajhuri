import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

// Authentic Hotel Sonajhuri exclusive service photos
import serviceRoomImg from '../assets/offers-01.jpg'
import serviceRestaurantImg from '../assets/offers-02.jpg'
import servicePoolImg from '../assets/offers-03.jpg'
import serviceLawnImg from '../assets/offers-04.avif'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: '01',
    img: serviceRoomImg,
    label: 'Premium Rooms',
    tag: 'Coastal Luxury',
    desc: 'Spacious air-conditioned sanctuaries with warm cove lighting and refined comforts.',
    link: '/rooms',
    btnText: 'Explore Rooms',
  },
  {
    id: '02',
    img: serviceRestaurantImg,
    label: 'Restaurant',
    tag: 'Authentic Dining',
    desc: 'Traditional Bengali delicacies, fresh coastal catch, and gourmet multi-cuisine feasts.',
    link: '/amenities',
    btnText: 'View Cuisine',
  },
  {
    id: '03',
    img: servicePoolImg,
    label: 'Rooftop Swimming Pool',
    tag: 'Sky Oasis',
    desc: 'Crystal azure waters on the open-air roof deck overlooking soothing sea breezes.',
    link: '/amenities',
    btnText: 'Discover Pool',
  },
  {
    id: '04',
    img: serviceLawnImg,
    label: 'Terrace Lawn',
    tag: 'Open-Air Garden',
    desc: 'Illuminated bamboo rooftop garden with fairy lights for tranquil starlit evenings.',
    link: '/amenities',
    btnText: 'Explore Garden',
  },
]

export default function ExclusiveServices() {
  const sectionRef = useRef(null)
  const headingLabelRef = useRef(null)
  const titleWordsRef = useRef([])
  const goldLineRef = useRef(null)
  const cardsRef = useRef([])
  const imagesRef = useRef([])
  const bgGlowRef = useRef(null)
  const { openBooking } = useBooking()

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simple instant display for reduced motion
        gsap.set(
          [headingLabelRef.current, goldLineRef.current, titleWordsRef.current, cardsRef.current],
          { opacity: 1, y: 0, scale: 1, filter: 'none' }
        )
        return
      }

      // ─── A. CINEMATIC HEADING REVEAL ───
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Animate top label
      headingTl.fromTo(
        headingLabelRef.current,
        { opacity: 0, y: -15, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.9, ease: 'power3.out' }
      )

      // Animate golden line expanding outward with diamond glow
      headingTl.fromTo(
        goldLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )

      // Animate split heading words sliding up from overflow-hidden mask
      headingTl.fromTo(
        titleWordsRef.current,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power4.out',
        },
        '-=0.6'
      )

      // ─── B. STAGGERED CARD ENTRANCE ───
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 70,
          scale: 0.93,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── C. SUBTLE CONTINUOUS FLOATING ANIMATION ───
      const floatDurations = [4.4, 5.2, 4.8, 5.6]
      const floatDelays = [0, 0.4, 0.2, 0.6]

      cardsRef.current.forEach((card, index) => {
        if (!card) return
        gsap.to(card, {
          y: '-=6',
          duration: floatDurations[index % floatDurations.length],
          delay: floatDelays[index % floatDelays.length],
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // ─── D. SCROLL PARALLAX ON IMAGES ───
      imagesRef.current.forEach((img) => {
        if (!img) return
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      })

      // ─── I. SCROLL-BASED AMBIENT BACKGROUND GLOW ───
      if (bgGlowRef.current) {
        gsap.fromTo(
          bgGlowRef.current,
          { scale: 0.9, opacity: 0.4, yPercent: -10 },
          {
            scale: 1.2,
            opacity: 0.8,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d3330] py-24 lg:py-32 overflow-hidden border-t border-[#c9a84c]/20"
      aria-label="Our Exclusive Services"
    >
      {/* ── Ambient Background Lighting ── */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#1a4740]/40 via-[#c9a84c]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Golden Micro-Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { top: '15%', left: '10%', size: 3, dur: 4.8 },
          { top: '30%', left: '90%', size: 4, dur: 5.5 },
          { top: '75%', left: '18%', size: 3, dur: 4.2 },
          { top: '85%', left: '82%', size: 4, dur: 6.0 },
        ].map((pt, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#ffd875] opacity-25 animate-float-subtle"
            style={{
              top: pt.top,
              left: pt.left,
              width: pt.size,
              height: pt.size,
              animationDuration: `${pt.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Heading with Split Word Reveal ── */}
        <div className="text-center mb-16 lg:mb-20">
          <p
            ref={headingLabelRef}
            className="section-label mb-3 inline-flex items-center gap-2"
          >
            <Sparkles size={12} className="text-[#ffd875]" />
            Comfort &amp; Relax
          </p>

          {/* Animated Gold Divider Line */}
          <div
            ref={goldLineRef}
            className="gold-line mx-auto origin-center"
          />

          {/* Split Heading Words */}
          <h2
            className="text-white font-bold tracking-wide mt-2"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            {['Our', 'Exclusive', 'Service'].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden py-1 mx-1.5 sm:mx-2">
                <span
                  ref={(el) => (titleWordsRef.current[i] = el)}
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
            Indulge in tailored seaside hospitality, exquisite gastronomy, and tranquil rooftop recreation.
          </p>
        </div>

        {/* ── 4 Exclusive Service Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 items-stretch">
          {services.map((service, index) => (
            <ServiceCardItem
              key={service.id}
              service={service}
              index={index}
              setCardRef={(el) => (cardsRef.current[index] = el)}
              setImageRef={(el) => (imagesRef.current[index] = el)}
              onBook={() => openBooking({ roomType: service.label })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// INDIVIDUAL SERVICE CARD COMPONENT
// Features: 3D Perspective Tilt, Image Parallax Scrub,
// Golden Light Sheen, Magnetic Explore Button
// ─────────────────────────────────────────────────────────
function ServiceCardItem({ service, index, setCardRef, setImageRef, onBook }) {
  const cardRef = useRef(null)
  const innerRef = useRef(null)
  const shineRef = useRef(null)
  const btnRef = useRef(null)

  // Advanced 3D Tilt with smooth GSAP reset
  const handleMouseMove = (e) => {
    // Disable on non-hover touch devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const card = innerRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    // Center coordinates from -1 to 1
    const xPos = (clientX / rect.width) * 2 - 1
    const yPos = (clientY / rect.height) * 2 - 1

    // Target tilt angles (smooth and cinematic, max 7 degrees)
    const rotateX = -yPos * 7
    const rotateY = xPos * 7

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    })

    // Update specular gold shine layer
    if (shineRef.current) {
      const shineX = (clientX / rect.width) * 100
      const shineY = (clientY / rect.height) * 100
      shineRef.current.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 216, 117, 0.28) 0%, rgba(201, 168, 76, 0.08) 35%, transparent 70%)`
      shineRef.current.style.opacity = '1'
    }

    // Magnetic Explore Button pull
    if (btnRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect()
      const btnCenterX = btnRect.left + btnRect.width / 2
      const btnCenterY = btnRect.top + btnRect.height / 2
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY)

      if (dist < 100) {
        const pullX = (e.clientX - btnCenterX) * 0.25
        const pullY = (e.clientY - btnCenterY) * 0.25
        gsap.to(btnRef.current, { x: pullX, y: pullY, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
      }
    }
  }

  const handleMouseLeave = () => {
    const card = innerRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.45)',
    })

    if (shineRef.current) {
      shineRef.current.style.opacity = '0'
    }

    if (btnRef.current) {
      gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' })
    }
  }

  return (
    <div
      ref={(el) => {
        cardRef.current = el
        setCardRef(el)
      }}
      className="perspective-[1000px] h-full"
    >
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl bg-[#0d3330] border border-[#c9a84c]/20 hover:border-[#ffd875]/60 transition-colors duration-500 shadow-xl depth-shadow flex flex-col justify-between h-[460px] sm:h-[480px] lg:h-[500px] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Parallax Background Image ── */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <img
            ref={setImageRef}
            src={service.img}
            alt={service.label}
            className="absolute -top-[12.5%] left-0 w-full h-[125%] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.92] group-hover:brightness-100 will-change-transform"
            loading="lazy"
          />
        </div>

        {/* ── Cinematic Multi-Layer Gradient Overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d3330] via-[#0d3330]/50 to-black/30 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(13,51,48,0.7)_100%)] pointer-events-none" />

        {/* ── Specular Golden Shine Overlay (following cursor) ── */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-20 rounded-2xl"
        />

        {/* ── Diagonal Gold Reflection Sweep on Hover ── */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* ── Top Index & Category Badge ── */}
        <div
          className="relative z-20 p-6 flex items-center justify-between pointer-events-none"
          style={{ transform: 'translateZ(25px)' }}
        >
          <span className="font-mono text-xs font-semibold text-[#ffd875] tracking-widest bg-[#0d3330]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#c9a84c]/30 shadow-md">
            {service.id}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/70 font-medium bg-[#1a4740]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            {service.tag}
          </span>
        </div>

        {/* ── Bottom Content Card ── */}
        <div
          className="relative z-20 p-6 pb-7 mt-auto flex flex-col justify-end"
          style={{ transform: 'translateZ(30px)' }}
        >
          <h3
            className="text-white text-xl sm:text-2xl font-bold leading-snug tracking-wide group-hover:text-[#ffd875] transition-colors duration-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {service.label}
          </h3>

          {/* Golden animated expansion bar */}
          <div className="w-10 h-0.5 bg-[#c9a84c] my-3 group-hover:w-20 group-hover:bg-[#ffd875] transition-all duration-500 ease-out" />

          <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-5 font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {service.desc}
          </p>

          {/* ── Magnetic "Explore More" CTA Button ── */}
          <div className="pt-1">
            <Link
              to={service.link}
              ref={btnRef}
              onClick={(e) => {
                if (service.id === '01') {
                  // Direct room booking modal prompt or route
                }
              }}
              className="btn-gold-shimmer inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#ffd875] text-[#0d3330] font-bold text-xs uppercase tracking-wider px-4.5 py-2.5 rounded-lg shadow-lg shadow-black/40 hover:shadow-[#c9a84c]/30 transition-all duration-300 active:scale-95 group/btn"
              aria-label={`Explore ${service.label}`}
            >
              <span>{service.btnText}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
