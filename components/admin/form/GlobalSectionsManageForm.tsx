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
import { Save, Send, Trash2, CheckCircle2, Clock } from "lucide-react"

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
}

export function GlobalSectionsManageForm({ initialData, draftUpdatedAt }: Props) {
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

   

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background/95 backdrop-blur sticky top-0 z-10 py-4 border-b">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Global Sections</h1>
                    <p className="text-muted-foreground mt-1">Manage reusable content sections used throughout the website.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-2">
                        {isSavingDraft ? (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3 animate-spin" /> Saving draft...
                            </span>
                        ) : lastSaved ? (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-green-500" /> Draft saved at {lastSaved.toLocaleTimeString()}
                            </span>
                        ) : null}
                    </div>

                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading || isSavingDraft}
                        className="bg-primary hover:bg-primary/90"
                    >
                        {isLoading ? "Publishing..." : (
                            <>
                                <Send className="h-4 w-4 mr-2" /> Publish Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form className="space-y-8">
                    <GlobalSectionsFormTabs control={control} errors={errors} mode="global" />
                </form>
            </Form>
        </div>
    )
}
