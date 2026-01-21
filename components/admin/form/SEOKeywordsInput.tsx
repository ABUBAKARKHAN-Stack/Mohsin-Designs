"use client"

import { useState, useRef, useEffect } from "react"
import { useFieldArray, Control, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, X, AlertCircle, Edit2, Check, Languages } from "lucide-react"
import { cn } from "@/lib/utils"

interface SEOKeywordsInputProps {
    control: Control<any>
    name: string
    label: string
    externalActiveLang?: string
}

const LANGUAGES = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "ur", name: "Urdu", dir: "rtl" },
    { code: "es", name: "Spanish", dir: "ltr" },
    { code: "ar", name: "Arabic", dir: "rtl" },
]

export function SEOKeywordsInput({ control, name, label, externalActiveLang }: SEOKeywordsInputProps) {
    const { watch, trigger, setValue } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    })

    const [activeLang, setActiveLang] = useState("en")
    const [newKeyword, setNewKeyword] = useState("")
    const [editingState, setEditingState] = useState<{ index: number, value: string } | null>(null)
    const editInputRef = useRef<HTMLInputElement>(null)

    // Focus edit input when it appears
    useEffect(() => {
        if (editingState !== null && editInputRef.current) {
            editInputRef.current.focus()
            editInputRef.current.select()
        }
    }, [editingState])

    // Switch internal active lang when external lang changes
    useEffect(() => {
        if (externalActiveLang) {
            setActiveLang(externalActiveLang)
            setEditingState(null)
            setNewKeyword("")
        }
    }, [externalActiveLang])

    const handleAdd = () => {
        if (!newKeyword.trim()) return

        const newEntry: any = {
            _key: Math.random().toString(36).substring(2, 9),
            en: "",
            ur: "",
            es: "",
            ar: ""
        }
        newEntry[activeLang] = newKeyword.trim()

        append(newEntry)
        setNewKeyword("")
        trigger(name)
    }

    const startEditing = (index: number, currentVal: string) => {
        setEditingState({ index, value: currentVal })
    }

    const saveEdit = () => {
        if (editingState === null) return

        const { index, value } = editingState
        setValue(`${name}.${index}.${activeLang}`, value.trim())
        setEditingState(null)
        trigger(`${name}.${index}.${activeLang}`)
    }

    const cancelEdit = () => {
        setEditingState(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent, isNew: boolean) => {
        if (e.key === "Enter") {
            e.preventDefault()
            isNew ? handleAdd() : saveEdit()
        } else if (e.key === "Escape" && !isNew) {
            cancelEdit()
        }
    }

    return (
        <div className="space-y-4 border p-4 rounded-md bg-card/50">
            <div className="flex justify-between items-center">
                <FormLabel className="text-base font-semibold">{label}</FormLabel>
                <div className="text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                    Localized Tags
                </div>
            </div>

            <Tabs value={activeLang} onValueChange={(val) => {
                setActiveLang(val)
                setEditingState(null)
                setNewKeyword("")
            }} className="w-full">
                {!externalActiveLang && (
                    <TabsList className="grid grid-cols-4 w-full max-w-[400px]">
                        {LANGUAGES.map((lang) => (
                            <TabsTrigger key={lang.code} value={lang.code} className="text-xs">
                                {lang.code.toUpperCase()}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                )}

                {LANGUAGES.map((lang) => {
                    // Filter keywords: ones that HAVE a value in this language OR are being edited in this language
                    const localizedFields = fields.map((f, idx) => ({ ...f, idx })).filter((f) => {
                        const val = watch(`${name}.${f.idx}.${lang.code}`)
                        const isEditingThis = editingState?.index === f.idx
                        return (!!val && val.trim() !== "") || isEditingThis
                    })

                    // Untranslated keywords: ones that have values in OTHER languages but not this one, 
                    // and are NOT currently being edited in this language
                    const untranslatedFields = fields.map((f, idx) => ({ ...f, idx })).filter((f) => {
                        const currentVal = watch(`${name}.${f.idx}.${lang.code}`)
                        const isEditingThis = editingState?.index === f.idx

                        // If it has a value or is being edited, it belongs in the primary list
                        if ((currentVal && currentVal.trim() !== "") || isEditingThis) return false

                        // Check if it has any other language filled
                        const otherVals = LANGUAGES
                            .filter(l => l.code !== lang.code)
                            .map(l => watch(`${name}.${f.idx}.${l.code}`))
                            .filter(v => !!v && v.trim() !== "")

                        return otherVals.length > 0
                    })

                    return (
                        <TabsContent key={lang.code} value={lang.code} className="space-y-4 pt-4 outline-none">
                            <div className="flex gap-2">
                                <Input
                                    placeholder={`Add keyword in ${lang.name}...`}
                                    value={newKeyword}
                                    onChange={(e) => setNewKeyword(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, true)}
                                    className="flex-1"
                                    dir={lang.dir as any}
                                />
                                <Button type="button" onClick={handleAdd} size="icon" variant="secondary">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-md bg-background/50 relative transition-all duration-300">
                                {localizedFields.length === 0 && (
                                    <div className="flex items-center justify-center w-full h-10 text-xs text-muted-foreground italic animate-in fade-in duration-500">
                                        No {lang.name} keywords yet.
                                    </div>
                                )}
                                {localizedFields.map((f) => {
                                    const index = f.idx
                                    const keywordObj = watch(`${name}.${index}`)
                                    const currentVal = keywordObj?.[lang.code] || ""
                                    const isEditing = editingState?.index === index

                                    return (
                                        <div key={f.id} className="relative group max-w-full animate-in zoom-in-95 duration-200">
                                            {isEditing ? (
                                                <div className="flex items-center gap-1 bg-background border rounded-md p-1 pr-2 shadow-sm ring-2 ring-primary/20 ring-offset-1 z-10">
                                                    <Input
                                                        ref={editInputRef}
                                                        value={editingState.value}
                                                        onChange={(e) => setEditingState({ ...editingState, value: e.target.value })}
                                                        onKeyDown={(e) => handleKeyDown(e, false)}
                                                        onBlur={saveEdit}
                                                        className="h-7 py-0 px-2 min-w-[120px] max-w-[300px] border-none focus-visible:ring-0 shadow-none bg-transparent"
                                                        dir={lang.dir as any}
                                                    />
                                                    <div className="flex items-center gap-1 border-l pl-1">
                                                        <button
                                                            type="button"
                                                            onMouseDown={(e) => {
                                                                e.preventDefault(); // Prevent blur
                                                                saveEdit();
                                                            }}
                                                            className="p-1 hover:text-primary transition-colors"
                                                        >
                                                            <Check className="h-3 w-3" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onMouseDown={(e) => {
                                                                e.preventDefault(); // Prevent blur
                                                                cancelEdit();
                                                            }}
                                                            className="p-1 hover:text-destructive transition-colors"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Badge
                                                    variant="secondary"
                                                    className={cn(
                                                        "flex items-center gap-1.5 py-1.5 px-3 transition-all cursor-pointer group/badge hover:bg-secondary/80",
                                                        lang.dir === "rtl" && "flex-row-reverse"
                                                    )}
                                                    onClick={() => startEditing(index, currentVal)}
                                                >
                                                    <span
                                                        className={cn(
                                                            "max-w-[200px] truncate h-4 flex items-center min-w-[20px]",
                                                            lang.dir === "rtl" && "font-arabic"
                                                        )}
                                                    >
                                                        {currentVal}
                                                    </span>

                                                    <div className={cn("inline-flex items-center gap-1", lang.dir === "rtl" ? "mr-1" : "ml-1")}>
                                                        <Edit2 className="h-2.5 w-2.5 opacity-0 group-hover/badge:opacity-50 transition-opacity" />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                remove(index);
                                                            }}
                                                            className="hover:text-destructive transition-colors p-0.5 rounded-full hover:bg-background/80"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </Badge>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Untranslated section */}
                            {untranslatedFields.length > 0 && (
                                <div className="mt-6 space-y-2 animate-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                                        <Languages className="h-3 w-3" />
                                        Untranslated from other languages
                                    </div>
                                    <div className="flex flex-wrap gap-2 p-2 border border-dashed rounded-md bg-muted/20">
                                        {untranslatedFields.map((f) => {
                                            const keywordObj = watch(`${name}.${f.idx}`)
                                            // Find the first available translation
                                            const fallbackLang = LANGUAGES.find(l => !!keywordObj?.[l.code])
                                            const fallbackVal = keywordObj?.[fallbackLang?.code || "en"]

                                            return (
                                                <Badge
                                                    key={f.id}
                                                    variant="outline"
                                                    className="flex items-center gap-1.5 py-1 px-2 cursor-pointer border-dashed border-muted-foreground/30 text-muted-foreground/50 hover:bg-background hover:text-foreground hover:border-solid transition-all animate-in fade-in zoom-in-95 duration-200"
                                                    onClick={() => startEditing(f.idx, "")}
                                                >
                                                    <span className="text-[11px] italic">
                                                        {fallbackVal} <span className="opacity-50 not-italic">({fallbackLang?.code.toUpperCase()})</span>
                                                    </span>
                                                    <Plus className="h-2.5 w-2.5 opacity-50" />
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    )
                })}
            </Tabs>

            <FormMessage />
            <div className="flex flex-col gap-1">
                <p className="text-[10px] text-muted-foreground">
                    • Tags are isolated per language. Switch tabs to manage tags for each language.
                </p>
                <p className="text-[10px] text-muted-foreground">
                    • Untranslated tags show keywords existing in other languages. Click them to instantly translate for this language.
                </p>
            </div>
        </div>
    )
}
