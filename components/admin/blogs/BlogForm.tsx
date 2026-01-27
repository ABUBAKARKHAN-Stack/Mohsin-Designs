"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { blogPostSchema, BlogPostValues } from "@/lib/validations/blog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useTransition, useCallback, useEffect, useRef } from "react"
import { createPost, updatePost } from "@/app/actions/blog"
import { saveBlogDraft } from "@/app/actions/blogDraftActions"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CustomPortableTextEditor } from "@/components/admin/form/PortableTextEditor"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { debounce } from "lodash"
import { ArrowLeft, Languages } from "lucide-react"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/form/ImageUpload"

interface BlogFormProps {
    initialData?: BlogPostValues & { _id?: string }
    services: { _id: string; title: string }[]
    categories: { _id: string; title: string }[]
    locations: { _id: string; title: string }[]
    blogId?: string
    hasDraft?: boolean
    draftUpdatedAt?: string | null
}

export function BlogForm({
    initialData,
    services,
    categories,
    locations,
    blogId,
    hasDraft,
    draftUpdatedAt
}: BlogFormProps) {
    const isPublished = initialData?._id && !initialData._id.startsWith('drafts.')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedLang, setSelectedLang] = useState("en")
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [currentBlogId] = useState(blogId)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        draftUpdatedAt ? new Date(draftUpdatedAt) : null
    )
    const [isInitialMount, setIsInitialMount] = useState(true)
    const isSubmittingRef = useRef(false)

    const form = useForm<BlogPostValues>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: initialData || {
            title: {},
            description: {},
            slug: { current: "" },
            publishedAt: new Date().toISOString(),
            featured: false,
            author: "Mohsin Ali",
            tags: {},
            categories: categories
                .filter(cat => cat.title?.toLowerCase() === 'all')
                .map(cat => cat._id),
            body: {},
            service: "none",
            location: "none"
        },
    })

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<BlogPostValues>) => {
            if (isInitialMount || !currentBlogId || isSubmittingRef.current) return
            setIsSavingDraft(true)
            try {
                const result = await saveBlogDraft(currentBlogId, data)
                if (result.success) {
                    setLastSaved(new Date())
                    // If this was a new post (no initial ID), update URL to preserve context
                    if (!initialData?._id && typeof window !== 'undefined') {
                        const newUrl = `/admin/blogs/edit/${currentBlogId}`
                        if (window.location.pathname !== newUrl) {
                            router.replace(newUrl, { scroll: false })
                        }
                    }
                }
            } catch (error) {
                console.error("Draft save failed:", error)
            } finally {
                setIsSavingDraft(false)
            }
        }, 2000),
        [isInitialMount, currentBlogId, initialData, router]
    )

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialMount(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const subscription = form.watch((value) => {
            saveDraft(value as Partial<BlogPostValues>)
        })
        return () => {
            subscription.unsubscribe()
            saveDraft.cancel()
        }
    }, [form, saveDraft])

    // Auto-generate slug from title if it's a new post and slug is empty
    const titleObj = form.watch("title") as any
    const title = titleObj?.en
    const currentSlug = form.watch("slug.current")
    useEffect(() => {
        if (!isPublished && title && !currentSlug) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            form.setValue("slug.current", slug)
        }
    }, [title, isPublished, form, currentSlug])

    function onSubmit(values: BlogPostValues) {
        // Cancel any pending draft saves immediately
        saveDraft.cancel()
        isSubmittingRef.current = true

        startTransition(async () => {
            try {
                // If it's published, we update. If it's a draft or new, we create (publish).
                const result = (isPublished
                    ? await updatePost(initialData!._id!, values)
                    : await createPost(values, currentBlogId)) as any

                if (result.success) {
                    successToast(`Post ${isPublished ? 'updated' : 'published'} successfully`)
                    router.push('/admin/blogs')
                    router.refresh()
                } else {
                    errorToast(result.error || "Failed to save post")
                    isSubmittingRef.current = false
                }
            } catch (error) {
                errorToast("An unexpected error occurred")
                isSubmittingRef.current = false
            }
        })
    }

    // Body editor state handled by form

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link href="/admin/blogs">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">{isPublished ? `Edit: ${initialData.title?.en || 'Untitled'}` : (initialData?._id ? "Edit Draft" : "Create New Post")}</h1>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground min-h-[20px]">
                                {isSavingDraft && (
                                    <span className="flex items-center gap-1 text-yellow-600">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Saving draft...
                                    </span>
                                )}
                                {!isSavingDraft && lastSaved && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <Save className="h-3 w-3" />
                                        Draft saved {lastSaved.toLocaleTimeString()}
                                    </span>
                                )}
                                {!isSavingDraft && !lastSaved && (
                                    <span>{isPublished ? "Update your blog post details." : "Compose a new insight or article."}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                            <div className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground border-r pr-2 shadow-sm">
                                <Languages className="h-3.5 w-3.5" />
                                <span>Language</span>
                            </div>
                            <Select value={selectedLang} onValueChange={setSelectedLang}>
                                <SelectTrigger className="h-8 border-none bg-transparent shadow-none focus:ring-0 min-w-[110px]">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent align="end">
                                    <SelectItem value="en">English (EN)</SelectItem>
                                    <SelectItem value="ur">Urdu (UR)</SelectItem>
                                    <SelectItem value="es">Spanish (ES)</SelectItem>
                                    <SelectItem value="ar">Arabic (AR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" disabled={isPending} className="min-w-[140px]">
                            {isPending ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            {isPublished ? "Update Post" : "Publish Post"}
                        </Button>
                    </div>
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
                                    render={({ field: _ }) => (
                                        <LocalizedInput
                                            control={form.control}
                                            name="title"
                                            label={<>Post Title <span className="text-destructive">*</span></>}
                                            activeLang={selectedLang}
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field: _ }) => (
                                        <LocalizedInput
                                            control={form.control}
                                            name="description"
                                            label={<>Short Description <span className="text-destructive">*</span></>}
                                            isTextarea
                                            activeLang={selectedLang}
                                            optional={false}
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug.current"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <Input {...field} value={field.value || ''} placeholder="auto-generated-slug" />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            const genSlug = (form.getValues("title") as any)?.en?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || ''
                                                            form.setValue("slug.current", genSlug)
                                                        }}
                                                    >
                                                        Regenerate
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormDescription>Unique URL identifier.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="readTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Read Time (min)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                                                        placeholder="e.g. 5"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author Name <span className="text-destructive">*</span></FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g. Mohsin Ali" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field: _ }) => (
                                        <LocalizedInput
                                            control={form.control}
                                            name="tags"
                                            label={<>Tags (Comma separated) <span className="text-destructive">*</span></>}
                                            activeLang={selectedLang}
                                            optional={false}
                                            placeholder="e.g. tech, design, ai"
                                        />
                                    )}
                                />
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
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className={cn(form.formState.errors.body && "text-destructive")}>Body Content <span className="text-destructive">*</span></CardTitle>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted py-1 px-3 rounded-md">
                                    <Languages className="h-4 w-4" />
                                    <span className="font-medium uppercase">{selectedLang}</span>
                                </div>
                            </CardHeader>
                            <CardContent className={cn("p-0", form.formState.errors.body && "border-2 border-destructive/20 rounded-b-lg")}>
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <CustomPortableTextEditor
                                                    key={selectedLang}
                                                    value={field.value?.[selectedLang as keyof typeof field.value] || []}
                                                    setValue={(newValue) => {
                                                        const currentBody = field.value || {};
                                                        field.onChange({
                                                            ...currentBody,
                                                            [selectedLang]: newValue
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                            <div className="p-4 pt-0">
                                                <FormMessage />
                                                {form.formState.errors.body && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {Object.keys(form.formState.errors.body).filter(k => k !== selectedLang && k !== 'root').map(lang => (
                                                            <span key={lang} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 uppercase">
                                                                Missing: {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
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
                            <CardContent className="p-1">
                                <Accordion type="single" collapsible defaultValue="categorization" className="w-full">
                                    <AccordionItem value="categorization" className="border-b-0">
                                        <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-lg">Categorization</AccordionTrigger>
                                        <AccordionContent className="px-4 py-2 space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="service"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Related Service</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value || "none"}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a service" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="none">None</SelectItem>
                                                                {services.map((service) => (
                                                                    <SelectItem key={service._id} value={service._id}>
                                                                        {service.title}
                                                                    </SelectItem>
                                                                ))}
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
                                                        <div className="flex items-center justify-between">
                                                            <FormLabel className="text-base">Categories</FormLabel>
                                                            {categories.length === 0 && (
                                                                <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                                                                    <Link href="/admin/blogs/categories">
                                                                        + Add Category
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                        </div>
                                                        {categories.length === 0 ? (
                                                            <div className="text-sm text-muted-foreground italic py-2">
                                                                No categories found. Please add some first.
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                                {categories.map((category) => (
                                                                    <FormField
                                                                        key={category._id}
                                                                        control={form.control}
                                                                        name="categories"
                                                                        render={({ field }) => (
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
                                                                                <FormLabel className="font-normal cursor-pointer text-sm">
                                                                                    {category.title}
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="location" className="border-b-0">
                                        <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-lg">Location</AccordionTrigger>
                                        <AccordionContent className="px-4 py-2">
                                            <FormField
                                                control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} value={field.value || "none"}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Location" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="none">None</SelectItem>
                                                                {locations.map((loc) => (
                                                                    <SelectItem key={loc._id} value={loc._id}>
                                                                        {loc.title}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="publishing" className="border-b-0">
                                        <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-lg">Publishing</AccordionTrigger>
                                        <AccordionContent className="px-4 py-2 space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="featured"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-none">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-sm">Featured Post</FormLabel>
                                                            <FormDescription className="text-xs">
                                                                Pin to the top of the blog page.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
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
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form >
        </Form >
    )
}
