import FloatingContactBadge from "@/components/FloatingContactBadge";
import { Navbar, Footer } from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import PublicProvider from "@/provider/PublicProvider";
import { Inter, Space_Grotesk } from "next/font/google";
import RootProvider from "@/provider/RootProvider";
import { redirect } from "next/navigation";
import { SUPPORTED_LANGS } from "@/constants/lang";


const sans = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
})

const display = Space_Grotesk({
    variable: "--font-display",
    subsets: ["latin"],
    weight: [
        "300",
        "400",
        "500",
        "600",
        "700"
    ]
})


interface Props {
    children: ReactNode;
    params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: Props) {
    const {
        lang
    } = await params

    if (!SUPPORTED_LANGS.includes(lang as any)) {

        redirect("/en");

    }

    return (

        <PublicProvider>
            <div lang={lang} className="min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-1 pt-20">
                    <AnimatePresence mode="wait">
                        {children}
                    </AnimatePresence>
                </main>

                <FloatingContactBadge />
                <Footer />
            </div>
        </PublicProvider>

    );
}
