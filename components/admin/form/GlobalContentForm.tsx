"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { globalContentSchema, GlobalContentValues } from "@/lib/validations/global-content"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateGlobalContent, migrateSharedContent, saveGlobalContentDraft, discardGlobalContentDraft } from "@/app/actions/globalContent"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, Database, Clock, X } from "lucide-react"
import { debounce } from "lodash"
import { SectionHeadingCard } from "./SectionHeadingCard"
import { StatItemCard } from "./StatItemCard"
import { Input } from "@/components/ui/input"

interface GlobalContentFormProps {
    initialData?: any
}

export function GlobalContentForm({ initialData }: GlobalContentFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isMigrating, setIsMigrating] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        initialData?.draftUpdatedAt ? new Date(initialData.draftUpdatedAt) : null
    )
    const [isInitialMount, setIsInitialMount] = useState(true)

    const form = useForm<GlobalContentValues>({
        resolver: zodResolver(globalContentSchema),
        mode: "onChange",
        defaultValues: initialData || getDefaultValues(),
    })

    const formControl = form.control as any

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<GlobalContentValues>) => {
            if (isInitialMount) return
            setIsSavingDraft(true)
            try {
                const result = await saveGlobalContentDraft(data)
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
            saveDraft(value as Partial<GlobalContentValues>)
        })
        return () => subscription.unsubscribe()
    }, [form, saveDraft])

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control: formControl,
        name: "whyChooseUs.benefits",
    })

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control: formControl,
        name: "ourApproach.steps",
    })

    const { fields: industryFields, append: appendIndustry, remove: removeIndustry } = useFieldArray({
        control: formControl,
        name: "industriesWeServe.industries",
    })

    const { fields: agencyStructureFields, append: appendAgencyTeam, remove: removeAgencyTeam } = useFieldArray({
        control: formControl,
        name: "leadership.agencyStructure",
    })

    const { fields: ctaBenefitsFields, append: appendCtaBenefit, remove: removeCtaBenefit } = useFieldArray({
        control: formControl,
        name: "cta.benefits",
    })

    async function onSubmit(values: GlobalContentValues) {
        setIsLoading(true)
        try {
            const result = await updateGlobalContent(values)
            if (result.success) {
                successToast("Global sections published successfully")
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
        const result = await discardGlobalContentDraft()
        if (result.success) {
            successToast("Draft discarded")
            setLastSaved(null)
            window.location.reload()
        } else {
            errorToast("Failed to discard draft")
        }
    }

    async function handleMigrate() {
        if (!confirm("This will copy shared section content from the Landing Page to these Global Sections. This only needs to be done once to preserve your existing data. Continue?")) return

        setIsMigrating(true)
        try {
            const result = await migrateSharedContent()
            if (result.success) {
                successToast(result.message || "Migration successful")
                window.location.reload()
            } else {
                errorToast(result.error || "Migration failed")
            }
        } catch (error) {
            errorToast("Migration failed")
        } finally {
            setIsMigrating(false)
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
                        <h1 className="text-2xl font-bold font-display">Global Sections</h1>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                            <p>Manage content shared across multiple pages</p>
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
                        {initialData?.hasDraft && (
                            <Button type="button" variant="outline" size="sm" onClick={handleDiscardDraft}>
                                <X className="mr-2 h-4 w-4" /> Discard Draft
                            </Button>
                        )}
                        <Button type="button" variant="outline" size="sm" onClick={handleMigrate} disabled={isMigrating || isLoading}>
                            {isMigrating ? <Spinner className="mr-2 h-4 w-4" /> : <Database className="mr-2 h-4 w-4" />}
                            Quick Migrate
                        </Button>
                        {hasErrors && (
                            <div className="flex items-center gap-2 text-destructive text-xs px-3 py-1 bg-destructive/10 rounded">
                                <AlertCircle className="h-3 w-3" />
                                <span>Fix errors</span>
                            </div>
                        )}
                        <Button type="submit" disabled={isLoading || isMigrating || hasErrors}>
                            {isLoading ? <><Spinner className="mr-2 h-4 w-4" /> Publishing...</> : <><Save className="mr-2 h-4 w-4" /> Publish Change</>}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="stats" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-2 h-auto bg-transparent p-0 mb-6 font-display font-medium">
                        <TabsTrigger value="stats" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Stats
                            {formErrors.stats && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="services" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Services
                            {formErrors.servicesPreview && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="whyUs" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Why Us
                            {formErrors.whyChooseUs && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="approach" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Approach
                            {formErrors.ourApproach && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="industries" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Industries
                            {formErrors.industriesWeServe && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="leadership" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            Leadership
                            {formErrors.leadership && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                        <TabsTrigger value="cta" className="relative data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                            CTA
                            {formErrors.cta && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}
                        </TabsTrigger>
                    </TabsList>

                    {/* STATS */}
                    <TabsContent value="stats">
                        <Card className="border-2 shadow-sm">
                            <CardHeader className="bg-muted/30 pb-4 border-b">
                                <CardTitle className="text-xl">Shared Statistics</CardTitle>
                                <p className="text-sm text-muted-foreground">These metrics appear on both Home and About pages.</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-8">
                                <StatItemCard control={formControl} name="stats.projectsDelivered" title="Projects Delivered" />
                                <StatItemCard control={formControl} name="stats.yearsExperience" title="Years Experience" />
                                <StatItemCard control={formControl} name="stats.clientSatisfaction" title="Client Satisfaction" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SERVICES */}
                    <TabsContent value="services">
                        <SectionHeadingCard control={formControl} baseName="servicesPreview.sectionHeading" title="Services Preview" />
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
                                        <FormField control={formControl} name={`industriesWeServe.industries.${index}.iconName`} render={({ field }) => (
                                            <IconSelect field={field} type="industry" label="Icon" />
                                        )} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LEADERSHIP */}
                    <TabsContent value="leadership" className="space-y-6">
                        <SectionHeadingCard control={formControl} baseName="leadership.sectionHeading" title="Leadership" />
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
                                <NestedSocialLinksField control={formControl} />
                            </CardContent>
                        </Card>

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

                    {/* CTA */}
                    <TabsContent value="cta" className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>CTA Section</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="cta.badge" label="Badge Text" />
                                <LocalizedInput control={formControl} name="cta.heading" label="Heading" />
                                <LocalizedInput control={formControl} name="cta.description" label="Description" isTextarea />

                                <FormField control={formControl} name="cta.formId" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Form (Optional)</FormLabel>
                                        <FormSelectorDropdown field={field} />
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Benefits</FormLabel>
                                        <Button type="button" size="sm" variant="outline" onClick={() => appendCtaBenefit({ text: { en: "", ur: "", es: "", ar: "" } })}>
                                            <Plus className="h-4 w-4 mr-2" /> Add
                                        </Button>
                                    </div>
                                    {ctaBenefitsFields.map((field, index) => (
                                        <div key={field.id} className="border rounded p-4 space-y-4">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Benefit {index + 1}</span>
                                                <Button type="button" size="sm" variant="destructive" onClick={() => removeCtaBenefit(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <LocalizedInput control={formControl} name={`cta.benefits.${index}.text`} label="Text" />
                                        </div>
                                    ))}
                                </div>
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

    const selectedPlatforms = fields.map((field: any) => field.platform)

    return (
        <div className="space-y-3 border-l-2 border-primary/20 pl-4">
            <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Social Links</h4>
                <Button type="button" size="sm" variant="outline" onClick={() => append({ platform: "linkedin", url: "" })} disabled={fields.length >= 3}>
                    <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
            </div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                        <FormField control={control} name={`leadership.founder.socialLinks.${index}.platform`} render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                        <SelectItem value="twitter">Twitter</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                        <FormField control={control} name={`leadership.founder.socialLinks.${index}.url`} render={({ field }) => (
                            <FormItem>
                                <FormControl><Input {...field} placeholder="URL" /></FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <Button type="button" size="sm" variant="ghost" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
            ))}
        </div>
    )
}

function FormSelectorDropdown({ field }: { field: any }) {
    const [forms, setForms] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useState(() => {
        async function loadForms() {
            try {
                const { getForms } = await import("@/app/actions/formActions")
                const result = await getForms()
                if (result.success) setForms(result.data || [])
            } catch (e) { console.error(e) } finally { setIsLoading(false) }
        }
        loadForms()
    })

    return (
        <Select onValueChange={(v) => field.onChange(v === "__none__" ? undefined : v)} value={field.value || "__none__"}>
            <FormControl><SelectTrigger><SelectValue placeholder={isLoading ? "Loading..." : "Select form"} /></SelectTrigger></FormControl>
            <SelectContent>
                <SelectItem value="__none__">None</SelectItem>
                {forms.map((f) => <SelectItem key={f._id} value={f._id}>{f.name}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}

function getDefaultValues(): GlobalContentValues {
    return {
        stats: {
            projectsDelivered: { value: { en: "", ur: "", es: "", ar: "" }, label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
            yearsExperience: { value: { en: "", ur: "", es: "", ar: "" }, label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
            clientSatisfaction: { value: { en: "", ur: "", es: "", ar: "" }, label: { en: "", ur: "", es: "", ar: "" }, suffix: "" },
        },
        servicesPreview: { sectionHeading: { title: { en: "", ur: "", es: "", ar: "" } } },
        whyChooseUs: { sectionHeading: { title: { en: "", ur: "", es: "", ar: "" } }, benefits: [] },
        ourApproach: { sectionHeading: { title: { en: "", ur: "", es: "", ar: "" } }, steps: [] },
        industriesWeServe: { sectionHeading: { title: { en: "", ur: "", es: "", ar: "" } }, industries: [] },
        leadership: {
            sectionHeading: { title: { en: "", ur: "", es: "", ar: "" } },
            founder: { name: { en: "", ur: "", es: "", ar: "" }, role: { en: "", ur: "", es: "", ar: "" } },
            agencyStructure: []
        },
        cta: {
            badge: { en: "", ur: "", es: "", ar: "" },
            heading: { en: "", ur: "", es: "", ar: "" },
            description: { en: "", ur: "", es: "", ar: "" },
            benefits: []
        }
    }
}
