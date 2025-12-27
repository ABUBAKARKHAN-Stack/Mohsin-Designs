"use client"

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "lucide-react";
import { useState } from "react";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

const FloatingContactBadge = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 100,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40"
    >
      <MagneticButton strength={0.3}>
        <Link
          href="/contact"
          className="group flex items-center gap-3 bg-secondary text-secondary-foreground px-5 py-3 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Phone className="w-4 h-4" />
          </motion.div>
          <span className="hidden sm:inline">Get in Touch</span>
        </Link>
      </MagneticButton>
    </motion.div>
  );
};

export default FloatingContactBadge;
