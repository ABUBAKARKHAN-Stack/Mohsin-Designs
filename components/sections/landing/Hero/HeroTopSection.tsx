
import { motion, MotionValue, } from "motion/react";
import { CheckCircle2, Star } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";
import { serviceItems } from "@/constants/services.constants";
import Logo from "@/components/ui/logo";

type Props = {
    y: MotionValue<number>
}

const HeroTopSection = ({
    y
}: Props) => {
    return (
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12 lg:mb-16">

            {/* Left Column */}
            <div>
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="max-w-xl"
                >
                    <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                        We are a creative design agency helping ambitious businesses build brands
                        that are clear, confident, and impossible to ignore.
                    </p>
                </motion.div>
            </div>

            {/* Right Column - Visual showcase */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative hidden lg:block"
            >
                {/* Main showcase card */}
                <div className="relative">
                    <motion.div
                        style={{ y }}
                        className="relative z-10 bg-card border border-border p-8"
                    >
                        {/* Logo */}
                        <div className="relative flex items-center justify-center mb-8">
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute w-40 h-40 bg-accent/15 rounded-full blur-3xl"
                            />
                            <Logo className='h-36 w-36 relative z-10' />
                        </div>

                        {/* Services list */}
                        <div className="space-y-2.5">
                            {serviceItems.map((service, i) => (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={service.path}
                                        className="flex items-center gap-3 p-3.5 bg-muted/50 border border-border hover:border-accent/30 hover:bg-accent/5 transition-all group"
                                    >
                                        <div className="w-7 h-7 bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                                        </div>
                                        <span className="text-sm font-medium tracking-wide">{service.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Decorative frame */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute -top-3 -right-3 w-full h-full border border-accent/40 -z-10"
                    />

                    {/* Accent square */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -bottom-5 -left-5 w-16 h-16 bg-accent flex items-center justify-center"
                    >
                        <Star className="w-6 h-6 fill-accent-foreground text-accent-foreground" />
                    </motion.div>

                    {/* Since badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute -top-6 -left-6 bg-foreground text-background px-4 py-2 text-xs font-semibold tracking-wider uppercase"
                    >
                        Since 2019
                    </motion.div>
                </div>
            </motion.div>

        </div>
    )
}

export default HeroTopSection