import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

type Props = {
    project: {
        id: number;
        title: string;
        category: string;
        image: string;
    };
    index: number;
};

const PortfolioCard = ({ project, index }: Props) => {
    return (
        <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-sm aspect-16/10">
                {/* Image */}
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="w-full h-full object-cover transition-all duration-700 
                     md:grayscale group-hover:md:grayscale-0 group-hover:md:scale-105"
                    loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/0 transition-colors duration-500" />

                {/* Typography */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                    <span className="text-xs tracking-[0.2em] text-accent uppercase">
                        {project.category}
                    </span>
                    <h3 className="text-lg md:text-2xl font-semibold text-white 
                         group-hover:text-white text-shadow-[0px_0px_2px_rgba(0,0,0,.75)] 
                         mt-1 md:mt-2 group-hover:translate-x-0 md:group-hover:translate-x-2 
                         transition-[colors_transform] duration-300">
                        {project.title}
                    </h3>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-accent text-primary rounded-full flex items-center justify-center">
                        <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioCard;
