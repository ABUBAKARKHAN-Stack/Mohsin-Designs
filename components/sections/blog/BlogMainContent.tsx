"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, User } from "lucide-react"
import { ContainerLayout } from "@/components/layout"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { uiT } from "@/i18n"

interface BlogPost {
    _id: string
    title: string
    slug: string
    description: string
    categories: string[]
    author: string
    date: string
    image: any
    readTime: number
    featured?: boolean
}

interface BlogMainContentProps {
    posts: BlogPost[]
}

export default function BlogMainContent({ posts }: BlogMainContentProps) {
    const [activeCategory, setActiveCategory] = useState("All")
    const { lang }: LanguageType = useParams()

    const categories = ["All", ...new Set(posts.flatMap(post => post.categories || []).filter(Boolean))]

    const filteredPosts = activeCategory === "All"
        ? posts
        : posts.filter(post => (post.categories || []).includes(activeCategory))

    const featuredPost = posts.find(p => p.featured) || posts[0]
    const remainingPosts = filteredPosts.filter(p => p._id !== featuredPost?._id)

    console.log(posts);
    

    return (
        <section className="pb-16">
            <ContainerLayout>
                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 text-sm uppercase tracking-widest border transition-all duration-300 ${activeCategory === category
                                ? "bg-accent text-accent-foreground border-accent"
                                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Post */}
                {featuredPost && activeCategory === "All" && (
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="group cursor-pointer mb-24"
                    >
                        <Link href={`/${lang}/blog/${featuredPost.slug}`} className="grid lg:grid-cols-2 gap-8 items-center">
                            <div className="aspect-16/10 overflow-hidden relative">
                                <img
                                    src={featuredPost.image?.url || (featuredPost.image ? urlFor(featuredPost.image).url() : '')}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover  group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute top-4 left-4 px-4 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-widest">
                                    Featured
                                </div>
                            </div>
                            <div className="lg:pl-8">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest mb-4">
                                    <span className="text-accent">{featuredPost.categories?.[0]}</span>
                                    <span>·</span>
                                    <span>{new Date(featuredPost.date).toLocaleDateString(lang, { month: 'short', year: 'numeric' })}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight group-hover:text-accent transition-colors mb-6">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                                    {featuredPost.description}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {featuredPost.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {featuredPost.readTime} {uiT(lang, "common.readTime")}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest group-hover:text-accent transition-colors">
                                        {uiT(lang, "common.readArticle")} <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                )}

                {/* Divider */}
                {featuredPost && activeCategory === "All" && (
                    <div className="border-t border-border mb-16" />
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(activeCategory === "All" ? remainingPosts : filteredPosts).map((post, i) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/${lang}/blog/${post.slug}`}>
                                <div className="aspect-16/12 overflow-hidden mb-6">
                                    <img
                                        src={post.image?.url || (post.image ? urlFor(post.image).url() : '')}
                                        alt={post.title}
                                        className="w-full h-full object-cover   group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                                    <span className="text-accent">{post.categories?.[0]}</span>
                                    <span>·</span>
                                    <span>{new Date(post.date).toLocaleDateString(
                                        lang,
                                        { month: 'short', year: 'numeric' }
                                    )}</span>
                                </div>
                                <h3 className="text-xl font-display font-bold tracking-tight group-hover:text-accent transition-colors mb-3 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime} {" "}
                                        {uiT(lang, "common.readTime")}
                                    </div>
                                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest group-hover:text-accent transition-colors">
                                        {uiT(lang, "common.readArticle")} <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-display font-semibold mb-2">No posts found</h3>
                        <p className="text-muted-foreground">Check back later for more content.</p>
                    </div>
                )}
            </ContainerLayout>
        </section>
    )
}
