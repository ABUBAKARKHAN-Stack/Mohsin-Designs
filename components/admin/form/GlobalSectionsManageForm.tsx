"use client"

import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { GlobalSectionsFormTabs } from "./GlobalSectionsFormTabs"
import { updateGlobalSections, saveGlobalSectionsDraft, discardGlobalSectionsDraft } from "@/app/actions/globalSections"
import { successToast, errorToast } from "@/lib/toastNotifications"
import { debounce } from "lodash"
import { Save, Send, Trash2, CheckCircle2, Clock, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

interface GlobalSectionsData {
    stats?: any
    servicesPreview?: any
    whyChooseUs?: any
    ourApproach?: any
    industriesWeServe?: any
    faqs?: any
    leadership?: any
    cta?: any
    _updatedAt?: string
}

interface Props {
    initialData?: GlobalSectionsData
    draftUpdatedAt?: string | null
    services?: any[]
}

export function GlobalSectionsManageForm({ initialData, draftUpdatedAt, services = [] }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(draftUpdatedAt ? new Date(draftUpdatedAt) : null)
    const [isInitialMount, setIsInitialMount] = useState(true)

    const normalizedInitialData = initialData ? {
        ...initialData,
        cta: initialData.cta ? {
            ...initialData.cta,
            formId: typeof initialData.cta.formId === 'object' ? initialData.cta.formId._ref : initialData.cta.formId
        } : undefined
    } : {}

    const form = useForm<GlobalSectionsData>({
        defaultValues: normalizedInitialData,
    })

    const { control, handleSubmit, watch, formState: { errors } } = form

    const saveDraft = useCallback(
        debounce(async (data: Partial<GlobalSectionsData>) => {
            if (isInitialMount) return
            setIsSavingDraft(true)
            try {
                const result = await saveGlobalSectionsDraft(data as any)
                if (result.success) {
                    setLastSaved(new Date())
                }
            } catch (error) {
                console.error("Draft save failed:", error)
            } finally {
                setIsSavingDraft(false)
            }
        }, 2000),
        [isInitialMount]
    )

    useEffect(() => {
        const subscription = watch((value) => {
            saveDraft(value as GlobalSectionsData)
        })
        return () => subscription.unsubscribe()
    }, [watch, saveDraft])

    useEffect(() => {
        setIsInitialMount(false)
    }, [])

    async function onSubmit(values: GlobalSectionsData) {
        setIsLoading(true)
        try {
            const result = await updateGlobalSections(values as any)
            if (result.success) {
                successToast("Global sections published successfully")
                await discardGlobalSectionsDraft()
                setLastSaved(null)
                window.location.reload()
            } else {
                errorToast(result.error || "Failed to update global sections")
            }
        } catch (error) {
            errorToast("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const hasErrors = Object.keys(errors).length > 0


    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-30 py-2 sm:py-3 px-1 border-b gap-3">
                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild className="h-9">
                                <Link href="/admin">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> <span className="sm:inline hidden">Back</span>
                                </Link>
                            </Button>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none">Global Sections</span>
                                <div className="flex items-center gap-3 text-muted-foreground text-xs mt-1">
                                    {isSavingDraft && (
                                        <span className="flex items-center gap-1 text-blue-600">
                                            <Spinner className="h-3 w-3" />
                                            Saving...
                                        </span>
                                    )}
                                    {lastSaved && !isSavingDraft && (
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                            <Clock className="h-3 w-3" />
                                            Draft Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto h-9 min-w-[120px]">
                            {isLoading ? (
                                <><Spinner className="mr-2 h-4 w-4" /> Publishing...</>
                            ) : (
                                "Publish Changes"
                            )}
                        </Button>
                    </div>
                </div>

                <GlobalSectionsFormTabs form={form} control={control} errors={errors} mode="global" services={services} />
            </form>
        </Form>
    )
}
