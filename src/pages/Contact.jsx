import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useScrollReveal, fadeUp, slideLeft, slideRight } from '../hooks/useScrollReveal'

function PageHero() {
  return (
    <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden bg-[#07182B]">
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=70&auto=format&fit=crop"
        alt="Contact Hotel Sonajhuri"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 text-center px-4">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-3">
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
        >
          Contact Us
        </motion.h1>
        <div className="gold-line mx-auto mt-4" />
      </div>
    </section>
  )
}

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '093326-56724', href: 'tel:09332656724' },
  { icon: Mail, label: 'Email', value: 'info@hotelsonajhuri.com', href: 'mailto:info@hotelsonajhuri.com' },
  { icon: MapPin, label: 'Address', value: 'New Digha, East Midnapore, West Bengal, India', href: null },
  { icon: Clock, label: 'Reception', value: '24 Hours, 7 Days a Week', href: null },
]

export default function Contact() {
  const { ref: leftRef, isInView: leftIn } = useScrollReveal()
  const { ref: rightRef, isInView: rightIn } = useScrollReveal()

  return (
    <main>
      <PageHero />

      <section className="bg-[#10243A] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Contact Info */}
            <motion.div
              ref={leftRef}
              variants={slideLeft}
              initial="hidden"
              animate={leftIn ? 'visible' : 'hidden'}
            >
              <p className="section-label mb-3">Get In Touch</p>
              <div className="gold-line" />
              <h2 className="text-white font-bold mb-6"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                We'd Love to Hear From You
              </h2>
              <p className="text-white/60 leading-relaxed mb-10 text-sm">
                Whether you have a question about our rooms, services, or want to make a reservation, our team is always ready to help you.
              </p>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-white hover:text-[#c9a84c] transition-colors duration-200 font-medium">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Enquiry */}
            <motion.div
              ref={rightRef}
              variants={slideRight}
              initial="hidden"
              animate={rightIn ? 'visible' : 'hidden'}
            >
              <div className="bg-[#07182B] rounded-2xl p-8 border border-white/5">
                <h3 className="text-white font-semibold text-xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Quick Enquiry
                </h3>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-[#10243A] border border-white/10 focus:border-[#c9a84c] rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="Your Phone Number"
                        className="w-full bg-[#10243A] border border-white/10 focus:border-[#c9a84c] rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-[#10243A] border border-white/10 focus:border-[#c9a84c] rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Check In</label>
                      <input
                        type="date"
                        className="w-full bg-[#10243A] border border-white/10 focus:border-[#c9a84c] rounded-lg px-4 py-3 text-white/70 text-sm outline-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Check Out</label>
                      <input
                        type="date"
                        className="w-full bg-[#10243A] border border-white/10 focus:border-[#c9a84c] rounded-lg px-4 py-3 text-white/70 text-sm outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-[#10243A] border border-white/10 focus:border-[#c9a84c] rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#c9a84c] hover:bg-[#d4b870] text-[#07182B] font-semibold py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#c9a84c]/30"
                  >
                    Send Enquiry
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-16 rounded-2xl overflow-hidden h-80 relative border border-[#c9a84c]/20 depth-shadow"
          >
            <iframe
              src="https://maps.google.com/maps?q=Hotel+Sonajhuri+-+New+Digha&ll=21.6237715,87.5005749&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Hotel Sonajhuri - New Digha Location"
              className="grayscale-[20%] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            <a
              href="https://www.google.com/maps/place/Hotel+Sonajhuri+-+New+Digha/@21.623772,87.500575,2023m/data=!3m1!1e3!4m9!3m8!1s0x3a1ccd9d53a3686b:0x33ccb78e3f360935!5m2!4m1!1i2!8m2!3d21.6237715!4d87.5005749!16s%2Fg%2F11ss2w0bhk"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-[#07182B]/90 hover:bg-[#c9a84c] text-white hover:text-[#07182B] border border-[#c9a84c]/50 text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 shadow-md font-medium"
            >
              Open in Google Maps ↗
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
