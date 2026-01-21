"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { servicesPageContentSchema, ServicesPageContentValues } from "@/lib/validations/services-page-content"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateServicesPageContent, saveServicesPageDraft } from "@/app/actions/servicesPageContent"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, GripVertical, Clock } from "lucide-react"
import { debounce } from "lodash"
import { useCallback, useEffect } from "react"

interface ServicesPageContentFormProps {
    initialData?: ServicesPageContentValues
    hasDraft?: boolean
    draftUpdatedAt?: string | null
}

export function ServicesPageContentForm({ initialData, hasDraft, draftUpdatedAt }: ServicesPageContentFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(
        draftUpdatedAt ? new Date(draftUpdatedAt) : null
    )
    const [selectedLang, setSelectedLang] = useState("en")
    const [isInitialMount, setIsInitialMount] = useState(true)

    const form = useForm<ServicesPageContentValues>({
        resolver: zodResolver(servicesPageContentSchema),
        defaultValues: initialData || {
            hero: {
                title: { en: "", ur: "", es: "", ar: "" },
                subtitle: { en: "", ur: "", es: "", ar: "" },
                description: { en: "", ur: "", es: "", ar: "" },
            },
            intro: {
                badgeText: { en: "", ur: "", es: "", ar: "" },
                heading: { en: "", ur: "", es: "", ar: "" },
                headingAccent: { en: "", ur: "", es: "", ar: "" },
                description: { en: "", ur: "", es: "", ar: "" },
            },
            process: {
                sectionHeading: {
                    eyebrow: { en: "", ur: "", es: "", ar: "" },
                    title: { en: "", ur: "", es: "", ar: "" },
                    description: { en: "", ur: "", es: "", ar: "" },
                },
                steps: [],
            },
            whyChooseUs: {
                sectionHeading: {
                    eyebrow: { en: "", ur: "", es: "", ar: "" },
                    title: { en: "", ur: "", es: "", ar: "" },
                    description: { en: "", ur: "", es: "", ar: "" },
                },
                guaranteePoints: [],
                benefits: [],
            },
        },
    })

    const formControl = form.control as any

    // Auto-save draft functionality
    const saveDraft = useCallback(
        debounce(async (data: Partial<ServicesPageContentValues>) => {
            if (isInitialMount) return
            setIsSavingDraft(true)
            try {
                const result = await saveServicesPageDraft(data)
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
            saveDraft(value as Partial<ServicesPageContentValues>)
        })
        return () => subscription.unsubscribe()
    }, [form, saveDraft])

    // Field arrays
    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control: formControl,
        name: "process.steps",
    })

    const { fields: guaranteeFields, append: appendGuarantee, remove: removeGuarantee } = useFieldArray({
        control: formControl,
        name: "whyChooseUs.guaranteePoints",
    })

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control: formControl,
        name: "whyChooseUs.benefits",
    })

    async function onSubmit(values: ServicesPageContentValues) {
        setIsLoading(true)
        try {
            const result = await updateServicesPageContent(values)
            if (result.success) {
                successToast("Services page content updated successfully")
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

    const formErrors = form.formState.errors
    const hasErrors = Object.keys(formErrors).length > 0

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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2 sm:py-4 border-b">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">Services Page Content</h1>
                        <div className="flex items-center gap-3 text-muted-foreground text-xs sm:text-sm mt-1">
                            <p className="hidden sm:inline">Manage all sections of the services landing page.</p>
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
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">Language:</span>
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
                                <div className="flex items-center gap-2 text-destructive text-xs font-semibold px-3 py-1 bg-destructive/10 rounded-full border border-destructive/20">
                                    <AlertCircle className="h-3 w-3" />
                                    <span>Fix {selectedLang.toUpperCase()} errors</span>
                                </div>
                            )}
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto min-w-[120px]">
                                {isLoading ? (
                                    <>
                                        <Spinner className="mr-2 h-4 w-4" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Content
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div >

                <Tabs defaultValue="hero" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0 mb-6">
                        <TabsTrigger value="hero" className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Hero
                            {!!formErrors.hero && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="intro" className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Intro
                            {!!formErrors.intro && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="process" className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Process
                            {!!formErrors.process && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="whyChooseUs" className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Why Choose Us
                            {!!formErrors.whyChooseUs && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* HERO TAB */}
                    <TabsContent value="hero" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Hero Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="hero.title" label="Title" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="hero.subtitle" label="Subtitle" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="hero.description" label="Description" isTextarea activeLang={selectedLang} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* INTRO TAB */}
                    <TabsContent value="intro" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Introduction Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="intro.badgeText" label="Badge Text" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="intro.heading" label="Main Heading" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="intro.headingAccent" label="Heading Accent (Highlighted)" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="intro.description" label="Description" isTextarea activeLang={selectedLang} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* PROCESS TAB */}
                    <TabsContent value="process" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Heading</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="process.sectionHeading.eyebrow" label="Eyebrow Text" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="process.sectionHeading.title" label="Title" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="process.sectionHeading.description" label="Description" isTextarea activeLang={selectedLang} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Process Steps</CardTitle>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendStep({
                                        title: { en: "", ur: "", es: "", ar: "" },
                                        description: { en: "", ur: "", es: "", ar: "" },
                                        duration: { en: "", ur: "", es: "", ar: "" },
                                        iconName: "",
                                    })}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Step
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {stepFields.map((field, index) => (
                                    <div key={field.id} className="border rounded-lg p-4 space-y-4 relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm">Step {index + 1}</span>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeStep(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`process.steps.${index}.title`} label="Title" activeLang={selectedLang} />
                                        <LocalizedInput control={formControl} name={`process.steps.${index}.description`} label="Description" isTextarea activeLang={selectedLang} />
                                        <LocalizedInput control={formControl} name={`process.steps.${index}.duration`} label="Duration" activeLang={selectedLang} />
                                        <FormField
                                            control={formControl}
                                            name={`process.steps.${index}.iconName`}
                                            render={({ field }) => (
                                                <IconSelect field={field} type="process" label="Icon" />
                                            )}
                                        />
                                    </div>
                                ))}
                                {stepFields.length === 0 && (
                                    <p className="text-muted-foreground text-sm text-center py-8">No steps added yet. Click "Add Step" to create one.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* WHY CHOOSE US TAB */}
                    <TabsContent value="whyChooseUs" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Section Heading</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="whyChooseUs.sectionHeading.eyebrow" label="Eyebrow Text" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="whyChooseUs.sectionHeading.title" label="Title" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="whyChooseUs.sectionHeading.description" label="Description" isTextarea activeLang={selectedLang} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Guarantee Points</CardTitle>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendGuarantee({ en: "", ur: "", es: "", ar: "" })}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Point
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {guaranteeFields.map((field, index) => (
                                    <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm">Point {index + 1}</span>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeGuarantee(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`whyChooseUs.guaranteePoints.${index}`} label="Guarantee Statement" activeLang={selectedLang} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Benefits</CardTitle>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendBenefit({
                                        title: { en: "", ur: "", es: "", ar: "" },
                                        description: { en: "", ur: "", es: "", ar: "" },
                                        iconName: "",
                                    })}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Benefit
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {benefitFields.map((field, index) => (
                                    <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm">Benefit {index + 1}</span>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeBenefit(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <LocalizedInput control={formControl} name={`whyChooseUs.benefits.${index}.title`} label="Title" activeLang={selectedLang} />
                                        <LocalizedInput control={formControl} name={`whyChooseUs.benefits.${index}.description`} label="Description" isTextarea activeLang={selectedLang} />
                                        <FormField
                                            control={formControl}
                                            name={`whyChooseUs.benefits.${index}.iconName`}
                                            render={({ field }) => (
                                                <IconSelect field={field} type="benefit" label="Icon" />
                                            )}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form >
        </Form >
    )
}
