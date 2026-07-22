'use client'

import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import gluteImg from '@/assets/img/jpg/glute.jpg'
import thighImg from '@/assets/img/jpg/thigh.jpg'
import coreImg from '@/assets/img/jpg/core.jpg'

const packageImages: Record<string, StaticImageData> = {
  glute: gluteImg,
  thigh: thighImg,
  core: coreImg,
}

const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white ' +
    'placeholder-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 ' +
    'transition-all text-sm'

export default function PackageSection() {
    const t = useTranslations('packages')

    // Package data from translation messages
    const items = t.raw('items') as {
        title: string
        price: string
        description: string
        features: string[]
        cta: string
        image?: string
        featured?: boolean
    }[]

    return (
        <section className="py-24 md:py-32 relative text-white" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section heading */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="section-line mb-4 mx-auto reveal" />
                    <p className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-3 reveal">
                        {t('sectionTitle')}
                    </p>
                    <h2 className="font-black text-3xl md:text-5xl tracking-tight reveal">
                        {t.rich('heading', {
                            span: (chunks) => <span className="gradient-text">{chunks}</span>,
                        })}
                    </h2>
                </div>

                {/* Responsive card grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`plan-card reveal flex flex-col ${item.featured ? 'featured' : ''}`}
                            style={{ '--i': i } as React.CSSProperties}
                        >
                            {/* Optional image */}
                            {item.image && packageImages[item.image] && (
                                <div className="rounded-xl overflow-hidden mb-5">
                                    <Image
                                        src={packageImages[item.image]}
                                        alt={item.title}
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-xl text-white">{item.title}</h3>
                                {item.featured && (
                                    <span className="text-xs bg-accent/20 text-accent-light px-3 py-1 rounded-full font-bold">
                                        {t('featuredBadge')}
                                    </span>
                                )}
                            </div>

                            <p className="text-accent-light font-black text-2xl mb-3">{item.price}</p>
                            <p className="text-white/70 text-sm leading-relaxed mb-6">{item.description}</p>

                            <ul className="space-y-3 mb-6">
                                {item.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-white/80">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="text-white shrink-0"
                                            style={{ width: 12, height: 12 }}
                                        />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#contact"
                                className={`w-full py-3 text-sm text-center block mt-auto ${item.featured ? 'btn-glow' : 'btn-outline'
                                    }`}
                            >
                                {item.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}