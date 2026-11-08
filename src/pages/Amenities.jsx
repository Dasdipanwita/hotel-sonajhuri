import { motion } from 'framer-motion'
import { Wifi, Car, Coffee, Waves, Tv, Zap, BedDouble, Car as CarIcon } from 'lucide-react'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'
import NearbyPlacesSection from '../components/NearbyPlacesSection'

const amenities = [
  { icon: BedDouble, label: 'Room Service', desc: '24-hour room service for all your needs' },
  { icon: Tv, label: 'Smart TV', desc: 'Premium channels and streaming services' },
  { icon: Wifi, label: 'Free Wi-Fi', desc: 'High-speed internet throughout the hotel' },
  { icon: Car, label: 'Car Parking', desc: 'Secure on-site parking facilities' },
  { icon: Zap, label: '24x7 Power Backup', desc: 'Uninterrupted power supply at all times' },
  { icon: Waves, label: 'Swimming Pool', desc: 'Rooftop pool with scenic views' },
  { icon: Coffee, label: 'Tea / Coffee Maker', desc: 'In-room tea and coffee making facilities' },
  { icon: CarIcon, label: 'Car Rental Service', desc: 'Convenient car rental and local sightseeing' },
]

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#0d3330]">
      <motion.img
        src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=70&auto=format&fit=crop"
        alt="Hotel Amenities"
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d3330]/30 via-[#0d3330]/55 to-[#0d3330]/75" />
      <div className="relative z-10 text-center px-4">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-3">
          Hotel Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Amenities
        </motion.h1>
        <div className="gold-line mx-auto mt-4" />
      </div>
    </section>
  )
}

function AmenityCard({ icon: Icon, label, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[#0d3330] rounded-xl p-6 text-center border border-white/5 hover:border-[#c9a84c]/40 transition-colors duration-300 group depth-shadow cursor-default"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full border-2 border-[#c9a84c]/40 flex items-center justify-center mx-auto mb-4 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/10 transition-colors duration-300"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 15 }}
      >
        <Icon size={26} className="text-[#c9a84c]" />
      </motion.div>
      <h3 className="text-white font-semibold text-sm mb-2">{label}</h3>
      <p className="text-white/50 text-xs leading-relaxed hidden md:block">{desc}</p>
    </motion.div>
  )
}

export default function Amenities() {
  const { ref: s1Ref, isInView: s1In } = useScrollReveal()
  const { ref: s2Ref, isInView: s2In } = useScrollReveal()

  return (
    <main>
      <PageHero />

      {/* Amenities Grid */}
      <section className="bg-[#1a4740] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={s1Ref}
            variants={fadeUp}
            initial="hidden"
            animate={s1In ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">What We Offer</p>
            <div className="gold-line mx-auto" />
            <h2
              className="text-white font-bold"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Hotel Amenities
            </h2>
          </motion.div>

          <motion.div
            ref={s2Ref}
            variants={staggerContainer}
            initial="hidden"
            animate={s2In ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {amenities.map(({ icon, label, desc }) => (
              <AmenityCard key={label} icon={icon} label={label} desc={desc} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Nearby Places to Visit Section */}
      <NearbyPlacesSection />
    </main>
  )
}
