"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRoleBasedNavigation } from "@/hooks/useRoleBasedNavigation";
import { Roles } from "@/types/auth.types";
import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";



export function AppSidebar() {
    const {
        session,
        loading,
        logout
    } = useSession();

    const pathname = usePathname()

    const user = session.user;
    const navigationItems = useRoleBasedNavigation(user.role as Roles)
    const userInitial = user?.name.charAt(0).toUpperCase();

    const handleLogout = async () => await logout()

    const logoutLoading = loading === "logout";

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border h-16 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
                        {userInitial}
                    </div>
                    <div>
                        <h2 className="font-semibold text-sidebar-foreground">Dashboard</h2>
                        <p className="text-xs text-muted-foreground">Manage your content</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}

                                        >
                                            <Link href={item.url}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.image ?? ""} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Button
                        variant={"destructive"}
                        className="size-8"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                    >
                        {logoutLoading ? <Spinner /> : <LogOut />}
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
