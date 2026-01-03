"use client"
import { ContainerLayout } from "@/components/layout"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const ServiceCTA = () => {
    return (
        <section className="lg:py-12.5 py-6.25 relative overflow-hidden">
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-primary/10" />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-accent/10 rounded-full blur-3xl pointer-events-none"
            />

            <ContainerLayout className="relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-accent text-xs tracking-[0.3em] font-medium mb-8 uppercase"
                    >
                        Ready to start?
                    </motion.span>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.95] mb-10">
                        Let's create something
                        <span className="block text-accent">extraordinary</span>
                        together
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center gap-4 text-lg font-medium bg-accent text-accent-foreground px-10 py-5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--accent),0.3)]"
                        >
                            <span className="relative z-10">Start a Project</span>
                            <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </motion.div>
            </ContainerLayout>
        </section>
    )
}

export default ServiceCTA