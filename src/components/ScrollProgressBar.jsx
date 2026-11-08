import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a8873c] via-[#ffd875] to-[#c9a84c] origin-left z-[100] shadow-[0_0_10px_rgba(255,216,117,0.7)] pointer-events-none"
    />
  )
}
