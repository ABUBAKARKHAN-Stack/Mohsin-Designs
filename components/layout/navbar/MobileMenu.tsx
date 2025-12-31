import MagneticButton from '@/components/MagneticButton';
import { APP_NAME } from '@/constants/app.constants';
import { contactInfo } from '@/constants/contact-and-help.constants';
import { navLinks } from '@/constants/navlinks.constants';
import { serviceItems } from '@/constants/services.constants';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import logo from "@/assets/logo.webp";
import ThemeToggle from '@/components/ui/theme-toggle';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
                    animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
                    exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-50 bg-foreground flex flex-col justify-between items-center overflow-y-auto py-24 px-8 gap-y-10"
                >
                    {/* Top Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-between items-center w-full text-background/50 text-xs sm:text-sm tracking-[0.2em]"
                    >
                        <MagneticButton strength={0.2}>
                            <Link href="/" className="relative z-50">
                                <motion.img
                                    src={"/assets/logo.webp"}
                                    alt={APP_NAME}
                                    className="h-16 sm:h-20 w-auto object-contain "
                                    whileHover={{ scale: 1.05 }}
                                />
                            </Link>
                        </MagneticButton>

                        <div className="flex items-center gap-4">
                            <ThemeToggle className="border-background/20 hover:border-accent" />
                            <MagneticButton strength={0.18}>
                                <button
                                    className="relative z-50 p-2 bg-muted text-muted-foreground"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="size-6" />
                                </button>
                            </MagneticButton>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <nav className="flex flex-col items-center gap-6">
                        {navLinks.map((link, i) => (
                            <div key={link.path} className="text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                >
                                    <Link
                                        href={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="
                                            font-display
                                            font-bold
                                            tracking-tight
                                            leading-[1.05]
                                            text-[2.75rem]
                                            sm:text-5xl
                                            md:text-6xl
                                            lg:text-7xl
                                            text-background
                                            hover:text-accent
                                            transition-colors
                                        "
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>

                                {/* Mobile service sub-links */}
                                {link.hasDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 + i * 0.08 }}
                                        className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm mt-4"
                                    >
                                        {serviceItems.map(service => (
                                            <Link
                                                key={service.path}
                                                href={service.path}
                                                onClick={() => setIsOpen(false)}
                                                className="
                                                    text-xs
                                                    sm:text-sm
                                                    tracking-wide
                                                    text-background/60
                                                    hover:text-accent
                                                    transition-colors
                                                "
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        ))}

                        {/* Contact CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + navLinks.length * 0.08 }}
                        >
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="
                                    font-display
                                    font-bold
                                    tracking-tight
                                    leading-[1.05]
                                    text-[2.5rem]
                                    sm:text-5xl
                                    md:text-6xl
                                    lg:text-7xl
                                    text-background
                                    hover:text-accent
                                    transition-colors
                                "
                            >
                                Contact
                            </Link>
                        </motion.div>
                    </nav>

                    {/* Footer */}
                    <motion.a
                        href={`mailto:${contactInfo.mail}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="
                            text-background/50
                            text-[10px]
                            sm:text-xs
                            tracking-[0.25em]
                            uppercase
                               hover:text-accent/50
                                    transition-colors
                        "
                    >
                        {contactInfo.mail}
                    </motion.a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
