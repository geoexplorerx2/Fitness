'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface PlanCardProps {
  /** Short acronym label shown in the icon box */
  label: string
  title: string
  duration: string
  description: string
  features: string[]
  cta: string
  /** Renders the card with a "featured" visual style (used for VP plan) */
  featured?: boolean
  /** Optional badge text (e.g. "Most Popular") */
  badgeLabel?: string
  index: number
}

/**
 * PlanCard — displays a single pricing/training plan.
 *
 * Props are passed as plain strings so the parent handles translations.
 * The `index` prop controls the staggered reveal delay via CSS custom property `--i`.
 */
export default function PlanCard({
  label,
  title,
  duration,
  description,
  features,
  cta,
  featured,
  badgeLabel,
  index,
}: PlanCardProps) {
  return (
    <div className={`plan-card reveal flex flex-col ${featured ? 'featured' : ''}`} style={{ '--i': index } as React.CSSProperties} >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${ featured ? 'bg-white/20' : 'bg-white/10' }`} >
            {label}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <p className="text-white/50 text-xs">{duration}</p>
          </div>
        </div>
        {badgeLabel && (
          <span className="text-xs bg-accent/20 text-accent-light px-3 py-1 rounded-full font-bold">
            {badgeLabel}
          </span>
        )}
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-6">{description}</p>

      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white/80">
            <FontAwesomeIcon icon={faCheck} className="text-white" style={{ width: 10, height: 10 }} />
            {feature}
          </li>
        ))}
      </ul>

      <a href="#contact" className={`w-full py-3 text-sm text-center block mt-auto ${ featured ? 'btn-glow' : 'btn-outline' }`} >
        {cta}
      </a>
    </div>
  )
}
