import { setRequestLocale } from 'next-intl/server'
import { routing } from '../../i18n/routing'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Services from '@/components/Services'
import TrainingPlans from '@/components/TrainingPlans'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

/**
 * Generate static pages for all configured locales at build time.
 * This enables fully static HTML export for each locale variant.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Home page — composes all landing page sections.
 * Each section is a client component that handles its own
 * translations via next-intl's useTranslations hook.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="w-full min-h-screen relative">
      <Navbar />
      <Header />
      <Services />
      <TrainingPlans />
      <CTA />
      <Footer />
    </main>
  )
}
