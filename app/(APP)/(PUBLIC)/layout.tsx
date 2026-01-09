import FloatingContactBadge from "@/components/FloatingContactBadge";
import { Navbar, Footer } from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import PublicProvider from "@/provider/PublicProvider";

interface Props {
    children: ReactNode;
}

export default function AppLayout({ children }: Props) {

    return (
        <PublicProvider>
            <div className="min-h-screen flex flex-col">
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
