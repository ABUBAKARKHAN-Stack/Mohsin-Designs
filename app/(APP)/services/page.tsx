import { PageWrapper } from '@/components/layout'
import { BlogPreview } from '@/components/sections/landing'
import {
    AllServices,
    CTA,
    ProcessTimeline,
    ServicesIntro,
    ServicesPageHero,
    WhyWorkWithUs
} from '@/components/sections/services/all-services'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Our Services"
}

const ServicesPage = () => {
    return (
        <PageWrapper>
            <ServicesPageHero />
            <ServicesIntro />
            <AllServices />
            <ProcessTimeline />
            <WhyWorkWithUs />
            <CTA />
            <BlogPreview />
        </PageWrapper>
    )
}

export default ServicesPage