'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDumbbell,
  faPhone,
  faEnvelope,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

// Social media icon buttons reused in both desktop header and navbar
const socialLinks: { icon: IconDefinition; href: string; label: string; external?: boolean }[] = [
  { icon: faPhone, href: 'tel:09121234567', label: 'phone' },
  { icon: faInstagram, href: 'https://instagram.com', label: 'instagram', external: true },
  { icon: faEnvelope, href: 'mailto:info@neginsafareh.ir', label: 'email' },
]

// Animation variants for the mobile slide-in menu
const menuVariants = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' },
}

export default function Navbar() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const isRtl = locale === 'fa'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Read nav link data from translation messages
  const navLinks = t.raw('quickLinks') as string[]
  const navHrefs = t.raw('quickHrefs') as string[]

  // Scroll listener — only sets state, does not cause re-layout
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Smooth-scroll to an anchor, then close the mobile menu
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  const handleMobileNavClick = (href: string) => {
    setMenuOpen(false)
  }

  return (
    <nav
      className={`nav-glass fixed top-0 right-0 left-0 w-full z-50 ${scrolled ? 'scrolled' : ''}`}
      id="navbar"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between">
        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const rawHref = navHrefs[i]
            const isAnchor = rawHref.startsWith('#')
            const href = isAnchor ? rawHref : `/${locale}${rawHref}`

            if (isAnchor) {
              return (
                <a
                  key={i}
                  href={href}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  className="nav-link text-sm"
                >
                  {link}
                </a>
              )
            }

            return (
              <Link
                key={i}
                href={href}
                className="nav-link text-sm"
              >
                {link}
              </Link>
            )
          })}
        </div>

        {/* Right section: social icons, auth buttons, brand, hamburger */}
        <div className="flex items-center justify-between grow lg:grow-0 lg:justify-end gap-6">
          {/* Social media icons — visible on sm+ */}
          <div className="hidden sm:flex items-center gap-3">
            {socialLinks.map(({ icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                           text-white/50 hover:text-accent-light hover:border-accent/30 hover:bg-accent/5 transition-all"
                aria-label={label}
              >
                <FontAwesomeIcon icon={icon} style={{ width: 14, height: 14 }} />
              </a>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden sm:flex items-center border border-white/10 rounded-xl overflow-hidden">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              ورود
            </a>
            <span className="w-px h-5 bg-white/10" />
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-accent to-accent-deep"
            >
              ثبت‌نام
            </a>
          </div>

          {/* Brand logo */}
          <a
            href="/"
            className="font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2 shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-bl from-accent to-accent-deep flex items-center justify-center">
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-white"
                style={{ width: 14, height: 14 }}
              />
            </div>
            <span className="text-white truncate">{t('brandName')}</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center
                       text-white hover:text-accent-light transition-all"
            aria-label="menu"
          >
            <FontAwesomeIcon icon={faBars} style={{ width: 22, height: 22 }} />
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8
                       bg-[rgba(12,10,16,0.98)] backdrop-blur-2xl lg:hidden"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 left-6 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center
                         text-white/60 hover:text-white transition-all"
              aria-label="close"
            >
              <FontAwesomeIcon icon={faXmark} style={{ width: 26, height: 26 }} />
            </button>

            {navLinks.map((link, i) => {
              const rawHref = navHrefs[i]
              const isAnchor = rawHref.startsWith('#')
              const href = isAnchor ? rawHref : `/${locale}${rawHref}`

              if (isAnchor) {
                return (
                  <a
                    key={i}
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-xl sm:text-2xl font-bold text-white/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                )
              }

              return (
                <Link
                  key={i}
                  href={href}
                  onClick={() => handleMobileNavClick(href)}
                  className="text-xl sm:text-2xl font-bold text-white/80 hover:text-white transition-colors"
                >
                  {link}
                </Link>
              )
            })}

            <div className="flex items-center gap-2 sm:gap-3 pt-4 border-t border-white/10">
              <a
                href="#"
                className="px-6 py-3 rounded-xl text-base font-medium text-white/50 border border-white/10
                           hover:text-white hover:bg-white/5 transition-all"
              >
                ورود
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-xl text-base font-medium text-white
                           bg-gradient-to-r from-accent to-accent-deep"
              >
                ثبت‌نام
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
