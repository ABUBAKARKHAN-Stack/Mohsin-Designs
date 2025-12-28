import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
    project: {
        id: number;
        slug: string;
        title: string;
        category: string;
        image: string;
    };
    index:number
}
const PortfolioCard: FC<Props> = ({
    project,
    index
}) => {
    return (
        <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="aspect-4/3 relative overflow-hidden mb-4">
                    <Image
                        src={project.image}
                        fill
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-display font-bold tracking-tight group-hover:text-accent transition-colors">{project.title}</h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">{project.category}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>
        </motion.div>
    )
}

export default PortfolioCard