'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faEye, faEyeSlash, faArrowRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

const inputBaseClass =
  'w-full bg-white/5 border rounded-xl px-4 py-3 text-white ' +
  'placeholder-white/30 focus:outline-none focus:ring-1 transition-all text-sm'

const SignInForm = () => {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('auth')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!email.trim()) newErrors.email = t('emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t('emailInvalid')
    if (!password) newErrors.password = t('passwordRequired')
    else if (password.length < 6) newErrors.password = t('passwordMin')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [email, password, t])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  const clearError = (field: string) => {
    setErrors(prev => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const isRtl = locale === 'fa'

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    }),
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <motion.div
      className="w-full max-w-md mx-auto relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-b from-accent/20 via-accent/5 to-transparent rounded-3xl blur-2xl opacity-60" />

        <motion.div
          animate={hasErrors ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="relative bg-[var(--surface)]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl"
        >
          <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
            <div className="flex justify-center mb-6">
              <motion.div
                animate={hasErrors ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 border border-white/10 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faLock} className="text-accent-light" style={{ width: 22, height: 22 }} />
              </motion.div>
            </div>
            <h1 className="text-center font-black text-2xl md:text-3xl tracking-tight mb-1 text-[var(--fg)]">
              {t('welcomeBack')}
            </h1>
            <p className="text-center text-white/50 text-sm mb-8">
              {t('subtitle')}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
              <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="email">
                {t('emailLabel')}
              </label>
              <div className="relative">
                <span className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-white/30 pointer-events-none`}>
                  <FontAwesomeIcon icon={faEnvelope} style={{ width: 14, height: 14 }} />
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); clearError('email') }}
                  placeholder={t('emailPlaceholder')}
                  className={`${inputBaseClass} ${isRtl ? 'pr-10' : 'pl-10'} ${
                    errors.email
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-accent focus:ring-accent/30'
                  }`}
                />
              </div>
              <AnimatePresence mode="wait">
                {errors.email && (
                  <motion.p
                    key="email-err"
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faExclamationCircle} style={{ width: 12, height: 12 }} />
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
              <label className="text-sm text-white/70 mb-1.5 block font-medium" htmlFor="password">
                {t('passwordLabel')}
              </label>
              <div className="relative">
                <span className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-white/30 pointer-events-none`}>
                  <FontAwesomeIcon icon={faLock} style={{ width: 14, height: 14 }} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); clearError('password') }}
                  placeholder={t('passwordPlaceholder')}
                  className={`${inputBaseClass} ${isRtl ? 'pr-10 pl-10' : 'pl-10 pr-10'} ${
                    errors.password
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-white/10 focus:border-accent focus:ring-accent/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className={`absolute ${isRtl ? 'left-3.5' : 'right-3.5'} top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer`}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <AnimatePresence mode="wait">
                {errors.password && (
                  <motion.p
                    key="pass-err"
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5"
                  >
                    <FontAwesomeIcon icon={faExclamationCircle} style={{ width: 12, height: 12 }} />
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible" className={`flex items-center ${isRtl ? 'flex-row' : 'flex-row'} justify-between`}>
              <label className={`flex items-center gap-2 cursor-pointer group ${isRtl ? 'flex-row' : 'flex-row'}`}>
                <div className="relative w-4 h-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    className="peer appearance-none w-4 h-4 border border-white/20 rounded bg-white/5 checked:bg-accent checked:border-accent transition-all cursor-pointer"
                  />
                  <svg
                    className="absolute inset-0 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3 8.5L6.5 12L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors whitespace-nowrap">{t('rememberMe')}</span>
              </label>
              <a href="#" className="text-sm text-accent-light hover:underline font-medium transition-colors whitespace-nowrap">
                {t('forgotPassword')}
              </a>
            </motion.div>

            <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow w-full py-3.5 text-base inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t('signIn')}
                    <FontAwesomeIcon icon={faArrowRight} style={{ width: 14, height: 14 }} className={isRtl ? 'rotate-180' : ''} />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <motion.p custom={5} variants={itemVariants} initial="hidden" animate="visible" className="text-center text-white/50 text-sm mt-6">
            {t('noAccount')}{' '}
            <Link href={`/${locale}/accout/signup`} className="text-accent-light hover:underline font-medium transition-colors">
              {t('createOne')}
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SignInForm
