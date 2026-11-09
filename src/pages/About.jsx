import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Star, Shield, Heart, Award } from 'lucide-react'
import { useScrollReveal, fadeUp, slideLeft, slideRight, staggerContainer } from '../hooks/useScrollReveal'
import heroPoolImg from '../assets/sonajhuri-pool-hero.jpg'
import receptionImg from '../assets/gallery/sonajhuri-reception.png'
import restaurantImg from '../assets/offers-02.jpg'
import roomImg from '../assets/gallery/room-family-double-bed.jpg'

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#07182B]">
      <motion.img
        src={heroPoolImg}
        alt="About Hotel Sonajhuri"
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07182B]/30 via-[#07182B]/55 to-[#07182B]/75" />
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-label mb-3"
        >
          About Sonajhuri
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          A Tranquil Escape By The Sea
        </motion.h1>
        <div className="gold-line mx-auto mt-4" />
      </div>
    </section>
  )
}

const values = [
  { icon: Heart, title: 'Warm Hospitality', desc: 'We treat every guest like family, ensuring a warm and personalized experience.' },
  { icon: Shield, title: 'Safety & Comfort', desc: '24x7 security, power backup, and thoughtfully designed spaces for your peace of mind.' },
  { icon: Star, title: 'Premium Quality', desc: 'From our rooms to our restaurant, every detail is crafted for excellence.' },
  { icon: Award, title: 'Trusted Heritage', desc: 'An established unit of Hotel Priyadarshini with years of trusted service.' },
]

// ─────────────────────────────────────────────
// VALUE CARD — depth lift on hover
// ─────────────────────────────────────────────
function ValueCard({ icon: Icon, title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[#10243A] rounded-xl p-6 border border-white/5 hover:border-[#c9a84c]/30 transition-colors duration-300 group text-center depth-shadow cursor-default"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#c9a84c]/20 transition-colors duration-300"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Icon size={22} className="text-[#c9a84c]" />
      </motion.div>
      <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function About() {
  const { ref: s1Ref, isInView: s1In } = useScrollReveal()
  const { ref: s2Ref, isInView: s2In } = useScrollReveal()
  const { ref: s3Ref, isInView: s3In } = useScrollReveal()
  const { ref: s4Ref, isInView: s4In } = useScrollReveal()

  // Scroll-based parallax for image grid
  const imageGridRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageGridRef, offset: ['start end', 'end start'] })
  const img1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const img2Y = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <main>
      <PageHero />

      {/* Main About */}
      <section className="bg-[#10243A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              ref={s1Ref}
              variants={slideLeft}
              initial="hidden"
              animate={s1In ? 'visible' : 'hidden'}
            >
              <p className="section-label mb-3">About Sonajhuri</p>
              <div className="gold-line" />
              <h2
                className="text-white font-bold mb-6"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                A Tranquil Escape By The Sea
              </h2>
              <p className="text-white/70 leading-relaxed mb-5">
                Nestled in the heart of New Digha, Hotel Sonajhuri is a peaceful coastal retreat designed for relaxation and comfort. Surrounded by serene landscapes and just moments from the shore, we offer a refined experience where warm hospitality meets modern elegance.
              </p>
              <p className="text-white/70 leading-relaxed mb-5">
                Whether you're here for a quiet getaway or an adventurous seaside escape, Sonajhuri welcomes you to unwind in style. Our team of dedicated professionals is committed to making every stay memorable.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                As an unit of Hotel Priyadarshini, we bring years of hospitality experience to every interaction, ensuring your stay exceeds expectations.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link to="/rooms" className="btn-gold-shimmer flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#07182B] font-semibold px-6 py-3 rounded transition-colors duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/25">
                    Book Room
                  </Link>
                </motion.div>
                <a href="tel:09332656724" className="flex items-center gap-3 text-white/70 hover:text-[#c9a84c] transition-colors duration-200">
                  <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-[#c9a84c] transition-colors">
                    <Phone size={16} />
                  </span>
                  <span className="font-medium text-sm">093326-56724</span>
                </a>
              </div>
            </motion.div>

            {/* Image grid with scroll-driven vertical parallax offset */}
            <motion.div
              ref={(el) => {
                s2Ref.current = el
                imageGridRef.current = el
              }}
              variants={slideRight}
              initial="hidden"
              animate={s2In ? 'visible' : 'hidden'}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Odd images shift up on scroll */}
                <motion.div style={{ y: img1Y }} className="space-y-4">
                  <div className="overflow-hidden rounded-xl h-64 group depth-shadow">
                    <img
                      src={receptionImg}
                      alt="Hotel Sonajhuri Reception"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl h-48 group depth-shadow">
                    <img
                      src={restaurantImg}
                      alt="Hotel Sonajhuri Restaurant"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
                {/* Even images shift down on scroll — creates depth separation */}
                <motion.div style={{ y: img2Y }} className="space-y-4 mt-10">
                  <div className="overflow-hidden rounded-xl h-48 group depth-shadow">
                    <img
                      src={roomImg}
                      alt="Hotel Sonajhuri Guest Room"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl h-64 group depth-shadow">
                    <img
                      src={heroPoolImg}
                      alt="Hotel Sonajhuri Rooftop Swimming Pool"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#07182B] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={s3Ref}
            variants={fadeUp}
            initial="hidden"
            animate={s3In ? 'visible' : 'hidden'}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Our Promise</p>
            <div className="gold-line mx-auto" />
            <h2
              className="text-white font-bold"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Why Choose Sonajhuri
            </h2>
          </motion.div>
          <motion.div
            ref={s4Ref}
            variants={staggerContainer}
            initial="hidden"
            animate={s4In ? 'visible' : 'hidden'}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map(({ icon, title, desc }) => (
              <ValueCard key={title} icon={icon} title={title} desc={desc} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
