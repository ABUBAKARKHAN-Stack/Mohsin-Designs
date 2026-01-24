import { getProjectById } from "@/app/actions/project"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Edit as EditIcon, Globe, Calendar, LayoutGrid, Info, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getIconByName } from "@/lib/icon-mapper"

interface ViewProjectPageProps {
    params: Promise<{ id: string }>
}

export default async function ViewProjectPage({ params }: ViewProjectPageProps) {
    const { id } = await params
    const project = await getProjectById(id)

    if (!project) {
        notFound()
    }

    const isDraft = project._id.startsWith('drafts.')

    return (
        <div className="container mx-auto pb-10 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-20 bg-background/95 backdrop-blur py-4 border-b">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="icon" className="rounded-full">
                        <Link href="/admin/portfolio">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">{project.title?.en || "Untitled Project"}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant={isDraft ? "outline" : "default"} className={isDraft ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-green-50 text-green-700 border-green-200"}>
                                {isDraft ? "Draft" : "Published"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Updated {new Date(project._updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
                <Button asChild>
                    <Link href={`/admin/portfolio/edit/${id}`}>
                        <EditIcon className="mr-2 h-4 w-4" /> Edit Project
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Category</h4>
                                    <p className="text-lg font-semibold">{project.category?.en || "--"}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Slug</h4>
                                    <code className="text-sm bg-muted px-2 py-1 rounded">{project.slug?.current || "--"}</code>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Description</h4>
                                <p className="text-muted-foreground whitespace-pre-wrap">{project.description?.en || "No description provided."}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Featured Image */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Main Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative aspect-video w-full rounded-xl border overflow-hidden bg-muted">
                                {project.mainImage?.url ? (
                                    <Image
                                        src={project.mainImage.url}
                                        alt={project.mainImage.alt || ""}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-20">
                                        <LayoutGrid className="h-12 w-12" />
                                        <span>No featured image</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Case Study */}
                    {project.caseStudy && (
                        <Card className="border-accent/20">
                            <CardHeader className="bg-accent/5">
                                <CardTitle className="flex items-center gap-2">
                                    <Info className="h-5 w-5 text-accent" />
                                    Case Study Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Case Study Title</h4>
                                        <p className="text-lg font-semibold">{project.caseStudy.title?.en || "--"}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Services</h4>
                                        <p className="text-lg font-semibold">{project.caseStudy.category?.en || "--"}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Before Image</h4>
                                        <div className="relative aspect-[4/3] rounded-lg border overflow-hidden bg-muted">
                                            {project.caseStudy.beforeImage?.url ? (
                                                <Image src={project.caseStudy.beforeImage.url} alt="Before" fill className="object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full opacity-20 italic text-xs">No image</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">After Image</h4>
                                        <div className="relative aspect-[4/3] rounded-lg border overflow-hidden bg-muted">
                                            {project.caseStudy.afterImage?.url ? (
                                                <Image src={project.caseStudy.afterImage.url} alt="After" fill className="object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full opacity-20 italic text-xs">No image</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Results & Stats</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {project.caseStudy.results?.map((res: any, idx: number) => {
                                            const Icon = getIconByName(res.icon || "CheckCircle2");
                                            return (
                                                <div key={idx} className="p-4 border rounded-xl bg-muted/20 flex items-start gap-4">
                                                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xl font-black text-foreground leading-none">{res.value?.en || "--"}</p>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{res.label?.en || "--"}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {(!project.caseStudy.results || project.caseStudy.results.length === 0) && (
                                            <p className="text-sm italic text-muted-foreground col-span-full py-4 text-center">No results added.</p>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Client Testimonial</h4>
                                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10 relative">
                                        <span className="absolute top-4 left-4 text-6xl text-accent/10 font-serif leading-none">“</span>
                                        <p className="relative text-muted-foreground italic z-10">
                                            {project.caseStudy.testimonial?.en || "No testimonial provided."}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Availability</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Public URL:</span>
                                {project.slug?.current ? (
                                    <Link href={`/portfolio/${project.slug.current}`} target="_blank" className="text-primary hover:underline flex items-center gap-1 font-medium">
                                        View Live <Globe className="h-3 w-3" />
                                    </Link>
                                ) : (
                                    <span className="text-muted-foreground italic">Unavailable</span>
                                )}
                            </div>
                            <div className="p-3 bg-muted rounded-lg space-y-2">
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Localization</p>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="text-[10px] bg-background">EN</Badge>
                                    <Badge variant="outline" className="text-[10px] bg-background">UR</Badge>
                                    <Badge variant="outline" className="text-[10px] bg-background">ES</Badge>
                                    <Badge variant="outline" className="text-[10px] bg-background">AR</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
