import React from "react"
import Image from "next/image"
import { ContainerLayout } from "@/components/layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"

interface PortfolioHeroProps {
    title: string
    category: string
    mainImage: {
        url: string
        alt?: string
    }
    lang: string
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({ title, category, mainImage, lang }) => {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden bg-background">
            <ContainerLayout>
                <div className="mb-8">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/${lang}/portfolio`}>Portfolio</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-full mb-6">
                            {category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
                            {title}
                        </h1>
                    </div>
                </div>

                <div className="mt-16 relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl">
                    <Image
                        src={mainImage.url}
                        alt={mainImage.alt || title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent" />
                </div>
            </ContainerLayout>
        </section>
    )
}
