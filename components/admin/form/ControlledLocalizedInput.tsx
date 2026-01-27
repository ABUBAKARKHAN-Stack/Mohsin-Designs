"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ControlledLocalizedInputProps {
    name: string
    label: string
    value?: { en: string; ur: string; es: string; ar: string }
    onChange: (value: { en: string; ur: string; es: string; ar: string }) => void
    isTextarea?: boolean
    className?: string
    activeLang?: string
}

const LANGUAGES = [
    { code: 'en' as const, label: 'English', dir: 'ltr' as const },
    { code: 'ur' as const, label: 'Urdu', dir: 'rtl' as const },
    { code: 'es' as const, label: 'Spanish', dir: 'ltr' as const },
    { code: 'ar' as const, label: 'Arabic', dir: 'rtl' as const },
]

export function ControlledLocalizedInput({
    name,
    label,
    value,
    onChange,
    isTextarea = false,
    className,
    activeLang
}: ControlledLocalizedInputProps) {
    // Provide default empty object if value is undefined
    const currentValue = value || { en: "", ur: "", es: "", ar: "" }

    const handleChange = (langCode: 'en' | 'ur' | 'es' | 'ar', newValue: string) => {
        onChange({
            ...currentValue,
            [langCode]: newValue
        })
    }

    return (
        <div className={cn("space-y-2 border p-4 rounded-md", className)}>
            <Label>{label}</Label>
            {activeLang ? (
                <div>
                    {isTextarea ? (
                        <Textarea
                            value={currentValue[activeLang as keyof typeof currentValue] || ""}
                            onChange={(e) => handleChange(activeLang as any, e.target.value)}
                            dir={LANGUAGES.find(l => l.code === activeLang)?.dir}
                            className="min-h-[100px]"
                            placeholder={`Enter ${label.toLowerCase()} in ${activeLang.toUpperCase()}...`}
                        />
                    ) : (
                        <Input
                            value={currentValue[activeLang as keyof typeof currentValue] || ""}
                            onChange={(e) => handleChange(activeLang as any, e.target.value)}
                            dir={LANGUAGES.find(l => l.code === activeLang)?.dir}
                            placeholder={`Enter ${label.toLowerCase()} in ${activeLang.toUpperCase()}...`}
                        />
                    )}
                </div>
            ) : (
                <Tabs defaultValue="en" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                        {LANGUAGES.map((lang) => (
                            <TabsTrigger
                                key={lang.code}
                                value={lang.code}
                            >
                                {lang.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {LANGUAGES.map((lang) => (
                        <TabsContent key={lang.code} value={lang.code}>
                            {isTextarea ? (
                                <Textarea
                                    value={currentValue[lang.code] || ""}
                                    onChange={(e) => handleChange(lang.code, e.target.value)}
                                    dir={lang.dir}
                                    className="min-h-[100px]"
                                    placeholder={`Enter ${label.toLowerCase()} in ${lang.label}...`}
                                />
                            ) : (
                                <Input
                                    value={currentValue[lang.code] || ""}
                                    onChange={(e) => handleChange(lang.code, e.target.value)}
                                    dir={lang.dir}
                                    placeholder={`Enter ${label.toLowerCase()} in ${lang.label}...`}
                                />
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    )
}
