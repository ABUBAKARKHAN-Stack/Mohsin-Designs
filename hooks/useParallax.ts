import { useScroll, useTransform, MotionValue } from "motion/react"";
import { useRef } from "react";

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return { ref, y };
};

export const useParallaxRange = (
  inputRange: number[] = [0, 1],
  outputRange: number[] = [0, 100]
): { scrollYProgress: MotionValue<number>; y: MotionValue<number> } => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, inputRange, outputRange);

  return { scrollYProgress, y };
};