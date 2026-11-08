/**
 * Custom hooks for 3D interactions
 * Uses CSS transforms and Framer Motion — no WebGL required.
 * Respects prefers-reduced-motion for accessibility.
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// -------------------------------------------------
// Detect reduced-motion preference
// -------------------------------------------------
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// -------------------------------------------------
// 3D Tilt Hook — for room cards
// Returns ref + spring motion values for rotateX/Y + scale
// -------------------------------------------------
export function use3DTilt({ maxTilt = 10, scale = 1.03 } = {}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawScale = useMotionValue(1)

  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 }
  const rotateX = useSpring(rawX, springConfig)
  const rotateY = useSpring(rawY, springConfig)
  const scaleSpring = useSpring(rawScale, springConfig)

  const handleMouseMove = useCallback((e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rawY.set(dx * maxTilt)
    rawX.set(-dy * maxTilt)
    rawScale.set(scale)
  }, [reduced, maxTilt, scale, rawX, rawY, rawScale])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    rawScale.set(1)
  }, [rawX, rawY, rawScale])

  // Touch support — reset on touch end
  const handleTouchEnd = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    rawScale.set(1)
  }, [rawX, rawY, rawScale])

  return {
    ref,
    rotateX,
    rotateY,
    scale: scaleSpring,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onTouchEnd: handleTouchEnd,
  }
}

// -------------------------------------------------
// Parallax Scroll Hook — for hero layers
// Returns a motion value that maps scroll progress to offset
// -------------------------------------------------
export function useParallaxScroll(strength = 0.3) {
  const y = useMotionValue(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const handler = () => {
      y.set(window.scrollY * strength)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [reduced, strength, y])

  return y
}

// -------------------------------------------------
// Mouse Parallax Hook — for hero content layers
// Maps cursor position to x/y offsets for depth layers
// -------------------------------------------------
export function useMouseParallax(strength = 15) {
  const reduced = usePrefersReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { stiffness: 60, damping: 20, mass: 1 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  useEffect(() => {
    if (reduced) return
    const handler = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rawX.set(((e.clientX - cx) / cx) * strength)
      rawY.set(((e.clientY - cy) / cy) * strength)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [reduced, strength, rawX, rawY])

  return { x, y }
}
