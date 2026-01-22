import { Plus, Edit, FileText, Calendar, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import { getPosts } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogDeleteButton } from "./_components/BlogDeleteButton"
import Image from "next/image"

export default async function BlogsPage() {
    const posts = await getPosts()

    return (
        <div className="space-y-6 container mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Blog Management</h1>
                    <p className="text-muted-foreground text-sm">Manage your blog posts, insights, and case studies.</p>
                </div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/admin/blogs/new">
                        <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length === 0 ? (
                    <Card className="col-span-full border-dashed border-2 bg-muted/30">
                        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                            <div className="p-4 bg-background rounded-full border shadow-sm">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="font-semibold text-lg">No posts found</h3>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    You haven't created any blog posts yet. Start by creating your first article.
                                </p>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/admin/blogs/new">
                                    <Plus className="mr-2 h-4 w-4" /> Create First Post
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    posts.map((post: any) => (
                        <Card key={post._id} className="group hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden">
                            <div className="aspect-video w-full bg-muted relative overflow-hidden">
                                {post.mainImage ? (
                                    <Image
                                        src={post.mainImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <FileText className="h-10 w-10 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {post.service && (
                                        <Badge variant="secondary" className="backdrop-blur-md bg-background/80 text-xs">
                                            {post.service.title}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {post.title}
                                        </CardTitle>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground pt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                                        </span>
                                        {post.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {post.location}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            By {post.author || 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4 flex-1">
                                {/* Excerpt could go here if available */}
                            </CardContent>
                            <CardFooter className="pt-2 border-t bg-muted/5 p-3">
                                <div className="flex items-center gap-2 w-full">
                                    <Button asChild variant="ghost" size="sm" className="flex-1 hover:bg-primary/10 hover:text-primary transition-colors">
                                        <Link href={`/admin/blogs/${post._id}`}>
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </Link>
                                    </Button>
                                    <div className="h-4 w-px bg-muted mx-1" />
                                    <BlogDeleteButton id={post._id} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
