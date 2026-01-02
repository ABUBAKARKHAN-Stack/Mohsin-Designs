"use client"

import { services } from "@/constants/services.constants";
import { ContainerLayout } from "../../../layout";
import ServiceCard from "./ServiceCard";
import CTA from "./CTA";
import BGDecorations from "./BG-Decorations";


const AllServices = () => {

  return (

    <section className="pb-15  md:pb-20 relative overflow-hidden">
      <ContainerLayout className="relative py-0">

      {/* Background decorations */}
      <BGDecorations />


        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>

        {/* CTA Section */}
        <CTA />

      </ContainerLayout>

    </section>
  );
};

export default AllServices;
