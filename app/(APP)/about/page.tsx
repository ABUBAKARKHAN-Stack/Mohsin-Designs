"use client"
import PageHero from "@/components/ui/page-hero";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
    Linkedin,
    Twitter,
    Mail,
    Target,
    Eye,
    Compass,
    Lightbulb,
    Palette,
    Globe2,
    Video,
    Code,
    Search,
    Megaphone,
    FileSearch,
    PenTool,
    Rocket,
    MessageSquare,
    HeartHandshake,
    ArrowRight,
    CheckCircle2,
    Building2,
    Stethoscope,
    ShoppingBag,
    GraduationCap,
    Utensils,
    Home,
    Car,
    Briefcase,
    Scale,
    Users,
    Award,
    Handshake,
    Layers
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import founderImage from "@/assets/founder-mohsin.jpg";
import { Button } from "@/components/ui/button";
import { 
    Stats,
     WhyChooseUs,
     Leadership,
     IndustriesWeServe,
     } from "@/components/sections/landing";
import Link from "next/link";

// Services data
const services = [
    {
        icon: Palette,
        title: "Branding & Logo Design",
        description: "Custom logos and complete brand identities that reflect the personality, values, and positioning of a business. Designed for clarity and long-term relevance.",
    },
    {
        icon: Layers,
        title: "Visual Identity Systems",
        description: "Full visual systems that define how a brand looks and feels everywhere it appears — from colors to typography to patterns.",
    },
    {
        icon: Video,
        title: "Logo Animation & Motion",
        description: "Motion adds depth and personality. Our animations are designed for video intros, social media, presentations, and advertising.",
    },
    {
        icon: Code,
        title: "Website Design & Development",
        description: "Visually refined, user-focused, and conversion-driven websites. From corporate sites to eCommerce, structured to guide users and encourage action.",
    },
    {
        icon: Search,
        title: "Search Engine Optimization",
        description: "SEO focused on long-term performance. On-page optimization, content structure, technical improvements, and user experience alignment.",
    },
    {
        icon: Megaphone,
        title: "Paid Advertising",
        description: "Targeted paid advertising campaigns reaching the right audience, controlling budgets efficiently, and optimizing for conversions.",
    },
];

// Process steps
const processSteps = [
    {
        icon: FileSearch,
        title: "Discovery & Understanding",
        description: "Every project begins with discovery. We invest time in understanding your business model, audience, competition, and goals.",
        number: "01",
    },
    {
        icon: Compass,
        title: "Strategic Planning",
        description: "Based on discovery insights, we create a clear strategy that guides design, messaging, and technical decisions.",
        number: "02",
    },
    {
        icon: PenTool,
        title: "Design & Execution",
        description: "With strategy in place, our team moves into execution with attention to detail and quality control at every step.",
        number: "03",
    },
    {
        icon: MessageSquare,
        title: "Review & Refinement",
        description: "Client feedback is essential. We refine and adjust work to ensure the final output aligns with expectations.",
        number: "04",
    },
    {
        icon: Rocket,
        title: "Launch & Support",
        description: "After launch, we continue supporting with updates, improvements, and growth strategies. Many partnerships extend far beyond the initial project.",
        number: "05",
    },
];





// Culture values
const cultureValues = [
    {
        icon: MessageSquare,
        title: "Clear Communication",
        description: "We believe transparency creates trust. Direct, honest, and timely communication in every interaction.",
    },
    {
        icon: Award,
        title: "Quality First",
        description: "Good work should last beyond trends. We prioritize craftsmanship and attention to detail.",
    },
    {
        icon: HeartHandshake,
        title: "Respect & Partnership",
        description: "We respect our clients' businesses as if they were our own. Long-term relationships over transactions.",
    },
];

// Global regions
const globalRegions = [
    "North America",
    "Europe",
    "Middle East",
    "Asia Pacific",
];

