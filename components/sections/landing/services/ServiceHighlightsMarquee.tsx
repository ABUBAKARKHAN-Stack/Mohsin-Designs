"use client"

import { Marquee } from "@/components/ui/marquee";


const serviceHighlights = [
    "Strategy",
    "Logo Design",
    "Branding",
    "Web Development",
    "SEO & Ads",
    "Motion Graphics"
];


const ServiceHighlightsMarquee = () => {
    return (
        <Marquee className="[--duration:20s] py-8 border-y border-border">
            {serviceHighlights.map((item, i) => (
                <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
                    <span className="text-4xl md:text-6xl font-display font-bold tracking-tight text-muted-foreground/30 hover:text-accent transition-colors">
                        {item}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-accent" />
                </div>
            ))}
        </Marquee>
    );
};

export default ServiceHighlightsMarquee;