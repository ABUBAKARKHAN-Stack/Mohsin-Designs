"use client"

import CustomCursor from '@/components/CustomCursor'
import FloatingContactBadge from '@/components/FloatingContactBadge'
import LoadingScreen from '@/components/LoadingScreen'
import { Toaster } from '@/components/ui/sonner'
import { AnimatePresence } from 'motion/react'
import { ThemeProvider } from 'next-themes'
import { FC, ReactNode, useEffect, useState } from 'react'

type Props = {
    children: ReactNode
}

const RootProvider: FC<Props> = ({
    children
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="mohsin-desings-theme" disableTransitionOnChange>
            <Toaster />
            {mounted && <CustomCursor />}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>
            {!isLoading && (
                <>
                    {children}
                </>
            )}
        </ThemeProvider>
    )
}

export default RootProvider