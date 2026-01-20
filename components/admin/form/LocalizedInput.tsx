"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Control } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Link } from "lucide-react"

interface LocalizedInputProps {
    control: Control<any>
    name: string
    label: string
    isTextarea?: boolean
    isUrl?: boolean
    className?: string
    noBorder?: boolean
    compact?: boolean
    optional?: boolean
}

const LANGUAGES = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ur', label: 'Urdu', dir: 'rtl' },
    { code: 'es', label: 'Spanish', dir: 'ltr' },
    { code: 'ar', label: 'Arabic', dir: 'rtl' },
]

import { useFormContext } from "react-hook-form"

export function LocalizedInput({
    control,
    name,
    label,
    isTextarea = false,
    isUrl = false,
    className,
    noBorder,
    compact,
    optional = false
}: LocalizedInputProps) {
    const { formState: { errors }, watch, trigger, setValue } = useFormContext()
    const fieldValues = watch(name)

    // Helper to get nested error
    const getNestedError = (path: string) => {
        return path.split('.').reduce((obj, key) => obj?.[key], errors as any)
    }

    const fieldErrors = getNestedError(name)
    const hasAnyError = !!fieldErrors

    // A tab is considered to have an error if:
    // 1. It has a specific Zod error
    // 2. OR the whole field has an error and this specific language is empty
    const getTabHasError = (langCode: string) => {
        if (fieldErrors?.[langCode]) return true
        if (!optional && hasAnyError && (!fieldValues?.[langCode] || fieldValues[langCode]?.trim() === "")) return true
        return false
    }

    // Auto-fill URLs with base URL + language prefix
    const handleAutoFillUrls = () => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://mohsindesigns.com'
        LANGUAGES.forEach(lang => {
            setValue(`${name}.${lang.code}`, `${baseUrl}/${lang.code}`)
        })
        trigger(name)
    }

    return (
        <div className={cn(
            "space-y-2",
            !noBorder && "border p-4 rounded-md",
            compact && "p-0 space-y-1",
            className
        )}>
            <div className="flex justify-between items-center">
                <FormLabel className={cn(hasAnyError && "text-destructive")}>{label}</FormLabel>
                <div className="flex items-center gap-2">
                    {isUrl && (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleAutoFillUrls}
                            className="h-7 text-xs"
                        >
                            <Link className="h-3 w-3 mr-1" />
                            Auto-fill URLs
                        </Button>
                    )}
                    {hasAnyError && !optional && (
                        <span className="text-xs text-destructive font-medium">Missing translations</span>
                    )}
                </div>
            </div>
            <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                    {LANGUAGES.map((lang) => {
                        const hasError = getTabHasError(lang.code)
                        return (
                            <TabsTrigger
                                key={lang.code}
                                value={lang.code}
                                className={cn(hasError && "text-destructive data-[state=active]:text-destructive border-b-2 border-transparent data-[state=active]:border-destructive")}
                            >
                                {lang.label}
                                {hasError && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-destructive" />}
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
                {LANGUAGES.map((lang) => (
                    <TabsContent key={lang.code} value={lang.code}>
                        <FormField
                            control={control}
                            name={`${name}.${lang.code}`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        {label} ({lang.label})
                                    </FormLabel>
                                    <FormControl>
                                        {isTextarea ? (
                                            <Textarea
                                                {...field}
                                                value={field.value || ""}
                                                dir={lang.dir}
                                                className="min-h-[100px]"
                                                placeholder={`Enter ${label.toLowerCase()} in ${lang.label}...`}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    trigger(name) // Force re-validation of the parent localized object
                                                }}
                                            />
                                        ) : (
                                            <Input
                                                {...field}
                                                value={field.value || ""}
                                                dir={isUrl ? "ltr" : lang.dir}
                                                placeholder={`Enter ${label.toLowerCase()} in ${lang.label}...`}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    trigger(name) // Force re-validation of the parent localized object
                                                }}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
