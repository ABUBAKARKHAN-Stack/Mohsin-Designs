import { Roles } from "@/types/auth.types";
import {
    FileText,
    Globe,
    Image,
    Layers,
    LayoutDashboard,
    Search,
    Settings,
    User,
    Users,
    Briefcase,
    FolderOpen,
    Wrench,
} from "lucide-react";

export interface NavigationGroup {
    label: string;
    items: {
        title: string;
        url: string;
        icon: any;
    }[];
}

export const useRoleBasedNavigation = (role: Roles): NavigationGroup[] => {
    const baseNavigationItems: NavigationGroup[] = [
        {
            label: "Navigation",
            items: [
                { title: "Website", url: "/", icon: Globe },
                { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
            ]
        }
    ];

    const adminNavigation: NavigationGroup[] = [
        {
            label: "Navigation",
            items: [
                { title: "Website", url: "/", icon: Globe },
                { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
            ]
        },
        {
            label: "Content Management",
            items: [
                { title: "Pages", url: "/admin/pages", icon: FileText },
                { title: "Blogs", url: "/admin/blogs", icon: FileText },
                { title: "Portfolio", url: "/admin/portfolio", icon: Image },
                { title: "Sections", url: "/admin/sections", icon: Layers },
            ]
        },
        {
            label: "Services",
            items: [
                { title: "Services", url: "/admin/services", icon: Briefcase },
            ]
        },
        {
            label: "Media & SEO",
            items: [
                { title: "Media", url: "/admin/media", icon: FolderOpen },
                { title: "SEO", url: "/admin/seo", icon: Search },
            ]
        },
        {
            label: "Settings",
            items: [
                { title: "Users", url: "/admin/users", icon: Users },
                { title: "Site Settings", url: "/admin/settings", icon: Wrench },
                { title: "Profile", url: "/admin/profile", icon: User },
            ]
        },
    ];

    const contentWriterNavigation: NavigationGroup[] = [
        {
            label: "Navigation",
            items: [
                { title: "Website", url: "/", icon: Globe },
                { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
            ]
        },
        {
            label: "Content Management",
            items: [
                { title: "Pages", url: "/admin/pages", icon: FileText },
                { title: "Services", url: "/admin/services", icon: Briefcase },
                { title: "Blogs", url: "/admin/blogs", icon: FileText },
                { title: "Portfolio", url: "/admin/portfolio", icon: Image },
                { title: "Sections", url: "/admin/sections", icon: Layers },
                { title: "Media", url: "/admin/media", icon: FolderOpen },
            ]
        },
        {
            label: "Account",
            items: [
                { title: "Profile", url: "/admin/profile", icon: User },
            ]
        },
    ];

    const seoNavigation: NavigationGroup[] = [
        {
            label: "Navigation",
            items: [
                { title: "Website", url: "/", icon: Globe },
                { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
            ]
        },
        {
            label: "SEO",
            items: [
                { title: "SEO", url: "/admin/seo", icon: Search },
            ]
        },
        {
            label: "Account",
            items: [
                { title: "Profile", url: "/admin/profile", icon: User },
            ]
        },
    ];

    const userNavigation: NavigationGroup[] = [
        {
            label: "Navigation",
            items: [
                { title: "Website", url: "/", icon: Globe },
                { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
            ]
        },
        {
            label: "Content",
            items: [
                { title: "Pages", url: "/admin/pages", icon: FileText },
                { title: "Services", url: "/admin/services", icon: Briefcase },
                { title: "Blogs", url: "/admin/blogs", icon: FileText },
                { title: "Portfolio", url: "/admin/portfolio", icon: Image },
                { title: "Sections", url: "/admin/sections", icon: Layers },
            ]
        },
    ];

    switch (role) {
        case Roles.ADMIN:
            return adminNavigation;

        case Roles.CONTENT_WRITER:
            return contentWriterNavigation;

        case Roles.SEO_MANAGER:
        case Roles.SEO_EXECUTIVE:
            return seoNavigation;

        case Roles.USER:
            return userNavigation;

        default:
            return baseNavigationItems;
    }
};
