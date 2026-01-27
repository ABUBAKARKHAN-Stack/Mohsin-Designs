"use client"

import { ContainerLayout } from "../../../layout";
import ServiceCard from "./ServiceCard";
import BGDecorations from "./BG-Decorations";
import SectionHeading from "@/components/ui/section-heading";
import { useServices } from "@/context/ServiceContext";
import { useParams } from "next/navigation";
import { uiT } from "@/i18n";


const AllServices = () => {
  const { services } = useServices()
  const params = useParams()
  const lang = params.lang as string

  return (

    <section className="lg:py-12.5 py-6.25 relative overflow-hidden">
      {/* Background decorations */}
      <BGDecorations />

      <ContainerLayout className="relative">

        <SectionHeading
          eyebrow={uiT(lang, 'servicesPage.allServices.eyebrow')}
          title={uiT(lang, 'servicesPage.allServices.title')}
          description={uiT(lang, 'servicesPage.allServices.description')}
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
