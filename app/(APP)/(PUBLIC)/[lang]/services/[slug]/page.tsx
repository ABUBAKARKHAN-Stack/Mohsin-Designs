import { PageWrapper } from "@/components/layout";
import { CTA } from "@/components/sections/services/all-services";
import {
    ServiceDetailsPageHero,
    HeroImage,
    ServiceOverview,
    OtherServices,
    ServiceBenefits,
    ServiceProcess,
    HowWeHelpSection,
    CaseStudiesSection,
    FAQSection,
    IndustriesSection,
    AreasWeServeSection,
    IntroSection,
    ServiceBlogs,
} from "@/components/sections/services/service-details/";
import { servicesData } from "@/data/service.data";
import { redirect } from "next/navigation";


type Props = {
    params: Promise<{ slug: string }>
}

const ServiceDetailPage = async ({
    params
}: Props) => {
    const { slug } = await params;
    const service = slug ? servicesData[slug as keyof typeof servicesData] : null;

    if (!service) {
        return redirect("/services",);
    }


    return (
        <PageWrapper>

            {/* Service Page Hero Section */}

            <ServiceDetailsPageHero
                serviceTitle={service.title}
                serviceSubtitle={service.subtitle}
                serviceDescription={service.description}
            />

            {/* Service Hero Image Section */}

            <HeroImage
                heroImage={service.heroImage}
                title={service.title}
            />

            {/* Introduction of service Section */}

            <IntroSection
                introTitle={service.introTitle}
                introContent={service.introContent}
                roleTitle={service.roleTitle}
                roleContent={service.roleContent}
            />

            {/* How we help  Section */}

            <HowWeHelpSection
                title={service.howWeHelpTitle}
                points={service.howWeHelpPoints}
            />

            {/* Overview Of Service Section */}

            <ServiceOverview
                serviceOverview={service.overview}
                features={service.items}
            />

            {/* Service Process TIMELINE Section */}

            <ServiceProcess
                process={service.process}
            />

            {/* Areas We Serve Section */}

            <AreasWeServeSection
                areas={service.areas}
            />


            {/* Industries Section */}

            <IndustriesSection
                industries={service.industries}
            />


            {/* Service Benifits Section  (Why Choose US)*/}

            <ServiceBenefits
                points={service.howWeHelpPoints}
                benefits={service.benefits}
            />

            {/* Case Studies Section */}

            <CaseStudiesSection
                caseStudies={service.caseStudies}
            />

            {/* FAQ Section */}
            <FAQSection
                faqs={service.faqs}
            />

            {/* Service CTA Section */}
            <CTA
            />

            <ServiceBlogs
                slug={slug}
            />

            {/* Other Services Section */}
            <OtherServices
                slug={slug}
            />


        </PageWrapper>
    )


};

export default ServiceDetailPage;