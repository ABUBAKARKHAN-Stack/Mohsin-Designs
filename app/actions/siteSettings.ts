'use server'

import { siteSettingsSchema, SiteSettingsValues } from "@/lib/validations/site-settings"
import { adminClient } from "@/sanity/lib/admin-client"
import { sanityFetch } from "@/sanity/lib/live"

export async function getSiteSettings() {
    try {
        const query = `*[_type == "siteSettings"][0] {
            ...,
            "logo": logo {
                asset,
                "url": asset->url
            },
            "favicon": favicon {
                asset,
                "url": asset->url
            },
            headerMenu,
            footerMenu
        }`

        const { data } = await sanityFetch({ query })
        return data
    } catch (error) {
        console.error("Failed to fetch site settings:", error)
        return null
    }
}

export async function updateSiteSettings(data: SiteSettingsValues) {
    try {
        const validatedFields = siteSettingsSchema.parse(data)

        const updateData: any = {
            _type: 'siteSettings',
            _id: 'siteSettings', // Standard ID for site settings singleton
            siteName: validatedFields.siteName,
            tagline: validatedFields.tagline,
            seo: validatedFields.seo,
            social: validatedFields.social,
            contact: validatedFields.contact,
            footerText: validatedFields.footerText,
            copyright: validatedFields.copyright,
            headerMenu: validatedFields.headerMenu,
            footerMenu: validatedFields.footerMenu,
        }

        // Only update logo if we have a valid reference
        if (validatedFields.logo?.asset?._ref) {
            updateData.logo = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: validatedFields.logo.asset._ref,
                }
            }
        }

        // Only update favicon if we have a valid reference
        if (validatedFields.favicon?.asset?._ref) {
            updateData.favicon = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: validatedFields.favicon.asset._ref,
                }
            }
        }

        await adminClient.createOrReplace(updateData)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to update site settings:", error)
        const errorMessage = error.response?.body?.message || error.message || "Failed to update site settings"
        return { success: false, error: errorMessage }
    }
}

export async function getAllMenus() {
    try {
        const query = `*[_type == "menu"] {
            _id,
            title,
            "slug": slug.current,
            location
        }`
        const { data } = await sanityFetch({ query })
        return (data as any[]) || []
    } catch (error) {
        console.error("Failed to fetch menus:", error)
        return []
    }
}
