"use client"

import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { IconSelect } from "@/components/admin/form/IconSelect"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StatItemCard, SectionHeadingCard } from "./SharedFormComponents"
import { Plus, Trash2, ExternalLink, Globe, Info, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface GlobalSectionsFormTabsProps {
    control: any
    errors: any
    mode?: 'global' | 'shared'
    activeLang?: string
}

export function GlobalSectionsFormTabs({ control, errors, mode = 'shared', activeLang }: GlobalSectionsFormTabsProps) {
    // Field arrays
    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: "whyChooseUs.benefits",
    })

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control,
        name: "faqs.faqItems",
    })

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "ourApproach.steps",
    })

    const { fields: industryFields, append: appendIndustry, remove: removeIndustry } = useFieldArray({
        control,
        name: "industriesWeServe.industries",
    })

    const { fields: agencyStructureFields, append: appendAgencyTeam, remove: removeAgencyTeam } = useFieldArray({
        control,
        name: "leadership.agencyStructure",
    })

    const { fields: ctaBenefitsFields, append: appendCtaBenefit, remove: removeCtaBenefit } = useFieldArray({
        control,
        name: "cta.benefits",
    })

    const isSharedMode = mode === 'shared';

    // Helper to check if any field in a list has an error
    const hasTabError = (fields: string[]) => {
        return fields.some(field => {
            if (field.includes('.')) {
                const [parent, child] = field.split('.')
                return !!(errors as any)[parent]?.[child] || !!(errors as any)[parent]
            }
            return !!(errors as any)[field]
        })
    }

    return (
        <Tabs defaultValue="stats" className="w-full">
            <div className="relative mb-6">
                <TabsList className="flex w-full h-auto flex-wrap gap-1 p-1 bg-muted/50 rounded-lg justify-start">
                    <TabsTrigger value="stats" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        Stats
                        {hasTabError(['stats']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="services" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        Services
                        {hasTabError(['servicesPreview']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="whyUs" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        Why Us
                        {hasTabError(['whyChooseUs']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="approach" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        Approach
                        {hasTabError(['ourApproach']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="industries" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        Industries
                        {hasTabError(['industriesWeServe']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="faqs" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        FAQs
                        {hasTabError(['faqs']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="leadership" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        Leadership
                        {hasTabError(['leadership']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="cta" className="relative px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10">
                        CTA
                        {hasTabError(['cta']) && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                        )}
                    </TabsTrigger>
                </TabsList>
            </div>
            <div className="shadow-lg">
                <div className="bg-card rounded-lg p-4 relative min-h-[400px]">
                    {/* Header Info Banner for Shared Mode */}
                    {isSharedMode && (
                        <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                                    Global Shared Section
                                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 bg-primary/10 border-primary/20">Sync Active</Badge>
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                    This content is <strong>shared across multiple pages</strong>. Any changes you make here will automatically update the Landing Page, About Page, and other relevant sections.
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                    <Button asChild variant="link" size="sm" className="h-auto p-0 text-primary hover:text-primary/80 font-semibold text-xs transition-all">
                                        <Link href="/admin/global-sections" className="flex items-center gap-1.5">
                                            Manage everything in one hub <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                    <span className="text-muted-foreground/30 text-xs">|</span>
                                    <span className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                                        <Info className="h-3 w-3" />
                                        User-friendly Tip: Focus on cross-page consistency.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isSharedMode && (
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/5 backdrop-blur-sm text-primary border-primary/20 gap-1.5 py-1.5 px-3 whitespace-nowrap">
                                <Globe className="h-3.5 w-3.5" />
                                Core Global Control
                            </Badge>
                        </div>
                    )}

                    {/* STATS */}
                    <TabsContent value="stats" className="mt-0 focus-visible:outline-none">
                        <div className="space-y-6 pt-2">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Statistics Section</h3>
                                <p className="text-sm text-muted-foreground">Manage the three core metrics displayed across the site.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 pt-4">
                                <StatItemCard control={control} name="stats.projectsDelivered" title="Projects Delivered" activeLang={activeLang} />
                                <StatItemCard control={control} name="stats.yearsExperience" title="Years Experience" activeLang={activeLang} />
                                <StatItemCard control={control} name="stats.clientSatisfaction" title="Client Satisfaction" activeLang={activeLang} />
                            </div>
                        </div>
                    </TabsContent>

                    {/* SERVICES PREVIEW */}
                    <TabsContent value="services" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <SectionHeadingCard control={control} baseName="servicesPreview.sectionHeading" title="Services Preview" activeLang={activeLang} />
                        <Card>
                            <CardHeader><CardTitle>Services List</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Individual services are managed separately in the <strong>Services</strong> section.
                                    They are automatically pulled into this preview section to maintain a dynamic and synced workflow.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* WHY CHOOSE US */}
                    <TabsContent value="whyUs" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <SectionHeadingCard control={control} baseName="whyChooseUs.sectionHeading" title="Why Choose Us" activeLang={activeLang} />
                        <Card shadow-none border-dashed>
                            <CardHeader className="flex flex-row justify-between items-center py-4">
                                <CardTitle className="text-lg">Core Benefits</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendBenefit({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })} className="bg-background">
                                    <Plus className="h-4 w-4 mr-2" /> Add Benefit
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                {benefitFields.length === 0 && (
                                    <div className="text-center py-6 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                        No benefits added yet. Click "Add Benefit" to get started.
                                    </div>
                                )}
                                {benefitFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4 hover:border-primary/40 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm bg-primary/10 px-2 py-0.5 rounded text-primary">Benefit {index + 1}</span>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeBenefit(index)} className="text-destructive hover:bg-destructive">
                                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                            </Button>
                                        </div>
                                        <div className="grid gap-4">
                                            <LocalizedInput control={control} name={`whyChooseUs.benefits.${index}.title`} label="Title" activeLang={activeLang} />
                                            <LocalizedInput control={control} name={`whyChooseUs.benefits.${index}.description`} label="Description" isTextarea activeLang={activeLang} />
                                            <FormField control={control} name={`whyChooseUs.benefits.${index}.iconName`} render={({ field }) => (
                                                <IconSelect field={field} type="benefit" label="Visual Icon" />
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* OUR APPROACH */}
                    <TabsContent value="approach" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <SectionHeadingCard control={control} baseName="ourApproach.sectionHeading" title="Our Approach" activeLang={activeLang} />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center py-4">
                                <CardTitle className="text-lg">Strategic Steps</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendStep({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })} className="bg-background">
                                    <Plus className="h-4 w-4 mr-2" /> Add Step
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                {stepFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4 hover:border-primary/40 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm bg-primary/10 px-2 py-0.5 rounded text-primary">Step {index + 1}</span>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeStep(index)} className="text-destructive hover:bg-destructive">
                                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                            </Button>
                                        </div>
                                        <div className="grid gap-4">
                                            <LocalizedInput control={control} name={`ourApproach.steps.${index}.title`} label="Step Name" activeLang={activeLang} />
                                            <LocalizedInput control={control} name={`ourApproach.steps.${index}.description`} label="Process Description" isTextarea activeLang={activeLang} />
                                            <FormField control={control} name={`ourApproach.steps.${index}.iconName`} render={({ field }) => (
                                                <IconSelect field={field} type="step" label="Visual Icon" />
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* INDUSTRIES */}
                    <TabsContent value="industries" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <SectionHeadingCard control={control} baseName="industriesWeServe.sectionHeading" title="Industries We Serve" activeLang={activeLang} />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center py-4">
                                <CardTitle className="text-lg">Industry Sectors</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendIndustry({ name: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })} className="bg-background">
                                    <Plus className="h-4 w-4 mr-2" /> Add Industry
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                {industryFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4 hover:border-primary/40 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm bg-primary/10 px-2 py-0.5 rounded text-primary">Industry {index + 1}</span>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeIndustry(index)} className="text-destructive hover:bg-destructive">
                                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                            </Button>
                                        </div>
                                        <div className="grid gap-4">
                                            <LocalizedInput control={control} name={`industriesWeServe.industries.${index}.name`} label="Industry Name" activeLang={activeLang} />
                                            <LocalizedInput control={control} name={`industriesWeServe.industries.${index}.description`} label="Sector Description" isTextarea activeLang={activeLang} />
                                            <FormField control={control} name={`industriesWeServe.industries.${index}.iconName`} render={({ field }) => (
                                                <IconSelect field={field} type="industry" label="Visual Icon" />
                                            )} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* FAQS */}
                    <TabsContent value="faqs" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <SectionHeadingCard control={control} baseName="faqs.sectionHeading" title="Frequently Asked Questions" activeLang={activeLang} />
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center py-4">
                                <CardTitle className="text-lg">Q&A Items</CardTitle>
                                <Button type="button" size="sm" variant="outline" onClick={() => appendFaq({ question: { en: "", ur: "", es: "", ar: "" }, answer: { en: "", ur: "", es: "", ar: "" } })} className="bg-background">
                                    <Plus className="h-4 w-4 mr-2" /> Add Question
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                {faqFields.map((field, index) => (
                                    <div key={field.id} className="border rounded p-4 space-y-4 hover:border-primary/40 transition-colors shadow-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm bg-primary/10 px-2 py-0.5 rounded text-primary border border-primary/20">FAQ {index + 1}</span>
                                            <Button type="button" size="sm" variant="ghost" onClick={() => removeFaq(index)} className="text-destructive hover:bg-destructive">
                                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                                            </Button>
                                        </div>
                                        <div className="grid gap-4">
                                            <LocalizedInput control={control} name={`faqs.faqItems.${index}.question`} label="Question" activeLang={activeLang} />
                                            <LocalizedInput control={control} name={`faqs.faqItems.${index}.answer`} label="Detailed Answer" isTextarea activeLang={activeLang} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card className="border-t-4 border-t-primary/40">
                            <CardHeader className="py-4"><CardTitle className="text-lg flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> Support Redirect Button</CardTitle></CardHeader>
                            <CardContent className="space-y-4 px-6 pb-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <LocalizedInput control={control} name="faqs.buttonText" label="Button Label (e.g. Contact Support)" activeLang={activeLang} />
                                    <LocalizedInput control={control} name="faqs.buttonUrl" label="Destination URL" isUrl activeLang={activeLang} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LEADERSHIP */}
                    <TabsContent value="leadership" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <SectionHeadingCard control={control} baseName="leadership.sectionHeading" title="Leadership & Team" activeLang={activeLang} />
                        <div className="grid lg:grid-cols-12 gap-6 items-start">
                            <Card className="lg:col-span-5 shadow-sm border-2">
                                <CardHeader className="bg-primary/5 py-3 border-b"><CardTitle className="text-lg flex items-center gap-2 text-primary"><Globe className="h-4 w-4" /> Founder Information</CardTitle></CardHeader>
                                <CardContent className="space-y-4 pt-6 p-6">
                                    <LocalizedInput control={control} name="leadership.founder.name" label="Full Name" activeLang={activeLang} />
                                    <LocalizedInput control={control} name="leadership.founder.role" label="Official Position/Title" activeLang={activeLang} />
                                    <div className="space-y-4 pt-2">
                                        <FormLabel className="text-sm font-bold text-foreground/80">Founder Profile Image</FormLabel>
                                        <FormField control={control} name="leadership.founder.image" render={({ field }) => (
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
                                                                asset: { _type: 'reference', _ref: asset._id || asset.id },
                                                                url: asset.url
                                                            })
                                                        }}
                                                        label="Profile Picture"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-7">
                                <CardHeader className="flex flex-row justify-between items-center py-4">
                                    <CardTitle className="text-lg">Agency Structure</CardTitle>
                                    <Button type="button" size="sm" variant="outline" onClick={() => appendAgencyTeam({ title: { en: "", ur: "", es: "", ar: "" }, description: { en: "", ur: "", es: "", ar: "" }, iconName: "" })} className="bg-background">
                                        <Plus className="h-4 w-4 mr-2" /> Add Team Block
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {agencyStructureFields.map((field, index) => (
                                        <div key={field.id} className="border rounded-lg p-4 space-y-4 hover:border-primary/40 transition-shadow shadow-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-sm bg-primary/10 px-3 py-1 rounded-full text-primary">Team Group {index + 1}</span>
                                                <Button type="button" size="sm" variant="ghost" onClick={() => removeAgencyTeam(index)} className="text-destructive hover:bg-destructive">
                                                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                                                </Button>
                                            </div>
                                            <div className="grid gap-4">
                                                <LocalizedInput control={control} name={`leadership.agencyStructure.${index}.title`} label="Group Title (e.g. Design Team)" activeLang={activeLang} />
                                                <LocalizedInput control={control} name={`leadership.agencyStructure.${index}.description`} label="Team Overview" isTextarea activeLang={activeLang} />
                                                <FormField control={control} name={`leadership.agencyStructure.${index}.iconName`} render={({ field }) => (
                                                    <IconSelect field={field} type="benefit" label="Aesthetic Group Icon" />
                                                )} />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* CTA */}
                    <TabsContent value="cta" className="mt-0 space-y-6 focus-visible:outline-none pt-2">
                        <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="px-0 pt-0 border-b pb-4 mb-6">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-primary" />
                                    Call-To-Action Strategic Content
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">This high-impact section drives conversions across the entire platform.</p>
                            </CardHeader>
                            <CardContent className="px-0 space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <LocalizedInput control={control} name="cta.badge" label="Marketing Badge (e.g. Limited Offer)" activeLang={activeLang} />
                                        <LocalizedInput control={control} name="cta.heading" label="Primary Punchy Heading" activeLang={activeLang} />
                                        <LocalizedInput control={control} name="cta.description" label="Persuasive Subtext" isTextarea activeLang={activeLang} />
                                    </div>
                                    <div className="p-5 rounded-xl border-2 border-dashed border-primary/20 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-primary flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Value Props / Benefits</h3>
                                            <Button type="button" size="sm" variant="outline" onClick={() => appendCtaBenefit({ text: { en: "", ur: "", es: "", ar: "" } })} className="bg-background">
                                                <Plus className="h-3 w-3 mr-1.5" /> Add
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground italic mb-2">Bullet points that highlight immediate value to the user.</p>
                                        <div className="space-y-3">
                                            {ctaBenefitsFields.map((field, index) => (
                                                <div key={field.id} className="flex gap-2 items-start group">
                                                    <div className="flex-1 bg-background px-3 py-2 rounded-lg border focus-within:border-primary/40 transition-all">
                                                        <LocalizedInput control={control} name={`cta.benefits.${index}.text`} label={`Point ${index + 1}`} activeLang={activeLang} />
                                                    </div>
                                                    <Button type="button" size="sm" variant="destructive" onClick={() => removeCtaBenefit(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {ctaBenefitsFields.length === 0 && (
                                                <div className="text-center py-4 text-muted-foreground/50 text-[11px] border rounded bg-background/50">
                                                    No benefits defined for CTA.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Card className="border-t-4 border-t-primary bg-primary/5">
                                    <CardHeader className="py-4">
                                        <CardTitle className="text-lg flex items-center gap-2"><Database className="h-4 w-4" /> Conversion Form Sync</CardTitle>
                                        <CardDescription>Select the form that should capture user data in this specific CTA block.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-6">
                                        <FormField control={control} name="cta.formId" render={({ field }) => (
                                            <FormItem className="max-w-md">
                                                <FormLabel>Integrated Contact Form</FormLabel>
                                                <FormSelectorDropdown field={field} />
                                                <FormMessage />
                                                <FormDescription className="text-[10px] mt-1 italic">Forms are managed in the dynamic forms builder dashboard.</FormDescription>
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    )
}

function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}

function Database(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
    )
}

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

    return (
        <Select onValueChange={(v) => field.onChange(v === "__none__" ? undefined : v)} value={field.value || "__none__"}>
            <FormControl><SelectTrigger><SelectValue placeholder={isLoading ? "Loading..." : "Click to select a form"} /></SelectTrigger></FormControl>
            <SelectContent>
                <SelectItem value="__none__" className="text-muted-foreground italic">Default generic contact form</SelectItem>
                {forms.map((f: any) => <SelectItem key={f._id} value={f._id}>{f.name}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}
