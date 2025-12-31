"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, TrendingUp, Eye, MousePointerClick } from "lucide-react";
import { useRef, useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import Link from "next/link";
import { ContainerLayout } from "@/components/layout";

const caseStudies = [
    {
        id: 1,
        title: "Redtail Roofing",
        category: "Brand Identity + Web",
        beforeImage: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop",
        results: [
            { icon: TrendingUp, value: "+340%", label: "Organic Traffic" },
            { icon: MousePointerClick, value: "2.5x", label: "Lead Conversion" },
        ],
        testimonial: "Mohsin Designs completely transformed our online presence.",
        slug: "redtail-roofing",
    },
    {
        id: 2,
        title: "Adams Repipe",
        category: "Website + SEO",
        beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
        results: [
            { icon: Eye, value: "15K+", label: "Monthly Visitors" },
            { icon: TrendingUp, value: "+280%", label: "Revenue Growth" },
        ],
        testimonial: "The results exceeded our expectations in every way.",
        slug: "adams-repipe",
    },
    {
        id: 3,
        title: "Desert Performance",
        category: "Full Rebrand",
        beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        afterImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
        results: [
            { icon: TrendingUp, value: "+425%", label: "Brand Recognition" },
            { icon: MousePointerClick, value: "3x", label: "Customer Inquiries" },
        ],
        testimonial: "They understood our vision and brought it to life.",
        slug: "desert-performance",
    },
];

const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

    return (
        <div
            ref={containerRef}
            className="relative aspect-[16/10] overflow-hidden rounded-2xl cursor-ew-resize group"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                />
                {/* Before overlay */}
                <div className="absolute inset-0 bg-primary/30" />
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-accent shadow-lg shadow-accent/50 z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-xl">
                    <div className="flex gap-0.5">
                        <div className="w-0.5 h-4 bg-accent-foreground rounded-full" />
                        <div className="w-0.5 h-4 bg-accent-foreground rounded-full" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium z-10">
                Before
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-medium z-10">
                After
            </div>
        </div>
    );
};

const CaseStudiesPreview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
            <motion.div
                style={{ y }}
                className="absolute -right-40 top-0 -z-50 w-150 h-150 bg-accent/5 rounded-full blur-3xl"
            />

            <ContainerLayout>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionHeading
                            eyebrow="Case Studies"
                            title="Real Results, Real Growth"
                            description="See how we've helped businesses transform their brands and achieve measurable success."
                            className="mb-0"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <Link
                            href="/portfolio"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-all duration-300 shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.5)]"
                        >
                            <span>View All Projects</span>
                            <ArrowUpRight className="size-4.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </div>

                {/* Case Studies Grid */}
                <div className="space-y-8">
                    {caseStudies.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Before/After Slider */}
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <BeforeAfterSlider
                                        beforeImage={project.beforeImage}
                                        afterImage={project.afterImage}
                                    />
                                </div>

                                {/* Content */}
                                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div>
                                        <span className="text-sm text-accent font-medium uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-display font-bold mt-2 group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Results */}
                                    <div className="flex gap-6">
                                        {project.results.map((result, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                                    <result.icon className="w-5 h-5 text-accent" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-display font-bold text-accent">
                                                        {result.value}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {result.label}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Testimonial */}
                                    <blockquote className="text-muted-foreground italic border-l-2 border-accent/30 pl-4">
                                        "{project.testimonial}"
                                    </blockquote>

                                    <Link
                                        href={`/portfolio/${project.slug}`}
                                        className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors group/link"
                                    >
                                        View full case study
                                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Divider */}
                            {index < caseStudies.length - 1 && (
                                <div className="h-px bg-border mt-12" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Mobile CTA */}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 lg:hidden text-center"
                >
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary-foreground font-medium hover:bg-accent/90 transition-all duration-300"
                    >
                        View all Projects
                        <ArrowUpRight className="size-4.5" />
                    </Link>
                </motion.div>
            </ContainerLayout>
        </section>
    );
};

export default CaseStudiesPreview;
