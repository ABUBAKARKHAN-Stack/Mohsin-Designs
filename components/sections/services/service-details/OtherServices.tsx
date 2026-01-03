"use client"
import { ContainerLayout } from "@/components/layout"
import { servicesData } from "@/data/service.data"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

type Props = { slug: string }

const OtherServices = ({ slug }: Props) => {
    return (
        <section className="lg:py-12.5 py-6.25 bg-muted/30 relative">

            <ContainerLayout>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
                >
                    <div>
                        <span className="inline-block text-accent text-xs tracking-[0.3em] font-medium mb-4 uppercase">Keep exploring</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
                            Other services
                        </h2>
                    </div>
                    <Link
                        href="/services"
                        className="text-accent hover:underline underline-offset-4 inline-flex items-center gap-2"
                    >
                        View all services <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(servicesData)
                        .filter(([key]) => key !== slug)
                        .slice(0, 3)
                        .map(([key, s], i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/services/${key}`}
                                    className="group block relative p-8 bg-background border border-border/50 hover:border-accent/50 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Watermark number */}
                                    <span className="absolute -right-4 -top-6 text-[120px] font-display font-bold dark:text-muted/20 text-muted/50 leading-none pointer-events-none">
                                        {s.number}
                                    </span>

                                    <div className="relative z-10">
                                        <span className="text-accent text-xs tracking-widest font-medium">{s.number}</span>
                                        <h3 className="text-2xl font-display font-bold mt-2 mb-3 group-hover:text-accent transition-colors">
                                            {s.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                            {s.description}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn more <ArrowUpRight className="h-4 w-4" />
                                        </span>
                                    </div>

                                    {/* Hover line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
                                </Link>
                            </motion.div>
                        ))}
                </div>
            </ContainerLayout>

        </section>
    )
}

export default OtherServices