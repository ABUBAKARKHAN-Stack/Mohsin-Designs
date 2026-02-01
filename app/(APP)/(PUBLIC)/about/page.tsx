
import {
    AboutPageHero,
    IntroSection,
    MissionVisionSection,
    PhilosophySection,
    GlobalReachSection,
    CultureSection,
} from '@/components/sections/about'
import { PageWrapper } from "@/components/layout";
import {
    ServicesPreview,
    IndustriesWeServe,
    Leadership,
     CTA,
       WhyChooseUs,
    OurApproach,

} from "@/components/sections/shared/";



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
