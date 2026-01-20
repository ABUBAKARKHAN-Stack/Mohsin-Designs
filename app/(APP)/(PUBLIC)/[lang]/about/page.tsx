import {
    WhyChooseUs,
    Leadership,
    IndustriesWeServe,
    OurApproach,
    CTA,
    ServicesPreview,
} from "@/components/sections/landing";
import {
    AboutPageHero,
    IntroSection,
    MissionVisionSection,
    PhilosophySection,
    GlobalReachSection,
    CultureSection,
} from '@/components/sections/about'
import { PageWrapper } from "@/components/layout";




const About = () => {

    return (
        <PageWrapper>
            <AboutPageHero />
            <IntroSection />
            <MissionVisionSection />
            <PhilosophySection />
            <ServicesPreview />
            <OurApproach />
            <IndustriesWeServe />
            <GlobalReachSection />
            <WhyChooseUs />
            <Leadership />
            <CultureSection />
            <CTA />
        </PageWrapper>
    );
};

export default About;
