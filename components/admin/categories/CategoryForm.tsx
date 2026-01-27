"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, ArrowLeft, Languages } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createCategory, updateCategory } from "@/app/actions/category"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"
import { categorySchema, CategoryValues } from "@/lib/validations/category"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"

interface CategoryFormProps {
    initialData?: any
}

export function CategoryForm({ initialData }: CategoryFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedLang, setSelectedLang] = useState("en")
    const router = useRouter()
    const isEditing = !!initialData?._id

    const form = useForm<CategoryValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: initialData?.title || {},
            description: initialData?.description || {},
        }
    })

    async function onSubmit(values: CategoryValues) {
        setIsLoading(true)
        try {
            const result = isEditing
                ? await updateCategory(initialData._id, values)
                : await createCategory(values)

            if (result.success) {
                successToast(`Category ${isEditing ? 'updated' : 'created'} successfully`)
                router.push('/admin/blogs/categories')
                router.refresh()
            } else {
                errorToast(result.error || "Failed to save category")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="icon" className="rounded-full">
                            <Link href="/admin/blogs/categories">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold">{isEditing ? "Edit Category" : "New Category"}</h1>
                            <p className="text-muted-foreground text-xs">{isEditing ? "Update category details" : "Create a new category"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            Save
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <LocalizedInput
                            control={form.control}
                            name="title"
                            label="Title"
                            activeLang={selectedLang}
                            placeholder="e.g. Design"
                        />
                        <LocalizedInput
                            control={form.control}
                            name="description"
                            label="Description"
                            activeLang={selectedLang}
                            isTextarea
                            placeholder="Optional description..."
                        />
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
