import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2C6.496 2 2 6.494 2 12.029c0 1.77.463 3.498 1.343 5.025L2 22l5.105-1.34c1.478.807 3.14 1.233 4.926 1.233 5.534 0 10.03-4.494 10.03-10.029C22.061 6.494 17.565 2 12.031 2zm5.836 14.195c-.244.688-1.42 1.319-1.956 1.365-.515.044-1.18.064-3.793-.996-3.342-1.355-5.496-4.78-5.663-5.001-.166-.222-1.354-1.803-1.354-3.438 0-1.636.852-2.441 1.155-2.773.303-.332.663-.415.885-.415.222 0 .443.002.636.012.203.01.473-.077.74.565.277.664.94 2.296 1.023 2.463.083.166.138.36.027.581-.11.222-.166.36-.332.553-.166.194-.35.433-.5.581-.166.166-.34.348-.146.681.194.332.864 1.425 1.854 2.308 1.274 1.135 2.348 1.488 2.68 1.654.332.166.526.138.72-.083.194-.221.83-1.024 1.052-1.383.222-.36.443-.304.747-.194.304.11 1.938.913 2.27 1.079.332.166.553.249.636.387.083.138.083.803-.161 1.491z"/>
    </svg>
  )
}

export default function FloatingActions() {
  const whatsappUrl =
    'https://wa.me/919332656724?text=' +
    encodeURIComponent('Hello Hotel Sonajhuri, I would like to inquire about room availability and booking.')

  return (
    <aside aria-label="Quick contact links" className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 pointer-events-auto">
      {/* WhatsApp Button (Deep Navy & Champagne Gold Theme) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative group w-12 h-12 bg-[#10243A] text-[#D6A93D] border border-[#D6A93D]/50 rounded-full flex items-center justify-center shadow-lg shadow-black/40 hover:bg-[#D6A93D] hover:text-[#10243A] transition-colors duration-300 pulse-ring-gold"
        initial={{ opacity: 0, scale: 0, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        <WhatsAppIcon size={26} />

        {/* Tooltip */}
        <span className="absolute left-14 whitespace-nowrap bg-[#0B1B2B] text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-xl border border-[#D6A93D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Direct Phone Call Button */}
      <motion.a
        href="tel:09332656724"
        aria-label="Call Hotel Reception"
        className="relative group w-12 h-12 bg-[#0B1B2B] text-[#D6A93D] border border-[#D6A93D]/50 rounded-full flex items-center justify-center shadow-lg shadow-black/40 hover:bg-[#10243A] hover:text-[#F2CE75] transition-colors duration-300 pulse-ring-gold"
        initial={{ opacity: 0, scale: 0, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        <Phone size={20} />

        {/* Tooltip */}
        <span className="absolute left-14 whitespace-nowrap bg-[#0B1B2B] text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-xl border border-[#D6A93D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          Call 093326-56724
        </span>
      </motion.a>
    </aside>
  )
}
