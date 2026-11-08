import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Menu, X, Calendar } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import logoImg from '../assets/logo.png'

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Amenities', to: '/amenities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openBooking } = useBooking()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0d3330] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:09332656724" className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors duration-200">
              <Phone size={12} />
              <span>093326-56724</span>
            </a>
            <a href="mailto:info@hotelsonajhuri.com" className="flex items-center gap-2 hover:text-[#c9a84c] transition-colors duration-200">
              <Mail size={12} />
              <span>info@hotelsonajhuri.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="w-7 h-7 border border-[#c9a84c]/50 rounded flex items-center justify-center hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200">
              <InstagramIcon size={12} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="w-7 h-7 border border-[#c9a84c]/50 rounded flex items-center justify-center hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all duration-200">
              <FacebookIcon size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1a4740]/98 backdrop-blur-md shadow-2xl shadow-black/20'
            : 'bg-[#1a4740]'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="Hotel Sonajhuri Logo"
                className="h-14 w-auto max-w-[65px] object-contain rounded drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Hotel Sonajhuri
                </div>
                <div className="text-[#c9a84c] text-[10px] tracking-widest uppercase">An unit of Hotel Priyadarshini</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                      isActive ? 'text-[#c9a84c]' : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#c9a84c] transition-all duration-300 ${
                        isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Book Now Button */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.button
                onClick={() => openBooking()}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold-shimmer flex items-center gap-2 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold text-sm px-5 py-2.5 rounded transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/30 cursor-pointer"
              >
                <Calendar size={15} />
                Book Now
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-white hover:text-[#c9a84c] transition-colors duration-200"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 w-80 max-w-full h-full bg-[#0d3330] flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Hotel Sonajhuri Logo"
                    className="h-11 w-auto max-w-[50px] object-contain rounded"
                  />
                  <div>
                    <div className="text-white font-bold text-base leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Hotel Sonajhuri
                    </div>
                    <div className="text-[#c9a84c] text-[9px] tracking-widest uppercase">An unit of Hotel Priyadarshini</div>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-[#c9a84c] transition-colors">
                  <X size={22} />
                </button>
              </div>

              {/* Mobile links */}
              <nav className="flex-1 py-6 px-6 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-3.5 border-b border-white/5 text-base font-medium transition-colors duration-200 ${
                          isActive ? 'text-[#c9a84c]' : 'text-white/80 hover:text-[#c9a84c]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile footer */}
              <div className="p-6 border-t border-white/10 space-y-3">
                <a href="tel:09332656724" className="flex items-center gap-3 text-white/70 text-sm hover:text-[#c9a84c] transition-colors">
                  <Phone size={15} /> 093326-56724
                </a>
                <a href="mailto:info@hotelsonajhuri.com" className="flex items-center gap-3 text-white/70 text-sm hover:text-[#c9a84c] transition-colors">
                  <Mail size={15} /> info@hotelsonajhuri.com
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    openBooking()
                  }}
                  className="btn-gold-shimmer mt-4 flex items-center justify-center gap-2 w-full bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] font-semibold py-3 rounded transition-all duration-300 cursor-pointer"
                >
                  <Calendar size={16} /> Book Now
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
