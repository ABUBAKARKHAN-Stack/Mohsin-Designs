import MagneticButton from "@/components/MagneticButton";
import { trustedBrands } from "@/constants/about.constants";
import Image from "next/image";
import { motion } from "motion/react";

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
                    src={brand.logo}
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

export default MarqueeRow