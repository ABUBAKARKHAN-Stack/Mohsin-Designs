"use client";

import { Navbar, Footer } from "@/components/layout";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <AnimatePresence mode="wait">
        <main key={pathname} className="flex-1 pt-20">
          {children}
        </main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
