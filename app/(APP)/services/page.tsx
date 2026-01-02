import { PageWrapper } from '@/components/layout'
import {
    AllServices,
    ServicesPageHero
} from '@/components/sections/services'
import { Metadata } from 'next'

export const metadata:Metadata = {
    
}

const ServicesPage = () => {
    return (
        <PageWrapper>
            <ServicesPageHero />
            <AllServices />
        </PageWrapper>
    )
}

export default ServicesPage