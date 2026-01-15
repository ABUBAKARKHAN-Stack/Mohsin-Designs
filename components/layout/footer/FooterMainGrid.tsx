"use client"

import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { navLinks } from "@/constants/navlinks.constants";
import { socials } from "@/constants/social.constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useServices } from "@/context/ServiceContext";
import { useParams } from "next/navigation";
import { uiT } from "@/i18n";

const FooterMainGrid = () => {
    const { lightWeightServices } = useServices()
    const { lang }: LanguageType = useParams()
    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-12 mb-16">

            {/* Brand */}
            <div className="md:col-span-1">

                <Logo
                    className="h-16 w-auto mb-6"
                />
                <p className="text-sm text-muted-foreground leading-relaxed">
                    A creative design agency crafting memorable brands and digital experiences that drive results.
                </p>
            </div>

            {/* Navigation */}
            <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{uiT(lang, "common.navigation")}</h4>
                <ul className="space-y-4">
                    {[
                        ...navLinks,
                        { name: "FAQs", path: "/faq" },
                    ].map((item) => (
                        <li key={item.name}>
                            <Link
                                href={`/${lang}${item.path}`}
                                className="text-sm text-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                            >
                                {uiT(lang, `navigation.${item.name.toLowerCase().trim()}`)}
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Services */}
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

            {/* Contact */}
            <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{uiT(lang, "common.getInTouch")}</h4>
                <ul className="space-y-4">
                    <li>
                        <a href="mailto:hello@mohsindesigns.com" className="flex items-center gap-3 text-sm text-foreground/70 hover:text-accent transition-colors">
                            <Mail className="w-4 h-4" />
                            hello@mohsindesigns.com
                        </a>
                    </li>
                    <li>
                        <a href="tel:+15551234567" className="flex items-center gap-3 text-sm text-foreground/70 hover:text-accent transition-colors">
                            <Phone className="w-4 h-4" />
                            +1 (555) 123-4567
                        </a>
                    </li>
                    <li>
                        <span className="flex items-center gap-3 text-sm text-foreground/70">
                            <MapPin className="w-4 h-4" />
                            United States
                        </span>
                    </li>
                </ul>

                {/* Social */}
                <div className="flex gap-4 mt-8 ">
                    {socials.map((social) => {
                        const Icon = social.icon;
                        return (
                            <MagneticButton key={social.label} strength={0.2}>
                                <a
                                    href={social.href}
                                    aria-label={social.label}
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