import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Compass, ArrowUpRight, Sparkles, Navigation, X, ExternalLink, Phone, MessageCircle } from 'lucide-react'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'
import { usePrefersReducedMotion } from '../hooks/use3DEffects'

// Direct authentic photos for destinations
import tajpurImg from '../assets/destinations/tajpur.png'
import mandarmaniImg from '../assets/destinations/mandarmani.jpg'
import udaipurImg from '../assets/destinations/udaipur.png'
import talsariImg from '../assets/destinations/talsari.png'
import dighaMohanaImg from '../assets/destinations/digha-mohana.png'
import shankarpurImg from '../assets/destinations/shankarpur.png'
import jagannathDhamImg from '../assets/destinations/jagannath-dham.jpg'
import chandaneswarImg from '../assets/destinations/chandaneswar.png'
import scienceCityImg from '../assets/destinations/science-city.png'
import marineAquariumImg from '../assets/destinations/marine-aquarium.jpg'
import dheusagarParkImg from '../assets/destinations/dheusagar-park.jpg'
import amrabatiParkImg from '../assets/destinations/amrabati-park.jpg'

// The 12 destinations with authentic high-resolution imagery and rich metadata
const destinations = [
  {
    id: 'tajpur',
    name: 'Tajpur',
    distance: '18 km from hotel',
    tag: 'Secluded Beach & Pine Forests',
    desc: 'Fringed with dense tamarisk and casuarina groves, Tajpur is renowned for red ghost crabs, tranquil shores, and calm waters.',
    img: tajpurImg,
    category: 'Coastal Nature',
  },
  {
    id: 'mandarmani',
    name: 'Mandarmani',
    distance: '28 km from hotel',
    tag: 'Longest Drive-in Beach',
    desc: 'A vibrant seaside resort stretch boasting miles of hard-sand coastline where red crabs scurry against crimson ocean sunrises.',
    img: mandarmaniImg,
    category: 'Beach & Resorts',
  },
  {
    id: 'udaipur',
    name: 'Udaipur Sea Beach',
    distance: '4.5 km from hotel',
    tag: 'Bengal-Odisha Border Coast',
    desc: 'A pristine, uncrowded strip of coast right across the state border known for serene walks, fishing catamarans, and fresh coconut water.',
    img: udaipurImg,
    category: 'Serene Shoreline',
  },
  {
    id: 'talsari',
    name: 'Talsari',
    distance: '9 km from hotel',
    tag: 'Subarnarekha Estuary & Palms',
    desc: 'Meaning "rhythm of palm trees", Talsari weaves peaceful sand dunes, river confluences, and whispering palm trees with gentle tides.',
    img: talsariImg,
    category: 'Estuary & Flora',
  },
  {
    id: 'digha-mohana',
    name: 'Digha Mohana',
    distance: '6 km from hotel',
    tag: 'Estuary & Fresh Fish Market',
    desc: 'The bustling confluence of the Champa River and the Bay of Bengal, famous for early morning trawler arrivals, coastal bustle, and sea views.',
    img: dighaMohanaImg,
    category: 'Marine Confluence',
  },
  {
    id: 'shankarpur',
    name: 'Shankarpur',
    distance: '14 km from hotel',
    tag: 'Scenic Twin Harbor & Beach',
    desc: 'A quaint twin beach to Digha renowned for rustic fishing harbors, golden horizons, and casuarina plantations swaying in the ocean breeze.',
    img: shankarpurImg,
    category: 'Harbor & Beach',
  },
  {
    id: 'jagannath-dham',
    name: 'Jagannath Dham Digha',
    distance: '2.5 km from hotel',
    tag: 'Iconic Grand Coastal Temple',
    desc: 'A majestic architectural landmark and spiritual sanctuary resembling Puri Jagannath Temple, radiating timeless coastal divinity.',
    img: jagannathDhamImg,
    category: 'Spiritual Heritage',
  },
  {
    id: 'chandaneswar',
    name: 'Chandaneswar Temple',
    distance: '8 km from hotel',
    tag: 'Ancient Shiva Shrine',
    desc: 'A sacred historic temple dedicated to Lord Shiva situated across the Odisha boundary, revered by pilgrims during Maha Shivratri and Chadak.',
    img: chandaneswarImg,
    category: 'Ancient Shrine',
  },
  {
    id: 'science-city',
    name: 'Science City',
    distance: '2 km from hotel',
    tag: 'Interactive Centre & Planetarium',
    desc: 'An inspiring interactive science park and planetary exploration hub equipped with open-air exhibits, illusions, and educational models.',
    img: scienceCityImg,
    category: 'Discovery & Learning',
  },
  {
    id: 'marine-aquarium',
    name: 'Marine Aquarium',
    distance: '1.8 km from hotel',
    tag: 'MARC Ocean Life Display',
    desc: 'Maintained by the Zoological Survey of India, housing captivating regional marine species, live coral ecosystems, and sea anemones.',
    img: marineAquariumImg,
    category: 'Ocean Wildlife',
  },
  {
    id: 'dheusagar-park',
    name: 'Dheusagar Park',
    distance: '1.2 km from hotel',
    tag: 'Musical Fountains & Lakeside Walk',
    desc: 'A beautifully landscaped lake park in New Digha boasting rhythmic musical fountains, illuminated evening boardwalks, and cool sea breezes.',
    img: dheusagarParkImg,
    category: 'Lakeside Gardens',
  },
  {
    id: 'amrabati-park',
    name: 'Amrabati Park',
    distance: '2.2 km from hotel',
    tag: 'Ropeway & Boating Lake',
    desc: 'A lush ecological park featuring scenic cable ropeway rides crossing shimmering lakes, manicured lawns, and paddle boating.',
    img: amrabatiParkImg,
    category: 'Park & Recreation',
  },
]

