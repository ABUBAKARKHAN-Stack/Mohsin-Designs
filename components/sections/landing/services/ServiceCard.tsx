"use client"

import { servicesPreview } from "@/constants/services.constants";
import { ArrowUpRight } from "lucide-react";
import { useMotionValue, useSpring, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ServiceCardProps {
    service: typeof servicesPreview[0];
    index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.a
            ref={cardRef}
            href={service.path}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative group cursor-pointer"
        >
            <div className={`relative h-full p-8 lg:p-10 border border-border/50 bg-card/50 backdrop-blur-xs overflow-hidden transition-all duration-500 ${isHovered ? "border-accent shadow-[0_20px_60px_-15px_hsl(var(--accent)/0.3)]" : ""
                }`}>

                {/* Service Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <Image
                        fill
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/80 to-card/60" />
                </div>

                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Shine effect on hover */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: "linear-gradient(105deg, transparent 40%, hsl(var(--accent) / 0.08) 45%, hsl(var(--accent) / 0.05) 50%, transparent 55%)",
                    }}
                    animate={isHovered ? {
                        transform: ["translateX(-100%)", "translateX(100%)"]
                    } : { transform: "translateX(-100%)" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                />

                {/* Top accent line */}
                <motion.div
                    className="absolute top-0 left-0 h-0.5 bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />

                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-5">
                            <motion.div
                                className="relative w-16 h-16 flex shrink-0 items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Icon background */}
                                <div className="absolute inset-0 bg-accent/10 border border-accent/20 rotate-45 transition-transform duration-300 group-hover:rotate-50" />
                                <service.icon className="relative z-10 w-7 h-7 text-accent" />
                            </motion.div>
                            <div>
                                <span className="block text-[10px] tracking-[0.4em] text-accent font-semibold mb-1">{service.number}</span>
                                <motion.h3
                                    className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground"
                                    animate={{ color: isHovered ? "hsl(var(--accent))" : "hsl(var(--foreground))" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {service.title}
                                </motion.h3>
                            </div>
                        </div>
                        <motion.div
                            className="w-10 h-10 border border-border flex items-center justify-center transition-colors duration-300 group-hover:border-accent group-hover:bg-accent"
                            animate={{
                                x: isHovered ? 3 : 0,
                                y: isHovered ? -3 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                        </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8 text-base lg:text-lg">
                        {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, i) => (
                            <motion.span
                                key={feature}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                className="text-xs tracking-wider px-4 py-2 bg-muted/50 text-muted-foreground border border-border/50 transition-all duration-300 group-hover:border-accent/30 group-hover:text-foreground"
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Bottom corner accent */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all duration-500" />
            </div>
        </motion.a>
    );
};

export default ServiceCard