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
} from "lucide-react";

export const useRoleBasedNavigation = (role: Roles) => {
    const baseNavigationItems = [
        { title: "Website", url: "/", icon: Globe },
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    ];

    const adminNavigation = [
        ...baseNavigationItems,
        { title: "Users", url: "/users", icon: Users },

        //* Pages & Content
        { title: "Pages", url: "/pages", icon: FileText },
        { title: "Services", url: "/services", icon: Layers },
        { title: "Blogs", url: "/blogs", icon: FileText },
        { title: "Portfolio", url: "/portfolio", icon: Image },

        //* Reusable
        { title: "Sections", url: "/sections", icon: Layers },

        //* SEO & Media
        { title: "SEO", url: "/seo", icon: Search },
        { title: "Media", url: "/media", icon: Image },

        //* System
        { title: "Settings", url: "/settings", icon: Settings },
        { title: "Profile", url: "/profile", icon: User },
    ];

    const contentWriterNavigation = [
        ...baseNavigationItems,

        //* Content Editing (Draft Only)
        { title: "Pages", url: "/pages", icon: FileText },
        { title: "Services", url: "/services", icon: Layers },
        { title: "Blogs", url: "/blogs", icon: FileText },
        { title: "Portfolio", url: "/portfolio", icon: Image },

        //* Reusable Sections
        { title: "Sections", url: "/sections", icon: Layers },

        //* Limited Media
        { title: "Media", url: "/media", icon: Image },

        { title: "Profile", url: "/profile", icon: User },
    ];

    const seoNavigation = [
        ...baseNavigationItems,

        //* SEO only (UI will handle basic vs advanced)
        { title: "SEO", url: "/seo", icon: Search },

        { title: "Profile", url: "/profile", icon: User },
    ];

    const userNavigation = [
        ...baseNavigationItems,

        //* View-only access
        { title: "Pages", url: "/pages", icon: FileText },
        { title: "Services", url: "/services", icon: Layers },
        { title: "Blogs", url: "/blogs", icon: FileText },
        { title: "Portfolio", url: "/portfolio", icon: Image },
        { title: "Sections", url: "/sections", icon: Layers },
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
