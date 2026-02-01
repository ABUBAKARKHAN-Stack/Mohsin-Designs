import { PageWrapper } from "@/components/layout";
import {
  Hero,
  ServiceHighlightsMarquee,
  TrustedByBrands,
  AboutPreview,
  PortfolioPreview,
  Testimonials,
  FAQs,
  BlogPreview,
  CaseStudiesPreview,
  AreasWeServe,

} from "@/components/sections/landing/";
import {
  ServicesPreview,
  IndustriesWeServe,
  Leadership,
  OurApproach,
  WhyChooseUs,
  CTA,
} from "@/components/sections/shared/";

const HomePage = () => {
  return (
    <PageWrapper>
      <Hero />
      <ServiceHighlightsMarquee />
      <TrustedByBrands />
      <AboutPreview />
      <OurApproach />
      <ServicesPreview />
      <WhyChooseUs />
      <PortfolioPreview />
      <CaseStudiesPreview />
      <AreasWeServe />
      <IndustriesWeServe />
      <Testimonials />
      <Leadership />
      <BlogPreview />
      <FAQs />
      <CTA />
    </PageWrapper>
  );
};

export default HomePage;