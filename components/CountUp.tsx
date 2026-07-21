'use client'

import { useRef, useState, useEffect } from 'react'

/**
 * CountUp — animates a number from 0 to `to` when it enters the viewport.
 *
 * Uses IntersectionObserver to trigger once, reducing scroll‑listener overhead.
 * The counter increments in ~30 steps over 1500ms for a smooth visual effect.
 */
export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Use IntersectionObserver instead of scroll listeners
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Animate the count once triggered
  useEffect(() => {
    if (!hasStarted) return

    const duration = 1500
    const steps = 30
    const increment = to / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const current = Math.min(Math.round(increment * step), to)
      setCount(current)
      if (current >= to) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [hasStarted, to])

  return <span ref={ref} className="inline-block">{count}</span>
}
