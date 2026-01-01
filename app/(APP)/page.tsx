import { PageWrapper } from "@/components/layout";
import {
  Hero,
  ServiceHighlightsMarquee,
  TrustedByBrands,
  AboutPreview,
  ServicesPreview,
  WhyChooseUs,
  PortfolioPreview,
  Testimonials,
  Stats,
  FAQs,
  CTA,
  BlogPreview,
  OurApproach,
  Leadership,
  CaseStudiesPreview
} from "@/components/sections/landing/";
import AreasWeServe from "@/components/sections/landing/about/AreasWeServe";
import IndustriesWeServe from "@/components/sections/landing/about/IndustriesWeServe";

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