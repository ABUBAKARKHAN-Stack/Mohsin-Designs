"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { landingPageContentSchema, LandingPageContentValues } from "@/lib/validations/landing-page-content"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { BulkImageUpload } from "@/components/admin/form/BulkImageUpload"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateLandingPageContent, saveLandingPageDraft, discardLandingPageDraft } from "@/app/actions/landingPageContent"
import { updateGlobalSections, saveGlobalSectionsDraft, discardGlobalSectionsDraft } from "@/app/actions/globalSections"
import { GlobalSectionsFormTabs } from "@/components/admin/form/GlobalSectionsFormTabs"
import { SectionHeadingCard } from "@/components/admin/form/SharedFormComponents"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, Clock, X, Link, Database } from "lucide-react"
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
    const [selectedLang, setSelectedLang] = useState("en")
    const [isInitialMount, setIsInitialMount] = useState(true)

    const form = useForm<LandingPageContentValues>({
        resolver: zodResolver(landingPageContentSchema),
        mode: "onChange",
        defaultValues: initialData ? mergeWithDefaults(initialData) : getDefaultValues(),
    })


    const formControl = form.control as any


    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<LandingPageContentValues>) => {
            // Don't save on initial mount
            if (isInitialMount) return

            setIsSavingDraft(true)
            try {
                // Split data into local and global
                const localData = { ...data }
                const globalFields = ['stats', 'servicesPreview', 'whyChooseUs', 'ourApproach', 'industriesWeServe', 'faqs', 'leadership', 'cta']
                const globalData: any = {}
                globalFields.forEach(field => {
                    if (localData[field as keyof typeof localData]) {
                        globalData[field] = localData[field as keyof typeof localData]
                        // We keep it in localData too for now to avoid schema issues, 
                        // but normally we'd remove it.
                    }
                })

                const [result1, result2] = await Promise.all([
                    saveLandingPageDraft(localData),
                    saveGlobalSectionsDraft(globalData)
                ])

                if (result1.success && result2.success) {
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



    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control: formControl,
        name: "serviceHighlightsMarquee.highlights",
    })

    const { fields: leftDescFields, append: appendLeftDesc, remove: removeLeftDesc } = useFieldArray({
        control: formControl,
        name: "aboutPreview.leftDescriptions",
    })

    const { fields: rightDescFields, append: appendRightDesc, remove: removeRightDesc } = useFieldArray({
        control: formControl,
        name: "aboutPreview.rightDescriptions",
    })



    const { fields: areaFields, append: appendArea, remove: removeArea } = useFieldArray({
        control: formControl,
        name: "areasWeServe.areas",
    })


    const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({
        control: formControl,
        name: "testimonials.testimonials",
    })




    async function onSubmit(values: LandingPageContentValues) {
        setIsLoading(true)
        try {
            // Split data
            const localData = { ...values }
            const globalFields = ['stats', 'servicesPreview', 'whyChooseUs', 'ourApproach', 'industriesWeServe', 'faqs', 'leadership', 'cta']
            const globalData: any = {}
            globalFields.forEach(field => {
                globalData[field] = localData[field as keyof typeof localData]
            })

            const [result1, result2] = await Promise.all([
                updateLandingPageContent(values),
                updateGlobalSections(globalData)
            ])

            if (result1.success && result2.success) {
                successToast("All content published successfully")
                await Promise.all([
                    discardLandingPageDraft(),
                    discardGlobalSectionsDraft()
                ])
                setLastSaved(null)
            } else {
                errorToast(result1.success ? result2.error : result1.error || "Failed to update content")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }





    const formErrors = form.formState.errors
    const hasErrors = Object.keys(formErrors).length > 0

    // Helper to check if a specific language has errors anywhere in the form
    const hasLangError = (langCode: string) => {
        const checkErrors = (obj: any): boolean => {
            if (!obj) return false
            if (obj.message && typeof obj.message === 'string') return false // It's a field error

            // If it's the language we're looking for and has a message, it's an error
            if (obj[langCode] && obj[langCode].message) return true

            // Otherwise recurse
            return Object.values(obj).some(val => typeof val === 'object' && checkErrors(val))
        }
        return checkErrors(formErrors)
    }

    const currentLangHasError = hasLangError(selectedLang)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
                    <div>
                        <h1 className="text-2xl font-bold">Landing Page Content</h1>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                            <p>Manage all sections</p>
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
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language:</span>
                            <Select value={selectedLang} onValueChange={setSelectedLang}>
                                <SelectTrigger className="w-[140px] h-9 bg-primary/5 border-primary/20 font-medium">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English (EN)</SelectItem>
                                    <SelectItem value="ur">Urdu (UR)</SelectItem>
                                    <SelectItem value="es">Spanish (ES)</SelectItem>
                                    <SelectItem value="ar">Arabic (AR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2 border-l pl-4">
                            {currentLangHasError && (
                                <div className="flex items-center gap-2 text-destructive text-xs px-3 py-1 bg-destructive/10 rounded">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Fix {selectedLang.toUpperCase()} errors</span>
                                </div>
                            )}
                            <Button type="submit" disabled={isLoading || hasErrors}>
                                {isLoading ? <><Spinner className="mr-2 h-4 w-4" /> Publishing...</> : <><Save className="mr-2 h-4 w-4" /> Publish</>}
                            </Button>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="hero" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 gap-2 h-auto bg-transparent p-0 mb-6">
                        <TabsTrigger value="hero" className="relative">
                            Hero
                            {formErrors.hero && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
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
                        <TabsTrigger value="testimonials" className="relative">
                            Testimonials
                            {formErrors.testimonials && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="blog" className="relative">
                            Blog
                            {formErrors.blogPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="shared" className="relative bg-primary/10">
                            Shared Content
                            {(formErrors.stats || formErrors.servicesPreview || formErrors.whyChooseUs || formErrors.ourApproach || formErrors.industriesWeServe || formErrors.faqs || formErrors.leadership || formErrors.cta) && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* HERO */}
                    <TabsContent value="hero">
                        <Card>
                            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="hero.badge" label="Badge Text" activeLang={selectedLang} />

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
                                            <LocalizedInput control={formControl} name={`hero.headingLines.${index}.text`} label="Text" activeLang={selectedLang} />
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
                                            <LocalizedInput control={formControl} name={`hero.descriptionParagraphs.${index}.text`} label="Text" isTextarea activeLang={selectedLang} />
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
                                            <LocalizedInput control={formControl} name={`hero.ctaButtons.${index}.text`} label="Text" activeLang={selectedLang} />
                                            <LocalizedInput control={formControl} name={`hero.ctaButtons.${index}.url`} label="URL" isUrl activeLang={selectedLang} />
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

                    <TabsContent value="shared">
                        <GlobalSectionsFormTabs control={formControl} errors={formErrors} activeLang={selectedLang} />
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
                                        <LocalizedInput control={formControl} name={`serviceHighlightsMarquee.highlights.${index}.text`} label="Text" activeLang={selectedLang} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* BRANDS */}
                    <TabsContent value="brands" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="trustedByBrands.sectionHeading" title="Section Heading" activeLang={selectedLang} />
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
                    <TabsContent value="about" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="aboutPreview.sectionHeading" title="About Preview" activeLang={selectedLang} />

                        {/* Left Descriptions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Left Side Descriptions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {leftDescFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Paragraph {index + 1}</span>
                                        </div>
                                        <LocalizedInput control={formControl} name={`aboutPreview.leftDescriptions.${index}.text`} label="Text" isTextarea activeLang={selectedLang} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Right Descriptions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Right Side Descriptions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {rightDescFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Paragraph {index + 1}</span>
                                        </div>
                                        <LocalizedInput control={formControl} name={`aboutPreview.rightDescriptions.${index}.text`} label="Text" isTextarea activeLang={selectedLang} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* CTA Button */}
                        <Card>
                            <CardHeader><CardTitle>Call to Action</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="aboutPreview.ctaText" label="Button Text" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="aboutPreview.ctaUrl" label="Button URL" isUrl activeLang={selectedLang} />
                            </CardContent>
                        </Card>
                    </TabsContent>


                    {/* PORTFOLIO */}
                    <TabsContent value="portfolio" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="portfolioPreview.sectionHeading" title="Portfolio Preview" activeLang={selectedLang} />
                        <Card>
                            <CardHeader><CardTitle>Portfolio Projects</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Portfolio projects are managed separately and are automatically added dynamically as you create them.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CASES */}
                    <TabsContent value="cases" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="caseStudiesPreview.sectionHeading" title="Case Studies Preview" activeLang={selectedLang} />
                        <Card>
                            <CardHeader><CardTitle>Case Studies</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Detailed case studies are managed separately and are automatically added dynamically to this section.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* AREAS */}
                    <TabsContent value="areas" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="areasWeServe.sectionHeading" title="Areas We Serve" activeLang={selectedLang} />
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

                                        <LocalizedInput control={formControl} name={`areasWeServe.areas.${index}.region`} label="Region Name" activeLang={selectedLang} />

                                        <FormField control={formControl} name={`areasWeServe.areas.${index}.flag`} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Flag Emoji</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="🇺🇸 🇬🇧 🇵🇰" maxLength={10} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <NestedLocationsField control={formControl} areaIndex={index} activeLang={selectedLang} />

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


                    {/* TESTIMONIALS */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="testimonials.sectionHeading" title="Testimonials" activeLang={selectedLang} />
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
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.quote`} label="Quote" isTextarea activeLang={selectedLang} />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.author`} label="Author" activeLang={selectedLang} />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.role`} label="Role" activeLang={selectedLang} />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.company`} label="Company" activeLang={selectedLang} />

                                        <div className="space-y-2">
                                            <FormLabel>Avatar Image</FormLabel>
                                            <FormField control={formControl} name={`testimonials.testimonials.${index}.avatar`} render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={field.value}
                                                            onChange={(asset) => {
                                                                if (!asset) {
                                                                    field.onChange(null)
                                                                    return
                                                                }
                                                                field.onChange({
                                                                    _type: 'image',
                                                                    asset: {
                                                                        _type: 'reference',
                                                                        _ref: asset._id || asset.id,
                                                                    },
                                                                    url: asset.url
                                                                })
                                                            }}
                                                            label=""
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </form>
        </Form>
    )
}

// End of LandingPageContentForm

function NestedLocationsField({ control, areaIndex, activeLang }: { control: any; areaIndex: number; activeLang?: string }) {
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
                            activeLang={activeLang}
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

// End of LandingPageContentForm

function getDefaultValues(): LandingPageContentValues {
    return {
        hero: { badge: { en: "", ur: "", es: "", ar: "" }, headingLines: [], descriptionParagraphs: [], ctaButtons: [] },
        servicesPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        portfolioPreview: { sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } } },
        aboutPreview: {
            sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } },
            leftDescriptions: [
                { text: { en: "", ur: "", es: "", ar: "" } },
                { text: { en: "", ur: "", es: "", ar: "" } }
            ],
            rightDescriptions: [
                { text: { en: "", ur: "", es: "", ar: "" } },
                { text: { en: "", ur: "", es: "", ar: "" } }
            ],
            ctaText: { en: "", ur: "", es: "", ar: "" },
            ctaUrl: { en: "", ur: "", es: "", ar: "" }
        },
        stats: {
            projectsDelivered: { value: "", label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
            yearsExperience: { value: "", label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
            clientSatisfaction: { value: "", label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
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
        leadership: {
            sectionHeading: { eyebrow: { en: "", ur: "", es: "", ar: "" }, title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" } },
            founder: { name: { en: "", ur: "", es: "", ar: "" }, role: { en: "", ur: "", es: "", ar: "" }, image: null, socialLinks: [{ platform: "linkedin", url: "" }] },
            agencyStructure: []
        },
        cta: {
            badge: { en: "", ur: "", es: "", ar: "" },
            heading: { en: "", ur: "", es: "", ar: "" },
            description: { en: "", ur: "", es: "", ar: "" },
            benefits: [],
        }
    } as LandingPageContentValues
}

// Merge initial data with defaults to ensure all required fields exist
function mergeWithDefaults(data: any): LandingPageContentValues {
    const defaults = getDefaultValues()
    return {
        hero: { ...defaults.hero, ...data.hero },
        servicesPreview: { ...defaults.servicesPreview, ...data.servicesPreview },
        portfolioPreview: { ...defaults.portfolioPreview, ...data.portfolioPreview },
        aboutPreview: {
            sectionHeading: { ...defaults.aboutPreview.sectionHeading, ...data.aboutPreview?.sectionHeading },
            leftDescriptions: data.aboutPreview?.leftDescriptions?.length > 0 ? data.aboutPreview.leftDescriptions : defaults.aboutPreview.leftDescriptions,
            rightDescriptions: data.aboutPreview?.rightDescriptions?.length > 0 ? data.aboutPreview.rightDescriptions : defaults.aboutPreview.rightDescriptions,
            ctaText: { ...defaults.aboutPreview.ctaText, ...data.aboutPreview?.ctaText },
            ctaUrl: { ...defaults.aboutPreview.ctaUrl, ...data.aboutPreview?.ctaUrl }
        },
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
        },
        cta: {
            badge: { ...defaults.cta.badge, ...data.cta?.badge },
            heading: { ...defaults.cta.heading, ...data.cta?.heading },
            description: { ...defaults.cta.description, ...data.cta?.description },
            benefits: data.cta?.benefits || defaults.cta.benefits,
            formId: typeof data.cta?.formId === 'object' ? data.cta.formId?._ref : data.cta?.formId || undefined
        }
    } as LandingPageContentValues
}

// Form Selector Dropdown Component
function FormSelectorDropdown({ field }: { field: any }) {
    const [forms, setForms] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadForms() {
            setIsLoading(true)
            try {
                const { getForms } = await import("@/app/actions/formActions")
                const result = await getForms()
                if (result.success && result.data) {
                    setForms(result.data)
                }
            } catch (error) {
                console.error("Failed to load forms:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadForms()
    }, [])

    const handleValueChange = (value: string) => {
        // Convert "__none__" back to undefined for the form
        field.onChange(value === "__none__" ? undefined : value)
    }

    return (
        <Select onValueChange={handleValueChange} value={field.value || "__none__"}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder={isLoading ? "Loading forms..." : "Select a form (optional)"} />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                <SelectItem value="__none__">None (use default form)</SelectItem>
                {forms.map((form) => (
                    <SelectItem key={form._id} value={form._id}>
                        {form.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
