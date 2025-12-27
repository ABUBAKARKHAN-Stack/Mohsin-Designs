"use client"

import Marquee from "@/components/ui/marquee";


const serviceHighlights = [
    "Strategy",
    "Logo Design",
    "Branding",
    "Web Development",
    "SEO & Ads",
    "Motion Graphics"
];


const ServiceHighlightsMarquee = ({
    className = ""
}: { className?: string }) => {
    return (
        <Marquee
            className={className}
            items={serviceHighlights}
        />
    );
};

export default ServiceHighlightsMarquee;