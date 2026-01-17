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
import { getServicesPageContent } from '@/helpers/services-page-content.helpers'
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
    const pageContent = await getServicesPageContent(lang);

    // Provide fallback if content not found
    if (!pageContent) {
        throw new Error("Services page content not found");
    }

    return (
        <PageWrapper>
            <ServicesPageHero
                title={pageContent.hero.title}
                subtitle={pageContent.hero.subtitle}
                description={pageContent.hero.description}
            />
            <ServicesIntro
                badgeText={pageContent.intro.badgeText}
                heading={pageContent.intro.heading}
                headingAccent={pageContent.intro.headingAccent}
                description={pageContent.intro.description}
            />
            <AllServices />
            <ProcessTimeline
                sectionHeading={pageContent.process.sectionHeading}
                steps={pageContent.process.steps}
            />
            <WhyWorkWithUs
                sectionHeading={pageContent.whyChooseUs.sectionHeading}
                guaranteePoints={pageContent.whyChooseUs.guaranteePoints}
                benefits={pageContent.whyChooseUs.benefits}
            />
            <CTA cta={cta} />
            <BlogPreview />
        </PageWrapper>
    )
}

export default ServicesPage