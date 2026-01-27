import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProject, getProjectSlugs } from "@/helpers/portfolio.helpers"
import { PortfolioHero } from "@/components/portfolio/PortfolioHero"
import { CaseStudyResults } from "@/components/portfolio/CaseStudyResults"
import { BeforeAfter } from "@/components/portfolio/BeforeAfter"
import { ContainerLayout } from "@/components/layout"
import { SUPPORTED_LANGS } from "@/constants/lang"
import { Quote } from "lucide-react"

interface Props {
    params: Promise<{
        lang: string
        slug: string
    }>
}

// Generate static params for all projects
export async function generateStaticParams() {
    const slugs = await getProjectSlugs()

    return slugs.flatMap(({ slug }) =>
        SUPPORTED_LANGS.map((lang) => ({
            lang,
            slug,
        }))
    )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params
    const project = await getProject(lang, slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.mainImage?.url ? [project.mainImage.url] : [],
        },
    }
}

export default async function PortfolioDetailsPage({ params }: Props) {
    const { lang, slug } = await params
    const project = await getProject(lang, slug)

    if (!project) {
        notFound()
    }

    const { caseStudy } = project

    return (
        <div className="min-h-screen bg-background pb-32">
            <PortfolioHero
                title={project.title}
                category={project.category}
                mainImage={project.mainImage}
                lang={lang}
            />

            <ContainerLayout>
                <div className="max-w-4xl mx-auto space-y-24">
                    {/* Project Overview */}
                    <section className="pt-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2">
                                <h2 className="text-3xl font-display font-bold mb-6">The Challenge</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                {project.tags && Array.isArray(project.tags) && (
                                    <div className="flex flex-wrap gap-2 mt-8">
                                        {project.tags.map((tag: string) => (
                                            <span
                                                key={tag.trim()}
                                                className="px-4 py-1.5 text-xs font-medium uppercase tracking-widest bg-muted text-muted-foreground border border-border rounded-full hover:border-accent hover:text-accent transition-all duration-300 cursor-default"
                                            >
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="md:col-span-1 space-y-8">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Category</h3>
                                    <p className="font-medium">{caseStudy?.category || project.category}</p>
                                </div>
                                {caseStudy?.title && (
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Client</h3>
                                        <p className="font-medium">{caseStudy.title}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Results / Stats */}
                    {caseStudy?.results && (
                        <CaseStudyResults results={caseStudy.results} />
                    )}

                    {/* Before/After Section */}
                    {caseStudy?.beforeImage?.url && caseStudy?.afterImage?.url && (
                        <section>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-display font-bold mb-4">Transformation</h2>
                                <p className="text-muted-foreground">Witness the evolution of the brand through our strategic design process.</p>
                            </div>
                            <BeforeAfter
                                beforeImage={caseStudy.beforeImage}
                                afterImage={caseStudy.afterImage}
                            />
                        </section>
                    )}

                    {/* Testimonial */}
                    {caseStudy?.testimonial && (
                        <section className="relative py-24 px-8 md:px-16 bg-muted/30 rounded-3xl border border-border overflow-hidden">
                            <Quote className="absolute top-8 left-8 h-12 w-12 text-accent/10" />
                            <div className="relative z-10 text-center max-w-2xl mx-auto">
                                <p className="text-xl md:text-2xl font-display italic leading-relaxed mb-8">
                                    "{caseStudy.testimonial}"
                                </p>
                                <div className="flex items-center justify-center gap-4 text-accent">
                                    <div className="h-px w-8 bg-accent/30" />
                                    <span className="font-semibold uppercase tracking-widest text-sm">Client Testimonial</span>
                                    <div className="h-px w-8 bg-accent/30" />
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </ContainerLayout>
        </div>
    )
}
