"use client"

import { motion } from "motion/react";
import { trustedBrands } from "@/constants/about.constants";
import { ContainerLayout } from "@/components/layout";
import MarqueeRow from "./MarqueeRow";


const brandsRow2 = [...trustedBrands].reverse();

const TrustedByBrands = () => {
  return (
    <section className="py-20 border-y border-border bg-muted/30 overflow-hidden">

      <ContainerLayout className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Our Clients
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Trusted By Leading Brands
          </h2>
        </motion.div>
      </ContainerLayout>

      {/* Dual Marquee Rows */}
      <div className="relative space-y-6">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0  md:w-6 w-2 bg-linear-to-r from-muted/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 md:w-6 w-2 bg-linear-to-l from-muted/95 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Left direction */}
        <MarqueeRow items={trustedBrands} direction="left" duration={35} />

        {/* Row 2 - Right direction (opposite) */}
        <MarqueeRow items={brandsRow2} direction="right" duration={25} />
      </div>
      
    </section>
  );
};

export default TrustedByBrands;
