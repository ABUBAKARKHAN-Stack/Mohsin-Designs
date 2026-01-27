"use client"


import { Control } from "react-hook-form"
import { LocalizedInput } from "./LocalizedInput"

interface SectionHeadingInputProps {
    control: Control<any>
    name: string
    label: string
    activeLang?: string
}

export function SectionHeadingInput({ control, name, label, activeLang }: SectionHeadingInputProps) {
    return (
        <div className="space-y-4 border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-lg">{label}</h3>
            <LocalizedInput
                control={control}
                name={`${name}.eyebrow`}
                label="Eyebrow (Optional)"
                activeLang={activeLang}
            />
            <LocalizedInput
                control={control}
                name={`${name}.title`}
                label="Section Title"
                activeLang={activeLang}
            />
            <LocalizedInput
                control={control}
                name={`${name}.description`}
                label="Section Description (Optional)"
                isTextarea
                optional={true}
                activeLang={activeLang}
            />
        </div>
    )
}
