"use client"

import { ArrowUpRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { navLinks } from "@/constants/navlinks.constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useServices } from "@/context/ServiceContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { useParams } from "next/navigation";
import { uiT } from "@/i18n";

const FooterMainGrid = () => {
    const { lightWeightServices } = useServices()
    const { lang }: LanguageType = useParams()
    const { settings } = useSiteSettings()

    // Helper to resolve dynamic URLs
    const resolveUrl = (item: any) => {
        if (item.type === 'custom') return item.url || '#';
        if (item.type === 'reference' && item.reference) {
            if (item.reference._type === 'service') return `/${lang}/services/${item.reference.slug}`;
            return `/${lang}/${item.reference.slug}`;
        }
        return '#';
    };

    const footerNavItems = settings?.footerMenu?.items || [
        ...navLinks,
        { name: "FAQs", path: "/faq" },
    ].map(item => ({
        label: (item as any).name ? uiT(lang, `navigation.${(item as any).name.toLowerCase().trim()}`) : (item as any).label,
        url: (item as any).path ? `/${lang}${(item as any).path}` : resolveUrl(item),
        type: 'custom'
    }))

    const socialPlatforms = [
        { label: "Facebook", key: "facebook" as const, icon: Facebook },
        { label: "Twitter", key: "twitter" as const, icon: Twitter },
        { label: "LinkedIn", key: "linkedin" as const, icon: Linkedin },
        { label: "Instagram", key: "instagram" as const, icon: Instagram },
    ];

    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-12 mb-16">

            {/* Brand */}
            <div className="md:col-span-1">

                <Logo
                    className="h-16 w-auto mb-6"
                />
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {settings?.footerText || "A creative design agency crafting memorable brands and digital experiences that drive results."}
                </p>
            </div>

            {/* Navigation */}
            {/* Dynamic Footer Menu Columns */}
            {(settings?.footerMenu?.items && settings.footerMenu.items.length > 0) ? (
                settings.footerMenu.items.map((column: any, colIndex: number) => (
                    <div key={column._key || colIndex}>
                        <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                            {column.label || "Menu"}
                        </h4>
                        <ul className="space-y-4">
                            {column.children?.map((item: any, index: number) => {
                                const href = item.url || resolveUrl(item);
                                const label = item.label || item.title;
                                return (
                                    <li key={item._key || index}>
                                        <Link
                                            href={href}
                                            className="text-sm text-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                                        >
                                            {label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))
            ) : (
                /* Fallback for when no Footer Menu is defined */
                <>
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{uiT(lang, "common.navigation")}</h4>
                        <ul className="space-y-4">
                            {footerNavItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={(item as any).url}
                                        className="text-sm text-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{uiT(lang, "common.services")}</h4>
                        <ul className="space-y-4">
                            {lightWeightServices.map((item) => (
                                <li key={item.slug}>
                                    <Link
                                        href={`/${lang}/services/${item.slug}`}
                                        className="text-sm text-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                                    >
                                        {item.title}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Contact */}
            <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{uiT(lang, "common.getInTouch")}</h4>
                <ul className="space-y-4">
                    <li>
                        <a href={`mailto:${settings?.contact.email || "hello@mohsindesigns.com"}`} className="flex items-center gap-3 text-sm text-foreground/70 hover:text-accent transition-colors">
                            <Mail className="w-4 h-4" />
                            {settings?.contact.email || "hello@mohsindesigns.com"}
                        </a>
                    </li>
                    <li>
                        <a href={`tel:${settings?.contact.phone || "+15551234567"}`} className="flex items-center gap-3 text-sm text-foreground/70 hover:text-accent transition-colors">
                            <Phone className="w-4 h-4" />
                            {settings?.contact.phone || "+1 (555) 123-4567"}
                        </a>
                    </li>
                    <li>
                        <span className="flex items-center gap-3 text-sm text-foreground/70">
                            <MapPin className="w-4 h-4" />
                            {settings?.contact.address || "United States"}
                        </span>
                    </li>
                </ul>

                {/* Social */}
                <div className="flex gap-4 mt-8 ">
                    {socialPlatforms.map((platform) => {
                        const Icon = platform.icon;
                        const href = settings?.social?.[platform.key];

                        if (!href) return null;

                        return (
                            <MagneticButton key={platform.key} strength={0.2}>
                                <a
                                    href={href}
                                    aria-label={platform.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "group relative size-10 flex items-center justify-center overflow-hidden",
                                        "border border-border text-xs font-medium transition-colors",
                                        "hover:text-accent-foreground"
                                    )}
                                >
                                    <Icon className="size-5 z-10" />

                                    <span
                                        className={cn(
                                            "absolute inset-0 z-0 bg-accent",
                                            "translate-y-full group-hover:translate-y-0",
                                            "transition-transform duration-300 ease-out"
                                        )}
                                    />
                                </a>
                            </MagneticButton>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default FooterMainGrid