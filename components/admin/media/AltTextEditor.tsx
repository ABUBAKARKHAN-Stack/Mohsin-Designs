"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Languages, Save } from "lucide-react"
import { updateImageAltText } from "@/app/actions/mediaActions"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"

interface AltTextEditorProps {
    isOpen: boolean
    onClose: () => void
    asset: {
        _id: string
        url: string
        originalFilename?: string
        altText?: any
        caption?: any
    }
    onUpdate: () => void
}

export function AltTextEditor({ isOpen, onClose, asset, onUpdate }: AltTextEditorProps) {
    const [selectedLang, setSelectedLang] = useState("en")
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm({
        defaultValues: {
            altText: asset.altText || {},
            caption: asset.caption || {},
        }
    })

    async function onSubmit(values: any) {
        // Validate that ALL languages have alt text
        const missingLanguages = []
        if (!values.altText?.en) missingLanguages.push('English')
        if (!values.altText?.ur) missingLanguages.push('Urdu')
        if (!values.altText?.es) missingLanguages.push('Spanish')
        if (!values.altText?.ar) missingLanguages.push('Arabic')

        if (missingLanguages.length > 0) {
            errorToast(`Missing alt text for: ${missingLanguages.join(', ')}`)
            return
        }

        setIsLoading(true)
        try {
            const result = await updateImageAltText(asset._id, values.altText, values.caption)
            if (result.success) {
                successToast("Alt text updated successfully")
                onUpdate()
                onClose()
            } else {
                errorToast(result.error || "Failed to update alt text")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[calc(100vh-10rem)] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Alt Text & Caption</DialogTitle>
                    <DialogDescription>
                        Add accessibility text for: {asset.originalFilename}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Language Selector */}
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border w-fit">
                            <div className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground border-r pr-2 uppercase">
                                <Languages className="h-3.5 w-3.5" />
                                <span>Language</span>
                            </div>
                            <Select value={selectedLang} onValueChange={setSelectedLang}>
                                <SelectTrigger className="h-8 border-none bg-transparent shadow-none focus:ring-0 min-w-[120px] font-display">
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

                        {/* Locale Status Indicators */}
                        <div className="bg-muted/50 p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold">Language Coverage</h3>
                                <span className="text-xs text-muted-foreground">
                                    {[asset.altText?.en, asset.altText?.ur, asset.altText?.es, asset.altText?.ar].filter(Boolean).length}/4 languages
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { code: 'en', label: 'English' },
                                    { code: 'ur', label: 'Urdu' },
                                    { code: 'es', label: 'Spanish' },
                                    { code: 'ar', label: 'Arabic' }
                                ].map(locale => {
                                    const hasAltText = form.watch(`altText.${locale.code}` as any)
                                    return (
                                        <div
                                            key={locale.code}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-md border-2 transition-all ${hasAltText
                                                ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400'
                                                : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400'
                                                }`}
                                        >
                                            <span className="text-xs font-bold uppercase">{locale.code}</span>
                                            <span className="text-xs font-medium">{locale.label}</span>
                                            {hasAltText ? (
                                                <span className="text-xs">✓</span>
                                            ) : (
                                                <span className="text-xs">✗</span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            {(!form.watch('altText.en') || !form.watch('altText.ur') || !form.watch('altText.es') || !form.watch('altText.ar')) && (
                                <p className="text-xs text-destructive mt-2 font-medium">
                                    ⚠️ All 4 languages are required for accessibility
                                </p>
                            )}
                        </div>

                        {/* Alt Text Input */}
                        <LocalizedInput
                            control={form.control}
                            name="altText"
                            label={<>Alt Text <span className="text-destructive">*</span></>}
                            activeLang={selectedLang}
                            placeholder="Describe the image for screen readers..."
                        />

                        {/* Caption Input */}
                        <LocalizedInput
                            control={form.control}
                            name="caption"
                            label="Caption (Optional)"
                            activeLang={selectedLang}
                            isTextarea
                            placeholder="Optional caption for the image..."
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Alt Text
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
