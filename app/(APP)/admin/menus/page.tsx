import { Plus, Edit, Trash2, ListTree } from "lucide-react"
import Link from "next/link"
import { getMenus, deleteMenu } from "@/app/actions/menus"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { errorToast, successToast } from "@/lib/toastNotifications"
import { Badge } from "@/components/ui/badge"

export default async function MenusPage() {
    const menus = await getMenus()

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Menu Management</h1>
                    <p className="text-muted-foreground text-sm">Create and manage your website's navigation menus.</p>
                </div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/admin/menus/new">
                        <Plus className="mr-2 h-4 w-4" /> Create New Menu
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.length === 0 ? (
                    <Card className="col-span-full border-dashed border-2 bg-muted/30">
                        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                            <div className="p-4 bg-background rounded-full border shadow-sm">
                                <ListTree className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="font-semibold text-lg">No menus found</h3>
                                <p className="text-sm text-muted-foreground max-w-xs">
                                    You haven't created any menus yet. Start by creating your first navigation menu.
                                </p>
                            </div>
                            <Button asChild variant="outline">
                                <Link href="/admin/menus/new">
                                    <Plus className="mr-2 h-4 w-4" /> Create First Menu
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    menus.map((menu: any) => (
                        <Card key={menu._id} className="group hover:border-primary/40 transition-all duration-300">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {menu.title}
                                        </CardTitle>
                                        <CardDescription className="font-mono text-[10px] uppercase tracking-wider">
                                            Slug: {menu.slug}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary" className="bg-primary/5 text-primary">
                                        {menu.itemCount} Items
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 pt-2 border-t mt-2">
                                    <Button asChild variant="ghost" size="sm" className="flex-1 hover:bg-primary/10 hover:text-primary transition-colors">
                                        <Link href={`/admin/menus/${menu._id}`}>
                                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                                        </Link>
                                    </Button>
                                    <div className="h-4 w-px bg-muted mx-1" />
                                    <MenuDeleteButton id={menu._id} />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

// Client component for the delete button
import { MenuDeleteButton } from "./_components/MenuDeleteButton"
