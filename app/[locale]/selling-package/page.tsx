import React from 'react'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '../../../i18n/routing'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PackageSection from '@/components/PackageSection'
import HeroBlobs from '@/components/HeroBlobs'
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export default async function SellingPackage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <main className="w-full min-h-screen overflow-hidden relative">
            <Navbar />
            <HeroBlobs/>
            <PackageSection />
            <Footer />
        </main>
    )
}