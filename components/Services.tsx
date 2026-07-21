'use client'

import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPersonRunning,
  faDumbbell,
  faBone,
  faAppleWhole,
  faBullseye,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

// Static mapping of service translation keys to their corresponding icons.
// Kept outside the component to avoid re-allocation on every render.
const serviceMeta: { key: string; icon: IconDefinition }[] = [
  { key: 'danceTraining', icon: faPersonRunning },
  { key: 'bodybuilding', icon: faDumbbell },
  { key: 'anatomy', icon: faBone },
  { key: 'nutrition', icon: faAppleWhole },
  { key: 'challenges', icon: faBullseye },
  { key: 'onlineSupport', icon: faVideo },
]

const Services = () => {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-24 md:py-32 relative text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="max-w-2xl mb-16">
          <div className="section-line mb-4 reveal" />
          <p className="text-white text-sm font-semibold tracking-wider uppercase mb-3 reveal">
            {t('sectionTitle')}
          </p>
          <h2 className="font-black text-3xl md:text-5xl tracking-tight leading-tight text-white reveal">
            {t.rich('heading', {
              span: (chunks) => <span className="gradient-text">{chunks}</span>,
            })}
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {serviceMeta.map(({ key, icon }, i) => (
            <div
              key={key}
              className="feature-card reveal"
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="feature-icon">
                <FontAwesomeIcon icon={icon} style={{ width: 22, height: 22 }} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">{t(`${key}.title`)}</h3>
              <p className="text-white leading-relaxed text-sm">{t(`${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
