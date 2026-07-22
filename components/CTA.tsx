'use client'

import React, { useState, type FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'

// Shared input styles to reduce duplication
const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white ' +
  'placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 ' +
  'transition-all text-sm'

const selectIconSvg = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23e08aff' stroke-width='2'><polyline points='18 15 12 9 6 15'/></svg>`
)

/**
 * CTA — Contact / sign-up form section.
 *
 * Collects name, phone, goal, plan preference, and a message.
 * Currently logs submission to console; replace the `handleSubmit` body
 * with an API call or server action for production use.
 */
const CTA = () => {
  const t = useTranslations('cta')

  const goalOptions = t.raw('goalOptions') as string[]
  const planOptions = t.raw('planOptions') as string[]

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)

    // TODO: Replace with actual API call or server action
    console.log('Form submission:', Object.fromEntries(data))

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()
    }, 1000)
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden text-white" dir="rtl" >
      {/* Background glow decoration */}
      <div className="cta-glow" style={{ top: '-200px', right: '-200px' }} />
      <div className="cta-glow" style={{ bottom: '-200px', left: '-200px' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="reveal-scale">
          <div className="text-center mb-10">
            <p className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-4">
              {t('sectionTitle')}
            </p>
            <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight mb-4">
              {t.rich('heading', {
                span: (chunks) => <span className="gradient-text">{chunks}</span>,
              })}
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">{t('description')}</p>
          </div>

          <form className="max-w-lg mx-auto" id="contactForm" onSubmit={handleSubmit}>
            {/* Name + Phone row */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="name">
                  {t('nameLabel')}
                </label>
                <input type="text" id="name" name="name" placeholder={t('namePlaceholder')} required className={inputClass} />
              </div>
              <div>
                <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="phone">
                  {t('phoneLabel')}
                </label>
                <input type="tel" id="phone" name="phone" placeholder={t('phonePlaceholder')} required className={inputClass} />
              </div>
            </div>

            {/* Goal selector */}
            <div className="mb-4">
              <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="goal">
                {t('goalLabel')}
              </label>
              <select id="goal" name="goal" defaultValue="" required className={`${inputClass} appearance-none`} style={{ backgroundImage: `url("data:image/svg+xml;utf8,${selectIconSvg}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 1rem center', }} >
                {goalOptions.map((opt, i) => (
                  <option key={i} className="text-black" value={i === 0 ? '' : opt} disabled={i === 0}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan selector */}
            <div className="mb-4">
              <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="plan">
                {t('planLabel')}
              </label>
              <select id="plan" name="plan" defaultValue="" required className={`${inputClass} appearance-none`} style={{ backgroundImage: `url("data:image/svg+xml;utf8,${selectIconSvg}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 1rem center', }} >
                {planOptions.map((opt, i) => (
                  <option key={i} className="text-black" value={i === 0 ? '' : opt} disabled={i === 0}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message textarea */}
            <div className="mb-6">
              <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="message">
                {t('messageLabel')}
              </label>
              <textarea id="message" name="message" rows={3} placeholder={t('messagePlaceholder')} className={`${inputClass} resize-none`} />
            </div>

            {/* Submit button */}
            <button type="submit" disabled={isSubmitting} className="btn-glow w-full py-4 text-base inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60" >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t('submit')}
                  <FontAwesomeIcon icon={faPaperPlane} style={{ width: 14, height: 14 }} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CTA
