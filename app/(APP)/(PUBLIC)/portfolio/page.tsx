import { PageWrapper } from "@/components/layout";
import { PortfolioPageHero, MainContent } from "@/components/sections/portfolio";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Our Work"
}

import { getPortfolioPageContent } from "@/helpers/portfolio-page-content.helpers";
import PageCTA from "@/components/sections/shared/PageCTA";

const Portfolio = async () => {
  const pageContent = await getPortfolioPageContent();

  if (!pageContent) {
    return null;
  }

  return (
    <PageWrapper>
      <PortfolioPageHero
        title={pageContent.hero.title}
        subtitle={pageContent.hero.subtitle}
        description={pageContent.hero.description}
      />
      <MainContent projects={pageContent.portfolioList.projects} />
      <PageCTA cta={pageContent.cta} />
    </PageWrapper>
  );
};

export default Portfolio;
