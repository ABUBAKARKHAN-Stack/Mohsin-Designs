"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocalizedInput } from "@/components/admin/form/LocalizedInput"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function SectionHeadingCard({ control, baseName, title, activeLang }: { control: any; baseName: string; title: string; activeLang?: string }) {
    return (
        <Card>
            <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <LocalizedInput control={control} name={`${baseName}.eyebrow`} label="Eyebrow" activeLang={activeLang} />
                <LocalizedInput control={control} name={`${baseName}.title`} label="Title" activeLang={activeLang} />
                <LocalizedInput control={control} name={`${baseName}.description`} label="Description" isTextarea activeLang={activeLang} />
            </CardContent>
        </Card>
    )
}

export function StatItemCard({ control, name, title, activeLang }: { control: any; name: string; title: string; activeLang?: string }) {
    return (
        <div className="space-y-4 pb-8 last:pb-0 border-b last:border-0 border-border/40">
            <h4 className="font-semibold text-base text-muted-foreground uppercase tracking-wider">{title}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                    <FormField
                        control={control}
                        name={`${name}.value`}
                        render={({ field }) => (
                            <FormItem className="pb-1">
                                <FormLabel className=" font-medium text-muted-foreground">Metric Value</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. 10" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`${name}.suffix`}
                        render={({ field }) => (
                            <FormItem className="pb-1">
                                <FormLabel className=" font-medium text-muted-foreground">Suffix</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g., +, %, K" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="lg:col-span-7">
                    <LocalizedInput
                        control={control}
                        name={`${name}.label`}
                        label="Display Label"
                        noBorder
                        compact
                        activeLang={activeLang}
                    />
                </div>
            </div>
        </div>
    )
}
