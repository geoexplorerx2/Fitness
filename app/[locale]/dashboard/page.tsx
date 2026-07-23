'use client'
import React, { useState, useEffect } from 'react'
import HeroBlobs from '@/components/HeroBlobs'
import { useTranslations } from 'next-intl'
export default function Dashboard({ params }: { params: Promise<{ locale: string }> }) {
    const [openToggle, setOpenToggle] = useState<boolean>(false)
    const t = useTranslations('footer')
    useEffect(() => {
        params.then(({ locale }) => console.log('locale:', locale))
        console.log('t:', t)
    }, [params])
    
    return (
        <main className='w-full relative h-screen overflow-hidden'>
            <section className='w-full h-full absolute z-0'>
                <HeroBlobs />
            </section>
            <section className='w-full h-full absolute z-10'>
                <div className='w-full h-full relative'>
                    <div className='w-full h-full absolute z-0'>
                        <div className='w-full h-full relative'>
                            <div className='w-full lg:w-[calc(100%-400px)] h-full border-2 bg-[#214f21]'>
                                <div className='w-full h-[70px] bg-[#51511a]'>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:w-[400px] h-full absolute z-10 top-0 right-0 border-2 bg-[#343461]'></div>
                </div>
            </section>
        </main>
    )
}


