"use client"

import MagneticButton from '@/components/MagneticButton';
import { APP_NAME } from '@/constants/app.constants';
import { contactInfo } from '@/constants/contact-and-help.constants';
import { navLinks } from '@/constants/navlinks.constants';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import ThemeToggle from '@/components/ui/theme-toggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useParams } from 'next/navigation';
import { uiT } from '@/i18n';
import { useServices } from '@/context/ServiceContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
    const { lang }: LanguageType = useParams();
    const { lightWeightServices } = useServices()
    const { settings } = useSiteSettings()

    //* Helper to resolve dynamic URLs
    const resolveUrl = (item: any) => {
        if (item.type === 'custom') return item.url || '#';
        if (item.type === 'reference' && item.reference) {
            if (item.reference._type === 'service') return `/${lang}/services/${item.reference.slug}`;
            return `/${lang}/${item.reference.slug}`;
        }
        return '#';
    };

    const menuItems = settings?.headerMenu?.items || navLinks.map(link => ({
        label: uiT(lang, `navigation.${link.name.toLowerCase().trim()}`),
        url: `/${lang}${link.path}`,
        type: 'custom',
        children: link.hasDropdown ? lightWeightServices.map(s => ({
            label: s.title,
            url: `/${lang}/services/${s.slug}`,
            type: 'custom'
        })) : []
    })) as any[]

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
                            <Link href={`/${lang}`} className="relative z-50">
                                <motion.img
                                    src={"/assets/logo.webp"}
                                    alt={APP_NAME}
                                    className="h-16 sm:h-20 w-auto object-contain dark:invert invert-0 "
                                    whileHover={{ scale: 1.05 }}
                                />
                            </Link>
                        </MagneticButton>

                        <div className="flex items-center gap-4">
                            <ThemeToggle className="border-background/20
                             hover:dark:bg-[#000ba3]/10 hover:bg-[#ffd11a]/10 dark:hover:border-[#000ba3] hover:border-[#ffd11a] " />
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
                    <LanguageSwitcher
                        currentLang={lang}
                        className="hover:dark:bg-[#000ba3] hover:bg-[#ffd11a] dark:hover:border-[#000ba3] hover:border-[#ffd11a] hover:text-foreground"
                    />

                    {/* Navigation */}
                    <nav className="flex flex-col items-center gap-6">
                        {menuItems.map((item, i) => {
                            const path = item.type === 'custom' && item.url?.startsWith('/') ? item.url : resolveUrl(item)
                            const hasChildren = item.children && item.children.length > 0

                            return (
                                <div key={i} className="text-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.08 }}
                                    >
                                        <Link
                                            href={path}
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
                                                transition-colors
                                                hover:dark:text-[#000ba3]
                                                hover:text-[#ffd11a]
                                            "
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>

                                    {/* Mobile service sub-links */}
                                    {hasChildren && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 + i * 0.08 }}
                                            className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm mt-4"
                                        >
                                            {item.children.map((child: any, j: number) => (
                                                <Link
                                                    key={j}
                                                    href={resolveUrl(child)}
                                                    onClick={() => setIsOpen(false)}
                                                    className="
                                                        flex
                                                        flex-col
                                                        items-center
                                                        text-center
                                                        gap-1
                                                    "
                                                >
                                                    <span className="
                                                        text-xs
                                                        sm:text-sm
                                                        tracking-wide
                                                        text-background/60   
                                                        transition-colors
                                                        hover:dark:text-[#000ba3]
                                                        hover:text-[#ffd11a]
                                                    ">
                                                        {child.label}
                                                    </span>
                                                    {child.description && (
                                                        <span className="text-[10px] text-background/40">
                                                            {child.description}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            )
                        })}

                        {/* Contact CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + navLinks.length * 0.08 }}
                        >
                            <Link
                                href={`/${lang}/contact`}
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
                                    transition-colors
                                    hover:dark:text-[#000ba3]
                                    hover:text-[#ffd11a]
                                "
                            >
                                {uiT(lang, 'common.startProject')}
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
                            transition-colors
                            hover:dark:text-[#000ba3]
                            hover:text-[#ffd11a]
                        "
                    >
                        {settings?.contact.email || contactInfo.mail}
                    </motion.a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
