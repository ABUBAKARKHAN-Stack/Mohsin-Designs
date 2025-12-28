import PageHero from '@/components/ui/page-hero'

const PortfolioPageHero = () => {
    return (
        <PageHero
            title="Our work"
            subtitle="Portfolio"
            description="A showcase of our best projects across brand, digital, and product design."
            breadcrumbs={[{ label: "Work" }]}
        />
    )
}

export default PortfolioPageHero