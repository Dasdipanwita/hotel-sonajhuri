import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          onClick={() => {
            if (window.__lenis) {
              window.__lenis.scrollTo(0, { duration: 1.2 })
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#c9a84c] hover:bg-[#d4b870] text-[#0d3330] rounded-full shadow-lg shadow-black/30 flex items-center justify-center transition-colors duration-200"
          aria-label="Back to top"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
