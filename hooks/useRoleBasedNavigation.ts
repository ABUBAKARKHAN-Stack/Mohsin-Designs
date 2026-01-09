import { Roles } from "@/types/auth.types";
import { FileText, Home, Image, Layers, LayoutDashboard, Search, Settings, User, Users } from "lucide-react";

export const useRoleBasedNavigation = (role: Roles) => {

    const baseNavigationItems = [
        { title: "Home", url: "/", icon: Home },
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    ];


    const getRoleBasedNavItems = () => {
        switch (role) {

            //* Admin Navigation Items
            case Roles.ADMIN:
                return [
                    ...baseNavigationItems,
                    { title: "Users", url: "/users", icon: Users },
                    { title: "Pages", url: "/pages", icon: FileText },
                    { title: "Sections", url: "/sections", icon: Layers },
                    { title: "SEO", url: "/seo", icon: Search },
                    { title: "Media", url: "/media", icon: Image, },
                    { title: "Profile", url: "/profile", icon: User },
                    { title: "Settings", url: "/settings", icon: Settings, },
                ]

            //* Content Writer Navigation Items
            case Roles.CONTENT_WRITER:
                return [
                    ...baseNavigationItems,
                    { title: "Pages", url: "/pages", icon: FileText },
                    { title: "Sections", url: "/sections", icon: Layers },
                    { title: "Media", url: "/media", icon: Image, },
                    { title: "Profile", url: "/profile", icon: User },

                ]

            //* SEO Manager/Executive Navigation Items
            case Roles.SEO_EXECUTIVE:
            case Roles.SEO_MANAGER:
                return [
                    ...baseNavigationItems,
                    { title: "SEO", url: "/seo", icon: Search },
                    { title: "Profile", url: "/profile", icon: User },

                ]

            //* User Navigation Items (He Can Navigate But All Read ONLY!)
            case Roles.USER:
                return [
                    ...baseNavigationItems,
                    { title: "Pages", url: "/pages", icon: FileText },
                    { title: "Sections", url: "/sections", icon: Layers },
                    { title: "SEO", url: "/seo", icon: Search },
                    { title: "Media", url: "/media", icon: Image, },
                ]

            default:
                return baseNavigationItems;
        }

    }

    return getRoleBasedNavItems()

}