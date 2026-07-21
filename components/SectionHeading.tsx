'use client'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  sectionTitle: string
  /** Rich text heading that supports a <span> inside for gradient text */
  heading: ReactNode
}

/**
 * SectionHeading — consistent section header pattern used across the site.
 *
 * Renders a thin accent line, uppercase section label, and the main heading.
 * The `heading` prop is a ReactNode so callers can use `t.rich()` for
 * inline gradient spans via `<span className="gradient-text">`.
 */
export default function SectionHeading({ sectionTitle, heading }: SectionHeadingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <div className="section-line mb-4 mx-auto reveal" />
      <p className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-3 reveal">
        {sectionTitle}
      </p>
      <h2 className="font-black text-3xl md:text-5xl tracking-tight reveal">{heading}</h2>
    </div>
  )
}
