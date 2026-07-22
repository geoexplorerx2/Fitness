import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HeroBlobs from '@/components/HeroBlobs'
import SignInForm from '@/components/SignInForm'
import React from 'react'

const page = () => {
    return (
        <main className="w-full overflow-hidden min-h-screen relative">
            <Navbar />
            <HeroBlobs />
            <section className="relative py-20 md:py-28 px-4 sm:px-6">
                <SignInForm />
            </section>
            <Footer />
        </main>
    )
}

export default page
