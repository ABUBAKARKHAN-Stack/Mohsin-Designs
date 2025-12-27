"use client"

import MagneticButton from "@/components/MagneticButton";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { stats } from "@/constants/stats.constants";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export const LeftContent = () => {
    return (
        <div className="max-w-2xl">

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-8"
            >
                <div className="flex relative items-center gap-2.5 px-4 py-2.5 rounded-full bg-accent/10">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                            >
                                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                            </motion.div>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-foreground/80">Trusted by 3,000+ Businesses</span>
                    <BorderBeam
                        className="from-accent/60 via-accent to-transparent"
                        duration={6}
                        size={50}
                    />
                </div>
            </motion.div>

            {/* Main heading */}
            <div className="mb-8 space-y-1">
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.02] tracking-tight"
                    >
                        We Build
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.02] tracking-tight text-stroke"
                    >
                        Brands That
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.02] tracking-tight gradient-text"
                    >
                        Stand Out
                    </motion.h1>
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
            >
                A creative design agency crafting bold logos, stunning websites, and
                memorable brand identities that help businesses grow faster.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap gap-4 mb-12"
            >
                <MagneticButton strength={0.12}>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-semibold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 shadow-lg shadow-accent/20"
                    >
                        Start Your Project
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </MagneticButton>

                <MagneticButton strength={0.12}>
                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-3 border-2 border-border hover:border-accent px-8 py-4 font-semibold text-sm uppercase tracking-wider hover:text-accent transition-all duration-300"
                    >
                        View Our Work
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </MagneticButton>
            </motion.div>

            {/* Quick stats */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap gap-10 md:gap-14 pt-8 border-t border-border/50"
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        className="space-y-1"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                    >
                        <NumberTicker
                            className="text-3xl md:text-4xl font-display font-bold text-accent dark:text-accent"
                            value={stat.value}
                            suffix={stat.suffix}
                        />
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
