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
    label: React.ReactNode | string
    isTextarea?: boolean
    isUrl?: boolean
    className?: string
    noBorder?: boolean
    compact?: boolean
    optional?: boolean
    activeLang?: string
    placeholder?: string
}

const LANGUAGES = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ur', label: 'Urdu', dir: 'rtl' },
    { code: 'es', label: 'Spanish', dir: 'ltr' },
    { code: 'ar', label: 'Arabic', dir: 'rtl' },
]

import { useFormContext, useWatch } from "react-hook-form"
import { useEffect, useState } from "react"

export function LocalizedInput({
    control,
    name,
    label,
    isTextarea = false,
    isUrl = false,
    className,
    noBorder,
    compact,
    optional = false,
    activeLang,
    placeholder
}: LocalizedInputProps) {
    const { formState: { errors, isSubmitted }, watch, trigger, setValue } = useFormContext()
    const [internalTab, setInternalTab] = useState("en")
    const fieldValues = watch(name)

    // Helper to get nested error
    const getNestedError = (path: string) => {
        return path.split('.').reduce((obj, key) => obj?.[key], errors as any)
    }

    const fieldErrors = getNestedError(name)
    const currentLangError = activeLang ? getNestedError(`${name}.${activeLang}`) : null

    // Determine if we should highlight the field as having ANY error
    const hasAnyError = !!fieldErrors
    const shouldShowCurrentError = !!currentLangError

    // ONLY show red if the CURRENTLY selected language has an error
    // This avoids the "all red" syndrome when other languages are missing.
    const isErrorState = activeLang ? shouldShowCurrentError : hasAnyError

    // Helper to check if OTHER languages are missing
    const missingLanguages = hasAnyError
        ? Object.keys(fieldErrors || {})
            .filter(key => key !== activeLang)
            .map(code => LANGUAGES.find(l => l.code === code)?.label || code)
        : []

    const hasOtherErrors = missingLanguages.length > 0

    // Auto-revalidate when activeLang changes to ensure correct error status
    useEffect(() => {
        if (activeLang && isSubmitted) {
            trigger(`${name}.${activeLang}`)
        }
    }, [activeLang, isSubmitted, name, trigger])

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
            isErrorState && "border-destructive/50",
            compact && "p-2 space-y-2",
            className
        )}>
            <div className="flex justify-between items-center">
                <FormLabel className={cn(isErrorState && "text-destructive")}>{label}</FormLabel>
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
                    {hasOtherErrors && !optional && (
                        <span className={cn(
                            "text-[10px] font-medium px-2 py-0.5 rounded-full transition-all duration-300",
                            isSubmitted ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-muted text-muted-foreground border border-transparent"
                        )}>
                            {isSubmitted ? `Missing: ${missingLanguages.join(", ")}` : "Translations pending"}
                        </span>
                    )}
                </div>
            </div>
            <Tabs
                value={activeLang || internalTab}
                onValueChange={setInternalTab}
                className="w-full"
            >
                {!activeLang && (
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto mb-4">
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
                )}

                {/* Always render all fields to keep them registered in React Hook Form */}
                {LANGUAGES.map((lang) => (
                    <TabsContent
                        key={lang.code}
                        value={lang.code}
                        forceMount
                        className={cn(
                            "mt-0",
                            (activeLang || internalTab) !== lang.code && "hidden"
                        )}
                    >
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
                                                placeholder={placeholder || `Enter content in ${lang.label}...`}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    // Trigger specific field validation
                                                    trigger(`${name}.${lang.code}`)
                                                }}
                                            />
                                        ) : (
                                            <Input
                                                {...field}
                                                value={field.value || ""}
                                                dir={isUrl ? "ltr" : lang.dir}
                                                placeholder={placeholder || `Enter content in ${lang.label}...`}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    trigger(`${name}.${lang.code}`)
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
