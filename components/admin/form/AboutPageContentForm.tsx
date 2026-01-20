"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { aboutPageContentSchema, AboutPageContentValues } from "@/lib/validations/about-page-content"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateAboutPageContent, saveAboutPageDraft, discardAboutPageDraft } from "@/app/actions/aboutPageContent"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, Clock, X, Globe, ExternalLink } from "lucide-react"
import Link from "next/link"
import { CardDescription } from "@/components/ui/card"
import { debounce } from "lodash"
import { Input } from "@/components/ui/input"
import { SectionHeadingCard } from "./SectionHeadingCard"

interface AboutPageContentFormProps {
    initialData?: any
    hasDraft?: boolean
    draftUpdatedAt?: string | null
}

export function AboutPageContentForm({ initialData, hasDraft, draftUpdatedAt }: AboutPageContentFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        draftUpdatedAt ? new Date(draftUpdatedAt) : null
    )
    const [isInitialMount, setIsInitialMount] = useState(true)

    const form = useForm<AboutPageContentValues>({
        resolver: zodResolver(aboutPageContentSchema),
        mode: "onChange",
        defaultValues: initialData ? mergeWithDefaults(initialData) : getDefaultValues(),
    })

    const formControl = form.control as any

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<AboutPageContentValues>) => {
            if (isInitialMount) return
            setIsSavingDraft(true)
            try {
                const result = await saveAboutPageDraft(data)
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
            saveDraft(value as Partial<AboutPageContentValues>)
        })
        return () => subscription.unsubscribe()
    }, [form, saveDraft])

    // Field arrays
    const { fields: missionResults, append: appendMissionResult, remove: removeMissionResult } = useFieldArray({
        control: formControl,
        name: "missionVision.mission.keyPoints",
    })

    const { fields: visionResults, append: appendVisionResult, remove: removeVisionResult } = useFieldArray({
        control: formControl,
        name: "missionVision.vision.keyPoints",
    })

    const { fields: philosophySteps, append: appendPhilosophyStep, remove: removePhilosophyStep } = useFieldArray({
        control: formControl,
        name: "philosophy.steps",
    })

    const { fields: globalRegions, append: appendGlobalRegion, remove: removeGlobalRegion } = useFieldArray({
        control: formControl,
        name: "globalReach.regions",
    })

    const { fields: globalStats, append: appendGlobalStat, remove: removeGlobalStat } = useFieldArray({
        control: formControl,
        name: "globalReach.stats",
    })

    const { fields: cultureValues, append: appendCultureValue, remove: removeCultureValue } = useFieldArray({
        control: formControl,
        name: "culture.values",
    })

    async function onSubmit(values: AboutPageContentValues) {
        setIsLoading(true)
        try {
            const result = await updateAboutPageContent(values)
            if (result.success) {
                successToast("About page content published successfully")
                await discardAboutPageDraft()
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
        if (!confirm("Are you sure you want to discard your draft changes?")) return
        const result = await discardAboutPageDraft()
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
                        <h1 className="text-2xl font-bold">About Page Content</h1>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                            <p>Manage story, mission, philosophy, and culture</p>
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

                <Tabs defaultValue="intro" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 gap-2 h-auto bg-transparent p-0 mb-6 font-display font-medium">
                        <TabsTrigger value="hero" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Hero
                            {formErrors.hero && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="intro" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Intro
                            {formErrors.intro && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="missionVision" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Mission/Vision
                            {formErrors.missionVision && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="philosophy" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Philosophy
                            {formErrors.philosophy && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="globalReach" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Global Reach
                            {formErrors.globalReach && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="culture" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Culture
                            {formErrors.culture && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="services" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Services</TabsTrigger>
                        <TabsTrigger value="stats" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Stats</TabsTrigger>
                        <TabsTrigger value="whyUs" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Why Us</TabsTrigger>
                        <TabsTrigger value="approach" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Approach</TabsTrigger>
                        <TabsTrigger value="industries" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Industries</TabsTrigger>
                        <TabsTrigger value="leadership" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />Leadership</TabsTrigger>
                        <TabsTrigger value="cta" className="border border-dashed border-primary/40"><Globe className="h-3 w-3 mr-1.5 opacity-70" />CTA</TabsTrigger>
                    </TabsList>
                    <TabsContent value="hero">
                        <Card>
                            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="hero.title" label="Title" />
                                <LocalizedInput control={formControl} name="hero.subtitle" label="Subtitle" />
                                <LocalizedInput control={formControl} name="hero.description" label="Description" isTextarea />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* INTRO */}
                    <TabsContent value="intro">
                        <Card>
                            <CardHeader><CardTitle>Intro Section (Who We Are)</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="intro.badge" label="Badge Text" />
                                <LocalizedInput control={formControl} name="intro.heading" label="Heading" />
                                <LocalizedInput control={formControl} name="intro.description1" label="Description Paragraph 1" isTextarea />
                                <LocalizedInput control={formControl} name="intro.description2" label="Description Paragraph 2" isTextarea />
                                <LocalizedInput control={formControl} name="intro.quote" label="Quote (Optional)" isTextarea />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <FormLabel>Since Year</FormLabel>
                                        <FormField control={formControl} name="intro.sinceYear" render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || new Date().getFullYear())} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel>Main Image</FormLabel>
                                        <FormField control={formControl} name="intro.mainImage" render={({ field }) => (
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
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MISSION & VISION */}
                    <TabsContent value="missionVision" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="missionVision.sectionHeading" title="Mission & Vision Section Heading" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* MISSION */}
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>Mission</CardTitle>
                                    <Button type="button" size="sm" variant="outline" onClick={() => appendMissionResult({ en: "", ur: "", es: "", ar: "" })}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Key Point
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <LocalizedInput control={formControl} name="missionVision.mission.eyebrow" label="Eyebrow (e.g. Purpose)" />
                                    <LocalizedInput control={formControl} name="missionVision.mission.title" label="Title (e.g. Our Mission)" />
                                    <LocalizedInput control={formControl} name="missionVision.mission.description1" label="Main Description" isTextarea />
                                    <LocalizedInput control={formControl} name="missionVision.mission.description2" label="Secondary Description (after divider)" isTextarea />

                                    <div className="space-y-3 pt-2">
                                        <FormLabel>Key Points</FormLabel>
                                        <div className="space-y-3">
                                            {missionResults.map((field, index) => (
                                                <div key={field.id} className="flex gap-2 items-start">
                                                    <div className="flex-1">
                                                        <LocalizedInput control={formControl} name={`missionVision.mission.keyPoints.${index}`} label={`Point ${index + 1}`} />
                                                    </div>
                                                    <Button type="button" size="sm" variant="ghost" onClick={() => removeMissionResult(index)} className="mt-8">
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* VISION */}
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>Vision</CardTitle>
                                    <Button type="button" size="sm" variant="outline" onClick={() => appendVisionResult({ en: "", ur: "", es: "", ar: "" })}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Key Point
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <LocalizedInput control={formControl} name="missionVision.vision.eyebrow" label="Eyebrow (e.g. Direction)" />
                                    <LocalizedInput control={formControl} name="missionVision.vision.title" label="Title (e.g. Our Vision)" />
                                    <LocalizedInput control={formControl} name="missionVision.vision.description1" label="Main Description" isTextarea />
                                    <LocalizedInput control={formControl} name="missionVision.vision.description2" label="Secondary Description (after divider)" isTextarea />

                                    <div className="space-y-3 pt-2">
                                        <FormLabel>Key Points</FormLabel>
                                        <div className="space-y-3">
                                            {visionResults.map((field, index) => (
                                                <div key={field.id} className="flex gap-2 items-start">
                                                    <div className="flex-1">
                                                        <LocalizedInput control={formControl} name={`missionVision.vision.keyPoints.${index}`} label={`Point ${index + 1}`} />
                                                    </div>
                                                    <Button type="button" size="sm" variant="ghost" onClick={() => removeVisionResult(index)} className="mt-8">
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* PHILOSOPHY */}
                    <TabsContent value="philosophy" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="philosophy.sectionHeading" title="Philosophy Section Heading" />

                        <Card>
                            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="philosophy.quoteBlock" label="Special Quote Block" isTextarea />
                                <LocalizedInput control={formControl} name="philosophy.description1" label="Introduction Paragraph" isTextarea />
                                <LocalizedInput control={formControl} name="philosophy.description2" label="Closing Paragraph" isTextarea />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Process Steps</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendPhilosophyStep({ label: { en: "", ur: "", es: "", ar: "" }, iconName: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Step
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {philosophySteps.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Step {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removePhilosophyStep(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`philosophy.steps.${index}.label`} label="Label" />
                                        <FormField control={formControl} name={`philosophy.steps.${index}.iconName`} render={({ field }) => (
                                            <IconSelect field={field} type="benefit" label="Icon" />
                                        )} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* GLOBAL REACH */}
                    <TabsContent value="globalReach" className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Global Reach Info</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="globalReach.badge" label="Badge" />
                                <LocalizedInput control={formControl} name="globalReach.heading" label="Heading" />
                                <LocalizedInput control={formControl} name="globalReach.description1" label="Description 1" isTextarea />
                                <LocalizedInput control={formControl} name="globalReach.description2" label="Description 2" isTextarea />
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>Regions</CardTitle>
                                    <Button type="button" size="sm" variant="outline" onClick={() => appendGlobalRegion({ en: "", ur: "", es: "", ar: "" })}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Region
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {globalRegions.map((field, index) => (
                                        <div key={field.id} className="flex gap-2 items-start">
                                            <div className="flex-1">
                                                <LocalizedInput control={formControl} name={`globalReach.regions.${index}`} label={`Region ${index + 1}`} />
                                            </div>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeGlobalRegion(index)} className="mt-8">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>Stats</CardTitle>
                                    <Button type="button" size="sm" variant="outline" onClick={() => appendGlobalStat({ value: "", label: { en: "", ur: "", es: "", ar: "" } })}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Stat
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {globalStats.map((field, index) => (
                                        <div key={field.id} className="border rounded p-4 space-y-4">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Stat {index + 1}</span>
                                                <Button type="button" size="sm" variant="destructive" onClick={() => removeGlobalStat(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormField control={formControl} name={`globalReach.stats.${index}.value`} render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Value (e.g., 400+, 99%)</FormLabel>
                                                    <FormControl><Input {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <LocalizedInput control={formControl} name={`globalReach.stats.${index}.label`} label="Label" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* CULTURE */}
                    <TabsContent value="culture" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="culture.sectionHeading" title="Culture Section Heading" />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <CardTitle>Core Values</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendCultureValue({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Value
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cultureValues.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Value {index + 1}</span>
                                            <Button type="button" size="sm" variant="destructive" onClick={() => removeCultureValue(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`culture.values.${index}.title`} label="Title" />
                                        <LocalizedInput control={formControl} name={`culture.values.${index}.description`} label="Description" isTextarea />
                                        <FormField control={formControl} name={`culture.values.${index}.iconName`} render={({ field }) => (
                                            <IconSelect field={field} type="benefit" label="Icon" />
                                        )} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Culture Quote</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="culture.quote" label="Quote Text" isTextarea />
                                <LocalizedInput control={formControl} name="culture.quoteHighlight" label="Highlight Text (appears bold/accent)" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="cta">
                        <SharedSectionNotice sectionName="CTA" />
                    </TabsContent>
                    <TabsContent value="leadership">
                        <SharedSectionNotice sectionName="Leadership" />
                    </TabsContent>
                    <TabsContent value="services">
                        <SharedSectionNotice sectionName="Services Preview" />
                    </TabsContent>
                    <TabsContent value="stats">
                        <SharedSectionNotice sectionName="Shared Statistics" />
                    </TabsContent>
                    <TabsContent value="whyUs">
                        <SharedSectionNotice sectionName="Why Choose Us" />
                    </TabsContent>
                    <TabsContent value="approach">
                        <SharedSectionNotice sectionName="Our Approach" />
                    </TabsContent>
                    <TabsContent value="industries">
                        <SharedSectionNotice sectionName="Industries We Serve" />
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
                    <div>
                        <CardTitle>Global Shared Section</CardTitle>
                        <CardDescription>{sectionName} is now managed centrally.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    To maintain consistency across YOUR website, the <strong>{sectionName}</strong> is managed in the Global Sections editor.
                    Changes made there will automatically update this About Page and any other pages where this section appears.
                </p>
                <Button asChild variant="default" className="w-full sm:w-auto">
                    <Link href="/admin/global">
                        Go to Global Sections <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}


function getDefaultValues(): AboutPageContentValues {
    return {
        hero: {
            title: { en: "", ur: "", es: "", ar: "" },
            subtitle: { en: "", ur: "", es: "", ar: "" },
            description: { en: "", ur: "", es: "", ar: "" },
        },
        intro: {
            badge: { en: "", ur: "", es: "", ar: "" },
            heading: { en: "", ur: "", es: "", ar: "" },
            description1: { en: "", ur: "", es: "", ar: "" },
            description2: { en: "", ur: "", es: "", ar: "" },
            sinceYear: new Date().getFullYear(),
        },
        missionVision: {
            sectionHeading: {
                eyebrow: { en: "", ur: "", es: "", ar: "" },
                title: { en: "", ur: "", es: "", ar: "" },
                description: { en: "", ur: "", es: "", ar: "" },
            },
            mission: {
                eyebrow: { en: "", ur: "", es: "", ar: "" },
                title: { en: "", ur: "", es: "", ar: "" },
                description1: { en: "", ur: "", es: "", ar: "" },
                description2: { en: "", ur: "", es: "", ar: "" },
                keyPoints: [],
            },
            vision: {
                eyebrow: { en: "", ur: "", es: "", ar: "" },
                title: { en: "", ur: "", es: "", ar: "" },
                description1: { en: "", ur: "", es: "", ar: "" },
                description2: { en: "", ur: "", es: "", ar: "" },
                keyPoints: [],
            },
        },
        philosophy: {
            sectionHeading: {
                eyebrow: { en: "", ur: "", es: "", ar: "" },
                title: { en: "", ur: "", es: "", ar: "" },
                description: { en: "", ur: "", es: "", ar: "" },
            },
            quoteBlock: { en: "", ur: "", es: "", ar: "" },
            description1: { en: "", ur: "", es: "", ar: "" },
            description2: { en: "", ur: "", es: "", ar: "" },
            steps: [],
        },
        globalReach: {
            badge: { en: "", ur: "", es: "", ar: "" },
            heading: { en: "", ur: "", es: "", ar: "" },
            description1: { en: "", ur: "", es: "", ar: "" },
            description2: { en: "", ur: "", es: "", ar: "" },
            regions: [],
            stats: [],
        },
        culture: {
            sectionHeading: { title: { en: "", ur: "", es: "", ar: "" } },
            values: [],
        },
    } as AboutPageContentValues
}

function mergeWithDefaults(data: any): AboutPageContentValues {
    const defaults = getDefaultValues()
    return {
        hero: { ...defaults.hero, ...data.hero },
        intro: { ...defaults.intro, ...data.intro },
        missionVision: {
            sectionHeading: { ...defaults.missionVision.sectionHeading, ...data.missionVision?.sectionHeading },
            mission: {
                ...defaults.missionVision.mission,
                ...data.missionVision?.mission,
                keyPoints: data.missionVision?.mission?.keyPoints || defaults.missionVision.mission.keyPoints,
            },
            vision: {
                ...defaults.missionVision.vision,
                ...data.missionVision?.vision,
                keyPoints: data.missionVision?.vision?.keyPoints || defaults.missionVision.vision.keyPoints,
            },
        },
        philosophy: {
            sectionHeading: { ...defaults.philosophy.sectionHeading, ...data.philosophy?.sectionHeading },
            quoteBlock: data.philosophy?.quoteBlock || defaults.philosophy.quoteBlock,
            description1: data.philosophy?.description1 || defaults.philosophy.description1,
            description2: data.philosophy?.description2 || defaults.philosophy.description2,
            steps: data.philosophy?.steps || defaults.philosophy.steps,
        },
        globalReach: {
            ...defaults.globalReach,
            ...data.globalReach,
            regions: data.globalReach?.regions || defaults.globalReach.regions,
            stats: data.globalReach?.stats || defaults.globalReach.stats,
        },
        culture: {
            sectionHeading: { ...defaults.culture.sectionHeading, ...data.culture?.sectionHeading },
            values: data.culture?.values || defaults.culture.values,
            quote: data.culture?.quote || defaults.culture.quote,
            quoteHighlight: data.culture?.quoteHighlight || defaults.culture.quoteHighlight,
        },
    } as AboutPageContentValues
}
