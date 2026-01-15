"use client"

import { ContainerLayout } from "../../../layout";
import ServiceCard from "./ServiceCard";
import BGDecorations from "./BG-Decorations";
import SectionHeading from "@/components/ui/section-heading";
import { useServices } from "@/context/ServiceContext";


const AllServices = () => {
  const { services } = useServices()

  return (

    <section className="lg:py-12.5 py-6.25 relative overflow-hidden">
      {/* Background decorations */}
      <BGDecorations />

      <ContainerLayout className="relative">

        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          description="Comprehensive solutions tailored to elevate your brand and drive results."
          align="center"
          splitText
        />

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, i) => {

            return (
              <ServiceCard key={`${service.title}-${i}`} service={service} index={i} />
            )
          })}
        </div>

      </ContainerLayout>

    </section>
  );
};

export default AllServices;
