"use client"

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { ContainerLayout } from "@/components/layout";
import Image from "next/image";

const AboutPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="lg:py-12.5 py-6.25  relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -right-40 top-20 w-125 h-125 bg-accent/5 rounded-full blur-3xl"
      />

      <ContainerLayout>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm tracking-[0.3em] text-accent uppercase">About Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mt-4 leading-tight">
              We craft digital
              <br />
              <span className="text-accent">experiences</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-8 leading-relaxed max-w-lg">
              We're a collective of strategists, designers, and developers who believe
              in the power of thoughtful design and meticulous execution.
            </p>
            <p className="text-muted-foreground text-lg mt-4 leading-relaxed max-w-lg">
              Since 2019, we've partnered with ambitious brands to create digital
              products that matter. Our approach combines strategic thinking with
              creative excellence.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-foreground font-medium group"
            >
              <span className="border-b border-foreground pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                Learn more about us
              </span>
              <ArrowUpRight className="size-4.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 group-hover:text-accent" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="aspect-4/5 bg-muted rounded-sm overflow-hidden">
                <Image
                  src={'/assets/about/about-preview.avif'}
                  fill 
                  alt="Team collaboration"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-accent text-primary p-8">
                <div className="text-5xl font-bold">6+</div>
                <div className="text-sm mt-1 font-medium">Years of excellence</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
      </ContainerLayout>
    </section>
  );
};

export default AboutPreview;
