import { getPostForView } from "@/app/actions/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Edit, Eye, Globe, MapPin, User, Tag, Layers } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BlogViewPageProps {
    params: Promise<{ id: string }>
}

export default async function BlogViewPage({ params }: BlogViewPageProps) {
    const { id } = await params
    const post = await getPostForView(id)

    if (!post) {
        notFound()
    }

    const isPublished = !post._id.startsWith('drafts.')

    return (
        <div className="space-y-6 container mx-auto pb-10 max-w-5xl">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <Button variant="ghost" size="sm" asChild className="shrink-0 p-0 sm:p-2 sm:h-9 sm:px-4">
                        <Link href="/admin/blogs">
                            <ArrowLeft className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                    </Button>
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-2xl sm:text-3xl font-bold truncate">{post.title?.en || "Untitled Post"}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant={isPublished ? "default" : "secondary"} className="text-xs">
                                {isPublished ? "Published" : "Draft"}
                            </Badge>
                            <span>{post._updatedAt && new Date(post._updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {post.slug && (
                        <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none h-9">
                            <Link href={`/en/blog/${post.slug}`} target="_blank">
                                <Eye className="h-4 w-4 mr-2" />
                                View Live
                            </Link>
                        </Button>
                    )}
                    <Button size="sm" asChild className="flex-1 sm:flex-none h-9">
                        <Link href={`/admin/blogs/edit/${post._id?.replace('drafts.', '')}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Content Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Hero Image */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {post.mainImageUrl ? (
                                <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted">
                                    <Image
                                        src={post.mainImageUrl}
                                        alt={post.title?.en || "Blog cover"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full aspect-video rounded-md bg-muted text-muted-foreground">
                                    No Image Set
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                {post.description?.en || "No description provided."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Body Preview (Optional - could just say "Content Configured") */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className={`h-2.5 w-2.5 rounded-full ${post.body?.en ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                <span className="font-medium">
                                    {post.body?.en ? "Content is configured" : "Content is empty"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Metadata Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Globe className="h-4 w-4" />
                                        <span className="text-sm font-medium">Slug</span>
                                    </div>
                                    <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono max-w-[150px] truncate" title={post.slug}>
                                        {post.slug || "Not generated"}
                                    </code>
                                </div>

                                <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span className="text-sm font-medium">Author</span>
                                    </div>
                                    <span className="text-sm">{post.author || "Unknown"}</span>
                                </div>

                                <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm font-medium">Published</span>
                                    </div>
                                    <span className="text-sm">
                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Layers className="h-4 w-4" />
                                        <span className="text-sm font-medium">Featured</span>
                                    </div>
                                    <Badge variant={post.featured ? "default" : "outline"}>
                                        {post.featured ? "Yes" : "No"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Categorization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                        <MapPin className="h-3.5 w-3.5" />
                                        Location
                                    </div>
                                    <p className="text-sm font-medium pl-5.5">{post.location || "Global"}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                        <Layers className="h-3.5 w-3.5" />
                                        Service Category
                                    </div>
                                    <p className="text-sm font-medium pl-5.5">{post.service?.title || "Uncategorized"}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                        <Tag className="h-3.5 w-3.5" />
                                        Tags
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        {post.categories && post.categories.length > 0 ? (
                                            post.categories.map((cat: string, i: number) => (
                                                <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                    {cat}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-sm text-muted-foreground italic">No tags selected</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
