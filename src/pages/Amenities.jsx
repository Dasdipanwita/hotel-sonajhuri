import { motion } from 'framer-motion'
import AmenitiesBentoSection from '../components/AmenitiesBentoSection'
import NearbyPlacesSection from '../components/NearbyPlacesSection'

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#061426]">
      <motion.img
        src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=70&auto=format&fit=crop"
        alt="Hotel Sonajhuri Amenities"
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-110"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#061426]/40 via-[#061426]/65 to-[#061426]" />
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D9AD4F] mb-3"
        >
          HOTEL SERVICES
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#F8F3E9] font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Amenities
        </motion.h1>
        <div className="w-16 h-[2px] bg-[#D9AD4F] mx-auto mt-4" />
      </div>
    </section>
  )
}

export default function Amenities() {
  return (
    <main className="bg-[#061426] text-[#F8F3E9]">
      <PageHero />
      <AmenitiesBentoSection />
      <NearbyPlacesSection />
    </main>
  )
}
