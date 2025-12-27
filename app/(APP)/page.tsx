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
    <>
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
    </>
  );
};

export default HomePage;