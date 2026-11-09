import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
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

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#07182B] text-white">
      {/* Top CTA Band */}
      <div className="bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#07182B] font-semibold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready for a coastal escape?
            </p>
            <p className="text-[#07182B]/80 text-sm">Book your stay at Hotel Sonajhuri, New Digha</p>
          </div>
          <a
            href="tel:09332656724"
            className="flex items-center gap-2 bg-[#07182B] text-[#c9a84c] font-semibold px-6 py-3 rounded hover:bg-[#10243A] transition-all duration-300 whitespace-nowrap"
          >
            <Phone size={16} /> Call to Book
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="Hotel Sonajhuri Logo"
                className="h-14 w-auto max-w-[65px] object-contain rounded drop-shadow-md"
              />
              <div>
                <div className="text-white font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>Hotel Sonajhuri</div>
                <div className="text-[#c9a84c] text-[10px] tracking-widest uppercase">An unit of Hotel Priyadarshini</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A peaceful coastal retreat nestled in the heart of New Digha, designed for relaxation and comfort by the sea.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all duration-300">
                <InstagramIcon size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:bg-[#c9a84c] hover:border-[#c9a84c] transition-all duration-300">
                <FacebookIcon size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-widest uppercase font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Rooms & Suites', to: '/rooms' },
                { label: 'Amenities', to: '/amenities' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Blogs', to: '/blogs' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-widest uppercase font-semibold mb-5">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Premium Rooms',
                'Restaurant & Dining',
                'Rooftop Swimming Pool',
                'Terrace Lawn',
                'Room Service',
                'Car Rental Service',
                'Free Wi-Fi',
                '24x7 Power Backup',
              ].map((s) => (
                <li key={s} className="text-white/60 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#c9a84c] flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-widest uppercase font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:09332656724" className="flex items-start gap-3 text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200 group">
                  <Phone size={15} className="mt-0.5 flex-shrink-0 group-hover:text-[#c9a84c]" />
                  <span>093326-56724</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@hotelsonajhuri.com" className="flex items-start gap-3 text-white/60 text-sm hover:text-[#c9a84c] transition-colors duration-200 group">
                  <Mail size={15} className="mt-0.5 flex-shrink-0 group-hover:text-[#c9a84c]" />
                  <span>info@hotelsonajhuri.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0 text-[#c9a84c]" />
                  <span>New Digha, East Midnapore,<br />West Bengal, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>&copy; {year} Hotel Sonajhuri. All rights reserved.</p>
          <p>Designed with ♥ for Hotel Sonajhuri, New Digha</p>
        </div>
      </div>
    </footer>
  )
}
