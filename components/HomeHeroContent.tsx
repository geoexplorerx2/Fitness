"use client"

import React from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { useTranslations } from 'next-intl'
import Banner from '@/assets/img/jpg/Banner.jpg'
import Image from 'next/image'
interface Slide {
  tag: string
  title: string
  description: string
}

interface HomeHeroContentProps {
  slide: Slide
  gradient: string
  isRtl: boolean
  direction: number
  page: number
  slides: Slide[]
  t: ReturnType<typeof useTranslations<'hero'>>
  paginate: (newDirection: number) => void
  setPage: React.Dispatch<React.SetStateAction<[number, number]>>
  setIsPaused: (paused: boolean) => void
  isPaused: boolean
  slideVariants: Variants
}

const HomeHeroContent: React.FC<HomeHeroContentProps> = ({
  slide,
  gradient,
  isRtl,
  direction,
  page,
  slides,
  t,
  paginate,
  setPage,
  setIsPaused,
  slideVariants,
}) => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 w-full">
      <div className="relative px-0 sm:px-20" dir={isRtl ? 'rtl' : 'ltr'} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <div className='w-full flex justify-between'>
            <div className='w-full lg:w-1/2 lg:translate-y-[100px]'>
              <motion.div key={page} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, scale: { duration: 0.3 }, }} className="min-h-[280px] sm:min-h-[340px] flex flex-col justify-center" >
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${gradient} w-fit mb-6`} >
                  {slide.tag}
                </motion.span>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="text-2xl sm:text-3xl md:text-3xl font-semibold text-white leading-tight tracking-tight mb-6" >
                  {slide.title}
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="text-lg leading-8 md:text-xl text-gray-400 mb-10" >
                  {slide.description}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4" >
                  <button className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`} >
                    {t('ctaGetStarted')}
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300" >
                    {t('ctaLearnMore')}
                  </button>
                </motion.div>
              </motion.div>
            </div>
            <div className='hidden lg:flex w-1/2 justify-end'>
              <div className='w-[500px] h-[500px] rounded-full relative'>
                <Image className=' object-contain absolute rounded-full' src={Banner} alt='test' fill />
              </div>
            </div>
          </div>
        </AnimatePresence>

        <button onClick={() => paginate(-1)} className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 transition-all duration-300" aria-label={t('prevLabel')} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button onClick={() => paginate(1)} className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 transition-all duration-300" aria-label={t('nextLabel')} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-3 mt-10">
          {slides.map((_: unknown, i: number) => (
            <button key={i} onClick={() => setPage([i, i > page ? 1 : -1])} aria-label={t('goToSlide', { number: i + 1 })} className="group relative p-1" >
              <motion.div className={`h-2 rounded-full transition-colors duration-300 ${i === page ? 'bg-white' : 'bg-white/30'}`} animate={{ width: i === page ? 32 : 8 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeHeroContent
