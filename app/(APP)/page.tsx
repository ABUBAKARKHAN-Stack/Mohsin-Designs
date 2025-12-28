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
  CTA
} from "@/components/sections/landing/";

const HomePage = () => {
  return (
    <PageWrapper>
      <Hero />
      <ServiceHighlightsMarquee />
      <TrustedByBrands />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <PortfolioPreview />
      <Testimonials />
      <Stats />
      <FAQs />
      <CTA />
    </PageWrapper>
  );
};

export default HomePage;