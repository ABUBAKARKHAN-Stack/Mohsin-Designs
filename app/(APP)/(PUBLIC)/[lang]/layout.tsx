import FloatingContactBadge from "@/components/FloatingContactBadge";
import { Navbar, Footer } from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import PublicProvider from "@/provider/PublicProvider";
import { redirect } from "next/navigation";
import { SUPPORTED_LANGS } from "@/constants/lang";
import { ServicesProvider } from "@/context/ServiceContext";
import { getLightWeightServicesByLocale, getServicesByLocale } from "@/helpers/service.helpers";
import { SanityLive } from "@/sanity/lib/live";



interface Props {
    children: ReactNode;
    params: Promise<LanguageType>
}

export default async function LangLayout({ children, params }: Props) {
    const {
        lang
    } = await params

    if (!SUPPORTED_LANGS.includes(lang as any)) {
        redirect("/en");
    }

    const services = await getServicesByLocale(lang)
    const lightWeightServices = await getLightWeightServicesByLocale(lang)


    return (

        <PublicProvider>
            <div lang={lang} className="min-h-screen flex flex-col">
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

    );
}
