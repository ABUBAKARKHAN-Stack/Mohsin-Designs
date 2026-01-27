import { client } from "@/sanity/lib/client"
import { ArrowLeft, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/live"

async function getService(id: string) {
    const query = `*[_type == "service" && _id == $id][0] {
        ...,
        "heroImageUrl": heroImage.asset->url
    }`
    const service = await sanityFetch({ query, params: { id } })
    return service.data
}

export default async function ServiceViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const service = await getService(id)

    if (!service) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <Button variant="ghost" size="sm" asChild className="shrink-0 p-0 sm:p-2 sm:h-9 sm:px-4">
                        <Link href="/admin/services">
                            <ArrowLeft className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                    </Button>
                    <h1 className="text-2xl sm:text-3xl font-bold truncate flex-1">{service.title?.en}</h1>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none h-9">
                        <Link href={`/en/services/${service.slug?.current}`} target="_blank">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                        </Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1 sm:flex-none h-9">
                        <Link href={`/admin/services/edit/${id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Service Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {service.heroImageUrl && (
                            <div className="relative w-full h-64 rounded-md overflow-hidden">
                                <Image
                                    src={service.heroImageUrl}
                                    alt={service.heroImageAlt?.en || "Service Hero"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Subtitle</h3>
                            <p className="text-muted-foreground">{service.subtitle?.en}</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Description</h3>
                            <p className="whitespace-pre-wrap">{service.description?.en}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Details & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm font-medium text-muted-foreground">Slug</span>
                            <code className="text-xs bg-muted p-1 rounded font-mono">{service.slug?.current}</code>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                            <span className="text-sm">{new Date(service._updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm font-medium text-muted-foreground">Languages</span>
                            <div className="flex gap-1">
                                <Badge variant="outline">EN</Badge>
                                <Badge variant="outline">UR</Badge>
                                <Badge variant="outline">ES</Badge>
                                <Badge variant="outline">AR</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Content Sections</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SectionStatus label="Intro" content={service.introTitle?.en} />
                        <SectionStatus label="Role" content={service.roleTitle?.en} />
                        <SectionStatus label="How We Help" content={service.howWeHelpSection?.title?.en} />
                        <SectionStatus label="Process" content={service.processSection?.title?.en} />
                        <SectionStatus label="Areas" content={service.areasSection?.title?.en} />
                        <SectionStatus label="Industries" content={service.industriesSection?.title?.en} />
                        <SectionStatus label="Benefits" content={service.benifitsSection?.title?.en} />
                        <SectionStatus label="Why Choose Us" content={service.whyChooseUsSection?.title?.en} />
                        <SectionStatus label="Case Studies" content={service.caseStudiesSection?.title?.en} />
                        <SectionStatus label="FAQs" content={service.faqsSection?.title?.en} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function SectionStatus({ label, content }: { label: string, content?: string }) {
    return (
        <div className="flex flex-col gap-1 p-3 border rounded-md bg-muted/30">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground italic">{label}</span>
            <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${content ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm">{content ? 'Configured' : 'Missing'}</span>
            </div>
        </div>
    )
}