export default function NearbyPlacesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const { ref: sectionRef, isInView } = useScrollReveal(0.1)

  const selectedDestination = destinations[selectedIndex]

  // Preload neighboring images into cache for instantaneous crossfades
  useEffect(() => {
    destinations.forEach((dest) => {
      const img = new Image()
      img.src = dest.img
    })
  }, [])

  // Lock scroll and handle escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsPlanModalOpen(false)
    }
    if (isPlanModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isPlanModalOpen])

  const handleSelect = useCallback((index) => {
    setSelectedIndex(index)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nearby-places"
      className="relative min-h-[95vh] py-24 lg:py-32 flex flex-col justify-center overflow-hidden bg-[#0d3330]"
      aria-label="Nearby Places to Visit"
    >
      {/* ── Dynamic Vivid Background Canvas with Crossfade & Ken Burns ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDestination.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={selectedDestination.img}
              alt={selectedDestination.name}
              className="w-full h-full object-cover object-center"
              initial={reducedMotion ? { scale: 1 } : { scale: 1.0 }}
              animate={reducedMotion ? { scale: 1 } : { scale: 1.06 }}
              transition={{
                duration: 14,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Soft & Light Translucent Overlay (Keeps Background Vividly Visible) ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d3330]/45 via-[#0d3330]/25 to-[#0d3330]/55" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0d3330]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0d3330]/70 to-transparent" />
      </div>

      {/* ── Foreground Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header with Light, Clean Typography */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-10 lg:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Compass size={14} className="text-[#e6c97a]" />
            <p className="text-[#e6c97a] text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">Destination</p>
            <Compass size={14} className="text-[#e6c97a]" />
          </div>
          <div className="gold-line mx-auto shadow-sm" />
          <h2
            className="text-white font-bold tracking-tight mb-3 text-shadow-lg"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              textShadow: '0 2px 14px rgba(0,0,0,0.7)',
            }}
          >
            Nearby Places to Visit
          </h2>
          <p
            className="text-white/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            Discover the enchanting coastal wonders, holy shrines, and scenic attractions situated just a leisurely drive from Hotel Sonajhuri.
          </p>
        </motion.div>

        {/* Selected Destination Feature Pill with Frosted Glass */}
        <motion.div
          key={`detail-${selectedDestination.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto mb-8 p-5 sm:p-6 rounded-2xl bg-[#0d3330]/60 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#c9a84c]/25 text-[#ffd875] px-2.5 py-0.5 rounded-full border border-[#c9a84c]/40 backdrop-blur-sm">
                {selectedDestination.category}
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1 font-light">
                <MapPin size={12} className="text-[#ffd875]" />
                {selectedDestination.distance}
              </span>
            </div>
            <h3
              className="text-white text-xl sm:text-2xl font-bold tracking-wide"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {selectedDestination.name}
            </h3>
            <p className="text-white/85 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2 font-light">
              {selectedDestination.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/15 pt-3 md:pt-0">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] text-[#ffd875] uppercase tracking-wider font-medium">Hotel Travel Desk</div>
              <div className="text-white/80 text-xs font-light">Assistance &amp; Sightseeing</div>
            </div>
            <button
              type="button"
              onClick={() => setIsPlanModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/40 whitespace-nowrap active:scale-95 shadow-md cursor-pointer hover:-translate-y-0.5"
              aria-label={`Plan Visit to ${selectedDestination.name}`}
            >
              <Navigation size={14} /> Plan Visit
            </button>
          </div>
        </motion.div>

        {/* ── 12 Light Translucent Glass Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
        >
          {destinations.map((dest, index) => {
            const isSelected = selectedIndex === index

            return (
              <DestinationCard
                key={dest.id}
                dest={dest}
                isSelected={isSelected}
                onClick={() => handleSelect(index)}
              />
            )
          })}
        </motion.div>

        {/* Subtle Bottom Travel Advice Note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mt-10 text-white/75 text-xs flex items-center justify-center gap-2 font-light"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}
        >
          <Sparkles size={13} className="text-[#ffd875]" />
          <span>Click on any destination above to view its panoramic background and travel distance</span>
          <Sparkles size={13} className="text-[#ffd875]" />
        </motion.div>
      </div>

      {/* ── Plan Visit Interactive Modal ── */}
      <AnimatePresence>
        {isPlanModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlanModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#092e29] border border-[#c9a84c]/50 shadow-2xl overflow-hidden z-10 text-[#F8F5EB]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image Banner */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                <img
                  src={selectedDestination.img}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092e29] via-[#092e29]/50 to-transparent" />

                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white flex items-center justify-center border border-white/20 transition-all duration-200 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>

                {/* Destination metadata overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#c9a84c] text-[#0d3330] px-2.5 py-0.5 rounded-full">
                      {selectedDestination.category}
                    </span>
                    <span className="text-white/90 text-xs flex items-center gap-1 font-medium bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                      <MapPin size={11} className="text-[#ffd875]" />
                      {selectedDestination.distance}
                    </span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {selectedDestination.name}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                  {selectedDestination.desc}
                </p>

                <div className="h-px bg-white/10 my-2" />

                <div className="space-y-2.5">
                  {/* Action 1: Google Maps Route */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=Hotel+Sonajhuri+New+Digha&destination=${encodeURIComponent(selectedDestination.name + ' Digha West Bengal')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#F5D77F] via-[#D6AD46] to-[#C49B38] text-[#032B25] font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#D6AD46]/30 hover:-translate-y-0.5 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#032B25]/15 flex items-center justify-center shrink-0">
                        <Navigation size={16} className="text-[#032B25] group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Open in Google Maps</div>
                        <div className="text-[11px] text-[#032B25]/85 font-normal">Direct driving route from Hotel Sonajhuri</div>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-[#032B25] shrink-0" />
                  </a>

                  {/* Action 2: WhatsApp Cab / Sightseeing Assistance */}
                  <a
                    href={`https://wa.me/919332656724?text=${encodeURIComponent(`Hi Hotel Sonajhuri, I want to plan a visit to ${selectedDestination.name} (${selectedDestination.distance}). Please assist with cab and sightseeing options.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/25 flex items-center justify-center shrink-0 text-[#25D366]">
                        <MessageCircle size={16} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm text-[#25D366]">Book Cab via WhatsApp</div>
                        <div className="text-[11px] text-white/70 font-light">Instant front desk concierge assistance</div>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[#25D366] shrink-0" />
                  </a>

                  {/* Action 3: Call Travel Desk */}
                  <a
                    href="tel:09332656724"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/90 hover:text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#ffd875]">
                        <Phone size={15} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">Call Travel Desk: 093326-56724</div>
                        <div className="text-[11px] text-white/60 font-light">Tours, autos &amp; private AC car rental</div>
                      </div>
                    </div>
                    <Phone size={15} className="text-[#ffd875] shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─────────────────────────────────────────────
// INDIVIDUAL DESTINATION CARD WITH LIGHT TRANSLUCENCY
// ─────────────────────────────────────────────
function DestinationCard({ dest, isSelected, onClick }) {
  const cardRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const rotateX = ((y - midY) / midY) * -5
    const rotateY = ((x - midX) / midX) * 5

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    cardRef.current.style.setProperty('--card-x', `${(x / rect.width) * 100}%`)
    cardRef.current.style.setProperty('--card-y', `${(y / rect.height) * 100}%`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      type="button"
      className="perspective-scene text-left w-full outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
      aria-pressed={isSelected}
    >
      <div
        ref={cardRef}
        style={{
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full rounded-xl overflow-hidden p-4 sm:p-4.5 flex items-center justify-between gap-3 border transition-all duration-300 ${
          isSelected
            ? 'bg-[#0d3330]/75 border-[#ffd875] shadow-2xl shadow-[#c9a84c]/30 ring-1 ring-[#ffd875]'
            : 'bg-[#0d3330]/40 hover:bg-[#0d3330]/65 border-white/20 hover:border-[#ffd875]/60 shadow-lg hover:shadow-2xl'
        } backdrop-blur-md`}
      >
        {/* Active Golden Corner Accent */}
        {isSelected && (
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
            <div className="absolute transform rotate-45 bg-[#c9a84c] top-[-8px] right-[-8px] w-8 h-8 shadow-sm" />
          </div>
        )}

        {/* Specular Radial Highlight Layer on Cursor Movement */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,216,117,0.18) 0%, transparent 60%)',
          }}
        />

        {/* Content Column with Light, Readable Typography */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isSelected ? 'bg-[#ffd875] shadow-[0_0_8px_#ffd875]' : 'bg-white/50'
              }`}
            />
            <span className="text-[11px] font-normal text-white/75 tracking-wide truncate">
              {dest.distance}
            </span>
          </div>

          <h4
            className={`font-semibold text-base sm:text-lg tracking-wide truncate transition-colors duration-200 ${
              isSelected ? 'text-[#ffd875]' : 'text-white'
            }`}
            style={{
              fontFamily: 'Playfair Display, serif',
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            {dest.name}
          </h4>

          <p className="text-white/75 text-xs truncate mt-0.5 font-sans font-light">
            {dest.tag}
          </p>
        </div>

        {/* Right Indicator Icon / Status */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isSelected
              ? 'bg-[#c9a84c] text-[#0d3330] rotate-45 shadow-md shadow-[#c9a84c]/50'
              : 'border border-white/30 text-white/80 group-hover:border-[#ffd875] group-hover:text-[#ffd875]'
          }`}
        >
          <ArrowUpRight size={15} />
        </div>
      </div>
    </motion.button>
  )
}