// Intro Section
const IntroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
            <motion.div
                style={{ y }}
                className="absolute -right-40 top-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-sm tracking-[0.3em] text-accent uppercase">Who We Are</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mt-4 leading-tight">
                            A Creative Digital Agency{" "}
                            <span className="text-accent">Built for Growth</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mt-8 leading-relaxed">
                            Mohsin Designs is a full-service creative digital agency dedicated to helping businesses
                            build strong brands, establish authority, and grow with confidence in competitive markets.
                        </p>
                        <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
                            We work with entrepreneurs, startups, and established businesses to transform ideas into
                            clear, consistent, and results-driven digital experiences. From branding to web design,
                            SEO, and paid advertising — strategy, creativity, and execution under one roof.
                        </p>
                        <p className="text-foreground font-medium text-lg mt-6 border-l-2 border-accent pl-4">
                            Our clients don't come to us for trends. They come to us for clarity, structure, and outcomes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-muted rounded-sm overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                                alt="Team collaboration"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 md:p-8"
                        >
                            <div className="text-4xl md:text-5xl font-bold">2019</div>
                            <div className="text-sm mt-1 font-medium">Since Inception</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Mission Vision Section
const MissionVisionSection = () => {
    return (
        <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-card border border-border rounded-2xl p-8 md:p-10 relative group hover:border-accent/50 transition-colors duration-300"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                        <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-accent" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                To help businesses present themselves with clarity and confidence in the digital world.
                                A strong brand should communicate instantly, build trust naturally, and support long-term growth.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                Through thoughtful design and smart digital strategy, we help businesses position themselves
                                clearly, attract the right audience, and convert attention into action.
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-card border border-border rounded-2xl p-8 md:p-10 relative group hover:border-accent/50 transition-colors duration-300"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                        <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7 text-accent" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Our Vision</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                We envision a digital space where businesses are represented honestly, professionally,
                                and strategically.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                In a market crowded with generic designs and copy-paste solutions, Mohsin Designs aims to
                                raise the standard. We strive to become a long-term digital partner for brands that care
                                about quality, consistency, and sustainable growth.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Philosophy Section
const PhilosophySection = () => {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm tracking-[0.3em] text-accent uppercase">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mt-4 mb-8">
                            Strategy <span className="text-accent">Before</span> Design
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                    >
                        <p>
                            At Mohsin Designs, design is never created in isolation. Every color choice, layout decision,
                            animation, and line of content exists to serve a purpose.
                        </p>
                        <p className="text-foreground font-medium text-xl">
                            A website is not just a collection of pages. A logo is not just a symbol. A brand is not just visuals.
                        </p>
                        <p>
                            Before we design anything, we seek to understand the business, the audience, the market, and the goal.
                            Only then do we translate that understanding into visual and digital solutions that work together as a system.
                        </p>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 flex justify-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Lightbulb className="w-8 h-8 text-accent" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground self-center" />
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Compass className="w-8 h-8 text-accent" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground self-center" />
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                            <PenTool className="w-8 h-8 text-accent" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground self-center" />
                        <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center">
                            <Rocket className="w-8 h-8 text-accent-foreground" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// What We Do Section
const WhatWeDoSection = () => {
    return (
        <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <SectionHeading
                    eyebrow="Our Services"
                    title="What We Do"
                    description="End-to-end digital solutions designed to support businesses at every stage of growth."
                    align="center"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-6 md:p-8 bg-card border border-border rounded-2xl hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                                <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-accent transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link href="/services">
                        <Button variant="outline" size="lg" className="group">
                            Explore All Services
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

// How We Work Section
const HowWeWorkSection = () => {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <SectionHeading
                    eyebrow="Our Process"
                    title="How We Work"
                    description="A structured, transparent, and collaborative process designed to deliver consistent results."
                    align="center"
                />

                {/* Desktop Timeline */}
                <div className="hidden lg:block relative mt-16">
                    <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                    <div className="grid lg:grid-cols-5 gap-6">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                                            {step.number}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border border-border/50 rounded-2xl p-5 h-full hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group-hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                                        <step.icon className="w-6 h-6 text-accent" />
                                    </div>

                                    <h3 className="text-lg font-display font-semibold mb-2 text-foreground">
                                        {step.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-6 mt-12">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-4 group"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-sm shrink-0">
                                    {step.number}
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-gradient-to-b from-accent/50 to-transparent mt-3" />
                                )}
                            </div>

                            <div className="bg-card border border-border/50 rounded-xl p-5 flex-1 group-hover:border-accent/30 transition-colors duration-300 mb-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <step.icon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-foreground">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// Global Reach Section
const GlobalReachSection = () => {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm tracking-[0.3em] text-accent uppercase">Remote-First</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mt-4 mb-6">
                            Global Reach & <span className="text-accent">Scale</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            Mohsin Designs serves clients across multiple continents through a remote-first model.
                            Our global exposure allows us to understand diverse audiences, cultural expectations, and digital behaviors.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Despite geographic differences, our commitment remains consistent: clear communication,
                            professional execution, and reliable results.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {globalRegions.map((region, index) => (
                                <motion.span
                                    key={region}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium"
                                >
                                    {region}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-card border border-border rounded-3xl p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
                            <Globe2 className="w-32 h-32 md:w-48 md:h-48 text-accent/20" />

                            {/* Stats overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    {[
                                        { value: "4+", label: "Continents" },
                                        { value: "10+", label: "Countries" },
                                        { value: "3000+", label: "Projects" },
                                        { value: "100%", label: "Remote" },
                                    ].map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                            className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-4"
                                        >
                                            <div className="text-2xl md:text-3xl font-display font-bold text-accent">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// Culture Section
const CultureSection = () => {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <SectionHeading
                    eyebrow="Our Values"
                    title="Culture & Values"
                    description="Our culture is built around responsibility, growth, and respect."
                    align="center"
                />

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {cultureValues.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                                <value.icon className="w-10 h-10 text-accent group-hover:text-accent-foreground transition-colors" />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <blockquote className="text-2xl md:text-3xl font-display italic text-muted-foreground max-w-3xl mx-auto">
                        "Most importantly, we respect our clients' businesses{" "}
                        <span className="text-accent not-italic font-bold">as if they were our own.</span>"
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
};

// CTA Section
const CTASection = () => {
    return (
        <section className="py-24 md:py-32 bg-accent relative overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Floating shapes */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-[10%] w-20 h-20 border-2 border-accent-foreground/20 rounded-full"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-[15%] w-32 h-32 border-2 border-accent-foreground/10 rounded-lg"
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-accent-foreground mb-6">
                            Partner With Mohsin Designs
                        </h2>
                        <p className="text-accent-foreground/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                            If you're looking for a digital agency that combines creativity with strategy and execution,
                            we're ready to support your journey. We work best with businesses that care about their brand,
                            value professionalism, and want results that last.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/contact">
                            <Button size="lg" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 h-14 px-8 text-base font-semibold group">
                                Start Your Project
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/portfolio">
                            <Button size="lg" variant="outline" className="border-2 border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 h-14 px-8 text-base font-semibold">
                                View Our Work
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 mt-12"
                    >
                        {[
                            { icon: CheckCircle2, text: "Free Consultation" },
                            { icon: Users, text: "Dedicated Team" },
                            { icon: Handshake, text: "Long-term Partnership" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-accent-foreground/80">
                                <item.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <>
            <PageHero
                title="About"
                titleAccent="Us"
                subtitle="Our Story"
                description="A full-service creative digital agency dedicated to helping businesses build strong brands and grow with confidence."
                breadcrumbs={[{ label: "About" }]}
            />

            <IntroSection />
            <MissionVisionSection />
            <PhilosophySection />
            <Stats />
            <WhatWeDoSection />
            <HowWeWorkSection />
            <IndustriesWeServe />
            <GlobalReachSection />
            <WhyChooseUs />
            <Leadership />
            <CultureSection />
            <CTASection />
        </>
    );
};

export default About;
