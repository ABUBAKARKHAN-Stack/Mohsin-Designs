"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, ProjectValues } from "@/lib/validations/project"
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
import { useState, useTransition, useCallback, useEffect, useRef } from "react"
import { createProject, updateProject } from "@/app/actions/project"
import { saveProjectDraft } from "@/app/actions/projectDraftActions"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Save, ArrowLeft, Languages, Info, AlertCircle, Clock, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { debounce } from "lodash"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { Separator } from "@/components/ui/separator"

interface ProjectFormProps {
    initialData?: any
    projectId?: string
    isEdit?: boolean
}

export function ProjectForm({
    initialData,
    projectId,
    isEdit = false
}: ProjectFormProps) {
    const isPublished = initialData?._id && !initialData._id.startsWith('drafts.')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [selectedLang, setSelectedLang] = useState("en")
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [currentProjectId, setCurrentProjectId] = useState(projectId)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        initialData?._updatedAt ? new Date(initialData._updatedAt) : null
    )
    const [isInitialMount, setIsInitialMount] = useState(true)
    const isSubmittingRef = useRef(false)

    console.log(initialData);
    
    const form = useForm<ProjectValues>({
        resolver: zodResolver(projectSchema) as any,
        defaultValues: (initialData as ProjectValues) || {
            title: {},
            slug: { current: "" },
            description: {},
            tags: {},
            caseStudy: {
                title: {},
                testimonial: {},
                results: []
            }
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "caseStudy.results"
    })

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<ProjectValues>) => {
            if (isInitialMount || isSubmittingRef.current) return

            // For new projects, we only save if at least title is being filled
            if (!currentProjectId && !data.title?.en) return

            setIsSavingDraft(true)
            try {
                const result = await saveProjectDraft(currentProjectId, data)
                if (result.success) {
                    setLastSaved(new Date())
                    if (result.id && !currentProjectId) {
                        setCurrentProjectId(result.id)
                        // If we just got an ID, we should update the URL without refreshing to keep state
                        window.history.replaceState(null, '', `/admin/portfolio/edit/${result.id}`)
                    }
                }
            } catch (error) {
                console.error("Draft save failed:", error)
            } finally {
                setIsSavingDraft(false)
            }
        }, 2000),
        [isInitialMount, currentProjectId]
    )

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialMount(false), 500) // Shorter initial delay
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const subscription = form.watch((value) => {
            saveDraft(value as Partial<ProjectValues>)
        })
        return () => {
            subscription.unsubscribe()
            saveDraft.cancel()
        }
    }, [form, saveDraft])

    // Auto-save draft functionality


    function onSubmit(values: ProjectValues) {
        saveDraft.cancel()
        isSubmittingRef.current = true

        startTransition(async () => {
            try {
                const result = (isPublished || isEdit
                    ? await updateProject(projectId!, values)
                    : await createProject(values, currentProjectId)) as any

                if (result.success) {
                    successToast(`Project ${isPublished ? 'updated' : 'published'} successfully`)
                    router.push('/admin/portfolio')
                    router.refresh()
                } else {
                    errorToast(result.error || "Failed to save project")
                    isSubmittingRef.current = false
                }
            } catch (error) {
                errorToast("An unexpected error occurred")
                isSubmittingRef.current = false
            }
        })
    }

    const formErrors = form.formState.errors

    // Helper to check if a specific language has errors anywhere in the form
    const hasLangError = (langCode: string) => {
        const checkErrors = (obj: any): boolean => {
            if (!obj) return false
            if (obj.message && typeof obj.message === 'string') return false
            if (obj[langCode] && obj[langCode].message) return true
            return Object.values(obj).some(val => typeof val === 'object' && checkErrors(val))
        }
        return checkErrors(formErrors)
    }

    const currentLangHasError = hasLangError(selectedLang)

    // Helper to check if any field in a list has an error
    const hasTabError = (fieldNames: string[]) => {
        return fieldNames.some(name => {
            const parts = name.split('.')
            let current: any = formErrors
            for (const part of parts) {
                if (!current) return false
                current = current[part]
            }
            return !!current
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Sticky Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-40 bg-background/95 backdrop-blur-sm py-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link href="/admin/portfolio">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">
                                {isPublished ? `Edit Project` : (projectId ? "Edit Draft" : "Add Project")}
                            </h1>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground min-h-[20px]">
                                {isSavingDraft && (
                                    <span className="flex items-center gap-1 text-blue-600">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Saving...
                                    </span>
                                )}
                                {!isSavingDraft && lastSaved && (
                                    <span className="flex items-center gap-1 text-green-600 font-medium">
                                        <Clock className="h-3 w-3" />
                                        Draft Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        {currentLangHasError && (
                            <div className="flex items-center gap-2 text-destructive text-xs font-semibold px-3 py-1 bg-destructive/10 rounded-full border border-destructive/20 mr-2">
                                <AlertCircle className="h-3 w-3" />
                                <span>Fix {selectedLang.toUpperCase()} errors</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border mr-2">
                            <div className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground border-r pr-2 uppercase">
                                <Languages className="h-3.5 w-3.5" />
                                <span>Language</span>
                            </div>
                            <Select value={selectedLang} onValueChange={setSelectedLang}>
                                <SelectTrigger className="h-8 border-none bg-transparent shadow-none focus:ring-0 min-w-[140px] font-display">
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
                        <Button type="submit" disabled={isPending} className="min-w-[140px] h-9">
                            {isPending ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            {isPublished ? "Update Project" : "Publish Project"}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="mb-6 flex w-full h-auto flex-wrap gap-1 p-1 bg-muted/50 rounded-lg justify-start">
                        <TabsTrigger value="general" className="relative px-6 py-2">
                            General Details
                            {hasTabError(['title', 'description', 'slug', 'mainImage', 'tags']) && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="casestudy" className="relative px-6 py-2">
                            Case Study / Results
                            {hasTabError(['caseStudy']) && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Project Details</CardTitle>
                                        <CardDescription>Basic information for the project card.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <LocalizedInput
                                            control={form.control}
                                            name="title"
                                            label={<>Project Title <span className="text-destructive">*</span></>}
                                            activeLang={selectedLang}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="slug.current"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Slug <span className="text-destructive">*</span></FormLabel>
                                                    <FormControl>
                                                        <div className="flex gap-2">
                                                            <Input {...field} placeholder="auto-generated-slug" />
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
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <LocalizedInput
                                            control={form.control}
                                            name="category"
                                            label={<>Short Category <span className="text-destructive">*</span></>}
                                            activeLang={selectedLang}
                                            placeholder="e.g. Brand, Digital, UI/UX"
                                        />
                                        <LocalizedInput
                                            control={form.control}
                                            name="description"
                                            label={<>Description <span className="text-destructive">*</span></>}
                                            isTextarea
                                            activeLang={selectedLang}
                                        />
                                        <LocalizedInput
                                            control={form.control}
                                            name="tags"
                                            label={<>Tags (Comma separated) <span className="text-destructive">*</span></>}
                                            activeLang={selectedLang}
                                            placeholder="e.g. tech, design, ai"
                                        />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Featured Image</CardTitle>
                                        <CardDescription>Main image displayed in the portfolio list.</CardDescription>
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
                                                            label={<>Project Banner <span className="text-destructive">*</span></>}
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
                    </TabsContent>

                    <TabsContent value="casestudy" className="space-y-6">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-6">
                                <Card >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Info className="h-5 w-5" />
                                            Case Study Content
                                        </CardTitle>
                                        <CardDescription>Detailed results and testimonials for this project.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pt-6">
                                        <LocalizedInput
                                            control={form.control}
                                            name="caseStudy.title"
                                            label={<>Case Study Title <span className="text-destructive">*</span></>}
                                            activeLang={selectedLang}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="caseStudy.beforeImage"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <ImageUpload
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                label={<>Before Image <span className="text-destructive">*</span></>}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="caseStudy.afterImage"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <ImageUpload
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                label={<>After Image <span className="text-destructive">*</span></>}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <LocalizedInput
                                            control={form.control}
                                            name="caseStudy.testimonial"
                                            label={<>Client Testimonial <span className="text-destructive">*</span></>}
                                            isTextarea
                                            activeLang={selectedLang}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Results & Stats</CardTitle>
                                        <CardDescription>Quantitative achievements.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-sm font-semibold">Stats</FormLabel>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => append({ icon: "TrendingUp", value: {}, label: {} } as any)}
                                            >
                                                <Plus className="h-4 w-4 mr-2" /> Add Stat
                                            </Button>
                                        </div>
                                        <Separator />

                                        <div className="space-y-6">
                                            {fields.map((item, index) => (
                                                <div key={item.id} className="relative p-4 border rounded-lg bg-muted/30 space-y-4">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-destructive text-white hover:bg-destructive/90"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>

                                                    <div className="grid grid-cols-1 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`caseStudy.results.${index}.icon` as any}
                                                            render={({ field }) => (
                                                                <IconSelect field={field} type="benefit" label="Icon" />
                                                            )}
                                                        />
                                                        <LocalizedInput
                                                            control={form.control}
                                                            name={`caseStudy.results.${index}.value`}
                                                            label={<>Stat Value <span className="text-destructive">*</span></>}
                                                            activeLang={selectedLang}
                                                            compact
                                                            noBorder
                                                            placeholder="+340%"
                                                        />
                                                        <LocalizedInput
                                                            control={form.control}
                                                            name={`caseStudy.results.${index}.label`}
                                                            label={<>Stat Label <span className="text-destructive">*</span></>}
                                                            activeLang={selectedLang}
                                                            compact
                                                            noBorder
                                                            placeholder="Revenue Growth"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {fields.length === 0 && (
                                                <p className="text-xs text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                                                    No results added yet.
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </form>
        </Form>
    )
}

