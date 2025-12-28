"use client"

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import MagneticButton from "@/components/MagneticButton";
import { ContainerLayout } from "@/components/layout";
import Link from "next/link";

const CTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="lg:py-12.5 py-6.25  bg-primary text-primary-foreground relative overflow-hidden">

      <motion.div
        style={{ y }}
        className="absolute -left-40 top-0 w-150 h-150 bg-accent/10 rounded-full blur-3xl"
      />

      <motion.div
        style={{ y }}
        className="absolute -right-40 top-0 w-150 h-150 bg-accent/10 rounded-full blur-3xl"
      />

      <ContainerLayout className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
            Ready to start your next project?
          </h2>
          <p className="text-primary-foreground/70 text-lg mt-6 max-w-xl leading-relaxed">
            Let's collaborate and create something exceptional together.
            Get in touch to discuss your vision.
          </p>
          <div className="mt-10 w-fit">
            <MagneticButton strength={0.2}>
              <Button
                size="lg"
                variant="secondary"
                data-cursor-text="Go"
                asChild
              >
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 size-4.5" />
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default CTA;