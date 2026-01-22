"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { blogPostSchema, BlogPostValues } from "@/lib/validations/blog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, ArrowLeft, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createPost, updatePost } from "@/app/actions/blog"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { cn } from "@/lib/utils"

interface BlogFormProps {
    initialData?: any
    services: any[]
    categories: any[]
}

export function BlogForm({ initialData, services, categories }: BlogFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const isEditing = !!initialData?._id

    const form = useForm<BlogPostValues>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: initialData ? {
            title: initialData.title,
            slug: { current: initialData.slug },
            author: initialData.author,
            location: initialData.location || "",
            service: initialData.service || "",
            publishedAt: initialData.publishedAt || new Date().toISOString(),
            mainImage: initialData.mainImage,
            categories: initialData.categories || [],
            // Body omitted for now
        } : {
            title: "",
            slug: { current: "" },
            author: "",
            location: "",
            service: "", // Default empty string
            publishedAt: new Date().toISOString(),
            categories: [],
        }
    })

    // Auto-generate slug from title if not editing
    const title = form.watch("title")
    useEffect(() => {
        if (!isEditing && title) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            form.setValue("slug.current", slug)
        }
    }, [title, isEditing, form])

    async function onSubmit(values: BlogPostValues) {
        setIsLoading(true)
        try {
            const result = (isEditing
                ? await updatePost(initialData._id, values)
                : await createPost(values)) as any

            if (result.success) {
                successToast(`Post ${isEditing ? 'updated' : 'created'} successfully`)
                router.push('/admin/blogs')
                router.refresh()
            } else {
                errorToast(result.error || "Failed to save post")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link href="/admin/blogs">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">{isEditing ? `Edit: ${initialData.title}` : "Create New Post"}</h1>
                            <p className="text-muted-foreground text-xs">{isEditing ? "Update your blog post details." : "Compose a new insight or article."}</p>
                        </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="min-w-[140px]">
                        {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                        {isEditing ? "Update Post" : "Publish Post"}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Details</CardTitle>
                                <CardDescription>Main information about the post.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Post Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. The Future of Design" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug.current"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="auto-generated-slug" />
                                            </FormControl>
                                            <FormDescription>Unique URL identifier.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g. John Doe" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g. Abu Dhabi" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Featured Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="mainImage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label="Blog Header Image"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Categorization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="service"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Related Service</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a service" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {services.map((service) => (
                                                        <SelectItem key={service._id} value={service._id}>
                                                            {service.title}
                                                        </SelectItem>
                                                    ))}
                                                    <SelectItem value="none">None</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="categories"
                                    render={() => (
                                        <FormItem>
                                            <div className="mb-4">
                                                <FormLabel className="text-base">Categories</FormLabel>
                                                <FormDescription>
                                                    Select categories for this post.
                                                </FormDescription>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {categories.map((category) => (
                                                    <FormField
                                                        key={category._id}
                                                        control={form.control}
                                                        name="categories"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={category._id}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <input
                                                                            type="checkbox"
                                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                                            checked={Array.isArray(field.value) && field.value.includes(category._id)}
                                                                            onChange={(e) => {
                                                                                const checked = e.target.checked
                                                                                const current = Array.isArray(field.value) ? field.value : []

                                                                                return checked
                                                                                    ? field.onChange([...current, category._id])
                                                                                    : field.onChange(
                                                                                        current.filter(
                                                                                            (value) => value !== category._id
                                                                                        )
                                                                                    )
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                        {category.title}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="publishedAt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Publish Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    {...field}
                                                    value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                                                    onChange={(e) => {
                                                        const date = new Date(e.target.value)
                                                        field.onChange(date.toISOString())
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form >
        </Form >
    )
}
