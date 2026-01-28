"use client"

import { useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface CommaKeywordsInputProps {
    control: any
    name: string
    label: string
    activeLang?: string
    placeholder?: string
}

const LANGUAGES = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ur', label: 'Urdu', dir: 'rtl' },
    { code: 'es', label: 'Spanish', dir: 'ltr' },
    { code: 'ar', label: 'Arabic', dir: 'rtl' },
]

export function CommaKeywordsInput({
    control,
    name,
    label,
    activeLang,
    placeholder
}: CommaKeywordsInputProps) {
    const { setValue, watch, trigger } = useFormContext()

    // We keep track of the string value for each language to make it easier to edit
    // without constant array conversion artifacts
    const [viewValues, setViewValues] = useState<Record<string, string>>({
        en: "", ur: "", es: "", ar: ""
    })

    const fieldValues = watch(name)

    // Sync from field values (arrays) to view values (strings) on mount or if they change externally
    useEffect(() => {
        const newViewValues: Record<string, string> = { ...viewValues }
        let changed = false

        LANGUAGES.forEach(lang => {
            const arr = fieldValues?.[lang.code] || []
            const str = Array.isArray(arr) ? arr.join(", ") : ""
            if (newViewValues[lang.code] !== str && !isCurrentlyEditing(lang.code)) {
                newViewValues[lang.code] = str
                changed = true
            }
        })

        if (changed) setViewValues(newViewValues)
    }, [fieldValues])

    const [editingLang, setEditingLang] = useState<string | null>(null)
    const isCurrentlyEditing = (code: string) => editingLang === code

    const handleChange = (code: string, value: string) => {
        // Update local view value immediately for responsive typing
        setViewValues(prev => ({ ...prev, [code]: value }))

        // Convert string to array: split by comma, trim, filter empty
        const arr = value.split(",")
            .map(k => k.trim())
            .filter(k => k !== "")

        setValue(`${name}.${code}`, arr, { shouldDirty: true, shouldValidate: true })
    }

    return (
        <div className="space-y-4 border p-4 rounded-md bg-card/50">
            <FormLabel>{label}</FormLabel>
            <Tabs value={activeLang || "en"} className="w-full">
                {LANGUAGES.map((lang) => (
                    <TabsContent
                        key={lang.code}
                        value={lang.code}
                        forceMount
                        className={cn(
                            "mt-0",
                            (activeLang || "en") !== lang.code && "hidden"
                        )}
                    >
                        <FormField
                            control={control}
                            name={`${name}.${lang.code}`}
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            value={viewValues[lang.code]}
                                            onChange={(e) => handleChange(lang.code, e.target.value)}
                                            onFocus={() => setEditingLang(lang.code)}
                                            onBlur={() => {
                                                setEditingLang(null)
                                                // Trigger validation for the whole object to catch sibling errors
                                                trigger(name)
                                            }}
                                            dir={lang.dir}
                                            placeholder={placeholder || `Enter keywords separated by commas in ${lang.label}...`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <p className="text-[10px] text-muted-foreground mt-1 italic">
                                        Use commas to separate multiple keywords. Example: web design, developer, ui
                                    </p>
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
