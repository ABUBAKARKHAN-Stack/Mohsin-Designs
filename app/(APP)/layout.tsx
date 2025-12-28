import { Navbar, Footer } from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AppLayout({ children }: Props) {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main  className="flex-1 pt-20">
                <AnimatePresence mode="wait">
                    {children}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
