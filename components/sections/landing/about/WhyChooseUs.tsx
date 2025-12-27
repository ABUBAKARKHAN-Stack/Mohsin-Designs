"use client"

import { motion } from "motion/react";
import SplitText from "@/components/ui/split-text";
import { reasons } from "@/constants/about.constants";
import { ContainerLayout } from "@/components/layout";
import { APP_NAME } from "@/constants/app.constants";



const WhyChooseUs = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />

      <ContainerLayout className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] text-accent uppercase">Why Us</span>
          <SplitText
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mt-4"
          >
            {`Why choose ${APP_NAME}`}
          </SplitText>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            We combine creativity, technology, and strategy to deliver exceptional digital experiences that drive real business results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-sm border border-border bg-card hover:border-accent/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

              <div className="relative">
                <motion.div
                  className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <reason.icon className="w-6 h-6 text-accent" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
};

export default WhyChooseUs;
