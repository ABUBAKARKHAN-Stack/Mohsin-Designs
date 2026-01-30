import FloatingContactBadge from "@/components/FloatingContactBadge";
import { Navbar, Footer } from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import PublicProvider from "@/provider/PublicProvider";
import { JsonLd } from "@/components/SEO/JsonLd";
import { redirect } from "next/navigation";
import { SUPPORTED_LANGS } from "@/constants/lang";
import { ServicesProvider } from "@/context/ServiceContext";
import { getLightWeightServicesByLocale, getServicesByLocale } from "@/helpers/service.helpers";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteSettings } from "@/helpers/site-settings.helpers";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { LandingPageContentProvider } from "@/context/LandingPageContentContext";
import { getLandingPageContent } from "@/helpers/landing-page-content.helpers";
import { AboutPageContentProvider } from "@/context/AboutPageContentContext";
import { getAboutPageContent } from "@/helpers/about-page-content.helpers";
import { GlobalContentProvider } from "@/context/GlobalContentContext";
import { getGlobalSections } from "@/helpers/global-sections.helpers";



interface Props {
    children: ReactNode;
}

export default async function PublicLayout({ children }: Props) {


    const [
        servicesResult,
        lightWeightServicesResult,
        siteSettingsResult,
        landingPageContentResult,
        aboutPageContentResult,
        globalContentResult
    ] = await Promise.allSettled([
        getServicesByLocale(),
        getLightWeightServicesByLocale(),
        getSiteSettings(),
        getLandingPageContent(),
        getAboutPageContent(),
        getGlobalSections(),
    ])

    const services = servicesResult.status === "fulfilled" ? servicesResult.value : [];
    const lightWeightServices = lightWeightServicesResult.status === "fulfilled" ? lightWeightServicesResult.value : [];
    const siteSettings = siteSettingsResult.status === "fulfilled" ? siteSettingsResult.value : null;
    const landingPageContent = landingPageContentResult.status === "fulfilled" ? landingPageContentResult.value : null;
    const aboutPageContent = aboutPageContentResult.status === "fulfilled" ? aboutPageContentResult.value : null;
    const globalContent = globalContentResult.status === "fulfilled" ? globalContentResult.value : null;


    return (

        <SiteSettingsProvider settings={siteSettings}>
            <LandingPageContentProvider landingPageContent={landingPageContent}>
                <AboutPageContentProvider aboutPageContent={aboutPageContent}>
                    <GlobalContentProvider globalContent={globalContent}>
                        <JsonLd schemas={siteSettings?.seo?.schemas} />
                        <PublicProvider>
                            <div className="min-h-screen flex flex-col">
                                <ServicesProvider services={services} lightWeightServices={lightWeightServices}>
                                    <SanityLive />
                                    <Navbar />

                                    <main className="flex-1 pt-20">
                                        <AnimatePresence mode="wait">
                                            {children}
                                        </AnimatePresence>
                                    </main>

                                    <FloatingContactBadge />
                                    <Footer />
                                </ServicesProvider>
                            </div>
                        </PublicProvider>
                    </GlobalContentProvider>
                </AboutPageContentProvider>
            </LandingPageContentProvider>
        </SiteSettingsProvider>

    );
}
