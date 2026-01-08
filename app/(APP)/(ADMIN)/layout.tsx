import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    }
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

export default AdminLayout