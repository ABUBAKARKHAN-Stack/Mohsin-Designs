"use client"

import Footer from '@/components/layout/footer/Footer'
import Navbar from '@/components/layout/navbar/Navbar'
import PageTransition from '@/components/layout/PageTransition'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
    AnimatePresence
} from 'motion/react'
type Props = {
    children: ReactNode
}
const AppLayout = ({ children }: Props) => {
    const pathname = usePathname()
    return (
        <AnimatePresence mode='wait'>
            <PageTransition key={pathname}>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1 pt-20">{children}</main>
                    <Footer />
                </div>
            </PageTransition>
        </AnimatePresence>

    )
}

export default AppLayout