"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createCategory, updateCategory } from "@/app/actions/category"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Spinner } from "@/components/ui/spinner"

const categorySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
})

type CategoryValues = z.infer<typeof categorySchema>

interface CategoryFormProps {
    initialData?: any
}

export function CategoryForm({ initialData }: CategoryFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const isEditing = !!initialData?._id

    const form = useForm<CategoryValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
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
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                        Save
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. Design" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Optional description..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
