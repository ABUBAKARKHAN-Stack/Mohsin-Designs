import PageHero from '../../../ui/page-hero'

const ServicesPageHero = () => {
  return (
     <PageHero
        title="What we do"
        subtitle="Our Expertise"
        description="From strategy to execution, we offer comprehensive services to transform your brand."
        breadcrumbs={[{ label: "Services" }]}
      />
  )
}

export default ServicesPageHero