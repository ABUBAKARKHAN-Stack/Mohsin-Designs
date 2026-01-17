import { getSiteSettings } from "@/app/actions/siteSettings";
import { SiteSettingsForm } from "@/components/admin/settings/SiteSettingsForm";

export default async function SiteSettingsPage() {
    const siteSettings = await getSiteSettings();

    // Transform sanity data into form values if needed
    // The query already handles resolving urls for logo and favicon
    const initialData = siteSettings ? {
        siteName: siteSettings.siteName || {},
        tagline: siteSettings.tagline || {},
        logo: siteSettings.logo,
        favicon: siteSettings.favicon,
        seo: siteSettings.seo || { keywords: [] },
        social: siteSettings.social || { facebook: "", twitter: "", linkedin: "", instagram: "", youtube: "" },
        contact: siteSettings.contact || { email: "", phone: "", address: {} },
        footerText: siteSettings.footerText || {},
        copyright: siteSettings.copyright || {},
    } : undefined;

    return (
        <div className="container mx-auto pb-10">
            <SiteSettingsForm initialData={initialData as any} />
        </div>
    );
}
