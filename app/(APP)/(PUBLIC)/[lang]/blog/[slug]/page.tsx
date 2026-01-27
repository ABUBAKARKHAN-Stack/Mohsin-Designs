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
import { ShareButtons } from "@/components/blog/ShareButtons"
import { Badge } from "@/components/ui/badge"

interface Props {
    params: Promise<{
        lang: string;
        slug: string;
    }>;
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
                <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-muted-foreground mb-12 py-6 border-y border-border/50 bg-muted/5 px-6 rounded-lg">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-accent/70" />
                            <span className="font-medium text-foreground/80">{post.author}</span>
                        </div>
                    )}
                    {formattedDate && (
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-border rounded-full hidden md:block" />
                            <span>{formattedDate}</span>
                        </div>
                    )}
                    {post.readTime && (
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-border rounded-full hidden md:block" />
                            <div className="flex items-center gap-2 text-accent/80">
                                <Clock className="h-4 w-4" />
                                <span className="font-semibold uppercase tracking-wider text-[10px]">{post.readTime} {uiT(lang, "common.readTime")}</span>
                            </div>
                        </div>
                    )}

                    {post.categories && post.categories.length > 0 && (
                        <>
                            <span className="w-1.5 h-6 bg-border/40 mx-2 hidden lg:block" />
                            <div className="flex flex-wrap gap-2">
                                {post.categories.map((category: string) => (
                                    <Badge
                                        key={category}
                                        variant="secondary"
                                        className="bg-accent/5 text-accent border-accent/20 hover:bg-accent/10 transition-colors uppercase tracking-wider text-[9px] px-3 py-1 font-bold"
                                    >
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </>
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
                                {post.tags.map((tag: string, index: number) => (
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
                        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-accent/3 border border-accent/10 rounded-2xl gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 bg-accent/10 rounded-full hidden md:block">
                                    <Share2 className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl mb-1">Spread the word!</h3>
                                    <p className="text-muted-foreground text-sm">Did you find this insightful? Share it with your network.</p>
                                </div>
                            </div>
                            <ShareButtons title={post.title} />
                        </div>
                    </div>
                </div>
            </ContainerLayout>
        </div>
    )
}
