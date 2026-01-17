"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { servicesPageContentSchema, ServicesPageContentValues } from "@/lib/validations/services-page-content"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateServicesPageContent } from "@/app/actions/servicesPageContent"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { Save, AlertCircle, Plus, Trash2, GripVertical } from "lucide-react"

interface ServicesPageContentFormProps {
    initialData?: ServicesPageContentValues
}

export function ServicesPageContentForm({ initialData }: ServicesPageContentFormProps) {
    const [isLoading, setIsLoading] = useState(false)

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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2 sm:py-4 border-b">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">Services Page Content</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm">Manage all sections of the services landing page.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {hasErrors && (
                            <div className="flex items-center gap-2 text-destructive text-xs font-semibold px-3 py-1 bg-destructive/10 rounded-full border border-destructive/20">
                                <AlertCircle className="h-3 w-3" />
                                <span className="hidden sm:inline">Missing required info</span>
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

                <Tabs defaultValue="hero" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0 mb-6">
                        <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Hero
                        </TabsTrigger>
                        <TabsTrigger value="intro" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Intro
                        </TabsTrigger>
                        <TabsTrigger value="process" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Process
                        </TabsTrigger>
                        <TabsTrigger value="whyChooseUs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10">
                            Why Choose Us
                        </TabsTrigger>
                    </TabsList>

                    {/* HERO TAB */}
                    <TabsContent value="hero" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Hero Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="hero.title" label="Title" />
                                <LocalizedInput control={formControl} name="hero.subtitle" label="Subtitle" />
                                <LocalizedInput control={formControl} name="hero.description" label="Description" isTextarea />
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
                                <LocalizedInput control={formControl} name="intro.badgeText" label="Badge Text" />
                                <LocalizedInput control={formControl} name="intro.heading" label="Main Heading" />
                                <LocalizedInput control={formControl} name="intro.headingAccent" label="Heading Accent (Highlighted)" />
                                <LocalizedInput control={formControl} name="intro.description" label="Description" isTextarea />
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
                                <LocalizedInput control={formControl} name="process.sectionHeading.eyebrow" label="Eyebrow Text" />
                                <LocalizedInput control={formControl} name="process.sectionHeading.title" label="Title" />
                                <LocalizedInput control={formControl} name="process.sectionHeading.description" label="Description" isTextarea />
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
                                        <LocalizedInput control={formControl} name={`process.steps.${index}.title`} label="Title" />
                                        <LocalizedInput control={formControl} name={`process.steps.${index}.description`} label="Description" isTextarea />
                                        <LocalizedInput control={formControl} name={`process.steps.${index}.duration`} label="Duration" />
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
                                <LocalizedInput control={formControl} name="whyChooseUs.sectionHeading.eyebrow" label="Eyebrow Text" />
                                <LocalizedInput control={formControl} name="whyChooseUs.sectionHeading.title" label="Title" />
                                <LocalizedInput control={formControl} name="whyChooseUs.sectionHeading.description" label="Description" isTextarea />
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
                                        <LocalizedInput control={formControl} name={`whyChooseUs.guaranteePoints.${index}`} label="Guarantee Statement" />
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
                                        <LocalizedInput control={formControl} name={`whyChooseUs.benefits.${index}.title`} label="Title" />
                                        <LocalizedInput control={formControl} name={`whyChooseUs.benefits.${index}.description`} label="Description" isTextarea />
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
            </form>
        </Form>
    )
}
