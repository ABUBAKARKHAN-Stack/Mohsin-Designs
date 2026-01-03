"use client"
import { useScroll, useTransform, motion } from 'motion/react';
import  { useRef } from 'react'

type Props = {
    heroImage: string;
    title: string
}
const HeroImage = ({
    heroImage,
    title
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={containerRef} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
            <motion.div
                style={{ y: imageY }}
                className="absolute inset-0"
            >
                <img
                    src={heroImage}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
            </motion.div>
        </section>
    )
}

export default HeroImage