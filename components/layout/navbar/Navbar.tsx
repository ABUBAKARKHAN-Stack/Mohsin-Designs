"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceItems } from '@/constants/services.constants'
import { navLinks } from "@/constants/navlinks.constants";
import Link from "next/link";
import DesktopNav from "./DesktopNav";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      {/* Desktop Navbar  */}
      <DesktopNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-foreground flex flex-col justify-center items-center overflow-y-auto py-24"
          >
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <div key={link.path} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl md:text-7xl font-display font-bold tracking-tight text-background hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>

                  {/* Mobile service sub-links */}
                  {link.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex flex-wrap justify-center gap-3 mt-3"
                    >
                      {serviceItems.map((service) => (
                        <Link
                          key={service.path}
                          href={service.path}
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-background/60 hover:text-accent transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.08 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-5xl md:text-7xl font-display font-bold tracking-tight text-background hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-background/50 text-sm tracking-widest"
            >
              hello@mohsindesigns.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;