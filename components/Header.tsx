"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import HomeHeroContent from './HomeHeroContent'
import HeroBlobs from '@/components/HeroBlobs'
// Static gradient classes for each slide's accent color
const gradients = [
  "from-violet-600 to-indigo-600",
  "from-emerald-600 to-cyan-600",
  "from-orange-600 to-rose-600",
] as const

/**
 * Creates framer-motion variants for slide transitions.
 * Direction-aware: slides enter from the right when going forward,
 * and from the left when going backward (respects RTL).
 */
function createSlideVariants(isRtl: boolean) {
  const dir = isRtl ? -1 : 1
  return {
    enter: (slideDir: number) => ({
      x: dir * slideDir * 300,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (slideDir: number) => ({
      x: dir * slideDir * -300,
      opacity: 0,
      scale: 0.95,
    }),
  }
}

const Header = () => {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isRtl = locale === 'fa'
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const isHomePage = segments.length <= 1

  // Slide data from translation messages
  const slides = t.raw('slides') as Array<{
    tag: string
    title: string
    description: string
  }>

  // [currentPage, direction] — direction is +1 (forward) or -1 (backward)
  const [[page, direction], setPage] = useState([0, 1])
  const [isPaused, setIsPaused] = useState(false)

  // Memoize variants so they don't re-create on every render
  const slideVariants = useMemo(() => createSlideVariants(isRtl), [isRtl])

  // Go to the next/previous slide
  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([current]) => {
        const next = (current + newDirection + slides.length) % slides.length
        return [next, newDirection]
      })
    },
    [slides.length]
  )

  // Auto-advance every 5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [isPaused, paginate])

  const slide = slides[page]
  const gradient = gradients[page]

  return (
    <header
      className="relative min-h-screen flex items-center overflow-hidden grid-pattern"
      id="hero"
    >
      {/* Decorative blurred background blobs */}
      <HeroBlobs />

      {/* Particle canvas (placeholder for future canvas animation) */}
      <canvas id="particles-canvas" />

      {isHomePage && (
        <HomeHeroContent
          slide={slide}
          gradient={gradient}
          isRtl={isRtl}
          direction={direction}
          page={page}
          slides={slides}
          t={t}
          paginate={paginate}
          setPage={setPage}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
          slideVariants={slideVariants}
        />
      )}
    </header>
  )
}

export default Header
