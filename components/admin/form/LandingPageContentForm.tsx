"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { landingPageContentSchema, LandingPageContentValues } from "@/lib/validations/landing-page-content"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { BulkImageUpload } from "@/components/admin/form/BulkImageUpload"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateLandingPageContent, saveLandingPageDraft, discardLandingPageDraft } from "@/app/actions/landingPageContent"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, Clock, X } from "lucide-react"
import { debounce } from "lodash"

interface LandingPageContentFormProps {
    initialData?: any
    hasDraft?: boolean
    draftUpdatedAt?: string | null
}

export function LandingPageContentForm({ initialData, hasDraft, draftUpdatedAt }: LandingPageContentFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        draftUpdatedAt ? new Date(draftUpdatedAt) : null
    )
    const [isInitialMount, setIsInitialMount] = useState(true)

    const form = useForm<LandingPageContentValues>({
        resolver: zodResolver(landingPageContentSchema),
        mode: "onChange",
        defaultValues: initialData ? mergeWithDefaults(initialData) : getDefaultValues(),
    })

    console.log(form.formState.errors);


    const formControl = form.control as any

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<LandingPageContentValues>) => {
            // Don't save on initial mount
            if (isInitialMount) return

            setIsSavingDraft(true)
            try {
                const result = await saveLandingPageDraft(data)
                if (result.success) {
                    setLastSaved(new Date())
                }
            } catch (error) {
                console.error("Draft save failed:", error)
            } finally {
                setIsSavingDraft(false)
            }
        }, 2000),
        [isInitialMount]
    )

    // Mark as not initial mount after first render
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialMount(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // Watch form changes and auto-save
    useEffect(() => {
        const subscription = form.watch((value) => {
            saveDraft(value as Partial<LandingPageContentValues>)
        })
        return () => subscription.unsubscribe()
    }, [form, saveDraft])

    // Field arrays for Hero section
    const { fields: headingLineFields, append: appendHeadingLine, remove: removeHeadingLine } = useFieldArray({
        control: formControl,
        name: "hero.headingLines",
    })

    const { fields: paragraphFields, append: appendParagraph, remove: removeParagraph } = useFieldArray({
        control: formControl,
        name: "hero.descriptionParagraphs",
    })

    const { fields: ctaButtonFields, append: appendCtaButton, remove: removeCtaButton } = useFieldArray({
        control: formControl,
        name: "hero.ctaButtons",
    })


    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control: formControl,
        name: "whyChooseUs.benefits",
    })

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control: formControl,
        name: "faqs.faqItems",
    })

    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control: formControl,
        name: "serviceHighlightsMarquee.highlights",
    })



    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control: formControl,
        name: "ourApproach.steps",
    })

    const { fields: areaFields, append: appendArea, remove: removeArea } = useFieldArray({
        control: formControl,
        name: "areasWeServe.areas",
    })

    const { fields: industryFields, append: appendIndustry, remove: removeIndustry } = useFieldArray({
        control: formControl,
        name: "industriesWeServe.industries",
    })

    const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
        control: formControl,
        name: "testimonials.testimonials",
    })

    const { fields: agencyStructureFields, append: appendAgencyTeam, remove: removeAgencyTeam } = useFieldArray({
        control: formControl,
        name: "leadership.agencyStructure",
    })

    async function onSubmit(values: LandingPageContentValues) {
        setIsLoading(true)
        try {
            const result = await updateLandingPageContent(values)
            if (result.success) {
                successToast("Landing page content published successfully")
                await discardLandingPageDraft()
                setLastSaved(null)
            } else {
                errorToast(result.error || "Failed to update content")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDiscardDraft() {
        const result = await discardLandingPageDraft()
        if (result.success) {
            successToast("Draft discarded")
            setLastSaved(null)
            window.location.reload()
        } else {
            errorToast("Failed to discard draft")
        }
    }

    const formErrors = form.formState.errors
    const hasErrors = Object.keys(formErrors).length > 0

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
                    <div>
                        <h1 className="text-2xl font-bold">Landing Page Content</h1>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                            <p>Manage all 16 sections</p>
                            {isSavingDraft && (
                                <span className="flex items-center gap-1 text-blue-600">
                                    <Spinner className="h-3 w-3" />
                                    Saving...
                                </span>
                            )}
                            {lastSaved && !isSavingDraft && (
                                <span className="flex items-center gap-1 text-green-600">
                                    <Clock className="h-3 w-3" />
                                    Saved {lastSaved.toLocaleTimeString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {hasDraft && (
                            <Button type="button" variant="outline" size="sm" onClick={handleDiscardDraft}>
                                <X className="mr-2 h-4 w-4" /> Discard Draft
                            </Button>
                        )}
                        {hasErrors && (
                            <div className="flex items-center gap-2 text-destructive text-xs px-3 py-1 bg-destructive/10 rounded">
                                <AlertCircle className="h-3 w-3" />
                                <span>Fix errors to publish</span>
                            </div>
                        )}
                        <Button type="submit" disabled={isLoading || hasErrors}>
                            {isLoading ? <><Spinner className="mr-2 h-4 w-4" /> Publishing...</> : <><Save className="mr-2 h-4 w-4" /> Publish</>}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="hero" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 h-auto bg-transparent p-0 mb-6">
                        <TabsTrigger value="hero" className="relative">
                            Hero
                            {formErrors.hero && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="stats" className="relative">
                            Stats
                            {formErrors.stats && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="marquee" className="relative">
                            Marquee
                            {formErrors.serviceHighlightsMarquee && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="brands" className="relative">
                            Brands
                            {formErrors.trustedByBrands && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="about" className="relative">
                            About
                            {formErrors.aboutPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="approach" className="relative">
                            Approach
                            {formErrors.ourApproach && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="services" className="relative">
                            Services
                            {formErrors.servicesPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="whyUs" className="relative">
                            Why Us
                            {formErrors.whyChooseUs && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="portfolio" className="relative">
                            Portfolio
                            {formErrors.portfolioPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="cases" className="relative">
                            Cases
                            {formErrors.caseStudiesPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="areas" className="relative">
                            Areas
                            {formErrors.areasWeServe && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="industries" className="relative">
                            Industries
                            {formErrors.industriesWeServe && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="testimonials" className="relative">
                            Testimonials
                            {formErrors.testimonials && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="leadership" className="relative">
                            Leadership
                            {formErrors.leadership && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="blog" className="relative">
                            Blog
                            {formErrors.blogPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="faqs" className="relative">
                            FAQs
                            {formErrors.faqs && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                    </TabsList>

                    {/* HERO */}
                    <TabsContent value="hero">
                        <Card>
                            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="hero.badge" label="Badge Text" />

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Heading Lines (Max 3)</h3>
                                        <Button type="button" size="sm" variant="outline" onClick={() => appendHeadingLine({ text: { en: "", ur: "", es: "", ar: "" }, style: "normal" })} disabled={headingLineFields.length >= 3}>
                                            <Plus className="h-4 w-4 mr-2" /> Add
                                        </Button>
                                    </div>
                                    {headingLineFields.map((field, index) => (
                                        <div key={field.id} className="border rounded p-4 space-y-4">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Line {index + 1}</span>
                                                <Button type="button" size="sm" variant="destructive" onClick={() => removeHeadingLine(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <LocalizedInput control={formControl} name={`hero.headingLines.${index}.text`} label="Text" />
                                            <FormField control={formControl} name={`hero.headingLines.${index}.style`} render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Style</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="normal">Normal</SelectItem>
                                                            <SelectItem value="stroke">Stroke</SelectItem>
                                                            <SelectItem value="gradient">Gradient</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Description Paragraphs (Max 5)</h3>
                                        <Button type="button" size="sm" variant="outline" onClick={() => appendParagraph({ text: { en: "", ur: "", es: "", ar: "" } })} disabled={paragraphFields.length >= 5}>
                                            <Plus className="h-4 w-4 mr-2" /> Add
                                        </Button>
                                    </div>
                                    {paragraphFields.map((field, index) => (
                                        <div key={field.id} className="border rounded p-4 space-y-4">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Paragraph {index + 1}</span>
                                                <Button type="button" size="sm" variant="destructive" onClick={() => removeParagraph(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <LocalizedInput control={formControl} name={`hero.descriptionParagraphs.${index}.text`} label="Text" isTextarea />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">CTA Buttons (Exactly 2)</h3>
                                        <Button type="button" size="sm" variant="outline" onClick={() => appendCtaButton({ text: { en: "", ur: "", es: "", ar: "" }, url: { en: "", ur: "", es: "", ar: "" }, variant: "primary" })} disabled={ctaButtonFields.length >= 2}>
                                            <Plus className="h-4 w-4 mr-2" /> Add
                                        </Button>
                                    </div>
                                    {ctaButtonFields.map((field, index) => (
                                        <div key={field.id} className="border rounded p-4 space-y-4">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Button {index + 1}</span>
                                                <Button type="button" size="sm" variant="destructive" onClick={() => removeCtaButton(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <LocalizedInput control={formControl} name={`hero.ctaButtons.${index}.text`} label="Text" />
                                            <LocalizedInput control={formControl} name={`hero.ctaButtons.${index}.url`} label="URL" isUrl />
                                            <FormField control={formControl} name={`hero.ctaButtons.${index}.variant`} render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Variant</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="primary">Primary</SelectItem>
                                                            <SelectItem value="secondary">Secondary</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* STATS */}
                    <TabsContent value="stats">
                        <Card className="border-2 shadow-sm">
                            <CardHeader className="bg-muted/30 pb-4 border-b">
                                <CardTitle className="text-xl">Statistics Section</CardTitle>
                                <p className="text-sm text-muted-foreground">Manage the three core metrics displayed on your landing page.</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-8">
                                <StatItemCard control={formControl} name="stats.projectsDelivered" title="Projects Delivered" />
                                <StatItemCard control={formControl} name="stats.yearsExperience" title="Years Experience" />
                                <StatItemCard control={formControl} name="stats.clientSatisfaction" title="Client Satisfaction" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MARQUEE */}
                    <TabsContent value="marquee">
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Service Highlights Marquee</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendHighlight({ text: { en: "", ur: "", es: "", ar: "" } })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {highlightFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Highlight {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeHighlight(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`serviceHighlightsMarquee.highlights.${index}.text`} label="Text" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* BRANDS */}
                    <TabsContent value="brands" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="trustedByBrands.sectionHeading" title="Section Heading" />
                        <Card>
                            <CardHeader>
                                <CardTitle>Brand Logos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField control={formControl} name="trustedByBrands.brandLogos" render={({ field }) => (
                                    <BulkImageUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        label="Brand Logos"
                                    />
                                )} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ABOUT */}
                    <TabsContent value="about">
                        <SectionHeadingCard control={formControl} baseName="aboutPreview.sectionHeading" title="About Preview" />
                    </TabsContent>

                    {/* APPROACH */}
                    <TabsContent value="approach" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="ourApproach.sectionHeading" title="Our Approach" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Steps</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendStep({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {stepFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Step {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeStep(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`ourApproach.steps.${index}.title`} label="Title" />
                                        <LocalizedInput control={formControl} name={`ourApproach.steps.${index}.description`} label="Description" isTextarea />
                                        <FormField control={formControl} name={`ourApproach.steps.${index}.iconName`} render={({ field }) => (
                                            <IconSelect field={field} type="step" label="Icon" />
                                        )} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SERVICES */}
                    <TabsContent value="services" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="servicesPreview.sectionHeading" title="Services Preview" />
                        <Card>
                            <CardHeader><CardTitle>Services List</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Individual services are managed separately in the Services section and are automatically added dynamically to this section.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* WHY US */}
                    <TabsContent value="whyUs" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="whyChooseUs.sectionHeading" title="Why Choose Us" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Benefits</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendBenefit({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {benefitFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Benefit {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeBenefit(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`whyChooseUs.benefits.${index}.title`} label="Title" />
                                        <LocalizedInput control={formControl} name={`whyChooseUs.benefits.${index}.description`} label="Description" isTextarea />
                                        <FormField control={formControl} name={`whyChooseUs.benefits.${index}.iconName`} render={({ field }) => (
                                            <IconSelect field={field} type="benefit" label="Icon" />
                                        )} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PORTFOLIO */}
                    <TabsContent value="portfolio" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="portfolioPreview.sectionHeading" title="Portfolio Preview" />
                        <Card>
                            <CardHeader><CardTitle>Portfolio Projects</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Portfolio projects are managed separately and are automatically added dynamically as you create them.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CASES */}
                    <TabsContent value="cases" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="caseStudiesPreview.sectionHeading" title="Case Studies Preview" />
                        <Card>
                            <CardHeader><CardTitle>Case Studies</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Detailed case studies are managed separately and are automatically added dynamically to this section.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* AREAS */}
                    <TabsContent value="areas" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="areasWeServe.sectionHeading" title="Areas We Serve" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Regions</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendArea({
                                    region: { en: "", ur: "", es: "", ar: "" },
                                    locations: [{ en: "", ur: "", es: "", ar: "" }],
                                    featured: false,
                                    clients: 0,
                                    flag: ""
                                })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Region
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {areaFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Region {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeArea(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <LocalizedInput control={formControl} name={`areasWeServe.areas.${index}.region`} label="Region Name" />

                                        <FormField control={formControl} name={`areasWeServe.areas.${index}.flag`} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Flag Emoji</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="🇺🇸 🇬🇧 🇵🇰" maxLength={10} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <NestedLocationsField control={formControl} areaIndex={index} />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField control={formControl} name={`areasWeServe.areas.${index}.clients`} render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Number of Clients</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} min={0} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={formControl} name={`areasWeServe.areas.${index}.featured`} render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Featured</FormLabel>
                                                        <div className="text-sm text-muted-foreground">Mark as featured region</div>
                                                    </div>
                                                    <FormControl>
                                                        <input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4" />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* INDUSTRIES */}
                    <TabsContent value="industries" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="industriesWeServe.sectionHeading" title="Industries We Serve" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Industries</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendIndustry({ name: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {industryFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Industry {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeIndustry(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`industriesWeServe.industries.${index}.name`} label="Name" />
                                        <LocalizedInput control={formControl} name={`industriesWeServe.industries.${index}.description`} label="Description" isTextarea />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField control={formControl} name={`industriesWeServe.industries.${index}.iconName`} render={({ field }) => (
                                                <IconSelect field={field} type="industry" label="Icon" />
                                            )} />

                                            <FormField control={formControl} name={`industriesWeServe.industries.${index}.featured`} render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Featured</FormLabel>
                                                        <div className="text-sm text-muted-foreground">Mark as featured industry</div>
                                                    </div>
                                                    <FormControl>
                                                        <input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4" />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* TESTIMONIALS */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="testimonials.sectionHeading" title="Testimonials" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Testimonials</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendTestimonial({ quote: { en: "", ur: "", es: "", ar: "" }, author: { en: "", ur: "", es: "", ar: "" }, role: { en: "", ur: "", es: "", ar: "" }, company: { en: "", ur: "", es: "", ar: "" }, avatar: null })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {testimonialFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Testimonial {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeTestimonial(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.quote`} label="Quote" isTextarea />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.author`} label="Author" />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.role`} label="Role" />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.company`} label="Company" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LEADERSHIP */}
                    <TabsContent value="leadership" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="leadership.sectionHeading" title="Leadership" />

                        {/* Founder Info */}
                        <Card>
                            <CardHeader><CardTitle>Founder Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="leadership.founder.name" label="Name" />
                                <LocalizedInput control={formControl} name="leadership.founder.role" label="Role/Title" />

                                <div className="space-y-2">
                                    <FormLabel>Profile Image</FormLabel>
                                    <FormField control={formControl} name="leadership.founder.image" render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <ImageUpload value={field.value} onChange={field.onChange} label="" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <NestedSocialLinksField control={formControl} />
                            </CardContent>
                        </Card>

                        {/* Agency Structure */}
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Agency Structure</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendAgencyTeam({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "", featured: false })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Team
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {agencyStructureFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Team {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeAgencyTeam(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`leadership.agencyStructure.${index}.title`} label="Team Title" />
                                        <LocalizedInput control={formControl} name={`leadership.agencyStructure.${index}.description`} label="Description" />
                                        <FormField control={formControl} name={`leadership.agencyStructure.${index}.iconName`} render={({ field }) => (
                                            <IconSelect field={field} type="team" label="Icon" />
                                        )} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* BLOG */}
                    <TabsContent value="blog" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="blogPreview.sectionHeading" title="Blog Preview" />
                        <Card>
                            <CardHeader><CardTitle>Blog Content</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Blog posts are managed separately and will be displayed dynamically.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* FAQS */}
                    <TabsContent value="faqs" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="faqs.sectionHeading" title="FAQs" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>FAQ Items</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendFaq({ question: { en: "", ur: "", es: "", ar: "" }, answer: { en: "", ur: "", es: "", ar: "" } })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {faqFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">FAQ {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeFaq(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`faqs.faqItems.${index}.question`} label="Question" />
                                        <LocalizedInput control={formControl} name={`faqs.faqItems.${index}.answer`} label="Answer" isTextarea />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>FAQ Button</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="faqs.buttonText" label="Button Text" />
                                <LocalizedInput control={formControl} name="faqs.buttonUrl" label="Button URL" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </form>
        </Form>
    )
}

function NestedSocialLinksField({ control }: { control: any }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "leadership.founder.socialLinks",
    })

    // Get already selected platforms
    const selectedPlatforms = fields.map((field: any) => field.platform)

    return (
        <div className="space-y-3 border-l-2 border-primary/20 pl-4">
            <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Social Links</h4>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => append({ platform: "linkedin", url: "" })}
                    disabled={fields.length >= 3}
                >
                    <Plus className="h-3 w-3 mr-1" /> Add Link
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                        <FormField control={control} name={`leadership.founder.socialLinks.${index}.platform`} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Platform</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="linkedin" disabled={selectedPlatforms.includes("linkedin") && field.value !== "linkedin"}>
                                            LinkedIn
                                        </SelectItem>
                                        <SelectItem value="twitter" disabled={selectedPlatforms.includes("twitter") && field.value !== "twitter"}>
                                            Twitter
                                        </SelectItem>
                                        <SelectItem value="email" disabled={selectedPlatforms.includes("email") && field.value !== "email"}>
                                            Email
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={control} name={`leadership.founder.socialLinks.${index}.url`} render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="https://..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="mt-8"
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            ))}
        </div>
    )
}

function NestedLocationsField({ control, areaIndex }: { control: any; areaIndex: number }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `areasWeServe.areas.${areaIndex}.locations`,
    })

    return (
        <div className="space-y-3 border-l-2 border-primary/20 pl-4">
            <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Locations/Cities</h4>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => append({ en: "", ur: "", es: "", ar: "" })}
                >
                    <Plus className="h-3 w-3 mr-1" /> Add Location
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                    <div className="flex-1">
                        <LocalizedInput
                            control={control}
                            name={`areasWeServe.areas.${areaIndex}.locations.${index}`}
                            label={`Location ${index + 1}`}
                        />
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="mt-8"
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            ))}
        </div>
    )
}

function SectionHeadingCard({ control, baseName, title }: { control: any; baseName: string; title: string }) {
    return (
        <Card>
            <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <LocalizedInput control={control} name={`${baseName}.eyebrow`} label="Eyebrow" />
                <LocalizedInput control={control} name={`${baseName}.title`} label="Title" />
                <LocalizedInput control={control} name={`${baseName}.description`} label="Description" isTextarea />
            </CardContent>
        </Card>
    )
}

function StatItemCard({ control, name, title }: { control: any; name: string; title: string }) {
    return (
        <div className="space-y-4 pb-8 last:pb-0 border-b last:border-0 border-border/40">
            <h4 className="font-semibold text-base text-muted-foreground uppercase tracking-wider">{title}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                    <LocalizedInput
                        control={control}
                        name={`${name}.value`}
                        label="Metric Value"
                        noBorder
                        compact
                    />
                    <FormField
                        control={control}
                        name={`${name}.suffix`}
                        render={({ field }) => (
                            <FormItem className="pb-1">
                                <FormLabel className=" font-medium text-muted-foreground">Suffix</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., +, %, K" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="lg:col-span-7">
                    <LocalizedInput
                        control={control}
                        name={`${name}.label`}
                        label="Display Label"
                        noBorder
                        compact
                    />
                </div>
            </div>
        </div>
    )
}

function getDefaultValues(): LandingPageContentValues {
    return {
        hero: { badge: { en: "", ur: "", es: "", ar: "" }, headingLines: [], descriptionParagraphs: [], ctaButtons: [] },
        servicesPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        portfolioPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        aboutPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        stats: {
            projectsDelivered: { value: { en: "", ur: "", es: "", ar: "" }, label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
            yearsExperience: { value: { en: "", ur: "", es: "", ar: "" }, label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
            clientSatisfaction: { value: { en: "", ur: "", es: "", ar: "" }, label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
        },
        whyChooseUs: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, benefits: [] },
        blogPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        faqs: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, faqItems: [] },
        serviceHighlightsMarquee: { highlights: [] },
        trustedByBrands: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, brandLogos: [] },
        ourApproach: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, steps: [] },
        caseStudiesPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        areasWeServe: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, areas: [] },
        industriesWeServe: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, industries: [] },
        testimonials: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, testimonials: [] },
        leadership: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } }, founder: { name: { en: "", ur: "", es: "", ar: "" }, role: { en: "", ur: "", es: "", ar: "" }, image: null, socialLinks: [{ platform: "linkedin", url: "" }] }, agencyStructure: [] }
    } as LandingPageContentValues
}

// Merge initial data with defaults to ensure all required fields exist
function mergeWithDefaults(data: any): LandingPageContentValues {
    const defaults = getDefaultValues()
    return {
        hero: { ...defaults.hero, ...data.hero },
        servicesPreview: { ...defaults.servicesPreview, ...data.servicesPreview },
        portfolioPreview: { ...defaults.portfolioPreview, ...data.portfolioPreview },
        aboutPreview: { ...defaults.aboutPreview, ...data.aboutPreview },
        stats: {
            projectsDelivered: { ...defaults.stats.projectsDelivered, ...data.stats?.projectsDelivered },
            yearsExperience: { ...defaults.stats.yearsExperience, ...data.stats?.yearsExperience },
            clientSatisfaction: { ...defaults.stats.clientSatisfaction, ...data.stats?.clientSatisfaction },
        },
        whyChooseUs: {
            sectionHeading: { ...defaults.whyChooseUs.sectionHeading, ...data.whyChooseUs?.sectionHeading },
            benefits: data.whyChooseUs?.benefits || defaults.whyChooseUs.benefits
        },
        blogPreview: { ...defaults.blogPreview, ...data.blogPreview },
        faqs: {
            sectionHeading: { ...defaults.faqs.sectionHeading, ...data.faqs?.sectionHeading },
            faqItems: data.faqs?.faqItems || defaults.faqs.faqItems,
            ...(data.faqs?.buttonText && { buttonText: data.faqs.buttonText }),
            ...(data.faqs?.buttonUrl && { buttonUrl: data.faqs.buttonUrl })
        },
        serviceHighlightsMarquee: { ...defaults.serviceHighlightsMarquee, ...data.serviceHighlightsMarquee },
        trustedByBrands: {
            sectionHeading: { ...defaults.trustedByBrands.sectionHeading, ...data.trustedByBrands?.sectionHeading },
            brandLogos: data.trustedByBrands?.brandLogos || defaults.trustedByBrands.brandLogos
        },
        ourApproach: {
            sectionHeading: { ...defaults.ourApproach.sectionHeading, ...data.ourApproach?.sectionHeading },
            steps: data.ourApproach?.steps || defaults.ourApproach.steps
        },
        caseStudiesPreview: { ...defaults.caseStudiesPreview, ...data.caseStudiesPreview },
        areasWeServe: {
            sectionHeading: { ...defaults.areasWeServe.sectionHeading, ...data.areasWeServe?.sectionHeading },
            areas: data.areasWeServe?.areas || defaults.areasWeServe.areas
        },
        industriesWeServe: {
            sectionHeading: { ...defaults.industriesWeServe.sectionHeading, ...data.industriesWeServe?.sectionHeading },
            industries: data.industriesWeServe?.industries || defaults.industriesWeServe.industries
        },
        testimonials: {
            sectionHeading: { ...defaults.testimonials.sectionHeading, ...data.testimonials?.sectionHeading },
            testimonials: data.testimonials?.testimonials || defaults.testimonials.testimonials
        },
        leadership: {
            sectionHeading: { ...defaults.leadership.sectionHeading, ...data.leadership?.sectionHeading },
            founder: { ...defaults.leadership.founder, ...data.leadership?.founder },
            agencyStructure: data.leadership?.agencyStructure || defaults.leadership.agencyStructure
        }
    } as LandingPageContentValues
}
