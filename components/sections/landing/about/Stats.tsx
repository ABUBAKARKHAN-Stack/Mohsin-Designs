"use client"

import { stats } from "@/constants/stats.constants";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ContainerLayout } from "@/components/layout";
import { cn } from "@/lib/utils";



const Stats = () => {
  return (
    <section className="py-24 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/50 via-background to-muted/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-secondary/5 rounded-full blur-3xl" />

      <ContainerLayout className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-3">
            Our Impact
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={
                cn(
                  "group text-center p-8 md:p-10 bg-card border border-border hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300",
                  index === 1 ? "lg:col-span-2" : "col-span-1"
                )
              }
            >
              {/* Number */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-3">
                <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-secondary group-hover:to-secondary/80 transition-all duration-300">
                  <NumberTicker value={stat.value} suffix={stat.suffix} />
                </span>
              </div>

              {/* Label */}
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-[0.15em]">
                {stat.label}
              </div>

              {/* Bottom accent */}
              <div className="mt-6 mx-auto w-8 h-0.5 bg-border group-hover:w-16 group-hover:bg-secondary transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
};

export default Stats;
