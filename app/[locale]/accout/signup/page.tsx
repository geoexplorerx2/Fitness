import React from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import HeroBlobs from '@/components/HeroBlobs'

const page = () => {
    return (
        <main className="w-full overflow-x-hidden min-h-screen relative">
            <Navbar />
            <HeroBlobs />
            <section>

            </section>
            <Footer />
        </main>
    )
}

export default page
