"use client"

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", align === "center" && "text-center", className)}
    >
      {eyebrow && (
        <span className="text-sm uppercase tracking-widest text-muted-foreground block mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
        {title}<span className="text-accent">.</span>
      </h2>
      {description && (
        <p className={cn(
          "text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed",
          align === "center" && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;