import PublicProvider from '@/provider/PublicProvider'
import { ReactNode } from 'react'


const AuthLayout = async ({ children }: { children: ReactNode }) => {

    return (
        <PublicProvider>
            {children}
        </PublicProvider>
    )
}

export default AuthLayout