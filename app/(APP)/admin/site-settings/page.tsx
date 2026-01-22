import { getSiteSettings } from "@/app/actions/siteSettings";
import { getMenus } from "@/app/actions/menus";
import { SiteSettingsForm } from "@/components/admin/settings/SiteSettingsForm";

export default async function SiteSettingsPage() {
    const siteSettings = await getSiteSettings();
    const menus = await getMenus();

    // Transform sanity data into form values if needed
    // The query already handles resolving urls for logo and favicon
    const initialData = siteSettings ? {
        siteName: siteSettings.siteName || {},
        tagline: siteSettings.tagline || {},
        logo: siteSettings.logo,
        favicon: siteSettings.favicon,
        seo: siteSettings.seo || { keywords: [] },
        social: siteSettings.social || { facebook: "", twitter: "", linkedin: "", instagram: "" },
        contact: siteSettings.contact || { email: "", phone: "", address: {} },
        footerText: siteSettings.footerText || {},
        copyright: siteSettings.copyright || {},
        headerMenu: siteSettings.headerMenu || { _type: 'reference', _ref: "" },
        footerMenu: siteSettings.footerMenu || { _type: 'reference', _ref: "" },
    } : undefined;

    return (
        <div className="container mx-auto pb-10">
            <SiteSettingsForm initialData={initialData as any} menus={menus} />
        </div>
    );
}
