"use client"

import { useState, useRef, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { menuSchema, MenuValues } from "@/lib/validations/menu"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, Plus, ArrowLeft, Languages } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createMenu, updateMenu } from "@/app/actions/menus"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { MenuItemEditor } from "./MenuItemEditor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

interface MenuFormProps {
    initialData?: any
    linkableContent: {
        services: any[]
        pages: any[]
    }
}

export function MenuForm({ initialData, linkableContent }: MenuFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedLang, setSelectedLang] = useState("en")
    const router = useRouter()
    const isEditing = !!initialData?._id

    const form = useForm<MenuValues>({
        resolver: zodResolver(menuSchema) as any,
        defaultValues: initialData ? {
            title: initialData.title,
            slug: { current: initialData.slug },
            location: initialData.location || "header",
            items: initialData.items || []
        } : {
            title: "",
            slug: { current: "" },
            location: "header",
            items: []
        }
    })

    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "items"
    })

    const bottomRef = useRef<HTMLDivElement>(null)
    const prevLengthRef = useRef(fields.length)

    useEffect(() => {
        if (fields.length > prevLengthRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        prevLengthRef.current = fields.length
    }, [fields.length])

    console.log(form.formState.errors);

    async function onSubmit(values: MenuValues) {

        setIsLoading(true)
        try {
            const result = (isEditing
                ? await updateMenu(initialData._id, values)
                : await createMenu(values)) as any

            if (result.success) {
                successToast(`Menu ${isEditing ? 'updated' : 'created'} successfully`)
                if (!isEditing && (result as any).id) router.push(`/admin/menus/${(result as any).id}`)
            } else {
                errorToast(result.error || "Failed to save menu")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link href="/admin/menus">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">{isEditing ? `Edit: ${initialData.title}` : "Create New Menu"}</h1>
                            <p className="text-muted-foreground text-xs">Define your navigation structure and links.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                            <div className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground border-r pr-2">
                                <Languages className="h-3.5 w-3.5" />
                                <span>UI Preview</span>
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
                        <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-none min-w-[140px]">
                            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            {isEditing ? "Update Menu" : "Create Menu"}
                        </Button>
                    </div>
                </div>

                <div className="grid  gap-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Configuration</CardTitle>
                                <CardDescription>Internal name and unique identifier.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Menu Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. Header Navigation" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug.current"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. main-nav" />
                                            </FormControl>
                                            <FormDescription>Used for identity reference.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Menu Layout Location</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select location" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="header">Header (Navbar)</SelectItem>
                                                    <SelectItem value="footer">Footer (Multi-column)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                <span className="block text-xs mt-1">
                                                    <strong>Header:</strong> Standard nested navigation.<br />
                                                    <strong>Footer:</strong> Top-level items are column headers (no links), children are links.
                                                </span>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className=" space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                Menu Items
                                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{fields.length}</span>
                            </h2>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => append({
                                    label: { en: "", ur: "", es: "", ar: "" },
                                    description: { en: "", ur: "", es: "", ar: "" },
                                    type: "reference",
                                    children: []
                                })}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Top-level Item
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <MenuItemEditor
                                    key={field.id}
                                    control={form.control}
                                    name="items"
                                    index={index}
                                    remove={remove}
                                    move={move}
                                    total={fields.length}
                                    activeLang={selectedLang}
                                    linkableContent={linkableContent}
                                    setValue={form.setValue}
                                    errors={form.formState.errors.items}
                                    location={form.watch("location")}
                                />
                            ))}
                            <div ref={bottomRef} />

                            {fields.length === 0 && (
                                <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
                                    <p className="text-muted-foreground italic">No items yet. Click "Add Top-level Item" to start building your menu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
