import { PageWrapper } from "@/components/layout";
import { PortfolioPageHero } from "@/components/sections/portfolio";
import MainContent from "@/components/sections/portfolio/MainContent";


const Portfolio = () => {

  return (
    <PageWrapper>
      <PortfolioPageHero />
      <MainContent />
    </PageWrapper>
  );
};

export default Portfolio;
