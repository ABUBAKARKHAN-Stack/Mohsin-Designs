import { PageWrapper, Navbar, Footer } from '@/components/layout'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const AppLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <PageWrapper>
                <main className="flex-1 pt-20">{children}</main>
            </PageWrapper>
            <Footer />
        </div>
    )
}

export default AppLayout