import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LocalizedInput } from "./LocalizedInput"

interface StatItemCardProps {
    control: any
    name: string
    title: string
}

export function StatItemCard({ control, name, title }: StatItemCardProps) {
    return (
        <div className="space-y-4 pb-8 last:pb-0 border-b last:border-0 border-border/40">
            <h4 className="font-semibold text-base text-muted-foreground uppercase tracking-wider">{title}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                    <LocalizedInput
                        control={control}
                        name={`${name}.value`}
                        label="Metric Value"
                        noBorder
                        compact
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
                    />
                </div>
            </div>
        </div>
    )
}
