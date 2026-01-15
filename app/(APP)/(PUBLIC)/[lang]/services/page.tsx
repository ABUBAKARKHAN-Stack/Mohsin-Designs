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
import { getServicesCTA } from '@/helpers/service.helpers'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Our Services"
}

type Props = {
    params: Promise<LanguageType>
}

const ServicesPage = async ({
    params
}: Props) => {

    const { lang } = await params;
    const cta = await getServicesCTA(lang);


    return (
        <PageWrapper>
            <ServicesPageHero />
            <ServicesIntro />
            <AllServices />
            <ProcessTimeline />
            <WhyWorkWithUs />
            <CTA cta={cta} />
            <BlogPreview />
        </PageWrapper>
    )
}

export default ServicesPage