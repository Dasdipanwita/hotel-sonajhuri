import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BedDouble, Bath, Maximize2 } from 'lucide-react'
import { useScrollReveal, fadeUp } from '../hooks/useScrollReveal'
import { use3DTilt } from '../hooks/use3DEffects'
import { useBooking } from '../context/BookingContext'
import roomFamilyDoubleBedImg from '../assets/gallery/room-family-double-bed.jpg'
import roomDeluxeTwinImg from '../assets/gallery/room-deluxe-twin.png'
import roomBalconySeatingImg from '../assets/gallery/room-balcony-seating.jpg'
import roomViewImg from '../assets/gallery/sonajhuri-room-view.png'

const rooms = [
  {
    img: roomFamilyDoubleBedImg,
    name: 'Super Deluxe Room',
    desc: 'Spacious family double bed room with false ceiling and warm seaside ambiance.',
    bed: '2 Bed',
    size: '300 sq.ft',
    bath: '1 Bathroom',
    includes: ['Breakfast Included', 'AC', 'Smart TV', 'Free Wi-Fi'],
  },
  {
    img: roomDeluxeTwinImg,
    name: 'Deluxe Room',
    desc: 'Spacious, stylish twin bed setup with modern lighting and premium comfort.',
    bed: 'Twin Bed',
    size: '220 sq.ft',
    bath: '1 Bathroom',
    includes: ['AC', 'Smart TV', 'Free Wi-Fi', 'Room Service'],
  },
  {
    img: roomBalconySeatingImg,
    name: 'Balcony View Room',
    desc: 'Cozy and comfortable with scenic private balcony seating overlooking New Digha.',
    bed: 'Double Bed',
    size: '200 sq.ft',
    bath: '1 Bathroom',
    includes: ['AC', 'Private Balcony', 'TV', 'Free Wi-Fi'],
  },
  {
    img: roomViewImg,
    name: 'Triple Sharing Room',
    desc: 'Ideal for friends or families traveling together — spacious room with wide window views.',
    bed: '3 Beds',
    size: '280 sq.ft',
    bath: '1 Bathroom',
    includes: ['AC', 'Smart TV', 'Free Wi-Fi', 'Extra Mattress'],
  },
]

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#0d3330]">
      <motion.img
        src={roomFamilyDoubleBedImg}
        alt="Rooms at Hotel Sonajhuri"
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d3330]/30 via-[#0d3330]/55 to-[#0d3330]/75" />
      <div className="relative z-10 text-center px-4">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-3">
          Hotel Sonajhuri
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Rooms &amp; Suites
        </motion.h1>
        <div className="gold-line mx-auto mt-4" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ROOM CARD — 3D Tilt + Shimmer
// ─────────────────────────────────────────────
function RoomCard({ room, index }) {
  const { ref: revealRef, isInView } = useScrollReveal()
  const { openBooking } = useBooking()
  const tilt = use3DTilt({ maxTilt: 7, scale: 1.025 })
  const shineRef = useRef(null)

  const handleMouseMove = (e) => {
    tilt.onMouseMove(e)
    if (!shineRef.current || !tilt.ref.current) return
    const rect = tilt.ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    shineRef.current.style.setProperty('--shine-x', `${x}%`)
    shineRef.current.style.setProperty('--shine-y', `${y}%`)
  }

  return (
    <motion.div
      ref={revealRef}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      className="perspective-scene"
    >
      <motion.article
        ref={tilt.ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        onTouchEnd={tilt.onTouchEnd}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.scale,
        }}
        className="tilt-card relative bg-[#0d3330] rounded-2xl overflow-hidden border border-white/5 hover:border-[#c9a84c]/30 transition-colors duration-500 depth-shadow group"
      >
        {/* Gold shimmer layer */}
        <div ref={shineRef} className="tilt-card-shine rounded-2xl" />

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={room.img}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3330]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-7">
          <h3 className="text-white font-semibold text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {room.name}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-5">{room.desc}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <BedDouble size={15} className="text-[#c9a84c]" /> {room.bed}
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Maximize2 size={15} className="text-[#c9a84c]" /> {room.size}
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Bath size={15} className="text-[#c9a84c]" /> {room.bath}
            </div>
          </div>

          {/* Includes */}
          <div className="flex flex-wrap gap-2 mb-6">
            {room.includes.map((item) => (
              <span key={item} className="text-xs bg-[#1a4740] text-white/60 px-3 py-1 rounded-full border border-white/10">
                {item}
              </span>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => openBooking({ roomType: room.name })}
            className="btn-gold-shimmer flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold px-5 py-2.5 rounded w-full justify-center transition-colors duration-300 group/btn cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#c9a84c]/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Book Now <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Rooms() {
  const { ref: titleRef, isInView: titleIn } = useScrollReveal()

  return (
    <main>
      <PageHero />

      <section className="bg-[#1a4740] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleRef}
            variants={fadeUp}
            initial="hidden"
            animate={titleIn ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Our Accommodations</p>
            <div className="gold-line mx-auto" />
            <h2
              className="text-white font-bold"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Choose Your Perfect Room
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              Each room at Hotel Sonajhuri is designed to provide a comfortable and memorable stay.
              To inquire about pricing and availability, please call us directly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {rooms.map((room, i) => (
              <RoomCard key={room.name} room={room} index={i} />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-16 text-center bg-[#0d3330] rounded-2xl p-10 border border-[#c9a84c]/20 depth-shadow"
          >
            <p className="section-label mb-3">Book Direct &amp; Save</p>
            <div className="gold-line mx-auto" />
            <h3 className="text-white font-bold text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Call Us for Best Rates
            </h3>
            <p className="text-white/60 mb-6 text-sm">Contact us directly to enquire about availability, pricing, and special packages.</p>
            <motion.a
              href="tel:09332656724"
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold px-8 py-4 rounded transition-colors duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/30"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              093326-56724
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
