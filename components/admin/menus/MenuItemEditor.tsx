import { useEffect, useState } from "react"
import { useFieldArray, Control, UseFormSetValue, FieldErrors, useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { Trash2, Plus, ArrowUp, ArrowDown, ExternalLink, Hash, Link as LinkIcon, Layers, ChevronRight, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MenuItemEditorProps {
    control: Control<any>
    setValue: UseFormSetValue<any>
    name: string
    index: number
    remove: (index: number) => void
    move?: (from: number, to: number) => void
    total?: number
    activeLang: string
    depth?: number
    linkableContent: {
        services: any[]
        pages: any[]
    },
    errors?: any
    location?: 'header' | 'footer'
}

export function MenuItemEditor({
    control,
    name,
    index,
    remove,
    move,
    total,
    activeLang,
    depth = 0,
    linkableContent,
    setValue,
    errors,
    location = 'header'
}: MenuItemEditorProps) {
    const fieldPath = `${name}.${index}`

    const { fields, append, remove: removeChild, move: moveChild } = useFieldArray({
        control,
        name: `${fieldPath}.children`
    })

    const linkType = useWatch({
        control,
        name: `${fieldPath}.type`
    })

    // Enforce 'header' type for Footer Column Headers to bypass link validation (no URL required)
    useEffect(() => {
        if (location === 'footer' && depth === 0 && linkType !== 'header') {
            setValue(`${fieldPath}.type`, 'header', { shouldValidate: true })
        }
    }, [location, depth, linkType, fieldPath, setValue])

    const itemLabel = useWatch({
        control,
        name: `${fieldPath}.label`
    })

    const hasError = !!errors?.[index]
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (hasError) setIsOpen(true)
    }, [hasError])

    return (
        <Card className={cn(
            "group border hover:border-primary/30 transition-all duration-300 shadow-sm",
            depth > 0 && "ml-8 border-l-4 border-l-primary/20 bg-muted/10",
            hasError && "border-destructive/50 bg-destructive/5 shadow-[0_0_15px_rgba(239,68,68,0.1)] shadow-destructive/10"
        )}>
            <div className="flex items-center gap-3 p-3 bg-muted/20 border-b group-hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 hover:bg-background rounded text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    <div className="flex flex-col gap-1">
                        {move && (
                            <>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-sm hover:bg-primary/10 hover:text-primary disabled:opacity-30"
                                    onClick={() => move(index, index - 1)}
                                    disabled={index === 0}
                                >
                                    <ArrowUp className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-sm hover:bg-primary/10 hover:text-primary disabled:opacity-30"
                                    onClick={() => move(index, index + 1)}
                                    disabled={total ? index === total - 1 : true}
                                >
                                    <ArrowDown className="h-3.5 w-3.5" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div className="p-2 bg-background rounded border group-hover:border-primary/30 transition-colors">
                        {location === 'footer' && depth === 0 ? (
                            <Layers className="h-4 w-4 text-primary/60" />
                        ) : (
                            <LinkIcon className="h-4 w-4 text-primary/60" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-tight">
                            {location === 'footer' && depth === 0 ? 'Column Header' : `Level ${depth + 1}`}
                        </span>
                        <h4 className="font-bold text-sm tracking-tight text-foreground/80">
                            {itemLabel?.[activeLang] || (location === 'footer' && depth === 0 ? "New Column" : "New Link")}
                            {!isOpen && itemLabel?.[activeLang] && <span className="ml-2 text-xs font-normal text-muted-foreground/50 italic">(Click to edit)</span>}
                        </h4>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isOpen && (
                        <div className="animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    append({
                                        label: { en: "", ur: "", es: "", ar: "" },
                                        description: { en: "", ur: "", es: "", ar: "" },
                                        type: "reference",
                                        children: []
                                    })
                                    setIsOpen(true)
                                }}
                                className="h-8 text-[11px] gap-1 hover:bg-primary/10 hover:text-primary"
                            >
                                <Plus className="h-3.5 w-3.5" /> Sub-link
                            </Button>
                            <div className="h-6 w-px bg-border mx-1" />
                        </div>
                    )}
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation()
                            remove(index)
                        }}
                        className="text-destructive hover:bg-destructive h-8 w-8 p-0"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {isOpen && (
                <CardContent className="p-4 space-y-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 border-r pr-6 space-y-4">
                            <LocalizedInput
                                control={control}
                                name={`${fieldPath}.label`}
                                label={location === 'footer' && depth === 0 ? "Column Heading" : "Link Title"}
                                activeLang={activeLang}
                                compact
                            />

                            <LocalizedInput
                                control={control}
                                name={`${fieldPath}.description`}
                                label="Description (Optional)"
                                activeLang={activeLang}
                                compact
                            />

                            {/* Hide Link Configuration for Footer Top Level Items */}
                            {!(location === 'footer' && depth === 0) && (
                                <>
                                    <FormField
                                        control={control}
                                        name={`${fieldPath}.type`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold italic">Link Destination Type</FormLabel>
                                                <Select
                                                    onValueChange={(val) => {
                                                        field.onChange(val)
                                                        // Reset other field data to prevent validation conflicts
                                                        if (val === 'reference') {
                                                            setValue(`${fieldPath}.url`, { en: "", ur: "", es: "", ar: "" })
                                                        } else {
                                                            setValue(`${fieldPath}.reference`, null)
                                                        }
                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-9 text-xs">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="reference">Reference (Page/Service)</SelectItem>
                                                        <SelectItem value="custom">Custom URL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            {/* Only show destination fields if NOT a footer column header */}
                            {!(location === 'footer' && depth === 0) && (
                                linkType === 'reference' ? (
                                    <FormField
                                        control={control}
                                        name={`${fieldPath}.reference._ref`}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1.5">
                                                <FormLabel className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold italic flex items-center gap-1.5">
                                                    <Layers className="h-3 w-3" /> Select Target Resource
                                                </FormLabel>
                                                <Select onValueChange={(val) => {
                                                    field.onChange(val)
                                                    // Set _type for Sanity reference metadata
                                                    setValue(`${fieldPath}.reference._type`, 'reference')
                                                }} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10 text-xs">
                                                            <SelectValue placeholder="Search and select a service or page..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-[300px]">
                                                        {linkableContent.services.length > 0 && (
                                                            <>
                                                                <div className="px-2 py-1.5 text-[10px] font-bold text-primary/60 uppercase tracking-widest bg-primary/5 rounded mb-1">Services</div>
                                                                {linkableContent.services.map(s => (
                                                                    <SelectItem key={s._id} value={s._id} className="pl-6 text-xs">{s.title}</SelectItem>
                                                                ))}
                                                            </>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <LocalizedInput
                                        control={control}
                                        name={`${fieldPath}.url`}
                                        label="External or Relative URL"
                                        activeLang={activeLang}
                                        isUrl
                                        compact
                                    />
                                )
                            )}

                            {(location === 'footer' && depth === 0) && (
                                <div className="flex flex-col justify-center h-full p-4 border-2 border-dashed rounded-lg bg-muted/5 text-muted-foreground text-sm text-center italic">
                                    This item acts as a column header in the footer. Use the "Sub-link" button to add the actual links below it.
                                </div>
                            )}
                        </div>
                    </div>

                    {fields.length > 0 && (
                        <div className="space-y-4 pt-4 border-t">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary/60 flex items-center gap-2">
                                <Hash className="h-3 w-3" /> Sub-menu Structure
                            </h5>
                            <div className="space-y-3">
                                {fields.map((child, childIndex) => (
                                    <MenuItemEditor
                                        key={child.id}
                                        control={control}
                                        name={`${fieldPath}.children`}
                                        index={childIndex}
                                        remove={removeChild}
                                        move={moveChild}
                                        total={fields.length}
                                        activeLang={activeLang}
                                        depth={depth + 1}
                                        linkableContent={linkableContent}
                                        setValue={setValue}
                                        errors={errors?.[index]?.children}
                                        location={location}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    )
}
