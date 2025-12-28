"use client"

import { useRef } from "react";
import ContainerLayout from "@/components/layout/ContainerLayout";
import BgElements from "./BgElements";
import { LeftContent } from "./LeftContent";
import RightContentVisual from "./RightContentVisual";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden lg:py-12.5 py-6.25 ">

      {/* Background elements */}
      <BgElements />

      <ContainerLayout className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left content */}
          <LeftContent />

          {/* Right content - Visual showcase */}
          <RightContentVisual containerRef={containerRef} />
          
        </div>
      </ContainerLayout>


    </section>
  );
};

export default Hero;