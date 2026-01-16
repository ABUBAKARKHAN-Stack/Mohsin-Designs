"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Control } from "react-hook-form"
import { LocalizedInput } from "./LocalizedInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SectionHeadingInputProps {
    control: Control<any>
    name: string
    label: string
}

export function SectionHeadingInput({ control, name, label }: SectionHeadingInputProps) {
    return (
        <div className="space-y-4 border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-lg">{label}</h3>
            <LocalizedInput
                control={control}
                name={`${name}.eyebrow`}
                label="Eyebrow (Optional)"
            />
            <LocalizedInput
                control={control}
                name={`${name}.title`}
                label="Section Title"
            />
            <LocalizedInput
                control={control}
                name={`${name}.description`}
                label="Section Description (Optional)"
                isTextarea
            />
        </div>
    )
}
