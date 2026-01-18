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

export interface NavigationItem {
    title: string;
    url: string;
    icon: any;
    subItems?: {
        title: string;
        url: string;
    }[];
    isOpenByDefault?: boolean;
}

export interface NavigationGroup {
    label: string;
    items: NavigationItem[];
}

export const useRoleBasedNavigation = (role: Roles): NavigationGroup[] => {
    const baseNavigationItems: NavigationGroup[] = [
        {
            label: "Navigation",
            items: [
                { title: "Website", url: "/", icon: Globe },
                { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
            ]
        },
        {
            label: "Content Management",
            items: [
                {
                    title: "Pages",
                    url: "/admin/pages",
                    icon: FileText,
                    isOpenByDefault: true,
                    subItems: [
                        { title: "Home", url: "/admin/pages/home" },
                        { title: "About", url: "/admin/pages/about" },
                        { title: "Contact", url: "/admin/pages/contact" },
                    ]
                }
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
                {
                    title: "Pages",
                    url: "/admin/pages",
                    icon: FileText,
                    isOpenByDefault: true,
                    subItems: [
                        { title: "Home", url: "/admin/pages/home" },
                        { title: "About", url: "/admin/pages/about" },
                        { title: "Contact", url: "/admin/pages/contact" },
                    ]
                },
                { title: "Blogs", url: "/admin/blogs", icon: FileText },
                { title: "Portfolio", url: "/admin/portfolio", icon: Image },
                { title: "Sections", url: "/admin/sections", icon: Layers },
            ]
        },
        {
            label: "Services",
            items: [
                { title: "Services", url: "/admin/services", icon: Briefcase },
                { title: "Services Setting", url: "/admin/services/settings", icon: Wrench },
                { title: "Services Page Content", url: "/admin/services/page-content", icon: FileText },
                { title: "Landing Page Content", url: "/admin/landing/page-content", icon: Layers },
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
                { title: "Site Settings", url: "/admin/site-settings", icon: Wrench },
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
                {
                    title: "Pages",
                    url: "/admin/pages",
                    icon: FileText,
                    isOpenByDefault: true,
                    subItems: [
                        { title: "Home", url: "/admin/pages/home" },
                        { title: "About", url: "/admin/pages/about" },
                        { title: "Contact", url: "/admin/pages/contact" },
                    ]
                },
                { title: "Services", url: "/admin/services", icon: Briefcase },
                { title: "Services Setting", url: "/admin/services/settings", icon: Wrench },
                { title: "Services Page Content", url: "/admin/services/page-content", icon: FileText },
                { title: "Landing Page Content", url: "/admin/landing/page-content", icon: Layers },
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
            label: "Content Management",
            items: [
                {
                    title: "Pages",
                    url: "/admin/pages",
                    icon: FileText,
                    isOpenByDefault: true,
                    subItems: [
                        { title: "Home", url: "/admin/pages/home" },
                        { title: "About", url: "/admin/pages/about" },
                        { title: "Contact", url: "/admin/pages/contact" },
                    ]
                }
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
                {
                    title: "Pages",
                    url: "/admin/pages",
                    icon: FileText,
                    isOpenByDefault: true,
                    subItems: [
                        { title: "Home", url: "/admin/pages/home" },
                        { title: "About", url: "/admin/pages/about" },
                        { title: "Contact", url: "/admin/pages/contact" },
                    ]
                },
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
