"use client"

import SectionHeading from "@/components/ui/section-heading";
import { processSteps } from "@/constants/services.constants";
import { useScroll, useTransform,motion } from "motion/react";
import { useRef } from "react";
import TimelineStep from "./TimelineStep";
import { ContainerLayout } from "@/components/layout";

const ProcessTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section className="lg:py-12.5 py-6.25 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <ContainerLayout className="relative">

        <SectionHeading
          eyebrow="Our Process"
          title="How We Work"
          description="A transparent, collaborative process designed to deliver exceptional results every time."
          align="center"
          splitText
        />
        
        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-20">

          {/* Central vertical line - Desktop (background) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />
          
          {/* Animated progress line - Desktop */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 w-0.5 bg-linear-to-b from-accent via-accent to-accent/50 -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />
          
          {/* Progress glow effect */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 w-4 bg-accent/30 blur-md -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />
          
          <div className="space-y-8 lg:space-y-0">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepProgress = index / (processSteps.length - 1);
              
              return (
                <TimelineStep 
                  key={step.title}
                  step={step}
                  index={index}
                  isEven={isEven}
                  isLast={index === processSteps.length - 1}
                  scrollProgress={scrollYProgress}
                  stepProgress={stepProgress}
                />
              );
            })}
          </div>
          
          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center mt-8"
          >
            <motion.div 
              className="w-5 h-5 rounded-full bg-accent shadow-lg shadow-accent/30"
              style={{
                scale: useTransform(scrollYProgress, [0.9, 1], [0.5, 1]),
                opacity: useTransform(scrollYProgress, [0.85, 1], [0.3, 1]),
              }}
            />
          </motion.div>

        </div>

      </ContainerLayout>
    </section>
  );
};


export default ProcessTimeline