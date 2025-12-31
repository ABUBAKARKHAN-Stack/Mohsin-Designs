"use client"

import { stats } from "@/constants/stats.constants";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ContainerLayout } from "@/components/layout";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/split-text";


const Stats = () => {
  return (
    <section className="lg:py-12.5 py-6.25 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/50 via-background to-muted/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-secondary/5 rounded-full blur-3xl" />

      <ContainerLayout className="relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="space-y-4">
            <span className="text-sm block tracking-[0.3em] text-accent uppercase font-medium">
              A Measurable Impact
            </span>
            <SplitText
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              animation="slide"
            >
              Numbers That Speak
            </SplitText>
          </div>

          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            These numbers are not just metrics, They represent years of consistency, accountability, and trust built across projects and partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover="hover"
              className="relative size-84 flex justify-center items-center "
            >
              <motion.div
                className={cn(
                  "group text-center absolute size-68  z-999 flex justify-center items-center flex-col bg-accent text-accent-foreground border border-border  hover:border-secondary/40 rounded-full hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300"
                )}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-3">
                  <NumberTicker prefix="0" value={stat.value} suffix={stat.suffix} className="text-accent-foreground!" />
                </div>
                <div className="text-sm font-medium uppercase tracking-[0.15em]">
                  {stat.label}
                </div>

              </motion.div>
              <motion.div
               
                className="size-84 absolute rounded-full  border-accent border-2 z-10"
              />

            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
};

export default Stats;
