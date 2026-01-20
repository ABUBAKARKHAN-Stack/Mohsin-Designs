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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { updateLandingPageContent, saveLandingPageDraft, discardLandingPageDraft } from "@/app/actions/landingPageContent"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, Clock, X, Globe, ExternalLink } from "lucide-react"
import { debounce } from "lodash"
import Link from "next/link"
import { SectionHeadingCard } from "./SectionHeadingCard"
import { StatItemCard } from "./StatItemCard"

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

    const formControl = form.control as any

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<LandingPageContentValues>) => {
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

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialMount(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const subscription = form.watch((value) => {
            saveDraft(value as Partial<LandingPageContentValues>)
        })
        return () => subscription.unsubscribe()
    }, [form, saveDraft])

    // Field arrays for sections that remain in this form
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

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control: formControl,
        name: "faqs.faqItems",
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
        if (!confirm("Are you sure you want to discard your draft?")) return
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
                        <h1 className="text-2xl font-bold font-display">Landing Page Content</h1>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                            <p>Manage home page specific sections</p>
                            {isSavingDraft && (
                                <span className="flex items-center gap-1 text-blue-600">
                                    <Spinner className="h-3 w-3" />
                                    Saving...
                                </span>
                            )}
                            {lastSaved && !isSavingDraft && (
                                <span className="flex items-center gap-1 text-green-600">
                                    <Clock className="h-3 w-3" />
                                    Draft Saved {lastSaved.toLocaleTimeString()}
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
                    <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0 mb-6 font-display font-medium">
                        <TabsTrigger value="hero" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Hero
                            {formErrors.hero && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="services" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Services</TabsTrigger>
                        <TabsTrigger value="portfolio" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Portfolio
                            {formErrors.portfolioPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="about" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            About Preview
                            {formErrors.aboutPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="stats" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Stats</TabsTrigger>
                        <TabsTrigger value="whyUs" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Why Us</TabsTrigger>
                        <TabsTrigger value="blog" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Blog
                            {formErrors.blogPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="faqs" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            FAQs
                            {formErrors.faqs && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="trusted" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Brands
                            {formErrors.trustedByBrands && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="approach" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Approach</TabsTrigger>
                        <TabsTrigger value="industries" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Industries</TabsTrigger>
                        <TabsTrigger value="testimonials" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Testimonials
                            {formErrors.testimonials && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="leadership" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Leadership</TabsTrigger>
                        <TabsTrigger value="cta" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />CTA</TabsTrigger>
                    </TabsList>

                    {/* HERO */}
                    <TabsContent value="hero" className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Hero Configuration</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="hero.badge" label="Badge Text" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Heading Lines</FormLabel>
                                        <Button type="button" size="sm" variant="outline" onClick={() => appendHeadingLine({ text: { en: "", ur: "", es: "", ar: "" } })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Line
                                        </Button>
                                    </div>
                                    {headingLineFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start">
                                            <div className="flex-1">
                                                <LocalizedInput control={formControl} name={`hero.headingLines.${index}.text`} label={`Line ${index + 1}`} />
                                            </div>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeHeadingLine(index)} className="mt-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Description Paragraphs</FormLabel>
                                        <Button type="button" size="sm" variant="outline" onClick={() => appendParagraph({ text: { en: "", ur: "", es: "", ar: "" } })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Paragraph
                                        </Button>
                                    </div>
                                    {paragraphFields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start">
                                            <div className="flex-1">
                                                <LocalizedInput control={formControl} name={`hero.descriptionParagraphs.${index}.text`} label={`Paragraph ${index + 1}`} isTextarea />
                                            </div>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeParagraph(index)} className="mt-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="services"><SharedSectionNotice sectionName="Services Preview" /></TabsContent>
                    <TabsContent value="stats"><SharedSectionNotice sectionName="Shared Statistics" /></TabsContent>
                    <TabsContent value="whyUs"><SharedSectionNotice sectionName="Why Choose Us" /></TabsContent>
                    <TabsContent value="approach"><SharedSectionNotice sectionName="Our Approach" /></TabsContent>
                    <TabsContent value="industries"><SharedSectionNotice sectionName="Industries We Serve" /></TabsContent>
                    <TabsContent value="leadership"><SharedSectionNotice sectionName="Leadership" /></TabsContent>
                    <TabsContent value="cta"><SharedSectionNotice sectionName="CTA" /></TabsContent>

                    {/* PORTFOLIO PREVIEW */}
                    <TabsContent value="portfolio">
                        <SectionHeadingCard control={formControl} baseName="portfolioPreview.sectionHeading" title="Portfolio Preview" />
                    </TabsContent>

                    {/* ABOUT PREVIEW */}
                    <TabsContent value="about" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="aboutPreview.sectionHeading" title="About Section Preview" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader><CardTitle>Left Side Indicators</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    {leftDescFields.map((field, index) => (
                                        <LocalizedInput key={field.id} control={formControl} name={`aboutPreview.leftDescriptions.${index}.text`} label={`Indicator ${index + 1}`} />
                                    ))}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>Right Side Indicators</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    {rightDescFields.map((field, index) => (
                                        <LocalizedInput key={field.id} control={formControl} name={`aboutPreview.rightDescriptions.${index}.text`} label={`Indicator ${index + 1}`} />
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="blog">
                        <SectionHeadingCard control={formControl} baseName="blogPreview.sectionHeading" title="Blog Preview" />
                    </TabsContent>

                    <TabsContent value="faqs" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="faqs.sectionHeading" title="FAQs" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center"><CardTitle>FAQ Items</CardTitle><Button type="button" size="sm" variant="outline" onClick={() => appendFaq({ question: { en: "", ur: "", es: "", ar: "" }, answer: { en: "", ur: "", es: "", ar: "" } })}><Plus className="h-4 w-4 mr-2" /> Add</Button></CardHeader>
                            <CardContent className="space-y-4">
                                {faqFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <LocalizedInput control={formControl} name={`faqs.faqItems.${index}.question`} label="Question" />
                                        <LocalizedInput control={formControl} name={`faqs.faqItems.${index}.answer`} label="Answer" isTextarea />
                                        <Button type="button" size="sm" variant="destructive" onClick={() => removeFaq(index)}><Trash2 className="h-4 w-4 mr-2" /> Remove</Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="trusted" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="trustedByBrands.sectionHeading" title="Trusted Brands" />
                        <Card>
                            <CardHeader><CardTitle>Brand Logos</CardTitle></CardHeader>
                            <CardContent>
                                <FormField control={formControl} name="trustedByBrands.brandLogos" render={({ field }) => (
                                    <FormItem><FormControl><BulkImageUpload value={field.value || []} onChange={field.onChange} label="Upload Brand Logos" /></FormControl><FormMessage /></FormItem>
                                )} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="testimonials" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="testimonials.sectionHeading" title="Testimonials" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center"><CardTitle>Testimonials</CardTitle><Button type="button" size="sm" variant="outline" onClick={() => appendTestimonial({ quote: { en: "", ur: "", es: "", ar: "" }, author: { en: "", ur: "", es: "", ar: "" }, role: { en: "", ur: "", es: "", ar: "" } })}><Plus className="h-4 w-4 mr-2" /> Add</Button></CardHeader>
                            <CardContent className="space-y-4">
                                {testimonialFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.quote`} label="Quote" isTextarea />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.author`} label="Author" />
                                        <LocalizedInput control={formControl} name={`testimonials.testimonials.${index}.role`} label="Role" />
                                        <Button type="button" size="sm" variant="destructive" onClick={() => removeTestimonial(index)}><Trash2 className="h-4 w-4 mr-2" /> Remove</Button>
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

function SharedSectionNotice({ sectionName }: { sectionName: string }) {
    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg"><Globe className="h-6 w-6 text-primary" /></div>
                    <div><CardTitle>Global Shared Section</CardTitle><CardDescription>{sectionName} is now managed centrally.</CardDescription></div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    To maintain consistency across YOUR website, the <strong>{sectionName}</strong> is managed in the Global Sections editor.
                    Changes made there will automatically update this Landing Page and any other pages where this section appears.
                </p>
                <Button asChild variant="default" className="w-full sm:w-auto">
                    <Link href="/admin/global">Go to Global Sections <ExternalLink className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardContent>
        </Card>
    )
}

function getDefaultValues(): LandingPageContentValues {
    const emptyLoc = { en: "", ur: "", es: "", ar: "" };
    return {
        hero: { badge: emptyLoc, headingLines: [], descriptionParagraphs: [], ctaButtons: [] },
        servicesPreview: { sectionHeading: { title: emptyLoc } },
        portfolioPreview: { sectionHeading: { title: emptyLoc } },
        aboutPreview: {
            sectionHeading: { title: emptyLoc },
            leftDescriptions: [],
            rightDescriptions: [],
            ctaText: emptyLoc,
            ctaUrl: emptyLoc
        },
        stats: {
            projectsDelivered: { value: emptyLoc, label: emptyLoc, suffix: "" },
            yearsExperience: { value: emptyLoc, label: emptyLoc, suffix: "" },
            clientSatisfaction: { value: emptyLoc, label: emptyLoc, suffix: "" }
        },
        whyChooseUs: { sectionHeading: { title: emptyLoc }, benefits: [] },
        blogPreview: { sectionHeading: { title: emptyLoc } },
        faqs: { sectionHeading: { title: emptyLoc }, faqItems: [] },
        serviceHighlightsMarquee: { highlights: [] },
        trustedByBrands: { sectionHeading: { title: emptyLoc }, brandLogos: [] },
        ourApproach: { sectionHeading: { title: emptyLoc }, steps: [] },
        caseStudiesPreview: { sectionHeading: { title: emptyLoc } },
        areasWeServe: { sectionHeading: { title: emptyLoc }, areas: [] },
        industriesWeServe: { sectionHeading: { title: emptyLoc }, industries: [] },
        testimonials: { sectionHeading: { title: emptyLoc }, testimonials: [] },
        leadership: {
            sectionHeading: { title: emptyLoc },
            founder: { name: emptyLoc, role: emptyLoc, image: null as any, socialLinks: [] },
            agencyStructure: []
        },
        cta: {
            badge: emptyLoc,
            heading: emptyLoc,
            description: emptyLoc,
            benefits: [],
            formId: undefined
        }
    }
}

function mergeWithDefaults(data: any): LandingPageContentValues {
    const defaults = getDefaultValues()
    return {
        ...defaults,
        ...data,
        hero: { ...defaults.hero, ...data.hero },
        aboutPreview: { ...defaults.aboutPreview, ...data.aboutPreview },
    } as LandingPageContentValues
}
