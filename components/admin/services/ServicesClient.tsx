"use client"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Trash2, Eye, Edit as EditIcon, Search, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { deleteService, deleteMultipleServices } from "@/app/actions/deleteService"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

// Define the type for the service data we're fetching
interface Service {
    _id: string
    title: { [key: string]: string }
    slug: { current: string }
    heroImageUrl?: string
    _updatedAt: string
}

interface ServicesClientProps {
    services: Service[]
}

export function ServicesClient({ services }: ServicesClientProps) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [isBulkDeleting, setIsBulkDeleting] = useState(false)
    const router = useRouter()

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const title = service.title?.en?.toLowerCase() || ""
            const slug = service.slug?.current?.toLowerCase() || ""
            const query = searchQuery.toLowerCase()
            return title.includes(query) || slug.includes(query)
        })
    }, [services, searchQuery])

    async function handleDelete(id: string, title: string) {
        setIsDeleting(id)
        try {
            const result = await deleteService(id)
            if (result.success) {
                successToast(`Service "${title}" deleted successfully!`)
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
                router.refresh()
            } else {
                errorToast(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error(error)
            errorToast("An unexpected error occurred.")
        } finally {
            setIsDeleting(null)
        }
    }

    async function handleBulkDelete() {
        if (selectedIds.length === 0) return
        setIsBulkDeleting(true)
        try {
            const result = await deleteMultipleServices(selectedIds)
            if (result.success) {
                successToast(`${selectedIds.length} services deleted successfully!`)
                setSelectedIds([])
                router.refresh()
            } else {
                errorToast(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error(error)
            errorToast("An unexpected error occurred.")
        } finally {
            setIsBulkDeleting(false)
        }
    }

    function toggleSelection(id: string) {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(selectedId => selectedId !== id)
                : [...prev, id]
        )
    }

    function toggleAll() {
        if (selectedIds.length === filteredServices.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(filteredServices.map(s => s._id))
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 max-w-sm">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search services..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {selectedIds.length > 0 && (
                <div className="sticky top-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-background/80 backdrop-blur-md border border-primary/20 shadow-lg rounded-xl p-3 gap-3 animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center gap-4 pl-2">
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">
                            {selectedIds.length} selected
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-2"
                            onClick={() => setSelectedIds([])}
                        >
                            Deselect
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end px-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" className="h-8 w-full sm:w-auto">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete {selectedIds.length} Services?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently remove the selected services.
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleBulkDelete}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        disabled={isBulkDeleting}
                                    >
                                        {isBulkDeleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                                        Confirm Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-10">
                                <Checkbox
                                    checked={selectedIds.length === filteredServices.length && filteredServices.length > 0}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            <TableHead className="w-[80px]">Preview</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Slug</TableHead>
                            <TableHead className="hidden sm:table-cell">Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredServices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">
                                    No services found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredServices.map((service) => (
                                <TableRow
                                    key={service._id}
                                    className={cn(
                                        "group transition-colors hover:bg-muted/30 cursor-pointer",
                                        selectedIds.includes(service._id) ? "bg-primary/3 data-[state=selected]:bg-muted" : ""
                                    )}
                                    onClick={() => toggleSelection(service._id)}
                                    data-state={selectedIds.includes(service._id) ? "selected" : undefined}
                                >
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedIds.includes(service._id)}
                                            onCheckedChange={() => toggleSelection(service._id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="relative h-12 w-20 rounded-md border overflow-hidden bg-muted shrink-0">
                                            {service.heroImageUrl ? (
                                                <Image
                                                    src={service.heroImageUrl}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold max-w-[150px] sm:max-w-[200px] truncate">
                                        {service.title?.en || "Untitled Service"}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs hidden md:table-cell">
                                        {service.slug?.current}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap hidden sm:table-cell">
                                        {new Date(service._updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/services/${service._id}`}>
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </Link>
                                        </Button>

                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/services/edit/${service._id}`}>
                                                <EditIcon className="h-4 w-4 mr-2" />
                                                Edit
                                            </Link>
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    disabled={isDeleting === service._id}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete the service "{service.title?.en || 'Untitled'}".
                                                        This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(service._id, service.title?.en || 'Untitled')}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
