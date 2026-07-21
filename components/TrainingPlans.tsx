'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faLightbulb, faStar } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import CountUp from '@/components/CountUp'
import PlanCard from '@/components/PlanCard'
import ScheduleTable from '@/components/ScheduleTable'
import SectionHeading from '@/components/SectionHeading'

// Import muscle anatomy images
import gluteImg from '@/assets/img/jpg/glute.jpg'
import thighImg from '@/assets/img/jpg/thigh.jpg'
import calfImg from '@/assets/img/jpg/calf.jpg'
import coreImg from '@/assets/img/jpg/core.jpg'
import testi1Img from '@/assets/img/jpg/testi1.jpg'
import testi2Img from '@/assets/img/jpg/testi2.jpg'
import testi3Img from '@/assets/img/jpg/testi3.jpg'

// Map image filenames (from translation data) to static imports
const muscleImages: Record<string, StaticImageData> = {
  'glute.jpg': gluteImg,
  'thigh.jpg': thighImg,
  'calf.jpg': calfImg,
  'core.jpg': coreImg,
}

const testimonialImages = [testi1Img, testi2Img, testi3Img]

// Plan configuration — keeps component logic data-driven
const planConfigs = [
  { label: 'FA', key: 'faPlan', featured: false },
  { label: 'VP', key: 'vpPlan', featured: true },
  { label: 'PR', key: 'prPlan', featured: false },
] as const

const TrainingPlans = () => {
  const t = useTranslations('trainingPlans')

  // Destructure translation data once
  const scheduleRows = t.raw('schedule.rows') as {
    isRest: boolean
    day: string
    exercise: string
    sets: string
    reps: string
    muscle: string
  }[]
  const muscles = t.raw('anatomySection.muscles') as {
    title: string
    description: string
    moves: string
    imageName: string
  }[]
  const testimonials = t.raw('testimonials.items') as {
    text: string
    name: string
    program: string
  }[]
  const resultLabels = t.raw('results.labels') as string[]
  const scheduleHeaders = [
    t('schedule.day'),
    t('schedule.type'),
    t('schedule.sets'),
    t('schedule.reps'),
    t('schedule.target'),
  ]
  const resultTargets = [500, 1200, 48, 8]

  return (
    <>
      {/* ──────────────── Training Plans section ──────────────── */}
      <section id="plans" className="py-24 md:py-32 relative text-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            sectionTitle={t('sectionTitle')}
            heading={t.rich('heading', {
              span: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
          />

          {/* Plan cards grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {planConfigs.map(({ label, key, featured }) => (
              <PlanCard
                key={key}
                label={label}
                title={t(`${key}.title`)}
                duration={t(`${key}.duration`)}
                description={t(`${key}.description`)}
                features={t.raw(`${key}.features`) as string[]}
                cta={t('cta')}
                featured={featured}
                badgeLabel={featured ? t(`${key}.badgeLabel`) : undefined}
                index={planConfigs.findIndex((p) => p.key === key)}
              />
            ))}
          </div>

          {/* Weekly workout schedule */}
          <ScheduleTable title={t('schedule.title')} headers={scheduleHeaders} rows={scheduleRows} />
        </div>
      </section>

      {/* ──────────────── Movement Anatomy section ──────────────── */}
      <section
        id="anatomy"
        className="py-24 md:py-32 relative text-white"
        dir="rtl"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            sectionTitle={t('anatomySection.sectionTitle')}
            heading={t.rich('anatomySection.heading', {
              span: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
          />
          <p className="text-white/60 mt-4 text-center -mt-12 mb-16 reveal">
            {t('anatomySection.description')}
          </p>

          {/* Muscle cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {muscles.map((muscle, i) => (
              <div
                key={i}
                className="anatomy-card reveal"
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="overflow-hidden">
                  <Image
                    src={muscleImages[muscle.imageName]}
                    alt={muscle.title}
                    width={400}
                    height={300}
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg mb-1 text-white">{muscle.title}</h4>
                  <p className="text-white/60 text-sm">{muscle.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-accent-light text-xs font-bold">
                    <FontAwesomeIcon icon={faFire} style={{ width: 10, height: 10 }} />
                    {muscle.moves}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trainer tip callout */}
          <div
            className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-8
                        flex flex-col md:flex-row items-start gap-4 md:gap-6 reveal"
          >
            <div
              className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center
                          text-accent-light text-2xl shrink-0"
            >
              <FontAwesomeIcon icon={faLightbulb} style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-white">{t('anatomySection.tipTitle')}</h4>
              <p className="text-white/60 leading-relaxed">{t('anatomySection.tipDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Results / Stats section ──────────────── */}
      <section
        id="results"
        className="py-24 md:py-32 relative overflow-hidden text-white"
        dir="rtl"
      >
        <div className="absolute inset-0 border-y border-white/10" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <SectionHeading
            sectionTitle={t('results.sectionTitle')}
            heading={t.rich('results.heading', {
              span: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 stagger-children">
            {resultTargets.map((target, i) => (
              <div key={i} className="text-center reveal" style={{ '--i': i } as React.CSSProperties}>
                <div className="stat-number">
                  <CountUp to={target} />
                </div>
                <p className="text-white/60 mt-2 text-sm font-medium">{resultLabels[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── Testimonials section ──────────────── */}
      <section className="py-24 md:py-32 relative text-white" dir="rtl">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            sectionTitle={t('testimonials.sectionTitle')}
            heading={t.rich('testimonials.heading', {
              span: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
          />

          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="testimonial-card reveal"
                style={{ '--i': i } as React.CSSProperties}
              >
                {/* 5-star rating */}
                <div className="text-accent-light text-sm mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FontAwesomeIcon key={j} icon={faStar} style={{ width: 10, height: 10 }} />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 text-sm">{item.text}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonialImages[i]}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-sm text-white">{item.name}</div>
                    <div className="text-white/50 text-xs">{item.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TrainingPlans
