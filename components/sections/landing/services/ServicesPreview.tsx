"use client"

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { servicesPreview } from "@/constants/services.constants";
import ServiceCard from "./ServiceCard";
import { ContainerLayout } from "@/components/layout";



const ServicesPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} className="py-28 lg:py-40 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute -left-32 top-32 w-125 h-125 bg-accent/5 rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute -right-32 bottom-32 w-100 h-100 bg-secondary/30 rounded-full blur-[100px]"
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-size-[80px_80px]" />
      
      <ContainerLayout className=" relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
                <span className="text-sm tracking-[0.3em] text-accent uppercase font-semibold">Services</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              What We <span className="text-accent">Do Best</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg max-w-lg"
            >
              We blend creativity with technology to craft digital experiences that captivate and convert.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <Link 
              href="/services"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-all duration-300 shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.5)]"
            >
              <span>View All Services</span>
              <ArrowUpRight className="size-4.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {servicesPreview.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:hidden text-center"
        >
          <Link 
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-all duration-300"
          >
            View All Services
            <ArrowUpRight className="size-4.5" />
          </Link>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default ServicesPreview;
