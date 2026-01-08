import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    }
}


const AdminLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/")
    }
    return (
        <>
            {children}
        </>
    )
}

export default AdminLayout