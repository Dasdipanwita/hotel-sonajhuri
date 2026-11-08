import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Menu, X, Calendar } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import logoImg from '../assets/logo.png'

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* ── TOP UTILITY BAR (ELEGANT & DISCREET) ── */}
      <div className="bg-[#032B25] text-[#F8F5EB]/80 text-xs py-2 px-4 border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:09332656724"
              className="flex items-center gap-2 hover:text-[#D6AD46] transition-colors duration-200"
            >
              <Phone size={12} className="text-[#D6AD46]" />
              <span className="tracking-wide">093326-56724</span>
            </a>
            <a
              href="mailto:info@hotelsonajhuri.com"
              className="flex items-center gap-2 hover:text-[#D6AD46] transition-colors duration-200"
            >
              <Mail size={12} className="text-[#D6AD46]" />
              <span className="tracking-wide">info@hotelsonajhuri.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-wider text-[#D6AD46]/80 font-medium">
              New Digha, West Bengal
            </span>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded flex items-center justify-center text-white/70 hover:text-[#D6AD46] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={13} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded flex items-center justify-center text-white/70 hover:text-[#D6AD46] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN STICKY NAVBAR ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#032B25]/95 backdrop-blur-xl shadow-xl shadow-black/40 border-b border-[#D6AD46]/25 py-3'
            : 'bg-[#063B32]/45 backdrop-blur-md border-b border-white/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src={logoImg}
                alt="Hotel Sonajhuri Logo"
                className="h-12 sm:h-14 w-auto max-w-[60px] object-contain rounded drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <div
                  className="text-[#F8F5EB] font-serif font-bold text-lg sm:text-xl leading-tight tracking-wide"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  Hotel Sonajhuri
                </div>
                <div className="text-[#D6AD46] text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium">
                  An unit of Hotel Priyadarshini
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group ${
                      isActive ? 'text-[#D6AD46]' : 'text-[#F8F5EB]/85 hover:text-[#F8F5EB]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {/* Thin golden active navigation indicator */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#D6AD46] transition-all duration-300 rounded-full ${
                          isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4 opacity-75'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Book Now Button (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                type="button"
                onClick={() => openBooking()}
                className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider text-[#032B25] overflow-hidden cursor-pointer shadow-md shadow-[#032B25]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#D6AD46]/30 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #F5D77F 0%, #D6AD46 50%, #C49B38 100%)',
                }}
              >
                <Calendar size={14} className="transition-transform duration-300 group-hover:scale-110" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-[#F8F5EB] hover:text-[#D6AD46] transition-colors duration-200 cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER NAVIGATION ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Drawer */}
            <motion.aside
              className="fixed top-0 right-0 z-50 w-80 max-w-full h-full bg-[#032B25] border-l border-[#D6AD46]/20 flex flex-col shadow-2xl text-[#F8F5EB]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={logoImg}
                    alt="Hotel Sonajhuri Logo"
                    className="h-11 w-auto max-w-[50px] object-contain rounded"
                  />
                  <div>
                    <div
                      className="text-white font-bold text-base leading-tight"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                      Hotel Sonajhuri
                    </div>
                    <div className="text-[#D6AD46] text-[9px] tracking-widest uppercase">
                      An unit of Hotel Priyadarshini
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-white/60 hover:text-[#D6AD46] transition-colors p-1"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-6 px-6 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-3.5 border-b border-white/5 text-base font-medium tracking-wide transition-colors duration-200 ${
                          isActive ? 'text-[#D6AD46]' : 'text-white/80 hover:text-[#D6AD46]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer Contact & CTA */}
              <div className="p-6 border-t border-white/10 space-y-3 bg-[#02211C]">
                <a
                  href="tel:09332656724"
                  className="flex items-center gap-3 text-white/80 text-sm hover:text-[#D6AD46] transition-colors"
                >
                  <Phone size={15} className="text-[#D6AD46]" />
                  <span>093326-56724</span>
                </a>
                <a
                  href="mailto:info@hotelsonajhuri.com"
                  className="flex items-center gap-3 text-white/80 text-sm hover:text-[#D6AD46] transition-colors"
                >
                  <Mail size={15} className="text-[#D6AD46]" />
                  <span>info@hotelsonajhuri.com</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    openBooking()
                  }}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-[#032B25] shadow-lg shadow-black/40 transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #F5D77F 0%, #D6AD46 50%, #C49B38 100%)',
                  }}
                >
                  <Calendar size={15} />
                  <span>Book Now</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
