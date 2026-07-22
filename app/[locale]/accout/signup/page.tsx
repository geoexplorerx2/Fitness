import React from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HeroBlobs from '@/components/HeroBlobs'
import SignUpForm from '@/components/SignUpForm'

const page = () => {
    return (
        <main className="w-full overflow-hidden min-h-screen relative">
            <Navbar />
            <HeroBlobs />
            <section className="relative py-20 md:py-28 px-4 sm:px-6">
                <SignUpForm />
            </section>
            <Footer />
        </main>
    )
}

export default page
