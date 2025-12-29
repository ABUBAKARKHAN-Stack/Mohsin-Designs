"use client"

import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ThemeToggle from "@/components/ui/theme-toggle";
import { serviceItems } from '@/constants/services.constants'
import { navLinks } from "@/constants/navlinks.constants";
import { APP_NAME } from "@/constants/app.constants";
import Link from "next/link";
import ContainerLayout from "../ContainerLayout";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";

type Props = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DesktopNav: FC<Props> = ({
    isOpen,
    setIsOpen
}) => {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    //* Close dropdown when route changes
    useEffect(() => {
        setServicesOpen(false);
    }, [pathname]);

    const router = useRouter()

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
                }`}
        >
            <nav>
                <ContainerLayout>
                    <div className="flex items-center justify-between">

                        <MagneticButton strength={0.2}>
                            <Link href="/" className="relative z-50">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Logo />
                                </motion.div>

                            </Link>
                        </MagneticButton>

                        {/* Center nav links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <div
                                    key={link.path}
                                    className="relative"
                                    onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                                    onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
                                >
                                    <MagneticButton strength={0.1}>
                                        <Link
                                            href={link.path}
                                            className={`relative px-5 py-2 text-sm tracking-wide transition-colors group inline-flex items-center gap-1 ${pathname === link.path || (link.hasDropdown && pathname.startsWith('/services'))
                                                ? "text-accent"
                                                : "text-foreground/70 hover:text-foreground"
                                                }`}
                                        >
                                            <span className="relative z-10">{link.name}</span>
                                            {link.hasDropdown && (
                                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                                            )}
                                            {(pathname === link.path || (link.hasDropdown && pathname.startsWith('/services'))) && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 bg-accent/10 border border-accent/20"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </Link>
                                    </MagneticButton>

                                    {/* Services Dropdown */}
                                    {link.hasDropdown && (
                                        <AnimatePresence>
                                            {servicesOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 pt-2 w-64"
                                                >
                                                    <div className="bg-background/95 backdrop-blur-xl border border-border shadow-xl">
                                                        {serviceItems.map((service, i) => (
                                                            <motion.div
                                                                key={service.path}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                            >
                                                                <Link
                                                                    href={service.path}
                                                                    className={`block px-5 py-4 group transition-colors border-b border-border/50 last:border-b-0 hover:bg-accent/10 ${pathname === service.path ? 'bg-accent/10' : ''
                                                                        }`}
                                                                >
                                                                    <span className={`block text-sm font-medium group-hover:text-accent transition-colors ${pathname === service.path ? 'text-accent' : ''
                                                                        }`}>
                                                                        {service.name}
                                                                    </span>
                                                                    <span className="block text-xs text-muted-foreground mt-0.5">
                                                                        {service.desc}
                                                                    </span>
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                        <div className="p-3 border-t border-border/50 bg-muted/30">
                                                            <Link
                                                                href="/services"
                                                                className="flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
                                                            >
                                                                View all services
                                                                <ArrowUpRight className="h-3 w-3" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            <ThemeToggle />
                            <MagneticButton strength={0.25}>
                                <Link
                                    href="/contact"
                                    data-cursor-text="Go"
                                    className="group inline-flex h-10 items-center gap-2 text-sm font-medium bg-foreground text-background px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                >
                                    Start a Project
                                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </Link>
                            </MagneticButton>
                        </div>

                        <div className="lg:hidden flex items-center gap-4">
                            <ThemeToggle />
                            <MagneticButton strength={0.18}>
                                <button
                                    className="relative z-50 p-2"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                                </button>
                            </MagneticButton>
                        </div>
                    </div>
                </ContainerLayout>
            </nav>
        </motion.header>
    )
}

export default DesktopNav