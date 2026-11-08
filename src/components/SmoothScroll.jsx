import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame to GSAP ticker
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)

    // Disable lag smoothing for instant response without stuttering
    gsap.ticker.lagSmoothing(0)

    // Make lenis globally accessible if needed
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
