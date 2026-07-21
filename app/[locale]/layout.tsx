import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import ScrollReveal from '@/components/ScrollReveal'
import '../globals.css'

// Load Geist fonts with CSS variables for use in Tailwind
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fitness Web App',
  description: 'Your personal fitness companion',
}

/**
 * Root layout for locale-specific pages.
 *
 * Wraps children with next-intl's provider so all client components
 * can access translations via `useTranslations`. Also injects the
 * ScrollReveal script for viewport-triggered animations.
 *
 * @param params Contains the resolved locale string (e.g. "en", "fa", "vi")
 */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ScrollReveal />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
