'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTelegram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useTranslations } from 'next-intl'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

// Static social icon metadata — keeps render function clean
const socialIcons: { icon: IconDefinition; href: string }[] = [
  { icon: faInstagram, href: '#' },
  { icon: faTelegram, href: '#' },
  { icon: faWhatsapp, href: '#' },
  { icon: faYoutube, href: '#' },
]

const iconBoxClass =
  'w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ' +
  'text-white/50 hover:text-accent-light hover:border-accent/30 hover:bg-accent/5 transition-all'

const Footer = () => {
  const t = useTranslations('footer')

  const socialLabels = t.raw('socialLabels') as string[]
  const quickLinks = t.raw('quickLinks') as string[]
  const quickHrefs = t.raw('quickHrefs') as string[]

  return (
    <footer className="relative text-white" dir="rtl">
      {/* Subtle top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-white/[0.02] pointer-events-none" />

      <div className="border-t border-white/10 pt-16 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Brand column — spans 2 cols on md+ */}
            <div className="md:col-span-2">
              <a href="#" className="font-bold text-xl tracking-tight flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-bl from-accent to-accent-deep flex items-center justify-center">
                  <FontAwesomeIcon icon={faDumbbell} className="text-white" style={{ width: 14, height: 14 }} />
                </div>
                <span className="text-white">{t('brandName')}</span>
              </a>
              <p className="text-white/50 max-w-sm leading-relaxed text-sm mb-6">
                {t('description')}
              </p>
              <div className="flex gap-3">
                {socialIcons.map(({ icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={iconBoxClass}
                    aria-label={socialLabels[i]}
                  >
                    <FontAwesomeIcon icon={icon} style={{ width: 16, height: 16 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">{t('quickAccess')}</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={quickHrefs[i]}
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">{t('contactHeading')}</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:info@neginsafareh.ir"
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    info@neginsafareh.ir
                  </a>
                </li>
                <li>
                  <span className="text-white/50 text-sm">{t('phone')}</span>
                </li>
                <li>
                  <span className="text-white/50 text-sm">{t('location')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar: copyright + legal links */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">{t('copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 text-xs hover:text-white transition-colors">
                {t('privacy')}
              </a>
              <a href="#" className="text-white/40 text-xs hover:text-white transition-colors">
                {t('terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
