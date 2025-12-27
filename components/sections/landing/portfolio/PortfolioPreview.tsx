"use client"

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { ContainerLayout } from "@/components/layout";
import { projects } from "@/constants/portfolio.constants";
import Image from "next/image";


const PortfolioPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-32 bg-card relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -left-40 bottom-0 w-150 h-150 bg-accent/5 rounded-full blur-3xl"
      />

      <ContainerLayout>

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
              <span className="text-sm tracking-[0.3em] text-accent uppercase font-semibold">Portfolio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Selected <span className="text-accent">Work</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg max-w-lg"
            >
              A curated collection of our projects showcasing creativity, technical skill, and design excellence.
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
              href="/portfolio"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-all duration-300 shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.5)]"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="size-4.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>


        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-sm aspect-16/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/0 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs tracking-[0.2em] text-accent uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-primary-foreground group-hover:text-white text-shadow-[0px_0px_2px_rgba(0,0,0,.75)] mt-2 group-hover:translate-x-2 transition-[colors_transform] duration-300">
                    {project.title}
                  </h3>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
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
            href="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-all duration-300"
          >
            View all Projects
            <ArrowUpRight className="size-4.5" />
          </Link>
        </motion.div>
      </ContainerLayout>
    </section>
  );
};

export default PortfolioPreview;
