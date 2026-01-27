"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { siteSettingsSchema, SiteSettingsValues } from "@/lib/validations/site-settings"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/form/ImageUpload"
import { Spinner } from "@/components/ui/spinner"
import { SEOKeywordsInput } from "@/components/admin/form/SEOKeywordsInput"
import { updateSiteSettings } from "@/app/actions/siteSettings"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Save, Globe, Info, Mail, Share2, Scale, AlertCircle, Languages, Menu as MenuIcon, ExternalLink } from "lucide-react"
import { useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

interface SiteSettingsFormProps {
    initialData?: SiteSettingsValues
    menus: any[]
}

const hasLangError = (error: any, lang: string): boolean => {
    if (!error) return false;

    // If it's a localized error object (has language sub-keys)
    // We check if the specific language has an error
    const isLocalized = error.en || error.ur || error.es || error.ar;
    if (isLocalized) {
        return !!error[lang];
    }

    // If it's a direct field error (has message/type, e.g. email, phone, logo)
    if (error.message || error.type) return true;

    // Recurse for nested objects (like seo, contact)
    if (typeof error === 'object') {
        return Object.values(error).some(child => hasLangError(child, lang));
    }
    return false;
}

export function SiteSettingsForm({ initialData, menus: initialMenus }: SiteSettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedLang, setSelectedLang] = useState("en")

    const form = useForm<SiteSettingsValues>({
        resolver: zodResolver(siteSettingsSchema) as any,
        defaultValues: initialData || {
            siteName: { en: "", ur: "", es: "", ar: "" },
            tagline: { en: "", ur: "", es: "", ar: "" },
            logo: undefined as any,
            favicon: undefined as any,
            seo: {
                metaTitle: { en: "", ur: "", es: "", ar: "" },
                metaDescription: { en: "", ur: "", es: "", ar: "" },
                keywords: [],
                schema: ""
            },
            social: { facebook: "", twitter: "", linkedin: "", instagram: "" },
            contact: { email: "", phone: "", address: { en: "", ur: "", es: "", ar: "" } },
            footerText: { en: "", ur: "", es: "", ar: "" },
            copyright: { en: "", ur: "", es: "", ar: "" },
            headerMenu: { _type: 'reference', _ref: "" },
            footerMenu: { _type: 'reference', _ref: "" },
        } as SiteSettingsValues,
    })

    const [menus] = useState<any[]>(initialMenus || [])


    const formControl = form.control as any

    async function onSubmit(values: SiteSettingsValues) {        

        setIsLoading(true)
        try {
            const result = await updateSiteSettings(values)
            if (result.success) {
                successToast("Site settings updated successfully")
            } else {
                errorToast(result.error || "Failed to update site settings")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const formErrors = form.formState.errors;

    // Check for form errors to show a global message if needed
    const hasErrors = Object.keys(formErrors).length > 0

    // Tab-specific error detection
    const tabErrors = {
        branding: !!(formErrors.siteName || formErrors.tagline || formErrors.logo || formErrors.favicon),
        seo: !!formErrors.seo,
        contact: !!formErrors.contact,
        social: !!formErrors.social,
        footer: !!(formErrors.footerText || formErrors.copyright),
        menu: !!(formErrors.headerMenu || formErrors.footerMenu),
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2 sm:py-4 border-b">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">Site Settings</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm">Manage global configurations for your website.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                            <div className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground border-r pr-2 shadow-sm">
                                <Languages className="h-3.5 w-3.5" />
                                <span>Language</span>
                            </div>
                            <Select value={selectedLang} onValueChange={setSelectedLang}>
                                <SelectTrigger className="h-8 border-none bg-transparent shadow-none focus:ring-0 min-w-[110px]">
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
                        {hasErrors && (
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-2 text-destructive text-xs font-semibold px-3 py-1 bg-destructive/10 rounded-full border border-destructive/20 animate-in fade-in slide-in-from-right-2">
                                    <AlertCircle className="h-3 w-3" />
                                    <span className="hidden sm:inline">Missing required info</span>
                                    <span className="sm:hidden">Missing info</span>
                                </div>
                                <div className="text-[10px] text-destructive italic max-w-[200px] text-right hidden sm:block">
                                    Check {selectedLang.toUpperCase()}: {
                                        Object.entries(formErrors)
                                            .filter(([_, error]) => hasLangError(error, selectedLang))
                                            .map(([key, _]) => {
                                                if (key === 'siteName') return 'Site Name';
                                                if (key === 'footerText') return 'Footer Text';
                                                return key.charAt(0).toUpperCase() + key.slice(1);
                                            })
                                            .join(", ")
                                    }
                                </div>
                            </div>
                        )}
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto min-w-[120px] h-9 sm:h-10 text-sm sm:text-base">
                            {isLoading ? (
                                <>
                                    <Spinner className="mr-2 h-4 w-4" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Settings
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="branding" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-transparent p-0 mb-6">
                        <TabsTrigger
                            value="branding"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10 px-4 relative"
                        >
                            <Info className="h-4 w-4 mr-2 hidden sm:inline" /> Branding
                            {tabErrors.branding && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                        </TabsTrigger>
                        <TabsTrigger
                            value="menu"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10 px-4 relative"
                        >
                            <MenuIcon className="h-4 w-4 mr-2 hidden sm:inline" /> Menu
                            {tabErrors.menu && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                        </TabsTrigger>
                        <TabsTrigger
                            value="seo"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10 px-4 relative"
                        >
                            <Globe className="h-4 w-4 mr-2 hidden sm:inline" /> SEO
                            {tabErrors.seo && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                        </TabsTrigger>
                        <TabsTrigger
                            value="contact"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10 px-4 relative"
                        >
                            <Mail className="h-4 w-4 mr-2 hidden sm:inline" /> Contact
                            {tabErrors.contact && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                        </TabsTrigger>
                        <TabsTrigger
                            value="social"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10 px-4 relative"
                        >
                            <Share2 className="h-4 w-4 mr-2 hidden sm:inline" /> Social
                            {tabErrors.social && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                        </TabsTrigger>
                        <TabsTrigger
                            value="footer"
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border h-10 px-4 relative"
                        >
                            <Scale className="h-4 w-4 mr-2 hidden sm:inline" /> Footer
                            {tabErrors.footer && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="branding" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Site Identity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="siteName" label="Site Name" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="tagline" label="Tagline" activeLang={selectedLang} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ImageUpload
                                        value={form.watch('logo') as any}
                                        label="Site Logo"
                                        onChange={(asset) => {
                                            console.log(asset);
                                            
                                            if (!asset) {
                                                form.setValue('logo', null as any)
                                                return
                                            }
                                            form.setValue('logo', {
                                                _type: 'image',
                                                asset: {
                                                    _type: 'reference',
                                                    _ref: asset._id || asset.id,
                                                },
                                                url: asset.url
                                            })
                                        }}
                                    />

                                    <ImageUpload
                                        value={form.watch('favicon') as any}
                                        label="Favicon"
                                        onChange={(asset) => {
                                            if (!asset) {
                                                form.setValue('favicon', null as any)
                                                return
                                            }
                                            form.setValue('favicon', {
                                                _type: 'image',
                                                asset: {
                                                    _type: 'reference',
                                                    _ref: asset._id || asset.id,
                                                },
                                                url: asset.url
                                            })
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Default SEO Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <LocalizedInput control={formControl} name="seo.metaTitle" label="Default Meta Title" activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="seo.metaDescription" label="Default Meta Description" isTextarea activeLang={selectedLang} />
                                <SEOKeywordsInput control={formControl} name="seo.keywords" label="Global Keywords" externalActiveLang={selectedLang} />
                                <FormField
                                    control={formControl}
                                    name="seo.schema"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Global Schema Markup (JSON-LD)</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ""} placeholder='{"@type": "Organization", ...}' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={formControl}
                                        name="contact.email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Support Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="hello@mohsinaijaz.com" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formControl}
                                        name="contact.phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="+1 (234) 567-890" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <LocalizedInput control={formControl} name="contact.address" label="Office Address" isTextarea activeLang={selectedLang} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Media Profiles</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={formControl}
                                        name="social.facebook"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Facebook URL</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="https://facebook.com/..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formControl}
                                        name="social.twitter"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Twitter (X) URL</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="https://twitter.com/..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formControl}
                                        name="social.linkedin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>LinkedIn URL</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="https://linkedin.com/in/..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formControl}
                                        name="social.instagram"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Instagram URL</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="https://instagram.com/..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="footer" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Footer & Legal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <LocalizedInput control={formControl} name="footerText" label="Footer About Text" isTextarea activeLang={selectedLang} />
                                <LocalizedInput control={formControl} name="copyright" label="Copyright Notice" activeLang={selectedLang} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="menu" className="space-y-6">
                        <Card className="border-2 border-primary/20 shadow-md">
                            <CardHeader className="bg-primary/5 border-b py-4">
                                <CardTitle className="text-xl">Menu Management</CardTitle>
                                <CardDescription>Assign specific menu documents to the website navigation areas.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={formControl}
                                        name="headerMenu._ref"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <FormLabel className="text-base font-bold">Header Menu</FormLabel>
                                                    <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs">
                                                        <Link href="/admin/menus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                            Manage Menus <ExternalLink className="h-3 w-3" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="h-12 text-base">
                                                            <SelectValue placeholder="Select a menu for Header" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {menus.filter(menu => menu.location === 'header').map((menu) => (
                                                                <SelectItem key={menu._id} value={menu._id}>
                                                                    {menu.title}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormDescription>
                                                    This menu will appear in the main navigation bar at the top of the site.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={formControl}
                                        name="footerMenu._ref"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <FormLabel className="text-base font-bold">Footer Menu</FormLabel>
                                                    <Button variant="link" size="sm" asChild className="h-auto p-0 text-xs">
                                                        <Link
                                                            href="/admin/menus"
                                                            target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                            Manage Menus <ExternalLink className="h-3 w-3" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="h-12 text-base">
                                                            <SelectValue placeholder="Select a menu for Footer" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {menus.filter(menu => menu.location === 'footer').map((menu) => (
                                                                <SelectItem key={menu._id} value={menu._id}>
                                                                    {menu.title}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormDescription>
                                                    This menu will appear in the website footer.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </Form>
    )
}
