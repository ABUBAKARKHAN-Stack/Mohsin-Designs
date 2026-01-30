import { getContactPageContent } from "@/app/actions/contactPageContent";
import { getSiteSettings } from "@/app/actions/siteSettings";
import ContactClient from "./ContactClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const pageData = await getContactPageContent();
    const siteSettings = await getSiteSettings();

    const seo = pageData?.seo;
    const title = seo?.metaTitle?.[lang] || seo?.metaTitle?.en || "Contact Us";
    const description = seo?.metaDescription?.[lang] || seo?.metaDescription?.en || siteSettings?.seo?.metaDescription?.[lang] || "Get in touch with us.";

    return {
        title: `${title} | ${siteSettings?.siteName || "Mohsin Designs"}`,
        description,
        keywords: seo?.focusKeyword?.[lang] || seo?.focusKeyword?.en,
        openGraph: {
            title,
            description,
        }
    };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    // Fetch data in parallel
    const [pageData, siteSettings] = await Promise.all([
        getContactPageContent(),
        getSiteSettings()
    ]);

    return (
        <ContactClient
            lang={lang}
            pageData={pageData}
            siteSettings={siteSettings}
        />
    );
}

