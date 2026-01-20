import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocalizedInput } from "./LocalizedInput"

interface SectionHeadingCardProps {
    control: any
    baseName: string
    title: string
}

export function SectionHeadingCard({ control, baseName, title }: SectionHeadingCardProps) {
    return (
        <Card>
            <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <LocalizedInput control={control} name={`${baseName}.eyebrow`} label="Eyebrow" />
                <LocalizedInput control={control} name={`${baseName}.title`} label="Title" />
                <LocalizedInput control={control} name={`${baseName}.description`} label="Description" isTextarea />
            </CardContent>
        </Card>
    )
}
