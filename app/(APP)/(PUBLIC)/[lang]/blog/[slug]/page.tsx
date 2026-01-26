import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Clock, User, Share2 } from "lucide-react"
import { getBlogPost, getBlogSlugs } from "@/helpers/blog.helpers"
import { BlogContent } from "@/components/blog/BlogContent"
import { Button } from "@/components/ui/button"
import PageHero from "@/components/ui/page-hero"
import { ContainerLayout } from "@/components/layout"
import { SUPPORTED_LANGS } from "@/constants/lang"
import { uiT } from "@/i18n"

interface Props {
    params: Promise<{
        lang: string
        slug: string
    }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const slugs = await getBlogSlugs()

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
    const post = await getBlogPost(lang, slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: post.mainImage?.url ? [post.mainImage.url] : [],
            type: 'article',
            publishedTime: post.publishedAt,
        },
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { lang, slug } = await params

    const post = await getBlogPost(lang, slug)

    if (!post) {
        notFound()
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString(lang, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null

    return (
        <div className="min-h-screen bg-background pb-16">

            {/* Hero Section using PageHero */}
            <PageHero
                title={post.title}
                description={post.description}
                breadcrumbs={[
                    { label: "Blog", href: "/blog" },
                    { label: post.title }
                ]}
            />

            <ContainerLayout>

                {/* Meta Information Bar */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-12 py-6 border-t border-border">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-accent" />
                            <span className="font-medium">{post.author}</span>
                        </div>
                    )}
                    {formattedDate && (
                        <div className="flex items-center gap-2">
                            <span>{formattedDate}</span>
                        </div>
                    )}
                    {post.readTime && (
                        <div className="flex items-center gap-2 text-accent">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold uppercase tracking-wider">{post.readTime} {uiT(lang,"common.readTime")}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-16">
                    {/* Left side: Main Content */}
                    <div>
                        {/* Featured Image */}
                        {post.mainImage?.url && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-12 border border-border group">
                                <Image
                                    src={post.mainImage.url}
                                    alt={post.mainImage.altText || post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                />
                            </div>
                        )}

                        {/* Article Body */}
                        <BlogContent content={post.body} className="mb-16" />

                        {/* Tags Section */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="pt-8 border-t border-border flex flex-wrap gap-2 mb-12">
                                {post.tags.map((tag:string[], index:number) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 text-xs uppercase tracking-widest bg-muted text-muted-foreground border border-border rounded-sm hover:border-accent hover:text-accent transition-all cursor-default"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Share Section */}
                        <div className="flex items-center justify-between p-6 bg-muted/30 border border-border rounded-lg">
                            <div>
                                <h3 className="font-display font-bold text-lg">Did you enjoy this article?</h3>
                                <p className="text-muted-foreground text-sm">Share it with your network</p>
                            </div>
                            <Button variant="outline" size="sm" className="uppercase tracking-widest text-xs h-10 px-6 font-semibold border-border hover:border-accent hover:text-accent transition-all">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    )
}
