import { getSiteSettings } from "@/app/actions/siteSettings";
import ContactClient from "./ContactClient";
import { Metadata } from "next";
import { getContactPageContent } from "@/helpers/contact-page-content";

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await getContactPageContent();
    const siteSettings = await getSiteSettings();

    const seo = pageData?.seo;
    const title = seo?.metaTitle || "Contact Us";
    const description = seo?.metaDescription || siteSettings?.seo?.metaDescription || "Get in touch with us.";

    return {
        title: `${title} | ${siteSettings?.siteName || "Mohsin Designs"}`,
        description,
        keywords: seo?.focusKeyword,
        openGraph: {
            title,
            description,
        }
    };
}

export default async function ContactPage() {
    const pageData = await getContactPageContent();

    return (
        <ContactClient
            pageData={pageData}
        />
    );
}

