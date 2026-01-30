"use client"

import { useCallback, useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceFormSchema, ServiceFormValues } from "@/lib/validations/service"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormInput } from "@/components/admin/form/FormInput"
import { SectionHeadingInput } from "@/components/admin/form/SectionHeadingInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ArrowLeft, Clock } from "lucide-react"
import { createService } from "@/app/actions/createService"
import { updateService } from "@/app/actions/updateService"
import { saveServiceDraft } from "@/app/actions/serviceDraftActions"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { slugify } from "@/lib/utils"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Spinner } from "@/components/ui/spinner"
import { CommaKeywordsInput } from "@/components/admin/form/CommaKeywordsInput"
import { SchemaListInput } from "@/components/admin/form/SchemaListInput"
import { debounce } from "lodash"


interface ServiceFormProps {
    initialData?: ServiceFormValues
    serviceId?: string
    hasDraft?: boolean
    draftUpdatedAt?: string | null
}

export function ServiceForm({ initialData, serviceId, draftUpdatedAt }: ServiceFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        draftUpdatedAt ? new Date(draftUpdatedAt) : null
    )
    const [isInitialMount, setIsInitialMount] = useState(true)
    const router = useRouter()

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceFormSchema) as any,
        defaultValues: initialData || {
            title: "",
            subtitle: "",
            description: "",
            slug: "",
            heroImageAlt: "",
            introTagLine: "",
            introTitle: "",
            introContent: "",
            roleTitle: "",
            roleContent: [""],
            howWeHelpSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            howWeHelpPoints: [{ _key: Math.random().toString(36).substring(2, 9), title: "", description: "" }],
            overviewSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            items: ["", ""],
            processSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            process: [{ _key: Math.random().toString(36).substring(2, 9), step: "01", title: "", desc: "" }],
            areasSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            areas: [{ _key: Math.random().toString(36).substring(2, 9), region: "", locations: [""], featured: false, clients: 0, flag: "" }],
            industriesSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            industries: [{ _key: Math.random().toString(36).substring(2, 9), name: "", description: "" }],
            benifitsSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            benefits: [""],
            whyChooseUsSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            whyChooseUsPoints: [{ _key: Math.random().toString(36).substring(2, 9), title: "", description: "" }],
            caseStudiesSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            caseStudies: [{ _key: Math.random().toString(36).substring(2, 9), title: "", problem: "", solution: "", result: "" }],
            faqsSection: { _key: Math.random().toString(36).substring(2, 9), title: "", description: "", eyebrow: "" },
            faqs: [{ _key: Math.random().toString(36).substring(2, 9), question: "", answer: "" }],
            seo: {
                metaTitle: "",
                metaDescription: "",
                focusKeyword: "",
                relatedKeywords: [],
                schemas: [""]
            }
        } as ServiceFormValues,
    })

    const formControl = form.control

    const saveDraft = useCallback(
        debounce(async (data: Partial<ServiceFormValues>) => {
            if (isInitialMount || !serviceId) return
            setIsSavingDraft(true)
            try {
                const result = await saveServiceDraft(serviceId, data)
                if (result.success) {
                    setLastSaved(new Date())
                }
            } catch (error) {
                console.error("Draft save failed:", error)
            } finally {
                setIsSavingDraft(false)
            }
        }, 2000),
        [isInitialMount, serviceId]
    )

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialMount(false), 1000)
        return () => clearTimeout(timer)
    }, [])


    useEffect(() => {
        const subscription = form.watch((value) => {
            saveDraft(value as Partial<ServiceFormValues>)
        })
        return () => subscription.unsubscribe()
    }, [form, saveDraft])

    const { fields: roleFields, append: appendRole, remove: removeRole } = useFieldArray({
        control: form.control,
        name: "roleContent" as any,
    })

    const { fields: helpFields, append: appendHelp, remove: removeHelp } = useFieldArray({
        control: form.control,
        name: "howWeHelpPoints" as any,
    })

    const { fields: itemFields, append: appendItem, remove: removeItem } = useFieldArray({
        control: form.control,
        name: "items" as any,
    })

    const { fields: processFields, append: appendProcess, remove: removeProcess } = useFieldArray({
        control: form.control,
        name: "process" as any,
    })

    const { fields: areaFields, append: appendArea, remove: removeArea } = useFieldArray({
        control: form.control,
        name: "areas" as any,
    })

    const { fields: industryFields, append: appendIndustry, remove: removeIndustry } = useFieldArray({
        control: form.control,
        name: "industries" as any,
    })

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control: form.control,
        name: "benefits" as any,
    })

    const { fields: whyChooseFields, append: appendWhyChoose, remove: removeWhyChoose } = useFieldArray({
        control: form.control,
        name: "whyChooseUsPoints" as any,
    })

    const { fields: caseStudyFields, append: appendCaseStudy, remove: removeCaseStudy } = useFieldArray({
        control: form.control,
        name: "caseStudies" as any,
    })

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control: form.control,
        name: "faqs" as any,
    })

    console.log(form.formState.errors);
    
    async function onSubmit(data: ServiceFormValues) {     
        
        setIsLoading(true)
        try {
            const result = serviceId
                ? await updateService(serviceId, data)
                : await createService(data)

            if (result.success) {
                successToast(serviceId ? "Service updated successfully!" : "Service created successfully!")
                setLastSaved(null)
                router.push("/admin/services")
            } else {
                errorToast(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error(error)
            errorToast("An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-30 py-2 sm:py-3 px-1 border-b gap-3">
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild className="h-9">
                                <Link href="/admin/services">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> <span className="sm:inline hidden">Back</span>
                                </Link>
                            </Button>
                            <div className="sm:hidden font-bold text-sm truncate max-w-[150px]">
                                {serviceId ? "Edit Service" : "New Service"}
                            </div>
                            <div className="hidden sm:flex flex-col">
                                <span className="font-bold text-lg leading-none">
                                    {serviceId ? "Edit Service" : "New Service"}
                                </span>
                                <div className="flex items-center gap-3 text-muted-foreground text-xs mt-1">
                                    {isSavingDraft && (
                                        <span className="flex items-center gap-1 text-blue-600">
                                            <Spinner className="h-3 w-3" />
                                            Saving...
                                        </span>
                                    )}
                                    {lastSaved && !isSavingDraft && (
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                            <Clock className="h-3 w-3" />
                                            Draft Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto h-9 min-w-[120px]">
                            {isLoading ? (
                                <><Spinner className="mr-2 h-4 w-4" /> Saving...</>
                            ) : (
                                serviceId ? "Update Service" : "Create Service"
                            )}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                    <div className="relative mb-6">
                        <TabsList className="flex w-full h-auto flex-wrap gap-1 p-1 bg-muted/50 rounded-lg justify-start">
                            <TabsTrigger value="general" className="px-4 py-2 text-xs sm:text-sm">General</TabsTrigger>
                            <TabsTrigger value="intro" className="px-4 py-2 text-xs sm:text-sm">Intro</TabsTrigger>
                            <TabsTrigger value="role" className="px-4 py-2 text-xs sm:text-sm">Role</TabsTrigger>
                            <TabsTrigger value="help" className="px-4 py-2 text-xs sm:text-sm">Help</TabsTrigger>
                            <TabsTrigger value="overview" className="px-4 py-2 text-xs sm:text-sm">Overview</TabsTrigger>
                            <TabsTrigger value="process" className="px-4 py-2 text-xs sm:text-sm">Process</TabsTrigger>
                            <TabsTrigger value="areas" className="px-4 py-2 text-xs sm:text-sm">Areas</TabsTrigger>
                            <TabsTrigger value="industries" className="px-4 py-2 text-xs sm:text-sm">Industries</TabsTrigger>
                            <TabsTrigger value="benefits" className="px-4 py-2 text-xs sm:text-sm">Benefits</TabsTrigger>
                            <TabsTrigger value="whyUs" className="px-4 py-2 text-xs sm:text-sm">Why Us</TabsTrigger>
                            <TabsTrigger value="caseStudies" className="px-4 py-2 text-xs sm:text-sm">Case Studies</TabsTrigger>
                            <TabsTrigger value="faqs" className="px-4 py-2 text-xs sm:text-sm">FAQs</TabsTrigger>
                            <TabsTrigger value="seo" className="px-4 py-2 text-xs sm:text-sm">SEO</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="general" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormInput control={formControl} name="title" label="Title" />
                                <FormInput control={formControl} name="subtitle" label="Subtitle" />
                                <FormInput control={formControl} name="description" label="Description" type="textarea" />

                                <div className="space-y-2">
                                    <FormField
                                        control={formControl}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Slug</FormLabel>
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <FormControl className="flex-1">
                                                        <Input {...field} value={field.value || ""}
                                                            placeholder="auto-generated" className="font-mono text-sm" />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full sm:w-auto"
                                                        onClick={() => {
                                                            const title = form.getValues("title")
                                                            if (title) {
                                                                const slug = slugify(title)
                                                                form.setValue("slug", slug)
                                                            }
                                                        }}
                                                    >
                                                        Generate
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <ImageUpload
                                    value={form.getValues('heroImage') as any}
                                    onChange={(asset) => {
                                        if (!asset) {
                                            form.setValue('heroImage', undefined)
                                            return
                                        }
                                        form.setValue('heroImage', {
                                            _type: 'image',
                                            asset: {
                                                _type: 'reference',
                                                _ref: asset._id || asset.id,
                                            },
                                            url: asset.url
                                        })
                                    }}
                                    label="Hero Image"
                                />

                                <FormInput control={formControl} name="heroImageAlt" label="Hero Image Alt Text" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="intro" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Intro Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormInput control={formControl} name="introTagLine" label="Intro Tag Line" />
                                <FormInput control={formControl} name="introTitle" label="Intro Title" />
                                <FormInput control={formControl} name="introContent" label="Intro Content" type="textarea" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="role" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Role Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormInput control={formControl} name="roleTitle" label="Role Title" />
                                <div className="space-y-4">
                                    <FormLabel>Role Content Points</FormLabel>
                                    {roleFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start">
                                            <div className="flex-1">
                                                <FormInput
                                                    control={formControl}
                                                    name={`roleContent.${index}`}
                                                    label={`Point ${index + 1}`}
                                                    isTextarea
                                                />
                                            </div>
                                            {roleFields.length > 1 && (
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeRole(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendRole({ _key: Math.random().toString(36).substring(2, 9) })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Role Content
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="help" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>How We Help Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="howWeHelpSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Help Points</FormLabel>
                                    {helpFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            {helpFields.length > 1 && (
                                                <div className="absolute right-2 top-2">
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeHelp(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                            <FormInput control={formControl} name={`howWeHelpPoints.${index}.title`} label="Title" />
                                            <FormInput control={formControl} name={`howWeHelpPoints.${index}.description`} label="Description" type="textarea" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendHelp({ _key: Math.random().toString(36).substring(2, 9), title: "", description: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Help Point
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="overviewSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Items</FormLabel>
                                    {itemFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start">
                                            <div className="flex-1">
                                                <FormInput
                                                    control={formControl}
                                                    name={`items.${index}`}
                                                    label={`Item ${index + 1}`}
                                                />
                                            </div>
                                            {itemFields.length > 1 && (
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeItem(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendItem({ _key: Math.random().toString(36).substring(2, 9) })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Item
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="process" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Process Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="processSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Process Steps</FormLabel>
                                    {processFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            {processFields.length > 1 && (
                                                <div className="absolute right-2 top-2">
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeProcess(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                            <FormField
                                                control={formControl}
                                                name={`process.${index}.step` as any}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Step Number</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} value={field.value || ""} placeholder="01" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormInput control={formControl} name={`process.${index}.title`} label="Title" />
                                            <FormInput control={formControl} name={`process.${index}.desc`} label="Description" type="textarea" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendProcess({ _key: Math.random().toString(36).substring(2, 9), step: `0${processFields.length + 1}`, title: "", desc: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Process Step
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="areas" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Areas Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="areasSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Areas</FormLabel>
                                    {areaFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            <div className="absolute right-2 top-2">
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeArea(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormInput control={formControl} name={`areas.${index}.region`} label="Region" />
                                            <div className="space-y-2">
                                                <FormLabel>Locations</FormLabel>
                                                <FormInput control={formControl} name={`areas.${index}.locations.0`} label="Location" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={formControl}
                                                    name={`areas.${index}.clients` as any}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Number of Clients</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" {...field} value={field.value ?? 0} placeholder="0" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={formControl}
                                                    name={`areas.${index}.flag` as any}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Flag Emoji</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} value={field.value || ""} placeholder="🇺🇸" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={formControl}
                                                name={`areas.${index}.featured` as any}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={!!field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>Featured Area</FormLabel>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendArea({ _key: Math.random().toString(36).substring(2, 9), region: "", locations: [{ _key: Math.random().toString(36).substring(2, 9) }], featured: false, clients: 0, flag: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Area
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="industries" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Industries Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="industriesSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Industries</FormLabel>
                                    {industryFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            <div className="absolute right-2 top-2">
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeIndustry(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormInput control={formControl} name={`industries.${index}.name`} label="Industry Name" />
                                            <FormInput control={formControl} name={`industries.${index}.description`} label="Description" type="textarea" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendIndustry({ _key: Math.random().toString(36).substring(2, 9), name: "", description: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Industry
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="benefits" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Benefits Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="benifitsSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Benefits</FormLabel>
                                    {benefitFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start">
                                            <div className="flex-1">
                                                <FormInput
                                                    control={formControl}
                                                    name={`benefits.${index}`}
                                                    label={`Benefit ${index + 1}`}
                                                />
                                            </div>
                                            {benefitFields.length > 1 && (
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeBenefit(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit({ _key: Math.random().toString(36).substring(2, 9) })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Benefit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="whyUs" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Why Choose Us Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="whyChooseUsSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Points</FormLabel>
                                    {whyChooseFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            {whyChooseFields.length > 1 && (
                                                <div className="absolute right-2 top-2">
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeWhyChoose(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                            <FormInput control={formControl} name={`whyChooseUsPoints.${index}.title`} label="Title" />
                                            <FormInput control={formControl} name={`whyChooseUsPoints.${index}.description`} label="Description" type="textarea" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendWhyChoose({ _key: Math.random().toString(36).substring(2, 9), title: "", description: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Why Us Point
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="caseStudies" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Case Studies Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="caseStudiesSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>Case Studies</FormLabel>
                                    {caseStudyFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            <div className="absolute right-2 top-2">
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeCaseStudy(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormInput control={formControl} name={`caseStudies.${index}.title`} label="Title" />
                                            <FormInput control={formControl} name={`caseStudies.${index}.problem`} label="Problem" type="textarea" />
                                            <FormInput control={formControl} name={`caseStudies.${index}.solution`} label="Solution" type="textarea" />
                                            <FormInput control={formControl} name={`caseStudies.${index}.result`} label="Result" type="textarea" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendCaseStudy({ _key: Math.random().toString(36).substring(2, 9), title: "", problem: "", solution: "", result: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Case Study
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="faqs" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>FAQs Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <SectionHeadingInput control={formControl} name="faqsSection" label="Section Heading" />
                                <div className="space-y-4 mt-6">
                                    <FormLabel>FAQs</FormLabel>
                                    {faqFields.map((field, index) => (
                                        <div key={field.id} className="border p-4 rounded-md space-y-4 relative">
                                            {faqFields.length > 1 && (
                                                <div className="absolute right-2 top-2">
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeFaq(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                            <FormInput control={formControl} name={`faqs.${index}.question`} label="Question" />
                                            <FormInput control={formControl} name={`faqs.${index}.answer`} label="Answer" type="textarea" />
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendFaq({ _key: Math.random().toString(36).substring(2, 9), question: "", answer: "" })}>
                                        <Plus className="mr-2 h-4 w-4" /> Add FAQ
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormInput control={formControl} name="seo.metaTitle" label="Meta Title" />
                                <FormInput control={formControl} name="seo.metaDescription" label="Meta Description" type="textarea" />
                                <FormInput control={formControl} name="seo.focusKeyword" label="Focus Keyword" />
                                <CommaKeywordsInput name="seo.relatedKeywords" label="Related Keywords" />
                                <SchemaListInput name="seo.schemas" label="JSON-LD Schemas" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </Form>
    )
}
