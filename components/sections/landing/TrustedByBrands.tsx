"use client"

import { motion } from "motion/react";
import MagneticButton from "@/components/MagneticButton";
import { trustedBrands } from "@/constants/about.constants";
import Image from "next/image";
import { ContainerLayout } from "@/components/layout";



const brandsRow2 = [...trustedBrands].reverse();

interface MarqueeRowProps {
  items: typeof trustedBrands;
  direction: "left" | "right";
  duration?: number;
}

const MarqueeRow = ({ items, direction, duration = 25 }: MarqueeRowProps) => {
  const animationClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="relative overflow-hidden group">
      <div
        className={`flex w-max will-change-transform ${animationClass} group-hover:paused`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center md:gap-16 shrink-0">
            {items.map((brand, i) => (
              <MagneticButton key={`${dup}-${i}`} strength={0.15}>
                <motion.div
                  className="shrink-0 h-24 w-44 sm:h-28 sm:w-52 md:h-36 md:w-60 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={brand.logo.src}
                    alt={brand.name}
                    fill
                    className="max-h-full max-w-full object-contain pointer-events-none select-none"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </MagneticButton>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

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
