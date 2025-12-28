import { PageWrapper } from "@/components/layout";
import { PortfolioPageHero, MainContent } from "@/components/sections/portfolio";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Our Work"
}

const Portfolio = () => {

  return (
    <PageWrapper>
      <PortfolioPageHero />
      <MainContent />
    </PageWrapper>
  );
};

export default Portfolio;
